import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import "../../styles/recientes.css";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import celRecent from '../../assets/celularReciente.png';
import start from '../../assets/egoi_icons/star-fill.svg';
import startEmpty from '../../assets/egoi_icons/star-fill-gray.svg';
import start_1 from '../../assets/Star-1.png';
import imgCA from '../../assets/celularesAccesorioscyberday.png';
import ps5 from '../../assets/ps5categoria.png';
import tvAV from '../../assets/tvyvideocategoria.png';
import xbox from '../../assets/xboxcategoria.png';
import { ProductosRecientes } from '../../services/productos';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { allCategories, subcategorieById } from '../../services/categories';
import { detailProductById } from '../../services/detailProduct';
import { getProductsByIdBrand } from '../../services/brands';
import { getOfferHigligth, getOfferOfDay, getProductsByIdOfferHigh } from '../../services/ofertas';

const OfertaDestacada = () => {
    const [products, setProducts] = useState([]);
    const [idDestacado, setIdDestacado] = useState('');

    const containerRef = useRef(null);

    const history = useHistory();

    const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";


    // Función para agregar un producto a la lista de vistos recientemente
    const agregarProductoVisto = (product) => {
        // Obtén los productos vistos recientemente del almacenamiento local
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

        // Agrega el producto actual a la lista de productos vistos recientemente
        const updatedRecentlyViewed = [product, ...recentlyViewed];

        // Limita la lista a un cierto número de productos si es necesario
        const maxItems = 15;
        const limitedList = updatedRecentlyViewed.slice(0, maxItems);

        // Almacena la lista actualizada en el almacenamiento local
        localStorage.setItem('recentlyViewed', JSON.stringify(limitedList));
    }

    const handleScrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= 500; // Ajusta el valor según tus necesidades
        }
        const leftButton = document.querySelector('.scroll-button.left');
        leftButton.classList.add('animate-left');
        setTimeout(() => {
            leftButton.classList.remove('animate-left');
        }, 300);
    };

    const handleScrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += 500; // Ajusta el valor según tus necesidades
        }
        const rightButton = document.querySelector('.scroll-button.right');
        rightButton.classList.add('animate-right');
        setTimeout(() => {
            rightButton.classList.remove('animate-right');
        }, 300);
    };

    const getOfferDestacada = () => {
        getOfferHigligth()
            .then((res) => {
                console.log(res.data);
                setIdDestacado(res.data.id);
                getByIdOffer(res.data.id);
            }).catch((err) => console.log(err));
    }

    const getByIdOffer = (idOffer) => {
        getProductsByIdOfferHigh(idOffer)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data.products);
            }).catch((err) => console.log(err));
    }
    useEffect(() => {
        getOfferDestacada();

    }, []);
    return (
        <>
            {idDestacado !== '' && products !== undefined ? (
                <div className='container'>
                    <div className='containerRecents'>
                        <div className='spanRecent' style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                            </svg>
                            <h4>Oferta destacada</h4>
                            {/* <Link to='/addRecently'>
                            <a href='#' className='refshowAll'>
                                Ver todos
                            </a>
                        </Link> */}
                        </div>
                        <div className='containerProductos1' ref={containerRef}>
                            {products && products.length >= 5 && (
                                <button className="scroll-button left" onClick={handleScrollLeft} onMouseOver={handleScrollLeft}>
                                    &#8249;
                                </button>
                            )}
                            <div className="cardContainer">
                                {products.map((product, index) => (

                                    <a href='#' className='containerCard' key={index}>
                                        <Link to={`/detailsProduct/${product.id}/${product.slug}`} onClick={() => agregarProductoVisto(product)}>
                                            <Card className='cardProducto1' style={{ height: "330px" }}  >
                                                <CardImg top width="80%" src={baseUrlImage + product.images[0]} alt={product.name} />
                                                <CardBody>
                                                    <div className='starts'>
                                                        {[...Array(5)].map((_, index) => (
                                                            <img
                                                                key={index}
                                                                src={index < product.count_rating ? start : startEmpty}
                                                                alt=""
                                                            />
                                                        ))}
                                                    </div>
                                                    {product.unit_price >= 79990 || product.discount_valor >= 79900 || product.dicount_tag_valor >= 79900 ? (
                                                        <div style={{ display: 'flex', flexDirection: "row", color: 'green', gap: '5px' }}>
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ alignSelf: 'center' }}>
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.5738 6.63403C13.1555 6.60036 12.6195 6.5999 11.8575 6.5999H5.53365C5.20228 6.5999 4.93365 6.33126 4.93366 5.99989C4.93367 5.66852 5.2023 5.3999 5.53367 5.3999L11.8831 5.3999C12.6136 5.3999 13.1979 5.39989 13.6701 5.4379C14.1544 5.4769 14.5729 5.5588 14.9581 5.7522C15.5758 6.0623 16.0796 6.55796 16.3959 7.16963C16.5937 7.5522 16.6774 7.96782 16.7171 8.44703C16.7394 8.71606 16.7488 9.02184 16.7528 9.37049H17.3906C18.2149 9.37049 18.8697 9.37048 19.3978 9.413C19.9382 9.4565 20.3981 9.54742 20.8192 9.75885C21.5001 10.1007 22.0553 10.647 22.4038 11.3209C22.6199 11.7388 22.7127 12.1953 22.757 12.7297C22.8002 13.2511 22.8002 13.8972 22.8002 14.7086V15.6375C22.8002 15.8056 22.8002 15.9662 22.789 16.1018C22.7767 16.2499 22.748 16.4204 22.66 16.5906C22.5368 16.8288 22.3412 17.0207 22.1027 17.1405C21.933 17.2257 21.7633 17.2535 21.6149 17.2654C21.4785 17.2764 21.3164 17.2764 21.1453 17.2764L21.0251 17.2764C20.7695 18.0488 20.034 18.5999 19.178 18.5999C18.322 18.5999 17.5865 18.0487 17.3309 17.2764H9.94356C9.68799 18.0488 8.95248 18.5999 8.09648 18.5999C7.22063 18.5999 6.47092 18.0229 6.2324 17.2223C5.98721 17.21 5.79037 17.2042 5.53366 17.2042C5.20229 17.2042 4.93366 16.9356 4.93366 16.6042C4.93366 16.2729 5.20229 16.0042 5.53366 16.0042C5.80655 16.0042 6.02013 16.0104 6.26817 16.0226C6.53951 15.2784 7.26044 14.7528 8.09648 14.7528C8.95248 14.7528 9.68799 15.304 9.94356 16.0764H15.5557V10.2352C15.5557 9.4839 15.5553 8.95705 15.5212 8.54619C15.4877 8.1426 15.425 7.90448 15.33 7.72082C15.1312 7.33633 14.813 7.0221 14.4197 6.82463C14.2303 6.72952 13.9853 6.66716 13.5738 6.63403ZM16.7557 10.5705V16.0764H17.3309C17.5865 15.304 18.322 14.7528 19.178 14.7528C20.034 14.7528 20.7695 15.304 21.0251 16.0764H21.1256C21.3235 16.0764 21.4363 16.0759 21.5186 16.0693C21.547 16.067 21.5642 16.0644 21.5732 16.0628C21.5789 16.0588 21.5838 16.0542 21.5876 16.0493C21.5891 16.0404 21.5912 16.0255 21.5931 16.0026C21.5997 15.9228 21.6002 15.8129 21.6002 15.6175V14.7352C21.6002 13.8912 21.5997 13.2949 21.5611 12.8289C21.523 12.3701 21.4511 12.0911 21.3378 11.8721C21.1068 11.4253 20.7373 11.0605 20.2808 10.8313C20.0555 10.7181 19.769 10.6468 19.3015 10.6091C18.8272 10.5709 18.2207 10.5705 17.3646 10.5705H16.7557ZM2.71131 9.7499C2.71131 9.41853 2.97994 9.1499 3.31131 9.1499H7.08909C7.42046 9.1499 7.68909 9.41853 7.68909 9.7499C7.68909 10.0813 7.42046 10.3499 7.08909 10.3499H3.31131C2.97994 10.3499 2.71131 10.0813 2.71131 9.7499ZM1.2002 12.7499C1.2002 12.4185 1.46882 12.1499 1.8002 12.1499H7.84465C8.17602 12.1499 8.44465 12.4185 8.44465 12.7499C8.44465 13.0813 8.17602 13.3499 7.84465 13.3499H1.8002C1.46882 13.3499 1.2002 13.0813 1.2002 12.7499ZM8.09648 15.9528C7.68264 15.9528 7.36075 16.2775 7.3534 16.6624L7.35327 16.6764C7.35327 17.0676 7.67764 17.3999 8.09648 17.3999C8.51533 17.3999 8.83969 17.0676 8.83969 16.6764C8.83969 16.2851 8.51533 15.9528 8.09648 15.9528ZM19.178 15.9528C18.7591 15.9528 18.4348 16.2851 18.4348 16.6764C18.4348 17.0676 18.7591 17.3999 19.178 17.3999C19.5968 17.3999 19.9212 17.0676 19.9212 16.6764C19.9212 16.2851 19.5968 15.9528 19.178 15.9528Z" fill="#089705" />
                                                            </svg>
                                                            <p style={{ marginBottom: '0' }}>Envío gratis</p>
                                                        </div>
                                                    ) : (
                                                        <div style={{ display: 'flex', flexDirection: "row", color: 'white', gap: '5px' }}>
                                                            <p style={{ marginBottom: '0' }}>Envío gratis</p>
                                                        </div>
                                                    )}
                                                    <CardSubtitle tag="h5" className="text-wrap text-muted" style={{ lineHeight: "1.2", maxHeight: "none", overflow: "visible", fontSize: '16px' }}>
                                                        {product && product.name ? (product.name.length < 30 ? product.name : product.name.slice(0, 30) + '...') : ''}
                                                    </CardSubtitle>

                                                    <CardTitle tag="h5">
                                                        {product.discount_tag_valor > 0 || product.discount_valor > 0 ? (
                                                            <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignSelf: 'center' }}>
                                                                <h5>${product.discount_valor && product.discount_valor.toLocaleString('es') || product.discount_tag_valor && product.discount_tag_valor.toLocaleString('es')}</h5>
                                                                <h5 id='tachado'><s>${product.unit_price && product.unit_price.toLocaleString('es')}</s></h5>
                                                            </div>

                                                        ) : (
                                                            <h5>${product.unit_price && product.unit_price.toLocaleString('es')}</h5>
                                                        )}
                                                    </CardTitle>
                                                </CardBody>
                                            </Card>
                                        </Link>
                                    </a>
                                ))}
                            </div>
                            {products && products.length >= 5 && (
                                <button className="scroll-button right" onClick={handleScrollRight} onMouseOver={handleScrollRight}>
                                    &#8250;
                                </button>
                            )}
                        </div>
                    </div>

                </div>

            ) : (null)}
        </>
    )
}

export default OfertaDestacada
