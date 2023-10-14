import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Footer from '../components/footer'
import PoliticaPrivacidadComponent from '../components/politicaPrivacidadComponent'
import React, { useEffect, useState, useRef } from 'react'
import { allProductsCart } from "../services/cart";
import { getCurrentUser } from './../helpers/Utils';

const PoliticaPrivacidad = () => {

  const currenUser = getCurrentUser();

  const [cantProductsOnCart, setCantProductsOnCart] = useState('');

  const getCantCart = () => {
    const token = currenUser ? currenUser.token : null;
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
      <HeaderResponsive cantCart={cantProductsOnCart}/>
      <PoliticaPrivacidadComponent />
      <Footer />
    </div>
  )
}

export default PoliticaPrivacidad

