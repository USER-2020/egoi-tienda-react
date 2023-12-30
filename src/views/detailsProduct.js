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
  const [detailInfoProfile, setDetailInfoProfile] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [minQty, setMinQty] = useState(); // Estado para rastrear min_qty
  const [handleShowOffCanvas, setHandleShowOffCanvas] = useState(false);


  const getCantCart = () => {
    allProductsCart(token)
      .then((res) => {
        const productsOncart = res.data;
        const numberOfProducts = productsOncart.length;
        setCantProductsOnCart(numberOfProducts);
        setProductsCart(res.data);
      })
      .catch((err) => console.log(err));
  }

  const getAllInfoPerfil = () => {
    getUserProfileInfo(token)
      .then((res) => {
        // console.log(res.data);
        setDetailInfoProfile(res.data);
      }).catch((err) => console.log(err));
  }

  const getCantCartWhithoutToken = () => {

    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth' // Para obtener un desplazamiento suave
    // });

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
    <div className="w-100 d-flex flex-column align-items-center justify-content-between">
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
          handleShowOffCanvasClose={() => setHandleShowOffCanvas(false)}
        />
      <DetailProduct
        setCantCart={getCantCart}
        setIsLoggedInPartner={() => setIsLoggedIn(true)}
        setIsntLoggedInPartner={() => setIsLoggedIn(false)}
        updateCantProductsWithouthToken={getCantCartWhithoutToken}
        setMinQty={() => setMinQty(minQty + 1)}       
      />
      <SimilarProduct />
      <Footer />
    </div>
  )
}

export default DetailsProduct;
