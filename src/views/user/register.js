/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Col, Row, Button, FormGroup, Form, Input, InputGroupText,InputGroup } from "reactstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { ReactComponent as UserIcon } from "../../assets/egoi_icons/user.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import es from "react-phone-input-2/lang/es.json";
import "../user/input-con-icono.css";

// import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmitPersona = (event) => {
    console.log(event);
    event.preventDefault();

    event.preventDefault(); // Evita el envío del formulario

    // Validar que los campos no estén vacíos
    if (!name || !lastName || !email || !cellphone) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, complete todos los campos. ",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    // Validar que el nombre y apellido solo contengan letras y espacios
    const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(name) || !nameRegex.test(lastName)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese un nombre y apellido válido. Solo se permiten letras y espacios.",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    // Validar que el correo electrónico tenga un formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese un correo electrónico válido. debe contener @ y .",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    // Validar que el número de celular tenga un formato válido
    const cellphoneRegex = /^[0-9]{10}$/;
    if (!cellphoneRegex.test(cellphone)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese un número de celular válido. debe contener 10 digitos.",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    //   try{

    //  addDoc(usersRef, { name, lastName, email, cellphone, tipo });
    //  Swal.fire({
    //   icon: 'success',
    //   title: 'Felicitaciones!',
    //   text: 'Usuario registrado Correctamente!',
    //   confirmButtonColor: '#0d6efd',
    // })
    //   }catch(error){
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'Algo salio mal!',
    //       footer: 'Intenta de nuevo'
    //     })
    //   }
    setShow(!show);
    limpiarCampos();
  };

 

  const limpiarCampos = () => {
    setName("");
    setLastName("");
    setEmail("");
    setCellphone("");
  };

  return (
    <>
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
              <h5 style={{ color: "#fc5241" }}>Registro</h5>
            </div>

            <Form onSubmit={handleSubmitPersona}>

              <FormGroup controlId="formBasicName">
                  <Input  addon={true}
                   className="form-control"
                    style={{
                      borderRadius: "50px",
                    }}
                    placeholder="Nombre"
                  />
              
              </FormGroup>

              <FormGroup controlId="formBasicLastName">
                  <Input
                    style={{
                      borderRadius: "50px",
                    }}
                    placeholder="Apellido"
                  />
              </FormGroup>

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

              <FormGroup controlId="formBasicCellphone">
                <PhoneInput
                  localization={es}
                  country={"co"}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  inputStyle={{
                    width: "100%",
                    height: "10px",
                    borderRadius: "50px",
                    outline: "none",
                    ":focus": {
                      borderRadius: "50px",
                    },
                  }}
                />
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

              <FormGroup controlId="formBasicConfirmPassword">
                <InputGroup style={{ borderRadius: "50px" }}>
                  <Input
                    style={{
                      borderTopLeftRadius: "50px",
                      borderBottomLeftRadius: "50px",
                    }}
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirmar contraseña"
                  />
                  <InputGroupText
                    style={{
                      cursor: "pointer",
                      borderTopRightRadius: "50px",
                      borderBottomRightRadius: "50px",

                      width: "45px",
                      borderRight: "none !important",
                      backgroundColor: "white",
                    }}
                    onClick={toggleShowPassword}
                  >
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
                  Registrarme
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
                  Ya tengo cuenta
                </Button>
              </div>

            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Register;
