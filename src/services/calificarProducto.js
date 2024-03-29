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


/* Traer todas las opiniones por id del producto */
export const allCommentsAndOpinionsByIdProduct = (idProduct) =>
    axios.get(`${baseUrl}/products/reviews/${idProduct}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });