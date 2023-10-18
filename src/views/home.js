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
  Modal, ModalBody,
  ModalHeader
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
import { getPopup } from '../services/banners';
import { getCurrentUser } from './../helpers/Utils';
import { allProductsCart } from "../services/cart";
import { getOfferHigligth, getOfferOfDay } from "../services/ofertas";
import OfertaDia from "../components/home/ofertaDia";
import OfertaDestacada from "../components/home/ofertaDestacada";
import OfertaFlash from "../components/home/ofertaFlash";
import { getUserProfileInfo } from "../services/ordenes";

const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado del login
  const [modalPopup, setModalPopup] = useState(false);
  const [bannersInfo, setBannersInfo] = useState([]);

  const [datosPopup, setDatosPopup] = useState('');
  const [detailInfoProfile, setDetailInfoProfile] = useState([]);
  

  const currenUser = getCurrentUser();

  const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currenUser sea null


  const [cantProductsOnCart, setCantProductsOnCart] = useState('');


  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleModalData = () => {
    setModalPopup(false);
  }

  const closeModalPopup = () => {
    setModalPopup(false);
  }

  const handleShowPopup = () => {
    setModalPopup(true);
  }

  const getAllBanners = () => {
    getBanners()
      .then((res) => {
        // console.log(res.data);
        setBannersInfo(res.data);
      }).catch((err) => console.log(err));
  }

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


      }).catch((err) => console.log(err));
  }

  const getAllInfoPerfil = () => {
    getUserProfileInfo(token)
      .then((res) => {
        // console.log(res.data);
        setDetailInfoProfile(res.data);
      }).catch((err) => console.log(err));
  }

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
    
    // getOfferDestacada();
    // offerDay();
  }, []);


  useEffect(() => {
    getAllInfoPerfil();
  },[currenUser, token])

  return (

    // <Nav/>
    <div className="w-100 d-flex flex-column align-items-center">

      <Header cantCart={cantProductsOnCart} detailInfoPerfil={detailInfoProfile}/>
      <HeaderResponsive canCart={cantProductsOnCart} detailInfoProfile={detailInfoProfile}/>
      <Banner />
      <OfertaDia />
      <OfertaDestacada/>
      <OfertaFlash/>
      <Recientes bannersInfo={bannersInfo} className="w-100" />
      <Promociones bannersInfo={bannersInfo} />
      <Vendidos bannersInfo={bannersInfo} />
      {/* <Populares /> */}
      <Bannerdown bannersInfo={bannersInfo} />
      <Footer />
      {/* Modal popup */}
      <Modal
        className="modal-dialog-centered modal-lg"
        toggle={() => setModalPopup(false)}
        isOpen={modalPopup}

      >
        <ModalHeader toggle={() => setModalPopup(false)}></ModalHeader>
        <ModalBody>
          <Popup handleModalData={handleModalData} datosPopup={datosPopup} closeModalPopup={() => setModalPopup(false)} />
        </ModalBody>
      </Modal>
    </div>
    // <h1>Home</h1>

  );
};

export default Home;
