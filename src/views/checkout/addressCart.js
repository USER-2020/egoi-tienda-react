import React from 'react'
import Header from './../../components/header';
import HeaderResponsive from '../../components/headerResponsive';
import AddressCart from '../../components/cart/checkout.tsx';
import Footer from '../../components/footer';

function DressCart() {
  return (
    <div>
      <>
      <Header/>
      <HeaderResponsive/>
      <AddressCart/>
      <Footer/>
      </>
    </div>
  )
}

export default DressCart
