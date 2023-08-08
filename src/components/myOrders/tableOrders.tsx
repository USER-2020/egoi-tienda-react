import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, Table } from 'reactstrap'
import ModalCancelarPedido from './modalesOrdenes/modalCancelarPedido';
import { getOrdenes } from '../../services/ordenes';
import { getCurrentUser } from '../../helpers/Utils';

/* Styles */
import './table_styles.css';


function TableOrders({ setOrderDetalleId }) {

    const [ordenes, setOrdenes] = useState([]);


    const currenUser = getCurrentUser();
    const token = currenUser.token;

    const getAllPedidos = () => {
        getOrdenes(token)
            .then((res) => {
                console.log("Estas son las ordenes", res.data);
                setOrdenes(res.data);
            }).catch((err) => console.log(err));
    }

    const [modalCancelOrder, setModalCancelOrder] = useState(false);

    const closeModalCancelOrder = () => {
        setModalCancelOrder(false);
    }

    const sendId = (orderDetalleId) => {
        console.log("desde la tabla", orderDetalleId);
        setOrderDetalleId(orderDetalleId);

    }

    useEffect(() => {
        if (token) {
            getAllPedidos();

        }

    }, [token])
    return (
        <>

            <div className='tablaContenedor'>
                <Table>
                    <thead>
                        <tr>
                            <th>Pedido #</th>
                            <th>Pedido Fecha</th>
                            <th>Estatus</th>
                            <th>Total</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes && ordenes.slice().reverse().map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{new Date(item.updated_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }).replace(/\//g, '-')}</td>
                                <td><svg width="15" height="15">
                                    <circle
                                        cx="8"
                                        cy="8"
                                        r="5"
                                        fill={
                                            item.order_status === 'canceled' ? 'red' :
                                            item.order_status === 'pending' ? 'yellow' :
                                            item.order_status === 'processing' ? '#009ddd' :
                                            item.order_status === 'returned' ? '#ff0048' :
                                            item.order_status === 'failed' ? 'red' :
                                            item.order_status === 'delivered' ? 'green' :
                                            item.order_status === 'out_for_delivery' ? 'green' :
                                            'white'
                                          }
                                          
                                    />
                                </svg>
                                {item.order_status === 'canceled' ? 'cancelado' : '' ||
                                item.order_status === 'pending' ? 'pendiente' : '' ||
                                item.order_status === 'processing' ? 'procesando' : '' ||
                                item.order_status === 'out_for_delivery' ? 'Enviando' : '' ||
                                item.order_status === 'delivered' ? 'enviado' : ''
                                }
                                </td>
                                <td>${item.order_amount.toLocaleString()}</td>
                                <td>
                                    <div className="opcionesDetallePedido">
                                        <a href="#" className=" btn btnVerDetallesPedido" onClick={() => sendId(item.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>
                                            Ver
                                        </a>
                                        <a href="#" className=" btn btnCancelarPedido" onClick={() => setModalCancelOrder(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg>
                                            Cancelar
                                        </a>
                                    </div>
                                    <div className="opcionesDetallePedidoResponsive">
                                        <a href="#" className=" btn btnVerDetallesPedido" onClick={() => sendId(item.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>

                                        </a>
                                        <a href="#" className=" btn btnCancelarPedido" onClick={() => setModalCancelOrder(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg>

                                        </a>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div >
            {/* Modal de cancelar pedido */}
            < Modal
                className="modal-dialog-centered modal-sm"
                toggle={() => closeModalCancelOrder()
                }
                isOpen={modalCancelOrder}
            >
                <ModalBody>
                    <ModalCancelarPedido />
                </ModalBody>

            </Modal>
        </>
    )
}

export default TableOrders
