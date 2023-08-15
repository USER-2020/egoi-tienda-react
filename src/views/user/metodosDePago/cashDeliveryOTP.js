import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import VerificationInput from "react-verification-input";
import './cash_delivery.css';
import OtpInput from 'react-otp-input'; // Cambio de nombre aquí
import { Loader, TailSpin } from 'react-loader-spinner';
import PhoneInput from 'react-phone-input-2';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '../../../services/firebase.config';
import Swal from 'sweetalert2';
import { placeOrder } from '../../../services/metodosDePago';
import { getCurrentUser } from './../../../helpers/Utils';


function CashDeliveryOTP({ phone, closeModalOTP, addressId, cupon, descriptionOrder,setModalPurchaseSuccess }) {
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [phoneUser, setPhoneUser] = useState("");

  const handleOTPChange = (value) => {
    setOTP(value);
  };

  /* Funcion de recatcahp */


  const currenUser = getCurrentUser();
  const token = currenUser.token;

  const onCaptchaVerify = () => {
    if (!window.RecaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignUp();

        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      }, auth);
    }

  }

  const onSignUp = () => {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const formathPhone = "+" + phoneUser;
    signInWithPhoneNumber(auth, formathPhone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
        console.log(formathPhone);
        toast.success('Código enviado con éxito!');

        // ...
      }).catch((error) => {
        console.log(error);
        setLoading(false);
        // Error; SMS not sent
        // ...
      });

  }

  const makePlaceOrder = () => {
    let cuponLimpio = 0;
    if (cupon && cupon !== "") {
      cuponLimpio = cupon;
    }
    console.log(cuponLimpio);
    placeOrder(addressId, cuponLimpio, descriptionOrder, token)
      .then((res) => {
        console.log("Orden enviada por OTP");
        console.log(res);
        
      })
      .catch((err) => console.log(err));
  }


  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult.confirm(otp).then(async (res) => {
      console.log(res);
      setLoading(false);
      makePlaceOrder();
      closeModalOTP();
      setModalPurchaseSuccess();
      
    }).catch((error) => {
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡El codigo parece incorrecto!'

      })

    })


  }


  useEffect(() => {
    if (phone) {

      console.log(phone);
      setPhoneUser(phone);
    }

    let cuponLimpio = 0;
    if (cupon && cupon !== "") {
      cuponLimpio = cupon;
    }
    if (addressId || cupon || descriptionOrder) {
      console.log("Direccion id", addressId);
      console.log("Cupon", cuponLimpio);
      console.log("Descripcion", descriptionOrder);
    }

  })

  return (
    <>
      <Row>
        <Col>
          <div style={{ paddingLeft: "2%", paddingRight: "2%", marginBottom: '10px' }}>
            <div id="recaptcha-container"></div>
            <Toaster toastOptions={{ duration: 4000 }} />
            {showOtp ? (
              <div
                className='encabezadoOTP'
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: 'column'
                }}
              >
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.2002 11.9992C4.2002 7.6914 7.69237 4.19922 12.0002 4.19922C16.308 4.19922 19.8002 7.6914 19.8002 11.9992V17.1698C19.8002 17.5471 19.8002 17.8725 19.7744 18.1387C19.7471 18.4207 19.6864 18.6989 19.5243 18.9569C19.3804 19.1858 19.1868 19.3795 18.9579 19.5233C18.6999 19.6854 18.4217 19.7461 18.1397 19.7734C17.8734 19.7992 17.5481 19.7992 17.1708 19.7992H12.0002C7.69237 19.7992 4.2002 16.307 4.2002 11.9992ZM12.0002 5.39922C8.35512 5.39922 5.4002 8.35414 5.4002 11.9992C5.4002 15.6443 8.35512 18.5992 12.0002 18.5992H17.1431C17.5559 18.5992 17.8225 18.5986 18.0239 18.579C18.216 18.5604 18.2846 18.5291 18.3194 18.5073C18.3957 18.4593 18.4603 18.3948 18.5082 18.3184C18.5301 18.2837 18.5614 18.215 18.58 18.0229C18.5995 17.8215 18.6002 17.5549 18.6002 17.1421V11.9992C18.6002 8.35414 15.6453 5.39922 12.0002 5.39922ZM7.8002 10.7992C7.8002 10.4678 8.06882 10.1992 8.4002 10.1992H12.6002C12.9316 10.1992 13.2002 10.4678 13.2002 10.7992C13.2002 11.1306 12.9316 11.3992 12.6002 11.3992H8.4002C8.06882 11.3992 7.8002 11.1306 7.8002 10.7992ZM7.8002 13.1992C7.8002 12.8678 8.06882 12.5992 8.4002 12.5992H15.6002C15.9316 12.5992 16.2002 12.8678 16.2002 13.1992C16.2002 13.5306 15.9316 13.7992 15.6002 13.7992H8.4002C8.06882 13.7992 7.8002 13.5306 7.8002 13.1992Z" fill="#171523" />
                </svg>
                <p style={{ color: "#74737B", marginBottom: "20px", textAlign: 'center' }}>Por favor ingresa el código que te hemos enviado para confirmar tu pedido</p>

              </div>
            ) : (
              <div
                className='encabezadoOTP'
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: 'column'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-exclamation-diamond" viewBox="0 0 16 16">
                  <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                </svg>
                <p style={{ color: "#74737B", marginBottom: "20px", textAlign: 'center' }}>¡En unos segundos envíaremos un código de verificación de tu compra!</p>

              </div>
            )}




            <div className="resendAndSubmitOTP" style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: '5px' }}>
              {showOtp ? (

                <>
                  <OtpInput
                    value={otp}
                    onChange={handleOTPChange}
                    numInputs={6}
                    renderSeparator={<span> </span>}
                    renderInput={(props, index) => (
                      <input {...props} style={{ width: '100%', marginRight: '10px', borderRadius: '12px', height: '40px', textAlign: 'center', borderColor: 'rgba(162, 161, 167, 0.16)' }} maxLength={1} key={index} />
                    )}
                  />
                  <p><a href='#'>Reenviar mensaje</a></p>
                  <a href='#' className="verficationOTP" onClick={onOTPVerify}>
                    {loading &&
                      <TailSpin
                        height="20"
                        width="20"
                        color="white"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{ marginRight: '20px' }}
                        wrapperClass=""
                        visible={true}
                      />
                    }
                    Validar
                  </a>
                </>
              ) : (
                <>
                  <PhoneInput country={"co"} value={phoneUser} onChange={setPhoneUser} inputStyle={{ width: '100%' }} />
                  <a href="#" onClick={() => onSignUp()} className="verficationOTP">
                    {loading &&
                      <TailSpin
                        height="20"
                        width="20"
                        color="white"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{ marginRight: '20px' }}
                        wrapperClass=""
                        visible={true}
                      />
                    }
                    Enviar código vía SMS
                  </a>
                </>
              )}



            </div>
          </div>
        </Col>
      </Row >
    </>

  )
}

export default CashDeliveryOTP
