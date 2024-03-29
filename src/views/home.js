/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import styles from "../styles/navbar.css";
import logo from "../assets/logo.png";

import Header from "../components/header";
import Footer from "../components/footer";
import Banner from "../components/home/banner";
import Recientes from "../components/home/recientes";
import Promociones from "../components/home/promociones";
import Vendidos from "../components/home/vendidos";
import Populares from "../components/home/populares";
import Bannerdown from "../components/home/bannerdown";
import HeaderResponsive from "../components/headerResponsive";

import Popup from "./user/popup";
import { getBanners } from "../services/banners";
import AddRecents from "../components/home/addRecents";
import { getPopup } from "../services/banners";
import { getCurrentUser } from "./../helpers/Utils";
import { allProductsCart } from "../services/cart";
import { getOfferHigligth, getOfferOfDay } from "../services/ofertas";
import OfertaDia from "../components/home/ofertaDia";
import OfertaDestacada from "../components/home/ofertaDestacada";
import OfertaFlash from "../components/home/ofertaFlash";
import { getUserProfileInfo } from "../services/ordenes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginGoogle from "../components/extraLogin/loginGoogle.tsx";
import { CLIENT_ID_GOOGLE } from "../constants/defaultValues";
import { gapi } from "gapi-script";
import ProductsInCart from "../components/home/productsInCart.js";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min.js";
// import { useGoogleOneTapLogin } from '@react-oauth/google';

const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado del login
  const [modalPopup, setModalPopup] = useState(false);
  const [bannersInfo, setBannersInfo] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  const [minQty, setMinQty] = useState(); // Estado para rastrear min_qty
  const [handleShowOffCanvas, setHandleShowOffCanvas] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [changueOffCanvasCart, setChangueOffcanvasCart] = useState(false);

  const [datosPopup, setDatosPopup] = useState("");
  const [detailInfoProfile, setDetailInfoProfile] = useState([]);

  const currenUser = getCurrentUser();

  const location = useLocation();

  const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currenUser sea null

  const [cantProductsOnCart, setCantProductsOnCart] = useState("");

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleModalData = () => {
    setModalPopup(false);
  };

  const closeModalPopup = () => {
    setModalPopup(false);
    setIsModalOpen(false);
  };

  const handleShowPopup = () => {
    setModalPopup(true);
  };

  const getAllBanners = () => {
    getBanners()
      .then((res) => {
        // console.log(res.data);
        setBannersInfo(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getPrincipalPopup = () => {
    getPopup()
      .then((res) => {
        if (!res.data || Object.keys(res.data).length > 0) {
          console.log(res.data);
          setDatosPopup(res.data);
          setModalPopup(true);
        } else {
          // setDatosPopup(res.data);
          setModalPopup(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const getCantCart = () => {
    allProductsCart(token)
      .then((res) => {
        const productsOncart = res.data;
        // console.log("Respuesta de productos del carrito de compras desde el responsive", productsOncart);
        const numberOfProducts = productsOncart.length;
        // console.log("Cantidad de productos en el carrito desde el responsive", numberOfProducts);
        setCantProductsOnCart(numberOfProducts);
        console.log("Numero de productos en el carrito: ", numberOfProducts);
        setProductsCart(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getCantCartWhithoutToken = () => {
    let productsCartWhithoutToken = localStorage.getItem("productsCart");
    if (productsCartWhithoutToken) {
      // Si 'productsCartWhithoutToken' no es nulo ni indefinido, entonces hay datos en el localStorage.

      // Parsea los datos del localStorage de nuevo a un objeto (suponiendo que los datos son un objeto JSON).
      let productsCartData = JSON.parse(productsCartWhithoutToken);

      // Convierte los datos en una matriz de objetos y agrega un índice único a cada producto
      let productsInCart = Object.values(
        productsCartData
      ).map((product, index) => ({ ...product, index }));

      // Obtiene el tamaño de la matriz (número de elementos) y actualiza el estado "cantProductsOnCart"
      let numProducts = productsInCart.length;
      setCantProductsOnCart(numProducts);
      setProductsCart(productsInCart);

      console.log(
        "Número de productos en el carrito localStorage:",
        numProducts
      );
    } else {
      // Si 'productsCartWhithoutToken' es nulo o indefinido, no hay datos en el localStorage.
      console.log("El carrito está vacío.");
    }
  };

  const funcionValidation = () => {
    if (isLoggedIn) {
      getAllInfoPerfil();
      console.log("si hay usuario logueado");
      getCantCart();
    } else {
      console.log("no hay usuario logueado");
      getCantCartWhithoutToken();
    }
  };

  const getAllInfoPerfil = () => {
    getUserProfileInfo(token)
      .then((res) => {
        // console.log(res.data);
        setDetailInfoProfile(res.data);
      })
      .catch((err) => console.log(err));
  };

  // const offerDay = () => {
  //   getOfferOfDay()
  //   .then((res)=>{
  //     console.log("Oferta del dia ",res.data);
  //     setDataOfferDay(res.data);
  //   }).catch((err)=>console.log(err));
  // }

  // const getOfferDestacada = () => {
  //   getOfferHigligth()
  //     .then((res) => {
  //       console.log(res.data);
  //       setIdDestacado(res.data.id);
  //     }).catch((err) => console.log(err));
  // }

  useEffect(() => {
    getAllBanners();
    getPrincipalPopup();
    getCantCart();
    funcionValidation();
    setMinQty(1);
    setHandleShowOffCanvas(false);
    // const start= ()=>{
    //   gapi.client.init({
    //     clientId: CLIENT_ID_GOOGLE,
    //     scope:""
    //   })
    // };
    // gapi.load('client: auth2', start);
    // useGoogleOneTapLogin({
    //   onSuccess: credentialResponse => {
    //     console.log(credentialResponse);
    //   },
    //   onError: () => {
    //     console.log('Login Failed');
    //   },
    // });

    // setQtyToken(1);
    // getOfferDestacada();
    // offerDay();
  }, []);

  useEffect(() => {
    funcionValidation();
  }, [isLoggedIn]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Bloquear el scroll al montar el componente
    document.body.style.overflow = "hidden";

    // Cleanup: Restablecer el scroll al desmontar el componente
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  useEffect(() => {
    // Esta función se ejecutará cada vez que cambie el estado de modalPopup
    if (modalPopup) {
      // Si el modal está abierto, deshabilita el desplazamiento vertical
      document.body.style.overflowY = "hidden";
      document.body.style.overflowX = "hidden";
    } else {
      // Si el modal está cerrado, habilita el desplazamiento vertical
      document.body.style.overflowY = "scroll";
      document.body.style.overflowX = "hidden";
    }

    // Devuelve una función de limpieza para restablecer el estado cuando se desmonte el componente
    return () => {
      document.body.style.overflowY = "scroll";
      document.body.style.overflowX = "hidden";
    };
  }, [modalPopup]); // Asegúrate de incluir modalPopup como dependencia para que se ejecute cuando cambie

  return (
    // <Nav/>
    <>
      {/* <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE}> */}
      <div className="w-100 d-flex flex-column align-items-center">
        <Header
          cantCart={cantProductsOnCart}
          detailInfoPerfil={detailInfoProfile}
          setIsLoggedInPartner={() => setIsLoggedIn(true)}
          productsInCart={productsCart}
          getAllProductsByCart={getCantCart}
          getAllProductsByCartNotoken={funcionValidation}
          changueOffCanvasCart={changueOffCanvasCart}
          handleShowOffCanvas={handleShowOffCanvas}
          handleShowOffCanvasClose={() => setChangueOffcanvasCart(false)}
        />
        <HeaderResponsive
          canCart={cantProductsOnCart}
          detailInfoProfile={detailInfoProfile}
          setIsLoggedInPartner={() => setIsLoggedIn(true)}
          handleShowOffCanvas={() => setChangueOffcanvasCart(true)}
          handleShowOffCanvasClose={() => setChangueOffcanvasCart(false)}
        />

        <Banner />
        <ProductsInCart />
        <OfertaDia />
        <OfertaDestacada />
        <OfertaFlash />
        <Recientes
          bannersInfo={bannersInfo}
          updateCantProducts={() => {
            getCantCart();
          }}
          setIsLoggedInPartner={() => setIsLoggedIn(true)}
          setIsntLoggedInPartner={() => setIsLoggedIn(false)}
          updateCantProductsWithouthToken={getCantCartWhithoutToken}
          // setMinQty={() => setMinQty(minQty + 1)}
          handleOffcanvasCart={()=>setChangueOffcanvasCart(true)}
          className="w-100"
        />
        <Promociones
          bannersInfo={bannersInfo}
          updateCantProducts={() => {
            getCantCart();
          }}
          setIsLoggedInPartner={() => setIsLoggedIn(true)}
          setIsntLoggedInPartner={() => setIsLoggedIn(false)}
          updateCantProductsWithouthToken={getCantCartWhithoutToken}
          handleOffcanvasCart={()=>setChangueOffcanvasCart(true)}
        />
        <Vendidos
          bannersInfo={bannersInfo}
          updateCantProducts={() => {
            getCantCart();
          }}
          setIsLoggedInPartner={() => setIsLoggedIn(true)}
          setIsntLoggedInPartner={() => setIsLoggedIn(false)}
          updateCantProductsWithouthToken={getCantCartWhithoutToken}
          // setMinQty={() => setMinQty(minQty + 1)}
          handleOffcanvasCart={()=>setChangueOffcanvasCart(true)}

        />
        {/* <Populares /> */}
        <Bannerdown bannersInfo={bannersInfo} />
        <Footer />
        {/* Modal popup */}
        <Modal
          className="modal-dialog-centered modal-lg"
          toggle={() => setModalPopup(false)}
          isOpen={modalPopup}
          backdrop="static"
        >
          <ModalHeader toggle={() => closeModalPopup()}></ModalHeader>
          <ModalBody>
            <Popup datosPopup={datosPopup} />
          </ModalBody>
        </Modal>
      </div>
      {/* </GoogleOAuthProvider> */}
    </>
    // <h1>Home</h1>
  );
};

export default Home;
