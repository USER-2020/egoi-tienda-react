import React from 'react'
import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Footer from '../components/footer'
import ShowBrandsComponent from '../components/brands/showBrands.tsx'

const AllBrandsView = () => {
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header/>
      <HeaderResponsive/>
      <ShowBrandsComponent/>
      <Footer/>
    </div>
  )
}

export default AllBrandsView
