import React, { useState } from 'react';
import '../../styles/bannerDown.css';
import bannerDown from '../../assets/banner3.png';
import diamond from '../../assets/Diamond.png';
import triangle from '../../assets/Triangle.png';
import circle from '../../assets/Circle.png';
import ball from '../../assets/Ball.png';
import smallBall from '../../assets/Ball Small.png';
import appStore from '../../assets/image 1.png';
import googleStore from '../../assets/image 2.png';
import bannerDown2 from '../../assets/bannerdown2responsive.png';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { allCategories, subcategorieById } from '../../services/categories';
import { detailProductById } from '../../services/detailProduct';
import { getProductsByIdBrand } from '../../services/brands';

const Bannerdown = ({ bannersInfo }) => {
    const baseUrlImageBanners = "https://egoi.xyz/storage/app/public/banner/";

    const history = useHistory();

    /* Flujo de trabajo */
    // const [bannersInfo, setBannersInfo] = useState([]);
    const [offset, setOffset] = useState([]);
    const [bannerFiltro6, setBannerFiltro6] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('');


    /* Banner 6 */
    const [tipoFiltro6, setTipoFiltro6] = useState('');
    // const [bannerFiltro6, setBannerFiltro6] = useState('');

    const getAllCategoriesByBanner = (bannersInfo) => {
        if (bannersInfo) {
            const filteredBanners = bannersInfo.filter((banner) => banner.banner_type === "banner_6");
            filteredBanners.map((banner) => {
                banner.banner_data.map((bannerData) => {
                    if (bannerData.tipo_filtro === "category") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro6(bannerData.id_filtro);
                        subcategorieById(bannerData.id_filtro, offset, bannerData.id_tag)
                            .then((res) => {
                                // console.log("Informacion de banner 6 category", res.data);
                                // console.log("Datos de etiquedtado 6", res.data);
                                // setSubcategory(res.data.products);
                                // history.push(`/categories/products/filter/${bannerData.id_filtro}`);
                            })
                            .catch((err) => console.log(err));
                    }
                    if (bannerData.tipo_filtro === "product") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro6(bannerData.id_filtro);
                        detailProductById(bannerData.id_filtro, bannerData.id_tag)
                            .then((res) => {
                                // console.log('Detalle del producto del banner 6 product ', res.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }

                    if (bannerData.tipo_filtro === "brand") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro6(bannerData.id_filtro);
                        getProductsByIdBrand(bannerData.id_filtro, bannerData.id_tag)
                            .then((res) => {
                                // console.log('Detalle del producto por marca desde el banner 6', res.data);
                            })
                            .catch((err) => console.log(err));
                    }


                    if (bannerData.tipo_filtro === "shop") {
                        setTipoFiltro(bannerData.tipo_filtro);
                        setBannerFiltro6(bannerData.id_filtro);

                    }

                });
            });
        }

    };

    const showRutes = (itemId, filtro, tag, subcate, subsubcate) => {
        console.log("este el id elegido para pasar por rutas", itemId);
        if (filtro === 'category') {
            if (tag !== '' && subcate !== '' && subsubcate !== []) {
                // Todas las variables tienen valores, construir la URL con todas ellas
                const subsubcateStr = JSON.stringify(subsubcate);
                console.log("Entré en la primera validación de subcategorías, subsubcategorías e idTag");
                history.push(`/categories/products/Precios%20especiales/${itemId}/${tag}/${encodeURIComponent(subcate)}/${encodeURIComponent(subsubcateStr)}`);
            } else if (subcate !== '' && subsubcate !== []) {
                // idtag está vacío, pero subcate y subsubcate tienen valores, construir la URL sin idtag
                const subsubcateStr = JSON.stringify(subsubcate);
                console.log("Entré en la segunda validación cuando idTag es vacío");
                history.push(`/categories/products/Precios%20especiales/${itemId}/${encodeURIComponent(subcate)}/${encodeURIComponent(subsubcateStr)}`);
            } else if (tag !== '') {
                // idtag tiene valor, pero subcate y subsubcate están vacíos, construir la URL solo con idtag
                console.log("Entré en la tercera validación en donde solo se manda en la ruta idTag");
                history.push(`/categories/products/Precios%20especiales/${itemId}/${tag}`);
            }else{
                console.log("Entré en la tercera validación en donde solo se manda en la ruta idTag");
                history.push(`/categories/products/Precios%20especiales/${itemId}/${tag}`);
            }
        }



        if (filtro === 'product') {
            history.push(`/detailsProduct/${itemId}/slug/${tag}`);
        }
        if (filtro === 'brand') {
            history.push(`/brand/Descuento/${itemId}/${tag}`);
        }

    }

    return (
        <div className='container'>
            {bannersInfo && bannersInfo
                .filter((banner) => banner.banner_type === "banner_6")
                .map((itemBanner, index) => (
                    <a href='#' onClick={() => {
                        console.log(itemBanner.banner_data);
                        if (itemBanner.banner_data && itemBanner.banner_data.length > 0) {
                            showRutes(
                                itemBanner.banner_data[0].id_filtro,
                                itemBanner.banner_data[0].tipo_filtro,
                                itemBanner.banner_data[0].id_tag,
                                itemBanner.banner_data[0].ids_filtro_sub,
                                itemBanner.banner_data[0].ids_filtro_s_sub
                            );
                        } else {
                            console.error('itemBanner.bannerData está vacío o no definido.');
                        }
                    }}>
                        <div className='container1'>
                            <img src={baseUrlImageBanners + itemBanner.banner_data[0].imagen_desk} className='bannerDownImg' />
                            <img src={baseUrlImageBanners + itemBanner.banner_data[0].imagen} className='bannerDownImg2' />
                        </div>
                    </a>
                ))}
        </div>
    );
    
}

export default Bannerdown
