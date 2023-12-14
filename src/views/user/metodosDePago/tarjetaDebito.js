import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { css } from 'styled-components';
import './styles-tarjetas.css';
import { getCurrentUser } from '../../../helpers/Utils';
import Swal from 'sweetalert2';
import { typePayment, allBanksById, makePay } from '../../../services/metodosDePago';
import { ThreeDots } from 'react-loader-spinner';
import ReactDOM from 'react-dom';


const ERROR_MESSAGES = {
    emptyCardNumber: 'El número de la tarjeta es obligatorio',
    invalidCardNumber: 'El número de la tarjeta es inválido',
    emptyExpiryDate: 'La fecha de expiración es inválida',
    monthOutOfRange: 'El mes de expiración debe estar entre 01 y 12',
    yearOutOfRange: 'El año de expiración no puede estar en el pasado',
    dateOutOfRange: 'La fecha de expiración no puede estar en el pasado',
    invalidExpiryDate: 'La fecha de expiración es inválida',
    emptyCVC: 'El código de seguridad es inválido',
    invalidCVC: 'El código de seguridad es inválido'
};

function TarjetaDebitoModal({ closeModalTarjetaDebito, descriptionOrder, dataOrderAddress, discountCoupon, total, cupon, ipAddress, idAddress, setModalPurchaseSuccess, setOk, setModalProcesoPago, setModalProcesoPagoClose, updateAddress }) {

    // const [typeCard, setTypeCard] = useState("");
    const [selectTypeCard, setSelectTypeCard] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardCvc, setCardCvc] = useState("");
    const [cardAno, setCardAno] = useState("");
    const [cardMonth, setCardMont] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardCuotes, setCardCuotes] = useState("1");
    const [identificationType, setIdentificationType] = useState("");
    const [identificationNumber, setIdentificationNumber] = useState("");
    const [selectedBank, setSelectedBank] = useState();
    const [valueBank, setValueBank] = useState();
    const [banks, setBanks] = useState([]);
    const [banksById, setBanksById] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs({ errorMessages: ERROR_MESSAGES });
    // const { erroredInputs, touchedInputs } = meta;

    /* Manejo de errores */
    const [cvcError, setCvcError] = useState(false);
    const [showTooltipAnio, setShowTooltipAnio] = useState(false);
    const [showTooltipCvc, setShowTooltipCvc] = useState(false);
    const [showTooltipMonth, setShowTooltipMonth] = useState(false);

    const isSmallScreen = window.innerWidth <= 768;
    const buttonWidth = isSmallScreen ? '90%' : '40%';


    /* Manejo de codigo de seguridad */
    const handleCvcChange = (event) => {
        const value = event.target.value;
        setCardCvc(value);
    };

    const handleCvcBlur = () => {
        const isValid = /^\d{3,}$/.test(cardCvc); // Validar que sean al menos 3 dígitos
        setShowTooltipCvc(!isValid);
    };

    /* Manejo de anio de expiracion */
    const handleAnioChangue = (event) => {
        const value = event.target.value;
        setCardAno(value);
    };

    const handleAnioBlur = () => {
        const isValid = /^\d{2,}$/.test(cardAno); //Validar que sean aleemnos 2 digitos para la fecha
        setShowTooltipAnio(!isValid);
    }

    /* Manejo de mes de expiracion */
    const handleMonthChangue = (event) => {
        const value = event.target.value;
        setCardMont(value);
    };

    const handleMonthBlur = () => {
        const isValid = /^\d{2}$/.test(cardMonth) && parseInt(cardMonth, 10) > 0 && parseInt(cardMonth, 10) <= 12;
        setShowTooltipMonth(!isValid);
    }




    const closeModalAndSendData = () => {
        const dataPaymentCredit = {
            identificationNumber: identificationNumber, //cedula del usuario traido del modal de pago
            cardNumber: cardNumber, //Numero de cuenta
            nameCard: cardName, //Nombre de la cuenta
            cardMonth: cardMonth, //Mes de de expiracion
            cardYear: cardAno, //Año de expiracion
            securityCode: cardCvc, //Codigo se seguridad
            cuotes: cardCuotes,//Cuotas de la tarjeta por default seria 1
        }
        // handleModalData(dataPaymentCredit);

    }

    const currenUser = getCurrentUser();
    const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currenUser sea null
    const userEmail = currenUser ? currenUser.email : null;


    const handleSelectChangeTypeCard = (e) => {
        const valorSeleccionadoTypeCard = e.target.value;
        console.log(valorSeleccionadoTypeCard);
        setSelectTypeCard(valorSeleccionadoTypeCard);

        // return valorSeleccionadoTalla;
        // Realizar otras acciones con el valor seleccionado
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;

        // Utiliza una expresión regular para verificar que solo haya números y guiones bajos
        if (/^[0-9_]*$/.test(inputValue)) {
            setIdentificationNumber(inputValue);
        }
    }

    const handleSelectChangeBank = (e) => {
        const valorSeleccionadoBanco = e.target.value;
        setValueBank(valorSeleccionadoBanco);
        //Obtener el objeto del banco seleccionado utilizando el valor seleccionado

    }

    const handleSelectChangeDI = (e) => {
        const valorSeleccionadoDI = e.target.value;
        setIdentificationType(valorSeleccionadoDI);

    }

    const handleChangeExpiryDate = (e) => {
        const value = e.target.value;
        const [month, year] = value.split('/').map((part) => part.trim());
        setCardMont(month);
        setCardAno(year);
    };



    const banksByIdTypePayments = () => {
        if (selectTypeCard) {
            allBanksById(selectTypeCard, token)
                .then((res) => {
                    console.log(res.data);
                    setBanksById(res.data);
                })
                .catch((err) => console.log(err));
        }
    }

    const allPayments = () => {
        typePayment(token)
            .then((res) => {
                console.log("estos son los tipos de pago con tarjeta", res.data);
                setBanks(res.data);
            })
            .catch((err) => console.log("Error al obtener los tipos de tarjeta", err));
    }


    const typeDis = {
        "C.C": "C.C",
        "NIT": "NIT"
    }

    const handleSubmitOrderPaymentCard = () => {

        updateAddress();
        if (token) {
            console.log("Envio de orden por tarjeta de dedito");
            if (showTooltipMonth || showTooltipAnio || showTooltipCvc) {
                Swal.fire({
                    title: 'Campos incompletos',
                    icon: 'question',
                    iconHtml: '?',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        confirmButton: 'background-color: #FC5241; color: white;', // Reemplaza 'mi-clase-de-estilo' con tu clase personalizada
                    },

                })
            } else {
                /* The code is assigning a default value to the variable `amountValue` which is equal to the
           value of `total`. Then, it checks if there is a `discountCoupon` object and if the `total`
           property of that object is defined. If it is defined, the code assigns the value of
           `discountCoupon.total` to the `amountValue` variable, which means that the total value with
           the discount applied will be used instead of the original total value. */
                let amountValue = total; // Valor por defecto, en caso de que no haya cupón aplicado

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
                const unformattedValue = total.toString().replace(/[,]/g, '');
                // Eliminar el símbolo "$" y convertir a número
                const numericValue = Number(unformattedValue.replace("$", ""));

                //Cupon code limpio
                const cuponCodeLimpio = Number(cuponCode.replace("$", ""));

                //Descuento limpio
                const cuponDescuentoLimpio = Number(cuponOffSale.replace("$", ""));

                //Anio de vencimiento 
                let year = "";
                if (cardAno) {
                    year = "20" + cardAno;
                }

                //issuer_Id para pse
                //   let issuerID = "";
                //   if (modalDataPSE && modalDataPSE.issuer === "pse") {
                //     issuerID = "1037";
                //   }

                //Tipo de tarjeta
                //   let tipo = "visa";
                //   if (modalDataPSE && modalDataPSE.issuer === "pse") {
                //     tipo = modalDataPSE.issuer;
                //   }

                //Documento
                //   let DI = "";
                //   if (modalDataPSE) {
                //     DI = modalDataPSE.identificationNumber;
                //   }
                //   if (modalDataTarjetas) {
                //     DI = modalDataTarjetas.identificationNumber;
                //   }

                //Concatenacion de los datos del numero de tarjeta
                let CardNumber = "";
                if (cardNumber) {
                    const nroCard = cardNumber.replace(/\s/g, '');
                    CardNumber = nroCard;
                    // Resto del código para utilizar el cardNumber sin espacios
                }



                const dataOrder = {

                    firstname: dataOrderAddress[0].contact_person_name, //nombre del usuario traido odesde el id de la direccion seleccionada
                    lastname: "", //apellido del usuario traido desde el id de la direccion seleccionada
                    email: userEmail, // correo del usuario userEmail
                    numberPhone: dataOrderAddress[0].phone, //numero de celular del usuario traido desde el id de la direccion seleccionada
                    type: "visa", //medio de pago traido del id del metodo de pago selesccionada
                    installments: cardCuotes,//cuotas de tarjeta
                    identificationNumber: identificationNumber, //cedula del usuario traido del modal de pago
                    amount: numericValue, //valor de la compra
                    ipAddress: ipAddress, //ip del cliente
                    description: descriptionOrder, //Descripción del producto adquirido, el motivo del pago. Ej. - "Celular Xiaomi Redmi Note 11S 128gb 6gb Ram Original Global Blue Version" (descripción de un producto en el marketplace).
                    callback_url: "https://egoi.xyz/admin/auth/login", //URL a la cual Mercado Pago hace la redirección final (sólo para transferencia bancaria).
                    cardNumber: CardNumber,//numero de la tarjeta traido de los modales de tarejta
                    nameInCard: cardName, //nombre del propietatio de la tarjeta traido de los modales de tarjeta
                    expirationMonth: cardMonth,//mes de vencimiento tarjeta traido de los modales de tarjeta
                    expirationYear: year,// año de vencimiento, tarjeta traido de los mdoales de tarjeta
                    securityCode: cardCvc,//codigo de seguridad tarjeta traido de los modales de tarjeta 
                    address_id: idAddress, // id de la direccion
                    billing_address_id: idAddress, // id de la direccion
                    coupon_code: cuponCodeLimpio, //codigo del cupon
                    coupon_discount: cuponDescuentoLimpio, //el decuento que te da el cupon 
                    order_note: dataOrderAddress[0].local_description,// como llegar infor traida de la direccion seleccionada por Id
                    plataforma: 'Web',//Plataforma desde que se hace la transaccion
                    tipo_pago: 'Tarjeta débito' //tipo de pago registrado
                }


                verifyPurchase(dataOrder);
            }
        }



    }

    const verifyPurchase = (dataOrder) => {
        // console.log(token);
        console.log("Estos son los datos de las ordenes", dataOrder);
        closeModalTarjetaDebito();
        setModalProcesoPago();
        //Manejo de modal procesando pago
        // let succesfulPayment = false;
        // Mostrar SweetAlert de carga
        // Swal.fire({
        //     title: 'Procesando pago',
        //     html: `
        //       <div style="display: flex; justify-content: center; align-items: center;">
        //         <div id="loaderContainer"></div>
        //       </div>
        //     `,
        //     allowOutsideClick: false,
        //     showConfirmButton: false,
        //     didOpen: () => {
        //         const loaderContainer = document.getElementById('loaderContainer');
        //         if (loaderContainer) {
        //             ReactDOM.render(
        //                 <ThreeDots height={80} width={80} color="#FC5241" />,
        //                 loaderContainer
        //             );
        //         }
        //     },
        //     willClose: () => {
        //         // Realizar acciones después de cerrar el cuadro de diálogo
        //     },
        //     onClose: () => {
        //         if (succesfulPayment) {
        //             const loaderContainer = document.getElementById('loaderContainer');
        //             if (loaderContainer) {
        //                 ReactDOM.unmountComponentAtNode(loaderContainer);
        //             }
        //         }
        //     },
        // });
        makePay(dataOrder, token)
            .then((res) => {
                console.log(res.data.data);

                if (res.data.data.MpTransactionId.status === "approved") {
                    console.log("El pago se registró con éxito");
                    setModalProcesoPagoClose();
                    setModalPurchaseSuccess();
                    setOk();
                }

                if (res.data.data.MpTransactionId.status === "rejected" || res.data.data.MpTransactionId.status === "in_process") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '¡Rechazamos tu pago, intentalo de nuevo!',
                    });
                    setModalProcesoPagoClose();
                }

            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Ha ocurrido un error procesando el pago!',
                });
                setModalProcesoPagoClose();
            });
    }

    useEffect(() => {
        if (token || selectTypeCard || valueBank || identificationType) {

            banksByIdTypePayments();
            allPayments();
            console.log(selectTypeCard);
            console.log(valueBank);
            console.log(identificationType);
        }
        if (dataOrderAddress || discountCoupon || total) {
            console.log(dataOrderAddress);
            console.log(discountCoupon);
            console.log(total);

        }
    }, [selectTypeCard, valueBank, identificationType, dataOrderAddress]);

    return (
        <>
            <Row>
                <Col>
                    <div style={{ paddingLeft: "2%", paddingRight: "2%", marginBottom: '10px' }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <h5 style={{ color: "#fc5241", marginBottom: "20px" }}>Paga con tarjeta débito</h5>
                        </div>
                        <Card style={{ border: 'none' }}>
                            <Form>



                                <FormGroup >


                                    <PaymentInputsWrapper {...wrapperProps}
                                        styles={{
                                            inputWrapper: {
                                                base: css`
                                            border-radius: 32px;
                                            
                                            
                                            `,
                                            }
                                        }}
                                        style={{ width: '100%' }}>

                                        <svg {...getCardImageProps({ images })}
                                            style={{ width: '10%', marginLeft: '10px' }} />

                                        <input {...getCardNumberProps({
                                            onChange: (e) => setCardNumber(e.target.value),


                                        })}

                                            value={cardNumber}
                                            placeholder="0000 0000 0000 0000"
                                            style={{ width: '100%', marginRight: '0', transform: "translateX(0)" }}

                                        // className="card-number-input"

                                        />

                                    </PaymentInputsWrapper>



                                </FormGroup>

                                <FormGroup style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                    <InputGroup>
                                        {/* <Select
                                            name="anioExpiracion"
                                            className={`form-control ${showTooltipMonth ? 'error' : ''}`}
                                            style={{
                                                borderRadius: '50px',
                                                width: '33.3%',
                                                borderColor: showTooltipMonth ? 'red' : '',
                                            }}
                                            value={cardMonth}
                                            onChange={handleMonthChange}
                                            onBlur={handleMonthBlur}
                                        >
                                            <option value="">Mes</option>
                                            <option value="01">Enero</option>
                                            <option value="02">Febrero</option>
                                            <option value="03">Marzo</option>
                                            <option value="04">Abril</option>
                                            <option value="05">Mayo</option>
                                            <option value="06">Junio</option>
                                            <option value="07">Julio</option>
                                            <option value="08">Agosto</option>
                                            <option value="09">Septiembre</option>
                                            <option value="10">Octubre</option>
                                            <option value="11">Noviembre</option>
                                            <option value="12">Diciembre</option>
                                        </Select> */}

                                        <Input
                                            addon={true}
                                            name="anioExpiracion"
                                            // className={`form-control ${showTooltipMonth ? 'error' : ''}`}
                                            style={{
                                                borderRadius: '50px',
                                                width: '33.3%',
                                                borderColor: showTooltipMonth ? 'red' : '',
                                            }}
                                            type="select"
                                            placeholder="Mes"
                                            value={cardMonth}
                                            onChange={handleMonthChangue}
                                            onBlur={handleMonthBlur}
                                            maxLength={2}
                                        >
                                            <option value="">Mes</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </Input>
                                        {/* {showTooltipMonth && (
                                            <div className="custom-tooltip" data-html={true} data-effect="solid" data-place="bottom" data-event-off="click">
                                                Debe ingresar una fecha para mes valida menor o igual a 12
                                            </div>
                                        )} */}

                                    </InputGroup>

                                    <InputGroup>
                                        <Input
                                            addon={true}
                                            name="anioExpiracion"
                                            // className={`form-control ${showTooltipAnio ? 'error' : ''}`}
                                            style={{
                                                borderRadius: '50px',
                                                width: '33.3%',
                                                borderColor: showTooltipAnio ? 'red' : '',
                                            }}
                                            type="select"
                                            placeholder="Año"
                                            value={cardAno}
                                            onChange={handleAnioChangue}
                                            onBlur={handleAnioBlur}
                                            maxLength={2}
                                        >
                                            <option value="">Año</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                            <option value="32">32</option>
                                            <option value="33">33</option>
                                            <option value="34">34</option>
                                            <option value="35">35</option>
                                            <option value="36">36</option>
                                            <option value="37">37</option>
                                            <option value="38">38</option>
                                            <option value="39">39</option>
                                            <option value="40">40</option>
                                            <option value="41">41</option>
                                            <option value="42">42</option>
                                            <option value="43">43</option>
                                        </Input>
                                        {/* {showTooltipAnio && (
                                            <div className="custom-tooltip" data-html={true} data-effect="solid" data-place="bottom" data-event-off="click">
                                                Debe ingresar una fecha valida XX
                                            </div>
                                        )} */}
                                    </InputGroup>

                                    <InputGroup>
                                        <Input
                                            addon={true}
                                            name="cvc"
                                            // className={`form-control ${showTooltipCvc ? 'error' : ''}`}
                                            style={{
                                                borderRadius: '50px',
                                                width: '33.3%',
                                                borderColor: showTooltipCvc ? 'red' : '',
                                            }}
                                            type="text"
                                            placeholder="CVC"
                                            value={cardCvc}
                                            onChange={handleCvcChange}
                                            onBlur={handleCvcBlur}
                                            maxLength={3}
                                        />
                                        {/* {showTooltipCvc && (
                                            <div className="custom-tooltip" data-html={true} data-effect="solid" data-place="bottom" data-event-off="click">
                                                Debe ingresar al menos 3 dígitos
                                            </div>
                                        )} */}
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup>

                                    <Input addon={true}
                                        name="Cuotes"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",


                                        }}
                                        type="number"
                                        placeholder="Cuotes"
                                        value={cardCuotes}
                                        onChange={(event) => setCardCuotes(event.target.value)}
                                        hidden
                                    />

                                </FormGroup>

                                <FormGroup>

                                    <Input addon={true}
                                        name="contactPersonName"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",

                                        }}
                                        placeholder="Nombre en la tarjeta"
                                        value={cardName}
                                        onChange={(event) => setCardName(event.target.value.toUpperCase())}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Input addon={true}
                                        name="typeIdentification"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        value={identificationType}
                                        type='select'
                                        onChange={handleSelectChangeDI}
                                    >
                                        <option value="">Tipo de documento</option>
                                        {Object.entries(typeDis).map(([id, nombre]) => (
                                            <option value={id}>{nombre}</option>
                                        ))}

                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Input
                                        type="text"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="Número de documento"
                                        value={identificationNumber}
                                        onChange={handleInputChange}
                                    />



                                </FormGroup>

                                <FormGroup>
                                    <div style={{ width: "100%", height: "48px", display: "flex", justifyContent: "center", marginTop: "20px", flexDirection: 'column' }}>
                                        {/* <div>
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
                                        <Button style={{ marginTop: '10px', display: "flex", alignSelf: "center", textDecoration: "none", color: "white", width: buttonWidth, height: "48px", justifyContent: "center", backgroundColor: "#FC5241", alignItems: "center", borderRadius: "32px", border: 'none' }} onClick={(e) => { e.preventDefault(); handleSubmitOrderPaymentCard() }}>Registrar pago</Button>
                                    </div>
                                </FormGroup>

                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default TarjetaDebitoModal;
