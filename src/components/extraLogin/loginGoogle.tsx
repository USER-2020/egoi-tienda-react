import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React, { useState } from 'react'
import { CLIENT_ID_GOOGLE } from '../../constants/defaultValues';
import { decodeJwt, setCurrentUser } from '../../helpers/Utils';
import { firstLogin } from '../../services/extraLogin';
import { addCartProductsOfLocalStorage } from '../../helpers/productsLocalStorage';
import Swal from 'sweetalert2';

const LoginGoogle = () => {
    const handleError = () => {
        console.log('Login failed');
    }

    const handleSuccess = (credentialsResponse: CredentialResponse) => {
        console.log("credetialResppnse", credentialsResponse);
        if (credentialsResponse.credential) {
            const { payload } = decodeJwt(credentialsResponse.credential);
            // console.log("Credenciales payload user", payload);
            console.log(payload.given_name);
            // setF_name(payload.given_name);
            console.log(payload.family_name);
            // setL_name(payload.family_name);
            console.log(payload.email);
            // setEmail(payload.email);
            firstLogin(payload.given_name, payload.family_name, payload.email)
                .then((res) => {
                    console.log(res);

                    const item = {
                        token: res.data.token,
                        email: payload.email,
                    }
                    setCurrentUser(item);
                    addCartProductsOfLocalStorage();
                    Swal.fire({
                        icon: 'success',
                        title: 'Bienvenido',
                        // text: 'Has iniciado sesión correctamente',
                        confirmButtonColor: '#fc5241',
                        html: `
                          <p>Por favor, revisa nuestros <a href="/termsAndConditions">Términos y Condiciones</a> y <a href="/privacyPolicy">Política de Privacidad</a>.</p>
                          <label for="aceptar">Acepto los Términos y Condiciones:</label>
                          <input type="checkbox" id="aceptar">
                        `,
                        preConfirm: () => {
                            const aceptado = document.getElementById('aceptar').checked;
                            if (!aceptado) {
                                Swal.showValidationMessage('Debes aceptar los Términos y Condiciones para continuar.');
                            }
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // El usuario marcó el cuadro de aceptación y confirmó
                            Swal.fire({
                                icon: 'success',
                                title: 'Bienvenido',
                                text: 'Has iniciado sesión correctamente',
                                confirmButtonColor: '#fc5241',
                            });
                            window.location.reload();
                        } else if (result.isDismissed) {
                            // El usuario hizo clic fuera de la ventana
                            window.location.reload(); // Recargar la página
                        }
                    });




                }).catch((err) => {
                    console.log(err);
                    console.log(err.response.data.status);
                    if (err.response.data.status === 'ok') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Este correo ya está registrado, ingresa!',
                            confirmButtonColor: '#FC5241', // Set the desired color here
                            confirmButtonText: 'Ok', // Optionally change the button's text
                            // footer: '<a href="">Que significa esto?</a>'
                        });

                    }

                });
        }
    }

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            state_cookie_domain={'single_host_origin'}
            useOneTap
        />
    )
}

export default LoginGoogle
