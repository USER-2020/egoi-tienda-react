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

    const showRoutes = (itemId, filtro, tag) => {
        // console.log("este el id elegido para pasar por las rutas en el banner 6", itemId);
        // console.log("este el id elegido para pasar por las rutas en el banner 6", tag);

        if (filtro === 'category') {
            // getAllCategoriesByBanner(bannersInfo);
            history.push(`/categories/products/Descuento/${itemId}/${tag}`,{
                tag:tag
            });
        }
        if (filtro === 'product') {
            // getAllCategoriesByBanner(bannersInfo);
            history.push(`/detailsProduct/${itemId}/slug/${tag}`);
        }
        if (filtro === 'brand') {
            // getAllCategoriesByBanner(bannersInfo);
            history.push(`/brand/Descuento/${itemId}/${tag}`);
        }
    }

    return (
        <div className='container'>
            {bannersInfo && bannersInfo
                .filter((banner) => banner.banner_type === "banner_6")
                .map((itemBanner, index) => (
                    <a href='#' onClick={() => showRoutes(itemBanner.banner_data[0].id_filtro, itemBanner.banner_data[0].tipo_filtro, itemBanner.banner_data[0].id_tag)}>
                        <div className='container1'>
                            <img src={baseUrlImageBanners + itemBanner.banner_data[0].imagen_desk} className='bannerDownImg' />
                            <img src={baseUrlImageBanners + itemBanner.banner_data[0].imagen} className='bannerDownImg2' />

                        </div>
                    </a>
                ))}
        </div>

    )
}

export default Bannerdown
