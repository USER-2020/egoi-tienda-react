import React from "react";
import { urlBase } from "../constants/defaultValues";
import axios from 'axios';

const baseUrl = urlBase;

//Aplicar cupon
export const aplyCupon = (code, token) => 
    axios.post(`${baseUrl}/coupon/apply`, {code} , {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   
        }
    });