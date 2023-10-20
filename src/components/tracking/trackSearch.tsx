import React, { useState } from 'react'
import { Card, Form, FormGroup, FormText, Input, InputGroup, Label } from 'reactstrap'
import './track_Order.css';

function TrackSearch({ handleChangueTrackOrder }) {

    const [nroPedido, setNroPedido] = useState("");
    const [phone, setPhone] = useState("");

    const handleNroPedidoChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Eliminar caracteres no numéricos
        setNroPedido(numericValue);
    };

    const handlePhoneChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Eliminar caracteres no numéricos
        setPhone(numericValue);
    };


    return (
        <div className='searchContainerCard'>
            <Card className='searchCardInputs'>
                <div className="trackSearchHeader">
                    {/* <h5 style={{ color: '#FC5241', fontSize: '18px' }}>Seguir tu pedido</h5> */}
                </div>
                <div className="trackSearchInputs">
                    <Form>
                        <FormGroup style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '20px' }}>
                            <InputGroup style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* <Label style={{ fontSize: '14px' }}>Número de pedido</Label> */}
                                <Input
                                    addon={true}
                                    name="anioExpiracion"
                                    style={{
                                        borderRadius: '50px',
                                        width: '100%',

                                    }}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="  Número de Pedido"
                                    value={nroPedido}
                                    onChange={handleNroPedidoChange}
                                />

                            </InputGroup>
                            {/* <InputGroup style={{ display: 'flex', flexDirection: 'column' }}>
                                <Label style={{ fontSize: '14px' }}>Número de celular</Label>
                                <Input
                                    addon={true}
                                    name="celular"
                                    style={{
                                        borderRadius: '50px',
                                        width: '100%',

                                    }}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="  Número de celular"
                                    value={phone}
                                    maxLength={10}
                                    onChange={handlePhoneChange}
                                />
                            </InputGroup> */}
                        </FormGroup>
                    </Form>
                </div>
                <div className="trackSearchBtn">
                    <a href="#" onClick={() => handleChangueTrackOrder(nroPedido)}>Seguir pedido</a>
                </div>
            </Card>
        </div>
    )
}

export default TrackSearch
