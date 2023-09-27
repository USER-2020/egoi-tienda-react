import React, { useEffect, useState } from 'react';
import { Card, Input } from 'reactstrap';
import { addMessage, allChatsSellers, getSellerChatByStoreId } from '../../services/ordenes';
import { getCurrentUser } from './../../helpers/Utils';
import './chat_withSeller.css';

function ChatWithSeller() {
  const currentUser = getCurrentUser();
  const token = currentUser.token;

  const [dataChats, setDataChats] = useState([]);
  const [dataChatById, setDataChatById] = useState([]);
  const [showChat, setShowChat] = useState(false); // Variable de estado para controlar la visibilidad del chat
  const [sendMessage, setSendMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const [activeIndex, setActiveIndex] = useState(null);

  const baseUrlImage = "https://egoi.xyz/storage/app/public/shop/";

  const getAllChats = () => {
    allChatsSellers(token)
      .then((res) => {
        // console.log(res.data);
        // console.log('Datos de tienda', res.data.unique_shops[0].shop);
        setDataChats(res.data);
      })
      .catch((err) => console.log(err));
  };

  const showChatById = (idChat) => {
    // console.log('Esta es el id del chat', idChat);
    getSellerChatByStoreId(token, idChat)
      .then((res) => {
        // console.log("Desde el id del chat", res.data);
        setDataChatById(res.data);
        setShowChat(true); // Mostrar el chat cuando se hace clic en un elemento de chat
      })
      .catch((err) => console.log(err));
  };

  const sendMessageToSeller = (idSeller, idShop) => {
    // console.log(idSeller);
    // console.log(idShop);
    addMessage(token, idSeller, idShop, sendMessage)
      .then((res) => {
        // console.log(res.data);
        setStatusMessage(res.data);
        setSendMessage(''); // Borrar el mensaje del input después de enviarlo
        showChatById(idShop); // Actualizar el chat después de enviar el mensaje
      })
      .catch((errr) => console.log(errr));
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
    // Resto de la lógica...
  };

  useEffect(() => {
    if (token) {
      getAllChats();
    }

    if (statusMessage === 'Sent') {
      // showChatById(dataChatById); // Comentado ya que no es necesario llamar a la función aquí
    }

    // console.log(dataChats);
  }, [dataChatById, statusMessage]);

  return (
    <>
      <div className="listContactsProveedores">

        <Card>

          {dataChats.unique_shops && dataChats.unique_shops.length > 0 ? (
            <>
              <h2>Chats</h2>
              <ul>
                {dataChats.unique_shops &&
                  dataChats.unique_shops.map((item, index) => (
                    <li key={index}
                      className={index === activeIndex ? 'active' : ''}
                      onClick={() => handleItemClick(index)}>
                      <img src={baseUrlImage + item.shop.image} alt={item.shop.image} width={30} style={{ borderRadius: '10px' }} />
                      <a href="#" onClick={(e) => { e.preventDefault(); showChatById(item.shop.id) }}>
                        {item.shop.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </>
          ) : (
            <>

              <div className='noChatListado'>
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#FC5241" className="bi bi-chat-left-dots" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <div className="noChatListadoParrafo">
                  <p>No tienes ninguna conversación pendiente
                  </p>
                </div>
              </div>


            </>

          )}

        </Card>

      </div>

      {showChat && Array.isArray(dataChatById) && (
        <div className="chat">
          <Card>
            <div className="headerChat">Chat</div>
            <div className="contenedorMensajes">
              {dataChatById.map((item, index) => (
                <div className="mensajeItem" key={index}>
                  <div className="message">
                    <p>{item.message}</p>
                  </div>
                  <div className="marcaTiempo">
                    <p>{new Date(item.created_at).toLocaleString('es-ES', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="sendMessage">
              {dataChats.unique_shops &&
                dataChats.unique_shops.map((item, index) => (
                  <div key={index} style={{ display: 'flex', width: '100%' }}>
                    <Input
                      style={{ width: '90%', border: 'none', height: '100%' }}
                      placeholder="Escribir mensaje"
                      value={sendMessage}
                      onChange={(e) => setSendMessage(e.target.value)}
                    />
                    <a
                      href="#"
                      style={{ alignSelf: 'center', justifyContent: 'center', padding: '5px' }}
                      onClick={() => sendMessageToSeller(item.seller_id, item.shop_id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#74737B" className="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                      </svg>
                    </a>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

export default ChatWithSeller;
