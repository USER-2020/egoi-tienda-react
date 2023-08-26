import React from 'react'
import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Footer from '../components/footer'
import PoliticaPrivacidadComponent from '../components/politicaPrivacidadComponent'

const PoliticaPrivacidad = () => {
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header/>
      <HeaderResponsive/>
      <PoliticaPrivacidadComponent/>
      <Footer/>
    </div>
  )
}

export default PoliticaPrivacidad

