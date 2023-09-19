import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import HeaderResponsive from '../components/headerResponsive';
import Footer from '../components/footer';
import { allProductsCart } from '../services/cart';
import { getCurrentUser } from './../helpers/Utils';
import SuccessPurchase from './user/success_purchase';
import '../views/user/successPurchase.css';

const Thankyouforpay = () => {
    const currenUser = getCurrentUser();
    const [cantProductsOnCart, setCantProductsOnCart] = useState('');

    const getCantCart = () => {
        const token = currenUser.token;
        allProductsCart(token)
            .then((res) => {
                const productsOncart = res.data;
                const numberOfProducts = productsOncart.length;
                setCantProductsOnCart(numberOfProducts);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getCantCart();
        // Ajusta la posición del scroll a la parte superior cuando la vista se carga
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-100 d-flex flex-column align-items-center">
            <Header cantCart={cantProductsOnCart} />
            <HeaderResponsive canCart={cantProductsOnCart} />
            <SuccessPurchase />
            <Footer />
        </div>
    );
};

export default Thankyouforpay;
