/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Row, Card, CardTitle, CardBody, Col, Form, FormGroup, Input, Button, InputGroup, InputGroupText } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Eye, EyeSlash } from "react-bootstrap-icons";

import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';

import Registro from '../../components/formularios/registro';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const limpiarCampos = () => {
    
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

        <Form >


          <FormGroup controlId="formBasicEmail">
            <InputGroup style={{ borderRadius: "50px" }}>
              <Input
                type="email"
                style={{
                  borderRadius: "50px",
                }}
                placeholder="Email"
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
              Iniciar sesión
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
const mapStateToProps = () => {};

export default (Login);
