import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Orders from '../components/myOrders/OrdersOpciones.tsx'
import Footer from '../components/footer';
import { allProductsCart } from "../services/cart";
import { getCurrentUser } from './../helpers/Utils';
import { getUserProfileInfo } from '../services/ordenes';

function MyOrders(props) {

  const currenUser = getCurrentUser();

  const [cantProductsOnCart, setCantProductsOnCart] = useState('');
  const [detailInfoProfile, setDetailInfoProfile] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currenUser sea null

  const getCantCart = () => {
    allProductsCart(token)
      .then((res) => {
        const productsOncart = res.data;
        // console.log("Respuesta de productos del carrito de compras desde el responsive", productsOncart);
        const numberOfProducts = productsOncart.length;
        // console.log("Cantidad de productos en el carrito desde el responsive", numberOfProducts);
        setCantProductsOnCart(numberOfProducts);
        setProductsCart(res.data);

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
    if (isLoggedIn) {
      getCantCart();
      getAllInfoPerfil();
    }
  }, [isLoggedIn]);

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header cantCart={cantProductsOnCart} detailInfoPerfil={detailInfoProfile} setIsLoggedInPartner={() => setIsLoggedIn(true)} productsInCart={productsCart} getAllProductsByCart={getCantCart}/>
      <HeaderResponsive canCart={cantProductsOnCart} detailInfoPerfil={detailInfoProfile} setIsLoggedInPartner={() => setIsLoggedIn(true)} />
      <Orders />
      <Footer />
    </div>
  )
}

export default MyOrders
