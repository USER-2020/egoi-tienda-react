import React from 'react';
import axios from 'axios';
import { urlBase } from '../constants/defaultValues';


const baseUrl = urlBase;

/* Loguro con email, apeliido, email y celular */
export const firstLogin = (fname, lname, email, phone) =>
    axios.post(`${baseUrl}/auth/register_google`, {
        f_name:fname,
        l_name:lname,
        email:email,
        phone:phone || '',
    },{
        headers:{
            'Content-Type': 'application/json',            
        }
    });


