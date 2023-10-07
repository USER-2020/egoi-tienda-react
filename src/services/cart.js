import axios from 'axios';
import { urlBase } from '../constants/defaultValues';
import { getCurrentUser } from '../helpers/Utils';





const baseUrl = urlBase;


//Traer todos los productos del carrito 
export const allProductsCart = (token) => 
    axios.get(`${baseUrl}/cart`, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

//Agregar productos al carrito
export const addProductsCart = (id, quantity, token) =>
    axios.post(`${baseUrl}/cart/add` , {
            id: id,
            quantity: quantity
        },{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

//Update quantity
export const updateQuantityCart = (qty, id, token) => 
    axios.put(`${baseUrl}/cart/update`, {
        
        key: id,
        quantity: qty
    },{

        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

//Eliminar item del carrito de compra
export const deleteItemCart = (key, token) => 
    axios.delete(`${baseUrl}/cart/remove`, {
      data:{  
        key: key
    },
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })