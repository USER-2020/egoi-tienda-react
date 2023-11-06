import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, InputGroup, Row } from 'reactstrap'
import { codeLogin, validateEmail, verifyCodeLogin } from '../../services/extraLogin';
import toast, { Toaster } from 'react-hot-toast';
import { setCurrentUser } from '../../helpers/Utils';
import { addCartProductsOfLocalStorage } from '../../helpers/productsLocalStorage';
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';

const CodeLogin = ({ closeModalCodeLogin, handleLogin }) => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [showInputEmail, setShowInputEmail] = useState(true);
    const [showInputCode, setShowInputCode] = useState(false);

    const handleChangueEmail = (data) => {
        if (email !== '') {
            validateEmail(email).then((res) => {
                console.log("Email validation: ", res.data);
                if (res.data.status === 'ok') {
                    onSubmit(data);
                }
                if (res.data.status === 'error') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El correo que ingresaste no está registrado, intentalo de nuevo o registrate!',
                        confirmButtonColor: '#FC5241', // Set the desired color here
                        confirmButtonText: 'Ok', // Optionally change the button's text
                        // footer: '<a href="">Que significa esto?</a>'
                    });
                    setLoading(false);
                }
            })
        }
    }

    const onSubmit = (data) => {
        codeLogin(data)
            .then((res) => {
                console.log("res", res);
                setShowInputEmail(false);
                setShowInputCode(true);
                toast.success('Código enviado con éxito!');
                setLoading(false);
            }).catch((err) => console.log(err));
    }

    const validateLogin = () => {
        setLoading(true);
        verifyCodeLogin(email, code)
            .then((res) => {
                console.log("Este es el token desde la verificacion", res.data.token);
                const item = {
                    token: res.data.token,
                    email: email,
                }
                setCurrentUser(item);
                handleLogin();
                // addCartProductsOfLocalStorage();
                setLoading(false);
                closeModalCodeLogin();
                window.location.reload();

                // window.location.reload();
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Bienvenido',
                //     text: 'Has iniciado sesión correctamente',
                //     confirmButtonColor: '#fc5241',
                // });
            }).catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ha ocurrido algo, intentalo de nuevo, verifica que el código que ingresaste es correcto',
                    confirmButtonColor: '#FC5241', // Set the desired color here
                    confirmButtonText: 'Ok', // Optionally change the button's text
                    // footer: '<a href="">Que significa esto?</a>'
                });
                setLoading(false);
            });
    }

    const handleSubmitPersonaLogin = (event) => {
        event.preventDefault();
        setLoading(true);
        handleChangueEmail(email);
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
                            <h5 style={{ color: "#fc5241" }}>Iniciar sesión por código</h5>
                            {showInputEmail && (
                                <p>Ingresa tú email para verificar que si seas tú</p>
                            )}
                            {showInputCode && (
                                <p>Ingresa el código que hemos enviado a tú correo</p>
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
                                    {showInputCode && (
                                        <Input
                                            type="text"
                                            style={{
                                                borderRadius: "50px",
                                            }}
                                            placeholder="Código"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                    )}
                                </InputGroup>
                            </FormGroup>
                            {showInputEmail && (
                                <Button
                                    type='onSubmit'
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
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
                                <Button
                                    onClick={validateLogin}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
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
                                    Iniciar sesión
                                </Button>
                            )}
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default CodeLogin
