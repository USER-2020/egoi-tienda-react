import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { CLIENT_ID_GOOGLE } from '../../constants/defaultValues';

const LoginGoogle = () => {

    const handleError = () => {
        console.log('Login failed');
    }

    const handleSuccess = (credentialsResponse: CredentialResponse) => {
        console.log("credetialResppnse", credentialsResponse);
    }

    return (
        <div>
            <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE}>
                <GoogleLogin onError={handleError} onSuccess={handleSuccess} />
            </GoogleOAuthProvider>
        </div>
    )
}

export default LoginGoogle
