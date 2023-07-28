import React from 'react';
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

const Bannerdown = ({ bannersInfo }) => {
    const baseUrlImageBanners = "https://egoi.xyz/storage/app/public/banner/";

    const history = useHistory();

    const showRoutes = (itemId, filtro, tag) => {
        console.log("este el id elegido para pasar por las rutas en el banner 6", itemId);
        console.log("este el id elegido para pasar por las rutas en el banner 6", tag);

        if (filtro === 'category') {
            history.push(`/categories/products/filter/${itemId}`);
        }
        if (filtro === 'product') {
            history.push(`/detailsProduct/${itemId}/slug`);
        }
        if (filtro === 'brand') {
            history.push(`/brand/filterBrandBanner/${itemId}`);
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
