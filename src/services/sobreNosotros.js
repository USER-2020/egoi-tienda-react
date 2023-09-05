import axios from "axios";
import { urlBase } from './../constants/defaultValues';

const baseUrlV1 = urlBase;

/* Politica de privacidad */
export const getPoliticasPrivacidad = () =>
    axios.get(`${baseUrlV1}/config/policy`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

/* Terrminos y condiciones */
export const getTerminosCondiciones = () =>
    axios.get(`${baseUrlV1}/config/terminos_condicones`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

/* Acerca de la empresa */
export const getAcercadeEmpresa = () =>
    axios.get(`${baseUrlV1}/config/nosotros`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

/* Preguntas frecuentes */
export const getPreguntasFrecuentes = () =>
    axios.get(`${baseUrlV1}/faq`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })