import React from 'react'
import { Card, Form, FormGroup, Input, Label } from 'reactstrap'

function DetailTicketSupport() {
  return (
    <div className='detailTicketSupportContainer'>
      <Card>
        <div className="detailTicketSupportHeader">
          <div className="containerDatos">
            <h6>Prioridad</h6>
            <p>01</p>
          </div>
          <div className="containerDatos">
            <h6>Estatus</h6>
            <p>Pendiente</p>
          </div>
        </div>
        <div className="containerMessage">
          <h6>Deja un mensaje</h6>
          <FormGroup>
            
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              placeholder='Enviar mensaje...'
              style={{ height: '230px', backgroundColor:'#A2A1A729', borderRadius:'24px', border:'none'}}
            />
          </FormGroup>
        </div>
        <div className="enviarMenssageContainer">
          <a href="#">Enviar mensaje</a>
        </div>
      </Card>
    </div>
  )
}

export default DetailTicketSupport
