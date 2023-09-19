import axios from 'axios';
import { urlBase } from '../constants/defaultValues';




const baseUrl = urlBase;

// Filtro de productos mas recientes 
export const filterProductsRecents = (id) =>
    axios.get(`${baseUrl}/categories/products_latest/${id}`, {
        params:{
            limit:12
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });

// Filtro del mas alto al mas bajo precio
export const filterProductsHigh_Low = (id) =>
    axios.get(`${baseUrl}/categories/products_high_price/${id}`, {
        params:{
            limit:12
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });

// Filtro del mas bajo al mas alto
export const filterProductsLow_High = (id) =>
    axios.get(`${baseUrl}/categories/products_low_price/${id}`, {
        params:{
            limit:12
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });

// Filtro de la A-Z 
export const filterProductsA_Z = (id) =>
    axios.get(`${baseUrl}/categories/products_a_z/${id}`, {
        params:{
            limit:12
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });


// Filtro de la Z-A 
export const filterProductsZ_A = (id)=>
    axios.get(`${baseUrl}/categories/products_z_a/${id}` ,{
        params:{
           limit:12 
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });

// filtro por rango de precio
export const filterProductsPrice = (id, priceStart, priceEnd) => 
    axios.get(`${baseUrl}/categories/products_range_price/${id}`, {
        params: {
            price_start: priceStart,
            price_end: priceEnd,
            limit:12
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });

// Filtro los mas vendidos por categoria
export const filterProductsMostSold = (id) => 
    axios.get(`${baseUrl}/categories/best_sellings/${id}`, {
        params: {
            
            limit:12
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });

// Filtro los mejores calificados por categoria
export const filterProductsBestRated = (id) => 
    axios.get(`${baseUrl}/categories/top_rated_products/${id}`, {
        params: {
            
            limit:12
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });

// Filtro los mas preferidos por categoria 
export const filterProductsFeaturePrefer = (id) =>
    axios.get(`${baseUrl}/categories/featured_products/${id}`, {
        params: {
            
            limit:12
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });

export const getProductsBySearch = (searchProducts) =>
    axios.get(`${baseUrl}/search_v2`, {
        params: {
            name: searchProducts
        },
        headers:{
            'Content-Type': 'application/json'
        }
    })