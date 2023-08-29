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
  Modal, ModalBody
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

const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado del login
  const [modalPopup, setModalPopup] = useState(false);
  const [bannersInfo, setBannersInfo] = useState([]);

  const [datosPopup, setDatosPopup] = useState('');

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleModalData = () => {
    setModalPopup(false);
  }
  
  const handleTogglePopup = () => {
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
      }).catch((err)=> console.log(err));
  }

  const getPrincipalPopup = () => {
    getPopup()
      .then((res) => {
        if (!res.data || Object.keys(res.data).length > 0) {
          setDatosPopup(res.data);
          setModalPopup(true);
        } else {
          // setDatosPopup(res.data);
          setModalPopup(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(()=>{
    getAllBanners();
    getPrincipalPopup();
  },[]);

  return (

    // <Nav/>
    <div className="w-100 d-flex flex-column align-items-center">

      <Header />
      <HeaderResponsive />
      <Banner />
      <Recientes bannersInfo={bannersInfo} className="w-100"/>
      <Promociones bannersInfo={bannersInfo}/>
      <Vendidos bannersInfo={bannersInfo}/>
      {/* <Populares /> */}
      <Bannerdown bannersInfo={bannersInfo}/>
      <Footer />
      {/* Modal popup */}
      <Modal
        className="modal-dialog-centered modal-lg"
        toggle={() => setModalPopup(false)}
        isOpen={modalPopup}

      >
        <ModalBody>
          <Popup handleModalData={handleModalData} datosPopup={datosPopup}/>
        </ModalBody>
      </Modal>
    </div>
    // <h1>Home</h1>

  );
};

export default Home;
