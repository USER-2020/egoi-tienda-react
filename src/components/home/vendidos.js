import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, ModalBody
} from 'reactstrap';
import '../../styles/vendidos.css';
import celRecent from '../../assets/celularReciente.png';
import start from '../../assets/egoi_icons/star-fill.svg';
import startEmpty from '../../assets/egoi_icons/star-fill-gray.svg';
import celSamsung from '../../assets/celularSamsung.png';
import logoSamsung from '../../assets/samsungPNG.png';
import logoSony from '../../assets/sonyPNG.png';
import cascoSony from '../../assets/cascosSONY.png';
import logoHaceb from '../../assets/hacebPNG.png';
import electroHaceb from '../../assets/electrodomesticosHACEB.png';
import logoAsus from '../../assets/asusPNG.png';
import pcASUS from '../../assets/pcASUS.png';
import { ProductosMasVendidos } from "../../services/productos";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getCurrentUser } from "../../helpers/Utils";
import { addProductsCart } from "../../services/cart";
import { Modal } from 'reactstrap';
import Login from "../../views/user/login";
import Register from "../../views/user/register";
import toast, { Toaster } from 'react-hot-toast';


const Vendidos = ({ bannersInfo, setIsLoggedInPartner, updateCantProducts, setIsntLoggedInPartner, updateCantProductsWithouthToken, setMinQty }) => {

    const [productos, setProductos] = useState([]);

    const history = useHistory();
    const currenUser = getCurrentUser();

    const containerRef = useRef(null);
    const containerRef2 = useRef(null);

    const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";
    const baseUrlImageBanners = "https://egoi.xyz/storage/app/public/banner/";

    /* Modales */
    const [modalViewRegistro, setModalViewRegistro] = useState(false);
    const [modalViewLogin, setModalViewLogin] = useState(false);
    const [changeFormLogin, setChangeFormLogin] = useState(false);
    const [changeFormRegister, setChangeFormRegister] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const closeModalRegistro = () => {
        setModalViewRegistro(false);
    };

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

    const handleLogin = () => {
        // Code to handle user login, such as storing session storage, etc.
        if (currenUser) {
            setIsLoggedIn(true);
            setIsLoggedInPartner(true);
            // handleLogged(true);
            // console.log("Estas logueado")

        } else {
            setIsLoggedIn(false);
        }

    };

    const ProductosMasVendido = () => {
        ProductosMasVendidos()
            .then((res) => {
                setProductos(res.data.products);
                // console.log("mas vendidos", productos);
            })
            .catch((err) => console.log(err));

        // setProductos(productos);

    };

    const handleScrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= 500; // Ajusta el valor según tus necesidades
        }
        const leftButton = document.querySelector('.scroll-button.left');
        leftButton.classList.add('animate-left');
        setTimeout(() => {
            leftButton.classList.remove('animate-left');
        }, 300);
    };

    const handleScrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += 500; // Ajusta el valor según tus necesidades
        }
        const rightButton = document.querySelector('.scroll-button.right');
        rightButton.classList.add('animate-right');
        setTimeout(() => {
            rightButton.classList.remove('animate-right');
        }, 300);
    };

    const handleScrollLeft2 = () => {
        if (containerRef2.current) {
            containerRef2.current.scrollLeft -= 322; // Ajusta el valor según tus necesidades
        }
        const leftButton = document.querySelector('.scroll-button.left');
        leftButton.classList.add('animate-left');
        setTimeout(() => {
            leftButton.classList.remove('animate-left');
        }, 300);
    };

    const handleScrollRight2 = () => {
        if (containerRef2.current) {
            containerRef2.current.scrollLeft += 322; // Ajusta el valor según tus necesidades
        }
        const rightButton = document.querySelector('.scroll-button.right');
        rightButton.classList.add('animate-right');
        setTimeout(() => {
            rightButton.classList.remove('animate-right');
        }, 300);
    };

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

    const showRutes = (itemId, filtro, tag, subcate, subsubcate) => {
        console.log("este el id elegido para pasar por rutas", itemId);
        if (filtro === 'category') {
            if (tag !== '' && subcate !== '' && subsubcate !== []) {
                // Todas las variables tienen valores, construir la URL con todas ellas
                const subsubcateStr = JSON.stringify(subsubcate);
                console.log("Entré en la primera validación de subcategorías, subsubcategorías e idTag");
                history.push(`/categories/products/Precios%20especiales/${itemId}/${tag}/${encodeURIComponent(subcate)}/${encodeURIComponent(subsubcateStr)}`);
            } else if (subcate !== '' && subsubcate !== []) {
                // idtag está vacío, pero subcate y subsubcate tienen valores, construir la URL sin idtag
                const subsubcateStr = JSON.stringify(subsubcate);
                console.log("Entré en la segunda validación cuando idTag es vacío");
                history.push(`/categories/products/Precios%20especiales/${itemId}/${encodeURIComponent(subcate)}/${encodeURIComponent(subsubcateStr)}`);
            } else if (tag !== '') {
                // idtag tiene valor, pero subcate y subsubcate están vacíos, construir la URL solo con idtag
                console.log("Entré en la tercera validación en donde solo se manda en la ruta idTag");
                history.push(`/categories/products/Precios%20especiales/${itemId}/${tag}`);
            } else {
                console.log("Entré en la tercera validación en donde solo se manda en la ruta idTag");
                history.push(`/categories/products/Precios%20especiales/${itemId}/${tag}`);
            }
        }



        if (filtro === 'product') {
            history.push(`/detailsProduct/${itemId}/slug/${tag}`);
        }
        if (filtro === 'brand') {
            history.push(`/brand/Descuento/${itemId}/${tag}`);
        }

    }

    const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currenUser sea null
    const addToCart = (product) => {
        console.log("Producto agregado al carrito");
        console.log("estos son los valores enviados desde el producto", [
            product.id, product.name, product.discount_tag_valor, product.unit_price, product.discount_valor, product.brand_id
        ]);
        if (currenUser) {
            // setModalViewCart(true);
            addProductsCart(product.id, quantity, token)
                .then(() => {
                    updateCantProducts();
                    setIsLoggedInPartner(true);
                    toast.success('Producto agregado con éxito!');
                    let discount = 0;
                    if (product.discount_valor > 0) {
                        discount = product.unit_price - product.discount_valor;
                    }
                    if (product.discount_tag_valor > 0) {
                        discount = product.discount_tag_valor;
                    }
                    if (product.discount_valor === 0 && product.discount_tag_valor === 0) {
                        discount = 0;
                    }
                    /* eslint-disable */
                    gtag('event', 'add_to_cart', {
                        currency: 'USD',
                        items: [{
                            item_id: product.id,
                            item_name: product.name,
                            coupon: '',
                            discount: discount,
                            affiliation: 'Egoi',
                            item_brand: product.brand_id,
                            item_category: '',
                            item_variant: '',
                            price: product.unit_price,
                            currency: 'COP',
                            quantity: quantity
                        }],
                        value: product.unit_price
                    });
                    /* eslint-enable */
                    // console.log("Producto enviado", res.data);
                    // console.log(token);
                })
                .catch((err) => console.log(err));
            // console.log("producto agregado");
            // console.log(token);
        } else {


            // Obtener el carrito actual del localStorage (si existe)
            let productsCart = JSON.parse(localStorage.getItem('productsCart')) || {};

            // Agregar el nuevo producto al carrito actual
            // productsCart[product.id] = product;
            if (productsCart[product.id]) {
                // El producto ya existe en el carrito, así que aumenta su cantidad (min_qty) en 1
                productsCart[product.id].min_qty += 1;
                setMinQty();
            } else {
                // El producto no existe en el carrito, así que agrégalo con cantidad 1
                product.min_qty = 1;
                productsCart[product.id] = product;
                setMinQty();
            }

            // Convertir el carrito actualizado a una cadena JSON y guardarlo en el localStorage
            localStorage.setItem('productsCart', JSON.stringify(productsCart));
            setIsntLoggedInPartner(false);
            updateCantProductsWithouthToken();
            toast.success('Producto agregado con éxito!');

            let discount = 0;
            if (product.discount_valor > 0) {
                discount = product.unit_price - product.discount_valor;
            }
            if (product.discount_tag_valor > 0) {
                discount = product.discount_tag_valor;
            }
            if (product.discount_valor === 0 && product.discount_tag_valor === 0) {
                discount = 0;
            }
            /* eslint-disable */
            gtag('event', 'add_to_cart', {
                currency: 'USD',
                items: [{
                    item_id: product.id,
                    item_name: product.name,
                    coupon: '',
                    discount: discount,
                    affiliation: 'Egoi',
                    item_brand: product.brand_id,
                    item_category: '',
                    item_variant: '',
                    price: product.unit_price,
                    currency: 'COP',
                    quantity: quantity
                }],
                value: product.unit_price
            });
            /* eslint-enable */


        }

    }

    useEffect(() => {
        ProductosMasVendido();
    }, []);

    // useEffect(() => { handleLogin() }, [isLoggedIn])


    return (
        <>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div className='container'>
                <div className='containerVendidos'>
                    <div className='spanRecent'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16977 8.31899C9.38258 5.76021 13.0251 5.76021 15.2379 8.31899L15.9999 9.20013L16.7619 8.31899C18.9747 5.76021 22.6172 5.76021 24.83 8.31899C26.6657 10.4417 26.9852 13.7669 25.2901 16.1259C24.545 17.1629 23.6408 18.3392 22.6001 19.5426C21.0155 21.3749 19.5019 22.8434 18.3834 23.8548C17.8238 24.3608 17.3622 24.7532 17.0389 25.0203C16.8773 25.1539 16.7501 25.2562 16.6625 25.3258C16.6187 25.3606 16.5848 25.3872 16.5613 25.4055L16.5342 25.4266L16.5266 25.4324L16.5237 25.4347C16.5236 25.4347 16.5232 25.435 16.0368 24.7999C15.5582 25.441 15.5581 25.4409 15.558 25.4408L15.5547 25.4383L15.5469 25.4325L15.519 25.4113C15.4949 25.393 15.4601 25.3664 15.4152 25.3315C15.3253 25.2618 15.1951 25.1594 15.0297 25.0257C14.699 24.7584 14.2276 24.3657 13.6582 23.8592C12.5201 22.8471 10.9862 21.3771 9.3997 19.5426C8.35898 18.3392 7.45476 17.1629 6.70966 16.1259C5.01456 13.7669 5.33408 10.4417 7.16977 8.31899ZM16.0368 24.7999L15.558 25.4408L16.043 25.8028L16.5237 25.4347L16.0368 24.7999ZM16.0309 23.7777C16.3373 23.5243 16.7765 23.1507 17.3103 22.6681C18.3915 21.6904 19.8569 20.2686 21.3898 18.496C22.3938 17.3351 23.2684 16.1976 23.9908 15.1923C25.2159 13.4873 25.0151 10.9791 23.6198 9.36558C22.0451 7.54468 19.5468 7.54468 17.9721 9.36558L15.9999 11.6462L14.0277 9.36558C12.453 7.54468 9.9547 7.54468 8.38 9.36558C6.98464 10.9791 6.78389 13.4873 8.009 15.1923C8.73136 16.1976 9.60598 17.3351 10.6099 18.496C12.1409 20.2664 13.623 21.6867 14.7215 22.6636C15.2676 23.1493 15.7179 23.5245 16.0309 23.7777Z" fill="black" />
                        </svg>
                        <h4>Los más vendidos</h4>
                        <Link to='/bestSellers'>
                            <a href='#' className='refshowAll'>
                                Ver todos
                            </a>
                        </Link>
                    </div>
                    <div className='containerProductos' ref={containerRef}>
                        <button className="scroll-button left" onClick={handleScrollLeft} onMouseOver={handleScrollLeft}>
                            &#8249;
                        </button>
                        <div className="cardContainer">
                            {productos.map((product, index) => (

                                <a href="#" className="containerCard2" key={index}>
                                    <Card className="cardProducto1" style={{ height: "380px" }}>
                                        <Link to={`/detailsProduct/${product.id}/${product.slug}`} onClick={() => agregarProductoVisto(product)}>
                                            {product.current_stock <= 0 && (
                                                <span className="agotadoTag">Agotado</span>
                                            )}
                                            <CardImg top width="80%" src={baseUrlImage + product.images[0]} alt={product.name} />
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
                                                {product.unit_price >= 79990 || product.discount_valor >= 79900 || product.dicount_tag_valor >= 79900 ? (
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
                                                    {product.name.length < 30 ? product.name : product.name.slice(0, 30) + '...'}
                                                </CardSubtitle>
                                                <CardTitle tag="h5">
                                                    {product.discount_tag_valor > 0 || product.discount_valor > 0 ? (
                                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignSelf: 'center' }}>
                                                            <h5>${product.discount_valor && product.discount_valor.toLocaleString('es') || product.discount_tag_valor && product.discount_tag_valor.toLocaleString('es')}</h5>
                                                            <h5 id='tachado'><s>${product.unit_price && product.unit_price.toLocaleString('es')}</s></h5>
                                                        </div>

                                                    ) : (
                                                        <h5>${product.unit_price && product.unit_price.toLocaleString('es')}</h5>
                                                    )}
                                                </CardTitle>

                                            </CardBody>
                                        </Link>
                                        <Button
                                            onClick={(e) => { e.preventDefault(); addToCart(product) }}
                                            style={{
                                                position: "absolute",
                                                bottom: "15px", // Ajusta esto según tu preferencia
                                                margin: "0 auto", // Centra horizontalmente el botón
                                                left: "0",
                                                right: "0",
                                                backgroundColor: '#FC5241',
                                                border: 'none',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                height: 'auto',
                                                alignItems: 'center',
                                                width: '80%',
                                                justifyContent: 'space-around'
                                            }}
                                        >
                                            <p style={{ marginBottom: '0' }}>Añadir al carrito</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                            </svg>
                                        </Button>
                                    </Card>
                                </a>
                            ))}
                        </div>
                        <button className="scroll-button right" onClick={handleScrollRight} onMouseOver={handleScrollRight}>
                            &#8250;
                        </button>

                    </div>
                    <div className="cardContainerHot" >
                        <button className="scroll-button left" onClick={handleScrollLeft2} onMouseOver={handleScrollLeft2}>
                            &#8249;
                        </button>
                        {bannersInfo && bannersInfo
                            .filter((banner) => banner.banner_type === "banner_5")
                            .map((itemBanner, index) => (
                                <div className='containerHot' ref={containerRef2}>
                                    <a href="#" onClick={(e) => { e.preventDefault(); showRutes(itemBanner.banner_data[0].id_filtro, itemBanner.banner_data[0].tipo_filtro, itemBanner.banner_data[0].id_tag, itemBanner.banner_data[0].ids_filtro_sub, itemBanner.banner_data[0].ids_filtro_s_sub) }}>
                                        <div className='masVendidosCards' key={index === 0}>
                                            {/* <div className='headerImg'>
                                            <img src={logoSamsung} width={'200px'} />
                                        </div> */}

                                            <img src={baseUrlImageBanners + itemBanner.banner_data[0].imagen} width={'100%'} alt={itemBanner.banner_data[0].imagen} />

                                            {/* <a href='#' className='btnVendidos'>
                                            Ver Tienda
                                        </a>
                                        <div className='footerSpanText'>
                                            <span className='spanText1'>
                                                Hasta
                                            </span>
                                            <span className='spanText2'>
                                                50% Descuento
                                            </span>
                                        </div> */}
                                        </div>
                                    </a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); showRutes(itemBanner.banner_data[1].id_filtro, itemBanner.banner_data[1].tipo_filtro, itemBanner.banner_data[1].id_tag, itemBanner.banner_data[1].ids_filtro_sub, itemBanner.banner_data[1].ids_filtro_s_sub) }}>
                                        <div className='masVendidosCards' key={index === 1}>
                                            {/* <div className='headerImg'>
                                            <img src={logoSony} width={'200px'} />
                                        </div> */}

                                            <img src={baseUrlImageBanners + itemBanner.banner_data[1].imagen} width={'100%'} alt={itemBanner.banner_data[1].imagen} />

                                            {/* <a href='#' className='btnVendidos'>
                                            Ver Tienda
                                        </a>
                                        <div className='footerSpanText'>
                                            <span className='spanText1'>
                                                Hasta
                                            </span>
                                            <span className='spanText2'>
                                                50% Descuento
                                            </span>
                                        </div> */}
                                        </div>
                                    </a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); showRutes(itemBanner.banner_data[2].id_filtro, itemBanner.banner_data[2].tipo_filtro, itemBanner.banner_data[2].id_tag, itemBanner.banner_data[2].ids_filtro_sub, itemBanner.banner_data[2].ids_filtro_s_sub) }}>
                                        <div className='masVendidosCards' key={index === 2}>
                                            {/* <div className='headerImg'>
                                            <img src={logoHaceb} width={'200px'} />
                                        </div> */}

                                            <img src={baseUrlImageBanners + itemBanner.banner_data[2].imagen} width={'100%'} alt={itemBanner.banner_data[2].imagen} />

                                            {/* <a href='#' className='btnVendidos'>
                                            Ver Tienda
                                        </a>
                                        <div className='footerSpanText'>
                                            <span className='spanText1'>
                                                Hasta
                                            </span>
                                            <span className='spanText2'>
                                                50% Descuento
                                            </span>
                                        </div> */}
                                        </div>
                                    </a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); showRutes(itemBanner.banner_data[3].id_filtro, itemBanner.banner_data[3].tipo_filtro, itemBanner.banner_data[3].id_tag, itemBanner.banner_data[3].ids_filtro_sub, itemBanner.banner_data[3].ids_filtro_s_sub) }}>
                                        <div className='masVendidosCards' key={index === 3}>
                                            {/* <div className='headerImg'>
                                            <img src={logoAsus} width={'200px'} />
                                        </div> */}

                                            <img src={baseUrlImageBanners + itemBanner.banner_data[3].imagen} width={'100%'} alt={itemBanner.banner_data[3].imagen} />

                                            {/* <a href='#' className='btnVendidos'>
                                            Ver Tienda
                                        </a>
                                        <div className='footerSpanText'>
                                            <span className='spanText1'>
                                                Hasta
                                            </span>
                                            <span className='spanText2'>
                                                50% Descuento
                                            </span>
                                        </div> */}
                                        </div>
                                    </a>
                                </div>
                            ))}
                        <button className="scroll-button right" onClick={handleScrollRight2} onMouseOver={handleScrollRight2}>
                            &#8250;
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                className="modal-dialog-centered modal-md"
                toggle={() => setModalViewLogin(false)}
                isOpen={modalViewLogin && !changeFormLogin}
            // onOpened={() => setIsScrollModalEnabled(false)}
            // onClosed={() => setIsScrollModalEnabled(true)}
            >
                <ModalBody>
                    <Login closeModalLogin={closeModalLogin} handleLogin={handleLogin} closeModalRegistro={closeModalRegistro} handleChangeFormLogin={handleChangeFormLogin} changeFormRegister={changeFormRegister} />
                </ModalBody>
            </Modal>
            <Modal
                className="modal-dialog-centered modal-md"
                toggle={() => setModalViewRegistro(false)}
                isOpen={modalViewRegistro && !changeFormRegister}
            // onOpened={() => setIsScrollModalEnabled(false)}
            // onClosed={() => setIsScrollModalEnabled(true)}
            >
                <ModalBody>
                    <Register closeModalRegistro={closeModalRegistro} handleChangeFormRegister={handleChangeFormRegister} />
                </ModalBody>
            </Modal>
        </>
    )
}

export default Vendidos
