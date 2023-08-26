import React from 'react'
import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Footer from '../components/footer'
import AboutUsComponent from '../components/aboutUsComponent'

const AboutUs = () => {
  return (
    <div  className="w-100 d-flex flex-column align-items-center" >
      <Header/>
      <HeaderResponsive/>
      <AboutUsComponent/>
      <Footer/>
    </div>
  )
}

export default AboutUs
