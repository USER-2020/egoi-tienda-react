import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { getCurrentUser, setCurrentUser } from '../../helpers/Utils';
import toast, { Toaster } from 'react-hot-toast';
import '../../styles/detailsCart.css';
import { Card, Form, FormGroup, Input, Button } from 'reactstrap';
import start from '../../assets/egoi_icons/star-fill.svg';
import startEmpty from '../../assets/egoi_icons/star-fill-gray.svg';
import PhoneInput from 'react-phone-input-2';
import es from "react-phone-input-2/lang/es.json";
import Swal from 'sweetalert2';
import { TailSpin } from 'react-loader-spinner';
import { firstLogin, validateEmail } from '../../services/extraLogin';


const CheckoutNoToken = ({ getAllProductsByCartNotoken, productsInCart }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState();
    const toggle = () => setIsOpen(!isOpen);
    const [previousStep, setPreviousStep] = useState(0);
    const [activeStep, setActiveStep] = useState(1);
    const [valueProgressBar, setValueProgressBar] = useState(0);
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
    const [idAddress, setIdAddress] = useState([]);
    const [descriptionOrder, setDescriptionOrder] = useState("");
    const [costoEnvio, setCostoEnvio] = useState(0);

    const [dataAddressUpdate, setDataAddressUpdate] = useState("");

    const [modalDataPSE, setModalDataPSE] = useState("");
    const [modalDataTarjetas, setModalDataTarjetas] = useState("");

    const [modalMantenimientoPSE, setModalMantenimientoPSE] = useState(false);


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


    const [cantProductsOnCart, setCantProductsOnCart] = useState('');

    /* Reseteo de tarjeta */
    const [isResetOk, setIsResetOk] = useState(false);

    const currenUser = getCurrentUser();

    const history = useHistory();

    // const token = currenUser.token;

    // const userEmail = currenUser.email;

    const [email, setEmail] = useState();
    const [f_name, setF_name] = useState();
    const [l_name, setL_name] = useState();
    const [phone, setPhone] = useState();
    const [loading, setLoading] = useState(false);


    const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";
    const baseUrlImageThumbnail = "https://egoi.xyz/storage/app/public/product/thumbnail/";

    const handleStepClick = (step, stepProgress) => {
        setActiveStep(step);
        setValueProgressBar(stepProgress);
    };

    // const deleteOne = (product) => {

    //     const productIdToDelete = product.id;

    //     // Obtiene los datos actuales del carrito desde el localStorage
    //     let productsCartWhithoutToken = JSON.parse(localStorage.getItem('productsCart'));

    //     if (productsCartWhithoutToken) {
    //         // Verifica si hay datos en el carrito en el localStorage

    //         // Elimina el objeto específico por su ID
    //         if (productsCartWhithoutToken[productIdToDelete]) {
    //             delete productsCartWhithoutToken[productIdToDelete];
    //         }

    //         // Actualiza los datos del carrito en el localStorage
    //         localStorage.setItem('productsCart', JSON.stringify(productsCartWhithoutToken));

    //     }

    //     gtag('event', 'remove_from_cart', {
    //         currency: 'COP',
    //         items: [{
    //             item_id: product.id,
    //             item_name: product.name,
    //             coupon: '',
    //             discount: product.discount,
    //             affiliation: 'Egoi',
    //             item_brand: '',
    //             item_category: '',
    //             item_variant: '',
    //             unit_price: product.unit_price,
    //             currency: 'COP',
    //             min_qty: product.min_qty
    //         }],
    //         value: product.unit_price
    //     });
    //     toast.error('Producto eliminado del carrito!');
    //     getAllProductsByCartNotoken();
    //     // setIsLoggedInPartner(false);

    // };

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

    // const handleDecrement = (quantityUPD, idProd) => {
    //     const productIdToDecrement = idProd;

    //     // Obtiene los datos actuales del carrito desde el localStorage
    //     let productsCartWhithoutToken = JSON.parse(localStorage.getItem('productsCart'));

    //     if (productsCartWhithoutToken && productsCartWhithoutToken[productIdToDecrement]) {
    //         // Verifica si el producto existe en el carrito en el localStorage
    //         // y si es así, incrementa la cantidad deseada (por ejemplo, en 1)
    //         productsCartWhithoutToken[productIdToDecrement].min_qty -= 1;

    //         // Actualiza los datos del producto en el carrito
    //         // Actualiza los datos del carrito en el localStorage
    //         localStorage.setItem('productsCart', JSON.stringify(productsCartWhithoutToken));
    //     }
    // }
    // const handleIncrement = (quantityUPD, idProd) => {
    //     // Supongamos que tienes el ID del producto que deseas incrementar
    //     const productIdToIncrement = idProd;

    //     // Obtiene los datos actuales del carrito desde el localStorage
    //     let productsCartWhithoutToken = JSON.parse(localStorage.getItem('productsCart'));

    //     if (productsCartWhithoutToken && productsCartWhithoutToken[productIdToIncrement]) {
    //         // Verifica si el producto existe en el carrito en el localStorage
    //         // y si es así, incrementa la cantidad deseada (por ejemplo, en 1)
    //         productsCartWhithoutToken[productIdToIncrement].min_qty += 1;

    //         // Actualiza los datos del producto en el carrito
    //         // Actualiza los datos del carrito en el localStorage
    //         localStorage.setItem('productsCart', JSON.stringify(productsCartWhithoutToken));
    //     }

    //     // Realiza otras acciones necesarias después de incrementar la cantidad
    //     // (por ejemplo, actualiza el estado de tu componente si es necesario).
    //     // ...

    //     // Si deseas actualizar el estado local en tu componente, puedes hacerlo así:
    //     // setQuantity(quantityUPD + 1);
    // };

    var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener("scroll", function () {
        var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
        var scrollModal = document.getElementById("scrollModalToPay");

        if (scrollModal !== null) {
            if (currentScrollPos > prevScrollPos) {
                scrollModal.style.display = "block";
            } else {
                scrollModal.style.display = "none";
            }
        }

        prevScrollPos = currentScrollPos;
    });


    const addCartProductsOfLocalStorage = () => {
        let productsCart = JSON.parse(localStorage.getItem('productsCart')) || {};
        if (productsCart.length > 0) {
            productsCart.forEach(element => {

            });
        }

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
                            text: 'Este correo ya está registrado, loguéate para terminar la compra!',
                            confirmButtonColor: '#FC5241', // Set the desired color here
                            confirmButtonText: 'Ok', // Optionally change the button's text
                            // footer: '<a href="">Que significa esto?</a>'
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
                                    html:
                                    '<p>Por favor, revisa nuestros <a href="/termsAndConditions">Términos y Condiciones</a> y <a href="/privacyPolicy">Política de Privacidad</a>.</p>'
                                }).then((result) => {
                                    if (result.isConfirmed || !result.isDismissed) {
                                        // El usuario hizo clic en el botón "Ok" o hizo clic fuera de la ventana
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

    const handleSubmitInfo = (event) => {
        event.preventDefault();
        const data = {
            email: email,
            f_name: f_name,
            l_name: l_name,
            phone: phone
        };
        console.log(data);
        onSubmit(data);
    }

    useEffect(() => {
        console.log("Productos del carrito en el checkout sin token ", productsInCart);
        costoDeENvio();
    }, [subtotal, discountCoupon]);

    // useEffect(() => {
    //     // Establece un temporizador para esperar 3 segundos
    //     const timer = setTimeout(() => {
    //         // Realiza la validación después de 3 segundos
    //         if (productsInCart.length >= 0) {
    //             setIsLoading(false);
    //         }
    //     }, 1000); // 3000 milisegundos (3 segundos)

    //     // Limpia el temporizador si el componente se desmonta antes de que se cumplan los 3 segundos
    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, [productsInCart]);


    useEffect(() => {
        // getAllProductsByCart();
        getAllProductsByCartNotoken();
    }, []);




    return (
        <>
            <div className="container">
                <h5 style={{ color: '#74737B', fontSize: '16px' }}>Dirección de envío y facturación</h5>

                <div className="containerCheckoutSteps">
                    <div className="containerProgressBar">
                        <div className="accordion" id="accordionExample">
                            <div className="steps">
                                <progress id="progress" value={valueProgressBar} max={100} ></progress>
                                <div className={`step-item ${activeStep >= 1 ? 'active' : ''}`} >
                                    <button className={`step-button text-center ${activeStep >= 1 ? 'active' : ''}`} type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={() => handleStepClick(1, 0)}
                                        style={{ pointerEvents: 'none', width: '40px', height: '40px' }}>
                                        1
                                    </button>
                                    <div className="step-title">
                                        Datos del cliente
                                    </div>
                                </div>
                                <div className={`step-item ${activeStep >= 2 ? 'active' : ''}`} >
                                    <button className={`step-button text-center ${activeStep >= 2 ? 'active' : ''}`} type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={() => handleStepClick(2, 50)}
                                        style={{ pointerEvents: 'none', width: '40px', height: '40px' }}>
                                        2
                                    </button>
                                    <div className="step-title">
                                        Dirección y facturación
                                    </div>
                                </div>
                                <div className={`step-item ${activeStep >= 3 && selectedAddressIndex !== null ? 'active' : ''}`}>
                                    <button
                                        id="procederButton"
                                        className={`step-button text-center ${activeStep >= 3 && selectedAddressIndex !== null ? 'active' : ''}`}
                                        type="button"
                                        // onClick={() => handleProcederCompra()}
                                        style={{ pointerEvents: 'none', width: '40px', height: '40px' }}
                                    >
                                        3
                                    </button>


                                    <div className="step-title">
                                        Método de pago
                                    </div>
                                </div>
                            </div>

                            <div className="cards">


                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample">
                                    <div className="cards">
                                        <div className="card-body card1">
                                            <Card style={{ padding: 20, backgroundColor: 'transparent' }}>
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
                                                        <a href="#" style={{ backgroundColor: '#FC5241', color: 'white', textDecoration: 'none', padding: '12px', borderRadius: '32px', display: 'flex', width: '300px', textAlign: 'center', justifyContent: 'center' }} onClick={handleSubmitInfo}>
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
                                                        </a>
                                                    </div>

                                                </Form>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cards">

                                <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    {/* <div className="cards">
                    {address && address.map((addr, index) => (

                      <div className="card-body card1" key={index}>
                        <div className="contenedorP">
                          <div className="seleccion">
                            <Input type="checkbox" name="" id={addr.id}
                              checked={selectedAddressIndex === index}
                              onChange={() => checkboxChange(index, addr.id)} />
                            <p>{addr.address_type === "home" ? "Hogar" : addr.address_type && addr.address_type === "permanent" ? "Trabajo" : addr.address_type && addr.address_type === "others" ? "Otro" : addr.address_type}</p>
                          </div>
                          <div className="contenido">
                            <p>Nombre Contacto: {addr.contact_person_name}</p>
                            <p>Dirección: {addr.address}</p>
                            <p>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.46399 3.79261C7.03626 3.23986 6.28321 3.05281 5.63801 3.32126C5.54774 3.35882 5.45344 3.41223 5.32375 3.48569L5.31028 3.49332L5.30288 3.49751L5.29566 3.50201C5.00861 3.68109 4.82023 3.95405 4.69556 4.2289C4.57038 4.50491 4.49755 4.8085 4.45538 5.08768C4.37743 5.60368 4.39469 6.107 4.42814 6.31578C4.42878 6.32507 4.42964 6.33573 4.4308 6.34777C4.43434 6.38486 4.44065 6.43506 4.45185 6.49892C4.47423 6.62664 4.51613 6.809 4.59449 7.05051C4.75112 7.53321 5.05395 8.25386 5.64003 9.24952C6.2264 10.2457 6.74008 10.912 7.11324 11.3338C7.29979 11.5446 7.45108 11.6942 7.55859 11.7932C7.61234 11.8427 7.65512 11.8795 7.68586 11.905C7.70123 11.9177 7.71358 11.9276 7.72279 11.9349L7.73265 11.9425C8.00181 12.1592 8.45179 12.4476 8.9564 12.6281C9.4537 12.806 10.0856 12.9072 10.6471 12.62L10.6547 12.6161L10.6621 12.6119L10.6814 12.601C10.8074 12.5297 10.901 12.4767 10.9784 12.4195C11.5423 12.0025 11.7563 11.2599 11.4798 10.6149C11.442 10.5267 11.3879 10.4347 11.3165 10.3136L11.3051 10.2941L11.1821 10.0852L11.1723 10.0685C11.0482 9.85764 10.949 9.68917 10.8532 9.56178C10.7271 9.39402 10.5591 9.29629 10.4304 9.23454C10.2527 9.14925 10.0549 9.11514 9.87898 9.0991C9.70021 9.08282 9.51069 9.08282 9.34048 9.08362L9.29644 9.08384C9.13673 9.08467 8.99414 9.0854 8.86305 9.07739C8.71793 9.06852 8.61986 9.05025 8.5575 9.02624C8.52407 9.01336 8.49098 8.99816 8.45836 8.98064C8.42394 8.96216 8.40425 8.94866 8.39188 8.93821C8.28826 8.85067 8.0171 8.59839 7.76503 8.17016C7.47008 7.66907 7.42997 7.31682 7.42685 7.28477C7.42182 7.1909 7.43098 7.09725 7.45341 7.0059C7.4707 6.93552 7.51126 6.83979 7.57954 6.71111C7.62692 6.6218 7.67846 6.53305 7.73473 6.43616C7.75991 6.39279 7.78605 6.34779 7.81317 6.30038C7.8961 6.15546 7.98481 5.99375 8.05212 5.83081C8.1183 5.67061 8.17652 5.47988 8.1735 5.28005C8.17216 5.19117 8.16407 5.06448 8.11427 4.9331C8.05058 4.76509 7.94017 4.57761 7.80031 4.34009L7.78253 4.3099L7.65944 4.10109L7.64614 4.07848C7.57599 3.95922 7.52232 3.86798 7.46399 3.79261Z" fill="#171523" />
                              </svg>
                              +{addr.phone}
                            </p>

                          </div>
                        </div>
                        <div className="opcionesUpdateOrDelete">
                          <a href="#" onClick={() => updateBtn(addr.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FC5241" className="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                    <div className="addNewAddress" >
                      <a href="#" onClick={() => setModalAddressCheckout(true)}>Agregar dirección</a>
                    </div>
                  </div> */}
                                </div>
                            </div>
                            {selectedAddressIndex != null && (
                                <div className="cards">
                                    {/* <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample">
                    <div className="card-body paymentMethods">
                      <h6>Escoge tu método de pago</h6>
                      <Card>
                        <div className="payment">
                          <div className="imgPayment">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9632 11H23.0368C24.4035 11 25.4801 11 26.351 11.0594C27.2387 11.12 27.9853 11.2456 28.6788 11.5328C30.394 12.2433 31.7567 13.606 32.4672 15.3212C32.7853 16.0893 32.906 16.9257 32.9584 17.9489C33 18.7623 33 19.7511 33 20.9741V21.0369C33 22.4035 33 23.4801 32.9406 24.351C32.88 25.2387 32.7544 25.9853 32.4672 26.6788C31.7567 28.394 30.394 29.7567 28.6788 30.4672C27.9853 30.7544 27.2387 30.88 26.351 30.9406C25.4801 31 24.4035 31 23.0369 31H16.9631C15.5965 31 14.5199 31 13.649 30.9406C12.7613 30.88 12.0147 30.7544 11.3212 30.4672C9.60602 29.7567 8.2433 28.394 7.53284 26.6788C7.2456 25.9853 7.11997 25.2387 7.05941 24.351C6.99999 23.4801 7 22.4035 7 21.0368V20.974C7 19.7511 7 18.7623 7.04161 17.9489C7.09395 16.9257 7.21468 16.0893 7.53284 15.3212C8.2433 13.606 9.60602 12.2433 11.3212 11.5328C12.0147 11.2456 12.7613 11.12 13.649 11.0594C14.5199 11 15.5965 11 16.9632 11ZM13.7851 13.0548C12.9993 13.1084 12.4957 13.2111 12.0866 13.3806C10.8614 13.8881 9.88807 14.8614 9.3806 16.0866C9.27532 16.3407 9.19613 16.6303 9.13834 17H30.8617C30.8039 16.6303 30.7247 16.3407 30.6194 16.0866C30.1119 14.8614 29.1386 13.8881 27.9134 13.3806C27.5043 13.2111 27.0007 13.1084 26.2149 13.0548C25.4201 13.0005 24.4115 13 23 13H17C15.5885 13 14.5799 13.0005 13.7851 13.0548ZM30.9906 19H9.00942C9.00011 19.5665 9 20.2225 9 21C9 22.4115 9.00054 23.4201 9.05477 24.2149C9.10839 25.0007 9.21112 25.5043 9.3806 25.9134C9.88807 27.1386 10.8614 28.1119 12.0866 28.6194C12.4957 28.7889 12.9993 28.8916 13.7851 28.9452C14.5799 28.9995 15.5885 29 17 29H23C24.4115 29 25.4201 28.9995 26.2149 28.9452C27.0007 28.8916 27.5043 28.7889 27.9134 28.6194C29.1386 28.1119 30.1119 27.1386 30.6194 25.9134C30.7889 25.5043 30.8916 25.0007 30.9452 24.2149C30.9995 23.4201 31 22.4115 31 21C31 20.2225 30.9999 19.5665 30.9906 19ZM25 22C25 21.4477 25.4477 21 26 21H28C28.5523 21 29 21.4477 29 22C29 22.5523 28.5523 23 28 23H26C25.4477 23 25 22.5523 25 22Z" fill="#A75BFF" />
                            </svg>
                          </div>
                          <div className="contentPayment">
                            <h6>Tarjeta Débito</h6>
                            <p>Paga con tarjetas débito</p>
                          </div>
                        </div>
                        <div className="checkPayment">
                          <Input type='checkbox'
                            checked={selectedCheckbox === 0}
                            onChange={() => handleCheckboxChange(0)} />
                        </div>
                      </Card>
                      <Card>
                        <div className="payment">
                          <div className="imgPayment">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9632 11H23.0368C24.4035 11 25.4801 11 26.351 11.0594C27.2387 11.12 27.9853 11.2456 28.6788 11.5328C30.394 12.2433 31.7567 13.606 32.4672 15.3212C32.7853 16.0893 32.906 16.9257 32.9584 17.9489C33 18.7623 33 19.7511 33 20.9741V21.0369C33 22.4035 33 23.4801 32.9406 24.351C32.88 25.2387 32.7544 25.9853 32.4672 26.6788C31.7567 28.394 30.394 29.7567 28.6788 30.4672C27.9853 30.7544 27.2387 30.88 26.351 30.9406C25.4801 31 24.4035 31 23.0369 31H16.9631C15.5965 31 14.5199 31 13.649 30.9406C12.7613 30.88 12.0147 30.7544 11.3212 30.4672C9.60602 29.7567 8.2433 28.394 7.53284 26.6788C7.2456 25.9853 7.11997 25.2387 7.05941 24.351C6.99999 23.4801 7 22.4035 7 21.0368V20.974C7 19.7511 7 18.7623 7.04161 17.9489C7.09395 16.9257 7.21468 16.0893 7.53284 15.3212C8.2433 13.606 9.60602 12.2433 11.3212 11.5328C12.0147 11.2456 12.7613 11.12 13.649 11.0594C14.5199 11 15.5965 11 16.9632 11ZM13.7851 13.0548C12.9993 13.1084 12.4957 13.2111 12.0866 13.3806C10.8614 13.8881 9.88807 14.8614 9.3806 16.0866C9.27532 16.3407 9.19613 16.6303 9.13834 17H30.8617C30.8039 16.6303 30.7247 16.3407 30.6194 16.0866C30.1119 14.8614 29.1386 13.8881 27.9134 13.3806C27.5043 13.2111 27.0007 13.1084 26.2149 13.0548C25.4201 13.0005 24.4115 13 23 13H17C15.5885 13 14.5799 13.0005 13.7851 13.0548ZM30.9906 19H9.00942C9.00011 19.5665 9 20.2225 9 21C9 22.4115 9.00054 23.4201 9.05477 24.2149C9.10839 25.0007 9.21112 25.5043 9.3806 25.9134C9.88807 27.1386 10.8614 28.1119 12.0866 28.6194C12.4957 28.7889 12.9993 28.8916 13.7851 28.9452C14.5799 28.9995 15.5885 29 17 29H23C24.4115 29 25.4201 28.9995 26.2149 28.9452C27.0007 28.8916 27.5043 28.7889 27.9134 28.6194C29.1386 28.1119 30.1119 27.1386 30.6194 25.9134C30.7889 25.5043 30.8916 25.0007 30.9452 24.2149C30.9995 23.4201 31 22.4115 31 21C31 20.2225 30.9999 19.5665 30.9906 19ZM25 22C25 21.4477 25.4477 21 26 21H28C28.5523 21 29 21.4477 29 22C29 22.5523 28.5523 23 28 23H26C25.4477 23 25 22.5523 25 22Z" fill="#A75BFF" />
                            </svg>
                          </div>
                          <div className="contentPayment">
                            <h6>Tarjeta de Crédito</h6>
                            <p>VISA, MasterCard, American Express</p>
                          </div>
                        </div>
                        <div className="checkPayment">
                          <Input type='checkbox'
                            checked={selectedCheckbox === 1}
                            onChange={() => handleCheckboxChange(1)} />
                        </div>
                      </Card>
                      <Card>
                        <div className="payment">
                          <div className="imgPayment">
                            <img src={pseLogo} />

                          </div>
                          <div className="contentPayment">
                            <h6>PSE</h6>
                            <p>Pago por transferencia</p>
                          </div>
                        </div>
                        <div className="checkPayment">
                          <Input type='checkbox'
                            checked={selectedCheckbox === 2}
                            onChange={() => handleCheckboxChange(2)} />
                        </div>
                      </Card>
                      {totalNumber >= 5000 && (
                        <Card>
                          <div className="payment">
                            <div className="imgPayment">
                              <img src={efectyLogo} />
                            </div>
                            <div className="contentPayment">
                              <h6>Efecty</h6>
                              <p>Pago realizado por consignación</p>
                            </div>
                          </div>
                          <div className="checkPayment">
                            <Input type='checkbox'
                              checked={selectedCheckbox === 3}
                              onChange={() => handleCheckboxChange(3)} />
                          </div>
                        </Card>

                      )}
                      {totalNumber >= 39990 && totalNumber <= 1999000 && (

                        <Card>
                          <div className="payment">
                            <div className="imgPayment">
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3063 9H18.3604C19.611 8.99999 20.6081 8.99999 21.4132 9.06317C22.2378 9.12789 22.9466 9.26351 23.5987 9.58267C24.6475 10.0961 25.5078 10.919 26.0495 11.9403C26.3889 12.5801 26.5324 13.2757 26.6005 14.0764C26.6387 14.5256 26.6549 15.0361 26.6617 15.6176H27.7757C29.1866 15.6176 30.3043 15.6176 31.205 15.6883C32.1253 15.7606 32.9051 15.9112 33.6186 16.2604C34.7755 16.8267 35.7236 17.734 36.3203 18.859C36.6909 19.5578 36.8501 20.3215 36.926 21.2142C37 22.0843 37 23.1621 37 24.5135V26.0633C37 26.3429 37.0001 26.6116 36.9808 26.8386C36.9596 27.0876 36.9099 27.3746 36.7583 27.6605C36.5468 28.0592 36.2135 28.3759 35.8127 28.5721C35.5291 28.7109 35.2455 28.7564 34.9953 28.776C34.7642 28.7942 34.489 28.7941 34.1955 28.7941H33.9674C33.5313 30.0925 32.2694 31 30.8333 31C29.3973 31 28.1354 30.0925 27.6993 28.7941H15.0229C14.5868 30.0925 13.3249 31 11.8889 31C10.4096 31 9.1151 30.037 8.71773 28.6758C8.11401 28.5963 7.57317 28.4587 7.06797 28.2114C6.01912 27.6981 5.15884 26.8751 4.61714 25.8538C4.27778 25.214 4.13428 24.5185 4.06617 23.7177C3.99998 22.9395 3.99999 21.9775 4 20.7801V17.014C3.99999 15.8166 3.99998 14.8546 4.06617 14.0764C4.13428 13.2757 4.27778 12.5801 4.61714 11.9403C5.15884 10.919 6.01911 10.0961 7.06797 9.58267C7.72004 9.26351 8.42891 9.12789 9.2535 9.06317C10.0586 8.99999 11.0557 8.99999 12.3063 9ZM8.80097 26.6667C9.27478 25.4364 10.5001 24.5882 11.8889 24.5882C13.3249 24.5882 14.5868 25.4957 15.0229 26.7941H24.6667V17.0588C24.6667 15.8062 24.6658 14.9294 24.6077 14.2459C24.5507 13.5754 24.4439 13.1814 24.2827 12.8774C23.9438 12.2385 23.3989 11.7116 22.7194 11.379C22.3891 11.2173 21.9637 11.1125 21.2567 11.057C20.5391 11.0007 19.6204 11 18.3185 11H12.3481C11.0462 11 10.1276 11.0007 9.40999 11.057C8.70292 11.1125 8.27757 11.2173 7.94723 11.379C7.26778 11.7116 6.7229 12.2385 6.38399 12.8774C6.22278 13.1814 6.11601 13.5754 6.05897 14.2459C6.00084 14.9294 6 15.8062 6 17.0588V20.7353C6 21.9879 6.00084 22.8647 6.05897 23.5482C6.11601 24.2187 6.22278 24.6128 6.38399 24.9167C6.7229 25.5556 7.26778 26.0825 7.94723 26.4151C8.17065 26.5244 8.43613 26.6073 8.80097 26.6667ZM26.6667 17.6176V26.7941H27.6993C28.1354 25.4957 29.3973 24.5882 30.8333 24.5882C32.2694 24.5882 33.5313 25.4957 33.9674 26.7941H34.163C34.5003 26.7941 34.6956 26.7934 34.8388 26.7822C34.8985 26.7775 34.9313 26.7719 34.9459 26.769C34.9605 26.7602 34.9715 26.7503 34.9796 26.7407C34.9819 26.7263 34.9851 26.7032 34.988 26.6691C34.9992 26.5374 35 26.3554 35 26.0294V24.5588C35 23.1518 34.9992 22.1592 34.9332 21.3837C34.8684 20.6212 34.7459 20.1591 34.5534 19.7962C34.1595 19.0535 33.5268 18.4422 32.7393 18.0568C32.3476 17.865 31.8513 17.7452 31.0485 17.6822C30.2352 17.6184 29.196 17.6176 27.7333 17.6176H26.6667ZM11.8889 26.5882C11.144 26.5882 10.6049 27.1526 10.5928 27.7714L10.5926 27.7941C10.5926 28.4226 11.1347 29 11.8889 29C12.6431 29 13.1852 28.4226 13.1852 27.7941C13.1852 27.1656 12.6431 26.5882 11.8889 26.5882ZM30.8333 26.5882C30.0792 26.5882 29.537 27.1656 29.537 27.7941C29.537 28.4226 30.0792 29 30.8333 29C31.5875 29 32.1296 28.4226 32.1296 27.7941C32.1296 27.1656 31.5875 26.5882 30.8333 26.5882Z" fill="#A75BFF" />
                              </svg>

                            </div>
                            <div className="contentPayment">
                              <h6>Pago contra entrega</h6>
                              <p>Realizarás el pago al recibir tu pedido</p>
                            </div>
                          </div>
                          <div className="checkPayment">
                            <Input type='checkbox'
                              checked={selectedCheckbox === 4}
                              onChange={() => handleCheckboxChange(4)} />
                          </div>
                        </Card>
                      )}
                    </div>
                  </div> */}
                                </div>
                            )}
                        </div>
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
                <div className="containerCheckoutResponsive">
                    <Card style={{ padding: 20, backgroundColor: 'transparent' }}>
                        <p>Solicitamos únicamente la información esencial para la finalización de la compra.</p>
                        <Form onSubmit={handleSubmitInfo}>
                            <FormGroup controlId="formBasicEmail">
                                <Input
                                    addon={true}
                                    name="email"
                                    className="form-control" // Correct the typo here
                                    style={{
                                        borderRadius: "50px",
                                    }}
                                    placeholder="Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="formBasicName">
                                {/* <div className="d-flex flex-row gap-2"> */}
                                <Input
                                    addon={true}
                                    name="contactPersonName"
                                    className="form-control"
                                    style={{
                                        borderRadius: "50px",
                                    }}
                                    placeholder="Nombre del contacto"
                                    value={f_name}
                                    onChange={(event) => setF_name(event.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="formBasicName">
                                <Input
                                    addon={true}
                                    name="contactPersonName"
                                    className="form-control"
                                    style={{
                                        borderRadius: "50px",
                                    }}
                                    placeholder="Apellido del contacto"
                                    value={l_name}
                                    onChange={(event) => setL_name(event.target.value)}
                                />
                                {/* </div> */}
                            </FormGroup>
                            <FormGroup controlId="formBasicName" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                <PhoneInput
                                    localization={es}
                                    country={"co"}
                                    value={phone}
                                    onChange={setPhone}
                                    inputStyle={{
                                        width: "100%",
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
                                <a href="#" style={{ backgroundColor: '#FC5241', color: 'white', textDecoration: 'none', padding: '12px', borderRadius: '32px', display: 'flex', width: '300px', textAlign: 'center', justifyContent: 'center' }} onClick={handleSubmitInfo}>
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
                                </a>
                            </div>

                        </Form>
                    </Card>
                    {discountedProducts === 0 && (
                        <div className="containerCupon">
                            <input type="text"
                                placeholder='¿Tienes un cupón?'
                                value={cupon}
                                onChange={(e) => setCupon(e.target.value)} />
                            <div className="btnCupon">
                                <a href="#" onClick={() => aplicarCupon()}>Aplicar cupón</a>
                            </div>
                        </div>
                    )}
                    <div className="factura">
                        <p className='title'>Factura</p>
                        <span className="subtotal">
                            <p className="def">En productos</p>
                            {isResetOk ? (
                                <p>$0</p>
                            ) : (<p className="precio">$ {subtotalWithoutDiscount.toLocaleString('es')}</p>)}
                        </span>
                        <span className="costoEnvio">
                            <p className="def">Costo de envío</p>
                            {isResetOk ? (
                                <p>$0</p>
                            ) : (

                                subtotal && subtotal <= 39900 ? (
                                    <span className='badge text-bg-success' id='spanPago'>Paga el cliente</span>
                                ) : (
                                    <p className="precio">$ {costoEnvio.toLocaleString('es')}</p>
                                )

                            )}
                        </span>

                        <span className="cupon">
                            <p className="def">Descuento</p>
                            {isResetOk ? (
                                <p>$0</p>
                            ) : (
                                <p className='precio'>
                                    ${discountedProducts.toLocaleString('es')}
                                </p>


                            )}
                        </span>
                        <span className="cupon">
                            <p className="def">Cupón</p>
                            {isResetOk ? (
                                <p>$0</p>
                            ) : (
                                discountCoupon && discountCoupon.total !== undefined ? (
                                    <p className='precio'>
                                        {discountCoupon.discount}
                                    </p>

                                ) : (<p className="precio">$0</p>)
                            )}
                        </span>
                        <span className="impuesto">
                            <p className="def">Impuesto</p>
                            {isResetOk ? (
                                <p>$0</p>
                            ) : (
                                <p className="precio">$0</p>

                            )}
                        </span>
                        <div className="containertotalAPagarResponsive">
                            <p>Total a pagar</p>
                            {isResetOk ? (
                                <p>$0</p>
                            ) : (

                                discountCoupon && discountCoupon.total !== undefined ? (
                                    <p>{discountCoupon.total}</p>
                                ) : (

                                    <p>{totalaPagar}</p>
                                )
                            )}
                        </div>
                        {/* elegir direccion Responsive */}
                        {/* <p className="title" style={{ marginTop: '30px' }}>Dirección de entrega
                    </p> */}
                        {/* <div className="card-body direcciones">
                        <Card>
                            <ul>

                                {address && address.map((addr, index) => (

                                    <li key={index}>
                                        <div className="img">
                                            {addr.address_type === "home" ? <svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8722 8.13225C16.3032 7.95546 15.6968 7.95546 15.1278 8.13225C14.8494 8.21876 14.5513 8.38528 14.1231 8.72385C13.6875 9.0683 13.1692 9.54775 12.4336 10.2293L8.97759 13.4312C8.19904 14.1526 7.91535 14.4233 7.71401 14.7351C7.52397 15.0295 7.38277 15.3555 7.29692 15.6996C7.20556 16.0658 7.2 16.4684 7.2 17.5456V19.2748C7.2 20.3946 7.20059 21.1877 7.24981 21.8078C7.29834 22.4193 7.39035 22.7931 7.53552 23.0864C7.83014 23.6816 8.29804 24.1612 8.86828 24.4603C9.1454 24.6057 9.49997 24.6991 10.0889 24.7486C10.5829 24.7902 11.1912 24.7979 12 24.7993V21.6C12 21.5627 12 21.5261 12 21.4899C11.9996 20.8536 11.9994 20.3811 12.109 19.9717C12.4049 18.8675 13.2675 18.0049 14.3718 17.709C14.7811 17.5993 15.2536 17.5996 15.8899 17.5999C15.9261 17.5999 15.9628 17.6 16 17.6C16.0372 17.6 16.0739 17.5999 16.1101 17.5999C16.7464 17.5996 17.2189 17.5993 17.6282 17.709C18.7325 18.0049 19.5951 18.8675 19.891 19.9717C20.0006 20.3811 20.0004 20.8536 20 21.4899C20 21.5261 20 21.5627 20 21.6V24.7993C20.8088 24.7979 21.4171 24.7902 21.9111 24.7486C22.5 24.6991 22.8546 24.6057 23.1317 24.4603C23.702 24.1612 24.1699 23.6816 24.4645 23.0864C24.6097 22.7931 24.7017 22.4193 24.7502 21.8078C24.7994 21.1877 24.8 20.3946 24.8 19.2748V17.5456C24.8 16.4684 24.7944 16.0658 24.7031 15.6996C24.6172 15.3555 24.476 15.0295 24.286 14.7351C24.0847 14.4233 23.801 14.1526 23.0224 13.4312L19.5664 10.2293C18.8308 9.54775 18.3125 9.0683 17.8769 8.72385C17.4487 8.38528 17.1506 8.21876 16.8722 8.13225ZM18.4 24.7997V21.6C18.4 20.8045 18.3931 20.5637 18.3455 20.3859C18.1975 19.8337 17.7663 19.4024 17.2141 19.2545C17.0363 19.2068 16.7955 19.2 16 19.2C15.2045 19.2 14.9637 19.2068 14.7859 19.2545C14.2337 19.4024 13.8025 19.8337 13.6545 20.3859C13.6069 20.5637 13.6 20.8045 13.6 21.6V24.7997H18.4ZM14.6531 6.6043C15.5313 6.33144 16.4687 6.33144 17.3469 6.6043C17.8899 6.77302 18.3658 7.07061 18.8693 7.46882C19.3599 7.85672 19.9238 8.37919 20.6296 9.0331L24.1098 12.2576C24.1354 12.2812 24.1606 12.3046 24.1856 12.3277C24.862 12.9542 25.3063 13.3656 25.6302 13.8673C25.9162 14.3104 26.1274 14.7989 26.2555 15.3123C26.4003 15.8928 26.4002 16.5041 26.4 17.4425C26.4 17.4764 26.4 17.5108 26.4 17.5456V19.3089C26.4 20.3869 26.4 21.2435 26.3452 21.9344C26.2891 22.6413 26.1718 23.2438 25.8985 23.7961C25.4568 24.6885 24.7498 25.4184 23.8749 25.8773C23.3306 26.1628 22.7368 26.2848 22.0452 26.343C21.3712 26.3997 20.5368 26.3997 19.4918 26.3997H12.5082C11.4633 26.3997 10.6288 26.3997 9.95485 26.343C9.26317 26.2848 8.66938 26.1628 8.12508 25.8773C7.25023 25.4184 6.54324 24.6885 6.10155 23.7961C5.82819 23.2438 5.71093 22.6413 5.65483 21.9344C5.59999 21.2435 5.6 20.3869 5.6 19.3089L5.6 17.5456C5.6 17.5108 5.6 17.4764 5.59999 17.4425C5.5998 16.5041 5.59968 15.8928 5.7445 15.3123C5.8726 14.7989 6.08377 14.3104 6.36982 13.8673C6.69373 13.3656 7.13799 12.9542 7.81445 12.3277C7.83937 12.3046 7.86462 12.2812 7.89018 12.2576L11.3705 9.03309C12.0762 8.37919 12.6401 7.85672 13.1307 7.46882C13.6343 7.07061 14.1101 6.77302 14.6531 6.6043Z" fill="#171523" />
                                            </svg>
                                                : addr.address_type && addr.address_type === "permanent" ? <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-buildings" viewBox="0 0 16 16">
                                                    <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z" />
                                                    <path d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z" />
                                                </svg> : addr.address_type && addr.address_type === 'others' ? <svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0002 7.19961C12.0476 7.19961 8.8002 10.5151 8.8002 14.6592C8.8002 15.441 9.0957 16.3662 9.63392 17.3813C10.167 18.3868 10.9057 19.4202 11.7148 20.4025C13.3132 22.3429 15.1277 24.0136 16.0002 24.7814C16.8727 24.0136 18.6872 22.3429 20.2856 20.4025C21.0947 19.4202 21.8334 18.3868 22.3665 17.3813C22.9047 16.3662 23.2002 15.441 23.2002 14.6592C23.2002 10.5151 19.9528 7.19961 16.0002 7.19961ZM7.2002 14.6592C7.2002 9.67997 11.1162 5.59961 16.0002 5.59961C20.8842 5.59961 24.8002 9.67997 24.8002 14.6592C24.8002 15.8123 24.376 17.0068 23.7801 18.1308C23.179 19.2645 22.3692 20.3895 21.5206 21.4197C19.8232 23.4803 17.9107 25.2332 17.0241 26.0116C16.4349 26.5289 15.5655 26.5289 14.9763 26.0116C14.0897 25.2332 12.1772 23.4803 10.4798 21.4197C9.63123 20.3895 8.82137 19.2645 8.22031 18.1308C7.6244 17.0068 7.2002 15.8123 7.2002 14.6592ZM16.0002 11.3647C14.9994 11.3647 14.1335 12.2189 14.1335 13.3414C14.1335 14.4639 14.9994 15.3181 16.0002 15.3181C17.0009 15.3181 17.8669 14.4639 17.8669 13.3414C17.8669 12.2189 17.0009 11.3647 16.0002 11.3647ZM12.5335 13.3414C12.5335 11.3968 14.0554 9.76468 16.0002 9.76468C17.945 9.76468 19.4669 11.3968 19.4669 13.3414C19.4669 15.286 17.945 16.9181 16.0002 16.9181C14.0554 16.9181 12.5335 15.286 12.5335 13.3414Z" fill="black" />
                                                </svg> : addr.address_type}

                                        </div>
                                        <div className="descripcion">
                                            <p> <strong>{addr.address_type === "home" ? "Hogar" : addr.address_type && addr.address_type === "permanent" ? "Trabajo" : addr.address_type && addr.address_type === "others" ? "Otro" : addr.address_type}</strong> </p>
                                            <p>{addr.address}</p>
                                        </div>
                                        <div className="opciones">
                                            <a href="#" className='updateDireccion' onClick={() => updateBtn(addr.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </a>
                                            <div className="checkPaymentResponsive" >
                                                <Input type='radio' style={{ width: '30px', height: '30px', margin: '0' }}
                                                    checked={selectedAddressIndex === index}
                                                    onChange={() => checkboxChange(index, addr.id)} />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="btnAdd">
                                <a href="#" onClick={() => setModalAddressCheckout(true)}>Agregar nueva dirección</a>
                            </div>
                        </Card>
                    </div> */}

                        {/* <p className='title' style={{ marginTop: '30px' }}>Método de pago
                    </p> */}
                        {/* <div className="card-body paymentMethods">

                        <Card>
                            <div className="payment">
                                <div className="imgPayment">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9632 11H23.0368C24.4035 11 25.4801 11 26.351 11.0594C27.2387 11.12 27.9853 11.2456 28.6788 11.5328C30.394 12.2433 31.7567 13.606 32.4672 15.3212C32.7853 16.0893 32.906 16.9257 32.9584 17.9489C33 18.7623 33 19.7511 33 20.9741V21.0369C33 22.4035 33 23.4801 32.9406 24.351C32.88 25.2387 32.7544 25.9853 32.4672 26.6788C31.7567 28.394 30.394 29.7567 28.6788 30.4672C27.9853 30.7544 27.2387 30.88 26.351 30.9406C25.4801 31 24.4035 31 23.0369 31H16.9631C15.5965 31 14.5199 31 13.649 30.9406C12.7613 30.88 12.0147 30.7544 11.3212 30.4672C9.60602 29.7567 8.2433 28.394 7.53284 26.6788C7.2456 25.9853 7.11997 25.2387 7.05941 24.351C6.99999 23.4801 7 22.4035 7 21.0368V20.974C7 19.7511 7 18.7623 7.04161 17.9489C7.09395 16.9257 7.21468 16.0893 7.53284 15.3212C8.2433 13.606 9.60602 12.2433 11.3212 11.5328C12.0147 11.2456 12.7613 11.12 13.649 11.0594C14.5199 11 15.5965 11 16.9632 11ZM13.7851 13.0548C12.9993 13.1084 12.4957 13.2111 12.0866 13.3806C10.8614 13.8881 9.88807 14.8614 9.3806 16.0866C9.27532 16.3407 9.19613 16.6303 9.13834 17H30.8617C30.8039 16.6303 30.7247 16.3407 30.6194 16.0866C30.1119 14.8614 29.1386 13.8881 27.9134 13.3806C27.5043 13.2111 27.0007 13.1084 26.2149 13.0548C25.4201 13.0005 24.4115 13 23 13H17C15.5885 13 14.5799 13.0005 13.7851 13.0548ZM30.9906 19H9.00942C9.00011 19.5665 9 20.2225 9 21C9 22.4115 9.00054 23.4201 9.05477 24.2149C9.10839 25.0007 9.21112 25.5043 9.3806 25.9134C9.88807 27.1386 10.8614 28.1119 12.0866 28.6194C12.4957 28.7889 12.9993 28.8916 13.7851 28.9452C14.5799 28.9995 15.5885 29 17 29H23C24.4115 29 25.4201 28.9995 26.2149 28.9452C27.0007 28.8916 27.5043 28.7889 27.9134 28.6194C29.1386 28.1119 30.1119 27.1386 30.6194 25.9134C30.7889 25.5043 30.8916 25.0007 30.9452 24.2149C30.9995 23.4201 31 22.4115 31 21C31 20.2225 30.9999 19.5665 30.9906 19ZM25 22C25 21.4477 25.4477 21 26 21H28C28.5523 21 29 21.4477 29 22C29 22.5523 28.5523 23 28 23H26C25.4477 23 25 22.5523 25 22Z" fill="#A75BFF" />
                                    </svg>
                                </div>
                                <div className="contentPayment">
                                    <h6>Tarjeta Débito</h6>
                                    <p>Paga con tarjetas débito</p>
                                </div>
                                <div className="checkPayment">
                                    <Input type='radio'
                                        checked={selectedCheckbox === 0}
                                        onChange={() => handleCheckboxChange(0)} />
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className="payment">
                                <div className="imgPayment">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9632 11H23.0368C24.4035 11 25.4801 11 26.351 11.0594C27.2387 11.12 27.9853 11.2456 28.6788 11.5328C30.394 12.2433 31.7567 13.606 32.4672 15.3212C32.7853 16.0893 32.906 16.9257 32.9584 17.9489C33 18.7623 33 19.7511 33 20.9741V21.0369C33 22.4035 33 23.4801 32.9406 24.351C32.88 25.2387 32.7544 25.9853 32.4672 26.6788C31.7567 28.394 30.394 29.7567 28.6788 30.4672C27.9853 30.7544 27.2387 30.88 26.351 30.9406C25.4801 31 24.4035 31 23.0369 31H16.9631C15.5965 31 14.5199 31 13.649 30.9406C12.7613 30.88 12.0147 30.7544 11.3212 30.4672C9.60602 29.7567 8.2433 28.394 7.53284 26.6788C7.2456 25.9853 7.11997 25.2387 7.05941 24.351C6.99999 23.4801 7 22.4035 7 21.0368V20.974C7 19.7511 7 18.7623 7.04161 17.9489C7.09395 16.9257 7.21468 16.0893 7.53284 15.3212C8.2433 13.606 9.60602 12.2433 11.3212 11.5328C12.0147 11.2456 12.7613 11.12 13.649 11.0594C14.5199 11 15.5965 11 16.9632 11ZM13.7851 13.0548C12.9993 13.1084 12.4957 13.2111 12.0866 13.3806C10.8614 13.8881 9.88807 14.8614 9.3806 16.0866C9.27532 16.3407 9.19613 16.6303 9.13834 17H30.8617C30.8039 16.6303 30.7247 16.3407 30.6194 16.0866C30.1119 14.8614 29.1386 13.8881 27.9134 13.3806C27.5043 13.2111 27.0007 13.1084 26.2149 13.0548C25.4201 13.0005 24.4115 13 23 13H17C15.5885 13 14.5799 13.0005 13.7851 13.0548ZM30.9906 19H9.00942C9.00011 19.5665 9 20.2225 9 21C9 22.4115 9.00054 23.4201 9.05477 24.2149C9.10839 25.0007 9.21112 25.5043 9.3806 25.9134C9.88807 27.1386 10.8614 28.1119 12.0866 28.6194C12.4957 28.7889 12.9993 28.8916 13.7851 28.9452C14.5799 28.9995 15.5885 29 17 29H23C24.4115 29 25.4201 28.9995 26.2149 28.9452C27.0007 28.8916 27.5043 28.7889 27.9134 28.6194C29.1386 28.1119 30.1119 27.1386 30.6194 25.9134C30.7889 25.5043 30.8916 25.0007 30.9452 24.2149C30.9995 23.4201 31 22.4115 31 21C31 20.2225 30.9999 19.5665 30.9906 19ZM25 22C25 21.4477 25.4477 21 26 21H28C28.5523 21 29 21.4477 29 22C29 22.5523 28.5523 23 28 23H26C25.4477 23 25 22.5523 25 22Z" fill="#A75BFF" />
                                    </svg>
                                </div>
                                <div className="contentPayment">
                                    <h6>Tarjeta de Crédito</h6>
                                    <p>VISA, MasterCard, American Express</p>
                                </div>
                                <div className="checkPayment">
                                    <Input type='radio'
                                        checked={selectedCheckbox === 1}
                                        onChange={() => handleCheckboxChange(1)} />
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className="payment">
                                <div className="imgPayment">
                                    <img src={pseLogo} />
                                </div>
                                <div className="contentPayment">
                                    <h6>PSE</h6>
                                    <p>Pago por transferencia</p>
                                </div>
                                <div className="checkPayment">
                                    <Input type='radio'
                                        checked={selectedCheckbox === 2}
                                        onChange={() => handleCheckboxChange(2)} />
                                </div>
                            </div>
                        </Card>
                        <Card>
                            {totalNumber >= 5000 && (
                                <div className="payment">
                                    <div className="imgPayment">
                                        <img src={efectyLogo} />
                                    </div>
                                    <div className="contentPayment">
                                        <h6>Efecty</h6>
                                        <p>Pago realizado por consignación</p>
                                    </div>
                                    <div className="checkPayment">
                                        <Input type='radio'
                                            checked={selectedCheckbox === 3}
                                            onChange={() => handleCheckboxChange(3)} />
                                    </div>
                                </div>

                            )}
                        </Card>
                        <Card>
                            {totalNumber >= 39900 && totalNumber <= 1999000 && (
                                <div className="payment">
                                    <div className="imgPayment">
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3063 9H18.3604C19.611 8.99999 20.6081 8.99999 21.4132 9.06317C22.2378 9.12789 22.9466 9.26351 23.5987 9.58267C24.6475 10.0961 25.5078 10.919 26.0495 11.9403C26.3889 12.5801 26.5324 13.2757 26.6005 14.0764C26.6387 14.5256 26.6549 15.0361 26.6617 15.6176H27.7757C29.1866 15.6176 30.3043 15.6176 31.205 15.6883C32.1253 15.7606 32.9051 15.9112 33.6186 16.2604C34.7755 16.8267 35.7236 17.734 36.3203 18.859C36.6909 19.5578 36.8501 20.3215 36.926 21.2142C37 22.0843 37 23.1621 37 24.5135V26.0633C37 26.3429 37.0001 26.6116 36.9808 26.8386C36.9596 27.0876 36.9099 27.3746 36.7583 27.6605C36.5468 28.0592 36.2135 28.3759 35.8127 28.5721C35.5291 28.7109 35.2455 28.7564 34.9953 28.776C34.7642 28.7942 34.489 28.7941 34.1955 28.7941H33.9674C33.5313 30.0925 32.2694 31 30.8333 31C29.3973 31 28.1354 30.0925 27.6993 28.7941H15.0229C14.5868 30.0925 13.3249 31 11.8889 31C10.4096 31 9.1151 30.037 8.71773 28.6758C8.11401 28.5963 7.57317 28.4587 7.06797 28.2114C6.01912 27.6981 5.15884 26.8751 4.61714 25.8538C4.27778 25.214 4.13428 24.5185 4.06617 23.7177C3.99998 22.9395 3.99999 21.9775 4 20.7801V17.014C3.99999 15.8166 3.99998 14.8546 4.06617 14.0764C4.13428 13.2757 4.27778 12.5801 4.61714 11.9403C5.15884 10.919 6.01911 10.0961 7.06797 9.58267C7.72004 9.26351 8.42891 9.12789 9.2535 9.06317C10.0586 8.99999 11.0557 8.99999 12.3063 9ZM8.80097 26.6667C9.27478 25.4364 10.5001 24.5882 11.8889 24.5882C13.3249 24.5882 14.5868 25.4957 15.0229 26.7941H24.6667V17.0588C24.6667 15.8062 24.6658 14.9294 24.6077 14.2459C24.5507 13.5754 24.4439 13.1814 24.2827 12.8774C23.9438 12.2385 23.3989 11.7116 22.7194 11.379C22.3891 11.2173 21.9637 11.1125 21.2567 11.057C20.5391 11.0007 19.6204 11 18.3185 11H12.3481C11.0462 11 10.1276 11.0007 9.40999 11.057C8.70292 11.1125 8.27757 11.2173 7.94723 11.379C7.26778 11.7116 6.7229 12.2385 6.38399 12.8774C6.22278 13.1814 6.11601 13.5754 6.05897 14.2459C6.00084 14.9294 6 15.8062 6 17.0588V20.7353C6 21.9879 6.00084 22.8647 6.05897 23.5482C6.11601 24.2187 6.22278 24.6128 6.38399 24.9167C6.7229 25.5556 7.26778 26.0825 7.94723 26.4151C8.17065 26.5244 8.43613 26.6073 8.80097 26.6667ZM26.6667 17.6176V26.7941H27.6993C28.1354 25.4957 29.3973 24.5882 30.8333 24.5882C32.2694 24.5882 33.5313 25.4957 33.9674 26.7941H34.163C34.5003 26.7941 34.6956 26.7934 34.8388 26.7822C34.8985 26.7775 34.9313 26.7719 34.9459 26.769C34.9605 26.7602 34.9715 26.7503 34.9796 26.7407C34.9819 26.7263 34.9851 26.7032 34.988 26.6691C34.9992 26.5374 35 26.3554 35 26.0294V24.5588C35 23.1518 34.9992 22.1592 34.9332 21.3837C34.8684 20.6212 34.7459 20.1591 34.5534 19.7962C34.1595 19.0535 33.5268 18.4422 32.7393 18.0568C32.3476 17.865 31.8513 17.7452 31.0485 17.6822C30.2352 17.6184 29.196 17.6176 27.7333 17.6176H26.6667ZM11.8889 26.5882C11.144 26.5882 10.6049 27.1526 10.5928 27.7714L10.5926 27.7941C10.5926 28.4226 11.1347 29 11.8889 29C12.6431 29 13.1852 28.4226 13.1852 27.7941C13.1852 27.1656 12.6431 26.5882 11.8889 26.5882ZM30.8333 26.5882C30.0792 26.5882 29.537 27.1656 29.537 27.7941C29.537 28.4226 30.0792 29 30.8333 29C31.5875 29 32.1296 28.4226 32.1296 27.7941C32.1296 27.1656 31.5875 26.5882 30.8333 26.5882Z" fill="#A75BFF" />
                                        </svg>

                                    </div>
                                    <div className="contentPayment">
                                        <h6>Pago contra entrega</h6>
                                        <p>Realizarás el pago al recibir tu pedido</p>
                                    </div>
                                    <div className="checkPayment">
                                        <Input type='radio'
                                            checked={selectedCheckbox === 4}
                                            onChange={() => handleCheckboxChange(4)} />
                                    </div>

                                </div>
                            )}
                        </Card>

                    </div> */}


                    </div>



                </div>
            </div >
        </>
    )
}

export default CheckoutNoToken;
