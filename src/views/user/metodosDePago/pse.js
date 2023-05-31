import React, {useState} from 'react'
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './input-con-icono.css';

function PseModal () {

    const [pseDocument, setPseDocument] = useState("");
    const [pseTypeDocument, setPseTypeDocument] = useState("");
    const [pseBank, setPseBank]= useState("");
    const [email, setEmail] = useState("");
    const [selectTypeCard, setSelectTypeCard] = useState("");
    const [typeCard, setTypeCard] = useState("");

    const typeCards = {
      "1": "Tarjeta debito",
      "2": "Tarjeta credito"
  }

  const handleSelectChangeTypeCard = (e) => {
    const valorSeleccionadoTypeCard = e.target.value;
    console.log(valorSeleccionadoTypeCard);
    setSelectTypeCard(valorSeleccionadoTypeCard);
    const nombreTipoTarjeta = typeCards[valorSeleccionadoTypeCard];
    setTypeCard(nombreTipoTarjeta);
    console.log(nombreTipoTarjeta);
    // return valorSeleccionadoTalla;
    // Realizar otras acciones con el valor seleccionado
};

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
                                        value={selectTypeCard}
                                        type='select'
                                        onChange={handleSelectChangeTypeCard}
                                    >
                                        <option value="">Tipo de documento</option>
                                        {Object.entries(typeCards).map(([id, nombre])=>(
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
                                        value={selectTypeCard}
                                        type='select'
                                        onChange={handleSelectChangeTypeCard}
                                    >
                                        <option value="">Banco</option>
                                        {Object.entries(typeCards).map(([id, nombre])=>(
                                            <option value={id}>{nombre}</option>
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
