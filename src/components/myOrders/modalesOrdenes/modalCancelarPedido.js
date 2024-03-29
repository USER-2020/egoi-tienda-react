import React from 'react'
import './modalCancelarPedido.css';
function ModalCancelarPedido({setModalCancelarPedido}) {
    return (
        <div className='containerModalCanelarPedido'>
            <svg width="138" height="138" viewBox="0 0 138 138" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="69" cy="69" r="69" fill="#E5483E" fill-opacity="0.02" />
                <circle cx="69" cy="69" r="68.5" stroke="#E5483E" stroke-opacity="0.16" />
                <g opacity="0.8">
                    <rect x="21" y="21" width="96" height="96" rx="48" fill="#E5483E" fill-opacity="0.04" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M77.8906 43.1569C75.5911 43 72.7391 43 69.0751 43H68.9249C65.2609 43 62.4089 43 60.1094 43.1569C57.7762 43.3161 55.8662 43.6434 54.1117 44.3702C49.7012 46.1971 46.1971 49.7012 44.3702 54.1117C43.6434 55.8662 43.3161 57.7762 43.1569 60.1094C43 62.4089 43 65.2609 43 68.9249V69.0751C43 72.7391 43 75.5911 43.1569 77.8906C43.3161 80.2238 43.6434 82.1338 44.3702 83.8883C46.1971 88.2988 49.7012 91.8029 54.1117 93.6298C55.8662 94.3566 57.7762 94.6839 60.1094 94.8431C62.4089 95 65.2609 95 68.9249 95H69.0751C72.7391 95 75.5911 95 77.8906 94.8431C80.2238 94.6839 82.1338 94.3566 83.8883 93.6298C88.2988 91.8029 91.8029 88.2988 93.6298 83.8883C94.3566 82.1338 94.6839 80.2238 94.8431 77.8906C95 75.5911 95 72.7391 95 69.0751V68.9249C95 65.2609 95 62.4089 94.8431 60.1094C94.6839 57.7762 94.3566 55.8662 93.6298 54.1117C91.8029 49.7012 88.2988 46.1971 83.8883 44.3702C82.1338 43.6434 80.2238 43.3161 77.8906 43.1569ZM59.5862 59.5855C60.3672 58.8045 61.6335 58.8045 62.4146 59.5855L69.0004 66.1713L75.5862 59.5855C76.3672 58.8045 77.6335 58.8045 78.4146 59.5855C79.1956 60.3666 79.1956 61.6329 78.4146 62.414L71.8288 68.9998L78.4146 75.5855C79.1956 76.3666 79.1956 77.6329 78.4146 78.414C77.6335 79.195 76.3672 79.195 75.5862 78.414L69.0004 71.8282L62.4146 78.414C61.6335 79.195 60.3672 79.195 59.5862 78.414C58.8051 77.6329 58.8051 76.3666 59.5862 75.5855L66.1719 68.9998L59.5862 62.414C58.8051 61.6329 58.8051 60.3666 59.5862 59.5855Z" fill="#E01C0F" />
                    <rect x="21.5" y="21.5" width="95" height="95" rx="47.5" stroke="#E5483E" stroke-opacity="0.32" />
                </g>
            </svg>

            <div className='contenedorHeaderModalCanelarPedido'>
                <h5 style={{color:'#E01C0F', fontWeight:'700'}}>¿Estás seguro?</h5>
                <p style={{fontSize:'14px'}}>Para atender tu solicitud por favor comunícate a través de nuestros canales de atención en la opción contáctanos.</p>
            </div>

            <div className='contenedorOpcionesCancelarPedido'>
                <a href='/contactUs' className='si'>Ir a contáctanos</a>
                <a href='#'className='no' onClick={()=>setModalCancelarPedido()}>No, deseo regresar</a>
            </div>
        </div>
    )
}

export default ModalCancelarPedido
