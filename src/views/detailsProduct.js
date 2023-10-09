import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import HeaderResponsive from '../components/headerResponsive';
import DetailProduct from '../components/detailProduct/detailProduct.tsx';
import SimilarProduct from '../components/detailProduct/similarProduct.tsx';
import { allProductsCart } from "../services/cart";
import { getCurrentUser } from './../helpers/Utils';
import { getUserProfileInfo } from '../services/ordenes';

function DetailsProduct() {
  const currentUser = getCurrentUser();
  const token = currentUser ? currentUser.token : null; // Manejo de seguridad en caso de que currentUser sea null

  const [cantProductsOnCart, setCantProductsOnCart] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //Info de perfil
  const [detailInfoProfile, setDetailInfoProfile] = useState('');

  const getCantCart = () => {
    allProductsCart(token)
      .then((res) => {
        const productsOncart = res.data;
        const numberOfProducts = productsOncart.length;
        setCantProductsOnCart(numberOfProducts);
        getAllInfoPerfil();
      })
      .catch((err) => console.log(err));
  }

  const getAllInfoPerfil = () => {
    getUserProfileInfo(token)
      .then((res) => {
        console.log("Info del cliente", res.data.f_name);
        setDetailInfoProfile(res.data);
      }).catch((err) => console.log(err));
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
      <Header cantCart={cantProductsOnCart} handleLoggedIn={isLoggedIn} detailInfoProfile={detailInfoProfile}/>
      <HeaderResponsive canCart={cantProductsOnCart} handleLoggedIn={isLoggedIn} detailInfoProfile={detailInfoProfile}/>
      <DetailProduct setCantCart={getCantCart} handleLogged={() => setIsLoggedIn(true)} />
      <SimilarProduct />
      <Footer />
    </div>
  )
}

export default DetailsProduct;
