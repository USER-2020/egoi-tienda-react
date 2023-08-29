import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;

export const ProductosDescuento = (offset) =>
  axios.get(`${baseUrl}/products/discounted-product`, {
    params: {
      limit: 20,
      offset: offset,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const ProductosRecientes = (offset) =>
  axios.get(`${baseUrl}/products/latest`, {
    params: {
      limit: 20,
      offset: offset,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });


export const ProdutosMejorValorados = (offset) =>
  axios.get(`${baseUrl}/products/top-rated`, {
    params: {
      limit: 20,
      offset: offset,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

//products/featured

export const ProductosParaPresentar = (offset) =>
  axios.get(`${baseUrl}/products/featured`, {
    params: {
      limit: 20,
      offset: offset,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

//products/home-categories

export const ProductosPorCategoria = () =>
  axios.get(`${baseUrl}/products/home-categories`);

//mas vendidos

export const ProductosMasVendidos = (offset) =>
  axios.get(`${baseUrl}/products/best-sellings`, {
    params: {
      limit: 20,
      offset: offset,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

//Similar Products
export const ProductosSimilaresById = (id) =>
  axios.get(`${baseUrl}/products/related-products/${id}`);