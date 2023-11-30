import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import PhoneInput from 'react-phone-input-2'
import { AccordionBody, AccordionHeader, AccordionItem, Button, Card, Form, FormGroup, Input, Modal, ModalBody, UncontrolledAccordion } from 'reactstrap'
import { firstLogin, login_Email_Face, validateEmail } from '../../services/extraLogin';
import Swal from 'sweetalert2';
import '../../styles/detailsCart.css';
import es from "react-phone-input-2/lang/es.json";
import { getCurrentUser, setCurrentUser } from '../../helpers/Utils';
import { addCartProductsOfLocalStorage } from '../../helpers/productsLocalStorage';
import { useHistory, useLocation } from 'react-router-dom';
import { allCitysByIdDepto, allDeptos, saveAddress, uniqueAddress } from '../../services/address';
import TarjetaDebitoModal from '../../views/user/metodosDePago/tarjetaDebito';
import axios from 'axios';
import ModalProcesandoPago from '../../views/user/metodosDePago/modalProcesandoPago';
import TarjetaCreditoModal from '../../views/user/metodosDePago/tarjetaCredito';
import PseModal from '../../views/user/metodosDePago/pse';
import { PDFViewer } from '@react-pdf/renderer';
import PDFContent from '../PDF/PDFContent';
import { referenciaPago } from '../../services/metodosDePago';
import EfectyModal from '../../views/user/metodosDePago/efecty';
import CashDeliveryOTP from '../../views/user/metodosDePago/cashDeliveryOTP';
import { allProductsCart } from '../../services/cart';
import OpcionesLogin from '../../views/user/opcionesLogin.tsx';
import RegisterCode from '../../views/user/registerCode.tsx';
import CodeLogin from '../../views/user/codeLogin';
import Login from '../../views/user/login';

const Checkout_V2 = ({ getAllProductsByCartNotoken, productsInCart, offcanvasValidate }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState();
    const toggle = () => setIsOpen(!isOpen);
    const [previousStep, setPreviousStep] = useState(0);
    const [activeStep, setActiveStep] = useState(1);
    const [valueProgressBar, setValueProgressBar] = useState(0);
    const [productsCart, setProductsCart] = useState([]);
    const [modalViewRegistro, setModalViewRegistro] = useState(false);
    const [modalViewLogin, setModalViewLogin] = useState(false);
    const [modalViewCodeLogin, setModalViewCodeLogin] = useState(false);
    const [modalOpcionesLogin, setModalOpcionesLogin] = useState(false);
    const [changeFormLogin, setChangeFormLogin] = useState(false);
    const [changeFormRegister, setChangeFormRegister] = useState(false);
    const [modalAddressCheckout, setModalAddressCheckout] = useState(false);
    const [modalAddressUpdate, setModalAddressUpdate] = useState(false);
    const [modalTarjetaCredito, setModalTarjetaCredito] = useState(false);
    const [modalTarjetaDebito, setModalTarjetaDebito] = useState(false);
    const [modalEfecty, setModalEfecty] = useState(false);
    const [modalPse, setModalPse] = useState(false);
    const [modalOTP, setModalOTP] = useState(false);
    const [selectedLink, setSelectedLink] = useState('hogar');
    const [address, setAddress] = useState([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [dataAddress, setDataAddress] = useState("");
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [idAddress, setIdAddress] = useState([]);
    const [descriptionOrder, setDescriptionOrder] = useState("");
    const [costoEnvio, setCostoEnvio] = useState(0);
    const [cupon, setCupon] = useState("");
    const [discountCoupon, setDiscountCoupon] = useState("");
    const [valorAccordion, setValorAccordion] = useState("");
    /* Reseteo de tarjeta */
    const [isResetOk, setIsResetOk] = useState(false);
    /* Estado para la IP */
    const [ipAddress, setIpAddress] = useState('');

    /* Modal procesando pago */
    const [modalProcesandoPago, setModalProcesoPago] = useState(false);

    const history = useHistory();

    const location = useLocation();

    const [email, setEmail] = useState();
    const [f_name, setF_name] = useState();
    const [l_name, setL_name] = useState();
    const [phone, setPhone] = useState();
    const [loading, setLoading] = useState(false);
    const [deptos, setDeptos] = useState([]);
    const [city, setCity] = useState("");
    const [selectedZip, setSelectedZip] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [addressForm, setAddressForm] = useState("");
    const [selectedCiudad, setSelectedCiudad] = useState();
    const [selectedDepto, setSelectedDepto] = useState();
    const [acordeonAbierto, setAcordeonAbierto] = useState('1');
    const [dataRef, setDataRef] = useState([]);
    const [cantProductsOnCart, setCantProductsOnCart] = useState('');
    const [contactPersonName, setContactPersonName] = useState("");
    const [contactPersonLastName, setContactPersonLastName] = useState("");
    const [contactPersonFullName, setContactPersonFullName] = useState("");
    const [localDescription, setLocalDescription] = useState("");
    const [infoPerfil, setInfoPerfil] = useState('');
    const [country, setCountry] = useState("Colombia");
    const [latitude, setLatitude] = useState("1234");
    const [longitude, setLongitude] = useState("4321");
    const [barrio, setBarrio] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);


    const [showUpdateAddressContainer, setShowUpdateAdressContainer] = useState(false);
    const [showInfoAddress, setShowInfoAddress] = useState(true);



    /* Boton deshabilitado */
    const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
    const [okPurchase, setOkPurchase] = useState(false);

    const currenUser = getCurrentUser();

    const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currenUser sea null
    const userEmail = currenUser ? currenUser.email : null;

    const shouldOpenAccordion = !!token ? '2' : '1';
    // const shouldOpenAccordion = '1';

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

    const getAllAddress = () => {
        if (token) {
            uniqueAddress(token)
                .then((res) => {
                    console.log("Esta es la unica direccion registrada", res.data);
                    setAddress(res.data);

                }).catch((err) => console.log(err));
            // allAddress(token)
            //     .then((res) => {
            //         // console.log(res.data);
            //         setAddress(res.data);
            //         console.log("Estas son las direcciones", address);

            //     }).catch((err) => console.log(err));
        }
    }

    const closeModalAddress = () => {
        setModalAddressCheckout(false);
    }

    const refreshAddress = () => {
        if (token) {
            getAllAddress();
        }
    }


    const changuevisibility = () => {
        setShowUpdateAdressContainer(false);
        setShowInfoAddress(true);
        getAllAddress();
    }

    const onSubmitAdressForm = (data) => {
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
                    Swal.fire({
                        icon: 'success',
                        title: '¡Registro exitoso!',
                        text: 'La dirección ha sido registrada exitosamente.',
                        confirmButtonColor: '#0d6efd',
                    });
                    closeModalAddress();
                    refreshAddress();
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Se ha producido un error durante el registro. Por favor, inténtelo de nuevo.',
                        confirmButtonColor: '#dc3545',
                    });
                    setLoading(false);
                })
        }
    }

    const handleSubmitAddress = (e) => {
        e.preventDefault();

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
        setContactPersonName(infoPerfil.f_name);
        setContactPersonLastName(infoPerfil.l_name);
        setPhone(infoPerfil.phone);
        changuevisibility();
        onSubmitAdressForm(data);
    }

    const onSubmit = (data) => {
        setLoading(true);
        if (!f_name || !l_name || !email || !phone) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete todos los campos. ",
                confirmButtonColor: "#0d6efd",
            });
            setLoading(false);


        } else {
            setLoading(true);
            validateEmail(email)
                .then((res) => {
                    console.log("Respuesta de validacion", res);
                    if (res.data.status === 'ok') {
                        console.log("El usuario ya existe valide su login");
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: '¡Completaremos la información para procesar la compra!',
                            confirmButtonColor: '#FC5241',
                            confirmButtonText: 'Continuar',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Cierra el Swal
                                Swal.close();

                                // Abre el modal de opciones
                                // setModalOpcionesLogin(true);
                                login_Email_Face(email)
                                    .then((res) => {
                                        console.log("El usuario ya esta en la base de datos", res.data);
                                        const item = {
                                            token: res.data.token,
                                            email: email,
                                        }
                                        setCurrentUser(item);
                                        addCartProductsOfLocalStorage();
                                        window.location.reload();

                                    }).catch((err) => console.log(err));
                            }
                        });

                    } else {
                        console.log("El usuario puede funcionar como el logueo ");
                        firstLogin(f_name, l_name, email, phone)
                            .then((res) => {
                                console.log(res);
                                const item = {
                                    token: res.data.token,
                                    email: email,
                                }
                                setCurrentUser(item);
                                addCartProductsOfLocalStorage();
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Bienvenido',
                                    text: 'Has iniciado sesión correctamente',
                                    confirmButtonColor: '#fc5241',
                                }).then((result) => {
                                    // El usuario hizo clic en "OK"
                                    if (result.isConfirmed) {
                                        addCartProductsOfLocalStorage();
                                        window.location.reload();
                                    } else {
                                        // El usuario hizo clic fuera de la ventana
                                        addCartProductsOfLocalStorage();
                                        window.location.reload(); // Recargar la página
                                    }
                                });

                                // put(loginUserSuccess(item));

                            }).catch((err) => {
                                console.log(err);
                            });
                    }
                }).catch((err) => console.log(err));
        }

    }

    const validateEMailInput = () => {
        validateEmail(email)
            .then((res) => {
                console.log("Respuesta de validacion", res);
                if (res.data.status === 'ok') {
                    console.log("El usuario ya existe valide su login");
                    Swal.fire({
                        icon: 'info',
                        title: '¡Hola de nuevo!',
                        text: '¡Completaremos la información para procesar la compra!',
                        confirmButtonColor: '#FC5241',
                        confirmButtonText: 'Continuar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Cierra el Swal
                            Swal.close();

                            // Abre el modal de opciones
                            // setModalOpcionesLogin(true);
                            login_Email_Face(email)
                                .then((res) => {
                                    console.log("El usuario ya esta en la base de datos", res.data);
                                    const item = {
                                        token: res.data.token,
                                        email: email,
                                    }
                                    setCurrentUser(item);
                                    addCartProductsOfLocalStorage();
                                    window.location.reload();

                                }).catch((err) => console.log(err));
                        }
                    });

                }
                // else {
                //     console.log("El usuario puede funcionar como el logueo ");
                //     firstLogin(f_name, l_name, email, phone)
                //         .then((res) => {
                //             console.log(res);
                //             const item = {
                //                 token: res.data.token,
                //                 email: email,
                //             }
                //             setCurrentUser(item);
                //             addCartProductsOfLocalStorage();
                //             Swal.fire({
                //                 icon: 'success',
                //                 title: 'Bienvenido',
                //                 // text: 'Has iniciado sesión correctamente',
                //                 confirmButtonColor: '#fc5241',
                //                 html: `
                //               <p>Por favor, revisa nuestros <a href="/termsAndConditions">Términos y Condiciones</a> y <a href="/privacyPolicy">Política de Privacidad</a>.</p>
                //               <label for="aceptar">Acepto los Términos y Condiciones:</label>
                //               <input type="checkbox" id="aceptar">
                //             `,
                //                 preConfirm: () => {
                //                     const aceptado = document.getElementById('aceptar').checked;
                //                     if (!aceptado) {
                //                         Swal.showValidationMessage('Debes aceptar los Términos y Condiciones para continuar.');
                //                     }
                //                 },
                //             }).then((result) => {
                //                 if (result.isConfirmed) {
                //                     // El usuario marcó el cuadro de aceptación y confirmó
                //                     Swal.fire({
                //                         icon: 'success',
                //                         title: 'Bienvenido',
                //                         text: 'Has iniciado sesión correctamente',
                //                         confirmButtonColor: '#fc5241',
                //                     });
                //                     addCartProductsOfLocalStorage();
                //                     window.location.reload();
                //                 } else if (result.isDismissed) {
                //                     // El usuario hizo clic fuera de la ventana
                //                     addCartProductsOfLocalStorage();
                //                     window.location.reload(); // Recargar la página
                //                 }
                //             });
                //             // put(loginUserSuccess(item));

                //         }).catch((err) => {
                //             console.log(err);
                //         });
                // }
            }).catch((err) => console.log(err));
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

    const closeModalOTP = () => {
        setModalOTP(false);

    }

    const handleLogin = () => {
        // Code to handle user login, such as storing session storage, etc.
        if (currenUser) {
            // setIsLoggedIn(true);
            // setIsLoggedInPartner(true);
            // setShowTOkenOffCanvas(true);
            // setShowOffcanvasWithoutToken(false);
            addCartProductsOfLocalStorage();

        } else {
            // setIsLoggedIn(false);
            // setShowOffcanvasWithoutToken(true);
            // setShowTOkenOffCanvas(false);
        }

    };

    const handleChangeFormLogin = () => {

        if (modalViewLogin === true) {
            setModalViewRegistro(true);
        }

    };

    const closeModalRegistro = () => {
        setModalViewRegistro(false);
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

    /* Reseteo de tarjeta */
    const resetProductCardDetail = () => {
        setIsResetOk(true);
        setCantProductsOnCart(0);

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

    const generateEfectyREF = (data, descriptionOrder) => {
        referenciaPago(data, token)
            .then((res) => {
                // console.log(res.data);
                const newDataRef = res.data;
                setDataRef(newDataRef);
                let timerInterval;
                Swal.fire({
                    title: 'Generando ticket!',
                    html: 'Generando<b></b>',
                    timer: 3000,
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
                        // setModalEfecty(true);
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

    const handleSubmitOrderEfecty = () => {
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

    /* CAluclo de precios */
    const sumSubTotal = (productsCart) => {
        let total = 0;
        productsCart.map((product) => {
            if (product.discount > 0) {
                const precioTotal = (product.unit_price - product.discount) * product.min_qty;
                total += precioTotal;


            }
            if (product.discount_tag_valor) {
                const precioTotal = (product.discount_tag_valor) * product.min_qty;
                total += precioTotal;
            }

            if (product.discount_tag_valor === 0 && product.discount === 0) {
                const precioTotal = (product.unit_price) * product.min_qty;
                total += precioTotal;
            }

            // const precioTotal = product.unit_price * product.min_qty;
            // total += precioTotal;
        });


        return total;
    };



    const sumWithoutDiscount = (productsCart) => {
        let totalWithoutDiscount = 0;
        productsCart.map((product) => {
            const precioTotalWithoutDiscount = (product.unit_price) * product.min_qty;
            totalWithoutDiscount += precioTotalWithoutDiscount;
        })
        return totalWithoutDiscount;
    };

    const discountWhithTags = (productsCart) => {
        let totalDiscounts = 0;
        productsCart.map((product) => {
            const descuentosTotales = (product.discount);
            totalDiscounts += descuentosTotales;
        })
        return totalDiscounts;
    }

    const subtotal = sumSubTotal(productsInCart);

    const subtotalWithoutDiscount = sumWithoutDiscount(productsInCart);

    const discountedProducts = discountWhithTags(productsInCart);

    const descuento = '$0';

    const totalPagar = () => {


        if (subtotal <= 39900) {
            const precioTotalaPagar = subtotal + 0;
            return `$${precioTotalaPagar.toLocaleString('es')}`;
        }
        const precioTotalaPagar = subtotal + costoEnvio;
        return `$${precioTotalaPagar.toLocaleString('es')}`;

    };

    const totalaPagar = totalPagar();

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
    };

    const handleCorreoContrasena = () => {
        setModalOpcionesLogin(false);
        setModalViewLogin(true);
    }

    const closeModalLogin = () => {
        setModalViewLogin(false);
    };

    const totalNumber = parseInt(totalaPagar.replace(/[\$.]/g, ''), 10);

    let formattedDiscount = '';
    let formattedTotal = '';

    if (discountCoupon && discountCoupon.total !== undefined) {
        formattedDiscount = discountCoupon.discount.toString().replace(',', '.');
        formattedTotal = discountCoupon.total.toString().replace(',', '.');
    }
    /* Fin calculo de precios */

    const getAllDeptos = () => {
        if (token) {
            allDeptos(token)
                .then((res) => {
                    // console.log(res.data);
                    setDeptos(res.data);
                }).catch((err) => console.log(err));
        }
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
        if (selectedZip) {
            allCitysByIdDepto(selectedZip, token)
                .then((res) => {
                    console.log(res.data);
                    setCity(res.data);
                }).catch((err) => console.log(err));
        }
    }, [selectedZip]);

    useEffect(() => {


        getAllDeptos();
        getAllProductsByCart();



    }, [currenUser]);





    // useEffect(() => {
    //     if (selectedZip) {
    //         allCitysByIdDepto(selectedZip, token)
    //             .then((res) => {
    //                 console.log(res.data);
    //                 setCity(res.data);
    //             })
    //     }

    // }, [selectedZip])
    return (
        <>
            <div className="container">

                <div className="containerCheckoutSteps">
                    <div className="containerProgressBar">
                        {/* Acorrdion  */}
                        {/* <UncontrolledAccordion defaultOpen={shouldOpenAccordion}> */}
                        {/* Acorddion item perfil */}
                        {/* <AccordionItem> */}
                        {/* <AccordionHeader targetId='1' > */}
                        <h5>1. PERFIL</h5>
                        {/* </AccordionHeader> */}
                        {/* <AccordionBody accordionId='1'> */}
                        <div className="card-body card1" style={{backgroundColor: 'transparent' }}>
                            {/* <Card > */}
                            <p>Solicitamos únicamente la información esencial para la finalización de la compra.</p>
                            <Form onSubmit={handleSubmitInfo}>
                                <FormGroup controlId="formBasicEmail">
                                    <Input addon={true}
                                        name="email"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="Email"
                                        value={email}
                                        onBlur={validateEMailInput}
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
                                        placeholder="Nombre del contacto"
                                        value={f_name}
                                        onChange={(event) => setF_name(event.target.value)}
                                    />

                                    <Input addon={true}
                                        name="contactPersonName"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="Apellido del contacto"
                                        value={l_name}
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
                                        value={phone}
                                        onChange={setPhone}
                                        inputStyle={{
                                            width: "50%",
                                            height: "10px",
                                            borderRadius: "50px",
                                            outline: "none",
                                            ":focus": {
                                                borderRadius: "50px",
                                            },
                                        }}
                                    />


                                </FormGroup>
                                <div className="form-group" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '30px', height: 48 }}>
                                    <div>
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
                                    </div>
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
                                </div>

                            </Form>
                            {/* </Card> */}
                        </div>
                        {/* </AccordionBody> */}
                        {/* </AccordionItem> */}
                        {/* Fin acorrdion item perfil */}
                        {/* Incio accordion Direccion */}
                        {/* <AccordionItem > */}
                        {/* <AccordionHeader targetId='2' > */}
                        <h5>2. ENVÍO </h5>
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
                                        disabled

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
                                        disabled
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
                                        onChange={(event) => setAddressForm(event.target.value)}
                                        disabled
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
                                        placeholder="¿Cómo llegar?"
                                        value={localDescription}
                                        onChange={(event) => setLocalDescription(event.target.value)}
                                        disabled
                                    />
                                </FormGroup>

                                <div style={{ display: 'flex', flexDirection: 'column' }}>

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

                                </div>
                            </Form>


                        </div>
                        {/* </AccordionHeader> */}
                        {/* <AccordionBody accordionId='2'>
                                    <Form>
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
                                    </Form>
                                </AccordionBody> */}
                        {/* </AccordionItem> */}
                        {/* Fin accordion direccion */}
                        {/* Inicio acorrdion item pago */}
                        {/* <AccordionItem> */}
                        {/* <AccordionHeader targetId='3' > */}
                        {/* <h5>3. PAGO </h5>  */}
                        {/* </AccordionHeader> */}
                        {/* <AccordionBody accordionId='3'>
                                    <UncontrolledAccordion>
                                        <AccordionItem>
                                            <AccordionHeader targetId='4'>
                                                <h3>Tarjeta débito</h3>
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
                                                />
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId='5'>
                                                <h3>Tarjeta crédito</h3>
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
                                                />
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId='6'>
                                                <h3>PSE</h3>
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
                                                />
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId='7'>
                                                <h3>Efecty</h3>
                                            </AccordionHeader>
                                            <AccordionBody accordionId='7'>
                                                <EfectyModal totalAmount={formattedTotal !== '' ? formattedTotal : totalNumber}
                                                    // closeEfectyModal={() => closeModalEfecty()}
                                                    dataRef={dataRef}
                                                    addressId={selectedAddressId}
                                                    descriptionOrder={descriptionOrder}
                                                    cupon={cupon}
                                                    // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                                                    setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                                                    setOk={() => setOkPurchase(true)} />
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId='8'>
                                                <h3>OTP</h3>
                                            </AccordionHeader>
                                            <AccordionBody accordionId='8'>
                                                <CashDeliveryOTP phone={dataAddress[0]?.phone}
                                                    closeModalOTP={closeModalOTP}
                                                    addressId={selectedAddressId}
                                                    descriptionOrder={descriptionOrder}
                                                    cupon={cupon}
                                                    // setModalPurchaseSuccess={() => { setModalSuccessPurchase(true); resetProductCardDetail() }}
                                                    setModalPurchaseSuccess={() => { handleFinishPurchase(); resetProductCardDetail() }}
                                                    setOk={() => setOkPurchase(true)} />
                                            </AccordionBody>
                                        </AccordionItem>
                                    </UncontrolledAccordion>
                                </AccordionBody> */}
                        {/* </AccordionItem> */}
                        {/* Fin acorrdion item pago */}
                        {/* </UncontrolledAccordion> */}
                        {/* Fin accordion  */}

                    </div>
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

                    </div>
                </div>
            </div >

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

            {/* Modal Opciones registro */}
            <Modal
                className="modal-dialog-centered modal-md"
                toggle={() => setModalViewLogin(false)}
                isOpen={modalViewLogin && !changeFormLogin}
            >
                <ModalBody>
                    <Login closeModalLogin={closeModalLogin} handleLogin={handleLogin} closeModalRegistro={closeModalRegistro} handleChangeFormLogin={handleChangeFormLogin} changeFormRegister={changeFormRegister} handleCodeLogin={() => setModalViewCodeLogin(true)} />
                </ModalBody>
            </Modal>
            <Modal
                className="modal-dialog-centered modal-sm"
                // toggle={() => setModalViewCodeLogin(false)}
                isOpen={modalViewCodeLogin}
            >
                <ModalBody>
                    <CodeLogin closeModalCodeLogin={() => setModalViewCodeLogin(false)} handleLogin={handleLogin} closeModalRegistro={closeModalRegistro} handleChangeFormLogin={handleChangeFormLogin} />
                </ModalBody>
            </Modal>
            {/* <button onClick={() => setModalViewRegistro(true)} style={{ gap: '15px' }}>
                      <FontAwesomeIcon icon={faUserPlus} />
                      Regístrate
                    </button> */}
            <Modal
                className="modal-dialog-centered modal-sm"
                toggle={() => setModalViewRegistro(false)}
                isOpen={modalViewRegistro && !changeFormRegister}
            >
                <ModalBody>
                    {/* <Register closeModalRegistro={closeModalRegistro} handleChangeFormRegister={handleChangeFormRegister} /> */}
                    <RegisterCode closeModalRegister={() => setModalViewRegistro(false)} />

                </ModalBody>
            </Modal>
            <Modal
                className="modal-dialog-centered modal-md"
                toggle={() => setModalOpcionesLogin(false)}
                isOpen={modalOpcionesLogin}
            >
                <ModalBody>
                    <OpcionesLogin closeModalLogin={() => setModalOpcionesLogin(false)} handleLoginCorreoContrasena={handleCorreoContrasena} handleCodeLogin={() => setModalViewCodeLogin(true)} />
                </ModalBody>
            </Modal>
        </>
    )
}

export default Checkout_V2
