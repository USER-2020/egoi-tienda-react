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
import start from '../../assets/egoi_icons/star-fill.svg';
import startEmpty from '../../assets/egoi_icons/star-fill-gray.svg';
import secador from "../../assets/Imagen6SecadorPromocion.png";
import airFrier from "../../assets/Imagen7AirFrierPromociones.png";
import pc from "../../assets/Imagen8PCPromocion.png";
import { ProductosDescuento } from "../../services/productos";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductsByIdBrand } from '../../services/brands';
import { allCategories, subcategorieById } from '../../services/categories';
import { detailProductById } from '../../services/detailProduct';



const Promociones = ({ bannersInfo }) => {
  const [productos, setProductos] = useState([]);

  const containerRef = useRef(null);
  const containerRef2 = useRef(null);

  const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";
  const baseUrlImageBanners = "https://egoi.xyz/storage/app/public/banner/";

  const history = useHistory();

  /* Flujo de trabajo */
  // const [bannersInfo, setBannersInfo] = useState([]);
  const [offset, setOffset] = useState([]);
  const [bannerFiltro6, setBannerFiltro6] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');


  /* Banner 4 */
  const [tipoFiltro6, setTipoFiltro6] = useState('');

  const ProductosDescuentos = () => {
    ProductosDescuento()
      .then((res) => {
        setProductos(res.data.products);
        console.log("descuentos", productos);
      })
      .catch((err) => console.log(err));

    // setProductos(productos);

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
                console.log("Informacion de banner 6 category", res.data);
                console.log("Datos de etiquedtado 6", res.data);
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
                console.log('Detalle del producto del banner 6 product ', res.data);
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
                console.log('Detalle del producto por marca desde el banner 6', res.data);
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

  const showRoutes = (itemId, filtro, tag) => {
    console.log("este el id elegido para pasar por las rutas en el banner 4", itemId);
    console.log("este el id elegido para pasar por las rutas en el banner 4", tag);

    if (filtro === 'category') {
      getAllCategoriesByBanner(bannersInfo)
      history.push(`/categories/products/filter/${itemId}/${tag}`);
    }
    if (filtro === 'product') {
      getAllCategoriesByBanner(bannersInfo)
      history.push(`/detailsProduct/${itemId}/slug/${tag}`);
    }
    if (filtro === 'brand') {
      getAllCategoriesByBanner(bannersInfo)
      history.push(`/brand/filterBrandBanner/${itemId}/${tag}`);
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
                    {[...Array(5)].map((_, index) => (
                      <img
                        key={index}
                        src={index < product.count_rating ? start : startEmpty}
                        alt=""
                      />
                    ))}
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
              <a href="#" onClick={() => showRoutes(itemBanner.banner_data[0].id_filtro, itemBanner.banner_data[0].tipo_filtro, itemBanner.banner_data[0].id_tag)}>
                <div className="contenedor1" key={index === 0}>
                  <img src={baseUrlImageBanners + itemBanner.banner_data[0].imagen} alt={itemBanner.banner_data[0].imagen} />
                </div>
              </a>
              <a href="#" onClick={() => showRoutes(itemBanner.banner_data[1].id_filtro, itemBanner.banner_data[1].tipo_filtro, itemBanner.banner_data[1].id_tag)}>
                <div className="contenedor1" key={index === 1}>
                  <img src={baseUrlImageBanners + itemBanner.banner_data[1].imagen} alt={itemBanner.banner_data[1].imagen} />
                </div>
              </a>
              <a href="#" onClick={() => showRoutes(itemBanner.banner_data[2].id_filtro, itemBanner.banner_data[2].tipo_filtro, itemBanner.banner_data[2].id_tag)}>
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
