import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { css } from 'styled-components';
import { getCurrentUser } from '../../../helpers/Utils';
import { typePayment, allBanksById } from '../../../services/metodosDePago';


function TarjetaDebitoModal({ handleModalData }) {

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
    const [valueBank, setValueBank] = useState();
    const [banks, setBanks] = useState([]);
    const [banksById, setBanksById] = useState([]);
    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();

    const currenUser = getCurrentUser();
    const token = currenUser.token;

    const handleSelectChangeTypeCard = (e) => {
        const valorSeleccionadoTypeCard = e.target.value;
        console.log(valorSeleccionadoTypeCard);
        setSelectTypeCard(valorSeleccionadoTypeCard);

        // return valorSeleccionadoTalla;
        // Realizar otras acciones con el valor seleccionado
    };

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

    const closeModalAndSendData = () => {
        const data = {
            typeCard: selectTypeCard,
            identificationNumber: identificationNumber, //cedula del usuario traido del modal de pago
            cardNumber:cardNumber, //Numero de cuenta
            nameCard: cardName, //Nombre de la cuenta
            cardMonth: cardMonth, //Mes de de expiracion
            cardYear: cardAno, //Año de expiracion
            securityCode: cardCvc, //Codigo se seguridad
        }
        handleModalData(data);

    }

    useEffect(() => {
        if (token || selectTypeCard || valueBank || identificationType) {

            banksByIdTypePayments();
            allPayments();
            console.log(selectTypeCard);
            console.log(valueBank);
            console.log(identificationType);
        }
    }, [selectTypeCard, valueBank, identificationType]);

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
                            <h5 style={{ color: "#fc5241", marginBottom: "20px" }}>Paga con tarjeta debito</h5>
                        </div>
                        <Card style={{ border: 'none' }}>
                            <Form>

                                <FormGroup>
                                    <Input addon={true}
                                        name="typeIdentification"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        value={selectTypeCard}
                                        type='select'
                                        onChange={handleSelectChangeTypeCard}
                                    >
                                        <option value="">Tipo de tarjeta</option>
                                        {banks.map((banco, index) => {
                                            if (banco.name !== "Efecty" && banco.name !== "PSE") {
                                                return <option value={banco.id}>{banco.name}</option>;
                                            }
                                            return null
                                        })}

                                    </Input>
                                </FormGroup>

                                <FormGroup >


                                    <PaymentInputsWrapper {...wrapperProps}
                                        styles={{
                                            inputWrapper: {
                                                base: css`
                                            border-radius: 32px;
                                            `,
                                            }
                                        }}>

                                        <svg {...getCardImageProps({ images })} />

                                        <input {...getCardNumberProps({ onChange: (e) => setCardNumber(e.target.value) })}
                                            value={cardNumber}
                                            placeholder="0000 0000 0000 0000"
                                        />

                                        <input {...getExpiryDateProps({ onChange: handleChangeExpiryDate })}
                                        />

                                        <input {...getCVCProps({ onChange: (e) => setCardCvc(e.target.value) })}
                                            value={cardCvc} />
                                    </PaymentInputsWrapper>

                                </FormGroup>

                                <FormGroup style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                    <Input addon={true}
                                        name="Cuotas"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                            width: "20%"

                                        }}
                                        type="number"
                                        placeholder="Cuotas"
                                        value={cardCuotes}
                                        onChange={(event) => setCardCuotes(event.target.value)}
                                        hidden
                                    />

                                    <Input addon={true}
                                        name="contactPersonName"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                            width: "80%"
                                        }}
                                        placeholder="Nombre en la tarjeta"
                                        value={cardName}
                                        onChange={(event) => setCardName(event.target.value.toUpperCase())}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Input addon={true}
                                        name="bank"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        value={valueBank}
                                        type='select'
                                        onChange={handleSelectChangeBank}
                                    >
                                        <option value="">Bancos</option>
                                        {banksById && banksById.map((banco) => (
                                            <option value={banco.id} key={banco.id}>{banco.name}</option>
                                        ))}

                                    </Input>
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
                                    <Input addon={true}
                                        name="contactPersonName"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",

                                        }}
                                        type="number"
                                        placeholder="Numero de documento"
                                        value={identificationNumber}
                                        onChange={(event) => setIdentificationNumber(event.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <div style={{ width: "100%", height: "48px", display: "flex", justifyContent: "center", backgroundColor: "#FC5241", borderRadius: "32px", marginTop: "20px" }}>
                                        <a href='#' style={{ display: "flex", alignSelf: "center", textDecoration: "none", color: "white", width: "100%", justifyContent: "center" }} onClick={closeModalAndSendData}>Registrar Pago</a>
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

