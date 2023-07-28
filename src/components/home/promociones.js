import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "../../styles/recientes.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import bolt from "../../assets/Bolt.png";
import celRecent from "../../assets/celularReciente.png";
import start from "../../assets/Star.png";
import start_1 from "../../assets/Star-1.png";
import secador from "../../assets/Imagen6SecadorPromocion.png";
import airFrier from "../../assets/Imagen7AirFrierPromociones.png";
import pc from "../../assets/Imagen8PCPromocion.png";
import { ProductosDescuento } from "../../services/productos";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const Promociones = ({ bannersInfo }) => {
  const [productos, setProductos] = useState([]);

  const containerRef = useRef(null);
  const containerRef2 = useRef(null);

  const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";
  const baseUrlImageBanners = "https://egoi.xyz/storage/app/public/banner/";

  const history = useHistory();

  const ProductosDescuentos = () => {
    ProductosDescuento()
      .then((res) => {
        setProductos(res.data.products);
        console.log("descuentos", productos);
      })
      .catch((err) => console.log(err));

    // setProductos(productos);

  };

  const showRoutes = (itemId, filtro) => {
    console.log("este el id elegido para pasar por las rutas en el banner 4", itemId);

    if (filtro === 'category') {
      history.push(`/categories/products/filter/${itemId}`);
    }
    if (filtro === 'product') {
      history.push(`/detailsProduct/${itemId}/slug`);
    }
    if (filtro === 'brand') {
      history.push(`/brand/filterBrandBanner/${itemId}`);
    }
  }

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200; // Ajusta el valor según tus necesidades
    }
    const leftButton = document.querySelector('.scroll-button.left');
    leftButton.classList.add('animate-left');
    setTimeout(() => {
      leftButton.classList.remove('animate-left');
    }, 300);
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200; // Ajusta el valor según tus necesidades
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

  useEffect(() => {
    ProductosDescuentos();
  }, []);


  return (
    <div className="container">
      <div className="containerPromociones">
        <div className="spanRecent">
          <img src={bolt} />
          <h4>Promociones imperdibles</h4>
          <a href="#" className="refshowAll">
            Ver todos
          </a>
        </div>
      </div>

      <div className="containerProductos" ref={containerRef2}>
        {/* <button className="scroll-button left" onClick={handleScrollLeft2} onMouseOver={handleScrollLeft2}>
          &#8249;
        </button> */}
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
                  <span className="span_offer">Oferta del dia</span>
                </CardBody>
              </Card>
            </Link>
          </a>
        ))}
        {/* <button className="scroll-button right" onClick={handleScrollRight2} onMouseOver={handleScrollRight2}>
          &#8250;
        </button> */}
      </div>
      <div className="cardContainer2">
        <button className="scroll-button left" onClick={handleScrollLeft} onMouseOver={handleScrollLeft}>
          &#8249;
        </button>
        {bannersInfo && bannersInfo
          .filter((banner) => banner.banner_type === "banner_4")
          .map((itemBanner, index) => (
            <div className="containerPostProm" ref={containerRef}>
              <a href="#" onClick={() => showRoutes(itemBanner.banner_data[0].id_filtro, itemBanner.banner_data[0].tipo_filtro)}>
                <div className="contenedor1" key={index === 0}>
                  <img src={baseUrlImageBanners + itemBanner.banner_data[0].imagen} alt={itemBanner.banner_data[0].imagen} />
                </div>
              </a>
              <a href="#" onClick={() => showRoutes(itemBanner.banner_data[1].id_filtro, itemBanner.banner_data[1].tipo_filtro)}>
                <div className="contenedor1" key={index === 1}>
                  <img src={baseUrlImageBanners + itemBanner.banner_data[1].imagen} alt={itemBanner.banner_data[1].imagen} />
                </div>
              </a>
              <a href="#" onClick={() => showRoutes(itemBanner.banner_data[2].id_filtro, itemBanner.banner_data[2].tipo_filtro)}>
                <div className="contenedor2" key={index === 2}>
                  <img src={baseUrlImageBanners + itemBanner.banner_data[2].imagen} alt={itemBanner.banner_data[2].imagen} />
                </div>
              </a>
            </div>
          ))}
        <button className="scroll-button right" onClick={handleScrollRight} onMouseOver={handleScrollRight}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Promociones;
