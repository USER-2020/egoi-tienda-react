import React, { useState } from 'react'
import { forgetPassword } from '../services/password';
import Swal from 'sweetalert2';

const PasswordRecoveryComponent = () => {
    const [email, setEmail] = useState("");

    const onSubmit = (data) => {
        console.log("entre al cambio de contrasenio , listo para enviar correo de verficacion");
        forgetPassword(email)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Hemos enviado el correo de verificación y actualización de contraseña',
                    text: 'Revisa tu bandeja de entrada',
                    confirmButtonColor: '#fc5241',
                });
                limpiarCampos();
            }).catch((err) => console.log(err));
    }

    const handleSubmitEmailRecovery = (event) => {
        event.preventDefault();

        const data = {
            email: email
        };
        onSubmit(data);

    }

    const limpiarCampos = () => {
        setEmail("");
    };
    return (
        <div class="container py-4 py-lg-5 my-4">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10">
                    <h2 class="h3 mb-4" style={{ fontSize: '40px' }}>¿Olvidaste tú contraseña?</h2>
                    <p class="font-size-md" style={{ fontSize: '20px' }}>Cambia tú contraseña en tres sencillos pasos. Esto te ayudará a mantener segura tú nueva contraseña.</p>
                    <ol class="list-unstyled font-size-md">
                        <li style={{ fontSize: '20px' }}><span
                            class="text-primary mr-2" style={{ fontSize: '20px' }}></span ><strong>1. </strong> Introduce tú dirección de correo electrónico.
                        </li>
                        <li style={{ fontSize: '20px' }}><span
                            class="text-primary mr-2" style={{ fontSize: '20px' }}></span ><strong>2. </strong> Te enviaremos por correo electrónico un código temporal.
                        </li>
                        <li style={{ fontSize: '20px' }}><span
                            class="text-primary mr-2" style={{ fontSize: '20px' }}></span ><strong>3. </strong> Utiliza el código para cambiar tú contraseña en nuestro sitio web seguro.
                        </li>
                    </ol>
                    <div class="card py-2 mt-4">
                        {/* <form class="card-body needs-validation" action="https://egoi.xyz/customer/auth/forgot-password" */}
                        <form class="card-body needs-validation" onClick={handleSubmitEmailRecovery}
                            method="post">
                            <input type="hidden" name="_token" value="opXWES6poIfNipFAiBxrZkxVqr4gXSrrbLSJm2q6" />
                            <div class="form-group">
                                <label for="recover-email">Introduce tú dirección de correo electrónico</label>
                                <input class="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="identity"
                                    id="recover-email"
                                    required style={{ borderRadius: '32px' }} />
                                <div
                                    class="invalid-feedback">Indica una dirección de correo electrónico válida
                                    .
                                </div>
                            </div>
                            <button style={{ borderRadius: '32px', backgroundColor: '#FC5241', border: 'none', marginTop: '15px', color: 'white', padding: '10px' }}
                                type="submit">Obtener nueva contraseña</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordRecoveryComponent
