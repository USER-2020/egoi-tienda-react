import React, { useEffect, useState } from 'react'

import { Card, CardImg, CardBody, CardSubtitle, CardTitle} from 'reactstrap';

import '../../styles/similarProducts.css';
import start from '../../assets/Star.png';
import start_1 from '../../assets/Star-1.png';
import iphone from '../../assets/iphoneMuestra.png';
import { ProductosSimilaresById } from '../../services/productos';
import { Link, useParams, useHistory } from 'react-router-dom';



function SimilarProduct() {

    const [products, setProducts] = useState([]);
    const history = useHistory();
    const {id, slug} = useParams();

    const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";

    const similarProducts = (id) =>{
        ProductosSimilaresById(id)
        .then((res)=>{
            console.log(res);
            setProducts(res.data);
            console.log("Estos son los productos similares al id seleccionado");
        })
        .catch((err) => console.log(err));
    }

    useEffect(()=>{
        if(slug || id) {
            similarProducts(id);
        }
    }, [slug]);

  return (
    <div className='container'>
        <div className="containerSimilarProduct">
            <div className='spanRecent'>
                {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3911 11.3494C9.98137 12.3774 8.79326 13.6705 7.95955 14.7069C7.28956 15.5398 7.2001 15.7026 7.2001 16C7.2001 16.2974 7.28956 16.4602 7.95955 17.2931C8.79326 18.3295 9.98137 19.6226 11.3911 20.6506C12.8064 21.6826 14.3794 22.4 16.0001 22.4C17.6208 22.4 19.1938 21.6826 20.6091 20.6506C22.0188 19.6226 23.2069 18.3295 24.0406 17.2931C24.7106 16.4602 24.8001 16.2974 24.8001 16C24.8001 15.7026 24.7106 15.5398 24.0406 14.7069C23.2069 13.6705 22.0188 12.3774 20.6091 11.3494C19.1938 10.3174 17.6208 9.6 16.0001 9.6C14.3794 9.6 12.8064 10.3174 11.3911 11.3494ZM10.4484 10.0567C12.0085 8.91905 13.9097 8 16.0001 8C18.0904 8 19.9917 8.91905 21.5518 10.0567C23.1173 11.1983 24.4056 12.6079 25.2873 13.704C25.3154 13.739 25.3434 13.7736 25.3713 13.8081C25.9162 14.4832 26.4001 15.0826 26.4001 16C26.4001 16.9174 25.9162 17.5168 25.3713 18.1919C25.3434 18.2264 25.3154 18.261 25.2873 18.296C24.4056 19.3921 23.1173 20.8017 21.5518 21.9434C19.9917 23.0809 18.0904 24 16.0001 24C13.9097 24 12.0085 23.0809 10.4484 21.9434C8.88288 20.8017 7.59459 19.3921 6.71286 18.296C6.68476 18.261 6.65676 18.2264 6.62892 18.1919C6.08401 17.5168 5.6001 16.9174 5.6001 16C5.6001 15.0826 6.08401 14.4832 6.62892 13.8081C6.65676 13.7736 6.68476 13.739 6.71286 13.704C7.59459 12.6079 8.88288 11.1983 10.4484 10.0567ZM16.0001 14.1C14.9357 14.1 14.082 14.9557 14.082 16C14.082 17.0443 14.9357 17.9 16.0001 17.9C17.0645 17.9 17.9182 17.0443 17.9182 16C17.9182 14.9557 17.0645 14.1 16.0001 14.1ZM12.482 16C12.482 14.062 14.0622 12.5 16.0001 12.5C17.938 12.5 19.5182 14.062 19.5182 16C19.5182 17.938 17.938 19.5 16.0001 19.5C14.0622 19.5 12.482 17.938 12.482 16Z" fill="#171523"/>
                </svg> */}
                <h4>Quienes vieron este producto tambien compraron</h4>
                
            </div>
            <div className="containerProductos">
                {products && products.map((product, index) => 

                <a href='#' className='containerCard'>
                    <Link to= {`/detailsProduct/${product.id}/${product.slug}`}>
                   
                    {/* <Link to={`/detailsProduct/${product.id}/${product.slug}`} > */}
                    <Card className='cardProducto1'>
                        <CardImg top width="80%" src={baseUrlImage + product.images[0]} alt={product.name} />
                        <CardBody>
                        <div className='starts'>
                            <img src={start}/>
                            <img src={start}/>
                            <img src={start}/>
                            <img src={start_1}/>
                            <img src={start_1}/>
                        </div>
                        <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ lineHeight: "1.2", maxHeight: "2.4em", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</CardSubtitle>
                        <CardTitle tag="h5">${product.unit_price.toLocaleString()}</CardTitle>
                        </CardBody>
                    </Card>
                    {/* </Link> */}
                    </Link>
                </a>
                )}
            </div>
        </div>
      
    </div>
  )
}

export default SimilarProduct
