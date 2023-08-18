import React, { useEffect, useState } from 'react'
import heartGroup from '../../assets/egoi_icons/Heart_Group.svg';
import './lista_Deseos.css'
import { Card, Modal, ModalBody } from 'reactstrap';
import ModaEliminarProductoListaPedido from './modales/modaEliminarProductoListaPedido.tsx';
import { deleteProductWishList, getWishList } from '../../services/ordenes';
import { getCurrentUser } from '../../helpers/Utils';
import { Link } from 'react-router-dom';

function Lista() {

    const [modalDeleteFavProduct, setModalDeleteFavProduct] = useState(false);
    const [wishListProducts, setWishListProducts] = useState([]);
    const [DeleteId, setDeleteId] = useState('');

    const currenUser = getCurrentUser();
    const token = currenUser.token;

    /* Imagenes */
    const baseUrlImageThumbnail = "https://egoi.xyz/storage/app/public/product/thumbnail/";


    const getAllProductsWishList = () => {
        getWishList(token)
            .then((res) => {
                // console.log("Productos de lista de desos", res.data);
                setWishListProducts(res.data);
            }).catch((err) => console.log(err));
    }

    const closeModalDeleteFavProduct = () => {
        setModalDeleteFavProduct(false);
    }

    const deleteItemProductWhish = (idProducto) => {
        deleteProductWishList(token, idProducto)
            .then((res) => {
                // console.log(res.data);
                getAllProductsWishList();
            }).catch((err) => console.log(err));
    }

    useEffect(() => {
        if (token) {
            getAllProductsWishList();

        }
    }, [])

    return (
        <>
            <div>
                {wishListProducts && wishListProducts.length > 0 ? (




                    <div className='productosListaDeseo'>
                        {wishListProducts.map((item, index) => (
                            <Link to={`/detailsProduct/${item.product.id}/${item.product.slug}`}>
                                <a href="#">
                                    <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <div className="imgListaDeseosAndDescription">
                                            <img src={baseUrlImageThumbnail + item.product.thumbnail} alt="" width={'100px'} height={'100px'} />

                                            <div className="listaDeseosDescripcion">
                                                <h6>{item.product.name}</h6>
                                                <p>${item.product.unit_price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="listaDeseosBtn">
                                            <a href="#" onClick={() => {
                                                setModalDeleteFavProduct(true);
                                                deleteItemProductWhish(item.product_id);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                </svg>
                                            </a>
                                        </div>

                                    </Card>
                                </a>
                            </Link>
                        ))}
                    </div>

                ) : (


                    <div className='noProductosListaDeseo'>
                        <img src={heartGroup} alt="" />
                        <div className="noProductosListaDeseoContexto">
                            <p>No tienes ningún artículo en
                                tu lista de deseos
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <Modal
                className="modal-dialog-centered modal-sm"
                toggle={() => closeModalDeleteFavProduct()}
                isOpen={modalDeleteFavProduct}
            >
                <ModalBody>
                    <ModaEliminarProductoListaPedido closeModalEliminarProductoListaPedido={closeModalDeleteFavProduct}
                    />
                </ModalBody>
            </Modal>
        </>
    )
}

export default Lista
