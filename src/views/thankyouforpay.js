import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import HeaderResponsive from '../components/headerResponsive';
import Footer from '../components/footer';
import { allProductsCart } from '../services/cart';
import { getCurrentUser } from './../helpers/Utils';
import SuccessPurchase from './user/success_purchase';
import '../views/user/successPurchase.css';
import { getUserProfileInfo } from '../services/ordenes';

const Thankyouforpay = () => {
    const currenUser = getCurrentUser();
    const [cantProductsOnCart, setCantProductsOnCart] = useState('');
    const [detailInfoProfile, setDetailInfoProfile] = useState([]);

    const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currenUser sea null

    const getCantCart = () => {
        allProductsCart(token)
            .then((res) => {
                const productsOncart = res.data;
                const numberOfProducts = productsOncart.length;
                setCantProductsOnCart(numberOfProducts);
            })
            .catch((err) => console.log(err));
    };

    const getAllInfoPerfil = () => {
        getUserProfileInfo(token)
            .then((res) => {
                // console.log(res.data);
                setDetailInfoProfile(res.data);
            }).catch((err) => console.log(err));
    }

    useEffect(() => {
        getCantCart();
        // Ajusta la posición del scroll a la parte superior cuando la vista se carga
        window.scrollTo(0, 0);
        getAllInfoPerfil();
    }, [currenUser]);


    return (
        <div className="w-100 d-flex flex-column align-items-center">
            <Header cantCart={cantProductsOnCart} detailInfoPerfil={detailInfoProfile}/>
            <HeaderResponsive canCart={cantProductsOnCart} detailInfoProfile={detailInfoProfile}/>
            <SuccessPurchase />
            <Footer />
        </div>
    );
};

export default Thankyouforpay;
