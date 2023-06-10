import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import '../../styles/vendidos.css';
import celRecent from '../../assets/celularReciente.png';
import start from '../../assets/Star.png';
import start_1 from '../../assets/Star-1.png';
import celSamsung from '../../assets/celularSamsung.png';
import logoSamsung from '../../assets/samsungPNG.png';
import logoSony from '../../assets/sonyPNG.png';
import cascoSony from '../../assets/cascosSONY.png';
import logoHaceb from '../../assets/hacebPNG.png';
import electroHaceb from '../../assets/electrodomesticosHACEB.png';
import logoAsus from '../../assets/asusPNG.png';
import pcASUS from '../../assets/pcASUS.png';
import { ProductosMasVendidos } from "../../services/productos";


const Vendidos = () => {

    const [productos, setProductos] = useState([]);

    const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";
  
    const ProductosMasVendido = () => {
        ProductosMasVendidos()
        .then((res) => {
        setProductos(res.data.products);
          console.log("mas vendidos",productos);
        })
        .catch((err) => console.log(err));
  
      // setProductos(productos);
  
    };
  
    useEffect(() => {
      ProductosMasVendido();
    }, []);


  return (
    <div className='container'>
      <div className='containerVendidos'>
        <div className='spanRecent'>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16977 8.31899C9.38258 5.76021 13.0251 5.76021 15.2379 8.31899L15.9999 9.20013L16.7619 8.31899C18.9747 5.76021 22.6172 5.76021 24.83 8.31899C26.6657 10.4417 26.9852 13.7669 25.2901 16.1259C24.545 17.1629 23.6408 18.3392 22.6001 19.5426C21.0155 21.3749 19.5019 22.8434 18.3834 23.8548C17.8238 24.3608 17.3622 24.7532 17.0389 25.0203C16.8773 25.1539 16.7501 25.2562 16.6625 25.3258C16.6187 25.3606 16.5848 25.3872 16.5613 25.4055L16.5342 25.4266L16.5266 25.4324L16.5237 25.4347C16.5236 25.4347 16.5232 25.435 16.0368 24.7999C15.5582 25.441 15.5581 25.4409 15.558 25.4408L15.5547 25.4383L15.5469 25.4325L15.519 25.4113C15.4949 25.393 15.4601 25.3664 15.4152 25.3315C15.3253 25.2618 15.1951 25.1594 15.0297 25.0257C14.699 24.7584 14.2276 24.3657 13.6582 23.8592C12.5201 22.8471 10.9862 21.3771 9.3997 19.5426C8.35898 18.3392 7.45476 17.1629 6.70966 16.1259C5.01456 13.7669 5.33408 10.4417 7.16977 8.31899ZM16.0368 24.7999L15.558 25.4408L16.043 25.8028L16.5237 25.4347L16.0368 24.7999ZM16.0309 23.7777C16.3373 23.5243 16.7765 23.1507 17.3103 22.6681C18.3915 21.6904 19.8569 20.2686 21.3898 18.496C22.3938 17.3351 23.2684 16.1976 23.9908 15.1923C25.2159 13.4873 25.0151 10.9791 23.6198 9.36558C22.0451 7.54468 19.5468 7.54468 17.9721 9.36558L15.9999 11.6462L14.0277 9.36558C12.453 7.54468 9.9547 7.54468 8.38 9.36558C6.98464 10.9791 6.78389 13.4873 8.009 15.1923C8.73136 16.1976 9.60598 17.3351 10.6099 18.496C12.1409 20.2664 13.623 21.6867 14.7215 22.6636C15.2676 23.1493 15.7179 23.5245 16.0309 23.7777Z" fill="black"/>
            </svg>
            <h4>Los más vendidos</h4>
            <a href='#' className='refshowAll'>
                Ver todos
            </a>
        </div>
        <div className='containerProductos'>
        {productos.map((product, index) => (
            
            <a href="#" className="containerCard2" key={index}>
            <Link to={`/detailsProduct/${product.id}/${product.slug}`}>
            <Card className="cardProducto1">
              <CardImg top width="80%" src={baseUrlImage + product.images[0]} alt={product.name} />
              <CardBody>
                <div className="starts">
                  <img src={start} />
                  <img src={start} />
                  <img src={start} />
                  <img src={start_1} />
                  <img src={start_1} />
                </div>
                <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {product.name}
                </CardSubtitle>
                <CardTitle tag="h5">${product.unit_price.toLocaleString()}</CardTitle>
              </CardBody>
            </Card>
            </Link>
          </a>
        ))}  
            
        </div>
        <div className='containerHot'>
            <div className='masVendidosCards'>
                <div className='headerImg'>
                    <img src={logoSamsung} width={'200px'}/>
                </div>
                <div className='centerImg'>
                    <img src={celSamsung} width={'134px'}/>
                </div>
                <a href='#' className='btnVendidos'>
                    Ver Tienda
                </a>
                <div className='footerSpanText'>
                    <span className='spanText1'>
                        Hasta
                    </span>
                    <span className='spanText2'>
                        50% Descuento
                    </span>
                </div>
            </div>
            <div className='masVendidosCards'>
                <div className='headerImg'>
                    <img src={logoSony} width={'200px'}/>
                </div>
                <div className='centerImg'>
                    <img src={cascoSony} width={'216px'}/>
                </div>
                <a href='#' className='btnVendidos'>
                    Ver Tienda
                </a>
                <div className='footerSpanText'>
                    <span className='spanText1'>
                        Hasta
                    </span>
                    <span className='spanText2'>
                        50% Descuento
                    </span>
                </div>
            </div>
            <div className='masVendidosCards'>
                <div className='headerImg'>
                    <img src={logoHaceb} width={'200px'}/>
                </div>
                <div className='centerImg'>
                    <img src={electroHaceb} width={'216px'}/>
                </div>
                <a href='#' className='btnVendidos'>
                    Ver Tienda
                </a>
                <div className='footerSpanText'>
                    <span className='spanText1'>
                        Hasta
                    </span>
                    <span className='spanText2'>
                        50% Descuento
                    </span>
                </div>
            </div>
            <div className='masVendidosCards'>
                <div className='headerImg'>
                    <img src={logoAsus} width={'200px'}/>
                </div>
                <div className='centerImg'>
                    <img src={pcASUS} width={'216px'}/>
                </div>
                <a href='#' className='btnVendidos'>
                    Ver Tienda
                </a>
                <div className='footerSpanText'>
                    <span className='spanText1'>
                        Hasta
                    </span>
                    <span className='spanText2'>
                        50% Descuento
                    </span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Vendidos
