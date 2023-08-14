import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;


// Todas las categorias
export const allCategories = () =>
    axios.get(`${baseUrl}/categories`);

// Categoria por Id 
export const subcategorieById = (id, offset, tag) =>
    axios.get(`${baseUrl}/categories/products/${id}`, {
        params: {
            limit: 20,
            offset: offset,
            tag: tag || '' // Si tag no tiene valor, se enviará como vacío


        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

// Productos con descuento
export const discountedProducts = (offset) =>
    axios.get(`${baseUrl}/products/discounted-product`, {
        params: {
            limit: 20,
            offset: offset,
            
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })