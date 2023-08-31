import React, { useEffect, useState } from "react";
import contactImg from '../assets/contact.png';
import { addContact } from "../services/contact";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import './contactUsComponent.css';


const ContactacUsComponent = () => {

  const MySwal = withReactContent(Swal);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const limpiarCampos = () => {
    setName('');
    setEmail('');
    setMobileNumber('');
    setMessage('');
    setSubject('');
  };

  const onSubmit = (data) => {
    console.log(data);
    addContact(data)
      .then((res) => {
        console.log("registro exitoso en el formulario de contacto");
        MySwal.fire({
          icon: 'success',
          title: '¡Mensaje recibido!',
          confirmButtonColor: '#FC5241',
          confirmButtonText: 'Aceptar',
          html: (
            <div>
              ¡Hemos recibido tu mensaje <strong>{name}</strong> y lo responderemos a la mayor brevedad posible!
            </div>
          ),
          
        });


      }).catch((err) => console.log(err));
  }

  const handleSubmitContacPerson = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      email: email,
      mobile_number: mobileNumber,
      message: message,
      subject: subject,

    };
    onSubmit(data);
    limpiarCampos();

  }

  return (
    <>
      <div className="container rtl" style={{ textAlign: 'left' }}>
        <div className="row no-gutters">
          <div className="col-lg-6 iframe-full-height-wrap ">
            <img src={contactImg} alt="" width={'100%'} />
          </div>
          <div className="col-lg-6 for-send-message px-4 px-xl-5  box-shadow-sm">
            <h2 className="h4 mb-4 text-center"
              style={{ color: '#030303', fontWeight: 600 }}>Envíanos un mensaje</h2>
            <form onSubmit={handleSubmitContacPerson}>
              <input type="hidden" name="_token" value="IYyYhfeCMy810oDSGsdKiIgkGA79ArFDEr7iBjba" />                        <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label >Tu nombre</label>
                    <input className="form-control name" value={name} type="text" onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />

                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="cf-email">Correo electrónico</label>
                    <input className="form-control email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="johndoe@email.com" required />

                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="cf-phone">Tu celular</label>
                    <input className="form-control mobile_number" type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Número de contacto" required />

                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="cf-subject">Asunto:</label>
                    <input className="form-control subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Título corto" required />

                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label for="cf-message">Mensaje</label>
                    <textarea className="form-control message" value={message} onChange={(e) => setMessage(e.target.value)} rows="6" required></textarea>
                  </div>
                </div>
              </div>
              <div className=" " style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button style={{ backgroundColor: '#FC5241', border: 'none', borderRadius: '32px', width: '300px', color: 'white' }} type="submit" id="submit">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactacUsComponent;
