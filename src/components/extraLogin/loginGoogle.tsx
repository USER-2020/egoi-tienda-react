import React from 'react';
import Swal from 'sweetalert2';
import { setCurrentUser } from '../../helpers/Utils';
import { firstLogin, login_Email_Face } from '../../services/extraLogin';
import { addCartProductsOfLocalStorage } from '../../helpers/productsLocalStorage';
import MyCustomButton from './myCustomButton.tsx';
import { useGoogleLogin } from '@react-oauth/google';

const LoginGoogle = () => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => handleSuccess(tokenResponse),
    });

    const handleSuccess = (credentialsResponse) => {
        console.log("credentialsResponse", credentialsResponse);

        if (credentialsResponse) {
            const accessToken = credentialsResponse.access_token;

            // Obtener información del perfil del usuario desde la API de Google
            fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Información del usuario:', data);

                    const { given_name, family_name, email } = data;

                    firstLogin(given_name, family_name, email)
                        .then((res) => {
                            console.log(res);

                            const item = {
                                token: res.data.token,
                                email: email,
                            };

                            setCurrentUser(item);

                            setTimeout(function () {
                                addCartProductsOfLocalStorage();
                            }, 3000);

                            Swal.fire({
                                icon: 'success',
                                title: 'Bienvenido',
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

                                    addCartProductsOfLocalStorage();
                                    window.location.reload();
                                } else if (result.isDismissed) {
                                    // El usuario hizo clic fuera de la ventana
                                    addCartProductsOfLocalStorage();
                                    window.location.reload(); // Recargar la página
                                }
                            });
                        })
                        .catch((err) => {
                            console.log(err);

                            if (err.response && err.response.data && err.response.data.status === 'ok') {
                                login_Email_Face(email)
                                    .then((res) => {
                                        const item = {
                                            token: res.data.token,
                                            email: email,
                                        };

                                        setCurrentUser(item);

                                        setTimeout(function () {
                                            addCartProductsOfLocalStorage();
                                        }, 3000);
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Bienvenido',
                                            text: 'Has iniciado sesión correctamente',
                                            confirmButtonColor: '#fc5241',
                                        });
                                        window.location.reload(); // Recargar la página
                                    })
                                    .catch((error) => {
                                        console.log("Error en login_Email_Face", error);
                                    });
                            }
                        });
                })
                .catch(error => console.error('Error al obtener información del usuario', error));
        }
    };

    return (

        <MyCustomButton onClick={() => login()}>
            Iniciar sesión con Google {' '}
        </MyCustomButton>

    );
};

export default LoginGoogle;
