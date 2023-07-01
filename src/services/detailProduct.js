import axios from 'axios';
import { urlBase } from '../constants/defaultValues';

const baseUrl = urlBase;

/**
 * This function retrieves the details of a product based on its slug using an axios GET request.
 * @param slug - The "slug" parameter is a string that represents a unique identifier for a specific
 * product. It is used to retrieve the details of a product from the server using an HTTP GET request.
*/
// Detalle de un producto a partir del slug 
export const detailProduct = (slug) =>
    axios.get(`${baseUrl}/products/details/${slug}`);

//Detalle de un producto a partir del id
export const detailProductById = (id)=>
    axios.get(`${baseUrl}/products/details_id/${id}`);