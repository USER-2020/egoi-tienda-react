import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';

import '../../styles/detailsCart.css';
import { AccordionBody, AccordionHeader, AccordionItem, Button, Card, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Modal, ModalBody, ModalHeader, Row, UncontrolledAccordion } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getCurrentUser, setCurrentUser } from '../../helpers/Utils';
import { allProductsCart } from '../../services/cart';
import start from '../../assets/egoi_icons/star-fill.svg';
import startEmpty from '../../assets/egoi_icons/star-fill-gray.svg';
import { Link, useLocation } from 'react-router-dom';
import AdressCheckout from '../../views/user/adress';
import es from "react-phone-input-2/lang/es.json";
import PhoneInput from 'react-phone-input-2';
import { addressById, allAddress, allCitysByIdDepto, allDeptos, deleteAddress, saveAddress, uniqueAddress } from '../../services/address';
import UpdateAddress from '../../views/user/updateAddress';
import { set } from 'react-hook-form';
import Swal from 'sweetalert2';
import TarjetaCreditoModal from '../../views/user/metodosDePago/tarjetaCredito';
import EfectyModal from '../../views/user/metodosDePago/efecty';
import PseModal from '../../views/user/metodosDePago/pse';
import TarjetaDebitoModal from '../../views/user/metodosDePago/tarjetaDebito';
import { allBanks } from '../../services/bank';
import { aplyCupon } from '../../services/cupon';
import CashDeliveryOTP from '../../views/user/metodosDePago/cashDeliveryOTP';
import axios from 'axios';
import { makePay, placeOrder, placeOrderEfecty, referenciaPago } from '../../services/metodosDePago';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import PDFContent from '../PDF/PDFContent';
import SuccessPurchase from '../../views/user/success_purchase';
import efectyLogo from '../../assets/egoi_icons/logo_efecty.svg';
import pseLogo from '../../assets/egoi_icons/logo_pse.svg';
import ModalProcesandoPago from '../../views/user/metodosDePago/modalProcesandoPago';
import ModalNoPse from '../../views/user/metodosDePago/modalNoPse.tsx';
import { TailSpin, ThreeCircles } from 'react-loader-spinner';
import { getUserProfileInfo, updateInfoProfile } from '../../services/ordenes.js';
import { login_Email_Face } from '../../services/extraLogin.js';

const LoaderOverlay = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999, // Asegura que esté encima de otros elementos
            }}
        >
            <div style={{ textAlign: 'center', color: '#FC5241' }}>
                <ThreeCircles
                    height={100}
                    width={100}
                    color="#FC5241"
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                />
                <h2>Cargando...</h2>
            </div>
        </div>
    );
};

const Checkout_V2_token = ({ offcanvasValidate }) => {

    const { emailverificaion } = useParams();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [previousStep, setPreviousStep] = useState(0);
    const [activeStep, setActiveStep] = useState(2);
    const [valueProgressBar, setValueProgressBar] = useState(55);
    const [productsCart, setProductsCart] = useState([]);
    const [modalViewRegistro, setModalViewRegistro] = useState(false);
    const [modalViewLogin, setModalViewLogin] = useState(false);
    const [modalAddressCheckout, setModalAddressCheckout] = useState(false);
    const [modalAddressUpdate, setModalAddressUpdate] = useState(false);
    const [modalTarjetaCredito, setModalTarjetaCredito] = useState(false);
    const [modalEfecty, setModalEfecty] = useState(false);
    const [modalPse, setModalPse] = useState(false);
    const [modalOTP, setModalOTP] = useState(false);
    const [selectedLink, setSelectedLink] = useState('hogar');
    const [address, setAddress] = useState([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [dataAddress, setDataAddress] = useState("");
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedZip, setSelectedZip] = useState();
    const [idAddress, setIdAddress] = useState([]);
    const [descriptionOrder, setDescriptionOrder] = useState("");
    const [costoEnvio, setCostoEnvio] = useState(0);
    const [loading, setLoading] = useState(false);
    const [infoPerfil, setInfoPerfil] = useState('');
    const [country, setCountry] = useState("Colombia");
    const [latitude, setLatitude] = useState("1234");
    const [longitude, setLongitude] = useState("4321");
    const [localDescription, setLocalDescription] = useState("");
    const [barrio, setBarrio] = useState("");
    const [phone2, setphone2] = useState("");
    const [addressForm, setAddressForm] = useState("");
    const [addressType, setAddressType] = useState("");
    const [zip, setZip] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [email, setEmail] = useState();
    const [f_name, setF_name] = useState();
    const [l_name, setL_name] = useState();
    const [phone, setPhone] = useState();


    const [contactPersonName, setContactPersonName] = useState("");
    const [contactPersonLastName, setContactPersonLastName] = useState("");
    const [contactPersonFullName, setContactPersonFullName] = useState("");

    const [dataAddressUpdate, setDataAddressUpdate] = useState("");

    const [modalDataPSE, setModalDataPSE] = useState("");
    const [modalDataTarjetas, setModalDataTarjetas] = useState("");

    const [modalMantenimientoPSE, setModalMantenimientoPSE] = useState(false);

    const [modalUpdateModal, setModalUpdateModal] = useState(false);

    const [showUpdateAddressContainer, setShowUpdateAdressContainer] = useState(false);
    const [showInfoAddress, setShowInfoAddress] = useState(true);


    //Modal de pedido exitoso
    const [modalSuccessPurchase, setModalSuccessPurchase] = useState(false);

    /* Manejo de estados del tercer modal */
    const [shouldShowCollapseThree, setShouldShowCollapseThree] = useState(false);


    // Modales de metodos de pagos 
    const [modalTarjetaDebito, setModalTarjetaDebito] = useState(false);
    const [isScrollModalEnabled, setIsScrollModalEnabled] = useState(true);
    const [dataRef, setDataRef] = useState([]);

    const [deptos, setDeptos] = useState([]);

    const [dataOrderDetail, setDataOrderDetail] = useState([]);

    const [changueCantCart, setChangueCantCart] = useState(false);


    const location = useLocation();

    // Obtén la parte de la URL antes de los parámetros
    const checkoutPath = location.pathname.split('/')[1]; // Esto debería ser 'checkout'




    const [cupon, setCupon] = useState("");
    const [discountCoupon, setDiscountCoupon] = useState("");

    /* Estado para la IP */
    const [ipAddress, setIpAddress] = useState('');

    /* Generacion de pdf */
    const [showPDF, setShowPDF] = useState(false);

    /* Boton deshabilitado */
    const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
    const [okPurchase, setOkPurchase] = useState(false);

    /* Modal procesando pago */
    const [modalProcesandoPago, setModalProcesoPago] = useState(false);


    const [showMetodosPago, setShowMetodosPago] = useState(false);

    const [cantProductsOnCart, setCantProductsOnCart] = useState('');


    const [city, setCity] = useState("");

    const [selectedCity, setSelectedCity] = useState();
    const [selectedCiudad, setSelectedCiudad] = useState();
    const [selectedDepto, setSelectedDepto] = useState();
    const [acordeonAbierto, setAcordeonAbierto] = useState('1');

    /* Manejo de formulario de envio de direccion */
    const [driveAddress, setDriveAddress] = useState(true);
    const [valorAccordion, setValorAccordion] = useState("");

    const isSmallScreen = window.innerWidth <= 768;
    const buttonWidth = isSmallScreen ? '80%' : '40%';


    /* Twilio */




    const handleSelectChangeZip = (e) => {
        const valorSeleccionadoZip = (e.target.value);
        setSelectedZip(valorSeleccionadoZip);
        console.log(valorSeleccionadoZip);

        const deptoSeleccionado = deptos.find((depto) => depto.id_departamento === parseInt(valorSeleccionadoZip));

        console.log(deptoSeleccionado);
        if (deptoSeleccionado) {
            setSelectedDepto(deptoSeleccionado.departamento);

        }
        // return valorSeleccionado;
        // Realizar otras acciones con el valor seleccionado
    };

    const handleSelectChangeCity = (e) => {
        const valorSeleccionadoCity = parseInt(e.target.value);
        setSelectedCity(valorSeleccionadoCity);
        console.log(valorSeleccionadoCity);

        const citySeleccionada = city.find((ciudad) => ciudad.id === parseInt(valorSeleccionadoCity));

        console.log(citySeleccionada);
        if (citySeleccionada) {
            setSelectedCiudad(citySeleccionada.nombre);

        }
        // return valorSeleccionadoTalla;
        // Realizar otras acciones con el valor seleccionado
    };



    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };

    // const { subtotal, total, costoEnvio, cuponDescuento } = useParams();

    /* Reseteo de tarjeta */
    const [isResetOk, setIsResetOk] = useState(false);

    const currenUser = getCurrentUser();

    const history = useHistory();

    const token = currenUser.token;

    const userEmail = currenUser.email;

    const shouldOpenAccordion = () => {
        if (token) {
            console.log("Estoy validando el token ")
            return '2'
        }

        if (!token) {
            return '1'
        }
    }

    const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";
    const baseUrlImageThumbnail = "https://egoi.xyz/storage/app/public/product/thumbnail/";


    const handleStepClick = (step, stepProgress) => {
        setActiveStep(step);
        setValueProgressBar(stepProgress);
    };



    /* Redireccion a compra exitosa */
    const handleFinishPurchase = () => {
        console.log("handlefinishpurchase");
        // Utilizar map para transformar "productsCart" en la estructura deseada para la llamada a gtag
        var mappedItems = productsCart.map(function (product) {

            return {
                item_id: product.id,
                item_name: product.name,
                coupon: cupon,
                discount: discountedProducts,
                affiliation: "Egoi",
                item_brand: "",
                item_category: "",
                item_variant: product.variant,
                price: product.unit_price,
                currency: "COP",
                quantity: product.quantity
            };
        });
        gtag('event', 'purchase', {
            affiliation: 'Egoi',
            nombre_cliente: infoPerfil.f_name,
            email_cliente: infoPerfil.email,
            numero_telefono: infoPerfil.phone,
            coupon: cupon,
            currency: 'COP',
            items: mappedItems,
            transaction_id: 'T_12345',
            shipping: 0,
            value: subtotal,
            tax: 0
        })

        history.push("/congrats");
    }



    /* Twilio */
    const sendCopyForTwilio = (idRefEfecty) => {
        console.log(address[0].phone);
        const accountSid = 'AC8b58947dd886254c3e214afb4251a7b8'; // Reemplaza con tu Account SID
        const authToken = 'fcfeff21e6d0073421be3ba23feece15';   // Reemplaza con tu Auth Token
        const fromPhoneNumber = 'whatsapp:+14155238886'; // Reemplaza con el número de teléfono de Twilio configurado en el WhatsApp Sandbox
        const toPhoneNumber = `whatsapp:+${address && address[0].phone}`;   // Reemplaza con el número de teléfono del destinatario en formato internacional

        const messageBody = `Hola, esta es tu referencia de pago *${idRefEfecty}* y el número de convenio es *110757*.`;
        // Define tus encabezados personalizados aquí
        const headers = {
            'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`), // Autenticación básica en base64
        };

        // Realiza la solicitud POST a la API de Twilio utilizando fetch
        fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/x-www-form-urlencoded', // Establece el tipo de contenido
            },
            body: new URLSearchParams({
                From: fromPhoneNumber,
                To: toPhoneNumber,
                Body: messageBody,
            }).toString(),
        })
            .then(response => response.json())
            .then(data => {
                console.log(`Mensaje enviado con SID: ${data.sid}`);
            })
            .catch(error => {
                console.error(`Error al enviar el mensaje: ${error.message}`);
            });
    }

    /* Carrito y detalle de compra */
    const getAllProductsByCart = () => {
        if (token) {
            allProductsCart(token)
                .then((res) => {
                    // console.log(res);
                    setProductsCart(res.data);
                    // console.log("traer todos los producstos del carrito", productsCart);

                    // Obtener los nombres de los productos del carrito
                    const productNames = res.data.map((product) => product.name);
                    // console.log(productNames);
                    // Concatenar los nombres de los productos separados por comas
                    const concatenatedNames = productNames.join(', ');

                    // console.log("Traer todos los productos del carrito", res.data);
                    // console.log("Nombres de los productos concatenados:", concatenatedNames);
                    setDescriptionOrder(concatenatedNames);

                })
                .catch((err) => console.log(err));
        }

    }

    const sumSubTotal = (productsCart) => {
        let total = 0;
        productsCart.map((product) => {
            if (product.discount > 0) {
                const precioTotal = (product.price - product.discount) * product.quantity;
                total += precioTotal;

            }
            if (product.discount_tag) {
                const precioTotal = (product.discount_tag) * product.quantity;
                total += precioTotal;
            }

            if (product.discount_tag === 0 && product.discount === 0) {
                const precioTotal = (product.price) * product.quantity;
                total += precioTotal;
            }

            // const precioTotal = product.price * product.quantity;
            // total += precioTotal;
        });
        return total;
    };

    const sumWithoutDiscount = (productsCart) => {
        let totalWithoutDiscount = 0;
        productsCart.map((product) => {
            const precioTotalWithoutDiscount = (product.price) * product.quantity;
            totalWithoutDiscount += precioTotalWithoutDiscount;
        })
        return totalWithoutDiscount;
    }

    const discountWhithTags = (productsCart) => {
        let totalDiscounts = 0;
        productsCart.map((product) => {
            const descuentosTotales = (product.discount);
            totalDiscounts += descuentosTotales;
        })
        return totalDiscounts;
    }


    const subtotal = sumSubTotal(productsCart);

    const subtotalWithoutDiscount = sumWithoutDiscount(productsCart);

    const discountedProducts = discountWhithTags(productsCart);

    const impuesto = '0';

    const envio = '0';

    const descuento = '$0';

    const costoDeENvio = () => {
        // console.log(subtotal);
        if (subtotal && subtotal <= 39900) {
            setCostoEnvio(0);
        } else if (subtotal && subtotal <= 79990 && subtotal > 39900) {
            const costodelEnvio = 9900;
            setCostoEnvio(costodelEnvio);
        } else {
            setCostoEnvio(0);
        }
    }



    const totalPagar = () => {

        if (subtotal <= 39900) {
            const precioTotalaPagar = subtotal + 0;
            return `$${precioTotalaPagar.toLocaleString('es')}`;
        }
        const precioTotalaPagar = subtotal + costoEnvio;
        return `$${precioTotalaPagar.toLocaleString('es')}`;

        // const subtotalNumber = parseInt(subtotal.replace(',', ''), 10);
    }

    const totalaPagar = totalPagar();

    const aplicarCupon = () => {
        if (cupon && token) {
            // console.log(cupon);
            aplyCupon(cupon, token)
                .then((res) => {
                    // console.log("Cupon aplicado ==>", res.data);
                    // console.log("Total", res.data.total);
                    setDiscountCoupon(res.data);

                    // Validar si el cupón es inválido
                    if (res.data.messages && res.data.messages.includes('Invalid Coupon')) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Cupón inválido',
                            confirmButtonColor: '#dc3545',
                        });
                    } else {
                        // El cupón se aplicó correctamente
                        // Continuar con el flujo de la aplicación
                    }
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al aplicar el cupón. Por favor, inténtelo de nuevo.',
                        confirmButtonColor: '#dc3545',
                    });
                });
        }
    }
    /* CAmbio de precio subtotal */

    /* Cambio de precio en total */
    const totalNumber = parseInt(totalaPagar.replace(/[\$.]/g, ''), 10);

    let formattedDiscount = '';
    let formattedTotal = '';

    if (discountCoupon && discountCoupon.total !== undefined) {
        formattedDiscount = discountCoupon.discount.toString().replace(',', '.');
        formattedTotal = discountCoupon.total.toString().replace(',', '.');
    }

    /* Carrito y detalle de compra */

    const getAllAddress = () => {
        if (token) {
            uniqueAddress(token)
                .then((res) => {
                    console.log("Esta es la unica direccion registrada", res.data);
                    setAddress(res.data);
                    // setSelectedAddressId(res.data.id);

                }).catch((err) => console.log(err));
            // allAddress(token)
            //     .then((res) => {
            //         // console.log(res.data);
            //         setAddress(res.data);
            //         console.log("Estas son las direcciones", address);

            //     }).catch((err) => console.log(err));
        }
    }

    const showModalDesription = () => {
        if (address && address.length === 0) {
            setDriveAddress(true);
            console.log(driveAddress);
        } else {
            setDriveAddress(false);
            console.log(driveAddress);
        }
    }

    const getAllDeptos = () => {
        if (token) {
            allDeptos(token)
                .then((res) => {
                    // console.log(res.data);
                    setDeptos(res.data);
                }).catch((err) => console.log(err));
        }
    }

    /* Validacion de metodos de pago para finalizar compra */
    const handleFinalizarPurchase = () => {
        if (selectedCheckbox === null) {
            console.log("Elige un metodo de pago !!!");
        }
    }

    /* Validacion de el boton de finalizar compra y de metodos de pago selsccionados */
    const handlePurchaseSucces = () => {
        if (selectedCheckbox != null && okPurchase) {
            // setModalSuccessPurchase(true);
            handleFinishPurchase();
        } else {
            if (selectedCheckbox === null) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡No has seleccionado ningun método de pago!',
                    confirmButtonColor: '#FC5241',

                });


            } else {
                if (okPurchase === false) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '¡No se ha registrado tu pago correctamente, intentalo de nuevo!',
                        confirmButtonColor: '#FC5241',

                    });
                }
            }
        }

    }

    /* Validacion de direccion responsive */
    const handleProcederCompraResponsive = () => {
        // Verificar el ancho de la ventana
        if (window.innerWidth <= 480) {
            if (selectedAddressIndex === null) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡No has seleccionado ninguna dirección!',
                    confirmButtonColor: '#FC5241',
                });

            }
        }
    }


    /* Validacion de direccion en el checkout */
    const handleProcederCompra = () => {
        if (selectedAddressIndex === null) {
            // console.log("Elegir dirección para proceder con la compra");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡No has seleccionado ninguna dirección!',
                confirmButtonColor: '#FC5241',

            });

        } else {
            // Agregar los atributos al evento

            const button = document.getElementById('procederButton');
            if (button) {
                button.dataset.bsToggle = "collapse";
                button.dataset.bsTarget = "#collapseThree";
                button.setAttribute("aria-expanded", "false");
                button.setAttribute("aria-controls", "collapseThree");
            }
            handleStepClick(3, 100);
        }
    };


    const handleCheckboxChange = (index) => {
        if (selectedCheckbox === index) {
            // Deseleccionar el checkbox actual si se hace clic nuevamente en él
            setSelectedCheckbox(null);
        } else {
            // Seleccionar el checkbox correspondiente al índice dado
            setSelectedCheckbox(index);
            if (index === 0) {
                // console.log(index);
                if (window.innerWidth <= 768) {
                    if (selectedAddressIndex === null) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: '¡No has seleccionado ninguna dirección!',
                            confirmButtonColor: '#FC5241',
                        });
                        setSelectedCheckbox(null);
                        setModalTarjetaDebito(false);
                    } else {

                        setModalTarjetaDebito(true);
                    }
                } else {

                    setModalTarjetaDebito(true);
                }
                // setBotonDeshabilitado(true);
            }
            if (index === 1) {
                // console.log(index);
                if (window.innerWidth <= 768) {
                    if (selectedAddressIndex === null) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: '¡No has seleccionado ninguna dirección!',
                            confirmButtonColor: '#FC5241',
                        });
                        setSelectedCheckbox(null);
                        setModalTarjetaCredito(false);
                    } else {

                        setModalTarjetaCredito(true);
                    }
                } else {

                    setModalTarjetaCredito(true);
                }
                // setBotonDeshabilitado(true);
            }
            if (index === 2) {
                // console.log(index);
                setModalPse(true);
                // setModalMantenimientoPSE(true);
                // setBotonDeshabilitado(true);
                // Swal.fire({
                //   icon: 'error',
                //   title: 'Oops...',
                //   text: 'Estamos presentando fallos en los pagos por PSE, por favor intenta con otro medio de pago',
                //   confirmButtonColor: '#FC5241',
                //   confirmButtonText: 'Cancelar'

                // });
            }
            if (index === 3) {
                // console.log(index);
                if (window.innerWidth <= 768) {
                    if (selectedAddressIndex === null) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: '¡No has seleccionado ninguna dirección!',
                            confirmButtonColor: '#FC5241',
                        });
                        setSelectedCheckbox(null);

                    } else {

                        if (token) {
                            swalWithBootstrapButtons.fire({
                                title: '¿Quieres realizar el pago por efecty?',
                                text: "Esto no es reversible",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Sí, acepto',
                                cancelButtonText: 'Cancelar',
                                reverseButtons: true,
                                didOpen: () => {
                                    const confirmButton = document.querySelector('.swal2-confirm');
                                    confirmButton.style.marginLeft = '8px'; // Agrega margen izquierdo al botón de confirmación
                                }
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handleSubmitOrderEfecty();

                                } else if (
                                    /* Read more about handling dismissals below */
                                    result.dismiss === Swal.DismissReason.cancel

                                ) {




                                }
                            })


                        }
                    }
                } else {

                    if (token) {
                        swalWithBootstrapButtons.fire({
                            title: '¿Quieres realizar el pago por efecty?',
                            text: "Esto no es reversible",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, acepto',
                            cancelButtonText: 'Cancelar',
                            reverseButtons: true,
                            didOpen: () => {
                                const confirmButton = document.querySelector('.swal2-confirm');
                                confirmButton.style.marginLeft = '8px'; // Agrega margen izquierdo al botón de confirmación
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleSubmitOrderEfecty();

                            } else if (
                                /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel

                            ) {




                            }
                        })


                    }
                }


                // setBotonDeshabilitado(true);

            }
            if (index === 4) {
                // console.log(index);
                if (window.innerWidth <= 768) {
                    if (selectedAddressIndex === null) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: '¡No has seleccionado ninguna dirección!',
                            confirmButtonColor: '#FC5241',
                        });
                        setSelectedCheckbox(null);

                    } else {

                        if (token) {
                            swalWithBootstrapButtons.fire({
                                title: '¿Quieres realizar el pago contra entrega?',
                                text: "Esto no es reversible",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Sí, acepto',
                                cancelButtonText: 'Cancelar',
                                reverseButtons: true,
                                didOpen: () => {
                                    const confirmButton = document.querySelector('.swal2-confirm');
                                    confirmButton.style.marginLeft = '8px'; // Agrega margen izquierdo al botón de confirmación
                                }
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    setModalOTP(true);

                                } else if (
                                    /* Read more about handling dismissals below */
                                    result.dismiss === Swal.DismissReason.cancel

                                ) {




                                }
                            })


                        }
                    }
                } else {

                    if (token) {
                        swalWithBootstrapButtons.fire({
                            title: '¿Quieres realizar el pago contra entrega?',
                            text: "Esto no es reversible",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, acepto',
                            cancelButtonText: 'Cancelar',
                            reverseButtons: true,
                            didOpen: () => {
                                const confirmButton = document.querySelector('.swal2-confirm');
                                confirmButton.style.marginLeft = '8px'; // Agrega margen izquierdo al botón de confirmación
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setModalOTP(true);

                            } else if (
                                /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel

                            ) {




                            }
                        })


                    }
                }


                // setBotonDeshabilitado(true);
            }
        }
    };

    const checkboxChange = (index, id) => {
        console.log(selectedAddressId);
        setSelectedAddressIndex(index);
        setSelectedAddressId(id);
    };

    const closeModalAddress = () => {
        setModalAddressCheckout(false);
    }

    const closeModalUpdate = () => {
        setModalAddressUpdate(false);
        // window.location.reload();
        // document.addEventListener('DOMContentLoaded', function () {
        //   // Obten el elemento con el ID específico
        //   var miDiv = document.getElementById('DireccionesCards');

        //   // Verifica si el elemento existe
        //   if (miDiv) {
        //     // Usa el método scrollIntoView para desplazar la página al elemento
        //     miDiv.scrollIntoView({ behavior: 'smooth' });
        //   } else {
        //     // Si el elemento no existe, simplemente desplázate al inicio
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        //   }
        // });


    }

    const closeModalEfecty = () => {
        setModalEfecty(false);
        setOkPurchase(true);
        setModalSuccessPurchase(true);
        resetProductCardDetail();
        setBotonDeshabilitado(true);
    }

    const closeModalTarjetaCredito = () => {
        setModalTarjetaCredito(false);
    }

    const closeModalTarjetaDebito = () => {
        setModalTarjetaDebito(false);
    }

    const closeModalPse = () => {
        setModalPse(false);
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })



    var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener("scroll", function () {
        var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
        var scrollModal = document.getElementById("scrollModalCheckout");

        if (scrollModal !== null) {
            if (currentScrollPos > prevScrollPos) {
                scrollModal.style.display = "block";
            } else {
                scrollModal.style.display = "none";
            }
        }

        prevScrollPos = currentScrollPos;
    });

    const openAddressCheckoutModal = () => {
        setModalAddressCheckout(true);
        setIsScrollModalEnabled(false);
    };

    const closeAddressCheckoutModal = () => {
        setModalAddressCheckout(false);
        setIsScrollModalEnabled(true);
    };

    const closeModalPDF = () => {
        setShowPDF(false);
        setIsScrollModalEnabled(true);
    }

    const closeModalOTP = () => {
        setModalOTP(false);
        setIsScrollModalEnabled(true);
    }

    const closeModalMantenimientoPSE = () => {
        setModalMantenimientoPSE(false);
    }

    const getAddressById = (addrId) => {
        // console.log("Id de la direccion: ", idAddress);
        // console.log("Este el token: ", token);
        addressById(addrId, token)
            .then((res) => {
                // console.log("Datos traidos de la direcicon ID", res.data);
                // console.log("Nombre", res.data[0].contact_person_name);
                // console.log("Celular", res.data[0].phone);
                // console.log("Como llegar", res.data[0].local_description);
                console.log(res.data[0]);
                setDataAddress(res.data);
                setContactPersonName(res.data[0].f_name || '');
                setContactPersonLastName(res.data[0].l_name || '');
                setContactPersonFullName(res.data[0].contact_person_name || '');
                setAddressType(res.data[0].address_type || '');
                setAddressForm(res.data[0].address || '');
                setZip(res.data[0].zip || '');
                setSelectedCiudad(res.data[0].city || ''); // Asumiendo que city es un objeto
                setPhone(res.data[0].phone || '');
                setphone2(res.data[0].phone_2 || '');
                setCountry(res.data[0].country || 'Colombia');
                setLocalDescription(res.data[0].local_description || '');
                setBarrio(res.data[0].barrio || '');
                setLatitude(res.data[0].latitude || '1234');
                setLongitude(res.data[0].longitude || '4321');
                setSelectedZip(res.data[0].zip || ''); // Asumiendo que zip es un valor válido
                // setSelectedCity(res.data.city || ''); // Asumiendo que city es un valor válido
                setSelectedDepto(res.data[0].zip || ''); // Asumiendo que zip es un valor válido
                setIsLoading(false);


            }).catch((err) => console.log(err));
    }

    const updateBtn = (addrId) => {
        if (token) {
            // setModalUpdateModal(true);
            setShowUpdateAdressContainer(true);
            setShowInfoAddress(false);
            setIdAddress(addrId);
            getAddressById(addrId);
            // swalWithBootstrapButtons.fire({
            //   title: '¿Quieres eliminar o actualizar esta dirección?',
            //   text: "Esto no es reversible",
            //   icon: 'warning',
            //   showCancelButton: true,
            //   confirmButtonText: 'Actualizar',
            //   cancelButtonText: 'Eliminar',
            //   reverseButtons: true,
            //   didOpen: () => {
            //     const confirmButton = document.querySelector('.swal2-confirm');
            //     confirmButton.style.marginLeft = '8px'; // Agrega margen izquierdo al botón de confirmación
            //   }
            // }).then((result) => {
            //   if (result.isConfirmed) {

            //     setIdAddress(addrId);

            //     setModalAddressUpdate(true);

            //   } else if (
            //     /* Read more about handling dismissals below */
            //     result.dismiss === Swal.DismissReason.cancel

            //   ) {
            //     swalWithBootstrapButtons.fire(
            //       'Eliminado',
            //       'Tu direccion fue eliminada',
            //       'error'
            //     );
            //     console.log(addrId);
            //     eliminarDireccion(addrId);



            //   }
            // })



        }
    }

    const changuevisibility = () => {
        setShowUpdateAdressContainer(false);
        setShowInfoAddress(true);
        getAllAddress();
    }



    /* traer datos de los modales para efectuar el pago */
    const handleModalData = (data) => {
        // console.log("Datos del modal:", data);
        setModalDataTarjetas(data);
        setModalDataPSE(data);
        setModalTarjetaCredito(false);
        setModalPse(false);
        setModalTarjetaDebito(false);


    };

    // const getAddressById = () => {
    //     addressById(selectedAddressId, token)
    //         .then((res) => {
    //             // console.log("Datos traidos de la direcicon ID", res.data);
    //             // console.log("Nombre", res.data[0].contact_person_name);
    //             // console.log("Celular", res.data[0].phone);
    //             // console.log("Como llegar", res.data[0].local_description);
    //             setDataAddress(res.data);

    //         })
    // }




    const eliminarDireccion = (addrId) => {
        deleteAddress(addrId, token)
            .then(() => {
                // console.log("Dirección ELiminada");
                getAllAddress();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const refreshAddress = () => {
        if (token) {
            getAllAddress();
        }
    }




    const handleSubmitOrderPaymentCard = () => {
        if (token) {
            // console.log("Envio de orden por tarjeta");


            /* The code is assigning a default value to the variable `amountValue` which is equal to the
            value of `total`. Then, it checks if there is a `discountCoupon` object and if the `total`
            property of that object is defined. If it is defined, the code assigns the value of
            `discountCoupon.total` to the `amountValue` variable, which means that the total value with
            the discount applied will be used instead of the original total value. */
            let amountValue = totalNumber; // Valor por defecto, en caso de que no haya cupón aplicado

            if (discountCoupon && discountCoupon.total !== undefined) {
                amountValue = discountCoupon.total; // Si hay un cupón aplicado, asigna el valor del total con descuento
                console.log("precio con descuento", amountValue);
            }
            /* The code is checking if there is a variable called "cupon" and if it is not undefined. If it
            exists, it assigns its value to the variable "cuponCode". If it doesn't exist or is undefined,
            "cuponCode" remains as "0". */
            let cuponCode = "0";
            if (cupon && cupon !== undefined) {
                cuponCode = cupon; // Si hay un cupón aplicado, asigna el valor del
            }



            /* The above code is checking if there is a discount coupon available and if it has a defined
            discount value. If there is a discount coupon with a defined discount value, the value of the
            discount is assigned to the variable `cuponOffSale`. If there is no discount coupon or the
            discount value is undefined, the value of `cuponOffSale` remains "0". */
            let cuponOffSale = "$0";
            if (discountCoupon && discountCoupon.discount !== undefined) {
                cuponOffSale = discountCoupon.discount;
            }
            // Eliminar el símbolo "$" y convertir a número
            const numericValue = Number(amountValue.replace("$", ""));

            //Cupon code limpio
            const cuponCodeLimpio = Number(cuponCode.replace("$", ""));

            //Descuento limpio
            const cuponDescuentoLimpio = Number(cuponOffSale.replace("$", ""));

            //Anio de vencimiento 
            let year = "";
            if (modalDataTarjetas && modalDataTarjetas.cardYear) {
                year = "20" + modalDataTarjetas.cardYear;
            }

            //issuer_Id para pse
            let issuerID = "";
            if (modalDataPSE && modalDataPSE.issuer === "pse") {
                issuerID = "1037";
            }

            //Id del banco asociado para pse
            let valueIdBank = "";
            if (modalDataPSE && modalDataPSE.valueBank) {
                valueIdBank = modalDataPSE.valueBank;
            }

            //Tipo de tarjeta
            let tipo = "visa";
            if (modalDataPSE && modalDataPSE.issuer === "pse") {
                tipo = modalDataPSE.issuer;
            }

            //Documento
            let DI = "";
            if (modalDataPSE) {
                DI = modalDataPSE.identificationNumber;
            }
            if (modalDataTarjetas) {
                DI = modalDataTarjetas.identificationNumber;
            }

            //Concatenacion de los datos del numero de tarjeta
            let CardNumber = "";
            if (modalDataTarjetas && modalDataTarjetas.cardNumber) {
                const cardNumber = modalDataTarjetas.cardNumber.replace(/\s/g, '');
                CardNumber = cardNumber;
                // Resto del código para utilizar el cardNumber sin espacios
            }



            const dataOrder = {

                firstname: dataAddress[0].contact_person_name, //nombre del usuario traido odesde el id de la direccion seleccionada
                lastname: dataAddress[0].contact_person_name, //apellido del usuario traido desde el id de la direccion seleccionada
                email: userEmail, // correo del usuario userEmail
                numberPhone: dataAddress[0].phone, //numero de celular del usuario traido desde el id de la direccion seleccionada
                type: tipo, //medio de pago traido del id del metodo de pago selesccionado
                issuer_id: issuerID,  // id de banco traido del modal de pago seleccionado solo para pse !!
                installments: modalDataTarjetas.cuotes,//cuotas de tarjeta
                financial_institution: valueIdBank, //id del tipo de banco que se obtiene del modal de pago
                identificationNumber: DI, //cedula del usuario traido del modal de pago
                amount: numericValue, //valor de la compra
                ipAddress: ipAddress, //ip del cliente
                description: descriptionOrder, //Descripción del producto adquirido, el motivo del pago. Ej. - "Celular Xiaomi Redmi Note 11S 128gb 6gb Ram Original Global Blue Version" (descripción de un producto en el marketplace).
                callback_url: "https://egoi.xyz/admin/auth/login", //URL a la cual Mercado Pago hace la redirección final (sólo para transferencia bancaria).
                cardNumber: CardNumber,//numero de la tarjeta traido de los modales de tarejta
                nameInCard: modalDataTarjetas.nameCard, //nombre del propietatio de la tarjeta traido de los modales de tarjeta
                expirationMonth: modalDataTarjetas.cardMonth,//mes de vencimiento tarjeta traido de los modales de tarjeta
                expirationYear: year,// año de vencimiento, tarjeta traido de los mdoales de tarjeta
                securityCode: modalDataTarjetas.securityCode,//codigo de seguridad tarjeta traido de los modales de tarjeta 
                address_id: selectedAddressId, // id de la direccion
                billing_address_id: selectedAddressId, // id de la direccion
                coupon_code: cuponCodeLimpio, //codigo del cupon
                coupon_discount: cuponDescuentoLimpio, //el decuento que te da el cupon 
                order_note: dataAddress[0].local_description// como llegar infor traida de la direccion seleccionada por Id
            }


            verifyPurchase(dataOrder);
        }
    }

    const openWindowPSExternal = (direccion_url_pse) => {
        window.open(direccion_url_pse, "_blank");
    }

    /* Verificar compra */
    const verifyPurchase = (dataOrder) => {
        // console.log("Estos son los datos de las ordenes", dataOrder);

        makePay(dataOrder, token)
            .then((res) => {
                // console.log(res.data);
                // console.log(res.data.data.MpTransactionId.responsePayMp.transaction_details.external_resource_url);
                let direccion_url_pse = res.data.data.MpTransactionId.responsePayMp.transaction_details.external_resource_url;
                if (direccion_url_pse !== null) {
                    openWindowPSExternal(direccion_url_pse);
                }
                // console.log("El pago se registro");
                Swal.fire({
                    icon: 'success',
                    title: '¡Tu compra ha sido registrada!',
                    text: 'La compra se ha realizado exitosamente.',
                });

            }).catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Ha ocurrido un error procesando el pago!',

                })
            });

    }

    /* Realizar order */
    const makePlaceOrder = (newDataRefId) => {
        console.log("Quiero mi dataRefId");
        console.log(newDataRefId);
        let cuponOffSale = "$0";
        if (discountCoupon && discountCoupon.discount !== undefined) {
            cuponOffSale = discountCoupon.discount;
        }

        const cuponDescuentoLimpio = Number(cuponOffSale.replace("$", ""));

        console.log(cuponDescuentoLimpio);
        console.log(newDataRefId);
        console.log("Muestrame id de direccion: ", selectedAddressId);
        placeOrderEfecty(selectedAddressId, cuponDescuentoLimpio, descriptionOrder, 1, token, newDataRefId)
            .then((res) => {
                console.log("Orden enviada por Efecty");
                console.log(res);
                // setModalEfecty(true);
                // sendCopyForTwilio();
                // setModalSuccessPurchase(true);
                // setModalEfecty(false);
                // setOkPurchase(true);
            })
            .catch((err) => console.log(err));
    }


    /* Generar referencia de pago de efecty */
    const generateEfectyREF = (data, descriptionOrder) => {
        referenciaPago(data, token)
            .then((res) => {
                console.log("Haciendo compora por efecty: ", res.data);
                const newDataRef = res.data;
                setDataRef(newDataRef);
                let timerInterval;
                Swal.fire({
                    title: 'Generando ticket!',
                    html: 'Generando<b></b>',
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: () => {
                        makePlaceOrder(newDataRef.id);
                        sendCopyForTwilio(newDataRef.id);
                        Swal.showLoading();
                        const b = Swal.getHtmlContainer().querySelector('b');
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft();
                        }, 100);
                    },
                    didClose: () => {
                        clearInterval(timerInterval);
                        setModalEfecty(true);
                        // Actualizar el estado para mostrar el PDF
                        // setShowPDF(true);

                        // Abre la ventana emergente y renderiza el PDF después de cerrar el Swal
                        setTimeout(() => {
                            const newWindow = window.open('', '_blank', 'width=600,height=400');

                            if (newWindow && newWindow.document && newWindow.document.body) {
                                // Establece los estilos CSS para el contenedor
                                const containerStyles = {
                                    width: '100vw',
                                    height: '100vh',
                                    margin: 0,
                                    padding: 0,
                                    overflow: 'hidden',
                                };

                                // Establece los estilos CSS para el PDFViewer
                                const viewerStyles = {
                                    width: '100%',
                                    height: '100%',
                                };

                                // Renderiza el componente PDFViewer en la nueva ventana
                                ReactDOM.render(
                                    <div style={containerStyles}>
                                        <PDFViewer style={viewerStyles}>
                                            <PDFContent
                                                dataRefEfecty={newDataRef}
                                                totalAmount={formattedTotal !== '' ? formattedTotal : totalNumber}
                                                description={descriptionOrder}
                                            />
                                        </PDFViewer>
                                    </div>,
                                    newWindow.document.body
                                );
                            } else {
                                console.error('No se pudo encontrar el contenedor DOM en la nueva ventana.');
                            }
                        }, 1000); // Ajusta el tiempo de espera según tus necesidades

                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        // console.log('I was closed by the timer');
                    }
                });
            })
            .catch((err) => console.log(err));
    }

    /* Reseteo de tarjeta */
    const resetProductCardDetail = () => {
        setIsResetOk(true);
        setCantProductsOnCart(0);

    }

    const onSubmitInfoProfile = (data) => {
        setLoading(true);
        if (!phone) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor ingresa un número de teléfono válido. ",
                confirmButtonColor: "#0d6efd",
            });
            setLoading(false);
        } else {
            updateInfoProfile(token, data)
                .then((res) => {
                    console.log("Guardar info de perfil");
                    getInfoPerfil();
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000)
                }).catch((err) => console.log(err));
        }
    }

    const handleSubmitInfoProfile = () => {
        const data = {
            email: email,
            f_name: infoPerfil.f_name,
            l_name: infoPerfil.l_name,
            phone: phone
        };
        console.log(data);
        onSubmitInfoProfile(data);
    }


    const handleSubmitOrderEfecty = () => {
        // handleSubmitAddress();
        if (token) {
            // console.log("Envio de orden por efecty");
            // console.log(formattedTotal);

            let amountValue = formattedTotal !== '' ? formattedTotal : totalNumber; // Valor por defecto, en caso de que no haya cupón aplicado

            const unformattedValue = amountValue ? amountValue.toString().replace(/[,]/g, '') : '';
            // Eliminar el símbolo "$" y convertir a número
            const numericValue = unformattedValue ? Number(unformattedValue.replace("$", "")) : 0;

            const dataOrder = {
                transaction_amount: numericValue, // Monto total validado si es con cupón o no
                description: descriptionOrder, // Descripción concatenada de los productos del carrito de compras
                payment_method_id: "efecty", // Id del método de pago seleccionado
                email: userEmail // Email del usuario //userEmail
            }

            generateEfectyREF(dataOrder, descriptionOrder);
        }

    }


    const removeTokenAndReload = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    const getCantCarritos = () => {
        if (currenUser) {
            const token = currenUser.token;
            allProductsCart(token)
                .then((res) => {
                    const productsOncart = res.data;
                    // console.log("Respuesta de productos del carrito de compras", productsOncart);
                    const numberOfProducts = productsOncart.length;
                    // console.log("Cantidad de productos en el carrito", numberOfProducts);
                    setCantProductsOnCart(numberOfProducts);

                }).catch((err) => console.log(err));
        }
    }


    const getInfoPerfil = () => {
        if (token) {
            getUserProfileInfo(token)
                .then((res) => {
                    console.log("Informacion del perfil", res.data);
                    setInfoPerfil(res.data);
                    setContactPersonName(res.data.f_name);
                    setContactPersonLastName(res.data.l_name);
                    setPhone(res.data.phone);
                }).catch((err) => console.log(err));

        }
    }

    const onSubmit = (data) => {
        // if(address && address.length === 0 ){
        //     getAllAddress();
        // }
        setLoading(true);
        console.log("Datos del formulario de dirección", data);
        console.log("Datos del formulario de dirección, contactPersonName", contactPersonName);
        console.log("Datos del formulario de dirección, contactPersonLastName", contactPersonLastName);
        console.log("Datos del formulario de dirección, addressForm", addressForm);
        console.log("Datos del formulario de dirección, selectedDepto", selectedDepto);
        console.log("Datos del formulario de dirección, selectedCiudad", selectedCiudad);
        console.log("Datos del formulario de dirección, phone", phone);
        console.log("Datos del formulario de dirección, localDescription", localDescription);
        if (!contactPersonName || !contactPersonLastName || !addressForm || !selectedDepto || !selectedCiudad || !phone) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete todos los campos. ",
                confirmButtonColor: "#0d6efd",
            });
            setLoading(false);


        } else {

            saveAddress(data, token)
                .then(() => {
                    // Swal.fire({
                    //     icon: 'success',
                    //     title: '¡Registro exitoso!',
                    //     text: 'La dirección ha sido registrada exitosamente.',
                    //     confirmButtonColor: '#0d6efd',
                    // });
                    console.log("Guarde la direccion");

                    setTimeout(() => {
                        getAllAddress();
                    }, 3000);

                    closeModalAddress();
                    // refreshAddress();
                    setLoading(false);
                    setShowMetodosPago(true);
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Se ha producido un error durante el registro de la dirección. Por favor, inténtelo de nuevo.',
                        confirmButtonColor: '#dc3545',
                    });
                    setLoading(false);
                })
        }
    }

    const handleSubmitInfo = () => {
        // event.preventDefault();
        const data = {
            email: email,
            f_name: f_name,
            l_name: l_name,
            phone: phone
        };
        console.log(data);
        onSubmit(data);
    }

    const handleSubmitAddress = () => {


        const data = {
            address_type: "home",
            contact_person_name: infoPerfil.f_name + " " + infoPerfil.l_name,
            f_name: infoPerfil.f_name,
            l_name: infoPerfil.l_name,
            address: addressForm,
            country: country,
            zip: selectedDepto,
            city: selectedCiudad,
            phone: infoPerfil.phone,
            phone_2: "",
            latitude: latitude,
            longitude: longitude,
            barrio: barrio,
            local_description: localDescription,
            is_billing: 'ppp'
        };
        // setContactPersonName(infoPerfil && infoPerfil.f_name);
        // setContactPersonLastName(infoPerfil && infoPerfil.l_name);
        // setPhone(infoPerfil && infoPerfil.phone);
        // console.log(infoPerfil.phone);
        changuevisibility();
        // setTimeout(() => {
        onSubmit(data);
        // }, 2000);
    }



    /* Estado para obtener IP del usuario */
    useEffect(() => {
        const fetchIp = async () => {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                const data = response.data.ip;
                // console.log(data);
                setIpAddress(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchIp();
    }, []);


    useEffect(() => {
        offcanvasValidate();
        getInfoPerfil();
        getAllProductsByCart();

    }, [])
    // useEffect(() => {
    //   console.log(shouldShowCollapseThree);
    // }, [shouldShowCollapseThree]);


    useEffect(() => {
        if (address.length > 0) {
            setShowUpdateAdressContainer(true);
        }
    }, [address]);

    useEffect(() => {

        if (token) {
            setTimeout(() => {
                getAllProductsByCart();


            }, 3000)
            getAllAddress();
            getAllDeptos();
            // toast.success('Código enviado con éxito!');


            // console.log(ipAddress);

        } else {

            history.goBack();
            setModalViewLogin(true);
        }
        ;
        // console.log(total);
        handleStepClick(activeStep, valueProgressBar);
        // if (cupon) {
        //   console.log("Este es el cupon", cupon);

        // }
        // if (selectedAddressId) {
        //   console.log("Este es el id de la direccion", selectedAddressId);
        // }

        if (selectedAddressId) {
            getAddressById(selectedAddressId);
        }

        console.log(totalNumber);

        console.log(dataAddress);

        // if (showPDF) {
        //   console.log("se muestra el pdf", showPDF);
        // }

        // if (subtotalNumber) {
        //   console.log("Este es el subtotal formateado", subtotalNumber);
        // }




    }, [activeStep, token, selectedAddressId, showPDF, modalDataPSE, modalDataTarjetas]);


    useEffect(() => {
        if (!token) {
            history.goBack();
            setModalViewLogin(true);

        } else {
            // history.push(`/detailsProduct/${id}/${slug}`);
        }

        costoDeENvio();
        // console.log(costoEnvio);
        // console.log(discountCoupon.total);
        // console.log(discountCoupon.discount);


    }, [token, subtotal, discountCoupon]);

    useEffect(() => {
        if (selectedZip) {
            allCitysByIdDepto(selectedZip, token)
                .then((res) => {
                    console.log(res.data);
                    setCity(res.data);
                }).catch((err) => console.log(err));
        }
    }, [selectedZip]);


    useEffect(() => {
        showModalDesription();
    }, [address]);

    useEffect(() => {
        setSelectedAddressIndex(0);
        if (address && address.length > 0) {
            setSelectedAddressId(address[0].id); // Asigna el id del primer elemento del array 'data' o ajusta según tus necesidades
            console.log("Valor de el id de la direccion: ", address[0].id);
            setDataAddress(address[0]);
        }

    }, [address]);


    // useEffect(() => {
    //   // Obtener la URL actual
    //   const currentPath = window.location.pathname;
    //   console.log(currentPath);

    //   // Encontrar la posición de '/checkout' en la URL
    //   const checkoutIndex = currentPath.indexOf('/checkout');

    //   if (checkoutIndex !== -1) {
    //     // Crear la nueva ruta conservando solo '/checkout' y los parámetros
    //     const newPath = currentPath.substring(0, checkoutIndex + '/checkout'.length);

    //     // Modificar la URL en la barra de direcciones
    //     window.history.replaceState(null, '', newPath);
    //   }


    return (
        <>
            {loading && <LoaderOverlay />}
            <div className="container">
                <div className="containerCheckoutSteps">
                    <div className="containerProgressBar">
                        {/* Acorrdion  */}
                        {/* <UncontrolledAccordion defaultOpen={shouldOpenAccordion()}> */}
                        {/* Acorddion item perfil */}
                        {/* <AccordionItem> */}
                        {/* <AccordionHeader targetId='1' > */}
                        <div className="d-flex flex-column ">
                            <h5>1. PERFIL</h5>
                            <div className="card-body card1" style={{ backgroundColor: 'transparent' }} id='infoPerfil'>
                                {/* <Card > */}
                                <p style={{ marginLeft: '10px' }}>Solicitamos únicamente la información esencial para la finalización de la compra.</p>
                                <Form onSubmit={handleSubmitInfo}>
                                    <FormGroup controlId="formBasicEmail">
                                        <Input addon={true}
                                            name="email"
                                            classNanme="form-control"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            placeholder="Email"
                                            value={infoPerfil.email}
                                            onBlur={handleSubmitInfoProfile}
                                            // onBlur={validateEMailInput}
                                            onChange={(event) => setEmail(event.target.value)}


                                        />

                                    </FormGroup>
                                    <FormGroup controlId="formBasicName" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                        <Input addon={true}
                                            name="contactPersonName"
                                            classNanme="form-control"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            placeholder="Nombre"
                                            value={infoPerfil.f_name}
                                            onBlur={handleSubmitInfoProfile}
                                            onChange={(event) => setF_name(event.target.value)}
                                        />

                                        <Input addon={true}
                                            name="contactPersonName"
                                            classNanme="form-control"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            placeholder="Apellido"
                                            value={infoPerfil.l_name}
                                            onBlur={handleSubmitInfoProfile}
                                            onChange={(event) => setL_name(event.target.value)}
                                        />

                                    </FormGroup>
                                    <FormGroup controlId="formBasicName" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                        {/* <Input addon={true}
                                                            name="contactPersonName"
                                                            classNanme="form-control"
                                                            style={{
                                                                borderRadius: "50px",
                                                            }}
                                                            placeholder="Ciudad"
                                                        // value=""
                                                        // onChange={(event) => setContactPersonName(event.target.value)}
                                                        /> */}

                                        <PhoneInput
                                            localization={es}
                                            country={"co"}
                                            value={infoPerfil.phone}
                                            onBlur={handleSubmitInfoProfile}
                                            onChange={setPhone}
                                            inputStyle={{
                                                width: buttonWidth,
                                                height: "10px",
                                                borderRadius: "50px",
                                                outline: "none",
                                                ":focus": {
                                                    borderRadius: "50px",
                                                },
                                            }}
                                        />


                                    </FormGroup>
                                    {/* <div className="form-group" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '30px', height: 48 }}> */}
                                    {/* <div>
                                            <Input
                                                className="custom-input"
                                                cssModule={{ color: "red" }}
                                                type="checkbox"
                                                name="terms"
                                                id="terms"
                                                value="true"
                                                checked={termsAccepted}
                                                onClick={() => {
                                                    setTermsAccepted(!termsAccepted);
                                                    if (!termsAccepted) {
                                                        handleSubmitInfo();
                                                    }
                                                }}
                                                style={{ marginRight: "10px", borderRadius: "50%", border: "1px solid black" }}
                                            />
                                            <span style={{ marginTop: '20px', marginRight: "10px" }}>Acepto <a href='/termsAndConditions' style={{ textDecoration: 'none', color: '#FC5241', textAlign: 'center' }}>términos y condiciones</a> y autorizo tratamiento de datos.</span>
                                        </div> */}
                                    {/* <a href="#" style={{ backgroundColor: '#FC5241', color: 'white', textDecoration: 'none', padding: '12px', borderRadius: '32px', display: 'flex', width: '300px', textAlign: 'center', justifyContent: 'center' }} onClick={handleSubmitInfo}>
                                        {loading &&
                                            <TailSpin
                                                height="20"
                                                width="20"
                                                color="white"
                                                ariaLabel="tail-spin-loading"
                                                radius="1"
                                                wrapperStyle={{ marginRight: '20px' }}
                                                wrapperClass=""
                                                visible={true}
                                            />
                                        }
                                        Continuar con datos de envío
                                    </a> */}
                                    {/* </div> */}

                                </Form>
                                {/* </Card> */}
                            </div>
                        </div>

                        {/* </AccordionHeader> */}
                        {/* <AccordionBody accordionId='1'> */}
                        <div className="card-body card1">
                            {/* <Card style={{ padding: 20, backgroundColor: 'transparent' }}>
                                        </Card> */}
                            {/* <div className="opcionesUpdateOrDelete d-flex justify-content-center">
                                <a href="#" onClick={(e) => { e.preventDefault(); removeTokenAndReload() }} className='d-flex justify-content-start' style={{ textDecoration: 'none', color: '#FC5241', gap: '3px', alignItems: 'center' }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FC5241" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                                    </svg>
                                    No soy yo, cerrar sesión
                                </a>
                            </div> */}
                        </div>
                        {/* </AccordionBody> */}
                        {/* </AccordionItem> */}
                        {/* Fin acorrdion item perfil */}
                        {/* Incio accordion Direccion */}
                        {/* <AccordionItem> */}
                        {/* <AccordionHeader targetId='2' > */}
                        <div className="d-flex flex-column">
                            <h5>2. ENVÍO </h5>
                            {/* {address && address.map((addr, index) => (
                                <>
                                    <p style={{ marginBottom: 0 }}>{addr.address.toUpperCase()}</p>
                                    <p style={{ marginBottom: 0 }} >{addr.city + " " + addr.zip.toUpperCase()}</p>
                                    <p style={{ marginBottom: 0 }}>{addr.country}</p>
                                </>
                            ))} */}
                        </div>
                        {/* </AccordionHeader> */}
                        {/* <AccordionBody accordionId='2'> */}
                        {/* <Form>
                                        <FormGroup controlId="countryAndZip" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>

                                            <Input addon={true}
                                                name="zip"
                                                classNanme="form-control"
                                                style={{
                                                    borderRadius: "50px",
                                                }}
                                                value={selectedZip}
                                                type='select'
                                                onChange={handleSelectChangeZip}

                                            >
                                                <option value="">Departamento</option>
                                                {deptos && deptos.map((depto, index) => (
                                                    <option value={depto.id_departamento} key={index}>{depto.departamento}</option>
                                                ))}
                                            </Input>

                                            <Input addon={true}
                                                name="city"
                                                classNanme="form-control"
                                                style={{
                                                    borderRadius: "50px",
                                                }}
                                                placeholder="Ciudad"
                                                value={selectedCity}
                                                type='select'
                                                onChange={handleSelectChangeCity}
                                            >
                                                <option value="">Ciudad</option>
                                                {city && city.map((city, index) => (
                                                    <option value={city.id} key={index}>{city.nombre}</option>
                                                ))}
                                            </Input>


                                        </FormGroup>
                                    </Form> */}
                        {showInfoAddress && (

                            driveAddress && (
                                <div className="cards" id="cardsAddress" >
                                    <Form onSubmit={handleSubmitAddress}>
                                        <FormGroup controlId="countryAndZip" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>

                                            <Input addon={true}
                                                name="zip"
                                                classNanme="form-control"
                                                style={{
                                                    borderRadius: "50px",
                                                }}
                                                value={selectedZip}
                                                type='select'
                                                onChange={handleSelectChangeZip}

                                            >
                                                <option value="">Departamento</option>
                                                {deptos && deptos.map((depto, index) => (
                                                    <option value={depto.id_departamento} key={index}>{depto.departamento}</option>
                                                ))}
                                            </Input>

                                            <Input addon={true}
                                                name="city"
                                                classNanme="form-control"
                                                style={{
                                                    borderRadius: "50px",
                                                }}
                                                placeholder="Ciudad"
                                                value={selectedCity}
                                                type='select'
                                                onChange={handleSelectChangeCity}
                                            >
                                                <option value="">Ciudad</option>
                                                {city && city.map((city, index) => (
                                                    <option value={city.id} key={index}>{city.nombre}</option>
                                                ))}
                                            </Input>


                                        </FormGroup>


                                        <FormGroup controlId="formBasicDireccion">
                                            <Input addon={true}
                                                name="address"
                                                classNanme="form-control"
                                                style={{
                                                    borderRadius: "50px",
                                                }}
                                                placeholder="Dirección"
                                                value={addressForm}
                                                onBlur={handleSubmitAddress}
                                                onChange={(event) => setAddressForm(event.target.value)}
                                            />

                                        </FormGroup>

                                        {/* <FormGroup controlId="formBasicDescripcionandBarrio" >
                                                        <Input addon={true}
                                                            name="barrio"
                                                            classNanme="form-control"
                                                            style={{
                                                                borderRadius: "50px",
                                                            }}
                                                            placeholder="Barrio"
                                                            value={barrio}
                                                            onChange={(event) => setBarrio(event.target.value)}
                                                        />
    
    
    
                                                    </FormGroup> */}


                                        <FormGroup>
                                            <Input addon={true}
                                                type="textarea"
                                                name="local_description"
                                                classNanme="form-control"
                                                style={{
                                                    borderRadius: "50px",
                                                }}
                                                placeholder="¿Cómo llegar?(OPCIONAL)"
                                                value={localDescription}
                                                onBlur={handleSubmitAddress}
                                                onChange={(event) => setLocalDescription(event.target.value)}
                                            />
                                        </FormGroup>
                                        {/* 
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                                            <Button
                                                style={{
                                                    backgroundColor: "#fc5241",
                                                    borderColor: "#fc5241",
                                                    borderRadius: "50px",
                                                    marginTop: "10px"
                                                }}
                                                type="submit"
                                                disabled={loading}
                                            >
                                                {loading ? 'Cargando...' : 'Registrar dirección'}
                                            </Button>

                                        </div> */}
                                    </Form>


                                </div>
                            )
                            // : (
                            //     <div className="cards" id="cardsAddress">
                            //         {address && address.map((addr, index) => (

                            //             <div className="card-body card1" key={index}>
                            //                 <div className="contenedorP">
                            //                     <div className="seleccion">
                            //                         <Input type="checkbox" name="" id={addr.id}
                            //                             checked={selectedAddressIndex === index}
                            //                             onChange={() => checkboxChange(index, addr.id)} />

                            //                     </div>
                            //                     <div className="contenido">
                            //                         {/* <p>{addr.address_type === "home" ? "Hogar" : addr.address_type && addr.address_type === "permanent" ? "Trabajo" : addr.address_type && addr.address_type === "others" ? "Otro" : addr.address_type}</p> */}
                            //                         <p>{addr.address.toUpperCase()}</p>
                            //                         <p >{addr.city + " " + addr.zip.toUpperCase()}</p>
                            //                         <p >{addr.country}</p>
                            //                         {/* <p>
                            //                                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            //                                         <path d="M7.46399 3.79261C7.03626 3.23986 6.28321 3.05281 5.63801 3.32126C5.54774 3.35882 5.45344 3.41223 5.32375 3.48569L5.31028 3.49332L5.30288 3.49751L5.29566 3.50201C5.00861 3.68109 4.82023 3.95405 4.69556 4.2289C4.57038 4.50491 4.49755 4.8085 4.45538 5.08768C4.37743 5.60368 4.39469 6.107 4.42814 6.31578C4.42878 6.32507 4.42964 6.33573 4.4308 6.34777C4.43434 6.38486 4.44065 6.43506 4.45185 6.49892C4.47423 6.62664 4.51613 6.809 4.59449 7.05051C4.75112 7.53321 5.05395 8.25386 5.64003 9.24952C6.2264 10.2457 6.74008 10.912 7.11324 11.3338C7.29979 11.5446 7.45108 11.6942 7.55859 11.7932C7.61234 11.8427 7.65512 11.8795 7.68586 11.905C7.70123 11.9177 7.71358 11.9276 7.72279 11.9349L7.73265 11.9425C8.00181 12.1592 8.45179 12.4476 8.9564 12.6281C9.4537 12.806 10.0856 12.9072 10.6471 12.62L10.6547 12.6161L10.6621 12.6119L10.6814 12.601C10.8074 12.5297 10.901 12.4767 10.9784 12.4195C11.5423 12.0025 11.7563 11.2599 11.4798 10.6149C11.442 10.5267 11.3879 10.4347 11.3165 10.3136L11.3051 10.2941L11.1821 10.0852L11.1723 10.0685C11.0482 9.85764 10.949 9.68917 10.8532 9.56178C10.7271 9.39402 10.5591 9.29629 10.4304 9.23454C10.2527 9.14925 10.0549 9.11514 9.87898 9.0991C9.70021 9.08282 9.51069 9.08282 9.34048 9.08362L9.29644 9.08384C9.13673 9.08467 8.99414 9.0854 8.86305 9.07739C8.71793 9.06852 8.61986 9.05025 8.5575 9.02624C8.52407 9.01336 8.49098 8.99816 8.45836 8.98064C8.42394 8.96216 8.40425 8.94866 8.39188 8.93821C8.28826 8.85067 8.0171 8.59839 7.76503 8.17016C7.47008 7.66907 7.42997 7.31682 7.42685 7.28477C7.42182 7.1909 7.43098 7.09725 7.45341 7.0059C7.4707 6.93552 7.51126 6.83979 7.57954 6.71111C7.62692 6.6218 7.67846 6.53305 7.73473 6.43616C7.75991 6.39279 7.78605 6.34779 7.81317 6.30038C7.8961 6.15546 7.98481 5.99375 8.05212 5.83081C8.1183 5.67061 8.17652 5.47988 8.1735 5.28005C8.17216 5.19117 8.16407 5.06448 8.11427 4.9331C8.05058 4.76509 7.94017 4.57761 7.80031 4.34009L7.78253 4.3099L7.65944 4.10109L7.64614 4.07848C7.57599 3.95922 7.52232 3.86798 7.46399 3.79261Z" fill="#171523" />
                            //                                     </svg>
                            //                                     +{addr.phone}
                            //                                 </p> */}

                            //                     </div>
                            //                 </div>
                            //                 <div className="opcionesUpdateOrDelete d-flex justify-content-center">
                            //                     <a href="#" onClick={(e) => { e.preventDefault(); updateBtn(addr.id) }} className='d-flex justify-content-start' style={{ textDecoration: 'none', color: '#FC5241', gap: '3px' }} >
                            //                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FC5241" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            //                             <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            //                             <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            //                         </svg>
                            //                         Modificar dirección
                            //                     </a>
                            //                 </div>
                            //             </div>
                            //         ))}
                            //         {/* <div className="addNewAddress d-flex justify-content-center"  >
                            //                     <a href="#" onClick={() => setModalAddressCheckout(true)} >
                            //                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FC5241" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
                            //                             <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                            //                             <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4" />
                            //                         </svg>
                            //                         Agregar dirección</a>
                            //                 </div> */}
                            //     </div>

                            // )
                        )}
                        {showUpdateAddressContainer && (
                            <div className="cards" id="cardsAddress" >
                                <Form onSubmit={handleSubmitAddress}>
                                    <FormGroup controlId="countryAndZip" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>

                                        <Input addon={true}
                                            name="zip"
                                            classNanme="form-control"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            value={selectedZip}
                                            type='select'
                                            onChange={handleSelectChangeZip}

                                        >
                                            <option value="">{selectedZip}</option>
                                            {deptos && deptos.map((depto, index) => (
                                                <option value={depto.id_departamento} key={index}>{depto.departamento}</option>
                                            ))}
                                        </Input>

                                        <Input addon={true}
                                            name="city"
                                            classNanme="form-control"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            placeholder="Ciudad"
                                            value={selectedCity}
                                            type='select'
                                            onChange={handleSelectChangeCity}
                                        >
                                            <option value="">{selectedCiudad}</option>
                                            {city && city.map((city, index) => (
                                                <option value={city.id} key={index}>{city.nombre}</option>
                                            ))}
                                        </Input>


                                    </FormGroup>


                                    <FormGroup controlId="formBasicDireccion">
                                        <Input addon={true}
                                            name="address"
                                            classNanme="form-control"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            placeholder="Dirección"
                                            value={addressForm}
                                            onBlur={handleSubmitAddress}
                                            onChange={(event) => setAddressForm(event.target.value)}
                                        />

                                    </FormGroup>

                                    {/* <FormGroup controlId="formBasicDescripcionandBarrio" >
                                                <Input addon={true}
                                                    name="barrio"
                                                    classNanme="form-control"
                                                    style={{
                                                        borderRadius: "50px",
                                                    }}
                                                    placeholder="Barrio"
                                                    value={barrio}
                                                    onChange={(event) => setBarrio(event.target.value)}
                                                />



                                            </FormGroup> */}


                                    <FormGroup>
                                        <Input addon={true}
                                            type="textarea"
                                            name="local_description"
                                            classNanme="form-control"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            placeholder="¿Cómo llegar? (Opcional)"
                                            value={localDescription}
                                            onBlur={handleSubmitAddress}
                                            onChange={(event) => setLocalDescription(event.target.value)}
                                        />
                                    </FormGroup>

                                    {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}

                                    {/* <Button
                                            style={{
                                                backgroundColor: "#fc5241",
                                                borderColor: "#fc5241",
                                                borderRadius: "50px",
                                                marginTop: "10px"
                                            }}
                                            type="submit"
                                            disabled={loading}

                                        >
                                            {loading ? 'Cargando...' : 'Actualizar dirección'}
                                        </Button> */}

                                    {/* </div> */}
                                </Form>


                            </div>
                        )}
                        {/* </AccordionBody> */}
                        {/* </AccordionItem> */}
                        {/* Fin accordion direccion */}
                        {/* Inicio acorrdion item pago */}
                        {/* <AccordionItem> */}
                        {/* <AccordionHeader targetId='3' > */}
                        {/* <div className="container"> */}
                        <h5>3. PAGO </h5>
                        {/* </AccordionHeader> */}
                        {/* <AccordionBody accordionId='3'> */}
                        {showMetodosPago || address.length > 0 ? (
                            <UncontrolledAccordion>
                                <AccordionItem>
                                    <AccordionHeader targetId='4'>
                                        <h6>Tarjeta débito</h6>
                                    </AccordionHeader>
                                    <AccordionBody accordionId='4'>

                                        <TarjetaDebitoModal
                                            closeModalTarjetaDebito={closeModalTarjetaDebito}
                                            dataOrderAddress={dataAddress}
                                            total={formattedTotal !== '' ? formattedTotal : totalNumber}
                                            discountCoupon={discountCoupon}
                                            cupon={cupon}
                                            ipAddress={ipAddress}
                                            idAddress={selectedAddressId}
                                            descriptionOrder={descriptionOrder}
                                            // setBtnFinalizarCompra={() => setModalSuccessPurchase(true)}
                                            // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                                            setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                                            setOk={() => setOkPurchase(true)}
                                            setModalProcesoPago={() => setModalProcesoPago(true)}
                                            setModalProcesoPagoClose={() => setModalProcesoPago(false)}
                                            updateAddress={handleSubmitAddress}
                                        />
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId='5'>
                                        <h6>Tarjeta crédito</h6>
                                    </AccordionHeader>
                                    <AccordionBody accordionId='5'>
                                        <TarjetaCreditoModal
                                            // handleModalData={handleModalData} 
                                            closeModalTarjetaCredito={closeModalTarjetaCredito}
                                            dataOrderAddress={dataAddress}
                                            total={formattedTotal !== '' ? formattedTotal : totalNumber}
                                            discountCoupon={discountCoupon}
                                            cupon={cupon}
                                            ipAddress={ipAddress}
                                            idAddress={selectedAddressId}
                                            descriptionOrder={descriptionOrder}
                                            // setBtnFinalizarCompra={() => setModalSuccessPurchase(true)}
                                            // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                                            setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                                            setOk={() => setOkPurchase(true)}
                                            setModalProcesoPago={() => setModalProcesoPago(true)}
                                            setModalProcesoPagoClose={() => setModalProcesoPago(false)}
                                            updateAddress={handleSubmitAddress}
                                        />
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId='6'>
                                        <h6>PSE</h6>
                                    </AccordionHeader>
                                    <AccordionBody accordionId='6'>
                                        <PseModal
                                            closeModalPse={closeModalPse}
                                            dataOrderAddress={dataAddress}
                                            total={formattedTotal !== '' ? formattedTotal : totalNumber}
                                            discountCoupon={discountCoupon}
                                            cupon={cupon}
                                            ipAddress={ipAddress}
                                            idAddress={selectedAddressId}
                                            descriptionOrder={descriptionOrder}
                                            // setBtnFinalizarCompra={() => setModalSuccessPurchase(true)}
                                            // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                                            setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                                            setOk={() => setOkPurchase(true)}
                                            setModalProcesoPago={() => setModalProcesoPago(true)}
                                            setModalProcesoPagoClose={() => setModalProcesoPago(false)}
                                            updateAddress={handleSubmitAddress}
                                        />
                                    </AccordionBody>
                                </AccordionItem>
                                {totalNumber >= 5000 && (
                                    <AccordionItem>
                                        <AccordionHeader targetId='7'>
                                            <h6>Efecty</h6>
                                        </AccordionHeader>
                                        <AccordionBody accordionId='7'>
                                            <div className="d-flex flex-column align-items-center">
                                                <img src={efectyLogo} style={{ width: 100 }} />
                                                <p>Pago por consignación, genera tu ticket acá</p>
                                                <div style={{ width: "100%", height: "48px", display: "flex", justifyContent: "center", marginTop: "20px", flexDirection: 'column', marginBottom: '20px' }}>
                                                    {/* <div style={{ justifyContent: 'center', textAlign: 'center' }}>
                                                    <Input
                                                        className="custom-input"
                                                        cssModule={{ color: "red" }}
                                                        type="checkbox"
                                                        name="terms"
                                                        id="terms"
                                                        value="true"
                                                        checked={termsAccepted}
                                                        onClick={() => setTermsAccepted(!termsAccepted)}
                                                        style={{ marginRight: "10px", borderRadius: "50%", border: "1px solid black" }}
                                                    />
                                                    <span style={{ marginTop: '20px', marginRight: "10px" }}>Acepto <a href='/termsAndConditions' style={{ textDecoration: 'none', color: '#FC5241', textAlign: 'center' }}>términos y condiciones</a> y autorizo tratamiento de datos.</span>
                                                </div> */}
                                                    <Button style={{ marginTop: '10px', display: "flex", alignSelf: "center", textDecoration: "none", color: "white", width: "40%", height: "48px", justifyContent: "center", backgroundColor: "#FC5241", alignItems: "center", border: 'none', borderRadius: "32px" }} onClick={(e) => { e.preventDefault(); handleSubmitOrderEfecty() }}>Generar ticket</Button>
                                                </div>

                                            </div>
                                            {/* <EfectyModal totalAmount={formattedTotal !== '' ? formattedTotal : totalNumber}
                                                // closeEfectyModal={() => closeModalEfecty()}
                                                dataRef={dataRef}
                                                addressId={selectedAddressId}
                                                descriptionOrder={descriptionOrder}
                                                cupon={cupon}
                                                // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                                                setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                                                setOk={() => setOkPurchase(true)} /> */}
                                        </AccordionBody>
                                    </AccordionItem>
                                )}
                                {totalNumber >= 39990 && totalNumber <= 1999000 && (
                                    <AccordionItem>
                                        <AccordionHeader targetId='8'>
                                            <h6>Pago contra entrega</h6>
                                        </AccordionHeader>
                                        <AccordionBody accordionId='8'>
                                            <CashDeliveryOTP phone={phone}
                                                closeModalOTP={closeModalOTP}
                                                addressId={selectedAddressId}
                                                descriptionOrder={descriptionOrder}
                                                cupon={cupon}
                                                // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                                                setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                                                setOk={() => setOkPurchase(true)}
                                                updateAddress={handleSubmitAddress}
                                            />
                                        </AccordionBody>
                                    </AccordionItem>
                                )}
                            </UncontrolledAccordion>
                        ) : (
                            <UncontrolledAccordion>
                                <AccordionItem>
                                    <AccordionHeader targetId='4'>
                                        <h6>Tarjeta débito</h6>
                                    </AccordionHeader>
                                    {/* <AccordionBody accordionId='4'> */}

                                    {/* <TarjetaDebitoModal
                                        closeModalTarjetaDebito={closeModalTarjetaDebito}
                                        dataOrderAddress={dataAddress}
                                        total={formattedTotal !== '' ? formattedTotal : totalNumber}
                                        discountCoupon={discountCoupon}
                                        cupon={cupon}
                                        ipAddress={ipAddress}
                                        idAddress={selectedAddressId}
                                        descriptionOrder={descriptionOrder}
                                        // setBtnFinalizarCompra={() => setModalSuccessPurchase(true)}
                                        // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                                        setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                                        setOk={() => setOkPurchase(true)}
                                        setModalProcesoPago={() => setModalProcesoPago(true)}
                                        setModalProcesoPagoClose={() => setModalProcesoPago(false)}
                                        updateAddress={handleSubmitAddress}
                                    /> */}
                                    {/* </AccordionBody> */}
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId='5'>
                                        <h6>Tarjeta crédito</h6>
                                    </AccordionHeader>
                                    {/* <AccordionBody accordionId='5'> */}
                                    {/* <TarjetaCreditoModal
                                        // handleModalData={handleModalData} 
                                        closeModalTarjetaCredito={closeModalTarjetaCredito}
                                        dataOrderAddress={dataAddress}
                                        total={formattedTotal !== '' ? formattedTotal : totalNumber}
                                        discountCoupon={discountCoupon}
                                        cupon={cupon}
                                        ipAddress={ipAddress}
                                        idAddress={selectedAddressId}
                                        descriptionOrder={descriptionOrder}
                                        // setBtnFinalizarCompra={() => setModalSuccessPurchase(true)}
                                        // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                                        setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                                        setOk={() => setOkPurchase(true)}
                                        setModalProcesoPago={() => setModalProcesoPago(true)}
                                        setModalProcesoPagoClose={() => setModalProcesoPago(false)}
                                        updateAddress={handleSubmitAddress}
                                    /> */}
                                    {/* </AccordionBody> */}
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId='6'>
                                        <h6>PSE</h6>
                                    </AccordionHeader>
                                    {/* <AccordionBody accordionId='6'> */}
                                    {/* <PseModal
                                        closeModalPse={closeModalPse}
                                        dataOrderAddress={dataAddress}
                                        total={formattedTotal !== '' ? formattedTotal : totalNumber}
                                        discountCoupon={discountCoupon}
                                        cupon={cupon}
                                        ipAddress={ipAddress}
                                        idAddress={selectedAddressId}
                                        descriptionOrder={descriptionOrder}
                                        // setBtnFinalizarCompra={() => setModalSuccessPurchase(true)}
                                        // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                                        setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                                        setOk={() => setOkPurchase(true)}
                                        setModalProcesoPago={() => setModalProcesoPago(true)}
                                        setModalProcesoPagoClose={() => setModalProcesoPago(false)}
                                        updateAddress={handleSubmitAddress}
                                    /> */}
                                    {/* </AccordionBody> */}
                                </AccordionItem>
                                {totalNumber >= 5000 && (
                                    <AccordionItem>
                                        <AccordionHeader targetId='7'>
                                            <h6>Efecty</h6>
                                        </AccordionHeader>
                                        {/* <AccordionBody accordionId='7'> */}
                                        {/* <div className="d-flex flex-column align-items-center">
                                            <img src={efectyLogo} style={{ width: 100 }} />
                                            <p>Pago por consignación genera tu ticket acá</p>
                                            <div style={{ width: "100%", height: "48px", display: "flex", justifyContent: "center", marginTop: "20px", flexDirection: 'column', marginBottom: '20px' }}>
                                                {/* <div style={{ justifyContent: 'center', textAlign: 'center' }}>
                                                    <Input
                                                        className="custom-input"
                                                        cssModule={{ color: "red" }}
                                                        type="checkbox"
                                                        name="terms"
                                                        id="terms"
                                                        value="true"
                                                        checked={termsAccepted}
                                                        onClick={() => setTermsAccepted(!termsAccepted)}
                                                        style={{ marginRight: "10px", borderRadius: "50%", border: "1px solid black" }}
                                                    />
                                                    <span style={{ marginTop: '20px', marginRight: "10px" }}>Acepto <a href='/termsAndConditions' style={{ textDecoration: 'none', color: '#FC5241', textAlign: 'center' }}>términos y condiciones</a> y autorizo tratamiento de datos.</span>
                                                </div> */}
                                        {/* <Button style={{ marginTop: '10px', display: "flex", alignSelf: "center", textDecoration: "none", color: "white", width: "40%", height: "48px", justifyContent: "center", backgroundColor: "#FC5241", alignItems: "center", border: 'none', borderRadius: "32px" }} onClick={(e) => { e.preventDefault(); handleSubmitOrderEfecty() }}>Generar ticket</Button>
                                            </div>

                                        </div>  */}
                                        {/* <EfectyModal totalAmount={formattedTotal !== '' ? formattedTotal : totalNumber}
                                                // closeEfectyModal={() => closeModalEfecty()}
                                                dataRef={dataRef}
                                                addressId={selectedAddressId}
                                                descriptionOrder={descriptionOrder}
                                                cupon={cupon}
                                                // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                                                setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                                                setOk={() => setOkPurchase(true)} /> */}
                                        {/* </AccordionBody> */}
                                    </AccordionItem>
                                )}
                                {totalNumber >= 39990 && totalNumber <= 1999000 && (
                                    <AccordionItem>
                                        <AccordionHeader targetId='8'>
                                            <h6>Pago contra entrega</h6>
                                        </AccordionHeader>
                                        {/* <AccordionBody accordionId='8'> */}
                                        {/* <CashDeliveryOTP phone={infoPerfil.phone}
                                            closeModalOTP={closeModalOTP}
                                            addressId={selectedAddressId}
                                            descriptionOrder={descriptionOrder}
                                            cupon={cupon}
                                            // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                                            setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                                            setOk={() => setOkPurchase(true)}
                                            updateAddress={handleSubmitAddress}
                                        /> */}
                                        {/* </AccordionBody> */}
                                    </AccordionItem>
                                )}
                            </UncontrolledAccordion>
                        )}
                        {/* </div> */}
                        {/* </AccordionBody> */}
                        {/* </AccordionItem> */}
                        {/* Fin acorrdion item pago */}
                        {/* </UncontrolledAccordion> */}
                        {/* Fin accordion  */}

                    </div >
                    <div className="containerDetailpurchase">
                        <Card>
                            <div className="subtotal">
                                <p>Subtotal</p>
                                {isResetOk ? (
                                    <p>$0</p>
                                ) : (

                                    <p>${subtotalWithoutDiscount.toLocaleString('es')}</p>
                                )}
                            </div>
                            <div className="impuesto">
                                <p>Impuesto</p>
                                {isResetOk ? (
                                    <p>$0</p>
                                ) : (

                                    <p>$0</p>
                                )}
                            </div>
                            <div className="envio">
                                <p>Envío</p>
                                {isResetOk ? (
                                    <p>$0</p>
                                ) : (
                                    subtotal && subtotal <= 39900 ? (
                                        <span className='badge text-bg-success'>Paga el cliente</span>
                                    ) : (
                                        <p>${costoEnvio.toLocaleString('es')}</p>
                                    )
                                )}
                            </div>
                            <div className="descuento">
                                <p>Descuento</p>
                                {isResetOk ? (
                                    <p>$0</p>
                                ) : (
                                    discountCoupon && discountCoupon.total !== undefined ? (
                                        <p>{discountCoupon.discount}</p>
                                    ) : (
                                        <p>${discountedProducts.toLocaleString('es')}</p>
                                    )
                                )}
                            </div>
                            <div className="cupon">
                                <Input
                                    addon={true}
                                    name="cuoponDiscount"
                                    classNanme="form-control"
                                    style={{
                                        borderRadius: "50px",

                                    }}
                                    type="text"
                                    placeholder="Cupón promocional"
                                    value={cupon}
                                    onChange={(event) => setCupon(event.target.value)}
                                />
                                {discountedProducts === 0 ? (
                                    <a href="#" onClick={(e) => { e.preventDefault(); aplicarCupon() }}>Aplicar cupón</a>
                                ) : (
                                    <a href="#" style={{ pointerEvents: 'none', backgroundColor: 'gray' }}>Aplicar cupón</a>
                                )}
                            </div>
                            <div className="totalCash">
                                <h6>Total a pagar</h6>
                                {isResetOk ? (
                                    <h5><strong>$0</strong></h5>
                                ) : (

                                    discountCoupon && discountCoupon.total !== undefined ? (
                                        <h5><strong>{discountCoupon.total}</strong></h5>
                                    ) : (
                                        <h5><strong>{totalaPagar}</strong></h5>

                                    )
                                )}
                            </div>
                            <div className="capsulas">
                                <div className="cut">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5738 6.63403C13.1555 6.60036 12.6195 6.5999 11.8575 6.5999H5.53365C5.20228 6.5999 4.93365 6.33126 4.93366 5.99989C4.93367 5.66852 5.2023 5.3999 5.53367 5.3999L11.8831 5.3999C12.6136 5.3999 13.1979 5.39989 13.6701 5.4379C14.1544 5.4769 14.5729 5.5588 14.9581 5.7522C15.5758 6.0623 16.0796 6.55796 16.3959 7.16963C16.5937 7.5522 16.6774 7.96782 16.7171 8.44703C16.7394 8.71606 16.7488 9.02184 16.7528 9.37049H17.3906C18.2149 9.37049 18.8697 9.37048 19.3978 9.413C19.9382 9.4565 20.3981 9.54742 20.8192 9.75885C21.5001 10.1007 22.0553 10.647 22.4038 11.3209C22.6199 11.7388 22.7127 12.1953 22.757 12.7297C22.8002 13.2511 22.8002 13.8972 22.8002 14.7086V15.6375C22.8002 15.8056 22.8002 15.9662 22.789 16.1018C22.7767 16.2499 22.748 16.4204 22.66 16.5906C22.5368 16.8288 22.3412 17.0207 22.1027 17.1405C21.933 17.2257 21.7633 17.2535 21.6149 17.2654C21.4785 17.2764 21.3164 17.2764 21.1453 17.2764L21.0251 17.2764C20.7695 18.0488 20.034 18.5999 19.178 18.5999C18.322 18.5999 17.5865 18.0487 17.3309 17.2764H9.94356C9.68799 18.0488 8.95248 18.5999 8.09648 18.5999C7.22063 18.5999 6.47092 18.0229 6.2324 17.2223C5.98721 17.21 5.79037 17.2042 5.53366 17.2042C5.20229 17.2042 4.93366 16.9356 4.93366 16.6042C4.93366 16.2729 5.20229 16.0042 5.53366 16.0042C5.80655 16.0042 6.02013 16.0104 6.26817 16.0226C6.53951 15.2784 7.26044 14.7528 8.09648 14.7528C8.95248 14.7528 9.68799 15.304 9.94356 16.0764H15.5557V10.2352C15.5557 9.4839 15.5553 8.95705 15.5212 8.54619C15.4877 8.1426 15.425 7.90448 15.33 7.72082C15.1312 7.33633 14.813 7.0221 14.4197 6.82463C14.2303 6.72952 13.9853 6.66716 13.5738 6.63403ZM16.7557 10.5705V16.0764H17.3309C17.5865 15.304 18.322 14.7528 19.178 14.7528C20.034 14.7528 20.7695 15.304 21.0251 16.0764H21.1256C21.3235 16.0764 21.4363 16.0759 21.5186 16.0693C21.547 16.067 21.5642 16.0644 21.5732 16.0628C21.5789 16.0588 21.5838 16.0542 21.5876 16.0493C21.5891 16.0404 21.5912 16.0255 21.5931 16.0026C21.5997 15.9228 21.6002 15.8129 21.6002 15.6175V14.7352C21.6002 13.8912 21.5997 13.2949 21.5611 12.8289C21.523 12.3701 21.4511 12.0911 21.3378 11.8721C21.1068 11.4253 20.7373 11.0605 20.2808 10.8313C20.0555 10.7181 19.769 10.6468 19.3015 10.6091C18.8272 10.5709 18.2207 10.5705 17.3646 10.5705H16.7557ZM2.71131 9.7499C2.71131 9.41853 2.97994 9.1499 3.31131 9.1499H7.08909C7.42046 9.1499 7.68909 9.41853 7.68909 9.7499C7.68909 10.0813 7.42046 10.3499 7.08909 10.3499H3.31131C2.97994 10.3499 2.71131 10.0813 2.71131 9.7499ZM1.2002 12.7499C1.2002 12.4185 1.46882 12.1499 1.8002 12.1499H7.84465C8.17602 12.1499 8.44465 12.4185 8.44465 12.7499C8.44465 13.0813 8.17602 13.3499 7.84465 13.3499H1.8002C1.46882 13.3499 1.2002 13.0813 1.2002 12.7499ZM8.09648 15.9528C7.68264 15.9528 7.36075 16.2775 7.3534 16.6624L7.35327 16.6764C7.35327 17.0676 7.67764 17.3999 8.09648 17.3999C8.51533 17.3999 8.83969 17.0676 8.83969 16.6764C8.83969 16.2851 8.51533 15.9528 8.09648 15.9528ZM19.178 15.9528C18.7591 15.9528 18.4348 16.2851 18.4348 16.6764C18.4348 17.0676 18.7591 17.3999 19.178 17.3999C19.5968 17.3999 19.9212 17.0676 19.9212 16.6764C19.9212 16.2851 19.5968 15.9528 19.178 15.9528Z" fill="#089705" />
                                    </svg>
                                    {subtotal >= 79990 ? (
                                        <p>3 días envío gratis</p>
                                    ) : (
                                        <p>3 dias envio</p>
                                    )}
                                </div>
                                <div className="cut">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.005 5.40022C11.9396 5.39967 11.874 5.40992 11.811 5.43101L7.61104 6.83735C7.367 6.91906 7.2 7.14963 7.2 7.41197V11.3023C7.2 12.5265 7.48683 13.7335 8.03717 14.8255C8.79591 16.331 10.02 17.5482 11.5252 18.2949L11.7604 18.4116C11.8375 18.4498 11.9212 18.4685 12.0048 18.4678C12.0852 18.467 12.1654 18.4484 12.2396 18.4116L12.4748 18.2949C13.98 17.5482 15.2041 16.331 15.9628 14.8255C16.5132 13.7335 16.8 12.5265 16.8 11.3023V7.41197C16.8 7.14963 16.633 6.91906 16.389 6.83735L12.189 5.43101C12.1292 5.41099 12.0671 5.40074 12.005 5.40022ZM11.43 4.2931C11.6198 4.22956 11.8175 4.1986 12.0151 4.20026C12.2026 4.20184 12.3899 4.2328 12.57 4.2931L16.77 5.69944C17.506 5.94588 18 6.6366 18 7.41197V11.3023C18 12.7139 17.6693 14.1059 17.0344 15.3655C16.1592 17.1022 14.7466 18.5075 13.0081 19.3699L12.7729 19.4865C12.5342 19.605 12.2749 19.6654 12.0153 19.6677C11.7455 19.6701 11.4753 19.6097 11.2271 19.4865L10.9919 19.3699C9.25344 18.5075 7.84081 17.1022 6.96557 15.3655C6.33073 14.1059 6 12.7139 6 11.3023V7.41197C6 6.6366 6.49403 5.94588 7.23002 5.69944L11.43 4.2931ZM14.8233 9.73422C15.0581 9.96801 15.059 10.3479 14.8252 10.5827L11.8252 13.5963C11.7126 13.7094 11.5596 13.773 11.4 13.773C11.2404 13.773 11.0874 13.7094 10.9748 13.5963L9.77478 12.3909C9.54099 12.1561 9.54185 11.7762 9.7767 11.5424C10.0115 11.3086 10.3914 11.3094 10.6252 11.5443L11.4 12.3226L13.9748 9.73614C14.2086 9.50129 14.5885 9.50044 14.8233 9.73422Z" fill="#089705" />
                                    </svg>
                                    <p>100% auténtico</p>
                                </div>
                                <div className="cut">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0172 6.04295C15.493 6.00027 14.8237 5.9998 13.8833 5.9998H10.671C9.73398 5.9998 8.91937 6.00008 8.25046 6.04366C7.56064 6.0886 7.12226 6.17594 6.8863 6.29576C6.37376 6.55605 5.95742 6.97117 5.69662 7.48131C5.56607 7.73669 5.48568 8.05769 5.44346 8.57271C5.40067 9.09479 5.4002 9.76162 5.4002 10.699V12.2446C5.4002 13.182 5.40067 13.8488 5.44346 14.3709C5.48568 14.8859 5.56607 15.2069 5.69662 15.4623C5.95742 15.9724 6.37376 16.3876 6.8863 16.6478C7.12226 16.7677 7.56064 16.855 8.25046 16.9C8.91937 16.9435 9.73398 16.9438 10.671 16.9438H17.7482L17.1151 16.3128C16.8804 16.0789 16.8798 15.699 17.1137 15.4642C17.3476 15.2295 17.7275 15.2289 17.9622 15.4628L19.6237 17.1188C19.7367 17.2314 19.8002 17.3843 19.8002 17.5438C19.8002 17.7033 19.7367 17.8562 19.6237 17.9688L17.9622 19.6248C17.7275 19.8587 17.3476 19.8581 17.1137 19.6234C16.8798 19.3887 16.8804 19.0088 17.1151 18.7748L17.7482 18.1438H10.6549C9.7369 18.1438 8.88456 18.1438 8.17244 18.0974C7.47708 18.0521 6.81784 17.959 6.34295 17.7178C5.60494 17.343 5.00455 16.7448 4.62815 16.0085C4.39652 15.5554 4.2958 15.0585 4.24748 14.4689C4.20019 13.8921 4.20019 13.1761 4.2002 12.2712V10.6725C4.20019 9.7675 4.20019 9.05152 4.24748 8.47467C4.2958 7.88512 4.39652 7.38817 4.62815 6.93507C5.00455 6.19882 5.60494 5.6006 6.34295 5.22582C6.81784 4.98466 7.47708 4.8915 8.17244 4.8462C8.88456 4.7998 9.73691 4.7998 10.6549 4.7998L13.9097 4.7998C14.8179 4.7998 15.536 4.7998 16.1146 4.84691C16.7056 4.89504 17.2035 4.9953 17.6574 5.22582C18.3954 5.6006 18.9958 6.19882 19.3722 6.93507C19.6937 7.56381 19.7675 8.29073 19.7903 9.24953C19.8002 9.66468 19.8002 10.1427 19.8002 10.6931V12.2446C19.8002 13.3705 18.885 14.2798 17.7602 14.2798H15.3233C13.7703 14.2798 12.5079 13.0245 12.5079 11.4718C12.5079 9.9191 13.7703 8.66381 15.3233 8.66381H18.5637C18.5238 8.10005 18.4448 7.75716 18.3038 7.48131C18.043 6.97117 17.6266 6.55604 17.1141 6.29576C16.8572 6.16529 16.5343 6.08506 16.0172 6.04295ZM18.5986 9.86381H15.3233C14.4292 9.86381 13.7079 10.5856 13.7079 11.4718C13.7079 12.358 14.4292 13.0798 15.3233 13.0798H17.7602C18.226 13.0798 18.6002 12.704 18.6002 12.2446V10.699C18.6002 10.3943 18.6002 10.1174 18.5986 9.86381Z" fill="#089705" />
                                        <path d="M14.7695 11.4719C14.7695 11.1671 15.0167 10.9199 15.3215 10.9199H15.8791C16.1839 10.9199 16.4311 11.1671 16.4311 11.4719C16.4311 11.7768 16.1839 12.0239 15.8791 12.0239H15.3215C15.0167 12.0239 14.7695 11.7768 14.7695 11.4719Z" fill="#089705" />
                                        <path d="M7.01562 8.15991C7.01562 7.85505 7.26276 7.60791 7.56763 7.60791H10.8944C11.1993 7.60791 11.4464 7.85505 11.4464 8.15991C11.4464 8.46477 11.1993 8.71191 10.8944 8.71191H7.56763C7.26276 8.71191 7.01562 8.46477 7.01562 8.15991Z" fill="#089705" />
                                    </svg>
                                    <p>Garantía reembolso</p>
                                </div>
                                <div className="cut">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3552 6.04686C15.785 6.00027 15.0576 5.9998 14.0396 5.9998H10.5596C9.54506 5.9998 8.66083 6.00008 7.93427 6.04757C7.18681 6.09644 6.70298 6.19159 6.43764 6.32679C5.87315 6.61441 5.41421 7.07335 5.12659 7.63783C4.98068 7.92419 4.89268 8.28099 4.84666 8.84419C4.80008 9.4144 4.79961 10.1418 4.79961 11.1598V12.8398C4.79961 13.8578 4.80008 14.5852 4.84666 15.1554C4.89268 15.7186 4.98068 16.0754 5.12659 16.3618C5.41421 16.9263 5.87315 17.3852 6.43764 17.6728C6.70298 17.808 7.18681 17.9032 7.93427 17.952C8.66083 17.9995 9.54506 17.9998 10.5596 17.9998H14.0396C15.0576 17.9998 15.785 17.9993 16.3552 17.9527C16.9184 17.9067 17.2752 17.8187 17.5616 17.6728C18.1261 17.3852 18.585 16.9263 18.8726 16.3618C19.0185 16.0754 19.1065 15.7186 19.1526 15.1554C19.1567 15.1048 19.1605 15.053 19.1639 14.9998H15.5996C13.9428 14.9998 12.5996 13.6567 12.5996 11.9998C12.5996 10.3429 13.9428 8.9998 15.5996 8.9998H19.1639C19.1605 8.94663 19.1567 8.89479 19.1526 8.84419C19.1065 8.28099 19.0185 7.92419 18.8726 7.63783C18.585 7.07335 18.1261 6.61441 17.5616 6.32679C17.2752 6.18088 16.9184 6.09287 16.3552 6.04686ZM19.1975 10.1998H15.5996C14.6055 10.1998 13.7996 11.0057 13.7996 11.9998C13.7996 12.9939 14.6055 13.7998 15.5996 13.7998H19.1975C19.1996 13.5111 19.1996 13.1929 19.1996 12.8398V11.1598C19.1996 10.8067 19.1996 10.4886 19.1975 10.1998ZM16.4529 4.85084C17.0904 4.90292 17.6226 5.01111 18.1064 5.25758C18.8967 5.66025 19.5392 6.30276 19.9418 7.09304C20.1883 7.57677 20.2965 8.10906 20.3486 8.74647C20.3996 9.37126 20.3996 10.1476 20.3996 11.1331V12.8665C20.3996 13.852 20.3996 14.6284 20.3486 15.2531C20.2965 15.8905 20.1883 16.4228 19.9418 16.9066C19.5392 17.6968 18.8967 18.3394 18.1064 18.742C17.6226 18.9885 17.0904 19.0967 16.4529 19.1488C15.8282 19.1998 15.0518 19.1998 14.0663 19.1998H10.5435C9.548 19.1998 8.6259 19.1998 7.856 19.1495C7.10285 19.1002 6.39759 18.9992 5.89285 18.742C5.10257 18.3394 4.46005 17.6968 4.05738 16.9066C3.81091 16.4228 3.70273 15.8905 3.65065 15.2531C3.5996 14.6283 3.59961 13.852 3.59961 12.8665V11.1332C3.59961 10.1476 3.5996 9.37126 3.65065 8.74647C3.70273 8.10906 3.81091 7.57677 4.05738 7.09304C4.46005 6.30276 5.10257 5.66025 5.89285 5.25758C6.39759 5.0004 7.10285 4.89936 7.856 4.85013C8.6259 4.7998 9.54799 4.7998 10.5435 4.7998L14.0663 4.7998C15.0518 4.7998 15.8282 4.7998 16.4529 4.85084Z" fill="#089705" />
                                        <path d="M15 11.9999C15 11.6685 15.2686 11.3999 15.6 11.3999H16.2C16.5314 11.3999 16.8 11.6685 16.8 11.9999C16.8 12.3313 16.5314 12.5999 16.2 12.5999H15.6C15.2686 12.5999 15 12.3313 15 11.9999Z" fill="#089705" />
                                        <path d="M6.59961 8.3998C6.59961 8.06843 6.86824 7.7998 7.19961 7.7998H10.7996C11.131 7.7998 11.3996 8.06843 11.3996 8.3998C11.3996 8.73118 11.131 8.9998 10.7996 8.9998H7.19961C6.86824 8.9998 6.59961 8.73118 6.59961 8.3998Z" fill="#089705" />
                                    </svg>
                                    <p>Pago auténtico</p>
                                </div>
                            </div>
                        </Card>
                        {/* {activeStep < 3 && (
                            <>
                                <div className="toPay">
                                    <a href="#" onClick={() => handleProcederCompra()} type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Proceder con la compra</a>

                                </div>
                                <div className="awaitShopping">
                                    <a href="/detailCart">Ir al carrito</a>
                                </div>
                            </>

                        )} */}
                        {/* {activeStep >= 3 && (
                            <>
                                {botonDeshabilitado && okPurchase ? (
                                    <div className="toPay">
                                        <a href="#" onClick={() => handlePurchaseSucces()}>Finalizar compra</a>
                                    </div>

                                ) : (
                                    <div className="toPay">
                                        <a href="#" onClick={() => handlePurchaseSucces()}
                                            style={{

                                            }}
                                        >Finalizar compra</a>
                                    </div>
                                )}
                                <div className="turnCheckout">
                                    <a href="#" onClick={() => handleStepClick(2, 50)} type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Regresar al checkout</a>
                                </div>


                            </>
                        )} */}
                    </div>
                </div >
            </div >
            {/* Modal checkout efecty */}
            < Modal
                className="modal-dialog-centered modal-sm"
                // toggle={() => closeModalEfecty()}
                isOpen={modalEfecty}
            // onOpened={() => setIsScrollModalEnabled(false)}
            // onClosed={() => setIsScrollModalEnabled(true)}
            >
                {/* <ModalHeader toggle={() => closeModalEfecty()}></ModalHeader> */}
                < ModalBody >
                    <EfectyModal
                        totalAmount={formattedTotal !== '' ? formattedTotal : totalNumber}
                        // closeEfectyModal={() => closeModalEfecty()}
                        dataRef={dataRef}
                        addressId={selectedAddressId}
                        descriptionOrder={descriptionOrder}
                        cupon={cupon}
                        // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                        setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                        setOk={() => setOkPurchase(true)} />
                </ModalBody >
            </Modal >

            {/* Modal procesando Pago */}
            <Modal
                className="modal-dialog-centered modal-md"
                toggle={() => setModalProcesoPago(false)}
                isOpen={modalProcesandoPago}
            // onOpened={() => setIsScrollModalEnabled(false)}
            // onClosed={() => setIsScrollModalEnabled(true)}
            >
                <ModalBody>
                    <ModalProcesandoPago />
                </ModalBody>
            </Modal>
        </>
    )
}

export default Checkout_V2_token
