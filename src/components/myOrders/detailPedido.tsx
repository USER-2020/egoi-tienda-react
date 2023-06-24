import React from 'react'
import '../../styles/myOrders.css';
import { Card } from 'reactstrap';
function DetailPedido() {
    return (
        <div className='containerDetalleAndCard'>
            <>
                <div className="containerPedidoIzq">
                    <div className="datosPrincipales">
                        <div className="nroPedido">
                            <h6>Numero de pedido</h6>
                            <p>100361</p>
                        </div>

                        <div className="fechaPedido">
                            <h6>Fecha de pedido</h6>
                            <p>09 Feb, 2023</p>
                        </div>
                    </div>
                    <div className="direcciones">
                        <div className="direccionEnv">
                            <h6>Direccion  de envio</h6>
                            <p>Calle 10 # 10 - 20,
                                Medellín, Antioquia
                            </p>
                        </div>
                        <div className="direccionCompra">
                            <h6>Direccion de compra</h6>
                            <p>Calle 10 # 10 - 20,
                                Medellín, Antioquia
                            </p>
                        </div>
                    </div>
                    <div className="productoDetail">
                        <div className="img">
                            <svg width="124" height="124" viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <rect width="124" height="124" rx="16" fill="white" />
                                <rect width="124" height="124" rx="16" fill="url(#pattern0)" />
                                <defs>
                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlinkHref="#image0_1588_2196" transform="translate(0.11111 0.114103) scale(0.000324075)" />
                                    </pattern>
                                </defs>
                            </svg>

                        </div>
                        <div className="description">
                            <h6>iPhone 14 Pro Max
                                256 GB
                            </h6>
                            <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: 0, color: '#171523' }}>$8’000.000</p>
                            <p style={{ color: '#74737B', fontSize: '16px' }}>Cantidad: 1</p>
                        </div>
                    </div>
                </div>
                <div className="containerCardDatos">
                    <Card>
                        <div className="articulosPedidos">
                            <p>Articulos</p>
                            <p>1</p>
                        </div>
                        <div className="subtotal">
                            <p>Subtotal</p>
                            <p>$8’000,000</p>
                        </div>
                        <div className="impuesto">
                            <p>Impuesto</p>
                            <p>$0</p>
                        </div>
                        <div className="Envio">
                            <p>Envio</p>
                            <p>$0</p>
                        </div>
                        <div className="descuentoProducto">
                            <p>Descuento</p>
                            <p>$0</p>
                        </div>
                        <div className="cuponDescuento">
                            <p>Cupon Descuento</p>
                            <p>$0</p>
                        </div>
                        <div className="totalAPagar">
                            <h6>Total a pagar</h6>
                            <h5>$8,000.000</h5>
                        </div>
                    </Card>
                    <div className="opcionesRastreoOrFacturar">
                        <a href="#" className='btn rastrear'>
                            <svg width="24" height="24" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5 13C16.5 14.6569 15.1569 16 13.5 16C11.8431 16 10.5 14.6569 10.5 13C10.5 11.3431 11.8431 10 13.5 10C15.1569 10 16.5 11.3431 16.5 13Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 2C7.42487 2 2.5 6.92487 2.5 13C2.5 19.0751 7.42487 24 13.5 24C19.5751 24 24.5 19.0751 24.5 13C24.5 6.92487 19.5751 2 13.5 2ZM0.5 13C0.5 5.8203 6.3203 0 13.5 0C20.6797 0 26.5 5.8203 26.5 13C26.5 20.1797 20.6797 26 13.5 26C6.3203 26 0.5 20.1797 0.5 13Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 7C10.1863 7 7.5 9.68629 7.5 13C7.5 16.3137 10.1863 19 13.5 19C16.8137 19 19.5 16.3137 19.5 13C19.5 9.68629 16.8137 7 13.5 7ZM5.5 13C5.5 8.58172 9.08172 5 13.5 5C17.9183 5 21.5 8.58172 21.5 13C21.5 17.4183 17.9183 21 13.5 21C9.08172 21 5.5 17.4183 5.5 13Z" fill="white" />
                            </svg>

                            Rastrear pedido
                        </a>
                        <a href="#" className='btn facturar'>
                            <svg width="24" height="24" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3468 5.59962C16.3974 5.59962 16.4485 5.59962 16.5001 5.59962C16.5517 5.59962 16.6028 5.59962 16.6534 5.59962C18.7395 5.59946 19.9524 5.59937 20.9707 5.87222C23.7314 6.61195 25.8878 8.76834 26.6275 11.5291C26.9004 12.5474 26.9003 13.7603 26.9001 15.8464C26.9001 15.8969 26.9001 15.948 26.9001 15.9996V17.6507C26.9001 18.3452 26.9001 18.7486 26.8697 19.0969C26.5313 22.9644 23.4649 26.0308 19.5974 26.3692C19.2491 26.3997 18.8457 26.3996 18.1512 26.3996H14.8491C14.1545 26.3996 13.7511 26.3997 13.4029 26.3692C9.53529 26.0308 6.46892 22.9644 6.13056 19.0969C6.10008 18.7486 6.10009 18.3452 6.10011 17.6507L6.10011 15.9996C6.10011 15.948 6.10011 15.8969 6.10011 15.8463C6.09995 13.7603 6.09986 12.5474 6.37271 11.5291C7.11244 8.76834 9.26882 6.61195 12.0296 5.87222C13.0478 5.59937 14.2608 5.59946 16.3468 5.59962ZM16.5001 7.19962C14.2167 7.19962 13.2319 7.2065 12.4437 7.4177C10.2351 8.00949 8.50998 9.73459 7.91819 11.9432C7.70698 12.7314 7.70011 13.7162 7.70011 15.9996V16.7996H10.9001C11.5906 16.7996 12.1556 17.1033 12.583 17.4787C13.0049 17.849 13.3291 18.3186 13.5693 18.7479C13.9991 19.5163 15.0202 19.9996 16.5001 19.9996C17.98 19.9996 19.0011 19.5163 19.431 18.7479C19.6711 18.3186 19.9954 17.849 20.4172 17.4787C20.8447 17.1033 21.4096 16.7996 22.1001 16.7996H25.3001V15.9996C25.3001 13.7162 25.2932 12.7314 25.082 11.9432C24.4902 9.73459 22.7651 8.00949 20.5566 7.4177C19.7683 7.2065 18.7835 7.19962 16.5001 7.19962ZM25.2976 18.3996H22.1001C21.907 18.3996 21.7021 18.4797 21.4729 18.681C21.238 18.8872 21.0186 19.1871 20.8273 19.529C19.9855 21.0339 18.2349 21.5996 16.5001 21.5996C14.7654 21.5996 13.0147 21.0339 12.1729 19.529C11.9817 19.1871 11.7623 18.8872 11.5274 18.681C11.2981 18.4797 11.0933 18.3996 10.9001 18.3996H7.70262C7.70546 18.6442 7.71154 18.8096 7.72447 18.9574C7.99516 22.0515 10.4483 24.5046 13.5423 24.7753C13.8119 24.7989 14.1403 24.7996 14.9001 24.7996H18.1001C18.8599 24.7996 19.1883 24.7989 19.4579 24.7753C22.552 24.5046 25.0051 22.0515 25.2758 18.9574C25.2887 18.8096 25.2948 18.6442 25.2976 18.3996Z" fill="#FC5241" />
                            </svg>

                            Generar factura
                        </a>
                    </div>
                </div>
            </>
        </div>
    )
}

export default DetailPedido