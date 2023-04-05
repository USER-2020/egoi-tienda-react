import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;

const Recientes = () =>
  axios.get(`${baseUrl}/products/top-rated`);

export default Recientes;
