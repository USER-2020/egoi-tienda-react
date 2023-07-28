import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;


// Todas las categorias
export const allCategories = () =>
    axios.get(`${baseUrl}/categories`);

// Categoria por Id 
export const subcategorieById = (id, offset) => 
    axios.get(`${baseUrl}/categories/products/${id}`,{
        params:{
            limit:30,
            offset:offset,
            
            
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });