import React  from 'react';
import { urlBase2 } from '../constants/defaultValues';
import axios from 'axios';


//Traeer todos los tipos de tarjeta
export const typePayment = (token) => 
    axios.get(`${urlBase2}/payments/payMedium`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   
        }
    });

//Bancos asociados por id
export const allBanksById = (id,token) =>
    axios.get(`${urlBase2}/payments/issuer/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   
        }
    })
