import React from 'react'
import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Orders from '../components/myOrders/OrdersOpciones.tsx'
import Footer from '../components/footer'

function MyOrders(props) {
  return (
    <div className="w-100 d-flex flex-column align-items-center">
    <Header/>
    <HeaderResponsive/>
    <Orders/>
    <Footer/>
    </div>
  )
}

export default MyOrders
