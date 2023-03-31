import React from 'react'
import "../../styles/recientes.css";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import bolt from '../../assets/Bolt.png';
import celRecent from '../../assets/celularReciente.png';
import start from '../../assets/Star.png';
import start_1 from '../../assets/Star-1.png';
import secador from '../../assets/Imagen6SecadorPromocion.png';
import airFrier from '../../assets/Imagen7AirFrierPromociones.png';
import pc from '../../assets/Imagen8PCPromocion.png';

const Promociones = () => {
  return (
    <div className='container'>
        <div className='containerPromociones'>
        <div className='spanRecent'>
            <img src={bolt}/>
            <h4>Promociones imperdibles</h4>
            <a href='#' className='refshowAll'>
                Ver todos
            </a>
        </div>
        </div>

        <div className='containerProductos'>
            <a href='#' className='containerCard2'>
                <Card className='cardProducto1'>
                    <CardImg top width="80%" src={celRecent} alt="Card image cap" />
                    <CardBody>
                    <div className='starts'>
                        <img src={start}/>
                        <img src={start}/>
                        <img src={start}/>
                        <img src={start_1}/>
                        <img src={start_1}/>
                    </div>
                    <CardSubtitle tag="h5" className="mb-2 text-muted">Samsung Galaxy A53 5G 128gb</CardSubtitle>
                    <CardTitle tag="h5">$1’600.000</CardTitle>
                    <span className='span_offer'>Oferta del dia</span>
                    </CardBody>
            </Card>
            </a>

            <a href='#' className='containerCard2'>
                <Card className='cardProducto1'>
                    <CardImg top width="80%" src={celRecent} alt="Card image cap" />
                    <CardBody>
                    <div className='starts'>
                        <img src={start}/>
                        <img src={start}/>
                        <img src={start}/>
                        <img src={start_1}/>
                        <img src={start_1}/>
                    </div>
                    <CardSubtitle tag="h5" className="mb-2 text-muted">Samsung Galaxy A53 5G 128gb</CardSubtitle>
                    <CardTitle tag="h5">$1’600.000</CardTitle>
                    <span className='span_offer'>Oferta del dia</span>
                    </CardBody>
            </Card>
            </a>
            <a href='#' className='containerCard2'>
                <Card className='cardProducto1'>
                    <CardImg top width="80%" src={celRecent} alt="Card image cap" />
                    <CardBody>
                    <div className='starts'>
                        <img src={start}/>
                        <img src={start}/>
                        <img src={start}/>
                        <img src={start_1}/>
                        <img src={start_1}/>
                    </div>
                    <CardSubtitle tag="h5" className="mb-2 text-muted">Samsung Galaxy A53 5G 128gb</CardSubtitle>
                    <CardTitle tag="h5">$1’600.000</CardTitle>
                    <span className='span_offer'>Oferta del dia</span>
                    </CardBody>
            </Card>
            </a>
            <a href='#' className='containerCard2'>
                <Card className='cardProducto1'>
                    <CardImg top width="80%" src={celRecent} alt="Card image cap" />
                    <CardBody>
                    <div className='starts'>
                        <img src={start}/>
                        <img src={start}/>
                        <img src={start}/>
                        <img src={start_1}/>
                        <img src={start_1}/>
                    </div>
                    <CardSubtitle tag="h5" className="mb-2 text-muted">Samsung Galaxy A53 5G 128gb</CardSubtitle>
                    <CardTitle tag="h5">$1’600.000</CardTitle>
                    <span className='span_offer'>Oferta del dia</span>
                    </CardBody>
            </Card>
            </a>
            <a href='#' className='containerCard2'>
                <Card className='cardProducto1'>
                    <CardImg top width="80%" src={celRecent} alt="Card image cap" />
                    <CardBody>
                    <div className='starts'>
                        <img src={start}/>
                        <img src={start}/>
                        <img src={start}/>
                        <img src={start_1}/>
                        <img src={start_1}/>
                    </div>
                    <CardSubtitle tag="h5" className="mb-2 text-muted">Samsung Galaxy A53 5G 128gb</CardSubtitle>
                    <CardTitle tag="h5">$1’600.000</CardTitle>
                    <span className='span_offer'>Oferta del dia</span>
                    </CardBody>
            </Card>
            </a>
            <a href='#' className='containerCard2'>
                <Card className='cardProducto1'>
                    <CardImg top width="80%" src={celRecent} alt="Card image cap" />
                    <CardBody>
                    <div className='starts'>
                        <img src={start}/>
                        <img src={start}/>
                        <img src={start}/>
                        <img src={start_1}/>
                        <img src={start_1}/>
                    </div>
                    <CardSubtitle tag="h5" className="mb-2 text-muted">Samsung Galaxy A53 5G 128gb</CardSubtitle>
                    <CardTitle tag="h5">$1’600.000</CardTitle>
                    <span className='span_offer'>Oferta del dia</span>
                    </CardBody>
            </Card>
            </a>

            
            
        </div>

        <div className='containerPostProm'>
            <div className='contenedor1'>
                <img src={secador}/>
                <div className='header'>
                    <p>Electrobelleza</p>
                    <h4>40% dcto*</h4>
                </div>
                <div className='footer'>
                    <a href='#'>Comprar ahora</a>
                    <p>Hasta el 5% de descuento
                        del 1 al 15 de Marzo del 2023  
                    </p>
                </div>
            </div>
            <div className='contenedor1'>
                <img src={airFrier}/>
                <div className='header'>
                    <p>Electrodomésticos</p>
                    <h4>70% dcto*</h4>
                </div>
                <div className='footer'>
                    <a href='#'>Comprar ahora</a>
                    <p>Hasta el 5% de descuento
                        del 1 al 15 de Marzo del 2023
                    </p>
                </div>
            </div>
            <div className='contenedor2'>
                <img src={pc}/>
                <div className='left_'>
                    <h5>Portatiles y accesorios</h5>
                    <h4>50% dcto*</h4>
                    <a href='#'>Comprar ahora</a>
                    <p>Hasta el 5% de descuento del 1 
                        al 15 de Marzo del 2023
                    </p>

                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Promociones
