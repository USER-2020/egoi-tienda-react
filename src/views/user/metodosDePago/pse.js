import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './input-con-icono.css';
import { allBanks } from '../../../services/bank';
import { getCurrentUser } from '../../../helpers/Utils';
import Swal from 'sweetalert2';
import { makePay } from '../../../services/metodosDePago';
import { ThreeDots } from 'react-loader-spinner';
import ReactDOM from 'react-dom';
import ModalProcesandoPago from './modalProcesandoPago';

function PseModal({ closeModalPse, dataOrderAddress, total, discountCoupon, cupon, ipAddress, idAddress, descriptionOrder, setModalPurchaseSuccess, setOk, setModalProcesoPago, setModalProcesoPagoClose}) {

    const [pseDocument, setPseDocument] = useState("");
    const [pseTypeDocument, setPseTypeDocument] = useState("");
    const [pseBank, setPseBank] = useState([]);
    const [email, setEmail] = useState("");
    const [selectTypeCard, setSelectTypeCard] = useState("");
    const [identificationType, setIdentificationType] = useState("");
    const [valueBank, setValueBank] = useState();

    //Manejo de modal procesando pago
    const [succesfulPayment, setSuccesfulPayment] = useState(false);

    

    const currenUSer = getCurrentUser();
    const token = currenUSer.token;

    const typeDis = {
        "C.C": "C.C",
        "NIT": "NIT"
    }

    // const closeModalAndSendData = () => {
    //     const data = {
    //         valueBank: valueBank,
    //         identificationNumber: pseDocument, //cedula del usuario traido del modal de pago
    //         issuer: "pse",
    //         cuotes: "1"
    //     }
    //     handleModalData(data);

    // }

    const handleSelectChangeTypeCard = (e) => {
        const valorSeleccionadoTypeCard = e.target.value;
        console.log(valorSeleccionadoTypeCard);
        setSelectTypeCard(valorSeleccionadoTypeCard);

        // return valorSeleccionadoTalla;
        // Realizar otras acciones con el valor seleccionado
    };

    const handleSelectChangeDI = (e) => {
        const valorSeleccionadoDI = e.target.value;
        setIdentificationType(valorSeleccionadoDI);

    }

    const handleSelectChangeBank = (e) => {
        const valorSeleccionadoBanco = e.target.value;
        setValueBank(valorSeleccionadoBanco);
        //Obtener el objeto del banco seleccionado utilizando el valor seleccionado

    }

    const getAllBanks = () => {
        allBanks(token)
            .then((res) => {
                console.log(res.data.data);
                setPseBank(res.data.data);
            })
    }

    const openWindowPSExternal = (direccion_url_pse) => {
        window.open(direccion_url_pse, "_blank");
    }

    const handleSubmitOrderPaymentCard = () => {
        if (token) {
            console.log("Envio de orden por pse");
            
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
            let cuponOffSale = "0";
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
            // let year = "";
            // if (cardAno) {
            //     year = "20" + cardAno;
            // }

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
            // let CardNumber = "";
            // if (cardNumber) {
            //     const nroCard = cardNumber.replace(/\s/g, '');
            //     CardNumber = nroCard;
            //     // Resto del código para utilizar el cardNumber sin espacios
            // }



            const dataOrder = {

                firstname: dataOrderAddress[0].contact_person_name, //nombre del usuario traido odesde el id de la direccion seleccionada
                lastname: "", //apellido del usuario traido desde el id de la direccion seleccionada
                email: "juanfernandozuluaga2014310@gmail.com", // correo del usuario userEmail
                numberPhone: dataOrderAddress[0].phone, //numero de celular del usuario traido desde el id de la direccion seleccionada
                type: "pse", //medio de pago traido del id del metodo de pago selesccionado
                issuer_id: "1037",  // id de banco traido del modal de pago seleccionado solo para pse !!
                installments: "1",//cuotas de tarjeta
                financial_institution: valueBank, //id del tipo de banco que se obtiene del modal de pago
                identificationNumber: pseDocument, //cedula del usuario traido del modal de pago
                amount: numericValue, //valor de la compra
                ipAddress: ipAddress, //ip del cliente
                description: descriptionOrder, //Descripción del producto adquirido, el motivo del pago. Ej. - "Celular Xiaomi Redmi Note 11S 128gb 6gb Ram Original Global Blue Version" (descripción de un producto en el marketplace).
                callback_url: "https://egoi.xyz/admin/auth/login", //URL a la cual Mercado Pago hace la redirección final (sólo para transferencia bancaria).
                address_id: idAddress, // id de la direccion
                billing_address_id: idAddress, // id de la direccion
                coupon_code: cuponCode, //codigo del cupon
                coupon_discount: cuponOffSale, //el decuento que te da el cupon 
                order_note: dataOrderAddress[0].local_description// como llegar infor traida de la direccion seleccionada por Id
            }


            verifyPurchase(dataOrder);
        }
    }

    const verifyPurchase = (dataOrder) => {
        console.log("Estos son los datos de las ordenes", dataOrder);
        closeModalPse();
        setModalProcesoPago();
        // let sweetAlertInstance = null;
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
        // willClose: () => {
        //     // Realizar acciones después de cerrar el cuadro de diálogo
        //     succesfulPayment = true;
        // },
        // onClose: () => {
        //     if (succesfulPayment) {
        //         const loaderContainer = document.getElementById('loaderContainer');
        //         if (loaderContainer) {
        //             ReactDOM.unmountComponentAtNode(loaderContainer);
        //         }
        //     }
        // },
        // });
        makePay(dataOrder, token)
            .then((res) => {

                console.log(res.data);
                // console.log(res.data.data.MpTransactionId.responsePayMp.transaction_details.external_resource_url);
                // let direccion_url_pse = res.data.data.MpTransactionId.responsePayMp.transaction_details.external_resource_url;
                // if(direccion_url_pse !== null){
                //   openWindowPSExternal(direccion_url_pse);
                // }
                console.log(res.data.data.MpTransactionId.responsePayMp.transaction_details.external_resource_url);
                let direccion_url_pse = res.data.data.MpTransactionId.responsePayMp.transaction_details.external_resource_url;
                if (direccion_url_pse !== null) {
                    openWindowPSExternal(direccion_url_pse);
                }
                console.log("El pago se registro");
                // succesfulPayment = true;
                setModalProcesoPagoClose();
                setModalPurchaseSuccess();
                setOk();

            }).catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Ha ocurrido un error procesando el pago!',

                })
            })
        // .finally(() => {
        //     // Cerrar SweetAlert independientemente del resultado del pago
        //     if (sweetAlertInstance) {
        //         sweetAlertInstance.close();
        //     }
        // });

    }


    useEffect(() => {
        getAllBanks();
        if (valueBank || identificationType) {
            console.log(valueBank);
            console.log(identificationType);


        }
    }, [valueBank, identificationType]);

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
                            <h5 style={{ color: "#fc5241", marginBottom: "20px" }}>Pago PSE</h5>
                        </div>
                        <Card style={{ border: 'none' }}>
                            <Form>
                                <FormGroup>
                                    <Input addon={true}
                                        name="typeCard"
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
                                    <Input addon={true}
                                        name="identifynumber"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        type="number"
                                        placeholder="Número de documento"
                                        value={pseDocument}
                                        onChange={(event) => setPseDocument(event.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Input addon={true}
                                        name="contactPersonName"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="usuario@dominio.com"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Input addon={true}
                                        name="typeCard"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        value={valueBank}
                                        type='select'
                                        onChange={handleSelectChangeBank}
                                    >
                                        <option value="">Banco</option>
                                        {pseBank.map((banco, index) => (
                                            <option value={banco.financial_institution_code}>{banco.financial_institution_name}</option>
                                        ))}

                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <div style={{ width: "100%", height: "48px", display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                        <a href='#' style={{ display: "flex", alignSelf: "center", textDecoration: "none", color: "white", width: "60%", height: "48px", justifyContent: "center", backgroundColor: "#FC5241", alignItems: "center", borderRadius: "32px" }} onClick={handleSubmitOrderPaymentCard}>Registrar pago</a>
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

export default PseModal;
