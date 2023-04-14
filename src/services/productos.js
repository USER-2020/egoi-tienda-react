import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;

export const ProductosDescuento = () =>
  axios.get(`${baseUrl}/products/discounted-product`);

export const ProductosRecientes = () =>
  axios.get(`${baseUrl}/products/latest`);


export const ProdutosMejorValorados = () =>
  axios.get(`${baseUrl}/products/top-rated`);

  //products/featured

export const ProductosParaPresentar = () =>
  axios.get(`${baseUrl}/products/featured`);

//products/home-categories

export const ProductosPorCategoria = () =>
  axios.get(`${baseUrl}/products/home-categories`);

  //mas vendidos

export const ProductosMasVendidos = () =>
  axios.get(`${baseUrl}/products/best-sellings`);
