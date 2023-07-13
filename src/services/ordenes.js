import React, { useState } from 'react';
import { urlBase } from '../constants/defaultValues';
import axios from 'axios';

//Traer todas las ordenes 
export const getOrdenes = (token) =>
    axios.get(`${urlBase}/customer/order/list`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

//Obtener detalles de pedido por id
export const getOrdenDetalleById = (token, idOrden) =>
    axios.get(`${urlBase}/customer/order/details?order_id=${idOrden}`, {

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: {
            query: [
                {
                    key: "order_id",
                    value: idOrden
                }
            ]
        }
    });

//Generar facturas por id de orden
export const getFacturaById = (token, idOrden) =>
    axios.get(`${urlBase}/customer/order/generate-invoice/${idOrden}`, {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

//Lista de deseos
//Traer todos los productos de la lista de deseos
export const getWishList = (token) =>
    axios.get(`${urlBase}/customer/wish-list`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

//Agregar a favoritos
export const addWishList = (token, idProduct) =>
    axios.post(`${urlBase}/customer/wish-list/add?product_id=${idProduct}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });


//Borrar producto por id de la lista de deseos
export const deleteProductWishList = (token, productId) =>
    axios.delete(`${urlBase}/customer/wish-list/remove?product_id=${productId}`, {

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: {
            query: [
                {
                    key: "product_id",
                    value: productId
                }
            ]
        }
    });

//Informacion de perfil
//Traer toda la info del perfil
export const getUserProfileInfo = (token) =>
    axios.get(`${urlBase}/customer/info`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

//Actualizar info de perfil
export const updateInfoProfile = (token, data) =>
    axios.put(`${urlBase}/customer/update-profile`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });


//Ticket suppport
//Traer todos los tickets
export const getTicketsSupport = (token) =>
    axios.get(`${urlBase}/customer/support-ticket/get`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

//Obtner ticket de suport por id
export const getTicketById = (token, idTicket) =>
    axios.get(`${urlBase}/customer/support-ticket/conv/${idTicket}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

//Crear ticket
export const createTicketSupport = (token, data) =>
    axios.post(`${urlBase}/customer/support-ticket/create`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

//Favoritos
//Add Favoritos 
export const addFavoriteProduct = (token, idProduct) =>
    axios.post(`${urlBase}/customer/wish-list/add?product_id=${idProduct}`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );

//Chatera con los vendedores
//Obtener todos los chats
export const allChatsSellers = (token) =>
    axios.get(`${urlBase}/customer/chat`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

//Obtener chat por id de tienda
export const getSellerChatByStoreId = (token, idShop) =>
    axios.get(`${urlBase}/customer/chat/messages?shop_id=${idShop}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })

//Enviar mensage al vendedor
export const addMessage = (token, idSeller, idShop, message) =>
    axios.post(`${urlBase}/customer/chat/send-message`, {
        seller_id: idSeller,
        shop_id: idShop,
        message: message,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

