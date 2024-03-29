import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;

//Todas las marcas
export const getAllBrands = () => 
    axios.get(`${baseUrl}/brands`);

//Productos por categoria
export const getProductsByIdBrand = (id, offset) =>
    axios.get(`${baseUrl}/brands/products/${id}`, {
        params:{
            limit:12,
            offset: offset,
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });

// Traer marcas por categoria o subcategoria
// Traer marcas por categoria o subcategoria
export const getBrandsByCategory = (id, tag) =>
    axios.get(`${baseUrl}/brands/category/${id}`, {
        params:{
            limit:12,
            tag: tag || '' // Si tag no tiene valor, se enviará como vacío
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });

