import React, { useContext, useEffect, useState } from 'react'
import '../../styles/productCategories.css'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import start from '../../assets/Star.png';
import start_1 from '../../assets/Star-1.png';

import iphoner from '../../assets/iphoneMuestra.png';
import { Link, useParams, useHistory } from 'react-router-dom';
import { subcategorieById } from '../../services/categories';
import { 
  filterProductsA_Z, 
  filterProductsBestRated, 
  filterProductsFeaturePrefer, 
  filterProductsHigh_Low, 
  filterProductsLow_High, 
  filterProductsMostSold, 
  filterProductsPrice, 
  filterProductsRecents, 
  filterProductsZ_A, 
  getProductsBySearch} from '../../services/filtros';
import HeaderCategories from './headerCategories.tsx';
import { getProductsByIdBrand } from '../../services/brands';
import HeaderResponsiveCategorie from './headerResponsiveCategorie.tsx';
import {AppContext} from '../../AppContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";




const ProductsCategories = () => {

  const { category, subcategory, id, brandId, name} = useParams();
  const [products, setProducts ] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);

  // const [selectedFilters, setSelectedFilters] = useState(null);
  const [selectedFiltersRecent, setSelectedFiltersRecent] = useState("");
  const [selectedFiltersZ_A, setSelectedFiltersZ_A] = useState("");
  const [selectedFiltersA_Z, setSelectedFiltersA_Z] = useState("");
  const [selectedFiltersHigh_Low, setSelectedFiltersHigh_Low] = useState("");
  const [selectedFiltersLow_High, setSelectedFiltersLow_High] = useState("");
  const [priceStart, setPriceStart] = useState("");
  const [priceEnd, setPriceEnd] = useState("");
  const [offset, setOffset] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  // const {searchProducts, setSearchProducts} = useContext(AppContext);

  // const filterRecent = (id) => {
  //   filterProductsRecents(id)
  //   .then((res)=> {
  //     console.log(res);
  //     productsBySubcategory(id, res.data);
  //     console.log("Producttos llmados desde el header de categorias con filtro", products);
  //   })
  //   .catch((err)=> console.log(err));
  // }
  
 
  // const handlePrevPage = () => {
  //   setOffset(offset - PAGE_SIZE);
  // };

  // const handleNextPage = () => {
  //   setOffset(offset + PAGE_SIZE);
  // };
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    scrollToTop();
  }, [currentPage]);

  

  const handleButtonClickRecent = () => {
    setSelectedFiltersRecent("recent");
    
  };

  const handleButtonClickZ_A = () => {
    setSelectedFiltersZ_A("Z-A");
    
  };

  const handleButtonClickA_Z = () => {
    setSelectedFiltersA_Z("A-Z");
    
  };

  const handleButtonClickHigh_Low = () => {
    setSelectedFiltersHigh_Low("H-L");
    
  };

  const handleButtonClickLow_High = () => {
    setSelectedFiltersLow_High("L-H");
    
  };

  
  /**
   * This function filters products by the most sold and sets the filtered products in the state.
   */
  const productsWithFilterMostSold=() => {
    filterProductsMostSold(id)
    .then((res)=>{
      console.log(res);
      setProducts(res.data);
      console.log("Producttos filtrados por los mas vendidos", res.data.products);
    })
    .catch((err)=>console.log(err));
  }

  const productsWithFilterBestRated=() => {
    filterProductsBestRated(id)
    .then((res)=>{
    console.log(res);
      setProducts(res.data);
      console.log("Producttos filtrados por los mas vendidos", res.data.products);
    })
    .catch((err)=>console.log(err));
  }

  const productsWithFilterFeaturePrefer=() => {
    filterProductsFeaturePrefer(id)
    .then((res)=>{
      console.log(res);
      setProducts(res.data);
      console.log("Producttos filtrados por los mas vendidos", res.data.products);
    })
    .catch((err)=>console.log(err));
  }

 const productsBySubcategoryWithFilter = (id) => {
  if(selectedFiltersRecent === 'recent'){
    filterProductsRecents(id)
    .then((res)=>{
      console.log(res);
      setProducts(res.data);
      console.log("Productos filtrados por mas reciente", res.data.products);

    })
    .catch((err)=> console.log(err));
    
  }
  else if(selectedFiltersHigh_Low === 'H-L'){
      filterProductsHigh_Low(id)
      .then((res)=>{
        console.log(res);
        setProducts(res.data);
        console.log("Productos filtrados del mas caro al mas barato", res.data.products);
      })
      .catch((err)=> console.log(err));
  }
  else if(selectedFiltersLow_High == 'L-H'){
    filterProductsLow_High(id)
    .then((res)=> {
      console.log(res);
      setProducts(res.data);
      console.log("Productos filtrados del mas barato al mas caro", res.data.products);
    })
    .catch((err) => console.log(err));
  }
  else if(selectedFiltersA_Z === 'A-Z'){
    filterProductsA_Z(id)
    .then((res)=>{
      console.log(res);
      setProducts(res.data);
      console.log("Productos filtrados por orden alfabetico A-Z", res.data.products);
    })
    .catch((err)=> console.log(err));
  }
  else if(selectedFiltersZ_A === 'Z-A'){
    filterProductsZ_A(id)
    .then((res)=>{
      console.log(res);
      setProducts(res.data);
      console.log("Productos filtrados por orden alfabetico Z-A", res.data.products);
    })
    .catch((err)=> console.log(err));
  }
  else{
    subcategorieById(id, offset)
    .then((res) => {
      console.log(res);
      setProducts(res.data);
      setTotalResults(res.data.total_size);
      console.log("Productos por el id", res.data.products);
      console.log("Este es el total de productos", res.data.total_size);
      
    })
    .catch((err) => console.log(err));

  }

  };

  const handlePriceStartChange = (event) => {
    setPriceStart(event.target.value);
    console.log(event.target.value);
  };

  const handlePriceEndChange = (event) => {
    setPriceEnd(event.target.value);
    console.log(event.target.value);
  };

  const handleApplyFilters = () => {
    console.log("Estoy adentro de apllyFilters");
    filterProductsPrice(id, priceStart, priceEnd)
      .then((res) => {
        console.log(res);
        setProducts(res.data);
        console.log("Productos filtrados por rango de precio", res.data.products);
      })
      .catch((error) => console.error(error));
      
  };
  

  const productsByBrand = (brandId) => {
    getProductsByIdBrand(brandId)
    .then((res)=>{
      console.log(res);
      setProducts(res.data);
      console.log("Productos por marca", res.data.products);
      
    })
    .catch((err) => console.log(err));
  }
  
  const resultsSearch = (searchProducts) => {
    if(searchProducts){
      getProductsBySearch(searchProducts)
      .then((res)=>{
        console.log(res);
        setProducts(res.data);
        console.log("Respuesta de los productos por busqueda", res.data.products );
      })
    }
  }

  const pageButtons = [];
  const totalPages = Math.ceil(totalResults / 30);
  for (let i = 0; i < totalPages; i++) {
    const isActive = i === currentPage -1;
    pageButtons.push(
      <button
        key={i}
        onClick={() => {
          setCurrentPage(i + 1) 
          handlePageClick(i * 30)
         }
        }
        disabled={isActive}
        className={isActive ? "d-flex justify-content-center align-items-center btn btn-primary rounded-circle mx-1" : "btn  rounded-circle mx-1 d-flex justify-content-center align-items-center"}
        style={{width: "30px", height: "30px" }}
     >
        {i + 1}
      </button>
    );
  }
  console.log('page', currentPage)

  function handlePageClick(offset) {
    // const totalPages = Math.ceil(totalResults / 12);
    const maxOffset = (totalPages);
    const adjustedOffset = Math.min(Math.max(offset, 0), maxOffset);
    setOffset(adjustedOffset);
    console.log("Offset", adjustedOffset);
    
    // const adjustedOffset = Math.min(Math.max(newOffset, 0), totalPages);
    // setOffset(adjustedOffset);
    // console.log("Offset", adjustedOffset);
  }

  useEffect(()=>{
    if(id){
     
      productsBySubcategoryWithFilter(id);
    }
    if(brandId){

      productsByBrand(brandId);
    }
      // productsWithFilterMostSold();
      // productsWithFilterBestRated();
      // productsWithFilterFeaturePrefer();
    if(name?.length){
      resultsSearch(name);
    }else{
      console.log("No existe SearchProducts");
    }
    
  }, [id, brandId,selectedFiltersRecent, selectedFiltersHigh_Low, 
    selectedFiltersLow_High, selectedFiltersA_Z, selectedFiltersZ_A, 
    offset, currentPage, name]);


  


  const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";

  // console.log(category)
  // console.log(subcategory)
  // console.log(id)

  // const handleSubcategoryClick = (id) => {
  //   setCurrentSubcategoryId(id);
  // };

  return (

    
  <>
  <HeaderCategories handleClickFilterRecent={handleButtonClickRecent} 
                    handleClickFilterHigh_Low={handleButtonClickHigh_Low} 
                    handleClickFilterLow_High={handleButtonClickLow_High} 
                    handleClickFilterA_Z={handleButtonClickA_Z}
                    handleClickFilterZ_A={handleButtonClickZ_A}
                    priceStart={priceStart}
                    priceEnd={priceEnd}
                    handlePriceStartChange={handlePriceStartChange}
                    handlePriceEndChange={handlePriceEndChange}
                    handleApplyRangeFilters={handleApplyFilters}
                    handleAplyFilterByBrand={productsByBrand}

  />
  <HeaderResponsiveCategorie  handleClickFilterRecent={handleButtonClickRecent} 
                              handleClickFilterHigh_Low={handleButtonClickHigh_Low} 
                              handleClickFilterLow_High={handleButtonClickLow_High} 
                              handleClickFilterA_Z={handleButtonClickA_Z}
                              handleClickFilterZ_A={handleButtonClickZ_A}
                              priceStart={priceStart}
                              priceEnd={priceEnd}
                              handlePriceStartChange={handlePriceStartChange}
                              handlePriceEndChange={handlePriceEndChange}
                              handleApplyRangeFilters={handleApplyFilters}

                    />
  {/* <HeaderCategories onFilterCLick={handleFilterClick}/> */}
  <div className='containerProductCategorie' >
      <div className='container'>
      <div className="containerProductsIndex  d-flex ">
        <div className="menuBusqueda w-30 ">
          <div className="filtros">
            <input type="radio" className="form-check-input" onClick={productsWithFilterMostSold}/> 
            Productos más vendidos
          </div>
          <div className="filtros">
            <input type="radio" className="form-check-input" onClick={productsWithFilterBestRated}/> 
            Mejor calificados
          </div>
          <div className="filtros">
            <input type="radio" className="form-check-input" onClick={productsWithFilterFeaturePrefer}/> 
            Los más preferidos
  
          </div>
          
          
        </div>
        <div className="containerProducts d-flex flex-column align-items-center align-items-md-end w-100">
          <div className="containerProductos row w-100">
            {products && products.products && products.products.map((product, index)=> (
              <div key={product.id} className="col-md-4 col-6 mb-4">
              <a href="#" className='containerCard2  ' >
                  <Link to={`/detailsProduct/${product.id}/${product.slug}`} key={index}>
                  <Card className="">
                    <CardImg top src={baseUrlImage + product.images[0]} alt={product.name} style={{padding:"1rem", objectFit: "cover" }} height={300} className='d-none d-md-block'/>
                    <CardImg top src={baseUrlImage + product.images[0]} alt={product.name} style={{padding:"1rem", objectFit: "cover" }} height={150} className='d-block d-md-none'/>
                    <CardBody>
                      <div className="starts">
                        <img src={start} />
                        <img src={start} />
                        <img src={start} />
                        <img src={start_1} />
                        <img src={start_1} />
                      </div>
                      <CardSubtitle tag="h5" className="text-muted" style={{ lineHeight: "1.2", maxHeight: "2.5em", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {product.name}
                      </CardSubtitle>
                      <CardTitle tag="h5">${product.unit_price.toLocaleString()}</CardTitle>
                    </CardBody>
                  </Card>
                </Link>
                </a>
              </div>
              ))}
            
            
          </div>
          {/* <button disabled={offset === 0} onClick={handlePrevPage}>
            Prev Page
          </button>
          <button onClick={handleNextPage}>Next Page</button> */}
          <div className="d-flex align-items-center paginaton mt-4 align-self-center">
          {
              currentPage !== 1 && (
                <button
                onClick={() => {
                  setCurrentPage(1);
                  handlePageClick(0);
                }}
                className="btn mx-1"
              >
                <FontAwesomeIcon icon={faChevronLeft} /><FontAwesomeIcon icon={faChevronLeft} />
              </button>
              )
              
            }
            {
              currentPage !== 1 && (
                <button
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  handlePageClick(offset - 30);
                }}
                className="btn mx-1"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              )
            }

              {pageButtons}
              {
                currentPage !== totalPages && totalPages !== 0 && (
                  <button
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    handlePageClick(offset + 30);
                  }}
                  className="btn mx-1"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
                )
              }
              {
                currentPage !== totalPages && totalPages !== 2 && totalPages!==0 && (
                  <button
                  onClick={() => {
                    setCurrentPage(totalPages);
                    handlePageClick((totalPages - 1) * 30);
                  }}
                  className="btn mx-1"
                >
                  <FontAwesomeIcon icon={faChevronRight} /><FontAwesomeIcon icon={faChevronRight} />
                </button>
                )
              }
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
    
              
  )
}

export default ProductsCategories;
