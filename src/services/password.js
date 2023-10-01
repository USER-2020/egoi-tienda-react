import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;

//Enviar correo de recuperacion
export const forgetPassword = (email) =>
    axios.post(`${baseUrl}/auth/forgot-password`, {
        email: email
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

//Enviar nuevas contrasenias
export const resetPassword = (email, token, password, password2 ) =>
    axios.put(`${baseUrl}/auth/reset-password`, {
        email:email,
        token: token,
        password: password,
        confirm_password: password2
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })