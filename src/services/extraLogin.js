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