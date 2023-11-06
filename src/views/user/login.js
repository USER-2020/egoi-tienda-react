/* eslint-disable no-unused-vars */
import "../../styles/login.css";
import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Input, Button, InputGroup, InputGroupText } from 'reactstrap';
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
// import { useGoogleOneTapLogin } from '@react-oauth/google';

import { setCurrentUser } from "../../helpers/Utils";
import log from '../../services/login';
import LoginGoogle from "../../components/extraLogin/loginGoogle.tsx";

const Login = ({ closeModalLogin, handleLogin, closeModalRegistro, handleChangeFormLogin, handleCodeLogin }) => {
  const setUserActivacion = (data) => {
    const item = {
      token: data.token,
      email: email,
    };
    setCurrentUser(item);
    // put(loginUserSuccess(item));
  };

  const onSubmit = (data) => {
    setLoading(true);
    log(data, window.location.origin.toString())
      .then((res) => {
        // Enviando un evento de inicio de sesión a Google Analytics
        /* eslint-disable */
        // Tu código aquí
        gtag("event", "login", {
          method: "Google"
        });
        /* eslint-enable */

        setUserActivacion(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: 'Has iniciado sesión correctamente',
          confirmButtonColor: '#fc5241',
        });
        setLoading(false);
        closeModalLogin();
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

  const handleSubmitPersonaLogin = (event) => {
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

  // useGoogleOneTapLogin({
  //   onSuccess: credentialResponse => {
  //     console.log(credentialResponse);
  //   },
  //   onError: () => {
  //     console.log('Login Failed');
  //   },
  // });

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
            <h5 style={{ color: "#fc5241" }}>Iniciar sesión</h5>
          </div>

          <Form onSubmit={handleSubmitPersonaLogin}>
            <FormGroup controlId="formBasicEmail">
              <InputGroup style={{ borderRadius: "50px" }}>
                <Input
                  type="email"
                  style={{
                    borderRadius: "50px",
                  }}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroupText
                  style={{
                    borderTopRightRadius: "50px",
                    borderBottomRightRadius: "50px",
                    width: "45px",
                    backgroundColor: "white",
                  }}
                  onClick={toggleShowPassword}
                >
                  {" "}
                  {showPassword ? <EyeSlash /> : <Eye />}
                </InputGroupText>
              </InputGroup>
            </FormGroup>

            <div style={{ width: '100%', justifyContent: 'center', marginBottom: '10px', display: 'flex' }}>
              <a href="/recovery" style={{ textAlign: 'center', alignSelf: 'center', justifyContent: 'center', textDecoration: 'none', color: 'gray' }}>¿Olvidaste tu contraseña?</a>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button
                style={{
                  backgroundColor: "#fc5241",
                  borderColor: "#fc5241",
                  borderRadius: "50px",
                  width: '285px',
                  alignSelf: 'center',
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
                  width: '285px',
                  alignSelf: 'center',
                  marginTop: '-15px'
                }}
                className="text-nowrap"
                onClick={() => {
                  closeModalLogin();
                  handleChangeFormLogin();
                }}
              >
                No tengo cuenta, deseo registrarme
              </Button>
            </div>
          </Form>
        </div>
        <div style={{ width: '100%', marginTop: "15px", display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <LoginGoogle />
          {/* <Button style={{ width: '285px', borderRadius: '50px', display: 'flex', justifyContent: 'space-around', backgroundColor: 'transparent', color:'black' }}>Inicia sesión con Google</Button> */}
          <Button
            style={{ width: '285px', borderRadius: '50px', display: 'flex', justifyContent: 'space-around', backgroundColor: 'transparent', color: 'black' }}
            onClick={() => { handleCodeLogin(); closeModalLogin() }}
          >Inicia sesión por código
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
