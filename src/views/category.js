import React, { useState } from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import HeaderResponsive from "../components/headerResponsive";
import HeaderCategories from "../components/categories/headerCategories.tsx";
import ProductsCategories from "../components/categories/productsCategories.tsx";
import HeaderResponsiveCategorie from "../components/categories/headerResponsiveCategorie.tsx";

const category = (props) => {
    // const categoryId = props.match.params.category;
    // const subcategoryId = props.match.params.subcategory;
    // const productId = props.match.params.id;
    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);

  return (
    <>
    <Header />
    <HeaderResponsive/>
    <HeaderCategories/>
    <HeaderResponsiveCategorie/>
    <ProductsCategories/>
    <Footer />
    </>
  )
}

export default category;
