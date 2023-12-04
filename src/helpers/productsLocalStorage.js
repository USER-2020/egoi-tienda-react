import { addProductsCart } from "../services/cart";
import { getCurrentUser } from "./Utils";

const currentUser = getCurrentUser();
const token = currentUser ? currentUser.token : null;

export const addCartProductsOfLocalStorage = async () => {
    let productsCartData = JSON.parse(localStorage.getItem('productsCart')) || [];

    // Almacena los IDs de los productos que se deben eliminar después de la operación
    const productsToRemove = [];

    // Recorre el arreglo
    for (const product of productsCartData) {
        try {
            // Agrega el producto al endpoint correspondiente
            const res = await addProductsCart(product.id, product.min_qty, token);
            console.table(res);

            // Almacena el ID del producto para eliminar después de la operación exitosa
            productsToRemove.push(product.id);
        } catch (error) {
            console.error(`Error al agregar el producto ${product.name}: ${error.message}`);
            // Manejar el error según tus necesidades
        }
    }

    // Elimina los productos del Local Storage después de completar el bucle
    for (const productIdToRemove of productsToRemove) {
        removeProductFromLocalStorage(productIdToRemove);
    }
};

// Función para eliminar un producto del localStorage por su ID
function removeProductFromLocalStorage(productId) {
    let productsCartData = JSON.parse(localStorage.getItem('productsCart')) || [];
    const indexToRemove = productsCartData.findIndex(product => product.id === productId);

    if (indexToRemove !== -1) {
        productsCartData.splice(indexToRemove, 1);
        localStorage.setItem('productsCart', JSON.stringify(productsCartData));
    }
}
