import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;

const Registro = (body, url) =>
  axios.post(`${baseUrl}/auth/register?url=${url}`, body);

export default Registro;
