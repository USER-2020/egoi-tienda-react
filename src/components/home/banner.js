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

const Banner = (args) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    /* Flujo de trabajo */
    const [bannersInfo, setBannersInfo] = useState([]);


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


    // const slides = bannersInfo && bannersInfo
    //     .filter((item) => item.banner_type === "banner_2")
    //     .map((item, index) => {
    //         return (

    //             <CarouselItem
    //                 onExiting={() => setAnimating(true)}
    //                 onExited={() => setAnimating(false)}
    //                 key={index}

    //             >
    //                 <img src={baseUrlImageBanners + item.banner_data[0].imagen} alt={item.banner_data[0].imagen} />
    //                 <Button href='#' className="bton_accesos" style={{ position: 'absolute', top: '65%', left: '15%', borderRadius: '32px', background: '#A75BFF', zIndex: '550' }}>Comprar ahora </Button>
    //                 {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
    //                 {/* <CarouselCaption
    //                     // captionText={item.caption}
    //                     // style={{ position: 'absolute', top: '70%', left: '15%', zIndex:'555', width:'10%'}}
    //                     // captionText={item.caption}
    //                     className="carousel-caption-custom"
    //                 // captionHeader={<div className="carousel-caption-header">{item.caption}</div>}
    //                 // captionText={<div className="carousel-caption-text">{item.extraText}</div>}
    //                 /> */}
    //             </CarouselItem>

    //         );
    //     });

    // const filteredBanners = bannersInfo.filter((item) => item.banner_type === "banner_2");
    // const slides = filteredBanners.map((item) => (
    //     item.banner_data.map((banner) => (
    //         <div id="carouselExampleIndicators" className="carousel slide" key={banner.id}>
    //             <div className="carousel-indicators">
    //                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    //                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    //                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    //             </div>
    //             <div className="carousel-inner">
    //                 <div className="carousel-item active">
    //                     <img src="..." className="d-block w-100" alt="..." />
    //                 </div>
    //                 <div className="carousel-item">
    //                     <img src="..." className="d-block w-100" alt="..." />
    //                 </div>
    //                 <div className="carousel-item">
    //                     <img src="..." className="d-block w-100" alt="..." />
    //                 </div>
    //             </div>
    //             <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    //                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //                 <span className="visually-hidden">Previous</span>
    //             </button>
    //             <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    //                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //                 <span className="visually-hidden">Next</span>
    //             </button>
    //         </div>
    //     ))
    // ));


    const getAllBanners = () => {
        getBanners()
            .then((res) => {
                console.log(res.data);
                console.log(res.data[0]);
                setBannersInfo(res.data);
            }).catch((err) => console.log(err));
    }

    useEffect(() => {
        getAllBanners();

        if (bannersInfo) {
            console.log(bannersInfo);
        }

    }, []);

    return (
        <>
            <div className='container'>
                <div className='containerBanner'>

                    {bannersInfo &&
                        bannersInfo
                            .filter((banner) => banner.banner_type === "banner_1")
                            .map((banner, index) => (
                                <div key={index}>
                                    <a href='#'>
                                        <img src={baseUrlImageBanners + banner.banner_data[0].imagen} width={'100%'} height={'124px'} className='banner_1' />
                                    </a>
                                    <a href='#'>
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

