import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    Form,
    Modal,
    ModalBody,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    UncontrolledCarousel,
    Input
} from 'reactstrap';
import iphone from '../../assets/iphoneMuestra.png';
import start from '../../assets/egoi_icons/star-fill.svg';
import startEmpty from '../../assets/egoi_icons/star-fill-gray.svg';

import { detailProduct, detailProductById } from '../../services/detailProduct';
import Register from "../../views/user/register.js";
import Login from "../../views/user/login.js";

import '../../styles/detailsProduct.css';
import { useParams, useHistory } from 'react-router-dom';
import { getCurrentUser, setCurrentUser } from '../../helpers/Utils';
import Swal from 'sweetalert2';
import AddCart from '../../views/user/addCart';
import detailsProduct from '../../views/detailsProduct';
import { addProductsCart, allProductsCart } from '../../services/cart';
import NoStock from '../../views/user/noStock';
import { addFavoriteProduct } from '../../services/ordenes';
import parse from 'html-react-parser';
import { ThreeCircles } from 'react-loader-spinner';

function DetailProduct({ setCantCart, handleLogged }) {
    const { slug } = useParams();
    const [detailProducts, setDetailProducts] = useState([]);
    const [currentImg, setCurrentImage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [modalViewRegistro, setModalViewRegistro] = useState(false);
    const [modalViewLogin, setModalViewLogin] = useState(false);
    const [modalViewCart, setModalViewCart] = useState(false);
    const [changeFormLogin, setChangeFormLogin] = useState(false);
    const [changeFormRegister, setChangeFormRegister] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isScrollModalEnabled, setIsScrollModalEnabled] = useState(true);

    const [productsCart, setProductsCart] = useState([]);
    // const [costoEnvio, setCostoEnvio] = useState(0);
    const [totalAPagar, setTotalAPagar] = useState(0);
    const [precioProduct, setPrecioProduct] = useState(0);


    /* Carousel */
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    /* CArousel */

    const [infoDescription, setInfoDescription] = useState('');
    const [formattedDescription, setFormattedDescription] = useState('')

    /* Colores seleccion */
    const [selectedOption, setSelectedOption] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    const { id } = useParams();

    const currenUser = getCurrentUser();

    const history = useHistory();

    // const token = currenUser.token;



    const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";


    // const getAllProductsByCart = (token) => {
    //     if (token) {
    //         allProductsCart(token)
    //             .then((res) => {
    //                 console.log(res);
    //                 setProductsCart(res.data);
    //                 console.log("traer todos los producstos del carrito", productsCart);

    //             })
    //             .catch((err) => console.log(err));
    //     }

    // }

    const addToCart = () => {
        if (currenUser) {
            setModalViewCart(true);
            addProductsCart(id, quantity, currenUser.token)
                .then((res) => {
                    setCantCart();
                    // console.log("Producto enviado", res.data);
                    // console.log(token);
                })
                .catch((err) => console.log(err));
            // console.log("producto agregado");
            // console.log(token);
        } else {

            setModalViewLogin(true);

        }

    }




    const favClick = (idProductFav) => {
        // console.log(idProductFav)
        if (currenUser) {
            addFavoriteProduct(currenUser.token, idProductFav)
                .then((res) => {
                    // console.log('Se añadio el producto a favoritos', res);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Se añadió tu producto a favoritos!',
                        text: 'Tu producto fue añadido a favortios satisfactoriamente.',
                    });
                    detailProductBySlug(slug);

                }).catch((err) => {
                    Swal.fire({
                        title: '¡El producto ya está en tus favoritos!',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    console.log(err);
                });
        } else {
            setModalViewLogin(true);
        }
    }


    const descuento = "$0";

    const buyNow = () => {
        if (currenUser) {
            addProductsCart(id, quantity, currenUser.token)
                .then((res) => {
                    // console.log("Producto agregado", res.data);

                })
                .catch((err) => console.log(err));
            const buyNowProduct = detailProducts.unit_price * quantity;
            setPrecioProduct(buyNowProduct);
            let costoEnvio = 0;
            const costoDeEnvio = () => {
                if (buyNowProduct <= 79990) {
                    costoEnvio = 9900;

                } else {
                    costoEnvio = 0;
                }
            }
            costoDeEnvio();
            const totalAPagar = buyNowProduct + costoEnvio;
            setTotalAPagar(totalAPagar);
            console.log("Este es el costo de envio", costoEnvio);
            if (totalAPagar) {
                // console.log("total a pagar ahora", totalAPagar);
            } else {

            }
            history.push(`/checkout/${buyNowProduct.toLocaleString('en')}/${costoEnvio.toLocaleString('en')}/$${totalAPagar.toLocaleString('en')}/${descuento}`);

        }
        else {
            setModalViewLogin(true);
        }
    }



    const closeModalRegistro = () => {
        setModalViewRegistro(false);
    };

    const closeModalLogin = () => {
        setModalViewLogin(false);
    };

    const closeModalCart = () => {
        setModalViewCart(false);
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
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

    const handleLogin = () => {
        // Code to handle user login, such as storing session storage, etc.
        if (currenUser) {
            setIsLoggedIn(true);
            handleLogged(true);
            // console.log("Estas logueado")

        } else {
            setIsLoggedIn(false);
        }

    };

    const handleLogout = () => {
        // Code to handle user logout, such as clearing session storage, etc.
        // console.log("Entro al logout");
        setCurrentUser();
        setIsLoggedIn(false);
    };

    const handleQuantity = (e) => {
        const value = parseInt(e.target.value);
        setQuantity(value);
        // console.log("quantity: ", value);
    }
    /**
     * This function retrieves and sets the details of a product based on its slug using useEffect hook
     * in TypeScript React.
     * @param slug - The "slug" parameter is likely a string that represents a unique identifier for a
     * specific product. It is used as an input to the "detailProductBySlug" function to retrieve
     * details about the product from an API endpoint.
     */
    const detailProductBySlug = (slug) => {
        detailProduct(slug)
            .then((res) => {
                // console.log(res);
                setDetailProducts(res.data);
                setIsLoading(false);
                // console.log("Detalle del producto por slug", res.data.count_orden);
            })
            .catch((err) => console.log(err));
    }

    const detailProductByIdProduct = (id) => {
        detailProductById(id)
            .then((res) => {
                setDetailProducts(res.data);
                setIsLoading(false);
                // console.log("Detalle del producto traido por id desde un banner", res.data);
            })
            .catch((err) => console.log(err));
    }


    var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener("scroll", function () {
        var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
        var scrollModal = document.getElementById("scrollModalAddToCart");

        if (scrollModal !== null) {
            if (currentScrollPos > prevScrollPos) {
                scrollModal.style.display = "block";
            } else {
                scrollModal.style.display = "none";
            }
        }

        prevScrollPos = currentScrollPos;
    });

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    /* Share Link */
    const handleShare = async () => {
        const currentUrl = window.location.href;
        // console.log(currentUrl);

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Compartir este producto',
                    url: currentUrl,
                });
            } catch (error) {
                console.error('Error al compartir:', error);
            }
        } else {
            console.log('La API de compartir no es compatible en este navegador.');
            // Implementa una alternativa si la API de compartir no es compatible
        }
    };



    useEffect(() => {

        if (slug !== 'slug') {
            detailProductBySlug(slug);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentImage(0);
        }

        if (id) {
            detailProductByIdProduct(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentImage(0);
        }
        // history.push(history.location.pathname);

    }, [slug, id]);

    useEffect(() => {
        if (currenUser) {
            setIsLoggedIn(true);


        } else {
            setIsLoggedIn(false);

        }

        // console.log(precioProduct);

        // const elementoTemporal = document.createElement('div');
        // elementoTemporal.innerHTML = detailProducts.details;
        // const descripcionSinEtiquetas = elementoTemporal.textContent;

        // setFormattedDescription(descripcionSinEtiquetas);
        // console.log("Esta es la descripcion sin etiquetas", formattedDescription);


        // history.push(history.location.pathname);
    }, [currenUser, handleLogged]);

    useEffect(() => {
        // const elementoTemporal = document.createElement('div');
        // elementoTemporal.innerHTML = detailProducts.details;
        // const descripcionSinEtiquetas = elementoTemporal.textContent;

        // setFormattedDescription(descripcionSinEtiquetas);
    }, []);

    return (
        <div>

        
        {isLoading ? (
            <>

            <div className="loadingDiv">
                <ThreeCircles
                  height="100"
                  width="100"
                  color="#FC5241"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor=""
                  innerCircleColor=""
                  middleCircleColor=""
                />
                <h2 style={{ color: '#FC5241' }}>Cargando...</h2>
              </div>
            </>
        ):(
            <>
            <div className='container'>
                <div className="containerDetalle">
                    <div className="containerIzq">
                        <div className="containerResponsiveNameProduct">
                            <div className="containerNameAndStarts">
                                <div className="Name">
                                    <h2>{detailProducts  && detailProducts.name}</h2>
                                </div>
                                <div className="stars">
                                    {[...Array(5)].map((_, index) => (
                                        <img
                                            key={index}
                                            src={index < detailProducts  && detailProducts.count_rating ? start : startEmpty}
                                            alt=""
                                        />
                                    ))}
                                </div>
    
                            </div>
                        </div>
    
    
                        {detailProducts && detailProducts.images && detailProducts.images.length > 0 && (
    
    
                            <Card className='cardImgProduct'>
                                <div className="containerImgTop">
                                    <img src={currentImg || baseUrlImage + detailProducts.images[0]} alt={detailProducts.name} />
                                </div>
                                <div className="containerImgMiniature">
                                    {detailProducts  && detailProducts.current_stock <= 0 && (
                                        <span className="agotadoTag">Agotado</span>
                                    )}
                                    {detailProducts  && detailProducts.images.map((imgProduct, index) => (
    
                                        <img src={baseUrlImage + imgProduct}
                                            alt={detailProducts.name}
                                            key={index}
                                            onClick={() => setCurrentImage(baseUrlImage + imgProduct)}
                                            className={currentImg === baseUrlImage + imgProduct ? 'activeMiniature' : ''} />
    
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>
                    <div className="containerDer">
                        <div className="containerResponsiveNameProduct">
                            <div className="containerNameAndStarts">
    
    
                                <div className="precio">
                                    {detailProducts.discount_tag_valor > 0 || detailProducts.discount_valor > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <h5>${detailProducts.discount_valor && detailProducts.discount_valor.toLocaleString('en') || detailProducts.discount_tag_valor && detailProducts.discount_tag_valor.toLocaleString('en')}</h5>
                                            <h5 id='tachado'><s>${detailProducts.unit_price && detailProducts.unit_price.toLocaleString('en')}</s></h5>
                                        </div>
    
                                    ) : (
                                        <h5>${detailProducts.unit_price && detailProducts.unit_price.toLocaleString('en')}</h5>
                                    )}
                                    {detailProducts.unit_price >= 79990 || detailProducts.discount_valor >= 79900 || detailProducts.dicount_tag_valor >= 79900 ? (
                                        <div style={{ display: 'flex', flexDirection: "row", color: 'green', gap: '5px' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ alignSelf: 'center' }}>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.5738 6.63403C13.1555 6.60036 12.6195 6.5999 11.8575 6.5999H5.53365C5.20228 6.5999 4.93365 6.33126 4.93366 5.99989C4.93367 5.66852 5.2023 5.3999 5.53367 5.3999L11.8831 5.3999C12.6136 5.3999 13.1979 5.39989 13.6701 5.4379C14.1544 5.4769 14.5729 5.5588 14.9581 5.7522C15.5758 6.0623 16.0796 6.55796 16.3959 7.16963C16.5937 7.5522 16.6774 7.96782 16.7171 8.44703C16.7394 8.71606 16.7488 9.02184 16.7528 9.37049H17.3906C18.2149 9.37049 18.8697 9.37048 19.3978 9.413C19.9382 9.4565 20.3981 9.54742 20.8192 9.75885C21.5001 10.1007 22.0553 10.647 22.4038 11.3209C22.6199 11.7388 22.7127 12.1953 22.757 12.7297C22.8002 13.2511 22.8002 13.8972 22.8002 14.7086V15.6375C22.8002 15.8056 22.8002 15.9662 22.789 16.1018C22.7767 16.2499 22.748 16.4204 22.66 16.5906C22.5368 16.8288 22.3412 17.0207 22.1027 17.1405C21.933 17.2257 21.7633 17.2535 21.6149 17.2654C21.4785 17.2764 21.3164 17.2764 21.1453 17.2764L21.0251 17.2764C20.7695 18.0488 20.034 18.5999 19.178 18.5999C18.322 18.5999 17.5865 18.0487 17.3309 17.2764H9.94356C9.68799 18.0488 8.95248 18.5999 8.09648 18.5999C7.22063 18.5999 6.47092 18.0229 6.2324 17.2223C5.98721 17.21 5.79037 17.2042 5.53366 17.2042C5.20229 17.2042 4.93366 16.9356 4.93366 16.6042C4.93366 16.2729 5.20229 16.0042 5.53366 16.0042C5.80655 16.0042 6.02013 16.0104 6.26817 16.0226C6.53951 15.2784 7.26044 14.7528 8.09648 14.7528C8.95248 14.7528 9.68799 15.304 9.94356 16.0764H15.5557V10.2352C15.5557 9.4839 15.5553 8.95705 15.5212 8.54619C15.4877 8.1426 15.425 7.90448 15.33 7.72082C15.1312 7.33633 14.813 7.0221 14.4197 6.82463C14.2303 6.72952 13.9853 6.66716 13.5738 6.63403ZM16.7557 10.5705V16.0764H17.3309C17.5865 15.304 18.322 14.7528 19.178 14.7528C20.034 14.7528 20.7695 15.304 21.0251 16.0764H21.1256C21.3235 16.0764 21.4363 16.0759 21.5186 16.0693C21.547 16.067 21.5642 16.0644 21.5732 16.0628C21.5789 16.0588 21.5838 16.0542 21.5876 16.0493C21.5891 16.0404 21.5912 16.0255 21.5931 16.0026C21.5997 15.9228 21.6002 15.8129 21.6002 15.6175V14.7352C21.6002 13.8912 21.5997 13.2949 21.5611 12.8289C21.523 12.3701 21.4511 12.0911 21.3378 11.8721C21.1068 11.4253 20.7373 11.0605 20.2808 10.8313C20.0555 10.7181 19.769 10.6468 19.3015 10.6091C18.8272 10.5709 18.2207 10.5705 17.3646 10.5705H16.7557ZM2.71131 9.7499C2.71131 9.41853 2.97994 9.1499 3.31131 9.1499H7.08909C7.42046 9.1499 7.68909 9.41853 7.68909 9.7499C7.68909 10.0813 7.42046 10.3499 7.08909 10.3499H3.31131C2.97994 10.3499 2.71131 10.0813 2.71131 9.7499ZM1.2002 12.7499C1.2002 12.4185 1.46882 12.1499 1.8002 12.1499H7.84465C8.17602 12.1499 8.44465 12.4185 8.44465 12.7499C8.44465 13.0813 8.17602 13.3499 7.84465 13.3499H1.8002C1.46882 13.3499 1.2002 13.0813 1.2002 12.7499ZM8.09648 15.9528C7.68264 15.9528 7.36075 16.2775 7.3534 16.6624L7.35327 16.6764C7.35327 17.0676 7.67764 17.3999 8.09648 17.3999C8.51533 17.3999 8.83969 17.0676 8.83969 16.6764C8.83969 16.2851 8.51533 15.9528 8.09648 15.9528ZM19.178 15.9528C18.7591 15.9528 18.4348 16.2851 18.4348 16.6764C18.4348 17.0676 18.7591 17.3999 19.178 17.3999C19.5968 17.3999 19.9212 17.0676 19.9212 16.6764C19.9212 16.2851 19.5968 15.9528 19.178 15.9528Z" fill="#089705" />
                                            </svg>
                                            <p style={{ marginBottom: '0' }}>Envío gratis</p>
                                        </div>
                                    ) : (
                                        null
                                    )}
                                </div>
                            </div>
                            <div className="favAndShareAndQuantity">
    
                                <div className='favAndShare'>
                                    {/* iconFav  */}
                                    <a href="#" onClick={() => favClick(detailProducts.id)}>
                                        <svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='svgFav'>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16977 8.31899C9.38258 5.76021 13.0251 5.76021 15.2379 8.31899L15.9999 9.20013L16.7619 8.31899C18.9747 5.76021 22.6172 5.76021 24.83 8.31899C26.6657 10.4417 26.9852 13.7669 25.2901 16.1259C24.545 17.1629 23.6408 18.3392 22.6001 19.5426C21.0155 21.3749 19.5019 22.8434 18.3834 23.8548C17.8238 24.3608 17.3622 24.7532 17.0389 25.0203C16.8773 25.1539 16.7501 25.2562 16.6625 25.3258C16.6187 25.3606 16.5848 25.3872 16.5613 25.4055L16.5342 25.4266L16.5266 25.4324L16.5237 25.4347C16.5236 25.4347 16.5232 25.435 16.0368 24.7999C15.5582 25.441 15.5581 25.4409 15.558 25.4408L15.5547 25.4383L15.5469 25.4325L15.519 25.4113C15.4949 25.393 15.4601 25.3664 15.4152 25.3315C15.3253 25.2618 15.1951 25.1594 15.0297 25.0257C14.699 24.7584 14.2276 24.3657 13.6582 23.8592C12.5201 22.8471 10.9862 21.3771 9.3997 19.5426C8.35898 18.3392 7.45476 17.1629 6.70966 16.1259C5.01456 13.7669 5.33408 10.4417 7.16977 8.31899ZM16.0368 24.7999L15.558 25.4408L16.043 25.8028L16.5237 25.4347L16.0368 24.7999ZM16.0309 23.7777C16.3373 23.5243 16.7765 23.1507 17.3103 22.6681C18.3915 21.6904 19.8569 20.2686 21.3898 18.496C22.3938 17.3351 23.2684 16.1976 23.9908 15.1923C25.2159 13.4873 25.0151 10.9791 23.6198 9.36558C22.0451 7.54468 19.5468 7.54468 17.9721 9.36558L15.9999 11.6462L14.0277 9.36558C12.453 7.54468 9.9547 7.54468 8.38 9.36558C6.98464 10.9791 6.78389 13.4873 8.009 15.1923C8.73136 16.1976 9.60598 17.3351 10.6099 18.496C12.1409 20.2664 13.623 21.6867 14.7215 22.6636C15.2676 23.1493 15.7179 23.5245 16.0309 23.7777Z" fill="black" />
                                        </svg>
                                    </a>
    
    
                                    {/* icon share  */}
                                    <a href="#" onClick={() => handleShare()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-share svgShare" viewBox="0 0 16 16">
                                            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                                        </svg>
                                    </a>
                                </div>
    
    
                            </div>
                        </div>
                        <div className="containerResposniveProductosVendidos">
                            <div className="productosVendidos">
                                <h6>13,216 productos vendidos</h6>
                            </div>
                            <div className="sendMessage">
                                <a href="#">
                                    <p>Enviar Mensaje</p>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='svgSendMessage'>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.2002 11.9992C4.2002 7.6914 7.69237 4.19922 12.0002 4.19922C16.308 4.19922 19.8002 7.6914 19.8002 11.9992V17.1698C19.8002 17.5471 19.8002 17.8725 19.7744 18.1387C19.7471 18.4207 19.6864 18.6989 19.5243 18.9569C19.3804 19.1858 19.1868 19.3795 18.9579 19.5233C18.6999 19.6854 18.4217 19.7461 18.1397 19.7734C17.8734 19.7992 17.5481 19.7992 17.1708 19.7992H12.0002C7.69237 19.7992 4.2002 16.307 4.2002 11.9992ZM12.0002 5.39922C8.35512 5.39922 5.4002 8.35414 5.4002 11.9992C5.4002 15.6443 8.35512 18.5992 12.0002 18.5992H17.1431C17.5559 18.5992 17.8225 18.5986 18.0239 18.579C18.216 18.5604 18.2846 18.5291 18.3194 18.5073C18.3957 18.4593 18.4603 18.3948 18.5082 18.3184C18.5301 18.2837 18.5614 18.215 18.58 18.0229C18.5995 17.8215 18.6002 17.5549 18.6002 17.1421V11.9992C18.6002 8.35414 15.6453 5.39922 12.0002 5.39922ZM7.8002 10.7992C7.8002 10.4678 8.06882 10.1992 8.4002 10.1992H12.6002C12.9316 10.1992 13.2002 10.4678 13.2002 10.7992C13.2002 11.1306 12.9316 11.3992 12.6002 11.3992H8.4002C8.06882 11.3992 7.8002 11.1306 7.8002 10.7992ZM7.8002 13.1992C7.8002 12.8678 8.06882 12.5992 8.4002 12.5992H15.6002C15.9316 12.5992 16.2002 12.8678 16.2002 13.1992C16.2002 13.5306 15.9316 13.7992 15.6002 13.7992H8.4002C8.06882 13.7992 7.8002 13.5306 7.8002 13.1992Z" fill="#171523" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="containerCharacteristicTopResponsive">
                            <div className='characteristicResponsive'>10 Reseñas</div>
                            <div className='characteristicResponsive'>{detailProducts &&detailProducts.count_orden} Pedidos</div>
                            <div className='characteristicResponsive'>{detailProducts &&detailProducts.count_wishlist} Favoritos</div>
                        </div>
                        {detailProducts  && detailProducts.variation && detailProducts.variation.length > 0 ? (
                            <div className="containerVariacionesResponsiveColores">
                                {detailProducts  && detailProducts.choice_options[0] && typeof detailProducts.choice_options[0].title === 'string' && detailProducts.choice_options[0].title === 'Colores' && (
                                    <p>Colores</p>
                                )}
    
    
                                {detailProducts  && detailProducts.choice_options[0] && typeof detailProducts.choice_options[0].title === 'string' && detailProducts.choice_options[0].title === 'Tallas' && (
                                    <p>Tallas</p>
                                )}
    
                                {detailProducts  && detailProducts.variation?.length > 3 ? (
                                    <Input type="select" onChange={handleSelectChange} value={selectedOption} className='inputStyleVariation'>
                                        <option value="">Seleccionar</option>
                                        {detailProducts.variation.map((colors, index) => (
                                            <option key={index} value={colors.type}>
                                                {colors.type}
                                            </option>
                                        ))}
                                    </Input>
                                ) : (
                                    detailProducts  && detailProducts.variation?.map((colors, index) => (
                                        <a href="#" key={index}>
                                            {colors.type}
                                        </a>
                                    ))
                                )}
                            </div>
                        ) : (null)}
                        <div className="containerResponsiveDescription">
                            <h6>Descripción</h6>
                            <p>{detailProducts  && typeof detailProducts.details === 'string' ? parse(detailProducts.details) : null}
                            </p>
                        </div>
                        <div className="containerResponsiveStockAndQuantity">
                            <h4>Stock disponible</h4>
                            <div className="quantity">
                                <h4>Cantidad: </h4>
                                {quantity >= 2 && (
    
                                    <button className='btnIzq' onClick={handleDecrement}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                        </svg>
                                    </button>
                                )}
                                <input type="number"
                                    value={quantity}
                                    onChange={handleQuantity} />
                                <button className='btnDer' onClick={handleIncrement}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="containerCharacteristicTop">
                            <div className='characteristic'>10 Reseñas</div>
                            <div className='characteristic'>{detailProducts.count_orden} Pedidos</div>
                            <div className='characteristic'>{detailProducts.count_wishlist} Favoritos</div>
                        </div>
                        <div className="containerNameProduct">
                            {/* <h4>iPhone 14 Pro Max 256 GB </h4>  */}
    
                            <h4>{detailProducts  && detailProducts.name}</h4>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignSelf: 'center' }}>
                                {detailProducts  && detailProducts.discount_tag_valor > 0 || detailProducts.discount_valor > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
                                        <h5>${detailProducts  && detailProducts.discount_valor && detailProducts.discount_valor.toLocaleString('en') || detailProducts.discount_tag_valor && detailProducts.discount_tag_valor.toLocaleString('en')}</h5>
                                        <h5 id='tachado'><s>${detailProducts  && detailProducts.unit_price && detailProducts.unit_price.toLocaleString('en')}</s></h5>
                                    </div>
    
                                ) : (
                                    <h5>${detailProducts  && detailProducts.unit_price && detailProducts.unit_price.toLocaleString('en')}</h5>
                                )}
                                {detailProducts  && detailProducts.unit_price >= 79990 || detailProducts.discount_valor >= 79900 || detailProducts.dicount_tag_valor >= 79900 ? (
                                    <div style={{ display: 'flex', flexDirection: "row", color: 'green', gap: '5px' }}>
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ alignSelf: 'center' }}>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.5738 6.63403C13.1555 6.60036 12.6195 6.5999 11.8575 6.5999H5.53365C5.20228 6.5999 4.93365 6.33126 4.93366 5.99989C4.93367 5.66852 5.2023 5.3999 5.53367 5.3999L11.8831 5.3999C12.6136 5.3999 13.1979 5.39989 13.6701 5.4379C14.1544 5.4769 14.5729 5.5588 14.9581 5.7522C15.5758 6.0623 16.0796 6.55796 16.3959 7.16963C16.5937 7.5522 16.6774 7.96782 16.7171 8.44703C16.7394 8.71606 16.7488 9.02184 16.7528 9.37049H17.3906C18.2149 9.37049 18.8697 9.37048 19.3978 9.413C19.9382 9.4565 20.3981 9.54742 20.8192 9.75885C21.5001 10.1007 22.0553 10.647 22.4038 11.3209C22.6199 11.7388 22.7127 12.1953 22.757 12.7297C22.8002 13.2511 22.8002 13.8972 22.8002 14.7086V15.6375C22.8002 15.8056 22.8002 15.9662 22.789 16.1018C22.7767 16.2499 22.748 16.4204 22.66 16.5906C22.5368 16.8288 22.3412 17.0207 22.1027 17.1405C21.933 17.2257 21.7633 17.2535 21.6149 17.2654C21.4785 17.2764 21.3164 17.2764 21.1453 17.2764L21.0251 17.2764C20.7695 18.0488 20.034 18.5999 19.178 18.5999C18.322 18.5999 17.5865 18.0487 17.3309 17.2764H9.94356C9.68799 18.0488 8.95248 18.5999 8.09648 18.5999C7.22063 18.5999 6.47092 18.0229 6.2324 17.2223C5.98721 17.21 5.79037 17.2042 5.53366 17.2042C5.20229 17.2042 4.93366 16.9356 4.93366 16.6042C4.93366 16.2729 5.20229 16.0042 5.53366 16.0042C5.80655 16.0042 6.02013 16.0104 6.26817 16.0226C6.53951 15.2784 7.26044 14.7528 8.09648 14.7528C8.95248 14.7528 9.68799 15.304 9.94356 16.0764H15.5557V10.2352C15.5557 9.4839 15.5553 8.95705 15.5212 8.54619C15.4877 8.1426 15.425 7.90448 15.33 7.72082C15.1312 7.33633 14.813 7.0221 14.4197 6.82463C14.2303 6.72952 13.9853 6.66716 13.5738 6.63403ZM16.7557 10.5705V16.0764H17.3309C17.5865 15.304 18.322 14.7528 19.178 14.7528C20.034 14.7528 20.7695 15.304 21.0251 16.0764H21.1256C21.3235 16.0764 21.4363 16.0759 21.5186 16.0693C21.547 16.067 21.5642 16.0644 21.5732 16.0628C21.5789 16.0588 21.5838 16.0542 21.5876 16.0493C21.5891 16.0404 21.5912 16.0255 21.5931 16.0026C21.5997 15.9228 21.6002 15.8129 21.6002 15.6175V14.7352C21.6002 13.8912 21.5997 13.2949 21.5611 12.8289C21.523 12.3701 21.4511 12.0911 21.3378 11.8721C21.1068 11.4253 20.7373 11.0605 20.2808 10.8313C20.0555 10.7181 19.769 10.6468 19.3015 10.6091C18.8272 10.5709 18.2207 10.5705 17.3646 10.5705H16.7557ZM2.71131 9.7499C2.71131 9.41853 2.97994 9.1499 3.31131 9.1499H7.08909C7.42046 9.1499 7.68909 9.41853 7.68909 9.7499C7.68909 10.0813 7.42046 10.3499 7.08909 10.3499H3.31131C2.97994 10.3499 2.71131 10.0813 2.71131 9.7499ZM1.2002 12.7499C1.2002 12.4185 1.46882 12.1499 1.8002 12.1499H7.84465C8.17602 12.1499 8.44465 12.4185 8.44465 12.7499C8.44465 13.0813 8.17602 13.3499 7.84465 13.3499H1.8002C1.46882 13.3499 1.2002 13.0813 1.2002 12.7499ZM8.09648 15.9528C7.68264 15.9528 7.36075 16.2775 7.3534 16.6624L7.35327 16.6764C7.35327 17.0676 7.67764 17.3999 8.09648 17.3999C8.51533 17.3999 8.83969 17.0676 8.83969 16.6764C8.83969 16.2851 8.51533 15.9528 8.09648 15.9528ZM19.178 15.9528C18.7591 15.9528 18.4348 16.2851 18.4348 16.6764C18.4348 17.0676 18.7591 17.3999 19.178 17.3999C19.5968 17.3999 19.9212 17.0676 19.9212 16.6764C19.9212 16.2851 19.5968 15.9528 19.178 15.9528Z" fill="#089705" />
                                        </svg>
                                        <p style={{ marginBottom: '0', alignSelf: 'center' }}>Envío gratis</p>
                                    </div>
                                ) : (
                                    null
                                )}
                            </div>
    
                        </div>
                        {detailProducts  && detailProducts.variation?.length > 0 ? (
                            <div className="containerColorsProduct">
                                {detailProducts  && detailProducts.choice_options[0] && typeof detailProducts.choice_options[0].title === 'string' && detailProducts.choice_options[0].title === 'Colores' && (
                                    <p>Colores</p>
                                )}
    
    
                                {detailProducts  && detailProducts.choice_options[0] && typeof detailProducts.choice_options[0].title === 'string' && detailProducts.choice_options[0].title === 'Tallas' && (
                                    <p>Tallas</p>
                                )}
    
    
                                {detailProducts  && detailProducts.variation?.length > 3 ? (
                                    <Input type="select" onChange={handleSelectChange} value={selectedOption} className='inputStyleVariation'>
                                        <option value="">Seleccionar</option>
                                        {detailProducts.variation.map((colors, index) => (
                                            <option key={index} value={colors.type}>
                                                {colors.type}
                                            </option>
                                        ))}
                                    </Input>
                                ) : (
                                    detailProducts  && detailProducts.variation?.map((colors, index) => (
                                        <a href="#" key={index}>
                                            {colors.type}
                                        </a>
                                    ))
                                )}
                            </div>
    
                        ) : (null)}
                        <div className="cant">
                            <p>Cantidad</p>
                            <input type="number"
                                value={quantity}
                                onChange={handleQuantity} />
                        </div>
                        <div className="opciones">
                            <a href="#" className='addCart' onClick={addToCart}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FC5241" className="bi bi-cart3" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                <p>Añadir al carrito</p>
                            </a>
    
                            <a href="#" className='buyNow' onClick={buyNow}>
                                <p>Comprar ahora</p>
                            </a>
                            <a href="#" className='fav' onClick={() => favClick(detailProducts.id)}>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='svgFav'>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16977 8.31899C9.38258 5.76021 13.0251 5.76021 15.2379 8.31899L15.9999 9.20013L16.7619 8.31899C18.9747 5.76021 22.6172 5.76021 24.83 8.31899C26.6657 10.4417 26.9852 13.7669 25.2901 16.1259C24.545 17.1629 23.6408 18.3392 22.6001 19.5426C21.0155 21.3749 19.5019 22.8434 18.3834 23.8548C17.8238 24.3608 17.3622 24.7532 17.0389 25.0203C16.8773 25.1539 16.7501 25.2562 16.6625 25.3258C16.6187 25.3606 16.5848 25.3872 16.5613 25.4055L16.5342 25.4266L16.5266 25.4324L16.5237 25.4347C16.5236 25.4347 16.5232 25.435 16.0368 24.7999C15.5582 25.441 15.5581 25.4409 15.558 25.4408L15.5547 25.4383L15.5469 25.4325L15.519 25.4113C15.4949 25.393 15.4601 25.3664 15.4152 25.3315C15.3253 25.2618 15.1951 25.1594 15.0297 25.0257C14.699 24.7584 14.2276 24.3657 13.6582 23.8592C12.5201 22.8471 10.9862 21.3771 9.3997 19.5426C8.35898 18.3392 7.45476 17.1629 6.70966 16.1259C5.01456 13.7669 5.33408 10.4417 7.16977 8.31899ZM16.0368 24.7999L15.558 25.4408L16.043 25.8028L16.5237 25.4347L16.0368 24.7999ZM16.0309 23.7777C16.3373 23.5243 16.7765 23.1507 17.3103 22.6681C18.3915 21.6904 19.8569 20.2686 21.3898 18.496C22.3938 17.3351 23.2684 16.1976 23.9908 15.1923C25.2159 13.4873 25.0151 10.9791 23.6198 9.36558C22.0451 7.54468 19.5468 7.54468 17.9721 9.36558L15.9999 11.6462L14.0277 9.36558C12.453 7.54468 9.9547 7.54468 8.38 9.36558C6.98464 10.9791 6.78389 13.4873 8.009 15.1923C8.73136 16.1976 9.60598 17.3351 10.6099 18.496C12.1409 20.2664 13.623 21.6867 14.7215 22.6636C15.2676 23.1493 15.7179 23.5245 16.0309 23.7777Z" fill="black" />
                                </svg>
                            </a>
    
                            <Modal
                                className="modal-dialog-centered modal-sm"
                                toggle={() => setModalViewCart(false)}
                                isOpen={modalViewCart}
                                onOpened={() => setIsScrollModalEnabled(false)}
                                onClosed={() => setIsScrollModalEnabled(true)}
                            >
                                <ModalBody>
                                    {detailProducts  && detailProducts.current_stock && detailProducts.current_stock > 0 ? (
    
                                        <AddCart closeModalCart={closeModalCart} detailsProducts={detailProducts} quantity={quantity} />
                                    ) : (
                                        <NoStock closeModalCart={closeModalCart} detailsProducts={detailProducts} quantity={quantity} />
                                    )}
                                </ModalBody>
                            </Modal>
                            <Modal
                                className="modal-dialog-centered modal-md"
                                toggle={() => setModalViewLogin(false)}
                                isOpen={modalViewLogin && !changeFormLogin}
                                onOpened={() => setIsScrollModalEnabled(false)}
                                onClosed={() => setIsScrollModalEnabled(true)}
                            >
                                <ModalBody>
                                    <Login closeModalLogin={closeModalLogin} handleLogin={handleLogin} closeModalRegistro={closeModalRegistro} handleChangeFormLogin={handleChangeFormLogin} changeFormRegister={changeFormRegister} />
                                </ModalBody>
                            </Modal>
                            <Modal
                                className="modal-dialog-centered modal-md"
                                toggle={() => setModalViewRegistro(false)}
                                isOpen={modalViewRegistro && !changeFormRegister}
                                onOpened={() => setIsScrollModalEnabled(false)}
                                onClosed={() => setIsScrollModalEnabled(true)}
                            >
                                <ModalBody>
                                    <Register closeModalRegistro={closeModalRegistro} handleChangeFormRegister={handleChangeFormRegister} />
                                </ModalBody>
                            </Modal>
    
                        </div>
                    </div>
    
                </div>
                <div className="containerDescription">
                    <h5>Descripción</h5>
                    <p>
                        {detailProducts  && typeof detailProducts.details === 'string' ? parse(detailProducts.details) : null}
    
                    </p>
                </div>
                <div className="opinions">
                    <div className="raitingLeft">
                        <div className="raiting">
                            <div className="raitingTop">
                                <Card className='cardRaiting'>
                                    <CardBody>
                                        <h2>5,0</h2>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="raitingStarts">
                                <div className="starts">
                                    <img src={start} alt="" />
                                    <img src={start} alt="" />
                                    <img src={start} alt="" />
                                    <img src={start} alt="" />
                                    <img src={start} alt="" />
                                </div>
                                <div className="nrOpinions">
                                    <h6>10 Opiniones</h6>
                                </div>
                            </div>
                        </div>
                        <div className="stats">
                            <div className="stats_raiting">
                                <img src={start} alt="" />
                                <h5>5</h5>
                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar" style={{ width: '100%' }}></div>
                                </div>
                                <h6>10</h6>
                            </div>
                            <div className="stats_raiting_gray">
                                <img src={start} alt="" />
                                <h5>4</h5>
                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar" style={{ width: '100%' }}></div>
                                </div>
                                <h6>0</h6>
                            </div>
                            <div className="stats_raiting_gray">
                                <img src={start} alt="" />
                                <h5>3</h5>
                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar" style={{ width: '100%' }}></div>
                                </div>
                                <h6>0</h6>
                            </div>
                            <div className="stats_raiting_gray">
                                <img src={start} alt="" />
                                <h5>2</h5>
                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar" style={{ width: '100%' }}></div>
                                </div>
                                <h6>0</h6>
                            </div>
                            <div className="stats_raiting_gray">
                                <img src={start} alt="" />
                                <h5>1</h5>
                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar" style={{ width: '100%' }}></div>
                                </div>
                                <h6>0</h6>
                            </div>
                        </div>
                    </div>
    
                    <div className="comments">
                        <div className="comment">
                            <div className="comment_index">
                                <h6>Juan Antonio R</h6>
                                <div className="starts">
                                    <h5>15/09/2016</h5>
                                    <div className="starts_comments">
                                        <img src={start} alt="" />
                                        <img src={start} alt="" />
                                        <img src={start} alt="" />
                                        <img src={start} alt="" />
                                        <img src={start} alt="" />
                                    </div>
                                </div>
    
                            </div>
                            <div className="dateComment">
                                <p>
                                    Excelente producto, llego tal como lo esperaba.
    
                                </p>
    
                            </div>
                        </div>
                        <div className="comment">
                            <div className="comment_index">
                                <h6>Juan Antonio R</h6>
                                <div className="starts">
                                    <h5>15/09/2016</h5>
                                    <div className="starts_comments">
                                        <img src={start} alt="" />
                                        <img src={start} alt="" />
                                        <img src={start} alt="" />
                                        <img src={start} alt="" />
                                        <img src={start} alt="" />
                                    </div>
                                </div>
    
                            </div>
                            <div className="dateComment">
                                <p>
                                    Excelente producto, llego tal como lo esperaba.
    
                                </p>
    
                            </div>
                        </div>
                        <div className="comment">
                            <div className="comment_index">
                                <h6>Juan Antonio R</h6>
                                <div className="starts">
                                    <h5>15/09/2016</h5>
                                    <div className="starts_comments">
                                        <img src={start} alt="" />
                                        <img src={start} alt="" />
                                        <img src={start} alt="" />
                                        <img src={start} alt="" />
                                        <img src={start} alt="" />
                                    </div>
                                </div>
    
                            </div>
                            <div className="dateComment">
                                <p>
                                    Excelente producto, llego tal como lo esperaba.
                                </p>
    
                            </div>
                        </div>
                        <div className="btnMoreOpinions">
                            <a href="#">Ver todas las opiniones</a>
                        </div>
                    </div>
                </div>
                {isScrollModalEnabled && (
                    <div id="scrollModalAddToCart" className="scroll-modal">
                        <div className="scroll-modal-content">
                            {/* <!-- Contenido del modal --> */}
                            {/* <div className="carrito">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor" className="bi bi-cart3 svgCart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                        </div> */}
                            <div className="anadiralcarrito">
    
                                <a href="#" onClick={addToCart}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor" className="bi bi-cart3 svgCart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                    Añadir al carrito
                                </a>
                            </div>
                            <div className="buyNowResponsive">
                                <a href="#" onClick={buyNow}>Comprar ahora</a>
                            </div>
    
                        </div>
                    </div>
                )}
            </div>
            
            </>
        )}
        </div>
    )
}

export default DetailProduct
