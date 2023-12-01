import { addProductsCart } from "../services/cart";
import { getCurrentUser } from "./Utils";

const currenUser = getCurrentUser();
const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currenUser sea null

/* Funcion para agregar productos de local a la base de datos */
export const addCartProductsOfLocalStorage = async () => {
    let productsCartData = JSON.parse(localStorage.getItem('productsCart'));

    // Convierte los datos en una matriz de objetos y agrega un índice único a cada producto
    let productsInCart = Object.values(productsCartData).map((product, index) => ({ ...product, index }));
    console.log("Productos del arreglo", productsInCart);
    // Obtén la longitud del arreglo
    const cartLength = productsInCart.length;
    console.log(cartLength, "tamanio");
    // Recorre el arreglo
    for (let i = 0; i < cartLength; i++) {
        const product = productsInCart[i];
        // Haz algo con el producto, por ejemplo:
        console.log(`Producto ${i + 1}: ${product.name}`);
        addProductsCart(product.id, product.min_qty, token)
            .then((res) => {
                console.table(res)
                // Elimina el producto del localStorage
                removeProductFromLocalStorage(product.id);

            }).catch((err) => console.log(err));
    }

    // Función para eliminar un producto del localStorage
    function removeProductFromLocalStorage(index) {
        // Obtiene los datos del localStorage
        let productsCartData = JSON.parse(localStorage.getItem('productsCart')) || {};

        // Elimina el producto del objeto de datos
        delete productsCartData[index];

        // Guarda los datos actualizados en el localStorage
        localStorage.setItem('productsCart', JSON.stringify(productsCartData));


    }


};