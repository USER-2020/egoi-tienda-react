import React, { useState } from 'react'
import heartGroup from '../../assets/egoi_icons/Heart_Group.svg';
import './lista_Deseos.css'
import { Card, Modal, ModalBody } from 'reactstrap';
import ModaEliminarProductoListaPedido from './modales/modaEliminarProductoListaPedido.tsx';

function Lista() {

    const [modalDeleteFavProduct, setModalDeleteFavProduct] = useState(false);

    const closeModalDeleteFavProduct = () =>{
        setModalDeleteFavProduct(false);
    }

    return (
        <>
            <div>

                <div className='productosListaDeseo'>
                    <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className="imgListaDeseosAndDescription">
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <rect width="72" height="72" fill="url(#pattern0)" />
                                <defs>
                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlinkHref="#image0_1645_2253" transform="scale(0.000416667)" />
                                    </pattern>
                                </defs>
                            </svg>

                            <div className="listaDeseosDescripcion">
                                <h6>iPhone 14 Pro Max 256 GB</h6>
                                <p>$ 8’000.000</p>
                            </div>
                        </div>
                        <div className="listaDeseosBtn">
                            <a href="#" onClick={()=>setModalDeleteFavProduct(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                </svg>
                            </a>
                        </div>

                    </Card>
                </div>
                <div className='noProductosListaDeseo'>
                    <img src={heartGroup} alt="" />
                    <div className="noProductosListaDeseoContexto">
                        <p>No tienes ningún artículo en
                            tu lista de deseos
                        </p>
                    </div>
                </div>
            </div>

            <Modal
                className="modal-dialog-centered modal-sm"
                toggle={() => closeModalDeleteFavProduct()}
                isOpen={modalDeleteFavProduct}
            >
                <ModalBody>
                    <ModaEliminarProductoListaPedido closeModalEliminarProductoListaPedido={closeModalDeleteFavProduct}/>
                </ModalBody>
            </Modal>
        </>
    )
}

export default Lista