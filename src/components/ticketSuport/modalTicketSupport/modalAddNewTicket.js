import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { activar } from './../../../services/login';

function ModalAddNewTicket() {

    const [asunto, setAsunto] = useState("");
    const [tipoProblema, setTipoProblema] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [description, setDescription] = useState('');
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
                                <Form>
                                    <FormGroup>
                                        <Input addon={true}
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
                                        <Input addon={true}
                                            name="tipoDeProblema"
                                            classNanme="form-control"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            placeholder="Tipo de problema  "
                                            value={tipoProblema}
                                            onChange={(event) => setTipoProblema(event.target.value)}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Input addon={true}
                                            name="tipoDeProblema"
                                            classNanme="form-control"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            placeholder="Prioridad  "
                                            value={prioridad}
                                            onChange={(event) => setPrioridad(event.target.value)}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Input addon={true}
                                            id="exampleText"
                                            name="text"
                                            type="textarea"
                                            placeholder='Describe tu problema...  '
                                            style={{ height: '100px', borderRadius:'24px'}}
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <div style={{ width: "100%", height: "48px", display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                            <a href='#' style={{ display: "flex", alignSelf: "center", textDecoration: "none", color: "white", width: "60%", height: "48px", justifyContent: "center", backgroundColor: "#FC5241", alignItems: "center", borderRadius: "32px" }} >Enviar ticket</a>
                                            
                                        </div>
                                        <div style={{ width: "100%", height: "48px", display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                        <a href='#' style={{textDecoration:'none', color:'#74737B'}}>Volver</a>
                                            
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

export default ModalAddNewTicket
