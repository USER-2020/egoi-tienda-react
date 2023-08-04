import axios from "axios";
import { urlBase } from './../constants/defaultValues';

const baseUrl = urlBase;

// Rastreo de pedido
export const trackerOrder = (token, order_id) => {
    return axios.get(`${baseUrl}/order/track`, {
        params: {
            order_id: order_id
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

