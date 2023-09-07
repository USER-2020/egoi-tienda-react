import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;


// Todas las categorias
export const allCategories = () =>
    axios.get(`${baseUrl}/categories`);

// Categoria por Id 
export const subcategorieById = (id, offset, tag, subcate, subsubcate) =>
    axios.get(`${baseUrl}/categories/products/${id}`, {
        params: {
            limit: 20,
            offset: offset,
            tag: tag || '' ,// Si tag no tiene valor, se enviará como vacío
            sub_cate: subcate || '',
            sub_s_cate: subsubcate || []


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