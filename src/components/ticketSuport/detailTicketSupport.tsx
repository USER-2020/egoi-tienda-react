import React, { useEffect, useState } from 'react'
import { Card, Form, FormGroup, Input, Label } from 'reactstrap'
import { getCurrentUser } from '../../helpers/Utils';
import { getTicketById, sendReplySupportTicket } from '../../services/ordenes';

function DetailTicketSupport({idTicket}) {

  const currenUser = getCurrentUser();
  const token = currenUser.token;

  const [message, setMessage]= useState('');

  const getInfoTicketById = ()=>{
    getTicketById(token, idTicket)
    .then((res)=>{
      console.log(res.data);
    }).catch((err)=>console.log(err));
  }

  const senReply = () => {
    sendReplySupportTicket(token, message, idTicket)
    .then((res)=>{
      console.log('respuesta de enviar el mesnaje al ticekt por id', res.data);
      setMessage('');
    }).catch((err)=>console.log(err));
  }

  useEffect(()=>{
    if(token){
      getInfoTicketById();
      console.log(idTicket);
      
    }
  },[]);

  useEffect(()=>{
    console.log(message);
  },[message]);

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
              value={message}
              onChange={(e)=> setMessage(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="enviarMenssageContainer">
          <a href="#" onClick={senReply}>Enviar mensaje</a>
        </div>
      </Card>
    </div>
  )
}

export default DetailTicketSupport
