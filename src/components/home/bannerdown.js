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

    const showRoutes = (itemId, filtro) => {
        console.log("este el id elegido para pasar por las rutas en el banner 6", itemId);

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
                    <a href='#' onClick={() => showRoutes(itemBanner.banner_data[0].id_filtro, itemBanner.banner_data[0].tipo_filtro)}>
                        <div className='container1'>
                            <img src={baseUrlImageBanners + itemBanner.banner_data[0].imagen} className='bannerDownImg' />
                            <img src={bannerDown2} className='bannerDownImg2' />
                            {/* <div className='figures'>
                                <div className='aplicaciones'>
                                    {/* <span className='span1'>
                                        Descarga ahora el app de Egoi
                                        en tu dispositivo favorito
                                    </span>
                                    <span className='span2'>
                                        Y obtén un descuento del 10%
                                        en tu primera compra
                                    </span> */}
                                    {/* <span className='span3'>
                                        <a href="https://play.google.com/store/apps/details?id=com.egoi_user.flutter" target="_blank">
                                            <img src={appStore} />
                                        </a>
                                        <a href="#">
                                            <img src={googleStore} />
                                        </a>
                                    </span> */}
                                {/* </div> */}
                                {/* <div className='diamond'>
                                <img src={diamond} />
                            </div> */}
                                {/* <div className='triangle'>
                                <img src={triangle} />
                            </div> */}
                                {/* <div className='circle'>
                                <img src={circle} />
                            </div> */}
                                {/* <div className='ball'>
                                <img src={ball} />
                            </div> */}
                                {/* <div className='smallball1'>
                                <img src={smallBall} />
                            </div> */}
                                {/* <div className='smallball2'>
                                <img src={smallBall} />
                            </div> */}
                            {/* </div> */} 
                        </div>
                    </a>
                ))}
        </div>

    )
}

export default Bannerdown
