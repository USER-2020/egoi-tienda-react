import React from 'react'
import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Footer from '../components/footer'
import TermsAndConditionsComponent from '../components/termsAndConditionsComponent'

const TermsAndConditionsPage = () => {
  return (
    <div  className="w-100 d-flex flex-column align-items-center">
      <Header/>
      <HeaderResponsive/>
      <TermsAndConditionsComponent/>
      <Footer/>
    </div>
  )
}

export default TermsAndConditionsPage
