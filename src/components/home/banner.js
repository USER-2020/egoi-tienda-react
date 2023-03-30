import React, {useState} from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Button
  } from 'reactstrap';
import styled from 'styled-components';
import "../../styles/banner.css";
import  banner_1 from '../../assets/banner_1.png';
import  banner_2 from '../../assets/banner_2.png';
import celularCategoria from '../../assets/celularCategoria.png';
import arrow from '../../assets/arrow.png';
import TV from '../../assets/Full-HD-LED-TV-PNG-Image.png';
import mac from '../../assets/Macbook-No-Background-Clip-Art.png';
import ps5 from '../../assets/ps5.png';

const items = [
    {
        src: banner_2,
        altText: 'Slide 1',
        caption: 'Samsung Galaxy S23 256 GB',
        buttonLabel: 'Comprar ahora',
        buttonLink: '#',
        extraText: 'POR TAN SOLO $2’800.000'
    },
    {
        src: banner_2,
        altText: 'Slide 2',
        caption: 'Samsung Galaxy S23 256 GB',
        buttonLabel: 'Comprar ahora',
        buttonLink: '#',
        extraText: 'POR TAN SOLO $2’800.000'
    },
    {
        
        src: banner_2,
        altText: 'Slide 3',
        caption: 'Samsung Galaxy S23 256 GB',
        buttonLabel: 'Comprar ahora',
        buttonLink: '#',
        extraText: 'POR TAN SOLO $2’800.000'
    }
  ];

  const Banner = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }

  
    const slides = items.map((item) => {
      return (
      
            <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
            
            >
            <img src={item.src} alt={item.altText} width={'100%'} />
            <Button href={item.buttonLink} style={{ position: 'absolute', top: '65%', left: '15%', borderRadius:'32px' ,background: '#A75BFF',zIndex:'550'}}>{item.buttonLabel} </Button>
            {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
            <CarouselCaption
                // captionText={item.caption}
                // style={{ position: 'absolute', top: '70%', left: '15%', zIndex:'555', width:'10%'}}
                // captionText={item.caption}
                captionHeader={<div className="carousel-caption-header">{item.caption}</div>}
                captionText={<div className="carousel-caption-text">{item.extraText}</div>}
                
            />
            </CarouselItem>
        
      );
    });
    
      return (
        <>
        <div className='container'>
            <div className='containerBanner'>

                <a href='#'>
                    <img src={banner_1} width={'100%'}/>
                </a>
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                    >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>

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
                                <i><img src={arrow} width={'4px'}/></i>
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
                                <i><img src={arrow} width={'4px'}/></i>
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
                                <i><img src={arrow} width={'4px'}/></i>
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
                                <i><img src={arrow} width={'4px'}/></i>
                            </div>
                        </a>
                    
                    
                        
                </div>

            </div>
        </div>
        </>
      );
    }
    
    export default Banner;
    
