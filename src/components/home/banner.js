import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Button
} from 'reactstrap';
// import styled from 'styled-components';
import "../../styles/banner.css";
import banner_resp from '../../assets/banner_responsive_1.png';
import banner_1 from '../../assets/banner_1.png';
import banner_2 from '../../assets/banner_2.png';
import celularCategoria from '../../assets/celularCategoria.png';
import arrow from '../../assets/arrow.png';
import TV from '../../assets/Full-HD-LED-TV-PNG-Image.png';
import mac from '../../assets/Macbook-No-Background-Clip-Art.png';
import ps5 from '../../assets/ps5.png';
import { getBanners } from '../../services/banners';
import { useEffect } from 'react';
import { allCategories, subcategorieById } from '../../services/categories';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { detailProductById } from '../../services/detailProduct';
import { getProductsByIdBrand } from '../../services/brands';

const Banner = (args) => {

    const history = useHistory();

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    /* Flujo de trabajo */
    const [bannersInfo, setBannersInfo] = useState([]);
    const [offset, setOffset] = useState([]);
    const [bannerFiltro1, setBannerFiltro1] = useState('');
    const [bannerSubcategory, setBannerSubcategory] = useState('');
    const [bannerSubsubCategory, setBannerSubsubCategory] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState('');


    /* Banner 2 */
    const [tipoFiltro2, setTipoFiltro2] = useState('');
    const [bannerFiltro2, setBannerFiltro2] = useState('');
    const [nextButtonActivated, setNextButtonActivated] = useState(false);

    const [tag, setTag] = useState("");


    const baseUrlImageBanners = "https://egoi.xyz/storage/app/public/banner/";

    const next = () => {
        if (animating) return;
        const filteredBanners = bannersInfo.filter((item) => item.banner_type === "banner_2");
        const nextIndex = activeIndex === filteredBanners.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }


    const previous = () => {
        if (animating) return;
        const filteredBanners = bannersInfo.filter((item) => item.banner_type === "banner_2");
        const nextIndex = activeIndex === 0 ? filteredBanners.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }



    const getAllBanners = () => {
        getBanners()
            .then((res) => {
                console.log(res.data);
                // console.log(res.data[0]);
                // console.log(res.data[1]);
                // console.log(res.data[2]);
                setBannersInfo(res.data);
                getAllCategoriesByBanner(res.data);
                setNextButtonActivated(true);
                const firstCarouselNextButton = document.getElementById('nextButton');

                // Si se encuentra el botón, haz clic en él y marca el botón como activado
                if (firstCarouselNextButton) {
                    firstCarouselNextButton.click();
                    // setNextButtonActivated(true);
                }

                // getInfoByBanner2(res.data);
            }).catch((err) => console.log(err));
    }

    const getSubcategoriesById = (id, offset, tag) =>
        subcategorieById(id, offset, tag)
            .then((res) => {
                // console.log(res.data);
            }).catch((err) => console.log(err));


    const getAllCategoriesByBanner = (bannersInfo) => {
        if (bannersInfo) {
            const filteredBanners = bannersInfo.filter((banner) => banner.banner_type === "banner_1");
            filteredBanners.map((banner) => {
                banner.banner_data.map((bannerData) => {
                    if (bannerData.tipo_filtro === "category") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro1(bannerData.id_filtro);
                        setTag(bannerData.id_tag);
                        setBannerSubcategory(bannerData.ids_filtro_sub);
                        setBannerSubsubCategory(bannerData.ids_filtro_s_sub);
                        subcategorieById(bannerData.id_filtro, offset, bannerData.id_tag, bannerData.ids_filtro_sub, bannerData.ids_filtro_s_sub)
                            .then((res) => {
                                // console.log("Informacion de banner 1 category", res.data);
                                // console.log("Datos de etiquedtado", res.data);
                                // setSubcategory(res.data.products);
                                // history.push(`/categories/products/filter/${bannerData.id_filtro}`);
                            })
                            .catch((err) => console.log(err));
                    }
                    if (bannerData.tipo_filtro === "product") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro1(bannerData.id_filtro);
                        detailProductById(bannerData.id_filtro, bannerData.id_tag)
                            .then((res) => {
                                // console.log('Detalle del producto del banner 1 product ', res.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }

                    if (bannerData.tipo_filtro === "brand") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro1(bannerData.id_filtro);
                        getProductsByIdBrand(bannerData.id_filtro, bannerData.id_tag)
                            .then((res) => {
                                // console.log('Detalle del producto por marca desde el banner 1', res.data);
                            })
                            .catch((err) => console.log(err));
                    }


                    if (bannerData.tipo_filtro === "shop") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro1(bannerData.id_filtro);

                    }

                });
            });
        }

    };

    const showProductsByCategoryBanner = (idtag, subcate, subsubcate) => {
        // console.log(idtag);
        // console.log(bannerFiltro1);
        // console.log(tipoFiltro);
        if (tipoFiltro === 'category') {
            if (idtag !== '' && subcate !== '' && subsubcate !== []) {
                // Todas las variables tienen valores, construir la URL con todas ellas
                const subsubcateStr = JSON.stringify(subsubcate);
                console.log("Entré en la primera validación de subcategorías, subsubcategorías e idTag");
                history.push(`/categories/products/Precios%20especiales/${bannerFiltro1}/${idtag}/${encodeURIComponent(subcate)}/${encodeURIComponent(subsubcateStr)}`);
            } else if (subcate !== '' && subsubcate !== []) {
                // idtag está vacío, pero subcate y subsubcate tienen valores, construir la URL sin idtag
                const subsubcateStr = JSON.stringify(subsubcate);
                console.log("Entré en la segunda validación cuando idTag es vacío");
                history.push(`/categories/products/Precios%20especiales/${bannerFiltro1}/${encodeURIComponent(subcate)}/${encodeURIComponent(subsubcateStr)}`);
            } else if (idtag !== '') {
                // idtag tiene valor, pero subcate y subsubcate están vacíos, construir la URL solo con idtag
                console.log("Entré en la tercera validación en donde solo se manda en la ruta idTag");
                history.push(`/categories/products/Precios%20especiales/${bannerFiltro1}/${idtag}`);
            } else {
                console.log("Entré en la tercera validación en donde solo se manda en la ruta idTag");
                history.push(`/categories/products/Precios%20especiales/${bannerFiltro1}/${idtag}`);
            }
        }

        // if (tipoFiltro === 'category') {
        //     // getAllCategoriesByBanner(bannersInfo);

        //     if (subcate !== '' || subsubcate !== []) {
        //         if (idTag !== '') {
        //             const subsubcateStr = JSON.stringify(subsubcate);
        //             history.push(`/categories/products/Precios%20especiales/${bannerFiltro1}/${idTag}/${encodeURIComponent(subcate)}/${encodeURIComponent(subsubcateStr)}`);
        //         } else {

        //             const subsubcateStr = JSON.stringify(subsubcate);
        //             history.push(`/categories/products/Precios%20especiales/${bannerFiltro1}/${encodeURIComponent(subcate)}/${encodeURIComponent(subsubcateStr)}`);
        //         }

        //     } else {
        //         if (tipoFiltro === 'category') {
        //             history.push(`/categories/products/Precios%20especiales/${bannerFiltro1}/${idTag}`);
        //         }
        //     }

        // }
        if (tipoFiltro === 'product') {
            // getAllCategoriesByBanner(bannersInfo); 
            history.push(`/detailsProduct/${bannerFiltro1}/slug/${tag}`);
        }
        if (tipoFiltro === 'brand') {
            // getAllCategoriesByBanner(bannersInfo);
            history.push(`/brand/Descuento/${bannerFiltro1}/${tag}`);
        }

        // /* Banner 2 */
        // if (tipoFiltro2 === 'category') {
        //     history.push(`/categories/products/filter/${bannerFiltro2}`);
        // }
        // if (tipoFiltro2 === 'product') {
        //     history.push(`/detailsProduct/${bannerFiltro2}/slug`);
        // }
        // if (tipoFiltro2 === 'brand') {
        //     history.push(`/brand/filterBrandBanner/${bannerFiltro2}`);
        // }
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

    const handleBannerClick = (idTag, subcate, subsubcate, e) => {
        e.preventDefault();
        showProductsByCategoryBanner(idTag, subcate, subsubcate);
    };

    const handleChangueCategoryCelulares = (e) => {
        e.preventDefault(); // Evita que el enlace funcione como un enlace normal
        history.push(`/categories/Celulares%20y%20Accesorios/Celulares%20y%20Smartphones/2`)
    }

    const handleChangueCategoryTV = (e) => {
        e.preventDefault(); // Evita que el enlace funcione como un enlace normal
        history.push(`/categories/Tv.%20Audio%20y%20Video/tv%20y%20audio/3`)
    }


    const handleChangueCategoryComputacion = (e) => {
        e.preventDefault(); // Evita que el enlace funcione como un enlace normal
        history.push(`/categories/Computacion/Computación/4`)
    }


    const handleChangueCategoryConsolas = (e) => {
        e.preventDefault(); // Evita que el enlace funcione como un enlace normal
        history.push(`/categories/Consolas%20y%20videos%20juegos/Consolas%20y%20videojuegos/5`)
    }


    // useEffect(() => {

    //         if (nextButtonActivated) {
    //             // Encuentra el botón "Next" del primer carrusel por su atributo data-bs-slide="next"
    //             const firstCarouselNextButton = document.getElementById('nextButton');

    //             // Si se encuentra el botón, haz clic en él y marca el botón como activado
    //             if (firstCarouselNextButton) {
    //                 firstCarouselNextButton.click();
    //                 setNextButtonActivated(true);
    //             }
    //         }


    //     // Llama a nextBanner cuando se carga el componente

    // }, [nextButtonActivated]);


    useEffect(() => {
        getAllBanners();

        // if (bannersInfo) {
        //     console.log(bannersInfo);

        // }
        // if (bannerFiltro1) {
        //     console.log("Banner filtro 1", bannerFiltro1);
        // }

        // if (bannerFiltro2) {
        //     console.log("banner Filtro 2", bannerFiltro2);
        // }


    }, [bannerFiltro1, bannerFiltro2, tipoFiltro2]);

    return (
        <>
            <div className='container'>
                <div className='containerBanner'>

                    {bannersInfo &&
                        bannersInfo
                            .filter((banner) => banner.banner_type === "banner_1")
                            .map((banner, index) => (
                                <div key={index}>
                                    <a href='#' onClick={(e) => { e.preventDefault(); showProductsByCategoryBanner(banner.banner_data[0].id_tag, banner.banner_data[0].ids_filtro_sub, banner.banner_data[0].ids_filtro_s_sub) }}>
                                        <img src={baseUrlImageBanners + banner.banner_data[0].imagen_desk} width={'100%'} height={'124px'} className='banner_1' />
                                    </a>
                                    <a href='#' onClick={(e) => { e.preventDefault(); showProductsByCategoryBanner(banner.banner_data[0].id_tag, banner.banner_data[0].ids_filtro_sub, banner.banner_data[0].ids_filtro_s_sub) }}>
                                        <img src={baseUrlImageBanners + banner.banner_data[0].imagen} width={'100%'} height={'124px'} className='banner_res_2' />
                                    </a>
                                </div>
                            ))}

                    {bannersInfo &&
                        bannersInfo
                            .filter((banner) => banner.banner_type === "banner_2")
                            .map((itemBanner, index) => (
                                <div id={`carouselExampleAutoplaying-${index}`} className="carousel slide" key={index} data-bs-ride="carousel" data-bs-interval="3000" >
                                    <div className="carousel-indicators">
                                        {itemBanner.banner_data.map((_, i) => (
                                            <button
                                                type="button"
                                                data-bs-target={`#carouselExampleAutoplaying-${index}`}
                                                data-bs-slide-to={i}
                                                className={i === 0 ? "active" : ""}
                                                key={i}
                                                aria-label={`Slide ${i + 1}`}
                                            ></button>
                                        ))}
                                    </div>

                                    <div className="carousel-inner">
                                        {itemBanner.banner_data.map((item, i) => (
                                            <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
                                                <a href='#' onClick={(e) => { e.preventDefault(); showRutes(item.id_filtro, item.tipo_filtro, item.id_tag, item.ids_filtro_sub, item.ids_filtro_s_sub) }} className='desktopView'>
                                                    <img src={baseUrlImageBanners + item.imagen_desk} className="d-block w-100" alt="..." style={{ height: '426px' }} />

                                                </a>
                                                <a href='#' onClick={(e) => { e.preventDefault(); showRutes(item.id_filtro, item.tipo_filtro, item.id_tag, item.ids_filtro_sub, item.ids_filtro_s_sub) }} className='movilView'>
                                                    <img src={baseUrlImageBanners + item.imagen} className="d-block w-100" alt="..." />

                                                </a>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleAutoplaying-${index}`} data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleAutoplaying-${index}`} data-bs-slide="next" id='nextButton'>
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            ))}
                </div >
                <div className='containerCategoriasBanner'>

                    <a href='#' className='categoriaCards1' onClick={handleChangueCategoryCelulares}>
                        <div className='Categoriaimg'>
                            <img
                                src={celularCategoria}
                                width={'80px'}
                            />

                        </div>
                        <div className='span_flecha'>
                            <p className='textCategoria'>
                                Celulares y Accesorios
                            </p>
                            <i><img src={arrow} width={'4px'} /></i>
                        </div>
                    </a>


                    <a href='#' className='categoriaCards' onClick={handleChangueCategoryTV}>
                        <div className='Categoriaimg'>
                            <img
                                src={TV}
                                width={'80px'}
                            />

                        </div>
                        <div className='span_flecha'>
                            <p className='textCategoria'>
                                TV Audio y Video
                            </p>
                            <i><img src={arrow} width={'4px'} /></i>
                        </div>
                    </a>

                    <a href='#' className='categoriaCards' onClick={handleChangueCategoryComputacion}>
                        <div className='Categoriaimg'>
                            <img
                                src={mac}
                                width={'80px'}
                            />

                        </div>
                        <div className='span_flecha'>
                            <p className='textCategoria'>
                                Computación
                            </p>
                            <i><img src={arrow} width={'4px'} /></i>
                        </div>
                    </a>

                    <a href='#' className='categoriaCards' onClick={handleChangueCategoryConsolas}>
                        <div className='Categoriaimg'>
                            <img
                                src={ps5}
                                width={'50px'}
                                style={{}}
                            />

                        </div>
                        <div className='span_flecha'>
                            <p className='textCategoria'>
                                Consolas y videojuegos
                            </p>
                            <i><img src={arrow} width={'4px'} /></i>
                        </div>
                    </a>
                </div>
            </div>

        </>
    );
}

export default Banner;

