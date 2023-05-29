import React from "react";
import { urlBase } from "../constants/defaultValues";
import axios from 'axios';

const baseUrl = urlBase;

//traer todas las direcciones
export const allAddress = (token) =>
    axios.get(`${baseUrl}/customer/address/list`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   
        }
    });

//traer todos los deptos
export const allDeptos = (token) =>
    axios.get(`${baseUrl}/localidad/departamento`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   
        }
    })

//Traer todas las ciudades por id de departamento
export const allCitysByIdDepto = (idDepto, token) =>
    axios.get(`${baseUrl}/localidad/municipio/${idDepto}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   
        }
    })

//Guardar direccion
export const saveAddress = (data, token) => 
    axios.post(`${baseUrl}/customer/address/add`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   
        }
    });

//Actualizar direccion 
export const updateAddress = (id, data, token) =>
    axios.put(`${baseUrl}/customer/address/update/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   
        }
    })

//Eliminar direccion
export const deleteAddress = (id, token) =>
    axios.delete(`${baseUrl}/customer/address/remove/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   
        }
    })