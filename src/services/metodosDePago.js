import React from 'react';
import { urlBase2 } from '../constants/defaultValues';
import { urlBase } from '../constants/defaultValues';
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
export const allBanksById = (id, token) =>
    axios.get(`${urlBase2}/payments/issuer/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })


//Efecty 
export const referenciaPago = (data, token) =>
    axios.post(`${urlBase2}/mercadopago/ticket`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })


//Realizar Pago 
export const makePay = (data, token) =>
    axios.post(`${urlBase2}/mercadopago/paymentMp`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

//Registar compra despues en el modal Efecty
export const placeOrderEfecty = (addressId, cuponLimpio, descriptionOrder, tmp, token, dataRefEfecty) =>
    axios.get(`${urlBase}/customer/order/place`, {
        params: {
            address_id: addressId,
            coupon_code: cuponLimpio,
            order_note: descriptionOrder,
            tmp: tmp,
            transaction_ref: dataRefEfecty,
            plataforma:"Web",

        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });


//Registar compra de OTP
export const placeOrder = (addressId, cuponLimpio, descriptionOrder, tmp, token) =>
    axios.get(`${urlBase}/customer/order/place`, {
        params: {
            address_id: addressId,
            coupon_code: cuponLimpio,
            order_note: descriptionOrder,
            tmp: tmp,
            plataforma:"Web",

        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })