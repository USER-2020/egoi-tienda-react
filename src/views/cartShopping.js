import React from 'react'
import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import DetailCart from '../components/cart/detailCart.tsx'
import Footer from '../components/footer'

function CartShopping() {
  return (
    <div className="w-100 d-flex flex-column align-items-center">
    <Header/>
    <HeaderResponsive/>
    <DetailCart/>
    <Footer/>
    </div>
  )
}

export default CartShopping
