import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, Table } from 'reactstrap'
import ModalCancelarTicketSupport from './modalTicketSupport/modalCancelarTicketSupport';
import ModalAddNewTicket from './modalTicketSupport/modalAddNewTicket';
import { deleteTicketSupport, getTicketsSupport } from '../../services/ordenes';
import { getCurrentUser } from '../../helpers/Utils';
import { setPriority } from 'os';

function TicketSuport({ closemodalAndOpenOtherModal, setIdTicket, setPriorityTicket, setStatusTicket }) {

  const [modalCancelTicketSupport, setModalCancelarTicket] = useState(false);
  const [modalAddNewTicket, setModalAddNewTicket] = useState(false);

  const [detailTicketSupport, setDetailTicketSupport] = useState([]);

  const [idTicketRemove, setIdTicketRemove] = useState('');

  const currenUser = getCurrentUser();
  const token = currenUser.token;

  const data = [
    {
      tema: 'Problema con el sitio web',
      fecha: '2023-02-09  9:30 PM',
      estatus: 'Pediente',
      tipo: '0'
    }
    // Agrega más objetos de datos según tus necesidades
  ];

  const getAllTickets = () => {
    getTicketsSupport(token)
      .then((res) => {
        // console.log(res.data);
        setDetailTicketSupport(res.data);
      }).catch((err) => console.log(err));
  }

  const closeModalCancelTicketSupport = () => {
    setModalCancelarTicket(false);
  }

  const closeModalAddTicketSupport = () => {
    setModalAddNewTicket(false);
  }

  const sendIdTicket = (idTicket, priority, status) => {
    setPriorityTicket(priority);
    setStatusTicket(status);
    setIdTicket(idTicket);
    setIdTicketRemove(idTicket);
  }

  const refreshTickets = () => {
    getAllTickets();
  }

  useEffect(() => {
    if (token) {
      getAllTickets();
    }
  }, []);
  return (
    <>


      <div className='supportTicket'>
        <div className="tablaDeSoporte">
          <Table>

            <thead>
              <tr>
                <th>Tema</th>
                <th>Fecha de creación</th>
                <th>Estatus</th>
                <th>Tipo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {detailTicketSupport && detailTicketSupport.map((item, index) => (
                <tr key={index}>
                  <td style={{ color: '#FC5241' }}>{item.subject}</td>
                  <td>{new Date(item.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }).replace(/\//g, '-')}</td>
                  <td>{item.status}</td>
                  <td>{item.type}</td>
                  <td>
                    <div className="opcionesDetallePedido">
                      <a href="#" className=" btn btnVerDetallesPedido" onClick={(e) => {e.preventDefault(); closemodalAndOpenOtherModal(); sendIdTicket(item.id); setPriorityTicket(item.priority); setStatusTicket(item.status) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                        Ver
                      </a>
                      <a href="#" className=" btn btnCancelarPedido" onClick={(e) => {e.preventDefault();setModalCancelarTicket(true)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg>
                        Cancelar
                      </a>
                    </div>
                    <div className="opcionesDetallePedidoResponsive">
                      <a href="#" className=" btn btnVerDetallesPedido" onClick={(e) => {e.preventDefault(); closemodalAndOpenOtherModal(); sendIdTicket(item.id); setPriorityTicket(item.priority); setStatusTicket(item.status) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>

                      </a>
                      <a href="#" className=" btn btnCancelarPedido" onClick={(e) => {e.preventDefault(); setModalCancelarTicket(true); sendIdTicket(item.id)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg>

                      </a>
                    </div>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="opcionTicketSupportAddNew">
        <a href="#" onClick={(e) => {e.preventDefault(); setModalAddNewTicket(true)}}>Añadir nuevo ticket</a>
      </div>
      {/* Modal de cancelar ticket de soporte */}
      <Modal
        className="modal-dialog-centered modal-sm"
        toggle={() => closeModalCancelTicketSupport()}
        isOpen={modalCancelTicketSupport}
      >
        <ModalBody>
          <ModalCancelarTicketSupport idTicket={idTicketRemove} closeModalCancelarTicket={()=>setModalCancelarTicket(false)} getAllTickets={getAllTickets}/>
        </ModalBody>
      </Modal>
      {/* Modal add nuevo ticket */}
      <Modal
        className="modal-dialog-centered modal-sm"
        toggle={() => closeModalAddTicketSupport()}
        isOpen={modalAddNewTicket}
      >
        <ModalBody>
          <ModalAddNewTicket closeModalNewTicket={closeModalAddTicketSupport} refreshTickets={refreshTickets} />
        </ModalBody>
      </Modal>
    </>
  )
}

export default TicketSuport
