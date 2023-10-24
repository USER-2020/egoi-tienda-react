import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, Table } from 'reactstrap'
import ModalCancelarPedido from './modalesOrdenes/modalCancelarPedido';
import { getOrdenes, getOrdenesV2 } from '../../services/ordenes';
import { getCurrentUser } from '../../helpers/Utils';

/* Styles */
import './table_styles.css';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';


function TableOrders({ setOrderDetalleId }) {

    const [ordenes, setOrdenes] = useState([]);
    const [ordenesV2, setOrdenesV2] = useState([]);


    const currenUser = getCurrentUser();
    const token = currenUser.token;

    const history = useHistory();
    const location = useLocation();

    const getAllPedidos = () => {
        getOrdenes(token)
            .then((res) => {
                // console.log("Estas son las ordenes", res.data);
                setOrdenes(res.data);
            }).catch((err) => console.log(err));
    }

    const getAllPedidosV2 = () => {
        getOrdenesV2(token)
            .then((res) => {
                console.log("Estas son las ordenes", res.data);
                setOrdenesV2(res.data);
            }).catch((err) => console.log(err));
    }

    const [modalCancelOrder, setModalCancelOrder] = useState(false);

    const closeModalCancelOrder = () => {
        setModalCancelOrder(false);
    }

    const sendId = (orderDetalleId) => {
        // console.log("desde la tabla", orderDetalleId);
        // Obtener los parámetros de la ubicación actual
        // const searchParams = new URLSearchParams(location.search);
        // const activeOption = searchParams.get('activeOption');
        // const selectedOption = searchParams.get('selectedOption');

        // // Cambiar el pathname y agregar parámetros a la ruta
        // history.push(`/myorders?activeOption=DetallePedido&selectedOption=Detalle%20de%20pedido`);
        setOrderDetalleId(orderDetalleId);

    }

    // Define una función para obtener la clase de color del badge
    function getStatusColorClass(orderStatus) {
        switch (orderStatus) {
            case 'confirmed':
                return 'bg-success'; // Clase de Bootstrap para el color verde
            case 'canceled':
                return 'bg-danger'; // Clase de Bootstrap para el color rojo
            case 'failed':
                return 'bg-danger'; // Clase de Bootstrap para el color rojo
            case 'pending':
                return 'bg-warning'; // Clase de Bootstrap para el color amarillo
            case 'processing':
                return 'bg-primary'; // Clase de Bootstrap para el color azul
            case 'out_for_delivery':
                return 'bg-info'; // Clase de Bootstrap para el color azul claro
            case 'delivered':
                return 'bg-success'; // Clase de Bootstrap para el color verde
            default:
                return 'bg-light'; // Clase de Bootstrap para un fondo claro (blanco)
        }
    }


    useEffect(() => {
        if (token) {
            getAllPedidos();
            getAllPedidosV2();
            console.log(token);
        }


    }, [token]);

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
                    <tbody className='tbodyTableDesktop'>
                        {ordenesV2 && ordenesV2.slice().reverse().map((item, index) => (
                            <tr key={index}>
                                <td>{item.id_orden}</td>
                                <td>{new Date(item.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }).replace(/\//g, '-')}</td>
                                <td><svg width="20" height="20">
                                    <circle
                                        cx="8"
                                        cy="8"
                                        r="8"
                                        fill={
                                            item.order_status === 'confirmed' ? 'green' :
                                                item.order_status === 'canceled' ? 'red' :
                                                    item.order_status === 'failed' ? 'red' :
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
                                    {
                                        item.order_status === 'confirmed' ? 'Confirmado' : '' ||
                                            item.order_status === 'canceled' ? 'Cancelado' : '' ||
                                                item.order_status === 'failed' ? 'Cancelado' : '' ||
                                                    item.order_status === 'pending' ? 'Pendiente' : '' ||
                                                        item.order_status === 'processing' ? 'Procesando' : '' ||
                                                            item.order_status === 'out_for_delivery' ? 'Enviando' : '' ||
                                                                item.order_status === 'delivered' ? 'Enviado' : ''
                                    }
                                </td>
                                <td>
                                    ${(item.total <= 79990 && item.total >= 39990) ?
                                        (item.total + (item.total <= 79990 && item.total >= 39990 ? parseInt(item.envio) : 0)).toLocaleString('es') :
                                        item.total.toLocaleString('es')}
                                </td>


                                <td>
                                    <div className="opcionesDetallePedido">
                                        <a href="#" className=" btn btnVerDetallesPedido" onClick={(e) => { e.preventDefault(); sendId(item.order_group_id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>
                                            Ver
                                        </a>
                                        <a href="#" className=" btn btnCancelarPedido" onClick={(e) => { e.preventDefault(); setModalCancelOrder(true) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg>
                                            Cancelar
                                        </a>
                                    </div>
                                    <div className="opcionesDetallePedidoResponsive">
                                        <a href="#" className=" btn btnVerDetallesPedido" onClick={(e) => { e.preventDefault(); sendId(item.order_group_id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>

                                        </a>
                                        <a href="#" className=" btn btnCancelarPedido" onClick={(e) => { e.preventDefault(); setModalCancelOrder(true) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg>

                                        </a>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tbody className='tbodyTableResponsive'>
                        {ordenesV2 && ordenesV2.slice().reverse().map((item, index) => (
                            <tr key={index}>
                                <td>{item.id_orden}</td>
                                <td>{new Date(item.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }).replace(/\//g, '-')}</td>
                                <td>
                                    <span className={`badge text-${getStatusColorClass(item.order_status)}`}>
                                        {
                                            item.order_status === 'confirmed' ? 'Confirmado' : '' ||
                                                item.order_status === 'canceled' ? 'Cancelado' : '' ||
                                                    item.order_status === 'failed' ? 'Cancelado' : '' ||
                                                        item.order_status === 'pending' ? 'Pendiente' : '' ||
                                                            item.order_status === 'processing' ? 'Procesando' : '' ||
                                                                item.order_status === 'out_for_delivery' ? 'Enviando' : '' ||
                                                                    item.order_status === 'delivered' ? 'Enviado' : ''
                                        }</span>
                                </td>
                                <td>
                                    ${(item.total <= 79990 && item.total >= 39990) ?
                                        (item.total + (item.total <= 79990 && item.total >= 39990 ? parseInt(item.envio) : 0)).toLocaleString('es') :
                                        item.total.toLocaleString('es')}
                                </td>


                                <td>
                                    <div className="opcionesDetallePedido">
                                        <a href="#" className=" btn btnVerDetallesPedido" onClick={(e) => { e.preventDefault(); sendId(item.order_group_id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>
                                            Ver
                                        </a>
                                        <a href="#" className=" btn btnCancelarPedido" onClick={(e) => { e.preventDefault(); setModalCancelOrder(true) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg>
                                            Cancelar
                                        </a>
                                    </div>
                                    <div className="opcionesDetallePedidoResponsive">
                                        <a href="#" className=" btn btnVerDetallesPedido" onClick={(e) => { e.preventDefault(); sendId(item.order_group_id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>

                                        </a>
                                        <a href="#" className=" btn btnCancelarPedido" onClick={(e) => { e.preventDefault(); setModalCancelOrder(true) }}>
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
                    <ModalCancelarPedido setModalCancelarPedido={closeModalCancelOrder} />
                </ModalBody>

            </Modal >
        </>
    )
}

export default TableOrders
