import React, { useState } from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import HeaderResponsive from "../components/headerResponsive";
import HeaderCategories from "../components/categories/headerCategories.tsx";
import ProductsCategories from "../components/categories/productsCategories.tsx";
import HeaderResponsiveCategorie from "../components/categories/headerResponsiveCategorie.tsx";
import ProductsResponsiveCategorie from './../components/categories/productsResponsiveCategorie.tsx';

const Category = (props) => {
    // const categoryId = props.match.params.category;
    // const subcategoryId = props.match.params.subcategory;
    // const productId = props.match.params.id;
    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);
    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);
    // const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado del login

    // const toggleLogin = () => {
    //   setIsLoggedIn(!isLoggedIn);
    // };

  return (
    <>
    <Header />
    <HeaderResponsive/>
    {/* <HeaderCategories/> */}
    {/* <HeaderResponsiveCategorie/> */}
    <ProductsCategories/>
    {/* <ProductsResponsiveCategorie/> */}
    <Footer />
    </>
  )
}

export default Category;
