import React from 'react'
import './track_Order.css';

function ModalDetallePedido({closeModalDetallePedido}) {

    const handleChangueModal =() =>{
        closeModalDetallePedido();
    }
    return (
        <div>
            <div className='modalDetallePedidoHeader'>
                <svg width="125" height="124" viewBox="0 0 125 124" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <rect x="0.5" width="124" height="124" rx="16" fill="white" />
                    <rect x="0.5" width="124" height="124" rx="16" fill="url(#pattern0)" />
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_1588_2765" transform="translate(0.11111 0.114103) scale(0.000324075)" />
                        </pattern>
                    </defs>
                </svg>

                <div className="descriptionHeader">
                    <h6>
                        iPhone 14 Pro Max
                        256 GB
                    </h6>
                    <p className='precio'>$8’000.000</p>
                    <p className='cantidad'>Cantidad: 1</p>
                </div>

            </div>
            <div className='modalDetallePedidoDescription'>
                <div>
                    <p>Subtotal</p>
                    <p>$8’000,000</p>
                </div>
                <div>
                    <p>Impuesto</p>
                    <p>$0</p>
                </div>
                <div>
                    <p>Envio</p>
                    <p>$0</p>
                </div>
                <div>
                    <p>Descuento</p>
                    <p>$0</p>
                </div>
                <div>
                    <p>Cupón</p>
                    <p>$0</p>
                </div>
            </div>
            <div className='modalDetallePedidoTotalPagar'>
                <h6>Total a pagar</h6>
                <p>$8,000.000</p>
            </div>

            <div className="modalDetallePedidoBtn">
                <a href="#" onClick={()=>handleChangueModal()}>Aceptar</a>
            </div>
        </div>
    )
}

export default ModalDetallePedido