import React from 'react'
import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Footer from '../components/footer'
import ContactacUsComponent from '../components/contactacUsComponent'

const Contactac = () => {
  return (
    <div  className="w-100 d-flex flex-column align-items-center">
      <Header/>
      <HeaderResponsive/>
      <ContactacUsComponent/>
      <Footer/>
    </div>
  )
}

export default Contactac
