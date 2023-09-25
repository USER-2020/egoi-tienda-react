import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;

//Oferta del dia
export const getOfferOfDay = () =>
    axios.get(`${baseUrl}/days-deals`);