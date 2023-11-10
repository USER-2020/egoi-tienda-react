import React from 'react';
import axios from 'axios';
import { urlBase } from '../constants/defaultValues';


const baseUrl = urlBase;

/* Loguro con email, apeliido, email y celular */
export const firstLogin = (fname, lname, email, phone) =>
    axios.post(`${baseUrl}/auth/register_google`, {
        f_name: fname,
        l_name: lname,
        email: email,
        phone: phone || '',
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });


/* Validacion de email en DB */
export const validateEmail = (email) =>
    axios.post(`${baseUrl}/auth/valite_email`, {
        email: email,
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

/*Enviar codigo de logueo*/
export const codeLogin = (email) =>
    axios.post(`${baseUrl}/auth/code-email`, {
        email: email,
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

/* Validacion de codigo de logueo  */
export const verifyCodeLogin = (email, code) =>
    axios.post(`${baseUrl}/auth/login_code`, {
        email: email,
        code: code,
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

//Login cuando el correo existe con ggooglr y facebook 
export const login_Email_Face = (email) =>
    axios.post(`${baseUrl}/auth/login_email_face`, {
        email: email,
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

/* Enviar codigo de inicio de sesion  */
export const code_email_register = (email) =>
    axios.post(`${baseUrl}/auth/code_email_register`, {
        email: email,
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

/* Auth register with code  */
export const auth_register_with_code = (code, f_name, l_name, email, password) =>
    axios.post(`${baseUrl}/auth/register`, {
        code: code,
        f_name: f_name,
        l_name: l_name,
        email: email,
        password: password,
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });  