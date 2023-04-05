import React, { useState, useEffect } from "react";

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



const Promociones = () => {
  const [productos, setProductos] = useState([]);

  const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";

  const ProductosDescuentos = () => {
    ProductosDescuento()
      .then((res) => {
        setProductos(res.data.products);
        console.log("descuentos",productos);
      })
      .catch((err) => console.log(err));

    // setProductos(productos);

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

      <div className="containerProductos">
        {productos.map((product, index) => (
          <a href="#" className="containerCard2" key={index}>
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
                <CardTitle tag="h5">${product.purchase_price.toLocaleString()}</CardTitle>
                <span className="span_offer">Oferta del dia</span>
              </CardBody>
            </Card>
          </a>
        ))}    
      </div>

      <div className="containerPostProm">
        <div className="contenedor1">
          <img src={secador} />
          <div className="header">
            <p>Electrobelleza</p>
            <h4>40% dcto*</h4>
          </div>
          <div className="footer">
            <a href="#">Comprar ahora</a>
            <p>Hasta el 5% de descuento del 1 al 15 de Marzo del 2023</p>
          </div>
        </div>
        <div className="contenedor1">
          <img src={airFrier} />
          <div className="header">
            <p>Electrodomésticos</p>
            <h4>70% dcto*</h4>
          </div>
          <div className="footer">
            <a href="#">Comprar ahora</a>
            <p>Hasta el 5% de descuento del 1 al 15 de Marzo del 2023</p>
          </div>
        </div>
        <div className="contenedor2">
          <img src={pc} />
          <div className="left_">
            <h5>Portatiles y accesorios</h5>
            <h4>50% dcto*</h4>
            <a href="#">Comprar ahora</a>
            <p>Hasta el 5% de descuento del 1 al 15 de Marzo del 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promociones;
