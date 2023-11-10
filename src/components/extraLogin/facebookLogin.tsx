import FacebookLogin from '@greatsumini/react-facebook-login';
import React from 'react'
import { APP_ID_FACEBOOK } from '../../constants/defaultValues';


const FacebookLoginComponent = () => {

    const responseFacebook = (response) => {
        if (response.status !== 'unknown') {
            // El usuario ha iniciado sesión con éxito en Facebook
            console.log('Respuesta de Facebook:', response);

            // Obtener más detalles del usuario desde la API de Facebook Graph
            fetch(`https://graph.facebook.com/v12.0/${response.id}?fields=id,first_name,last_name,email&access_token=${response.accessToken}`)
                .then(res => res.json())
                .then(data => {
                    console.log('Información adicional del usuario:', data);
                    const { first_name, last_name, email } = data;

                    // Ahora puedes usar first_name y last_name según tus necesidades
                })
                .catch(error => {
                    console.error('Error al obtener información del usuario desde la API de Facebook Graph:', error);
                });
        } else {
            // El usuario ha cancelado el inicio de sesión o ha ocurrido un problema
            console.log('Inicio de sesión cancelado o error');
        }
    };
    return (
        <FacebookLogin
            appId="TU_APP_ID_DE_FACEBOOK"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            render={renderProps => (
                <button onClick={renderProps.onClick}>Iniciar sesión con Facebook</button>
            )}
        />

    )
}

export default FacebookLoginComponent;
