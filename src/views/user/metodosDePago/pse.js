import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './input-con-icono.css';
import { allBanks } from '../../../services/bank';
import { getCurrentUser } from '../../../helpers/Utils';

function PseModal() {

    const [pseDocument, setPseDocument] = useState("");
    const [pseTypeDocument, setPseTypeDocument] = useState("");
    const [pseBank, setPseBank] = useState([]);
    const [email, setEmail] = useState("");
    const [selectTypeCard, setSelectTypeCard] = useState("");
    const [identificationType, setIdentificationType] = useState("");
    const [valueBank, setValueBank] = useState();

    const currenUSer = getCurrentUser();
    const token = currenUSer.token;

    const typeDis = {
        "C.C": "C.C",
        "NIT": "NIT"
    }

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

    useEffect(()=>{
        getAllBanks();
        if(valueBank || identificationType){
            console.log(valueBank);
            console.log(identificationType);
        }
    },[valueBank, identificationType]);

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
                                        placeholder="Numero de documento"
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
                                        {pseBank.map((banco, index)=>(
                                            <option value={banco.financial_institution_code}>{banco.financial_institution_name}</option>
                                        ))}

                                    </Input>
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
