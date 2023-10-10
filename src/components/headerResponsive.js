import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  PlaceholderButton,
  Modal,
  ModalBody,
} from "reactstrap";
import "../styles/headerResponsive.css";
import styles from "../styles/navbar.css";
import logo from "../assets/icono egoi small.png";

import { useHistory } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faUserPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Login from '../views/user/login';
import Register from '../views/user/register';
import { getAllBrands } from "../services/brands";
import { allCategories } from "../services/categories";
import { getCurrentUser, setCurrentUser } from '../helpers/Utils';
import { myorders } from "../constants/defaultValues";
import { allProductsCart } from "../services/cart";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getProductsBySearch } from "../services/filtros";
import { getUserProfileInfo } from '../services/ordenes';



function HeaderResponsive({ canCart, detailInfoProfile }) {

  /* global bootstrap */

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [modalViewRegistro, setModalViewRegistro] = useState(false);
  const [modalViewLogin, setModalViewLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [changeFormLogin, setChangeFormLogin] = useState(false);
  const [changeFormRegister, setChangeFormRegister] = useState(false);
  // const [cantProductsOnCart, setCantProductsOnCart] = useState('');
  const [subcategorias, setSubcategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const offcanvasRef = useRef(null);
  const backdropRef = useRef(null);
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);
  const [isBackdropVisible, setIsBackdropVisible] = useState(false);
  const [showSaleOptions, setShowSaleOptions] = useState(false);
  const [categoriesSearch, setCategoriesSearch] = useState([]);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  const [prevSearchProducts, setPrevSearchProducts] = useState('');
  const [showResults, setShowResults] = useState(false); // Estado para controlar la visibilidad del menú de resultados
  const resultsContainerRef = useRef(null);

  const [fieldsEnabled, setFieldsEnabled] = useState(false);

  const currenUser = getCurrentUser();

  const history = useHistory();

  const handleInputChange = (event) => {
    setPrevSearchProducts(event.target.value);
    console.log(event.target.value);
    resultsSearch(event.target.value);
    if (event.target.value === '') {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  }

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      setPrevSearchProducts(prevSearchProducts);
      // console.log("Este es el valor guardado en el search: ", prevSearchProducts);
      // history.push(`/products/${prevSearchProducts}`);
      if (categoriesSearch.length === 0) {
        history.push(`/products/${prevSearchProducts}`);
      } else {
        history.push(`/categories/${categoriesSearch[0].name}/${categoriesSearch[0].name}/${categoriesSearch[0].id}`);
      }
      setShowResults(false);
    }
  }

  const handleClickResultProduct = (itemId, slug) => {
    // history.push(`/products/${name}`);
    history.push(`/detailsProduct/${itemId}/${slug}`)
  }

  const handleClickResultCategorie = (nameCategory, idCategory) => {
    // history.push(`/products/${name}`);
    history.push(`/categories/${nameCategory}/${nameCategory}/${idCategory}`)
  }

  const resultsSearch = (prevSearchProducts) => {
    console.log("Entré al resultado de búsqueda");
    if (!prevSearchProducts || prevSearchProducts.length === 0) {
      setShowResults(false); // Oculta los resultados si prevSearchProducts está vacío
      setProducts([]); // Borra los resultados anteriores si los hubiera
    } else {
      getProductsBySearch(prevSearchProducts)
        .then((res) => {
          // console.log(res);
          setCategoriesSearch(res.data.categories);
          setProducts(res.data.products);
          setShowResults(true); // Muestra los resultados si hay resultados de búsqueda
          console.log("Respuesta de los productos por búsqueda", res.data.products);
        });
    }
  };

  const handleOutsideClick = (event) => {
    if (resultsContainerRef.current && !resultsContainerRef.current.contains(event.target)) {
      // Clic fuera del área de resultados, ocultar los resultados
      setShowResults(false);
    }
  };

  const goToDetailCart = () => {
    if (currenUser) {
      history.push(`/detailCart`)
    }
    else {
      setIsOffcanvasVisible(false);
      setModalViewLogin(true);
    }
  }

  const handleFavList = (e) => {
    e.preventDefault();
    if (currenUser) {
      const url = `/myorders?activeOption=ListaDeseos&selectedOption=Lista%20Deseos`;
      window.location.href = url;
    } else {
      setIsOffcanvasVisible(false);
      setModalViewLogin(true);
    }
  }



  const closeModalLogin = () => {
    setModalViewLogin(false);
  };


  const handleChangeFormLogin = () => {

    if (modalViewLogin === true) {
      setModalViewRegistro(true);
    }
  };

  const handleChangeFormRegister = () => {

    if (modalViewRegistro === true) {
      setModalViewLogin(true);
    }

  };

  const closeModalRegistro = () => {
    const bodyElement = document.querySelector('body');
    bodyElement.classList.remove('offcanvas-backdrop', 'fade', 'show');
    setModalViewRegistro(false);
  };

  // const closeModalLogin = () => {
  //   const bodyElement = document.querySelector('body');
  //   bodyElement.classList.remove('offcanvas-backdrop', 'fade', 'show');
  //   setModalViewLogin(false);
  // };


  const handleLogin = () => {
    // Code to handle user login, such as storing session storage, etc.
    if (currenUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    // Code to handle user logout, such as clearing session storage, etc.
    // console.log("Entro al logout");
    setCurrentUser();
    setIsLoggedIn(false);
    history.push(`/`);
  };

  const allCategoriesPromise = () => {
    allCategories()
      .then((res) => {
        setCategories(res.data);
        // console.log("Recibiendo todas las categorias desde el responsive", categories);

      })
      .catch((err) => console.log(err));
  };

  const allBrands = () => {
    getAllBrands()
      .then((res) => {
        setBrands(res.data);
        // console.log("Recibiendo todas las marcas desde el responsive", brands);
      })
      .catch((err) => console.log(err));
  }

  // console.log('HERE', currenUser);

  // useEffect(() => {
  //   // Actualizar el estado del offcanvas
  //   const offcanvasBodyElement = offcanvasBodyRef.current;
  //   if (isOffcanvasOpen && offcanvasBodyElement) {
  //     const offcanvas = new bootstrap.Offcanvas(offcanvasBodyElement);
  //     offcanvas.show();
  //   } else if (!isOffcanvasOpen && offcanvasBodyElement) {
  //     const offcanvas = new bootstrap.Offcanvas(offcanvasBodyElement);
  //     offcanvas.hide();
  //   }
  // }, [isOffcanvasOpen]);

  const handleAdminUser = () => {
    history.push(`${myorders}`);
  }

  // const getCantCart = () => {
  //   const token = currenUser.token;
  //   allProductsCart(token)
  //     .then((res) => {
  //       const productsOncart = res.data;
  //       // console.log("Respuesta de productos del carrito de compras desde el responsive", productsOncart);
  //       const numberOfProducts = productsOncart.length;
  //       // console.log("Cantidad de productos en el carrito desde el responsive", numberOfProducts);
  //       setCantProductsOnCart(numberOfProducts);


  //     }).catch((err) => console.log(err));
  // }

  // useEffect(() => {
  //   getCantCart();
  // }, []);

  // useEffect(() => {
  //   getCantCart();
  // }, [currenUser, cantProductsOnCart]);


  // useEffect(() => {
  //   if (setCarrito) {
  //     const token = currenUser.token;
  //     allProductsCart(token)
  //       .then((res) => {
  //         const productsOncart = res.data;
  //         // console.log("Respuesta de productos del carrito de compras desde el responsive", productsOncart);
  //         const numberOfProducts = productsOncart.length;
  //         // console.log("Cantidad de productos en el carrito desde el responsive", numberOfProducts);
  //         setCantProductsOnCart(numberOfProducts);
  //         resetCardProduct();

  //       }).catch((err) => console.log(err));
  //   }
  // }, []);

  // useEffect(()=>{
  //   if(aok){
  //     const token = currenUser.token;
  //     allProductsCart(token)
  //       .then((res) => {
  //         const productsOncart = res.data;
  //         // console.log("Respuesta de productos del carrito de compras desde el responsive", productsOncart);
  //         const numberOfProducts = productsOncart.length;
  //         // console.log("Cantidad de productos en el carrito desde el responsive", numberOfProducts);
  //         setCantProductsOnCart(numberOfProducts);
  //         setCarrito();

  //       }).catch((err) => console.log(err));
  //   }
  // },[aok])


  useEffect(() => {
    if (prevSearchProducts) {
      // console.log("Este el id selesccionado para activar el boton active ", selectedCategoryId);
      resultsSearch(prevSearchProducts);
    }
  }, [prevSearchProducts]);

  useEffect(() => {
    allCategoriesPromise();
    allBrands();
    // console.log(canCart)
  }, []);

  useEffect(() => {
    // Agregar un detector de clics fuera de los resultados cuando los resultados están visibles
    if (showResults) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    // Limpiar el detector de clics cuando el componente se desmonta
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showResults]);

  return (
    <div className='containerResponsive'>
      <nav class="navbar bg-body-tertiary fixed-top">
        <div class="container-fluid">
          {/* <div className={styles.navbarLogo}>
          <img src={logo} alt="logo" className={styles.logo} width={"150px"} />
        </div> */}

          <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => setIsOffcanvasVisible(true)}>
            <span class="navbar-toggler-icon"></span>
          </button>

          <a class="navbar-brand" href="/"><img src={logo} alt="logo" className={styles.logo} width={""} /></a>
          <div className='searchContainer'>
            <InputGroup className={styles.search}>
              <span className="input-icon">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <Input style={{
                border: "none",
                width: "400px",
                borderRadius: "50px",
              }} type="text" placeholder="Busca productos, marcas..."
                onChange={handleInputChange}
                onKeyUp={handleEnterPress} />
              {/* Contenedor para mostrar los resultados de búsqueda */}
              {showResults && (
                <div className={`searchResultsContainer`} ref={resultsContainerRef}>
                  {products && products.length > 0 || categoriesSearch && categoriesSearch.length > 0 ? (
                    <div>
                      {products.length > 0 && (
                        <h3>Productos</h3>
                      )}
                      <ul className="resultsList">
                        {products.map((result, index) => (
                          <li key={index} className="searchResultItem">
                            <a href="" onClick={() => handleClickResultProduct(result.id, result.slug)}>{result.name}</a>
                          </li>
                        ))}
                      </ul>
                      {categoriesSearch.length > 0 && (
                        <>
                          <hr />
                          <h3>Categorías</h3>
                        </>
                      )}
                      <ul className="resultsList">
                        {categoriesSearch.map((result, index) => (
                          <li key={index} className="searchResultItem">
                            <a href="" onClick={() => handleClickResultCategorie(result.name, result.id)}>{result.name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>No se encontraron resultados.</p>
                  )}
                </div>

              )}

            </InputGroup>
          </div>
          <a href="#" onClick={(e) => { e.preventDefault(); goToDetailCart() }}
            style={{ textDecoration: 'none', color: 'black', border: 'none', backgroundColor: 'inherit'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-cart2" viewBox="0 0 20 20">
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
            {currenUser && canCart !== undefined && canCart >= 1 ? (
              <span className="cart-products"><p >{canCart}</p></span>
            ) : (<i></i>)}

          </a>

          <div ref={offcanvasRef} class={`offcanvas offcanvas-end ${isOffcanvasVisible ? 'show' : ''}`} tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={closeModalLogin}></button>
              {currenUser && detailInfoProfile && (
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">¡Hola, {detailInfoProfile.f_name + ' ' + detailInfoProfile.l_name}!</h5>
              )}
            </div>
            <div className={`offcanvas-body`}>
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">

                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.3887 5.6001H10.4462C11.0584 5.60009 11.5594 5.60009 11.9685 5.62891C12.3914 5.65871 12.776 5.72217 13.1428 5.87963C13.9584 6.22983 14.6077 6.88115 14.9565 7.69784C15.1133 8.06484 15.1765 8.44972 15.2062 8.8734C15.2349 9.28331 15.2349 9.78552 15.2349 10.3995V10.4566C15.2349 11.0706 15.2349 11.5729 15.2062 11.9828C15.1765 12.4064 15.1133 12.7913 14.9565 13.1583C14.6077 13.975 13.9584 14.6263 13.1428 14.9765C12.776 15.134 12.3914 15.1975 11.9685 15.2273C11.5594 15.2561 11.0584 15.2561 10.4462 15.2561H10.3887C9.77652 15.2561 9.27544 15.2561 8.8664 15.2273C8.44344 15.1975 8.05888 15.134 7.69213 14.9765C6.87647 14.6263 6.22719 13.975 5.87838 13.1583C5.72163 12.7913 5.65842 12.4064 5.62872 11.9828C5.59999 11.5729 5.6 11.0707 5.60001 10.4567V10.3995C5.6 9.78551 5.59999 9.2833 5.62872 8.8734C5.65842 8.44972 5.72163 8.06484 5.87838 7.69784C6.22719 6.88115 6.87647 6.22983 7.69213 5.87963C8.05888 5.72217 8.44344 5.65871 8.8664 5.62891C9.27545 5.60009 9.77653 5.60009 10.3887 5.6001ZM8.97886 7.22495C8.64024 7.24881 8.45655 7.29267 8.32337 7.34985C7.88629 7.53751 7.53744 7.88695 7.34979 8.32628C7.29246 8.46052 7.24863 8.6454 7.22481 8.98528C7.20046 9.3326 7.20001 9.77856 7.20001 10.4281C7.20001 11.0776 7.20046 11.5236 7.22481 11.8709C7.24863 12.2108 7.29246 12.3956 7.34979 12.5299C7.53744 12.9692 7.88629 13.3187 8.32337 13.5063C8.45655 13.5635 8.64024 13.6074 8.97886 13.6312C9.325 13.6556 9.76954 13.6561 10.4174 13.6561C11.0653 13.6561 11.5099 13.6556 11.856 13.6312C12.1946 13.6074 12.3783 13.5635 12.5115 13.5063C12.9486 13.3187 13.2974 12.9692 13.4851 12.5299C13.5424 12.3956 13.5863 12.2108 13.6101 11.8709C13.6344 11.5236 13.6349 11.0776 13.6349 10.4281C13.6349 9.77857 13.6344 9.3326 13.6101 8.98528C13.5863 8.6454 13.5424 8.46052 13.4851 8.32628C13.2974 7.88695 12.9486 7.53751 12.5115 7.34985C12.3783 7.29267 12.1946 7.24881 11.856 7.22495C11.5099 7.20056 11.0653 7.2001 10.4174 7.2001C9.76954 7.2001 9.325 7.20056 8.97886 7.22495ZM21.5539 5.6001H21.6113C22.2235 5.60009 22.7246 5.60009 23.1336 5.62891C23.5566 5.65871 23.9411 5.72217 24.3079 5.87963C25.1235 6.22983 25.7728 6.88115 26.1216 7.69784C26.2784 8.06484 26.3416 8.44971 26.3713 8.8734C26.4 9.28332 26.4 9.78554 26.4 10.3996V10.4566C26.4 11.0706 26.4 11.5728 26.3713 11.9828C26.3416 12.4064 26.2784 12.7913 26.1216 13.1583C25.7728 13.975 25.1235 14.6263 24.3079 14.9765C23.9411 15.134 23.5566 15.1975 23.1336 15.2273C22.7246 15.2561 22.2235 15.2561 21.6113 15.2561H21.5538C20.9416 15.2561 20.4406 15.2561 20.0315 15.2273C19.6086 15.1975 19.224 15.134 18.8573 14.9765C18.0416 14.6263 17.3923 13.975 17.0435 13.1583C16.8868 12.7913 16.8235 12.4064 16.7938 11.9828C16.7651 11.5729 16.7651 11.0706 16.7651 10.4567V10.3995C16.7651 9.78552 16.7651 9.28331 16.7938 8.8734C16.8235 8.44972 16.8868 8.06484 17.0435 7.69784C17.3923 6.88115 18.0416 6.22983 18.8573 5.87963C19.224 5.72217 19.6086 5.65871 20.0315 5.62891C20.4406 5.60009 20.9417 5.60009 21.5539 5.6001ZM20.144 7.22495C19.8054 7.24881 19.6217 7.29267 19.4885 7.34985C19.0514 7.53751 18.7026 7.88695 18.5149 8.32628C18.4576 8.46052 18.4138 8.6454 18.3899 8.98528C18.3656 9.3326 18.3651 9.77857 18.3651 10.4281C18.3651 11.0776 18.3656 11.5236 18.3899 11.8709C18.4138 12.2108 18.4576 12.3956 18.5149 12.5299C18.7026 12.9692 19.0514 13.3187 19.4885 13.5063C19.6217 13.5635 19.8054 13.6074 20.144 13.6312C20.4901 13.6556 20.9347 13.6561 21.5826 13.6561C22.2305 13.6561 22.675 13.6556 23.0212 13.6312C23.3598 13.6074 23.5435 13.5635 23.6766 13.5063C24.1137 13.3187 24.4626 12.9692 24.6502 12.5299C24.7075 12.3956 24.7514 12.2108 24.7752 11.8709C24.7995 11.5236 24.8 11.0776 24.8 10.4281C24.8 9.77857 24.7995 9.3326 24.7752 8.98528C24.7514 8.6454 24.7075 8.46052 24.6502 8.32628C24.4626 7.88695 24.1137 7.53751 23.6766 7.34985C23.5435 7.29267 23.3598 7.24881 23.0212 7.22495C22.675 7.20056 22.2305 7.2001 21.5826 7.2001C20.9347 7.2001 20.4901 7.20056 20.144 7.22495ZM10.3887 16.7441H10.4462C11.0584 16.7441 11.5594 16.7441 11.9685 16.7729C12.3914 16.8027 12.776 16.8662 13.1428 17.0237C13.9584 17.3739 14.6077 18.0252 14.9565 18.8419C15.1133 19.2089 15.1765 19.5937 15.2062 20.0174C15.2349 20.4273 15.2349 20.9296 15.2349 21.5435V21.6007C15.2349 22.2147 15.2349 22.7169 15.2062 23.1268C15.1765 23.5505 15.1133 23.9354 14.9565 24.3024C14.6077 25.119 13.9584 25.7704 13.1428 26.1206C12.776 26.278 12.3914 26.3415 11.9685 26.3713C11.5594 26.4001 11.0584 26.4001 10.4462 26.4001H10.3887C9.77652 26.4001 9.27544 26.4001 8.8664 26.3713C8.44344 26.3415 8.05887 26.278 7.69213 26.1206C6.87647 25.7704 6.22719 25.119 5.87838 24.3024C5.72163 23.9354 5.65842 23.5505 5.62872 23.1268C5.59999 22.7169 5.6 22.2147 5.60001 21.6007V21.5435C5.6 20.9295 5.59999 20.4273 5.62872 20.0174C5.65842 19.5937 5.72163 19.2089 5.87838 18.8419C6.22719 18.0252 6.87647 17.3739 7.69213 17.0237C8.05888 16.8662 8.44344 16.8027 8.8664 16.7729C9.27544 16.7441 9.77652 16.7441 10.3887 16.7441ZM8.97886 18.369C8.64024 18.3928 8.45655 18.4367 8.32337 18.4939C7.88629 18.6815 7.53744 19.031 7.34979 19.4703C7.29246 19.6046 7.24863 19.7894 7.22481 20.1293C7.20046 20.4766 7.20001 20.9226 7.20001 21.5721C7.20001 22.2216 7.20046 22.6676 7.22481 23.0149C7.24863 23.3548 7.29246 23.5397 7.34979 23.6739C7.53744 24.1132 7.88629 24.4627 8.32337 24.6503C8.45655 24.7075 8.64024 24.7514 8.97886 24.7752C9.325 24.7996 9.76954 24.8001 10.4174 24.8001C11.0653 24.8001 11.5099 24.7996 11.856 24.7752C12.1946 24.7514 12.3783 24.7075 12.5115 24.6503C12.9486 24.4627 13.2974 24.1132 13.4851 23.6739C13.5424 23.5397 13.5863 23.3548 13.6101 23.0149C13.6344 22.6676 13.6349 22.2216 13.6349 21.5721C13.6349 20.9226 13.6344 20.4766 13.6101 20.1293C13.5863 19.7894 13.5424 19.6046 13.4851 19.4703C13.2974 19.031 12.9486 18.6815 12.5115 18.4939C12.3783 18.4367 12.1946 18.3928 11.856 18.369C11.5099 18.3446 11.0653 18.3441 10.4174 18.3441C9.76954 18.3441 9.325 18.3446 8.97886 18.369ZM21.5538 16.7441H21.6113C22.2235 16.7441 22.7246 16.7441 23.1336 16.7729C23.5566 16.8027 23.9411 16.8662 24.3079 17.0237C25.1235 17.3739 25.7728 18.0252 26.1216 18.8419C26.2784 19.2089 26.3416 19.5937 26.3713 20.0174C26.4 20.4274 26.4 20.9296 26.4 21.5436V21.6006C26.4 22.2146 26.4 22.7169 26.3713 23.1268C26.3416 23.5505 26.2784 23.9354 26.1216 24.3024C25.7728 25.119 25.1235 25.7704 24.3079 26.1206C23.9411 26.278 23.5566 26.3415 23.1336 26.3713C22.7246 26.4001 22.2235 26.4001 21.6113 26.4001H21.5538C20.9416 26.4001 20.4406 26.4001 20.0315 26.3713C19.6086 26.3415 19.224 26.278 18.8573 26.1206C18.0416 25.7704 17.3923 25.119 17.0435 24.3024C16.8868 23.9354 16.8235 23.5505 16.7938 23.1268C16.7651 22.7169 16.7651 22.2147 16.7651 21.6007V21.5435C16.7651 20.9296 16.7651 20.4273 16.7938 20.0174C16.8235 19.5937 16.8868 19.2089 17.0435 18.8419C17.3923 18.0252 18.0416 17.3739 18.8573 17.0237C19.224 16.8662 19.6086 16.8027 20.0315 16.7729C20.4406 16.7441 20.9416 16.7441 21.5538 16.7441ZM20.144 18.369C19.8054 18.3928 19.6217 18.4367 19.4885 18.4939C19.0514 18.6815 18.7026 19.031 18.5149 19.4703C18.4576 19.6046 18.4138 19.7894 18.3899 20.1293C18.3656 20.4766 18.3651 20.9226 18.3651 21.5721C18.3651 22.2216 18.3656 22.6676 18.3899 23.0149C18.4138 23.3548 18.4576 23.5397 18.5149 23.6739C18.7026 24.1132 19.0514 24.4627 19.4885 24.6503C19.6217 24.7075 19.8054 24.7514 20.144 24.7752C20.4901 24.7996 20.9347 24.8001 21.5826 24.8001C22.2305 24.8001 22.675 24.7996 23.0212 24.7752C23.3598 24.7514 23.5435 24.7075 23.6766 24.6503C24.1137 24.4627 24.4626 24.1132 24.6502 23.6739C24.7075 23.5397 24.7514 23.3548 24.7752 23.0149C24.7995 22.6676 24.8 22.2216 24.8 21.5721C24.8 20.9226 24.7995 20.4766 24.7752 20.1293C24.7514 19.7894 24.7075 19.6046 24.6502 19.4703C24.4626 19.031 24.1137 18.6815 23.6766 18.4939C23.5435 18.4367 23.3598 18.3928 23.0212 18.369C22.675 18.3446 22.2305 18.3441 21.5826 18.3441C20.9347 18.3441 20.4901 18.3446 20.144 18.369Z"
                        fill="#171523"
                      />
                    </svg>
                    Categorias
                  </a>
                  <ul class="dropdown-menu dropdown-menu-extended">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <a className="dropdown-item"
                          href={category.childes.length === 0 ? `/categories/${category.name}/${category.name}/${category.id}` : null}
                        >
                          <span className={`d-flex align-items-center justify-content-between dropdown-item-text ${category.name === selectedCategory ? "category-selected" : ""}`}
                            onClick={(e) => { e.stopPropagation(); setSelectedCategory(category.name); }}
                          >
                            <strong
                              className={` ${category.name === selectedCategory ? "category-selected" : ""}`} >{category.name}</strong>
                            {category.name !== selectedCategory && <FontAwesomeIcon icon={faChevronDown} className='dropdown-icon' color='black' />}
                          </span>
                        </a>
                        <ul >
                          {category.childes.map((subcategory, index) => (
                            <li key={index}>
                              {/* <Link to={`/categories/${category.name}/${subcategory.name}/${subcategory.id}`}> */}
                              <a className={`dropdown-item subcategory-item  ${category.name !== selectedCategory && "visually-hidden"}`} href={`/categories/${category.name}/${subcategory.name}/${subcategory.id}`}>{subcategory.name}</a>
                              {
                                subcategory.childes.map((brand, index) => (
                                  <li key={index}>
                                    <a className={`dropdown-item  px-5 ${category.name !== selectedCategory && "visually-hidden"}`} href={`/categories/${category.name}/${brand.name}/${brand.id}`}>{brand.name}</a>
                                  </li>
                                ))
                              }
                              {/* </Link> */}
                            </li>

                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
                <li class="nav-item pers">

                  <a href="/">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.8722 8.13225C16.3032 7.95546 15.6968 7.95546 15.1278 8.13225C14.8494 8.21876 14.5513 8.38528 14.1231 8.72385C13.6875 9.0683 13.1692 9.54775 12.4336 10.2293L8.97759 13.4312C8.19904 14.1526 7.91535 14.4233 7.71401 14.7351C7.52397 15.0295 7.38277 15.3555 7.29692 15.6996C7.20556 16.0658 7.2 16.4684 7.2 17.5456V19.2748C7.2 20.3946 7.20059 21.1877 7.24981 21.8078C7.29834 22.4193 7.39035 22.7931 7.53552 23.0864C7.83014 23.6816 8.29804 24.1612 8.86828 24.4603C9.1454 24.6057 9.49997 24.6991 10.0889 24.7486C10.5829 24.7902 11.1912 24.7979 12 24.7993V21.6C12 21.5627 12 21.5261 12 21.4899C11.9996 20.8536 11.9994 20.3811 12.109 19.9717C12.4049 18.8675 13.2675 18.0049 14.3718 17.709C14.7811 17.5993 15.2536 17.5996 15.8899 17.5999C15.9261 17.5999 15.9628 17.6 16 17.6C16.0372 17.6 16.0739 17.5999 16.1101 17.5999C16.7464 17.5996 17.2189 17.5993 17.6282 17.709C18.7325 18.0049 19.5951 18.8675 19.891 19.9717C20.0006 20.3811 20.0004 20.8536 20 21.4899C20 21.5261 20 21.5627 20 21.6V24.7993C20.8088 24.7979 21.4171 24.7902 21.9111 24.7486C22.5 24.6991 22.8546 24.6057 23.1317 24.4603C23.702 24.1612 24.1699 23.6816 24.4645 23.0864C24.6097 22.7931 24.7017 22.4193 24.7502 21.8078C24.7994 21.1877 24.8 20.3946 24.8 19.2748V17.5456C24.8 16.4684 24.7944 16.0658 24.7031 15.6996C24.6172 15.3555 24.476 15.0295 24.286 14.7351C24.0847 14.4233 23.801 14.1526 23.0224 13.4312L19.5664 10.2293C18.8308 9.54775 18.3125 9.0683 17.8769 8.72385C17.4487 8.38528 17.1506 8.21876 16.8722 8.13225ZM18.4 24.7997V21.6C18.4 20.8045 18.3931 20.5637 18.3455 20.3859C18.1975 19.8337 17.7663 19.4024 17.2141 19.2545C17.0363 19.2068 16.7955 19.2 16 19.2C15.2045 19.2 14.9637 19.2068 14.7859 19.2545C14.2337 19.4024 13.8025 19.8337 13.6545 20.3859C13.6069 20.5637 13.6 20.8045 13.6 21.6V24.7997H18.4ZM14.6531 6.6043C15.5313 6.33144 16.4687 6.33144 17.3469 6.6043C17.8899 6.77302 18.3658 7.07061 18.8693 7.46882C19.3599 7.85672 19.9238 8.37919 20.6296 9.0331L24.1098 12.2576C24.1354 12.2812 24.1606 12.3046 24.1856 12.3277C24.862 12.9542 25.3063 13.3656 25.6302 13.8673C25.9162 14.3104 26.1274 14.7989 26.2555 15.3123C26.4003 15.8928 26.4002 16.5041 26.4 17.4425C26.4 17.4764 26.4 17.5108 26.4 17.5456V19.3089C26.4 20.3869 26.4 21.2435 26.3452 21.9344C26.2891 22.6413 26.1718 23.2438 25.8985 23.7961C25.4568 24.6885 24.7498 25.4184 23.8749 25.8773C23.3306 26.1628 22.7368 26.2848 22.0452 26.343C21.3712 26.3997 20.5368 26.3997 19.4918 26.3997H12.5082C11.4633 26.3997 10.6288 26.3997 9.95485 26.343C9.26317 26.2848 8.66938 26.1628 8.12508 25.8773C7.25023 25.4184 6.54324 24.6885 6.10155 23.7961C5.82819 23.2438 5.71093 22.6413 5.65483 21.9344C5.59999 21.2435 5.6 20.3869 5.6 19.3089L5.6 17.5456C5.6 17.5108 5.6 17.4764 5.59999 17.4425C5.5998 16.5041 5.59968 15.8928 5.7445 15.3123C5.8726 14.7989 6.08377 14.3104 6.36982 13.8673C6.69373 13.3656 7.13799 12.9542 7.81445 12.3277C7.83937 12.3046 7.86462 12.2812 7.89018 12.2576L11.3705 9.03309C12.0762 8.37919 12.6401 7.85672 13.1307 7.46882C13.6343 7.07061 14.1101 6.77302 14.6531 6.6043Z"
                        fill="#171523"
                      />
                    </svg>
                    Inicio
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle"
                    href="#" role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 9.5999C12 7.83259 13.4327 6.3999 15.2 6.3999H16.8C18.5673 6.3999 20 7.83259 20 9.5999V10.4028C21.1216 10.4137 21.9149 10.4645 22.6001 10.6971C24.2486 11.2567 25.5432 12.5513 26.1028 14.1998C26.4006 15.077 26.4004 16.1313 26.4 17.8248C26.4 17.8824 26.4 17.9408 26.4 17.9999C26.4 18.059 26.4 18.1174 26.4 18.175C26.4004 19.8685 26.4006 20.9228 26.1028 21.8C25.5432 23.4486 24.2486 24.7431 22.6001 25.3027C21.7229 25.6005 20.6686 25.6003 18.9751 25.5999C18.9175 25.5999 18.8591 25.5999 18.8 25.5999H13.2C13.1409 25.5999 13.0825 25.5999 13.0249 25.5999C11.3314 25.6003 10.2771 25.6005 9.39994 25.3027C7.75135 24.7431 6.45681 23.4486 5.89719 21.8C5.59943 20.9228 5.59964 19.8685 5.59997 18.175C5.59999 18.1174 5.6 18.059 5.6 17.9999C5.6 17.9408 5.59999 17.8824 5.59997 17.8248C5.59964 16.1313 5.59943 15.077 5.89719 14.1998C6.45681 12.5513 7.75135 11.2567 9.39994 10.6971C10.0851 10.4645 10.8784 10.4137 12 10.4028V9.5999ZM13.6 10.3999H18.4V9.5999C18.4 8.71625 17.6837 7.9999 16.8 7.9999H15.2C14.3163 7.9999 13.6 8.71625 13.6 9.5999V10.3999ZM13.2 11.9999C11.2733 11.9999 10.5081 12.0106 9.91424 12.2122C8.73668 12.6119 7.81201 13.5366 7.41228 14.7141C7.2107 15.308 7.2 16.0733 7.2 17.9999C7.2 19.9266 7.2107 20.6918 7.41228 21.2857C7.81201 22.4632 8.73668 23.3879 9.91424 23.7876C10.5081 23.9892 11.2733 23.9999 13.2 23.9999H18.8C20.7266 23.9999 21.4919 23.9892 22.0858 23.7876C23.2633 23.3879 24.188 22.4632 24.5877 21.2857C24.7893 20.6918 24.8 19.9266 24.8 17.9999C24.8 16.0733 24.7893 15.308 24.5877 14.7141C24.188 13.5366 23.2633 12.6119 22.0858 12.2122C21.4919 12.0106 20.7266 11.9999 18.8 11.9999H13.2Z"
                        fill="#171523"
                      />
                      <path
                        d="M12 14.3999C12 14.2512 12 14.1768 12.0123 14.115C12.0628 13.8611 12.2613 13.6627 12.5151 13.6122C12.577 13.5999 12.6513 13.5999 12.8 13.5999C12.9487 13.5999 13.023 13.5999 13.0849 13.6122C13.3387 13.6627 13.5372 13.8611 13.5877 14.115C13.6 14.1768 13.6 14.2512 13.6 14.3999C13.6 14.5485 13.6 14.6229 13.5877 14.6847C13.5372 14.9386 13.3387 15.1371 13.0849 15.1876C13.023 15.1999 12.9487 15.1999 12.8 15.1999C12.6513 15.1999 12.577 15.1999 12.5151 15.1876C12.2613 15.1371 12.0628 14.9386 12.0123 14.6847C12 14.6229 12 14.5485 12 14.3999Z"
                        fill="black"
                      />
                      <path
                        d="M18.4 14.3999C18.4 14.2512 18.4 14.1768 18.4123 14.115C18.4628 13.8611 18.6613 13.6627 18.9151 13.6122C18.977 13.5999 19.0513 13.5999 19.2 13.5999C19.3487 13.5999 19.423 13.5999 19.4849 13.6122C19.7387 13.6627 19.9372 13.8611 19.9877 14.115C20 14.1768 20 14.2512 20 14.3999C20 14.5485 20 14.6229 19.9877 14.6847C19.9372 14.9386 19.7387 15.1371 19.4849 15.1876C19.423 15.1999 19.3487 15.1999 19.2 15.1999C19.0513 15.1999 18.977 15.1999 18.9151 15.1876C18.6613 15.1371 18.4628 14.9386 18.4123 14.6847C18.4 14.6229 18.4 14.5485 18.4 14.3999Z"
                        fill="black"
                      />
                    </svg>
                    Marcas
                  </a>
                  <ul class="dropdown-menu dropdown-menu-extended">
                    {brands.map((brand, index) => (
                      <li key={index}>
                        <a className='dropdown-item' href={`/brand/${brand.name}/${brand.id}`}>
                          <strong>{brand.name}({brand.brand_products_count})</strong>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li class="nav-item pers">

                  <a href="/discountedProducts">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.6508 6.51141C14.9675 5.29633 17.0325 5.29633 18.3492 6.51141C18.7467 6.87815 19.3035 7.0556 19.8617 6.98236C21.6445 6.74846 23.3438 7.90763 23.6754 9.6754C23.7702 10.1809 24.1015 10.6292 24.5914 10.8829C26.1977 11.7149 26.866 13.6442 26.0555 15.2639C25.8223 15.7299 25.8223 16.2703 26.0555 16.7363C26.866 18.356 26.1977 20.2853 24.5914 21.1173C24.1015 21.371 23.7702 21.8193 23.6754 22.3248C23.3438 24.0926 21.6445 25.2517 19.8617 25.0178C19.3035 24.9446 18.7467 25.122 18.3492 25.4888C17.0325 26.7039 14.9675 26.7039 13.6508 25.4888C13.2533 25.122 12.6965 24.9446 12.1383 25.0178C10.3555 25.2517 8.65623 24.0926 8.32463 22.3248C8.22981 21.8193 7.89852 21.371 7.40862 21.1173C5.80233 20.2853 5.134 18.356 5.94451 16.7363C6.17769 16.2703 6.17769 15.7299 5.94451 15.2639C5.134 13.6442 5.80233 11.7149 7.40862 10.8829C7.89852 10.6292 8.22981 10.1809 8.32463 9.6754C8.65623 7.90763 10.3555 6.74846 12.1383 6.98236C12.6965 7.0556 13.2533 6.87815 13.6508 6.51141ZM17.2642 7.68726C16.5603 7.03771 15.4397 7.03771 14.7358 7.68726C13.9829 8.38207 12.9499 8.70255 11.9302 8.56876C10.9412 8.43901 10.0633 9.08477 9.8972 9.97039C9.70867 10.9755 9.05742 11.8308 8.14447 12.3037C7.28666 12.7479 6.97059 13.739 7.37537 14.5479C7.83407 15.4646 7.83407 16.5356 7.37537 17.4523C6.97059 18.2612 7.28666 19.2523 8.14447 19.6965C9.05742 20.1694 9.70867 21.0247 9.8972 22.0298C10.0633 22.9154 10.9412 23.5612 11.9302 23.4314C12.9499 23.2976 13.9829 23.6181 14.7358 24.3129C15.4397 24.9625 16.5603 24.9625 17.2642 24.3129C18.0171 23.6181 19.0501 23.2976 20.0698 23.4314C21.0588 23.5612 21.9367 22.9154 22.1028 22.0298C22.2913 21.0247 22.9426 20.1694 23.8555 19.6965C24.7133 19.2523 25.0294 18.2612 24.6246 17.4523C24.1659 16.5356 24.1659 15.4646 24.6246 14.5479C25.0294 13.739 24.7133 12.7479 23.8555 12.3037C22.9426 11.8308 22.2913 10.9755 22.1028 9.97039L22.8891 9.82289L22.1028 9.97039C21.9367 9.08477 21.0588 8.43901 20.0698 8.56876C19.0501 8.70255 18.0171 8.38207 17.2642 7.68726ZM11.2 12.8001C11.2 11.9164 11.9163 11.2001 12.8 11.2001C13.6837 11.2001 14.4 11.9164 14.4 12.8001C14.4 13.6838 13.6837 14.4001 12.8 14.4001C11.9163 14.4001 11.2 13.6838 11.2 12.8001ZM20.5315 11.4344C20.8439 11.7468 20.8439 12.2534 20.5315 12.5658L12.5657 20.5315C12.2533 20.844 11.7467 20.844 11.4343 20.5315C11.1219 20.2191 11.1219 19.7126 11.4343 19.4002L19.4001 11.4344C19.7125 11.122 20.219 11.122 20.5315 11.4344ZM17.6 19.2001C17.6 18.3164 18.3163 17.6001 19.2 17.6001C20.0837 17.6001 20.8 18.3164 20.8 19.2001C20.8 20.0838 20.0837 20.8001 19.2 20.8001C18.3163 20.8001 17.6 20.0838 17.6 19.2001Z"
                        fill="#171523"
                      />
                    </svg>
                    Descuentos
                  </a>

                </li>
                {/* <li class="nav-item pers">
                  <a href="#">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.01188 8.93426C7.42613 7.88991 8.43195 7.19995 9.55604 7.19995H22.444C23.568 7.19995 24.5739 7.88991 24.9881 8.93426L26.0236 11.5449C26.1674 11.9073 26.3265 12.3603 26.3805 12.8331C26.4356 13.3162 26.3871 13.8761 26.053 14.3919C25.5667 15.1425 24.7215 15.6444 23.7569 15.6444C22.9973 15.6444 22.3126 15.3344 21.8176 14.835C21.3227 15.3344 20.638 15.6444 19.8784 15.6444C19.1189 15.6444 18.4341 15.3344 17.9392 14.835C17.4443 15.3344 16.7595 15.6444 16 15.6444C15.2405 15.6444 14.5557 15.3344 14.0608 14.835C13.5659 15.3344 12.8811 15.6444 12.1216 15.6444C11.362 15.6444 10.6772 15.3344 10.1823 14.835C9.68743 15.3344 9.00266 15.6444 8.24312 15.6444C7.27849 15.6444 6.43325 15.1425 5.94699 14.3919C5.61289 13.8761 5.56435 13.3162 5.61952 12.8331C5.67352 12.3603 5.8326 11.9073 5.97637 11.5449L7.01188 8.93426ZM10.9823 12.8888C10.9823 13.5334 11.4987 14.0444 12.1216 14.0444C12.7444 14.0444 13.2608 13.5334 13.2608 12.8888C13.2608 12.447 13.6189 12.0888 14.0608 12.0888C14.5026 12.0888 14.8608 12.447 14.8608 12.8888C14.8608 13.5334 15.3771 14.0444 16 14.0444C16.6229 14.0444 17.1392 13.5334 17.1392 12.8888C17.1392 12.447 17.4974 12.0888 17.9392 12.0888C18.381 12.0888 18.7392 12.447 18.7392 12.8888C18.7392 13.5334 19.2556 14.0444 19.8784 14.0444C20.5013 14.0444 21.0176 13.5334 21.0176 12.8888C21.0176 12.447 21.3758 12.0888 21.8176 12.0888C22.2595 12.0888 22.6176 12.447 22.6176 12.8888C22.6176 13.5334 23.134 14.0444 23.7569 14.0444C24.1526 14.0444 24.5041 13.84 24.7101 13.522C24.7808 13.4129 24.8189 13.2607 24.7908 13.0147C24.7615 12.7585 24.6675 12.4653 24.5364 12.1348L23.5008 9.5242C23.3261 9.08366 22.9058 8.79995 22.444 8.79995H9.55604C9.09421 8.79995 8.67389 9.08366 8.49915 9.5242L7.46364 12.1348C7.33253 12.4653 7.23844 12.7585 7.20918 13.0147C7.18109 13.2607 7.2192 13.4129 7.28986 13.522C7.4959 13.84 7.84742 14.0444 8.24312 14.0444C8.86598 14.0444 9.38234 13.5334 9.38234 12.8888C9.38234 12.447 9.74051 12.0888 10.1823 12.0888C10.6242 12.0888 10.9823 12.447 10.9823 12.8888ZM10.1823 17.5111C10.6242 17.5111 10.9823 17.8692 10.9823 18.3111V23.2H21.0176V18.3111C21.0176 17.8692 21.3758 17.5111 21.8176 17.5111C22.2595 17.5111 22.6176 17.8692 22.6176 18.3111V23.2H24.7265C25.1683 23.2 25.5265 23.5581 25.5265 24C25.5265 24.4418 25.1683 24.7999 24.7265 24.7999H7.27351C6.83168 24.7999 6.47351 24.4418 6.47351 24C6.47351 23.5581 6.83168 23.2 7.27351 23.2H9.38234V18.3111C9.38234 17.8692 9.74051 17.5111 10.1823 17.5111Z"
                        fill="#171523"
                      />
                    </svg>
                    Tiendas
                  </a>
                </li> */}
                <li class='nav-item dropdown'>
                  <a class="nav-link dropdown-toggle w-full"
                    href="#" role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.0067 7.20013C15.9194 7.19939 15.832 7.21306 15.748 7.24118L10.148 9.1163C9.82267 9.22525 9.6 9.53268 9.6 9.88246V15.0696C9.6 16.7019 9.98245 18.3111 10.7162 19.7671C11.7279 21.7745 13.36 23.3975 15.3669 24.393L15.6805 24.5486C15.7833 24.5996 15.8949 24.6245 16.0063 24.6235C16.1136 24.6226 16.2206 24.5977 16.3195 24.5486L16.6331 24.393C18.64 23.3975 20.2721 21.7745 21.2838 19.7671C22.0176 18.3111 22.4 16.7019 22.4 15.0696V9.88246C22.4 9.53268 22.1773 9.22525 21.852 9.1163L16.252 7.24118C16.1723 7.21449 16.0895 7.20082 16.0067 7.20013ZM15.24 5.72397C15.4931 5.63925 15.7567 5.59797 16.0201 5.60018C16.2701 5.60229 16.5198 5.64356 16.76 5.72397L22.36 7.59909C23.3413 7.92768 24 8.84864 24 9.88246V15.0696C24 16.9517 23.559 18.8076 22.7126 20.4872C21.5456 22.8028 19.6621 24.6765 17.3441 25.8264L17.0305 25.9819C16.7122 26.1398 16.3666 26.2204 16.0205 26.2235C15.6607 26.2266 15.3003 26.146 14.9695 25.9819L14.6559 25.8264C12.3379 24.6765 10.4544 22.8028 9.28742 20.4872C8.44097 18.8076 8 16.9517 8 15.0696V9.88246C8 8.84863 8.65871 7.92768 9.64002 7.59909L15.24 5.72397ZM19.7644 12.9788C20.0775 13.2905 20.0787 13.797 19.767 14.1102L15.767 18.1283C15.6168 18.2791 15.4128 18.3639 15.2 18.3639C14.9872 18.3639 14.7832 18.2791 14.633 18.1283L13.033 16.521C12.7213 16.2079 12.7225 15.7014 13.0356 15.3897C13.3487 15.078 13.8552 15.0791 14.167 15.3922L15.2 16.4299L18.633 12.9814C18.9448 12.6682 19.4513 12.6671 19.7644 12.9788Z"
                        fill="black"
                      />
                    </svg>
                    Vender

                  </a>
                  <ul class="dropdown-menu dropdown-menu-extended">
                    {currenUser ? (
                      <li>
                        <a className='dropdown-item' href="#" onClick={(e) => {
                          e.preventDefault();
                          setCurrentUser();
                          setIsLoggedIn(false);
                        }}>
                          <strong>Cerrar sesión como cliente</strong>
                        </a>
                      </li>
                    ) : (
                      <>
                        <li style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>

                          <a
                            href="https://egoi.xyz/shop/apply"
                          // onClick={() => {
                          //   setModalViewLogin(true);
                          // }}

                          >
                            {/* <FontAwesomeIcon icon={faUser} /> */}
                            Conviértete en vendedor
                          </a>
                          <a
                            href="https://egoi.xyz/seller/auth/login"
                          // onClick={() => {
                          //   setModalViewRegistro(true);
                          // }}
                          >
                            {/* <FontAwesomeIcon icon={faUserPlus} />  */}
                            Iniciar sesión vendedor
                          </a>
                        </li>
                      </>
                    )}
                  </ul>

                </li>
                {currenUser ? (
                  <li class='nav-item pers'>
                    <a href="/myorders?activeOption=MisPedidos&selectedOption=Mis%20pedidos" >
                      <svg xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        class="bi bi-person-gear"
                        viewBox="0 0 20 20">
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                      </svg>
                      Mi cuenta
                    </a>
                  </li>
                ) : (
                  <></>
                )}

                <hr></hr>
                <li class='nav-item pers'>
                  <a href="#" onClick={(e) => { e.preventDefault(); goToDetailCart() }}>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.3462 10.2956C16.7352 10.6877 16.7328 11.3208 16.3407 11.7098L13.7003 14.3299H26.2997L23.6593 11.7098C23.2672 11.3208 23.2648 10.6877 23.6538 10.2956C24.0428 9.90361 24.676 9.90115 25.068 10.2902L29.1392 14.3299H32C32.5523 14.3299 33 14.7776 33 15.3299C33 15.8822 32.5523 16.3299 32 16.3299H8C7.44772 16.3299 7 15.8822 7 15.3299C7 14.7776 7.44772 14.3299 8 14.3299H10.8608L14.932 10.2902C15.324 9.90115 15.9572 9.90361 16.3462 10.2956ZM12.3313 17.0103H27.6686C28.1494 17.0103 28.5593 17.0103 28.8977 17.0332C29.2524 17.0572 29.6004 17.1096 29.9423 17.2502C30.7207 17.5701 31.3416 18.1848 31.6658 18.9615C31.8085 19.3034 31.8616 19.6512 31.8859 20.0046C31.9091 20.3411 31.9091 20.7486 31.909 21.2251V21.295C31.9091 22.7765 31.9091 23.9399 31.8444 24.88C31.7786 25.8372 31.6424 26.6362 31.3336 27.3758C30.5665 29.2135 29.0962 30.6711 27.2486 31.4305C26.5057 31.7359 25.703 31.8707 24.7398 31.9359C23.7932 32 22.6214 32 21.1277 32H18.8722C17.3785 32 16.2068 32 15.2601 31.9359C14.2969 31.8707 13.4942 31.7359 12.7513 31.4305C10.9037 30.6711 9.43341 29.2135 8.66629 27.3758C8.35751 26.6362 8.22132 25.8372 8.1555 24.88C8.09086 23.9399 8.09086 22.7766 8.09087 21.295L8.09087 21.225C8.09085 20.7485 8.09084 20.3411 8.11398 20.0046C8.13828 19.6512 8.19143 19.3034 8.33412 18.9615C8.65836 18.1848 9.2792 17.5701 10.0576 17.2502C10.3995 17.1096 10.7475 17.0572 11.1023 17.0332C11.4406 17.0103 11.8505 17.0103 12.3313 17.0103ZM11.2373 19.0286C10.9835 19.0458 10.877 19.0757 10.8179 19.1C10.5271 19.2195 10.2984 19.4478 10.1798 19.732C10.1564 19.788 10.1265 19.8912 10.1093 20.1418C10.0914 20.4014 10.0909 20.7396 10.0909 21.2577C10.0909 22.7846 10.0914 23.8793 10.1508 24.7428C10.2095 25.5972 10.3225 26.1515 10.5119 26.6054C11.0735 27.9506 12.1516 29.0217 13.5116 29.5807C13.9717 29.7698 14.5328 29.8821 15.3952 29.9405C16.2664 29.9995 17.3706 30 18.909 30H21.0909C22.6293 30 23.7335 29.9995 24.6047 29.9405C25.4671 29.8821 26.0283 29.7698 26.4883 29.5807C27.8483 29.0217 28.9265 27.9506 29.488 26.6054C29.6775 26.1515 29.7904 25.5972 29.8491 24.7428C29.9085 23.8793 29.909 22.7846 29.909 21.2577C29.909 20.7396 29.9085 20.4014 29.8906 20.1418C29.8734 19.8912 29.8435 19.788 29.8201 19.732C29.7015 19.4478 29.4728 19.2195 29.182 19.1C29.123 19.0757 29.0164 19.0458 28.7626 19.0286C28.4999 19.0108 28.1582 19.0103 27.6363 19.0103H12.3636C11.8417 19.0103 11.5 19.0108 11.2373 19.0286ZM17.2727 21.3402C17.825 21.3402 18.2727 21.7879 18.2727 22.3402V26.6701C18.2727 27.2224 17.825 27.6701 17.2727 27.6701C16.7204 27.6701 16.2727 27.2224 16.2727 26.6701V22.3402C16.2727 21.7879 16.7204 21.3402 17.2727 21.3402ZM22.7272 21.3402C23.2795 21.3402 23.7272 21.7879 23.7272 22.3402V26.6701C23.7272 27.2224 23.2795 27.6701 22.7272 27.6701C22.1749 27.6701 21.7272 27.2224 21.7272 26.6701V22.3402C21.7272 21.7879 22.1749 21.3402 22.7272 21.3402Z"
                        fill="#171523"
                      />
                    </svg>
                    Carrito de compras
                  </a>
                </li>
                <li class='nav-item pers'>
                  <a href="#" onClick={handleFavList}>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.0732 12.5641C15.9976 10.4786 12.6343 10.4786 10.5587 12.5641C8.48045 14.6521 8.48045 18.0394 10.5587 20.1274L18.9574 28.5657C19.5337 29.1448 20.4663 29.1448 21.0426 28.5657L29.4413 20.1274C31.5196 18.0394 31.5196 14.6521 29.4413 12.5641C27.3657 10.4786 24.0024 10.4786 21.9268 12.5641L20.7088 13.7878C20.5211 13.9764 20.266 14.0824 20 14.0824C19.734 14.0824 19.4789 13.9764 19.2912 13.7878L18.0732 12.5641ZM9.14113 11.1532C11.9986 8.28227 16.6333 8.28227 19.4908 11.1532L20 11.6648L20.5092 11.1532C23.3667 8.28228 28.0014 8.28227 30.8589 11.1532C33.7137 14.0215 33.7137 18.67 30.8589 21.5383L22.4602 29.9766C21.102 31.3411 18.898 31.3411 17.5398 29.9766L9.14113 21.5383C6.28629 18.67 6.28629 14.0215 9.14113 11.1532Z"
                        fill="#171523"
                      />
                    </svg>
                    Favoritos
                  </a>
                </li>

                <li class="nav-item btnsPers">
                  {currenUser ? (
                    <a href="#" onClick={handleLogout}>
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      Cerrar Sesion
                    </a>
                  ) : (

                    <>
                      <a href='#' className='btn btnPersonalizadosL'
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOffcanvasVisible(false);
                          setModalViewLogin(true);


                          // const offcanvasElement = document.querySelector('.offcanvas');
                          // const backdropElement = document.querySelector('.offcanvas-backdrop');

                          // if (offcanvasElement && backdropElement) {
                          //   offcanvasElement.classList.remove('show');
                          //   backdropElement.classList.remove('show');
                          //   }
                        }}
                      >
                        <FontAwesomeIcon icon={faUser} /> Inicia sesión
                      </a>
                      <Modal
                        className="modal-dialog-centered modal-lg"
                        toggle={() => setModalViewLogin(false)}
                        isOpen={modalViewLogin && !changeFormLogin}
                      >
                        <ModalBody>
                          <Login closeModalLogin={closeModalLogin} handleLogin={handleLogin} handleChangeFormLogin={handleChangeFormLogin} changeFormRegister={changeFormRegister} />
                        </ModalBody>
                      </Modal>

                      <a href='#'
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOffcanvasVisible(false);
                          setModalViewRegistro(true);
                        }}
                        className='btn btnPersonalizadosR'>
                        <FontAwesomeIcon icon={faUserPlus} /> Regístrate
                      </a>
                      <Modal
                        className="modal-dialog-centered modal-lg"
                        toggle={() => setModalViewRegistro(false)}
                        isOpen={modalViewRegistro && !changeFormRegister}
                      >
                        <ModalBody>
                          <Register closeModalRegistro={closeModalRegistro} handleChangeFormRegister={handleChangeFormRegister} />
                        </ModalBody>
                      </Modal>
                    </>
                  )}
                </li>

              </ul>


            </div>
          </div>
        </div >
      </nav >
      <div>





      </div>
    </div >
  )
}

export default (HeaderResponsive);
