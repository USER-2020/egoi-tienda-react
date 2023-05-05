import React, { useEffect, useState } from 'react'
import '../../styles/productCategories.css'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import start from '../../assets/Star.png';
import start_1 from '../../assets/Star-1.png';

import iphoner from '../../assets/iphoneMuestra.png';
import { Link, useParams } from 'react-router-dom';
import { subcategorieById } from '../../services/categories';



const ProductsCategories = () => {

  const { category, subcategory, id } = useParams();
  const [products, setProducts ] = useState([]);
  const [currentSubcategoryId, setCurrentSubcategoryId] = useState(null);


 const productsBySubcategory = (id) => {
    subcategorieById(id)
    .then((res) => {
      console.log(res);
      setProducts(res.data);
      console.log("Productos por el id", products);
    })
    .catch((err) => console.log(err));
  }
  
  useEffect(()=>{
    if(id){
      productsBySubcategory(id);
    }
  }, [id]);


 


  const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";

  // console.log(category)
  // console.log(subcategory)
  // console.log(id)

  const handleSubcategoryClick = (id) => {
    setCurrentSubcategoryId(id);
  };

  
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
            {products.map((product, index)=> (
              
              <a href="#" className='containerCard2 col-12 col-md-2' >
                  <Link to={`/detailsProduct/${product.slug}`} key={index}>
                  <Card className="cardProducto1">
                    <CardImg top width="80%" src={baseUrlImage + product.images[0]} alt={product.name}/>
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
        </div>
      </div>
    </div>
  </div>
    
  )
}

export default ProductsCategories;
