import React, { useEffect, useState } from 'react'
import './track_Order.css';
import { getOrdenDetalleById } from '../../services/ordenes';
import { getCurrentUser } from '../../helpers/Utils';

function ModalDetallePedido({ closeModalDetallePedido, orderDetalleId }) {

    const [detalleOrden, setDetalleOrden] = useState([]);

    const handleChangueModal = () => {
        closeModalDetallePedido();
    }

    const currenUser = getCurrentUser();
    const token = currenUser.token;

    /* baseImagen */
    const baseUrlImageThumbnail = "https://egoi.xyz/storage/app/public/product/thumbnail/";

    const getDetailPedido = () => {
        getOrdenDetalleById(token, orderDetalleId)
            .then((res) => {
                console.log("Detalle de pedido por id desde el modal de orderTrack", res.data);
                setDetalleOrden(res.data);
            }).catch((err) => console.log(err));
    }

    const calcSubtotal = () => {
        const subtotal = detalleOrden.reduce((total, itemProduct) => total + itemProduct.price, 0);
        return subtotal.toLocaleString('en', { style: 'currency', currency: 'COP' });
    }

    const calcDiscount = () => {
        const descuento = detalleOrden.reduce((total, itemProduct) => total + itemProduct.discount, 0);
        return descuento.toLocaleString('en', { style: 'currency', currency: 'COP' });
    }

    const calcShippingCost = () => {
        const costShipping = detalleOrden.reduce((total, itemProduct)=> total + itemProduct.product_details.shipping_cost, 0);
        return costShipping.toLocaleString('en', { style: 'currency', currency: 'COP' });
    }

    const calTotal = () => {
        const subtotal = detalleOrden.reduce((total, itemProduct) => total + itemProduct.price, 0);
        const descuento = detalleOrden.reduce((total, itemProduct) => total + itemProduct.discount, 0);
        const costShipping = detalleOrden.reduce((total, itemProduct)=> total + itemProduct.product_details.shipping_cost, 0);
        const totalPurchase = subtotal - descuento + costShipping;
        return totalPurchase.toLocaleString('en', { style: 'currency', currency: 'COP' });
      };

    useEffect(() => {
        if (orderDetalleId && token) {
            getDetailPedido();
        }
    }, []);

    return (
        <div>
            <div className='modalDetallePedidoHeader'>
               
                <div className="cardsProductsDetailOrder" style={{
                    display: 'flex', flexDirection: 'column',
                    gap: '25px', alignSelf: 'center',
                    justifyContent: 'center', marginBottom: '45px'
                }}>
                    {detalleOrden && detalleOrden.map((itemProduct, index) => (
                        <img src={baseUrlImageThumbnail + itemProduct.product_details.thumbnail} alt="" style={{
                            width: '100px',
                            heigth: '100px',

                        }} />

                    ))}
                </div>

                <div className="descriptionHeader">
                    {detalleOrden && detalleOrden.map((itemProduct, index) => (
                        <>
                            <h6>
                                {itemProduct.product_details.name}
                            </h6>
                            <p className='precio'>${itemProduct.price.toLocaleString('en')}</p>
                            <p className='cantidad'>Cantidad: {itemProduct.qty}</p>
                        </>
                    ))}
                </div>

            </div>
            <div className='modalDetallePedidoDescription'>

                <>
                    <div>
                        <p>Subtotal</p>
                        <p>{calcSubtotal()}</p>
                    </div>
                    <div>
                        <p>Impuesto</p>
                        <p>$0</p>
                    </div>
                    <div>
                        <p>Envío</p>
                        <p>{calcShippingCost()}</p>
                    </div>
                    <div>
                        <p>Descuento</p>
                        <p>{calcDiscount()}</p>
                    </div>
                    {/* <div>
                        <p>Cupón</p>
                        <p>$0</p>
                    </div> */}
                </>


            </div>
            <div className='modalDetallePedidoTotalPagar'>
                <h6>Total a pagar</h6>
                <p>{calTotal()}</p>
            </div>

            <div className="modalDetallePedidoBtn">
                <a href="#" onClick={() => handleChangueModal()}>Aceptar</a>
            </div>
        </div>
    )
}

export default ModalDetallePedido
