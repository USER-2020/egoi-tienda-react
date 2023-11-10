import React from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';

const FacebookLoginButton = () => {
    const responseFacebook = (response) => {
        if (response.status !== 'unknown') {
            console.log('Respuesta de Facebook:', response);

            fetch(`https://graph.facebook.com/v12.0/${response.id}?fields=id,first_name,last_name,email&access_token=${response.accessToken}`)
                .then(res => res.json())
                .then(data => {
                    console.log('Información adicional del usuario:', data);
                    const { first_name, last_name, email } = data;
                    // Haz lo que necesites con la información del usuario
                })
                .catch(error => {
                    console.error('Error al obtener información del usuario desde la API de Facebook Graph:', error);
                });
        } else {
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
                <button
                    onClick={renderProps.onClick}
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
                >
                    Iniciar sesión con Facebook
                </button>
            )}
        />
    );
};

export default FacebookLoginButton;
