import React, { useState } from 'react'
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { Toaster } from 'react-hot-toast'
import { TailSpin } from 'react-loader-spinner';
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import TermsAndConditions from './TermsAndConditions';

const RegisterCode = () => {

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showInputEmail, setShowInputEmail] = useState(true);
  const [showInputCode, setShowInputCode] = useState(false);

  const toggleSecondModal = () => {
    setSecondModalOpen(!secondModalOpen);
  };

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleChangueEmail = () => {
    setShowInputEmail(false);
    setShowInputCode(true);
  }

  const validateLogin = () => {

  }

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmitPersonaLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    handleChangueEmail();
    // onSubmit(data);

    // limpiarCampos();
  };

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <Row>
        <Col>
          <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: 'center'
              }}
            >
              <h5 style={{ color: "#fc5241" }}>Registrate por código</h5>
              {showInputEmail && (
                <p>Ingresa tú email para enviarte un código para terminar el registro</p>
              )}
              {showInputCode && (
                <p>Ingresa el código que hemos enviado a tú correo y crea tu contraseña</p>
              )}
            </div>
            <Form onSubmit={handleSubmitPersonaLogin}>
              <FormGroup controlId="formBasicEmail">
                <InputGroup style={{ borderRadius: "50px" }}>
                  {showInputEmail && (
                    <Input
                      type="email"
                      style={{
                        borderRadius: "50px",
                      }}
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}
                </InputGroup>
              </FormGroup>
              {showInputCode && (
                <>
                  <FormGroup controlId="formBasicEmail">
                    <InputGroup style={{ borderRadius: "50px" }}>
                      <Input
                        type="text"
                        style={{
                          borderRadius: "50px",
                        }}
                        placeholder="Código"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup controlId="formBasicEmail">
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

                  <FormGroup controlId="formBasicEmail">
                    <InputGroup style={{ borderRadius: "50px" }}>
                      <Input
                        style={{
                          borderTopLeftRadius: "50px",
                          borderBottomLeftRadius: "50px",
                        }}
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                </>

              )}
              {showInputEmail && (
                <Button
                  type='submit'
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: "#fc5241",
                    borderColor: "#fc5241",
                    color: "white",
                    borderRadius: "50px",
                    width: '100%',
                    alignSelf: 'center',
                    marginTop: '2px'
                  }}

                >
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
                  Enviar código de acceso
                </Button>
              )}
              {showInputCode && (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                    <span style={{ marginRight: "10px", alignSelf: 'center'}}>Aceptar términos y condiciones</span>
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
                    onClick={validateLogin}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      backgroundColor: "#fc5241",
                      borderColor: "#fc5241",
                      color: "white",
                      borderRadius: "50px",
                      width: '100%',
                      alignSelf: 'center',
                      marginTop: '2px',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}
                    disabled={!termsAccepted}
                  >
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
                    Registrarse
                  </Button>
                </div>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default RegisterCode
