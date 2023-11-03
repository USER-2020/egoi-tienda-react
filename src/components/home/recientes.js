import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import "../../styles/recientes.css";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Modal, ModalBody
} from 'reactstrap';
import celRecent from '../../assets/celularReciente.png';
import start from '../../assets/egoi_icons/star-fill.svg';
import startEmpty from '../../assets/egoi_icons/star-fill-gray.svg';
import start_1 from '../../assets/Star-1.png';
import imgCA from '../../assets/celularesAccesorioscyberday.png';
import ps5 from '../../assets/ps5categoria.png';
import tvAV from '../../assets/tvyvideocategoria.png';
import xbox from '../../assets/xboxcategoria.png';
import { ProductosRecientes } from '../../services/productos';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { allCategories, subcategorieById } from '../../services/categories';
import { detailProductById } from '../../services/detailProduct';
import { getProductsByIdBrand } from '../../services/brands';
import AddRecents from './addRecents';
import { addProductsCart, allProductsCart, updateQuantityCart } from '../../services/cart';
import Login from '../../views/user/login';
import Register from '../../views/user/register';
import { getCurrentUser } from '../../helpers/Utils';
import toast, { Toaster } from 'react-hot-toast';


const Recientes = ({ bannersInfo, updateCantProducts, setIsLoggedInPartner, setIsntLoggedInPartner, updateCantProductsWithouthToken, setMinQty }) => {
    const [products, setProducts] = useState([]);

    const containerRef = useRef(null);

    const history = useHistory();
    const currenUser = getCurrentUser();

    /* Flujo de trabajo */
    // const [bannersInfo, setBannersInfo] = useState([]);
    const [offset, setOffset] = useState([]);
    const [bannerFiltro6, setBannerFiltro6] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('');

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
            // setIsLoggedIn(true);
            setIsLoggedInPartner(true);

            // handleLogged(true);
            // console.log("Estas logueado")

        } else {
            // setIsLoggedIn(false);
            setIsntLoggedInPartner(true);
        }

    };



    /* Banner 3 */
    const [tipoFiltro6, setTipoFiltro6] = useState('');
    // const [bannerFiltro6, setBannerFiltro6] = useState('');

    const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";
    const baseUrlImageBanners = "https://egoi.xyz/storage/app/public/banner/";

    const ProductosRecientesVistas = () => {
        ProductosRecientes()
            .then((res) => {
                setProducts(res.data.products);
                // console.log("vistos recientementes", products);


            })
            .catch((err) => console.log(err));
    };

    const getAllCategoriesByBanner = (bannersInfo) => {
        if (bannersInfo) {
            const filteredBanners = bannersInfo.filter((banner) => banner.banner_type === "banner_6");
            filteredBanners.map((banner) => {
                banner.banner_data.map((bannerData) => {
                    if (bannerData.tipo_filtro === "category") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro6(bannerData.id_filtro);
                        subcategorieById(bannerData.id_filtro, offset, bannerData.id_tag)
                            .then((res) => {
                                // console.log("Informacion de banner 6 category", res.data);
                                // console.log("Datos de etiquedtado 6", res.data);
                                // setSubcategory(res.data.products);
                                // history.push(`/categories/products/filter/${bannerData.id_filtro}`);
                            })
                            .catch((err) => console.log(err));
                    }
                    if (bannerData.tipo_filtro === "product") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro6(bannerData.id_filtro);
                        detailProductById(bannerData.id_filtro, bannerData.id_tag)
                            .then((res) => {
                                // console.log('Detalle del producto del banner 6 product ', res.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }

                    if (bannerData.tipo_filtro === "brand") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro6(bannerData.id_filtro);
                        getProductsByIdBrand(bannerData.id_filtro, bannerData.id_tag)
                            .then((res) => {
                                // console.log('Detalle del producto por marca desde el banner 6', res.data);
                            })
                            .catch((err) => console.log(err));
                    }


                    if (bannerData.tipo_filtro === "shop") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro6(bannerData.id_filtro);

                    }

                });
            });
        }

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

        // Almacena la lista actualizada es el almacenamiento local
        localStorage.setItem('recentlyViewed', JSON.stringify(limitedList));
    }

    // Paso 1: Obtener productos de localStorage
    const storedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    // Paso 2: Crear un conjunto para almacenar ids únicos
    const uniqueIds = new Set();

    // Paso 3: Iterar a través de los productos y agregar sus ids al conjunto
    const filteredProducts = storedProducts.filter(product => {
        if (!uniqueIds.has(product.id)) {
            uniqueIds.add(product.id);
            return true; // Mantener este producto es la lista final
        }
        return false; // Descartar productos duplicados
    });

    // Paso 4: Convertir el conjunto es un array de ids únicos
    const uniqueIdsArray = Array.from(uniqueIds);

    // Paso 5: Crear un nuevo array de productos filtrados basados es los ids únicos
    const uniqueProducts = uniqueIdsArray.map(id => {
        return filteredProducts.find(product => product.id === id);
    });

    // Ahora `uniqueProducts` contiene los productos filtrados sin duplicados por id


    const showRutes = (itemId, filtro, tag, subcate, subsubcate) => {
        console.log("este el id elegido para pasar por rutas", itemId);
        if (filtro === 'category') {
            if (tag !== '' && subcate !== '' && subsubcate !== []) {
                // Todas las variables tienen valores, construir la URL con todas ellas
                const subsubcateStr = JSON.stringify(subsubcate);
                console.log("Entré es la primera validación de subcategorías, subsubcategorías e idTag");
                history.push(`/categories/products/Precios%20especiales/${itemId}/${tag}/${encodeURIComponent(subcate)}/${encodeURIComponent(subsubcateStr)}`);
            } else if (subcate !== '' && subsubcate !== []) {
                // idtag está vacío, pero subcate y subsubcate tienen valores, construir la URL sin idtag
                const subsubcateStr = JSON.stringify(subsubcate);
                console.log("Entré es la segunda validación cuando idTag es vacío");
                history.push(`/categories/products/Precios%20especiales/${itemId}/${encodeURIComponent(subcate)}/${encodeURIComponent(subsubcateStr)}`);
            } else if (tag !== '') {
                // idtag tiene valor, pero subcate y subsubcate están vacíos, construir la URL solo con idtag
                console.log("Entré es la tercera validación es donde solo se manda es la ruta idTag");
                history.push(`/categories/products/Precios%20especiales/${itemId}/${tag}`);
            } else {
                console.log("Entré es la tercera validación es donde solo se manda es la ruta idTag");
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

    //Add To Cart
    const token = currenUser ? currenUser.token : null; // Manejo de seguridad es caso de que currenUser sea null
    const addToCart = (product) => {
        console.log("Producto agregado al carrito");
        console.log("estos son los valores enviados desde el producto", [
            product.id, product.name, product.discount_tag_valor, product.unit_price, product.discount_valor, product.brand_id
        ]);
        if (currenUser) {
            // setModalViewCart(true);
            allProductsCart(token)
                .then((res) => {
                    let idProductWithFilter = res.data.filter(prod => prod.product_id === product.id);
                    console.log(idProductWithFilter);
                    if (idProductWithFilter.length > 0) {
                        idProductWithFilter.map((product) => {
                            console.log(product.id)
                            console.log(product.customer_id)
                            console.log(quantity)
                            let quantityChangue = product.quantity;
                            // console.log(quantityChangue);
                            updateQuantityCart(quantityChangue +1 , product.id, token)
                                .then((res) => {
                                    // console.log(quantityChangue);
                                    updateCantProducts();
                                    setIsLoggedInPartner(true);
                                    toast.success('Producto agregado con éxito!');
                                }).catch((err)=>console.log(err));
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
                            setMinQty();
                            /* eslint-enable */

                        })
                    } else {

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
                                setMinQty();
                                /* eslint-enable */
                                // console.log("Producto enviado", res.data);
                                // console.log(token);
                            })
                            .catch((err) => console.log(err));
                    }
                }).catch((err) => console.log(err));
            // console.log("producto agregado");
            // console.log(token);
        } else {


            // Obtener el carrito actual del localStorage (si existe)
            let productsCart = JSON.parse(localStorage.getItem('productsCart')) || {};

            // // Agregar el nuevo producto al carrito actual
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
        ProductosRecientesVistas();
        if (bannersInfo) {
            // console.log("encontre El flujo ")
            const firstCarouselNextButton = document.getElementById('nextButton');

            // Si se encuentra el botón, haz clic en él y marca el botón como activado
            if (firstCarouselNextButton) {
                firstCarouselNextButton.click();
                // setNextButtonActivated(true);
            }
        }

        // console.log("Desde el modal del banner de recientes ", bannersInfo);
    }, [bannersInfo]);

    // useEffect(() => {
    //     handleLogin();
    // }, [currenUser])


    return (
        <>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div className="container">
                <div className="containerRecents">
                    {uniqueProducts && uniqueProducts.length > 0 ? (

                        <div className='spanRecent'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3911 11.3494C9.98137 12.3774 8.79326 13.6705 7.95955 14.7069C7.28956 15.5398 7.2001 15.7026 7.2001 16C7.2001 16.2974 7.28956 16.4602 7.95955 17.2931C8.79326 18.3295 9.98137 19.6226 11.3911 20.6506C12.8064 21.6826 14.3794 22.4 16.0001 22.4C17.6208 22.4 19.1938 21.6826 20.6091 20.6506C22.0188 19.6226 23.2069 18.3295 24.0406 17.2931C24.7106 16.4602 24.8001 16.2974 24.8001 16C24.8001 15.7026 24.7106 15.5398 24.0406 14.7069C23.2069 13.6705 22.0188 12.3774 20.6091 11.3494C19.1938 10.3174 17.6208 9.6 16.0001 9.6C14.3794 9.6 12.8064 10.3174 11.3911 11.3494ZM10.4484 10.0567C12.0085 8.91905 13.9097 8 16.0001 8C18.0904 8 19.9917 8.91905 21.5518 10.0567C23.1173 11.1983 24.4056 12.6079 25.2873 13.704C25.3154 13.739 25.3434 13.7736 25.3713 13.8081C25.9162 14.4832 26.4001 15.0826 26.4001 16C26.4001 16.9174 25.9162 17.5168 25.3713 18.1919C25.3434 18.2264 25.3154 18.261 25.2873 18.296C24.4056 19.3921 23.1173 20.8017 21.5518 21.9434C19.9917 23.0809 18.0904 24 16.0001 24C13.9097 24 12.0085 23.0809 10.4484 21.9434C8.88288 20.8017 7.59459 19.3921 6.71286 18.296C6.68476 18.261 6.65676 18.2264 6.62892 18.1919C6.08401 17.5168 5.6001 16.9174 5.6001 16C5.6001 15.0826 6.08401 14.4832 6.62892 13.8081C6.65676 13.7736 6.68476 13.739 6.71286 13.704C7.59459 12.6079 8.88288 11.1983 10.4484 10.0567ZM16.0001 14.1C14.9357 14.1 14.082 14.9557 14.082 16C14.082 17.0443 14.9357 17.9 16.0001 17.9C17.0645 17.9 17.9182 17.0443 17.9182 16C17.9182 14.9557 17.0645 14.1 16.0001 14.1ZM12.482 16C12.482 14.062 14.0622 12.5 16.0001 12.5C17.938 12.5 19.5182 14.062 19.5182 16C19.5182 17.938 17.938 19.5 16.0001 19.5C14.0622 19.5 12.482 17.938 12.482 16Z" fill="#171523" />
                            </svg>
                            <h4>Visto recientemente</h4>
                            <Link to='/recentlySeen'>
                                <a href='#' className='refshowAll'>
                                    Ver todos
                                </a>
                            </Link>
                        </div>
                    ) : (null)}
                    <div className={uniqueProducts.length > 0 ? 'containerProductos1' : 'containerProductos2'} ref={containerRef}>
                        {((uniqueProducts && uniqueProducts.length >= 5)) && (
                            <button className="scroll-button left" onClick={handleScrollLeft} onMouseOver={handleScrollLeft}>
                                &#8249;
                            </button>
                        )}
                        {uniqueProducts.length > 0 ? (
                            <div className="cardContainer">
                                {uniqueProducts.map((product, index) => (
                                    <a href='#' className='containerCard' key={index}>
                                        <Card className='cardProducto1' style={{ height: "380px" }}>
                                            <Link to={`/detailsProduct/${product.id}/${product.slug}`} onClick={() => agregarProductoVisto(product)}>
                                                {product.current_stock <= 0 && (
                                                    <span className="agotadoTag">Agotado</span>
                                                )}
                                                <CardImg top width="80%" src={baseUrlImage + product.images[0]} alt={product.name} />
                                                <CardBody>
                                                    <div className='starts'>
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
                                                    zIndex: '999',
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
                        ) : (null)}

                        {uniqueProducts.length >= 5 ? (
                            <button className="scroll-button right" onClick={handleScrollRight} onMouseOver={handleScrollRight}>
                                &#8250;
                            </button>

                        ) : (null
                        )}

                    </div>
                    <AddRecents updateCantProducts={updateCantProducts} setIsLoggedInPartner={setIsLoggedInPartner} setIsntLoggedInPartner={setIsntLoggedInPartner} updateCantProductsWithouthToken={updateCantProductsWithouthToken} setMinQty={setMinQty} />


                    {/* ---------------------CAROUSEL RESPONSIVE----------------------------  */}
                    {bannersInfo &&
                        bannersInfo
                            .filter((banner) => banner.banner_type === "banner_3")
                            .map((itemBanner, index) => (
                                <div key={index}>


                                    <div
                                        id={`carouselExample-${index}`}
                                        className="carousel slide carousel_responsive"
                                        data-bs-ride="carousel"
                                        data-bs-interval="3000"
                                    >
                                        <div className="carousel-inner">
                                            {itemBanner.banner_data.map((banner, i) => (
                                                <div
                                                    key={i}
                                                    className={`carousel-item ${i === 0 ? "active" : ""}`}
                                                >
                                                    {/* Contenido del item del carousel */}
                                                    <div className="tavtImage">
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                showRutes(banner.id_filtro, banner.tipo_filtro, banner.id_tag, banner.ids_filtro_sub, banner.ids_filtro_s_sub)
                                                            }
                                                            }
                                                        >
                                                            <img
                                                                src={baseUrlImageBanners + banner.imagen}
                                                                alt={banner.imagen}
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            className="carousel-control-prev"
                                            type="button"
                                            data-bs-target={`#carouselExample-${index}`}
                                            data-bs-slide="prev"
                                        >
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button
                                            className="carousel-control-next"
                                            type="button"
                                            data-bs-target={`#carouselExample-${index}`}
                                            data-bs-slide="next"
                                            id='nextButton'
                                        >
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                        <ol className="carousel-indicators">
                                            {itemBanner.banner_data.map((_, i) => (
                                                <li
                                                    key={i}
                                                    data-bs-target={`#carouselExample-${index}`}
                                                    data-bs-slide-to={i}
                                                    className={`indicator ${i === 0 ? "active" : ""}`}
                                                ></li>
                                            ))}
                                        </ol>
                                    </div>

                                </div>
                            ))}



                    {/* -------------------------------------------------- */}
                    <div className='containerflyers'>
                        {bannersInfo && bannersInfo
                            .filter((banner) => banner.banner_type === "banner_3")
                            .map((itemBanner, index) => (
                                <div className='flyers'>
                                    <div className='containerFlex'>

                                        <div className='celularesAccesorios' key={index === 0}>

                                            {/* <div className='catText'>
                                                    <div>
                                                        CyberDays
                                                    </div>

                                                    <div>
                                                        <h2>Hasta 50% descuento es</h2>
                                                        <h1>Celulares y Accesorios</h1>
                                                    </div>
                                                    <a href="#">Ver categoría</a>
                                                </div> */}
                                            <div className='catImage'>
                                                <a href='#' onClick={(e) => { e.preventDefault(); showRutes(itemBanner.banner_data[0].id_filtro, itemBanner.banner_data[0].tipo_filtro, itemBanner.banner_data[0].id_tag, itemBanner.banner_data[0].ids_filtro_sub, itemBanner.banner_data[0].ids_filtro_s_sub) }}>
                                                    < img src={baseUrlImageBanners + itemBanner.banner_data[0].imagen_desk} alt={itemBanner.banner_data[0].imagen} width={438} height={260} />
                                                </a>
                                            </div>

                                        </div>
                                        <div className='consolasVideojuegos' key={index === 1}>

                                            {/* <div className='cvtText'>
                                                    <div>
                                                        CyberDays
                                                    </div>
                                                    <div>
                                                        <h2>Hasta 20% descuento es</h2>
                                                        <h1>Consolas y Videojuegos</h1>
                                                    </div>
                                                    <a href="#">Ver categoría</a>
                                                </div> */}
                                            <div className='cvtImage'>
                                                <a href='#' onClick={(e) => { e.preventDefault(); showRutes(itemBanner.banner_data[1].id_filtro, itemBanner.banner_data[1].tipo_filtro, itemBanner.banner_data[1].id_tag, itemBanner.banner_data[1].ids_filtro_sub, itemBanner.banner_data[1].ids_filtro_s_sub) }}>
                                                    < img src={baseUrlImageBanners + itemBanner.banner_data[1].imagen_desk} alt={itemBanner.banner_data[1].imagen_desk} height={260} />
                                                </a>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='containerFlex'>
                                        <div className='tvAudioVideo' key={index === 2}>

                                            {/* <div className='tavtText'>
                                                    <div>
                                                        CyberDays
                                                    </div>
                                                    <div>
                                                        <h2>Hasta 40% descuento es</h2>
                                                        <h1>TV, Audio y Vídeo</h1>
                                                    </div>
                                                    <a href="#">Ver categoría</a>
                                                </div> */}
                                            <div className='tavtImage'>
                                                <a href='#' onClick={(e) => { e.preventDefault(); showRutes(itemBanner.banner_data[2].id_filtro, itemBanner.banner_data[2].tipo_filtro, itemBanner.banner_data[2].id_tag, itemBanner.banner_data[2].ids_filtro_sub, itemBanner.banner_data[0].ids_filtro_s_sub) }}>
                                                    < img src={baseUrlImageBanners + itemBanner.banner_data[2].imagen_desk} alt={itemBanner.banner_data[2].imagen_desk} width={900} height={260} />
                                                </a>
                                            </div>

                                        </div>
                                        <div className='consolasVideojuegos2' key={index === 3}>

                                            {/* <div className='cvt2Text'>
                                                    <div>
                                                        CyberDays
                                                    </div>
                                                    <div>
                                                        <h2>Hasta 20% descuento es</h2>
                                                        <h1>Consolas y Videojuegos</h1>
                                                    </div>
                                                    <a href="#">Ver categoría</a>
                                                </div> */}
                                            <div className='cvt2Image'>
                                                <a href='#' onClick={(e) => { e.preventDefault(); showRutes(itemBanner.banner_data[3].id_filtro, itemBanner.banner_data[3].tipo_filtro, itemBanner.banner_data[3].id_tag, itemBanner.banner_data[3].ids_filtro_sub, itemBanner.banner_data[3].ids_filtro_s_sub) }}>
                                                    <img src={baseUrlImageBanners + itemBanner.banner_data[3].imagen_desk} alt={itemBanner.banner_data[3].imagen_desk} width={438} height={260} />
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
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

export default Recientes
