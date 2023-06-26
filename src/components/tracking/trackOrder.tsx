import React ,{useState} from 'react'
import { Card, Modal, ModalBody } from 'reactstrap'
import ModalDetallePedido from './modalDetalle.tsx'

function TrackOrder() {

    const [modalDetallePedido, setModalDetallePedido] = useState(false);

    const closeModalDetallePedido = () => {
        setModalDetallePedido(false);
    }
    return (
        <>
            <div>
                <Card style={{ width: '120px', padding: '5px', color: '#FC5241' }}>
                    <h6 style={{ fontSize: '12px', marginBottom: 0 }}>Número de pedido</h6>
                    <h5 style={{ fontWeight: '400', fontSize: '16px', marginBottom: 0 }}>100361</h5>
                </Card>
                <div style={{
                    display: 'flex', flexDirection: 'row',
                    width: '100%', border: '1px solid #A2A1A729',
                    justifyContent: 'space-between', marginTop: '20px',
                    borderRadius: '16px', padding: '16px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p style={{ fontSize: '12px', marginBottom: '0', fontWeight: '400', color: '#A2A1A7' }}>Estado del pedido</p>
                        <p style={{ fontSize: '16px', marginBottom: '0', fontWeight: '400' }}>Pendiente</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p style={{ fontSize: '12px', marginBottom: '0', fontWeight: '400', color: '#A2A1A7' }}>Estado del pago</p>
                        <p style={{ fontSize: '16px', marginBottom: '0', fontWeight: '400' }}>Sin pago</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p style={{ fontSize: '12px', marginBottom: '0', fontWeight: '400', color: '#A2A1A7' }}>Fecha estimada de entrega</p>
                        <p style={{ fontSize: '16px', marginBottom: '0', fontWeight: '400' }}>18 Feb, 2023</p>
                    </div>

                </div>
                <Card style={{
                    width: '100%', marginTop: '20px',
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '14px', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="72" height="72" rx="36" fill="#089705" fill-opacity="0.08" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7998 35.9998C17.7998 25.9482 25.9482 17.7998 35.9998 17.7998C46.0514 17.7998 54.1998 25.9482 54.1998 35.9998C54.1998 46.0514 46.0514 54.1998 35.9998 54.1998C25.9482 54.1998 17.7998 46.0514 17.7998 35.9998ZM45.3528 29.3743C45.9192 29.9006 45.9517 30.7864 45.4253 31.3528L33.7163 43.9528C33.4514 44.2379 33.0798 44.3998 32.6907 44.3998C32.3016 44.3998 31.93 44.2379 31.6652 43.9528L26.5743 38.4746C26.0479 37.9082 26.0804 37.0223 26.6468 36.496C27.2132 35.9697 28.099 36.0021 28.6253 36.5685L32.6907 40.9432L43.3743 29.4468C43.9006 28.8804 44.7864 28.8479 45.3528 29.3743Z" fill="#089705" />
                                <rect x="0.5" y="0.5" width="71" height="71" rx="35.5" stroke="#089705" stroke-opacity="0.16" />
                            </svg>
                            <div>
                                <p>
                                    <span style={{ display: 'flex', flexDirection: 'row', gap: '2px', alignSelf: 'center', alignItems: 'center', color: '#089705' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-1-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312V4.002Z" />
                                        </svg>
                                        <p style={{ marginBottom: 0, fontSize: '14px' }}>Primer paso</p>
                                    </span>
                                    <p style={{ fontSize: '14px', marginBottom: '0' }}>Pedido realizado</p>
                                </p>
                            </div>

                        </div>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ width: '56px', height: '2px', backgroundColor: '#0897057A' }}></div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '14px', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="72" height="72" rx="36" fill="#A2A1A7" fill-opacity="0.08" />
                                <rect x="0.5" y="0.5" width="71" height="71" rx="35.5" stroke="#A2A1A7" stroke-opacity="0.16" />
                            </svg>

                            <div>
                                <p>
                                    <span style={{ display: 'flex', flexDirection: 'row', gap: '2px', alignSelf: 'center', alignItems: 'center', color: '#A2A1A7' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-2-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
                                        </svg>
                                        <p style={{ marginBottom: 0, fontSize: '14px' }}>Segundo paso</p>
                                    </span>
                                    <p style={{ fontSize: '14px', marginBottom: '0', color: '#A2A1A7' }}>Procesando pedido</p>
                                </p>
                            </div>

                        </div>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ width: '56px', height: '2px', backgroundColor: '#A2A1A729' }}></div>
                    </div>


                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '14px', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="72" height="72" rx="36" fill="#A2A1A7" fill-opacity="0.08" />
                                <rect x="0.5" y="0.5" width="71" height="71" rx="35.5" stroke="#A2A1A7" stroke-opacity="0.16" />
                            </svg>

                            <div>
                                <p>
                                    <span style={{ display: 'flex', flexDirection: 'row', gap: '2px', alignSelf: 'center', alignItems: 'center', color: '#A2A1A7' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-3-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-8.082.414c.92 0 1.535.54 1.541 1.318.012.791-.615 1.36-1.588 1.354-.861-.006-1.482-.469-1.54-1.066H5.104c.047 1.177 1.05 2.144 2.754 2.144 1.653 0 2.954-.937 2.93-2.396-.023-1.278-1.031-1.846-1.734-1.916v-.07c.597-.1 1.505-.739 1.482-1.876-.03-1.177-1.043-2.074-2.637-2.062-1.675.006-2.59.984-2.625 2.12h1.248c.036-.556.557-1.054 1.348-1.054.785 0 1.348.486 1.348 1.195.006.715-.563 1.237-1.342 1.237h-.838v1.072h.879Z" />
                                        </svg>
                                        <p style={{ marginBottom: 0, fontSize: '14px' }}>Tercer paso</p>
                                    </span>
                                    <p style={{ fontSize: '14px', marginBottom: '0', color: '#A2A1A7' }}>Preparando pedido</p>
                                </p>
                            </div>

                        </div>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ width: '56px', height: '2px', backgroundColor: '#A2A1A729' }}></div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '14px', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="72" height="72" rx="36" fill="#A2A1A7" fill-opacity="0.08" />
                                <rect x="0.5" y="0.5" width="71" height="71" rx="35.5" stroke="#A2A1A7" stroke-opacity="0.16" />
                            </svg>

                            <div>
                                <p>
                                    <span style={{ display: 'flex', flexDirection: 'row', gap: '2px', alignSelf: 'center', alignItems: 'center', color: '#A2A1A7' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-4-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM7.519 5.057c-.886 1.418-1.772 2.838-2.542 4.265v1.12H8.85V12h1.26v-1.559h1.007V9.334H10.11V4.002H8.176c-.218.352-.438.703-.657 1.055ZM6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218Z" />
                                        </svg>
                                        <p style={{ marginBottom: 0, fontSize: '14px' }}>Cuarto paso</p>
                                    </span>
                                    <p style={{ fontSize: '14px', marginBottom: '0', color: '#A2A1A7' }}>Pedido enviado</p>
                                </p>
                            </div>

                        </div>

                    </div>

                </Card >

                <div style={{ width: '200px', height: '48px', backgroundColor: '#FC5241', display: 'flex', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: '32px', marginTop: '10px' }}>
                    <a href="#" style={{ width: '100%', height: '100%', textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', fontWeight: 700 }} onClick={()=>setModalDetallePedido(true)}>Ver detalles</a>
                </div>

            </div >

            {/* Modales */}
            <Modal
                className="modal-dialog-centered modal-sm"
                toggle={() => closeModalDetallePedido()}
                isOpen={modalDetallePedido}
            >
                <ModalBody>
                    <ModalDetallePedido closeModalDetallePedido={closeModalDetallePedido}/>
                </ModalBody>
            </Modal>
        </>
    )
}

export default TrackOrder
