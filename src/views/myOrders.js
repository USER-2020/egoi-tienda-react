import React from 'react'
import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Orders from '../components/myOrders/orders.tsx'
import Footer from '../components/footer'

function MyOrders(props) {
  return (
    <>
    <Header/>
    <HeaderResponsive/>
    <Orders/>
    <Footer/>
    </>
  )
}

export default MyOrders
