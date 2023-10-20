import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import DetailCart from '../components/cart/detailCart.tsx'
import Footer from '../components/footer'
import React, { useEffect, useState, useRef } from 'react'
import { allProductsCart } from "../services/cart";
import { getCurrentUser } from './../helpers/Utils';
import { getUserProfileInfo } from '../services/ordenes'

function CartShopping() {

  const currenUser = getCurrentUser();

  const [cantProductsOnCart, setCantProductsOnCart] = useState('');
  const [detailInfoProfile, setDetailInfoProfile] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado del login

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


  const getAllInfoPerfil = () => {
    const token = currenUser.token;
    getUserProfileInfo(token)
      .then((res) => {
        // console.log(res.data);
        setDetailInfoProfile(res.data);
      }).catch((err) => console.log(err));
  }

  useEffect(() => {
    getCantCart();
    getAllInfoPerfil();
  }, [isLoggedIn]);

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header cantCart={cantProductsOnCart} detailInfoPerfil={detailInfoProfile} setIsLoggedInPartner={()=>setIsLoggedIn(true)}/>
      <HeaderResponsive canCart={cantProductsOnCart} detailInfoPerfil={detailInfoProfile} setIsLoggedInPartner={()=>setIsLoggedIn(true)}/>
      <DetailCart setCantCart={() => getCantCart()} />
      <Footer />
    </div>
  )
}

export default CartShopping
