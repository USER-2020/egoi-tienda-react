import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import HeaderResponsive from '../components/headerResponsive'
import DetailProduct from '../components/detailProduct/detailProduct.tsx'
import SimilarProduct from '../components/detailProduct/similarProduct.tsx'

function detailsProduct(props) {
  return (
    <>
    <Header/>
    <HeaderResponsive/>
    <DetailProduct/>
    <SimilarProduct/>
    <Footer/>
    </>
  )
}

export default detailsProduct
