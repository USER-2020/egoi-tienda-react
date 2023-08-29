import React from 'react'
import Header from '../components/header'
import HeaderResponsive from '../components/headerResponsive'
import Footer from '../components/footer'
import ShowCategoriesComponent from '../components/categories/showCategories.tsx'

const AllCategoriesView = () => {
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header/>
      <HeaderResponsive/>
      <ShowCategoriesComponent/>
      <Footer/>
    </div>
  )
}

export default AllCategoriesView
