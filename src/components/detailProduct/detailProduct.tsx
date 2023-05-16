import React, { useEffect, useState } from 'react'
import { 
    Card, 
    CardBody, 
    Form, 
    Modal,
    ModalBody 
} from 'reactstrap';
import  iphone  from '../../assets/iphoneMuestra.png';
import start from '../../assets/Star.png';

import { detailProduct } from '../../services/detailProduct';
import Register from "../../views/user/register.js";
import Login from "../../views/user/login.js";

import '../../styles/detailsProduct.css';
import { useParams, useHistory } from 'react-router-dom';
import { getCurrentUser, setCurrentUser } from '../../helpers/Utils';
import Swal from 'sweetalert2';
import AddCart from '../../views/user/addCart';
import detailsProduct from '../../views/detailsProduct';

function DetailProduct() {
    const {slug} = useParams();
    const [detailProducts, setDetailProducts ] = useState([]);
    const [currentImg, setCurrentImage ] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [modalViewRegistro, setModalViewRegistro] = useState(false);
    const [modalViewLogin, setModalViewLogin] = useState(false);
    const [modalViewCart, setModalViewCart] = useState(false);
    const [changeFormLogin, setChangeFormLogin] = useState(false);
    const [changeFormRegister, setChangeFormRegister] = useState(false);

    const currenUser = getCurrentUser();
    
    const history = useHistory();


    const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";

    const addToCart = () =>{
        if(currenUser){
            setModalViewCart(true);
            console.log("producto agregado");
        }else{
            
            setModalViewLogin(true);
            
          }
    }

    const buyNow = () =>{
        if(currenUser){
            history.push(`/detailCart/address`);
        }
        else{
            setModalViewLogin(true);
        }
    }

        const closeModalRegistro = () => {
            setModalViewRegistro(false);
        };
    
        const closeModalLogin = () => {
            setModalViewLogin(false);
        };

        const closeModalCart = () => {
            setModalViewCart(false);
        };

        const handleChangeFormLogin = () => {

            if(modalViewLogin === true){
              setModalViewRegistro(true);
            }
            
          };
        
        const handleChangeFormRegister = () => {
        
            if(modalViewRegistro === true){
              setModalViewLogin(true);
            }
        
        };

        const handleLogin = () => {
            // Code to handle user login, such as storing session storage, etc.
            if(currenUser){
                setIsLoggedIn(true);
                console.log("Estas logueado")
                
              }else{
                setIsLoggedIn(false);
              }
        
          };
        
          const handleLogout = () => {
            // Code to handle user logout, such as clearing session storage, etc.
            console.log("Entro al logout");
            setCurrentUser();
            setIsLoggedIn(false);
          };

    /**
     * This function retrieves and sets the details of a product based on its slug using useEffect hook
     * in TypeScript React.
     * @param slug - The "slug" parameter is likely a string that represents a unique identifier for a
     * specific product. It is used as an input to the "detailProductBySlug" function to retrieve
     * details about the product from an API endpoint.
     */
    const detailProductBySlug = (slug) => {
        detailProduct(slug)
        .then((res) => {
            // console.log(res);
            setDetailProducts(res.data);
            console.log("Detalle del producto", res.data.variation);
        })
        .catch((err) => console.log(err));
    }

    useEffect(()=> {
        
        if(slug){
            detailProductBySlug(slug);
        }
        history.push(history.location.pathname);
        
    }, [slug, isLoggedIn]);

    useEffect(()=> {
        if(currenUser){
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        
    }, [currenUser])
  
  return (
    <div className='container'>
        <div className="containerDetalle">
        <div className="containerIzq">
        {detailProducts && detailProducts.images && detailProducts.images.length > 0 && (

                <Card className='cardImgProduct'>
                <div className="containerImgTop">
                    <img src={currentImg || baseUrlImage + detailProducts.images[0]} alt={detailProducts.name}/>
                </div>
                <div className="containerImgMiniature">
                    {detailProducts.images.map((imgProduct, index) => (

                        <img src={baseUrlImage + imgProduct} 
                        alt={detailProducts.name} 
                        key={index} 
                        onClick={()=>setCurrentImage(baseUrlImage + imgProduct)}
                        className={currentImg === baseUrlImage + imgProduct ? 'activeMiniature' : ''}/>
                        
                    ))}
                </div>
            </Card>
        )}
        </div>
        <div className="containerDer">
            <div className="containerCharacteristicTop">
                <div className='characteristic'>10 Reseñas</div>
                <div className='characteristic'>28 Pedidos</div>
                <div className='characteristic'>40 Favoritos</div>
            </div>
            <div className="containerNameProduct">
                {/* <h4>iPhone 14 Pro Max 256 GB </h4>  */}

                    <h4>{detailProducts.name}</h4> 
                    <h5>${detailProducts.unit_price && detailProducts.unit_price.toLocaleString()}</h5>
            </div>
            <div className="containerColorsProduct">
                <p>Colores</p>

                {detailProducts.variation && detailProducts.variation.map((colors, index) => (

                    <a href="#" key={index}>
                    
                    {colors.type}
                    {/* <svg width="16" height="16">
                    <circle cx="8" cy="8" r="7" fill="blanco" />
                    </svg> */}

                    </a>
                ))}
                {/* <a href="#">
                    Blanco
                    <svg width="16" height="16">
                    <circle cx="8" cy="8" r="7" fill="#FFFFFF" />
                    </svg>
                </a> */}
            </div>
            <div className="cant">
                <p>Cantidad</p>
                <input type="number" />
            </div>
            <div className="opciones">
                <a href="#" className='addCart' onClick={addToCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FC5241" className="bi bi-cart3" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <p>Añadir al carrito</p>
                </a>
                
                <a href="#" className='buyNow' onClick={buyNow}>
                    <p>Comprar ahora</p>
                </a>
                <a href="#" className='fav'>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='svgFav'>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16977 8.31899C9.38258 5.76021 13.0251 5.76021 15.2379 8.31899L15.9999 9.20013L16.7619 8.31899C18.9747 5.76021 22.6172 5.76021 24.83 8.31899C26.6657 10.4417 26.9852 13.7669 25.2901 16.1259C24.545 17.1629 23.6408 18.3392 22.6001 19.5426C21.0155 21.3749 19.5019 22.8434 18.3834 23.8548C17.8238 24.3608 17.3622 24.7532 17.0389 25.0203C16.8773 25.1539 16.7501 25.2562 16.6625 25.3258C16.6187 25.3606 16.5848 25.3872 16.5613 25.4055L16.5342 25.4266L16.5266 25.4324L16.5237 25.4347C16.5236 25.4347 16.5232 25.435 16.0368 24.7999C15.5582 25.441 15.5581 25.4409 15.558 25.4408L15.5547 25.4383L15.5469 25.4325L15.519 25.4113C15.4949 25.393 15.4601 25.3664 15.4152 25.3315C15.3253 25.2618 15.1951 25.1594 15.0297 25.0257C14.699 24.7584 14.2276 24.3657 13.6582 23.8592C12.5201 22.8471 10.9862 21.3771 9.3997 19.5426C8.35898 18.3392 7.45476 17.1629 6.70966 16.1259C5.01456 13.7669 5.33408 10.4417 7.16977 8.31899ZM16.0368 24.7999L15.558 25.4408L16.043 25.8028L16.5237 25.4347L16.0368 24.7999ZM16.0309 23.7777C16.3373 23.5243 16.7765 23.1507 17.3103 22.6681C18.3915 21.6904 19.8569 20.2686 21.3898 18.496C22.3938 17.3351 23.2684 16.1976 23.9908 15.1923C25.2159 13.4873 25.0151 10.9791 23.6198 9.36558C22.0451 7.54468 19.5468 7.54468 17.9721 9.36558L15.9999 11.6462L14.0277 9.36558C12.453 7.54468 9.9547 7.54468 8.38 9.36558C6.98464 10.9791 6.78389 13.4873 8.009 15.1923C8.73136 16.1976 9.60598 17.3351 10.6099 18.496C12.1409 20.2664 13.623 21.6867 14.7215 22.6636C15.2676 23.1493 15.7179 23.5245 16.0309 23.7777Z" fill="black"/>
                    </svg>
                </a>
                
                <Modal
                    className="modal-dialog-centered modal-sm"
                    toggle={() => setModalViewCart(false)}
                    isOpen={modalViewCart}
                    >
                    <ModalBody>
                        <AddCart closeModalCart={closeModalCart} detailsProducts={detailProducts} />
                    </ModalBody>
                </Modal>
                <Modal
                    className="modal-dialog-centered modal-lg"
                    toggle={() => setModalViewLogin(false)}
                    isOpen={modalViewLogin && !changeFormLogin}
                    >
                    <ModalBody>
                    <Login closeModalLogin={closeModalLogin}  handleLogin={handleLogin}  closeModalRegistro={closeModalRegistro}  handleChangeFormLogin={handleChangeFormLogin} changeFormRegister={changeFormRegister} />
                    </ModalBody>
                </Modal>
                <Modal
                    className="modal-dialog-centered modal-lg"
                    toggle={() => setModalViewRegistro(false)}
                    isOpen={modalViewRegistro && !changeFormRegister}
                >
                    <ModalBody>
                    <Register closeModalRegistro={closeModalRegistro} handleChangeFormRegister={handleChangeFormRegister} />
                    </ModalBody>
                </Modal>
                
            </div>
        </div>
        
        </div>
        <div className="containerDescription">
            <h5>Descripcion</h5>
            <p>
                {detailProducts.details}
            </p>
        </div>
        <div className="opinions">
            <div className="raitingLeft">
                <div className="raiting">
                    <div className="raitingTop">
                        <Card className='cardRaiting'>
                            <CardBody>
                                <h2>5,0</h2>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="raitingStarts">
                        <div className="starts">
                        <img src={start} alt="" />
                        <img src={start} alt="" />
                        <img src={start} alt="" />
                        <img src={start} alt="" />
                        <img src={start} alt="" />
                        </div>
                        <div className="nrOpinions">
                            <h6>10 Opiniones</h6>
                        </div>
                    </div>
                </div>
                <div className="stats">
                    <div className="stats_raiting">
                        <img src={start} alt="" />
                        <h5>5</h5>
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{width: '100%'}}></div>
                        </div>
                        <h6>10</h6>
                    </div>
                    <div className="stats_raiting_gray">
                        <img src={start} alt="" />
                        <h5>4</h5>
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{width: '100%'}}></div>
                        </div>
                        <h6>0</h6>
                    </div>
                    <div className="stats_raiting_gray">
                        <img src={start} alt="" />
                        <h5>3</h5>
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{width: '100%'}}></div>
                        </div>
                        <h6>0</h6>
                    </div>
                    <div className="stats_raiting_gray">
                        <img src={start} alt="" />
                        <h5>2</h5>
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{width: '100%'}}></div>
                        </div>
                        <h6>0</h6>
                    </div>
                    <div className="stats_raiting_gray">
                        <img src={start} alt="" />
                        <h5>1</h5>
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{width: '100%'}}></div>
                        </div>
                        <h6>0</h6>
                    </div>
                </div>
            </div>
            
            <div className="comments">
                <div className="comment">
                    <div className="comment_index">
                        <h6>Juan Antonio R</h6>
                        <div className="starts">
                        <h5>15/09/2016</h5>
                        <div className="starts_comments">
                            <img src={start} alt="" />
                            <img src={start} alt="" />
                            <img src={start} alt="" />
                            <img src={start} alt="" />
                            <img src={start} alt="" />
                        </div>
                        </div>
                        
                    </div>
                    <div className="dateComment">
                        <p>
                            Excelente producto, llego tal como lo esperaba.
                            
                        </p>
                    
                    </div>
                </div>
                <div className="comment">
                    <div className="comment_index">
                        <h6>Juan Antonio R</h6>
                        <div className="starts">
                        <h5>15/09/2016</h5>
                        <div className="starts_comments">
                            <img src={start} alt="" />
                            <img src={start} alt="" />
                            <img src={start} alt="" />
                            <img src={start} alt="" />
                            <img src={start} alt="" />
                        </div>
                        </div>
                        
                    </div>
                    <div className="dateComment">
                        <p>
                            Excelente producto, llego tal como lo esperaba.
                            
                        </p>
                    
                    </div>
                </div>
                <div className="comment">
                    <div className="comment_index">
                        <h6>Juan Antonio R</h6>
                        <div className="starts">
                        <h5>15/09/2016</h5>
                        <div className="starts_comments">
                            <img src={start} alt="" />
                            <img src={start} alt="" />
                            <img src={start} alt="" />
                            <img src={start} alt="" />
                            <img src={start} alt="" />
                        </div>
                        </div>
                        
                    </div>
                    <div className="dateComment">
                        <p>
                            Excelente producto, llego tal como lo esperaba.
                            
                        </p>
                    
                    </div>
                </div>
                <div className="btnMoreOpinions">
                    <a href="#">Ver todas las opiniones</a>
                </div>
            </div>
        </div>
    
    </div>
  )
}

export default DetailProduct
