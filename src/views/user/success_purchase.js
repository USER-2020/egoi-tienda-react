import React from 'react';
import './successPurchase.css';

function SuccessPurchase() {
    return (
        <div className='containerSuccessPurchase'>
            <svg width="139" height="138" viewBox="0 0 139 138" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="69.5" cy="69" r="69" fill="#089705" fill-opacity="0.02" />
                <circle cx="69.5" cy="69" r="68.5" stroke="#089705" stroke-opacity="0.16" />
                <g opacity="0.8">
                    <rect x="21.5" y="21" width="96" height="96" rx="48" fill="#089705" fill-opacity="0.04" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M75.3729 45.2783C72.0811 42.2406 66.9186 42.2406 63.6267 45.2783C62.6332 46.1951 61.2411 46.6387 59.8456 46.4556C55.3887 45.8709 51.1404 48.7688 50.3114 53.1883C50.0744 54.4521 49.2461 55.5727 48.0214 56.207C44.0057 58.2869 42.3348 63.1103 44.3611 67.1596C44.9441 68.3246 44.9441 69.6754 44.3611 70.8404C42.3348 74.8897 44.0057 79.7131 48.0214 81.793C49.2461 82.4273 50.0744 83.5479 50.3114 84.8117C51.1404 89.2312 55.3887 92.1291 59.8456 91.5444C61.2411 91.3613 62.6332 91.8049 63.6267 92.7217C66.9186 95.7594 72.0811 95.7594 75.3729 92.7217C76.3665 91.8049 77.7585 91.3613 79.1541 91.5444C83.611 92.1291 87.8593 89.2312 88.6883 84.8117C88.9253 83.5479 89.7535 82.4273 90.9783 81.793C94.994 79.7131 96.6648 74.8897 94.6386 70.8404C94.0556 69.6754 94.0556 68.3246 94.6386 67.1596C96.6648 63.1103 94.994 58.2869 90.9783 56.207C89.7535 55.5727 88.9253 54.4521 88.6883 53.1883C87.8593 48.7688 83.611 45.8709 79.1541 46.4556C77.7585 46.6387 76.3665 46.1951 75.3729 45.2783ZM79.9917 60.9247C80.8037 61.6735 80.855 62.9388 80.1062 63.7508L67.9248 76.9608C67.5461 77.3714 67.013 77.605 66.4545 77.605C65.8959 77.605 65.3628 77.3714 64.9842 76.9608L58.8935 70.3558C58.1447 69.5438 58.1959 68.2785 59.008 67.5297C59.82 66.7809 61.0853 66.8322 61.8341 67.6442L66.4545 72.6547L77.1656 61.0392C77.9144 60.2272 79.1797 60.1759 79.9917 60.9247Z" fill="#089705" />
                    <rect x="22" y="21.5" width="95" height="95" rx="47.5" stroke="#089705" stroke-opacity="0.32" />
                </g>
            </svg>


            <div className='containerSuccessHeader'>
                <h5>¡Tu pedido ha sido realizado con éxito!</h5>
                <p>Hola, tu orden ha sido confirmada y será enviada de acuerdo al método escogido</p>
            </div>
            <div className='containerSuccessOptions'>
                <a href='/' className='btn btnIrhome'>Ir a comprar</a>
                <a href='/myOrders' className='btn btnIrpedidos'>Comprobar los pedidos</a>
            </div>
        </div>
    )
}

export default SuccessPurchase
