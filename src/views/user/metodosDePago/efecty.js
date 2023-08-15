import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { placeOrder } from '../../../services/metodosDePago';
import { getCurrentUser } from '../../../helpers/Utils';

function EfectyModal({ totalAmount, closeEfectyModal, dataRef, addressId, descriptionOrder, cupon, setModalPurchaseSuccess }) {

  // const [transactionAmount, setTransactionAmount] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [emailCustom, setEmailCustom] = useState("");
  const [description, setDescription] = useState("");

  const currenUser = getCurrentUser();
  const token = currenUser.token;


  const makePlaceOrder = () => {
    let cuponLimpio = 0;
    if (cupon && cupon !== "") {
      cuponLimpio = cupon;
    }
    console.log(cuponLimpio);
    placeOrder(addressId, cuponLimpio, descriptionOrder, token)
    .then((res)=>{
      console.log("Orden enviada por Efecty");
      console.log(res);
      setModalPurchaseSuccess();
    })
    .catch((err)=>console.log(err));
  }
  const orderPlaceEfecty = () => {
    makePlaceOrder();
    closeEfectyModal();
  }

  useEffect(() => {
    let cuponLimpio = 0;
    if (cupon && cupon !== "") {
      cuponLimpio = cupon;
    }
    if (addressId || cupon || descriptionOrder) {
      console.log("Direccion id", addressId);
      console.log("Cupon", cuponLimpio);
      console.log("Descripcion", descriptionOrder);
      console.log(totalAmount);
    }
  }, []);

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
                flexDirection: "column",
                gap: "16px"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#089705" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
              </svg>
              <div style={{ gap: "0px", display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", marginBottom: "30px" }}>
                <h5 style={{ color: "#fc5241", fontSize: "20px", fontWeight: "400", display: "flex", justifyContent: 'center' }}>Pedido realizado con éxito</h5>
                <p style={{ margin: "0", display: "flex", justifyContent: 'center', color: "#74737B", fontWeight: "400", textAlign: 'center' }}>Haz tu pago en cualquier punto Efecty</p>
              </div>
            </div>
            <Card style={{ border: 'none' }}>

              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <div>
                  <h2 style={{ fontSize: "14px" }}>Referencia de Pago</h2>
                  <h5>{dataRef.id}</h5>
                </div>
                <div >
                  <h2 style={{ fontSize: "14px" }}>Total a pagar</h2>
                  <h5>{totalAmount}</h5>
                </div>
              </div>
              <div style={{ width: "100%", height: "48px", display: "flex", justifyContent: "center", backgroundColor: "#FC5241", borderRadius: "32px", marginTop: "20px" }}>
                <a href='#' style={{ display: "flex", alignSelf: "center", textDecoration: "none", color: "white", width: "100%", justifyContent: "center" }} onClick={orderPlaceEfecty}>Enviar copia</a>
              </div>

            </Card>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default EfectyModal;
