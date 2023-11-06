import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;

/* Calificar producto */
export const sendCalificarProducto = (idProduct, comment, rating, token) =>
    axios.post(`${baseUrl}/products/reviews/submit`, {
        product_id: idProduct,
        comment: comment,
        rating: rating
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
