import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;


// Todas las categorias
export const allCategories = () =>
    axios.get(`${baseUrl}/categories`);

// Categoria por Id 
export const subcategorieById = (id, offset, tag) => 
    axios.get(`${baseUrl}/categories/products/${id}`,{
        params:{
            limit:12,
            offset:offset,
            tag:tag
            
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });