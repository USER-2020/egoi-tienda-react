import React, { useEffect, useState, useRef } from 'react'
import Header from './../../components/header';
import HeaderResponsive from '../../components/headerResponsive';
import AddressCart from '../../components/cart/checkout.tsx';
import Footer from '../../components/footer';
import { allProductsCart } from "../../services/cart";
import { getCurrentUser } from './../../helpers/Utils';
import { getUserProfileInfo } from '../../services/ordenes';
import CheckoutNoToken from '../../components/cart/checkoutNoToken.tsx';
import Checkout_V2 from '../../components/cart/checkout_V2.tsx';
import Checkout_V2_token from '../../components/cart/checkout_V2_token.tsx';

function DressCart() {

  const currenUser = getCurrentUser();

  const [cantProductsOnCart, setCantProductsOnCart] = useState('');
  const [detailInfoProfile, setDetailInfoProfile] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [minQty, setMinQty] = useState(); // Estado para rastrear min_qty
  const [handleShowOffCanvas, setHandleShowOffCanvas] = useState(false);

  const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currenUser sea null

  const getCantCart = () => {
    // const token = currenUser.token;
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
    // const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currenUser sea null
    getUserProfileInfo(token)
      .then((res) => {
        // console.log(res.data);
        setDetailInfoProfile(res.data);
      }).catch((err) => console.log(err));
  }

  const getCantCartWhithoutToken = () => {
    let productsCartWhithoutToken = localStorage.getItem('productsCart');
    if (productsCartWhithoutToken) {
      // Si 'productsCartWhithoutToken' no es nulo ni indefinido, entonces hay datos en el localStorage.

      // Parsea los datos del localStorage de nuevo a un objeto (suponiendo que los datos son un objeto JSON).
      let productsCartData = JSON.parse(productsCartWhithoutToken);

      // Convierte los datos en una matriz de objetos y agrega un índice único a cada producto
      let productsInCart = Object.values(productsCartData).map((product, index) => ({ ...product, index }));

      // Obtiene el tamaño de la matriz (número de elementos) y actualiza el estado "cantProductsOnCart"
      let numProducts = productsInCart.length;
      setCantProductsOnCart(numProducts);
      setProductsCart(productsInCart);

      console.log('Número de productos en el carrito:', numProducts);
    } else {
      // Si 'productsCartWhithoutToken' es nulo o indefinido, no hay datos en el localStorage.
      console.log('El carrito está vacío.');
    }
  }

  const funcionValidation = () => {
    if (isLoggedIn) {
      getAllInfoPerfil();
      console.log("si hay usuario logueado");
      getCantCart();
    }
    else {
      console.log("no hay usuario logueado");
      getCantCartWhithoutToken();
    }
  }


  useEffect(() => {
    setMinQty(1);
  }, [])


  useEffect(() => {
    funcionValidation();
  }, [isLoggedIn])



  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header
        cantCart={cantProductsOnCart}
        detailInfoPerfil={detailInfoProfile}
        setIsLoggedInPartner={() => setIsLoggedIn(true)}
        productsInCart={productsCart}
        getAllProductsByCart={getCantCart}
        getAllProductsByCartNotoken={funcionValidation}
        minQty={minQty}
        handleShowOffCanvas={handleShowOffCanvas}
        handleShowOffCanvasClose={() => setHandleShowOffCanvas(false)}
      />
      <HeaderResponsive
        canCart={cantProductsOnCart}
        detailInfoProfile={detailInfoProfile}
        setIsLoggedInPartner={() => setIsLoggedIn(true)}
        handleShowOffCanvas={() => setHandleShowOffCanvas(true)}
      />

      {token && currenUser ? (
        <Checkout_V2_token offcanvasValidate={() => setHandleShowOffCanvas(false)} />
      ) : (
        <Checkout_V2
          productsInCart={productsCart}
          getAllProductsByCartNotoken={getCantCartWhithoutToken}
          offcanvasValidate={() => setHandleShowOffCanvas(false)}
        />
      )}

      {/* {token && currenUser ? (
        <AddressCart
          offcanvasValidate={() => setHandleShowOffCanvas(false)}
        />
      ) : (
        // <CheckoutNoToken
        //   productsInCart={productsCart}
        //   getAllProductsByCartNotoken={getCantCartWhithoutToken}
        //   offcanvasValidate={() => setHandleShowOffCanvas(false)}
        // />
        <Checkout_V2
          productsInCart={productsCart}
          getAllProductsByCartNotoken={getCantCartWhithoutToken}
          offcanvasValidate={() => setHandleShowOffCanvas(false)}
        />
      )} */}
      <Footer />
    </div>
  )
}

export default DressCart
