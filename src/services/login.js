import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;

const login = (body) => axios.post(`${baseUrl}/auth/login`, body);

// export const activar = (token) =>
//   axios.get(`${baseUrl}/auth/activacion?token=${token}`);

export default login;
