import React, { useState } from "react";
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
} from "reactstrap";
import styles from "../styles/navbar.css";
import logo from "../assets/logo.png";

import Header from "../components/header";
import Footer from "../components/footer";

const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (  

    // <Nav/>
    <>
      
      <Header />
      <Footer />
    </>
    // <h1>Home</h1>
    
  );
};

export default Home;
