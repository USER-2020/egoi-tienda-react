/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Row, Card, CardTitle, CardBody, Col, Form, FormGroup, Input, Button, InputGroup, InputGroupText } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";



import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';

import Registro from '../../components/formularios/registro';

import log from '../../services/login';



const Login = ({ closeModal, handleLogin }) => {
  const onSubmit = (data) => {
    setLoading(true);
    log(data, window.location.origin.toString())
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: 'Has iniciado sesión correctamente',
          confirmButtonColor: '#fc5241',
        });
        setLoading(false);
        closeModal();
        handleLogin();
      })
      .catch(() => {
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: 'Usuario y/o contraseña incorrectos',
          confirmButtonColor: '#fc5241',
        });
        setLoading(false);
      });
    reset();
   

  };


  const {
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  
  const limpiarCampos = () => {

    setEmail("");
    setPassword("");
  };


  const handleSubmitPersona = (event) => {
    console.log(event);
    event.preventDefault();  

    const data = {
      email: event.target[0].value,
      password: event.target[1].value,
    };
    onSubmit(data);


    limpiarCampos();



  };
  
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <Row>
    <Col>
      <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h5 style={{ color: "#fc5241" }}>Iniciar sesíon</h5>
        </div>

        <Form onSubmit={handleSubmitPersona}>


          <FormGroup controlId="formBasicEmail">
            <InputGroup style={{ borderRadius: "50px" }}>
              <Input
                type="email"
                style={{
                  borderRadius: "50px",
                }}
                placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup controlId="formBasicPassword">
            <InputGroup style={{ borderRadius: "50px" }}>
              <Input
                style={{
                  
                  borderTopLeftRadius: "50px",
                  borderBottomLeftRadius: "50px",
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroupText
                style={{
                  borderTopRightRadius: "50px",
                  borderBottomRightRadius: "50px",

                  width: "45px",
                  borderRight: "none !important",
                  backgroundColor: "white",
                }}
                onClick={toggleShowPassword}
              >
                {" "}
                {showPassword ? <EyeSlash /> : <Eye />}
              </InputGroupText>
            </InputGroup>
          </FormGroup>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              style={{
                backgroundColor: "#fc5241",
                borderColor: "#fc5241",
                borderRadius: "50px",
              }}
              type="submit"
            >
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </Button>
            <br />
            <Button
              style={{
                backgroundColor: "white",
                borderColor: "#fc5241",
                color: "#fc5241",
                borderRadius: "50px",
              }}
              onClick={() => limpiarCampos()}
            >
              No tengo cuenta, deseo registrarme
            </Button>
          </div>

        </Form>
      </div>
    </Col>
  </Row>
  );
};

export default Login;
