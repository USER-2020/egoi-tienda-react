import React from 'react'

const ModalFillAll = () => {
    return (
        <div className='d-flex flex-column align-items-center text-center gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#FC5241" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>
            <p>Por favor diligencia todos los campos antes de proceder con el pago</p>
            
        </div>
    )
}

export default ModalFillAll
