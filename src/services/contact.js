import axios from "axios";
import { urlBase } from "../constants/defaultValues";

const baseUrl = urlBase;

/* Enviar contact form */
export const addContact = (data) =>
    axios.post(`${baseUrl}/customer/contact/store`, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });