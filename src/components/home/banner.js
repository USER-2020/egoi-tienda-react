import React, { useState } from 'react';
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

const Banner = (args) => {

    const history = useHistory();

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    /* Flujo de trabajo */
    const [bannersInfo, setBannersInfo] = useState([]);
    const [offset, setOffset] = useState([]);
    const [bannerFiltro1, setBannerFiltro1] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('');


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
                console.log(res.data[0]);
                setBannersInfo(res.data);
                getAllCategoriesByBanner(res.data);
            }).catch((err) => console.log(err));
    }

    const getAllCategoriesByBanner = (bannersInfo) => {
        if (bannersInfo) {
            const filteredBanners = bannersInfo.filter((banner) => banner.banner_type === "banner_1");
            filteredBanners.map((banner) => {
                banner.banner_data.map((bannerData) => {
                    if (bannerData.tipo_filtro === "category") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro1(bannerData.id_filtro);
                        subcategorieById(bannerData.id_filtro, offset)
                            .then((res) => {
                                console.log("Informacion de banner category", res.data);
                                // setSubcategory(res.data.products);
                                // history.push(`/categories/products/filter/${bannerData.id_filtro}`);
                            })
                            .catch((err) => console.log(err));
                    }
                    if (bannerData.tipo_filtro === "product") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro1(bannerData.id_filtro);
                        detailProductById(bannerData.id_filtro)
                            .then((res) => {
                                console.log('Detalle del producto del banner product', res.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                    
                });
            });
        }
    };


    const showProductsByCategoryBanner = () => {
        if (tipoFiltro === 'category') {
            history.push(`/categories/products/filter/${bannerFiltro1}`);
        }
        if(tipoFiltro === 'product'){
            history.push(`/detailsProduct/${bannerFiltro1}/slug`);
        }
    }

    useEffect(() => {
        getAllBanners();

        if (bannersInfo) {
            console.log(bannersInfo);

        }
        if (bannerFiltro1) {
            console.log(bannerFiltro1);
        }

    }, [bannerFiltro1]);

    return (
        <>
            <div className='container'>
                <div className='containerBanner'>

                    {bannersInfo &&
                        bannersInfo
                            .filter((banner) => banner.banner_type === "banner_1")
                            .map((banner, index) => (
                                <div key={index}>
                                    <a href='#' onClick={() => showProductsByCategoryBanner()}>
                                        <img src={baseUrlImageBanners + banner.banner_data[0].imagen} width={'100%'} height={'124px'} className='banner_1' />
                                    </a>
                                    <a href='#' onClick={() => showProductsByCategoryBanner()}>
                                        <img src={baseUrlImageBanners + banner.banner_data[0].imagen} width={'100%'} height={'124px'} className='banner_res_2' />
                                    </a>
                                </div>
                            ))}

                    {bannersInfo &&
                        bannersInfo
                            .filter((banner) => banner.banner_type === "banner_2")
                            .map((itemBanner, index) => (
                                <div id={`carouselExampleAutoplaying-${index}`} className="carousel slide" key={index} data-bs-ride="carousel" data-bs-interval="3000">
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
                                            <a href='#'>
                                                <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
                                                    <img src={baseUrlImageBanners + item.imagen} className="d-block w-100" alt="..." />
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleAutoplaying-${index}`} data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleAutoplaying-${index}`} data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            ))}
                </div >
                <div className='containerCategoriasBanner'>
                    <a href='#' className='categoriaCards1'>
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

                    <a href='#' className='categoriaCards'>
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

                    <a href='#' className='categoriaCards'>
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

                    <a href='#' className='categoriaCards'>
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

