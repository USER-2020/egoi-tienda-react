import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Footer from '../components/footer'
import ShowCategoriesComponent from '../components/categories/showCategories.tsx'
import { getCurrentUser } from '../helpers/Utils'
import React, { useEffect, useState } from "react";
import { allProductsCart } from '../services/cart'
import { getUserProfileInfo } from '../services/ordenes'

const AllCategoriesView = () => {

  const currenUser = getCurrentUser();
  const [detailInfoProfile, setDetailInfoProfile] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado del login
  const [cantProductsOnCart, setCantProductsOnCart] = useState('');
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
    getAllInfoPerfil();
    getCantCart();

    // getOfferDestacada();
    // offerDay();
  }, []);

  useEffect(() => {

    if (isLoggedIn) {
      getAllInfoPerfil();
      console.log("si hay usuario logueado");
      getCantCart();
    }

  }, [isLoggedIn])
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header cantCart={cantProductsOnCart} detailInfoPerfil={detailInfoProfile} setIsLoggedInPartner={() => setIsLoggedIn(true)} productsInCart={productsCart} getAllProductsByCart={getCantCart} />
      <HeaderResponsive cantCart={cantProductsOnCart} detailInfoPerfil={detailInfoProfile} setIsLoggedInPartner={() => setIsLoggedIn(true)} />
      <ShowCategoriesComponent />
      <Footer />
    </div>
  )
}

export default AllCategoriesView
