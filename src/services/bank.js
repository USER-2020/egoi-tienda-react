import axios from 'axios';

//Traer todos los bancos
export const allBanks = (token) =>
    axios.get(`https://egoi.xyz/api/v2/wompi/getInstitutions`, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });