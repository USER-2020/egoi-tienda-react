import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;

//Todas las marcas
export const getAllBrands = () => 
    axios.get(`${baseUrl}/brands`);

//Productos por categoria
export const getProductsByIdBrand = (id) =>
    axios.get(`${baseUrl}/brands/products/${id}`, {
        params:{
            limit:12
        },
        headers:{
            'Content-Type': 'application/json'
        }
    })