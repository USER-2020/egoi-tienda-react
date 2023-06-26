import React, { useState } from 'react'
import { Card, Form, FormGroup, Input } from 'reactstrap'
import './track_Order.css';

function TrackSearch({handleChangueTrackOrder}) {

    const [nroPedido, setNroPedido] = useState("");
    const [phone, setPhone] = useState("");


    return (
        <div>
            <Card style={{ width: '700px', padding: '32px'}}>
                <div className="trackSearchHeader">
                    <h5 style={{color:'#FC5241', fontSize:'18px'}}>Seguir tu pedido</h5>
                </div>
                <div className="trackSearchInputs">
                    <Form>
                        <FormGroup style={{display:'flex', flexDirection:'row', gap:'20px', marginTop:'20px'}}>
                            <Input
                                addon={true}
                                name="anioExpiracion"
                                style={{
                                    borderRadius: '50px',
                                    width: '50%',

                                }}
                                type="text"
                                placeholder="  Número de Pedido"
                                value={nroPedido}
                                onChange={(event) => setNroPedido(event.target.value)}

                            />
                            <Input
                                addon={true}
                                name="celular"
                                style={{
                                    borderRadius: '50px',
                                    width: '50%',

                                }}
                                type="text"
                                placeholder="  Número de celular"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </FormGroup>
                    </Form>
                </div>
                <div className="trackSearchBtn">
                    <a href="#" onClick={()=>handleChangueTrackOrder()}>Seguir pedido</a>
                </div>
            </Card>
        </div>
    )
}

export default TrackSearch
