import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Footer from '../components/footer'
import AboutUsComponent from '../components/aboutUsComponent'
import React, { useEffect, useState, useRef } from 'react'
import { allProductsCart } from "../services/cart";
import { getCurrentUser } from './../helpers/Utils';
import { getUserProfileInfo } from '../services/ordenes'

const AboutUs = () => {

  const currenUser = getCurrentUser();

  const [cantProductsOnCart, setCantProductsOnCart] = useState('');
  const [detailInfoProfile, setDetailInfoProfile] = useState([]);

  const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currenUser sea null

  const getCantCart = () => {
    allProductsCart(token)
      .then((res) => {
        const productsOncart = res.data;
        // console.log("Respuesta de productos del carrito de compras desde el responsive", productsOncart);
        const numberOfProducts = productsOncart.length;
        // console.log("Cantidad de productos en el carrito desde el responsive", numberOfProducts);
        setCantProductsOnCart(numberOfProducts);


      }).catch((err) => console.log(err));
  }

  const getAllInfoPerfil = () => {
    getUserProfileInfo(token)
      .then((res) => {
        // console.log(res.data);
        setDetailInfoProfile(res.data);
      }).catch((err) => console.log(err));
  }

  useEffect(() => {
    getCantCart();
    getAllInfoPerfil();
  }, [currenUser]);

  return (
    <div className="w-100 d-flex flex-column align-items-center" >
      <Header cantCart={cantProductsOnCart} detailInfoPerfil={detailInfoProfile}/>
      <HeaderResponsive cantCart={cantProductsOnCart} detailInfoPerfil={detailInfoProfile}/>
      <AboutUsComponent />
      <Footer />
    </div>
  )
}

export default AboutUs
