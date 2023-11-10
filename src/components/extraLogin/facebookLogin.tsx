import React from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { firstLogin, login_Email_Face } from '../../services/extraLogin';
import { setCurrentUser } from '../../helpers/Utils';
import { addCartProductsOfLocalStorage } from '../../helpers/productsLocalStorage';
import Swal from 'sweetalert2';

const FacebookLoginButton = () => {

    const handleLoginWithFacebook = (responseCredentials) => {
        console.log("creddntials with facebook", responseCredentials);
        const nombreCompleto = responseCredentials.name;
        const arregloNombre = nombreCompleto.split(" ");
        const given_name = arregloNombre[0];
        const family_name = arregloNombre[arregloNombre.length - 1];
        const email = responseCredentials.email;

        firstLogin(given_name, family_name, email)
            .then((res) => {
                console.log(res);

                const item = {
                    token: res.data.token,
                    email: email,
                };

                setCurrentUser(item);
                addCartProductsOfLocalStorage();

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
            }).catch((err) => {
                console.log(err);
                if (err.response && err.response.data && err.response.data.status === 'ok') {
                    login_Email_Face(email)
                        .then((res) => {
                            const item = {
                                token: res.data.token,
                                email: email,
                            };

                            setCurrentUser(item);
                            addCartProductsOfLocalStorage();
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
            }).catch((err) => console.log('Error al obtener información del usuario', err));
    }

    return (
        <FacebookLogin
            appId="1397712557481530"
            style={{
                backgroundColor: '#4267b2',
                color: '#fff',
                fontSize: '16px',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '50px',
                width: '285px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onSuccess={(response) => {
                console.log('Login Success!', response);
            }}
            onFail={(error) => {
                console.log('Login Failed!', error);
            }}
            onProfileSuccess={(response) => {
                handleLoginWithFacebook(response)
                console.log('Get Profile Success!', response);
            }}
        >Inicia sesión con Facebook </FacebookLogin>
    );
};

export default FacebookLoginButton;
