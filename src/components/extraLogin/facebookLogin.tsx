import FacebookLogin from '@greatsumini/react-facebook-login';
import React from 'react'
import { APP_ID_FACEBOOK } from '../../constants/defaultValues';


const FacebookLoginComponent = () => {
    return (
        <FacebookLogin
            appId={APP_ID_FACEBOOK}
            style={{
                backgroundColor: '#4267b2',
                color: '#fff',
                fontSize: '16px',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '50px',
                width: '285px'
            }}
            onSuccess={(response) => {
                console.log('Login Success!', response);
            }}
            onFail={(error) => {
                console.log('Login Failed!', error);
            }}
            onProfileSuccess={(response) => {
                console.log('Get Profile Success!', response);
            }}

        />
    )
}

export default FacebookLoginComponent;
