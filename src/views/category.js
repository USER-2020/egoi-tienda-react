import React, { useState, useEffect } from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import HeaderResponsive from "../components/headerResponsive";
import ProductsCategories from "../components/categories/productsCategories.tsx";
import { allProductsCart } from "../services/cart";
import { getCurrentUser } from './../helpers/Utils';

function Category(){
  const currenUser = getCurrentUser();

  const [cantProductsOnCart, setCantProductsOnCart] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getCantCart = () => {
    const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currentUser sea null
    allProductsCart(token)
      .then((res) => {
        const productsOncart = res.data;
        // console.log("Respuesta de productos del carrito de compras desde el responsive", productsOncart);
        const numberOfProducts = productsOncart.length;
        // console.log("Cantidad de productos en el carrito desde el responsive", numberOfProducts);
        setCantProductsOnCart(numberOfProducts);


      }).catch((err) => console.log(err));
  }

  useEffect(() => {
    getCantCart();
    if (currenUser && isLoggedIn) {
      setIsLoggedIn(true);
      console.log(isLoggedIn)
    } else {
      setIsLoggedIn(false);
      console.log(isLoggedIn);
    }
  }, [currenUser, isLoggedIn]);

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header cantCart={cantProductsOnCart} handleLoggedIn={isLoggedIn}/>
      <HeaderResponsive canCart={cantProductsOnCart} handleLoggedIn={isLoggedIn}/>
      {/* <HeaderCategories/> */}
      {/* <HeaderResponsiveCategorie/> */}
      <ProductsCategories />
      {/* <ProductsResponsiveCategorie/> */}
      <Footer />
    </div>
  )
}

export default Category;
