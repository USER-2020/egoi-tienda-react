import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import HeaderResponsive from '../components/headerResponsive';
import DetailProduct from '../components/detailProduct/detailProduct.tsx';
import SimilarProduct from '../components/detailProduct/similarProduct.tsx';
import { allProductsCart } from "../services/cart";
import { getCurrentUser } from './../helpers/Utils';

function DetailsProduct() {
  const currentUser = getCurrentUser();
  const token = currentUser ? currentUser.token : null; // Manejo de seguridad en caso de que currentUser sea null

  const [cantProductsOnCart, setCantProductsOnCart] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getCantCart = () => {
    allProductsCart(token)
      .then((res) => {
        const productsOncart = res.data;
        const numberOfProducts = productsOncart.length;
        setCantProductsOnCart(numberOfProducts);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCantCart();
    if (currentUser && isLoggedIn) {
      setIsLoggedIn(true);
      console.log(isLoggedIn)
    } else {
      setIsLoggedIn(false);
      console.log(isLoggedIn);
    }
  }, [currentUser, isLoggedIn]);

  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-between">
      <Header cantCart={cantProductsOnCart} handleLoggedIn={isLoggedIn} />
      <HeaderResponsive canCart={cantProductsOnCart} handleLoggedIn={isLoggedIn} />
      <DetailProduct setCantCart={getCantCart} handleLogged={() => setIsLoggedIn(true)} />
      <SimilarProduct />
      <Footer />
    </div>
  )
}

export default DetailsProduct;
