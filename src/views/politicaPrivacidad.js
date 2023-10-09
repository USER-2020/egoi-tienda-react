import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Footer from '../components/footer'
import PoliticaPrivacidadComponent from '../components/politicaPrivacidadComponent'
import React, { useEffect, useState, useRef } from 'react'
import { allProductsCart } from "../services/cart";
import { getCurrentUser } from './../helpers/Utils';
import { getUserProfileInfo } from '../services/ordenes'

const PoliticaPrivacidad = () => {

  const currenUser = getCurrentUser();

  const [cantProductsOnCart, setCantProductsOnCart] = useState('');

  //Info de perfil
  const [detailInfoProfile, setDetailInfoProfile] = useState('');

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

  const getAllInfoPerfil = () => {
    const token = currenUser ? currenUser.token : null;
    getUserProfileInfo(token)
      .then((res) => {
        console.log("Info del cliente", res.data.f_name);
        setDetailInfoProfile(res.data);
      }).catch((err) => console.log(err));
  }

  useEffect(() => {
    getCantCart();
    getAllInfoPerfil();
  }, []);

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header cantCart={cantProductsOnCart} detailInfoProfile={detailInfoProfile} />
      <HeaderResponsive cantCart={cantProductsOnCart} detailInfoProfile={detailInfoProfile} />
      <PoliticaPrivacidadComponent />
      <Footer />
    </div>
  )
}

export default PoliticaPrivacidad

