import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { activar } from './../../../services/login';
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { getCurrentUser } from '../../../helpers/Utils';
import { createTicketSupport } from '../../../services/ordenes';

function ModalAddNewTicket({ closeModalNewTicket, refreshTickets }) {
    const {
        reset,
        formState: { errors },
    } = useForm();

    const [asunto, setAsunto] = useState("");
    const [tipoProblema, setTipoProblema] = useState('');
    const [prioridad, setPrioridad] = useState('01');
    const [description, setDescription] = useState('');

    const currenUser = getCurrentUser();
    const token = currenUser.token;

    const tipoProblemaOptions = [
        "Problema con sitio web",
        "Estado del pedido",
        "Queja",
        "Pregunta",
    ];

    const onSubmit = (data) => {
        createTicketSupport(token ,data)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Actualizacion exitosa!',
                    text: 'El ticket de soporte ha sido creado con exito, prontamente nos pondremos en contacto contigo!.',
                    confirmButtonColor: '#0d6efd',
                });
                closeModalNewTicket();
                refreshTickets();
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Se ha producido un error durante el registro. Por favor, inténtelo de nuevo.',
                    confirmButtonColor: '#dc3545',
                });
            })
    }

    const handleSubmitTicket = (e) => {
        e.preventDefault();

        const data = {
            subject: asunto,
            type: tipoProblema,
            description: description
        };
        onSubmit(data);
    }

    return (
        <div>
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
                                <h5 style={{ color: "#fc5241", marginBottom: "20px" }}>Enviar nuevo ticket</h5>
                            </div>
                            <Card style={{ border: 'none' }}>
                                <Form onSubmit={handleSubmitTicket}>
                                    <FormGroup>
                                        <Input
                                            addon={true}
                                            name="asunto"
                                            classNanme="form-control"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            type="text"
                                            placeholder="Asunto  "
                                            value={asunto}
                                            onChange={(event) => setAsunto(event.target.value)}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Input
                                            addon={true}
                                            name="tipoDeProblema"
                                            classNanme="form-control"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            type="select"
                                            placeholder="Tipo de problema  "
                                            value={tipoProblema}
                                            onChange={(event) => setTipoProblema(event.target.value)}
                                        >
                                            <option value="">Tipo de problema</option>
                                            {tipoProblemaOptions.map((option) => (
                                                <option value={option}>{option}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Input
                                            addon={true}
                                            name="tipoDeProblema"
                                            classNanme="form-control"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            placeholder="Prioridad"
                                            value={prioridad}
                                            onChange={(event) => setPrioridad(event.target.value)}
                                            hidden
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Input
                                            addon={true}
                                            id="exampleText"
                                            name="text"
                                            type="textarea"
                                            placeholder='Describe tu problema...'
                                            style={{ height: '100px', borderRadius: '24px' }}
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <div style={{ width: "100%", height: "48px", display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                            <Button style={{ display: "flex", alignSelf: "center", textDecoration: "none", color: "white", width: "60%", height: "48px", justifyContent: "center", backgroundColor: "#FC5241", alignItems: "center", borderRadius: "32px", border:'none'}} type='submit'>Enviar ticket</Button>
                                        </div>
                                        <div style={{ width: "100%", height: "10px", display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: '0' }}>
                                            <a href='#' style={{ textDecoration: 'none', color: '#74737B' }} onClick={() => closeModalNewTicket}>Volver</a>
                                        </div>
                                    </FormGroup>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </>
        </div>
    )
}

export default ModalAddNewTicket;
