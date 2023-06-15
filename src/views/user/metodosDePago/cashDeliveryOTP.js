import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '../../../services/firebase.config';
import Swal from 'sweetalert2';
import { placeOrder } from '../../../services/metodosDePago';

function CashDeliveryOTP({ phone, closeModalOTP, addressId, cupon, descriptionOrder }) {
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [phoneUser, setPhoneUser] = useState('');

  const handleOTPChange = (value) => {
    setOTP(value);
  };

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
  };

  const onSignUp = () => {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const formattedPhone = '+' + phoneUser;
    signInWithPhoneNumber(auth, formattedPhone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
        toast.success('Código enviado con éxito!');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // Error; SMS not sent
        // ...
      });
  };

  const makePlaceOrder = () => {
    placeOrder(addressId, cupon, descriptionOrder)
      .then((res) => {
        console.log('Orden enviada por OTP');
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setLoading(false);
        makePlaceOrder();
        closeModalOTP();
        Swal.fire('¡Tu compra fue verificada!', '¡Gracias por comprar con nosotros!', 'success');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡El código parece incorrecto!',
        });
      });
  };

  useEffect(() => {
    if (phone) {
      console.log(phone);
      setPhoneUser(phone);
    }

    let cleanedCoupon = 0;
    if (cupon && cupon !== '') {
      cleanedCoupon = cupon;
    }

    if (addressId || cupon || descriptionOrder) {
      console.log('Direccion id', addressId);
      console.log('Cupon', cleanedCoupon);
      console.log('Descripcion', descriptionOrder);
    }
  }, [phone, cupon, addressId, descriptionOrder]);

  return (
    <>
      <Row>
        <Col>
          <div style={{ paddingLeft: '2%', paddingRight: '2%', marginBottom: '10px' }}>
            <div id="recaptcha-container"></div>
            <Toaster toastOptions={{ duration: 2000 }} position="top-right" />
            <h6>Ingresa tu número de teléfono para continuar</h6>
            <PhoneInput
              country={'mx'}
              onlyCountries={['mx']}
              value={phoneUser}
              onChange={(phone) => setPhoneUser(phone)}
              containerStyle={{ marginBottom: '15px' }}
            />
            <button
              className="btn btn-primary"
              style={{ marginRight: '10px' }}
              onClick={onSignUp}
              disabled={loading}
            >
              {loading ? 'Enviando código...' : 'Enviar Código'}
            </button>
            <button className="btn btn-secondary" onClick={closeModalOTP}>
              Cerrar
            </button>
          </div>
        </Col>
      </Row>
      {showOtp && (
        <Row>
          <Col>
            <div style={{ paddingLeft: '2%', paddingRight: '2%' }}>
              <h6>Ingresa el código de verificación</h6>
              <OtpInput
                value={otp}
                onChange={handleOTPChange}
                numInputs={6}
                separator={<span>-</span>}
                inputStyle={{ width: '40px', height: '45px', marginRight: '10px' }}
                shouldAutoFocus={true}
                isInputNum={true}
              />
              <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={onOTPVerify} disabled={loading}>
                {loading ? 'Verificando código...' : 'Verificar'}
              </button>
              <button className="btn btn-secondary" onClick={closeModalOTP}>
                Cerrar
              </button>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}

export default CashDeliveryOTP;
