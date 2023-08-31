import React, { useState, useEffect } from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import HeaderResponsive from "../components/headerResponsive";
import HeaderCategories from "../components/categories/headerCategories.tsx";
import ProductsCategories from "../components/categories/productsCategories.tsx";
import HeaderResponsiveCategorie from "../components/categories/headerResponsiveCategorie.tsx";
import ProductsResponsiveCategorie from './../components/categories/productsResponsiveCategorie.tsx';
import { allProductsCart } from "../services/cart";
import { getCurrentUser } from './../helpers/Utils';

const Category = (props) => {
  const currenUser = getCurrentUser();

  const [cantProductsOnCart, setCantProductsOnCart] = useState('');

  const getCantCart = () => {
    const token = currenUser.token;
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
  }, []);

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header cantCart={cantProductsOnCart}/>
      <HeaderResponsive canCart={cantProductsOnCart}/>
      {/* <HeaderCategories/> */}
      {/* <HeaderResponsiveCategorie/> */}
      <ProductsCategories />
      {/* <ProductsResponsiveCategorie/> */}
      <Footer />
    </div>
  )
}

export default Category;
