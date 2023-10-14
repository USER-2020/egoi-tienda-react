/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Eye, EyeSlash, X } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { ReactComponent as UserIcon } from "../../assets/egoi_icons/user.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import es from "react-phone-input-2/lang/es.json";
import "../user/input-con-icono.css";
import { useForm } from 'react-hook-form';
import Registro from '../../services/registro';
import TermsAndConditions from "./TermsAndConditions";
import Login from "./login.js";

const Register = ({ closeModalRegistro, handleChangeFormRegister }) => {
  const {
    reset,
    formState: { errors },
  } = useForm();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [vista, setVista] = useState('formulario');
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [modalViewLogin, setModalViewLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSecondModal = () => {
    setSecondModalOpen(!secondModalOpen);
  };

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = (data) => {
    setLoading(true);
    Registro(data, window.location.origin.toString())
      .then(() => {
        // Enviando un evento de inicio de sesión a Google Analytics
        /* eslint-disable */
        // Tu código aquí
        gtag("event", "sign_up", {
          method: "Google"
        });
        /* eslint-enable */

        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El registro ha sido completado exitosamente.',
          confirmButtonColor: '#0d6efd',
        });
        setLoading(false);
        closeModalRegistro();
      })
      .catch((error) => {
        if (error.response.data === 'username already exists') {
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '¡El usuario ya está creado, revísalo!',
          confirmButtonColor: '#dc3545',
        });
        setLoading(false);
      });
    reset();
  };

  const handleSubmitPersona = (event) => {
    event.preventDefault();

    // Validar que el nombre y apellido solo contengan letras y espacios
    const nameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
    if (!nameRegex.test(name) || !nameRegex.test(lastName)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese un nombre y apellido válidos. Solo se permiten letras y espacios.",
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
        text: "Por favor, ingrese un correo electrónico válido. Debe contener @ y .",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    if (!name || !lastName || !email || !phoneNumber) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, complete todos los campos. ",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    // Validar que la contraseña tenga al menos 8 caracteres
    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese una contraseña de al menos 8 caracteres.",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    // Validar que la contraseña y la confirmación de la contraseña sean iguales
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden.",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    const data = {};

    data.f_name = name;
    data.l_name = lastName;
    data.email = email;
    data.password = password;
    data.phone = phoneNumber;

    onSubmit(data);
    limpiarCampos();
  };

  const limpiarCampos = () => {
    setName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhoneNumber("");
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
                <Input addon={true}
                  name="name"
                  className="form-control"
                  style={{
                    borderRadius: "50px",
                  }}
                  placeholder="Nombre"
                  value={name} onChange={(event) => setName(event.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="formBasicLastName">
                <Input
                  style={{
                    borderRadius: "50px",
                  }}
                  placeholder="Apellido"
                  value={lastName} onChange={(event) => setLastName(event.target.value)}
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
                    value={email} onChange={(event) => setEmail(event.target.value)}
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
                    value={password} onChange={(event) => setPassword(event.target.value)}
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
                    value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
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
                <div>
                  <Input
                    className="custom-input"
                    cssModule={{ color: "red" }}
                    type="checkbox"
                    name="terms"
                    id="terms"
                    value="true"
                    checked={termsAccepted}
                    onClick={!termsAccepted ? toggleSecondModal : null}
                    onChange={handleCheckboxChange}
                    style={{ marginRight: "10px", borderRadius: "50%", border: "1px solid black" }}
                  />
                  <span style={{ marginRight: "10px" }}>Aceptar términos y condiciones</span>
                </div>
                <Modal size='xl' isOpen={secondModalOpen} >
                  <ModalHeader style={{ color: '#fc5241' }}>Términos y condiciones</ModalHeader>
                  <ModalBody>
                    <TermsAndConditions />
                  </ModalBody>
                  <ModalFooter style={{ display: "flex" }}>
                    <Button
                      style={{
                        backgroundColor: "white",
                        borderColor: "#fc5241",
                        color: "#fc5241",
                        borderRadius: "50px",
                      }}
                      type="submit"
                      onClick={() => {
                        setTermsAccepted(false);
                        toggleSecondModal();
                      }}> Rechazar </Button>
                    <Button
                      style={{
                        backgroundColor: "#fc5241",
                        borderColor: "#fc5241",
                        borderRadius: "50px",
                      }}
                      type="submit"
                      onClick={() => {
                        setTermsAccepted(true);
                        toggleSecondModal();
                      }}> Aceptar </Button>
                  </ModalFooter>
                </Modal>
                <Button
                  style={{
                    backgroundColor: "#fc5241",
                    borderColor: "#fc5241",
                    borderRadius: "50px",
                    marginTop: "10px",
                    width: '285px',
                    alignSelf: 'center'
                  }}
                  type="submit"
                  disabled={!termsAccepted || loading}
                >
                  {loading ? 'Cargando...' : 'Registrarme'}
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
                  onClick={() => {
                    limpiarCampos();
                    closeModalRegistro();
                    handleChangeFormRegister();
                  }}
                  disabled={loading}
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
