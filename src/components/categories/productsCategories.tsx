import React from 'react'
import '../../styles/productCategories.css'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import start from '../../assets/Star.png';
import start_1 from '../../assets/Star-1.png';

import iphoner from '../../assets/iphoneMuestra.png';

function ProductsCategories() {
  return (

  <div className='containerProductCategorie'>
      <div className='container'>
      <div className="containerProductsIndex">
        <div className="menuBusqueda">
          <div className="filtros">
            <input type="radio" className="form-check-input"/> 
            Productos más vendidos
          </div>
          <div className="filtros">
            <input type="radio" className="form-check-input"/> 
            Mejor calificados
          </div>
          <div className="filtros">
            <input type="radio" className="form-check-input"/> 
            Los más preferidos
          </div>
          
          
        </div>
        <div className="containerProducts">
          <div className="containerProductos row gap-3">
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            <a href="#" className='containerCard2 col-12 col-md-2'>
              <Card className="cardProducto1">
                <CardImg top width="80%" src={iphoner}/>
                <CardBody>
                  <div className="starts">
                    <img src={start} />
                    <img src={start} />
                    <img src={start} />
                    <img src={start_1} />
                    <img src={start_1} />
                  </div>
                  <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Iphone 14
                    128GB
                  </CardSubtitle>
                  <CardTitle tag="h5">8’000.000</CardTitle>
                </CardBody>
              </Card>
            </a>
            
          </div>
        </div>
      </div>
    </div>
  </div>
    
  )
}

export default ProductsCategories;
