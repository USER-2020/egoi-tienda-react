import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;

//Oferta del dia
export const getOfferOfDay = () =>
    axios.get(`${baseUrl}/days-deals`);

//Oferta destacada
export const getOfferHigligth = ()=>
    axios.get(`${baseUrl}/deals`);

export const getProductsByIdOfferHigh = (id) => 
    axios.get(`${baseUrl}/deals/products/${id}`);

//Oferta flash
export const getOfferFlash = () => 
    axios.get(`${baseUrl}/flash-deals`);

export const getOfferFlashById = (id) => 
    axios.get(`${baseUrl}/flash-deals/products/${id}`)