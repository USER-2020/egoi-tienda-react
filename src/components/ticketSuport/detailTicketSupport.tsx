import React, { useEffect, useState } from 'react'
import { Card, Form, FormGroup, Input, Label } from 'reactstrap'
import { getCurrentUser } from '../../helpers/Utils';
import { getTicketById, sendReplySupportTicket } from '../../services/ordenes';

function DetailTicketSupport({ idTicket, status, priority }) {

  const currenUser = getCurrentUser();
  const token = currenUser.token;

  const [message, setMessage] = useState('');
  const [dataChats, setDataChats] = useState([]);
  const [dataChatById, setDataChatById] = useState([]);

  const getInfoTicketById = () => {
    getTicketById(token, idTicket)
      .then((res) => {
        // console.log("Respuesta del ticket por id", res.data);
        setDataChats(res.data);
        setDataChatById(res.data);
      }).catch((err) => console.log(err));
  }

  const senReply = () => {
    sendReplySupportTicket(token, message, idTicket)
      .then((res) => {
        // console.log('respuesta de enviar el mesnaje al ticekt por id', res.data);
        setMessage('');
        getInfoTicketById();
      }).catch((err) => console.log(err));
  }

  useEffect(() => {
    if (token) {
      getInfoTicketById();
      // console.log(idTicket);
      // console.log(status);
      // console.log(priority);

    }
  }, []);

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <div className='detailTicketSupportContainer'>
      <Card className='ticketSendMessageCard'>
        <div className="detailTicketSupportHeader">
          <div className="containerDatos">
            <h6>Prioridad</h6>
            <span className="badge">{priority}</span>
          </div>
          <div className="containerDatos">
            <h6>Estatus</h6>
            <span className="badgeS">{status}</span>
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
              style={{ height: '230px', backgroundColor: '#A2A1A729', borderRadius: '24px', border: 'none' }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="enviarMenssageContainer">
          <a href="#" onClick={senReply}>Enviar mensaje</a>
        </div>
      </Card>

      <Card className='chatTicketSupport'>
        <div className="headerChat">Chat</div>
        <div className="contenedorMensajes">
          {dataChatById.map((item, index) => (
            <React.Fragment key={index}>
              {item.customer_message !== null && (
              <div className="mensajeItemUser">
                <div className="messageUser">
                  <p>{item.customer_message}</p>
                </div>
                <div className="marcaTiempoUser">
                  <p>{new Date(item.created_at).toLocaleString('es-ES', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                </div>
              </div>
              )}
              {item.admin_message !== null && (
                <div className="mensajeItemAdmin">
                  <div className="messageAdmin">
                    <p>{item.admin_message}</p>
                  </div>
                  <div className="marcaTiempoAdmin">
                    <p>{new Date(item.updated_at).toLocaleString('es-ES', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </Card>

    </div >
  )
}

export default DetailTicketSupport
