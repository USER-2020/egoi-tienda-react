import React, { useContext, useEffect, useState } from 'react'
import '../../styles/productCategories.css'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import start from '../../assets/egoi_icons/star-fill.svg';
import startEmpty from '../../assets/egoi_icons/star-fill-gray.svg';
import start_1 from '../../assets/Star-1.png';

import iphoner from '../../assets/iphoneMuestra.png';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import { discountedProducts, subcategorieById } from '../../services/categories';
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
  getProductsBySearch
} from '../../services/filtros';
import HeaderCategories from './headerCategories.tsx';
import { getProductsByIdBrand } from '../../services/brands';
import HeaderResponsiveCategorie from './headerResponsiveCategorie.tsx';
import { AppContext } from '../../AppContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { ProductosDescuento, ProductosMasVendidos, ProductosParaPresentar, ProductosRecientes, ProdutosMejorValorados } from '../../services/productos';




const ProductsCategories = () => {

  const { category, subcategory, id, brandId, name, tag } = useParams();
  const [products, setProducts] = useState([]);
  // const [productsDiscounted, setProductsDiscounted] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);

  // const [selectedFilters, setSelectedFilters] = useState(null);
  const [selectedFiltersRecent, setSelectedFiltersRecent] = useState("");
  const [selectedFiltersZ_A, setSelectedFiltersZ_A] = useState("");
  const [selectedFiltersA_Z, setSelectedFiltersA_Z] = useState("");
  const [selectedFiltersHigh_Low, setSelectedFiltersHigh_Low] = useState("");
  const [selectedFiltersLow_High, setSelectedFiltersLow_High] = useState("");
  const [priceStart, setPriceStart] = useState("");
  const [priceEnd, setPriceEnd] = useState("");
  const [offset, setOffset] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);


  // Verificar si la ruta es /discountedProducts
  const location = useLocation();
  const isDiscountedProducts = location.pathname === '/discountedProducts';
  // Verificar si la ruta es /discountedProducts

  const isRecentlyProducts = location.pathname === '/recentlySeen';
  // Verificar si la ruta es /discountedProducts

  const isPromotionsProducts = location.pathname === '/promotions';
  // Verificar si la ruta es /discountedProducts

  const isBestProducts = location.pathname === '/bestSellers';

  const isAddRecently = location.pathname === '/addRecently';

  const isTopRated = location.pathname === '/topRated';

  const isFeatureProduct = location.pathname === '/topFeatured';

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
  const productsWithFilterMostSold = () => {
    filterProductsMostSold(id)
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
        // console.log("Producttos filtrados por los mas vendidos", res.data.products);
      })
      .catch((err) => console.log(err));
  }

  /* Productos en descuento */
  const getDiscountByProducts = () => {
    discountedProducts(offset)
      .then((res) => {
        // console.log("Productos en descuento", res.data.products);
        setProducts(res.data);
        setTotalResults(res.data.total_size);
      }).catch((err) => console.log(err));
  }

  /* Vistos recientemente */
  const getRecentlySee = () => {
    ProductosRecientes(offset)
      .then((res) => {
        //console.log("Productos recientes", res.data.products);
        setProducts(res.data);
        setTotalResults(res.data.total_size);
      }).catch((err) => console.log(err));
  }

  /* Promociones imperdibles */
  const getPromotions = () => {
    ProductosDescuento(offset)
      .then((res) => {
        // console.log("Promociones imperdibles", res.data.products);
        setProducts(res.data);
        setTotalResults(res.data.total_size);
      }).catch((err) => console.log(err));
  }

  /* Productos mas vendidos */
  const getBestSelling = () => {
    ProductosMasVendidos(offset)
      .then((res) => {
        // console.log("Productos mas vendidos", res.data.products);
        setProducts(res.data);
        setTotalResults(res.data.total_size);
      }).catch((err) => console.log(err));
  }

  /* Productos mejor calificados */
  const getTopRated = () => {
    ProdutosMejorValorados(offset)
      .then((res) => {
        // console.log('Produtos Mejor Valorados',res.data.products);
        setProducts(res.data);
        setTotalResults(res.data.total_size);
      }).catch((err) => console.log(err));
  }

  /* Proiductos destacados */
  const getFeatureProducts = () => {
    ProductosParaPresentar(offset)
      .then((res) => {
        //console.log("Productos destacados", res.data.products);
        setProducts(res.data);
        setTotalResults(res.data.total_size);
      }).catch((err) => console.log(err));
  }

  const productsWithFilterBestRated = () => {
    filterProductsBestRated(id)
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
        // console.log("Producttos filtrados por los mas vendidos", res.data.products);
      })
      .catch((err) => console.log(err));
  }

  const productsWithFilterFeaturePrefer = () => {
    filterProductsFeaturePrefer(id)
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
        // console.log("Producttos filtrados por los mas vendidos", res.data.products);
      })
      .catch((err) => console.log(err));
  }

  const productsBySubcategoryWithFilter = (id) => {
    if (selectedFiltersRecent === 'recent') {
      filterProductsRecents(id)
        .then((res) => {
          // console.log(res);
          setProducts(res.data);
          // console.log("Productos filtrados por mas reciente", res.data.products);

        })
        .catch((err) => console.log(err));

    }
    else if (selectedFiltersHigh_Low === 'H-L') {
      filterProductsHigh_Low(id)
        .then((res) => {
          // console.log(res);
          setProducts(res.data);
          // console.log("Productos filtrados del mas caro al mas barato", res.data.products);
        })
        .catch((err) => console.log(err));
    }
    else if (selectedFiltersLow_High == 'L-H') {
      filterProductsLow_High(id)
        .then((res) => {
          // console.log(res);
          setProducts(res.data);
          // console.log("Productos filtrados del mas barato al mas caro", res.data.products);
        })
        .catch((err) => console.log(err));
    }
    else if (selectedFiltersA_Z === 'A-Z') {
      filterProductsA_Z(id)
        .then((res) => {
          // console.log(res);
          setProducts(res.data);
          // console.log("Productos filtrados por orden alfabetico A-Z", res.data.products);
        })
        .catch((err) => console.log(err));
    }
    else if (selectedFiltersZ_A === 'Z-A') {
      filterProductsZ_A(id)
        .then((res) => {
          // console.log(res);
          setProducts(res.data);
          // console.log("Productos filtrados por orden alfabetico Z-A", res.data.products);
        })
        .catch((err) => console.log(err));
    }
    else {
      subcategorieById(id, offset, tag)
        .then((res) => {
          console.log(res);
          setProducts(res.data);
          setTotalResults(res.data.total_size);
          console.log(res.data.total_size);
          // console.log("Productos por el id", res.data.products);
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
    // console.log("Estoy adentro de apllyFilters");
    filterProductsPrice(id, priceStart, priceEnd)
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
        // console.log("Productos filtrados por rango de precio", res.data.products);
      })
      .catch((error) => console.error(error));

  };


  const productsByBrand = (brandId) => {
    getProductsByIdBrand(brandId)
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
        // console.log("Productos por marca", res.data.products);

      })
      .catch((err) => console.log(err));
  }

  const resultsSearch = (searchProducts) => {
    if (searchProducts) {
      getProductsBySearch(searchProducts)
        .then((res) => {
          // console.log(res);
          setProducts(res.data);
          // console.log("Respuesta de los productos por busqueda", res.data.products);
        })
    }
  }


  const pageButtons = [];
  const totalPages = Math.ceil(totalResults / 20);
  for (let i = 0; i < totalPages; i++) {
    const isActive = i === currentPage - 1;
    pageButtons.push(
      <button
        key={i}
        onClick={() => handlePageClick(i + 1)}
        className={isActive ? "selectedPage d-flex justify-content-center align-items-center btn rounded-circle mx-1" : "unSelectedPage btn  rounded-circle mx-1 d-flex justify-content-center align-items-center bg-none bg-#FC5241"}
        style={{ width: "30px", height: "30px" }}
      >
        {i + 1}
      </button>
    );
  }


  // const pageButtons = [];
  // const totalPages = Math.ceil(totalResults / 20);
  // for (let i = 0; i < totalPages; i++) {
  //   const isActive = i === currentPage - 1;
  //   console.log(currentPage);
  //   pageButtons.push(
  //     <button
  //       key={i}
  //       onClick={() => {
  //         setCurrentPage(i + 1)
  //         handlePageClick(i * 20)
  //       }
  //       }
  //       className={isActive ? "selectedPage d-flex justify-content-center align-items-center btn rounded-circle mx-1" : "unSelectedPage btn  rounded-circle mx-1 d-flex justify-content-center align-items-center bg-none bg-#FC5241"}
  //       style={{ width: "30px", height: "30px" }}
  //     >
  //       {i + 1}
  //     </button>
  //   );
  // }
  // console.log('page', currentPage)

  // function handlePageClick(offset) {
  //   // const totalPages = Math.ceil(totalResults / 12);
  //   const maxOffset = (totalPages);
  //   const adjustedOffset = Math.min(Math.max(offset, 0), maxOffset);
  //   setOffset(adjustedOffset);
  //   console.log("Offset", adjustedOffset);
  //   console.log(totalResults);

  //   // const adjustedOffset = Math.min(Math.max(newOffset, 0), totalPages);
  //   // setOffset(adjustedOffset);
  //   // console.log("Offset", adjustedOffset);
  // }
  function handlePageClick(newPage) {
    // console.log(newPage);
    const adjustedOffset = (newPage);
    setOffset(adjustedOffset);
    setCurrentPage(newPage);
    // console.log("Offset", adjustedOffset);
  }

  // Función para agregar un producto a la lista de vistos recientemente
  const agregarProductoVisto = (product) => {
    // Obtén los productos vistos recientemente del almacenamiento local
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    // Agrega el producto actual a la lista de productos vistos recientemente
    const updatedRecentlyViewed = [product, ...recentlyViewed];

    // Limita la lista a un cierto número de productos si es necesario
    const maxItems = 15;
    const limitedList = updatedRecentlyViewed.slice(0, maxItems);

    // Almacena la lista actualizada en el almacenamiento local
    localStorage.setItem('recentlyViewed', JSON.stringify(limitedList));
  }

  const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

  useEffect(() => {
    if (id) {

      productsBySubcategoryWithFilter(id);
    }
    if (brandId) {

      productsByBrand(brandId);
    }

    if (isDiscountedProducts) {
      getDiscountByProducts();
      // setProducts(products.products);
    }

    if (isRecentlyProducts) {

      console.log(recentlyViewed);
    }

    if (isAddRecently) {

      getRecentlySee();
    }

    if (isPromotionsProducts) {
      getPromotions();
    }

    if (isBestProducts) {
      getBestSelling();
    }

    if (isTopRated) {
      getTopRated();
    }

    if (isFeatureProduct) {
      getFeatureProducts();
    }

    // productsWithFilterMostSold();
    // productsWithFilterBestRated();
    // productsWithFilterFeaturePrefer();
    if (name?.length) {
      resultsSearch(name);
    } else {
      // console.log("No existe SearchProducts");
    }

  }, [id, brandId, selectedFiltersRecent, selectedFiltersHigh_Low,
    selectedFiltersLow_High, selectedFiltersA_Z, selectedFiltersZ_A,
    offset, currentPage, name, isDiscountedProducts]);






  const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";

  // console.log(category)
  // console.log(subcategory)
  // console.log(id)

  // const handleSubcategoryClick = (id) => {
  //   setCurrentSubcategoryId(id);
  // };

  // console.log("Estos son los productos", products);

  return (


    <div className='w-100'>
      <HeaderCategories productsTag={products}
        handleClickFilterRecent={handleButtonClickRecent}
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
      <HeaderResponsiveCategorie productsTag={products}
        handleClickFilterRecent={handleButtonClickRecent}
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
                <input type="radio" className="form-check-input" onClick={productsWithFilterMostSold} />
                Productos más vendidos
              </div>
              <div className="filtros">
                <input type="radio" className="form-check-input" onClick={productsWithFilterBestRated} />
                Mejor calificados
              </div>
              <div className="filtros">
                <input type="radio" className="form-check-input" onClick={productsWithFilterFeaturePrefer} />
                Los más preferidos

              </div>


            </div>
            <div className="containerProducts-categories d-flex flex-column align-items-center align-items-md-end w-100">
              <div className="containerProducts-categories row">
                {/* {isDiscountedProducts && productsDiscounted } */}
                {isRecentlyProducts && recentlyViewed && recentlyViewed.map((product, index) => (
                  <div key={product.id} className="col-md-3 col-6 mb-4" >
                    <a href="#" className='containerCard2  '  >
                      <Link to={`/detailsProduct/${product.id}/${product.slug}`} key={index} onClick={() => agregarProductoVisto(product)}>
                        <Card className='cardProducto1' style={{ height: isDiscountedProducts || isPromotionsProducts ? '400px' : '390px' }} >
                          {isDiscountedProducts && product.discount_type === 'flat' && (
                            <span className='tagDiscounted'>$ {product.discount.toLocaleString('en')} off</span>
                          )}

                          {isDiscountedProducts && product.discount_type === 'percent' && (
                            <span className='tagDiscounted'>{product.discount}% Off</span>
                          )}

                          {product.current_stock <= 0 && (
                            <span className="agotadoTag">Agotado</span>
                          )}

                          <CardImg
                            src={baseUrlImage + product.images[0]}
                            alt={product.name}
                            className="producto-imagen-mobile"
                            style={{ padding: "1rem", objectFit: "contain", height: 150 }}
                          />
                          <CardImg
                            src={baseUrlImage + product.images[0]}
                            alt={product.name}
                            className="producto-imagen-desktop"
                            style={{ padding: "1rem", objectFit: "contain", height: isDiscountedProducts || isPromotionsProducts ? '200px' : '240px' }}
                          />
                          <CardBody>
                            <div className="starts">
                              {[...Array(5)].map((_, index) => (
                                <img
                                  key={index}
                                  src={index < product.count_rating ? start : startEmpty}
                                  alt=""
                                />
                              ))}
                            </div>
                            {product.unit_price >= 79990 ? (
                              <div style={{ display: 'flex', flexDirection: "row", color: 'green', gap: '5px' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ alignSelf: 'center' }}>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M13.5738 6.63403C13.1555 6.60036 12.6195 6.5999 11.8575 6.5999H5.53365C5.20228 6.5999 4.93365 6.33126 4.93366 5.99989C4.93367 5.66852 5.2023 5.3999 5.53367 5.3999L11.8831 5.3999C12.6136 5.3999 13.1979 5.39989 13.6701 5.4379C14.1544 5.4769 14.5729 5.5588 14.9581 5.7522C15.5758 6.0623 16.0796 6.55796 16.3959 7.16963C16.5937 7.5522 16.6774 7.96782 16.7171 8.44703C16.7394 8.71606 16.7488 9.02184 16.7528 9.37049H17.3906C18.2149 9.37049 18.8697 9.37048 19.3978 9.413C19.9382 9.4565 20.3981 9.54742 20.8192 9.75885C21.5001 10.1007 22.0553 10.647 22.4038 11.3209C22.6199 11.7388 22.7127 12.1953 22.757 12.7297C22.8002 13.2511 22.8002 13.8972 22.8002 14.7086V15.6375C22.8002 15.8056 22.8002 15.9662 22.789 16.1018C22.7767 16.2499 22.748 16.4204 22.66 16.5906C22.5368 16.8288 22.3412 17.0207 22.1027 17.1405C21.933 17.2257 21.7633 17.2535 21.6149 17.2654C21.4785 17.2764 21.3164 17.2764 21.1453 17.2764L21.0251 17.2764C20.7695 18.0488 20.034 18.5999 19.178 18.5999C18.322 18.5999 17.5865 18.0487 17.3309 17.2764H9.94356C9.68799 18.0488 8.95248 18.5999 8.09648 18.5999C7.22063 18.5999 6.47092 18.0229 6.2324 17.2223C5.98721 17.21 5.79037 17.2042 5.53366 17.2042C5.20229 17.2042 4.93366 16.9356 4.93366 16.6042C4.93366 16.2729 5.20229 16.0042 5.53366 16.0042C5.80655 16.0042 6.02013 16.0104 6.26817 16.0226C6.53951 15.2784 7.26044 14.7528 8.09648 14.7528C8.95248 14.7528 9.68799 15.304 9.94356 16.0764H15.5557V10.2352C15.5557 9.4839 15.5553 8.95705 15.5212 8.54619C15.4877 8.1426 15.425 7.90448 15.33 7.72082C15.1312 7.33633 14.813 7.0221 14.4197 6.82463C14.2303 6.72952 13.9853 6.66716 13.5738 6.63403ZM16.7557 10.5705V16.0764H17.3309C17.5865 15.304 18.322 14.7528 19.178 14.7528C20.034 14.7528 20.7695 15.304 21.0251 16.0764H21.1256C21.3235 16.0764 21.4363 16.0759 21.5186 16.0693C21.547 16.067 21.5642 16.0644 21.5732 16.0628C21.5789 16.0588 21.5838 16.0542 21.5876 16.0493C21.5891 16.0404 21.5912 16.0255 21.5931 16.0026C21.5997 15.9228 21.6002 15.8129 21.6002 15.6175V14.7352C21.6002 13.8912 21.5997 13.2949 21.5611 12.8289C21.523 12.3701 21.4511 12.0911 21.3378 11.8721C21.1068 11.4253 20.7373 11.0605 20.2808 10.8313C20.0555 10.7181 19.769 10.6468 19.3015 10.6091C18.8272 10.5709 18.2207 10.5705 17.3646 10.5705H16.7557ZM2.71131 9.7499C2.71131 9.41853 2.97994 9.1499 3.31131 9.1499H7.08909C7.42046 9.1499 7.68909 9.41853 7.68909 9.7499C7.68909 10.0813 7.42046 10.3499 7.08909 10.3499H3.31131C2.97994 10.3499 2.71131 10.0813 2.71131 9.7499ZM1.2002 12.7499C1.2002 12.4185 1.46882 12.1499 1.8002 12.1499H7.84465C8.17602 12.1499 8.44465 12.4185 8.44465 12.7499C8.44465 13.0813 8.17602 13.3499 7.84465 13.3499H1.8002C1.46882 13.3499 1.2002 13.0813 1.2002 12.7499ZM8.09648 15.9528C7.68264 15.9528 7.36075 16.2775 7.3534 16.6624L7.35327 16.6764C7.35327 17.0676 7.67764 17.3999 8.09648 17.3999C8.51533 17.3999 8.83969 17.0676 8.83969 16.6764C8.83969 16.2851 8.51533 15.9528 8.09648 15.9528ZM19.178 15.9528C18.7591 15.9528 18.4348 16.2851 18.4348 16.6764C18.4348 17.0676 18.7591 17.3999 19.178 17.3999C19.5968 17.3999 19.9212 17.0676 19.9212 16.6764C19.9212 16.2851 19.5968 15.9528 19.178 15.9528Z" fill="#089705" />
                                </svg>
                                <p style={{ marginBottom: '0' }}>Envío gratis</p>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: "row", color: 'white', gap: '5px' }}>
                                <p style={{ marginBottom: '0' }}>Envío gratis</p>
                              </div>
                            )}
                            <CardSubtitle tag="h5" className="text-wrap text-muted" style={{ lineHeight: "1.2", maxHeight: "none", overflow: "visible", fontSize: '16px' }}>
                              {product.name.length < 40 ? product.name : product.name.slice(0, 40) + '...'}
                            </CardSubtitle>

                            <CardTitle tag="h5">
                              {product.discount_tag_valor > 0 || product.discount_valor > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignSelf: 'start' }}>
                                  <h5>${product.discount_valor && product.discount_valor.toLocaleString('en') || product.discount_tag_valor && product.discount_tag_valor.toLocaleString('en')}</h5>
                                  <h5 id='tachadoProductsCard'><s>${product.unit_price && product.unit_price.toLocaleString('en')}</s></h5>
                                </div>

                              ) : (
                                <h5>${product.unit_price && product.unit_price.toLocaleString('en')}</h5>
                              )}
                            </CardTitle>
                            {isPromotionsProducts && (
                              <span className='tagPromotions'>Oferta del día</span>
                            )}
                          </CardBody>
                        </Card>
                      </Link>
                    </a>
                  </div>
                ))}
                {products && products.products && products.products.map((product, index) => (
                  <div key={product.id} className="col-md-3 col-6 mb-4" >
                    <a href="#" className='containerCard2  '  >
                      <Link to={`/detailsProduct/${product.id}/${product.slug}`} key={index} onClick={() => agregarProductoVisto(product)}>
                        <Card className='cardProducto1' style={{ height: isDiscountedProducts || isPromotionsProducts ? '430px' : '390px' }} >
                          {isDiscountedProducts && product.discount_type === 'flat' && (
                            <span className='tagDiscounted'>$ {product.discount.toLocaleString('en')} Off</span>
                          )}

                          {isDiscountedProducts && product.discount_type === 'percent' && (
                            <span className='tagDiscounted'>{product.discount}% Off</span>
                          )}

                          {product.current_stock <= 0 && (
                            <span className="agotadoTag">Agotado</span>
                          )}

                          <CardImg
                            src={baseUrlImage + product.images[0]}
                            alt={product.name}
                            className="producto-imagen-mobile"
                            style={{ padding: "1rem", objectFit: "contain", height: 150 }}
                          />
                          <CardImg
                            src={baseUrlImage + product.images[0]}
                            alt={product.name}
                            className="producto-imagen-desktop"
                            style={{ padding: "1rem", objectFit: "contain", height: isDiscountedProducts || isPromotionsProducts ? '200px' : '240px' }}
                          />
                          <CardBody>
                            <div className="starts">
                              {[...Array(5)].map((_, index) => (
                                <img
                                  key={index}
                                  src={index < product.count_rating ? start : startEmpty}
                                  alt=""
                                />
                              ))}
                            </div>
                            {product.unit_price >= 79990 ? (
                              <div style={{ display: 'flex', flexDirection: "row", color: 'green', gap: '5px' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ alignSelf: 'center' }}>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M13.5738 6.63403C13.1555 6.60036 12.6195 6.5999 11.8575 6.5999H5.53365C5.20228 6.5999 4.93365 6.33126 4.93366 5.99989C4.93367 5.66852 5.2023 5.3999 5.53367 5.3999L11.8831 5.3999C12.6136 5.3999 13.1979 5.39989 13.6701 5.4379C14.1544 5.4769 14.5729 5.5588 14.9581 5.7522C15.5758 6.0623 16.0796 6.55796 16.3959 7.16963C16.5937 7.5522 16.6774 7.96782 16.7171 8.44703C16.7394 8.71606 16.7488 9.02184 16.7528 9.37049H17.3906C18.2149 9.37049 18.8697 9.37048 19.3978 9.413C19.9382 9.4565 20.3981 9.54742 20.8192 9.75885C21.5001 10.1007 22.0553 10.647 22.4038 11.3209C22.6199 11.7388 22.7127 12.1953 22.757 12.7297C22.8002 13.2511 22.8002 13.8972 22.8002 14.7086V15.6375C22.8002 15.8056 22.8002 15.9662 22.789 16.1018C22.7767 16.2499 22.748 16.4204 22.66 16.5906C22.5368 16.8288 22.3412 17.0207 22.1027 17.1405C21.933 17.2257 21.7633 17.2535 21.6149 17.2654C21.4785 17.2764 21.3164 17.2764 21.1453 17.2764L21.0251 17.2764C20.7695 18.0488 20.034 18.5999 19.178 18.5999C18.322 18.5999 17.5865 18.0487 17.3309 17.2764H9.94356C9.68799 18.0488 8.95248 18.5999 8.09648 18.5999C7.22063 18.5999 6.47092 18.0229 6.2324 17.2223C5.98721 17.21 5.79037 17.2042 5.53366 17.2042C5.20229 17.2042 4.93366 16.9356 4.93366 16.6042C4.93366 16.2729 5.20229 16.0042 5.53366 16.0042C5.80655 16.0042 6.02013 16.0104 6.26817 16.0226C6.53951 15.2784 7.26044 14.7528 8.09648 14.7528C8.95248 14.7528 9.68799 15.304 9.94356 16.0764H15.5557V10.2352C15.5557 9.4839 15.5553 8.95705 15.5212 8.54619C15.4877 8.1426 15.425 7.90448 15.33 7.72082C15.1312 7.33633 14.813 7.0221 14.4197 6.82463C14.2303 6.72952 13.9853 6.66716 13.5738 6.63403ZM16.7557 10.5705V16.0764H17.3309C17.5865 15.304 18.322 14.7528 19.178 14.7528C20.034 14.7528 20.7695 15.304 21.0251 16.0764H21.1256C21.3235 16.0764 21.4363 16.0759 21.5186 16.0693C21.547 16.067 21.5642 16.0644 21.5732 16.0628C21.5789 16.0588 21.5838 16.0542 21.5876 16.0493C21.5891 16.0404 21.5912 16.0255 21.5931 16.0026C21.5997 15.9228 21.6002 15.8129 21.6002 15.6175V14.7352C21.6002 13.8912 21.5997 13.2949 21.5611 12.8289C21.523 12.3701 21.4511 12.0911 21.3378 11.8721C21.1068 11.4253 20.7373 11.0605 20.2808 10.8313C20.0555 10.7181 19.769 10.6468 19.3015 10.6091C18.8272 10.5709 18.2207 10.5705 17.3646 10.5705H16.7557ZM2.71131 9.7499C2.71131 9.41853 2.97994 9.1499 3.31131 9.1499H7.08909C7.42046 9.1499 7.68909 9.41853 7.68909 9.7499C7.68909 10.0813 7.42046 10.3499 7.08909 10.3499H3.31131C2.97994 10.3499 2.71131 10.0813 2.71131 9.7499ZM1.2002 12.7499C1.2002 12.4185 1.46882 12.1499 1.8002 12.1499H7.84465C8.17602 12.1499 8.44465 12.4185 8.44465 12.7499C8.44465 13.0813 8.17602 13.3499 7.84465 13.3499H1.8002C1.46882 13.3499 1.2002 13.0813 1.2002 12.7499ZM8.09648 15.9528C7.68264 15.9528 7.36075 16.2775 7.3534 16.6624L7.35327 16.6764C7.35327 17.0676 7.67764 17.3999 8.09648 17.3999C8.51533 17.3999 8.83969 17.0676 8.83969 16.6764C8.83969 16.2851 8.51533 15.9528 8.09648 15.9528ZM19.178 15.9528C18.7591 15.9528 18.4348 16.2851 18.4348 16.6764C18.4348 17.0676 18.7591 17.3999 19.178 17.3999C19.5968 17.3999 19.9212 17.0676 19.9212 16.6764C19.9212 16.2851 19.5968 15.9528 19.178 15.9528Z" fill="#089705" />
                                </svg>
                                <p style={{ marginBottom: '0' }}>Envío gratis</p>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: "row", color: 'white', gap: '5px' }}>
                                <p style={{ marginBottom: '0' }}>Envío gratis</p>
                              </div>
                            )}
                            <CardSubtitle tag="h5" className="text-wrap text-muted" style={{ lineHeight: "1.2", maxHeight: "none", overflow: "visible", fontSize: '16px' }}>
                              {product.name.length < 40 ? product.name : product.name.slice(0, 40) + '...'}
                            </CardSubtitle>

                            <CardTitle tag="h5">
                              {
                                isDiscountedProducts ? (
                                  <>
                                    <h5>${(product.discount_valor || product.discount_tag_valor).toLocaleString('en')}</h5>
                                    <h5 id='tachadoProductsCardDiscounted'><s>${product.unit_price && product.unit_price.toLocaleString('en')}</s></h5>
                                  </>

                                ) : (
                                  product.discount_tag_valor > 0 || product.discount_valor > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignSelf: 'start' }}>
                                      <h5>${(product.discount_valor || product.discount_tag_valor).toLocaleString('en')}</h5>
                                      <h5 id='tachadoProductsCard'><s>${product.unit_price && product.unit_price.toLocaleString('en')}</s></h5>

                                    </div>
                                  ) : (
                                    <h5>${product.unit_price && product.unit_price.toLocaleString('en')}</h5>
                                  )
                                )
                              }

                            </CardTitle>
                            {isPromotionsProducts && (
                              <span className='tagPromotions'>Oferta del día</span>
                            )}
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
                      className="paginator-icon btn mx-1"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} color='#FC5241' /><FontAwesomeIcon icon={faChevronLeft} color='#FC5241' />
                    </button>
                  )

                }
                {
                  currentPage !== 1 && (
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                        handlePageClick(currentPage - 1);
                      }}
                      className="btn mx-1"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} color='#FC5241' />
                    </button>
                  )
                }

                {pageButtons}
                {
                  currentPage !== totalPages && totalPages !== 0 && (
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                        handlePageClick(currentPage +1);
                      }}
                      className="btn mx-1"
                    >
                      <FontAwesomeIcon icon={faChevronRight} color='#FC5241' />
                    </button>
                  )
                }
                {
                  currentPage !== totalPages && totalPages !== 2 && totalPages !== 0 && (
                    <button
                      onClick={() => {
                        setCurrentPage(totalPages);
                        handlePageClick((totalPages));
                      }}
                      className="btn mx-1"
                    >
                      <FontAwesomeIcon icon={faChevronRight} color='#FC5241' /><FontAwesomeIcon icon={faChevronRight} color='#FC5241' />
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )

}

export default ProductsCategories;


