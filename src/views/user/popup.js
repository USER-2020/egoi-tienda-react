import React, { useEffect, useState } from 'react';
import { getPopup } from '../../services/banners';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Popup({ handleModalData, datosPopup }) {

  

  const history = useHistory();

  /* Base imagenes de banners */
  const baseUrlImageBanners = "https://egoi.xyz/storage/app/public/banner/";

  // const getPrincipalPopup = () => {
  //   getPopup()
  //     .then((res) => {
  //       setDatosPopup(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };


  const showRoutes = (itemId, filtro, tag) => {
    // console.log("este el id elegido para pasar por las rutas popup", itemId);

    if (filtro === 'category') {
      history.push(`/categories/products/filter/${itemId}/${tag}`);
    }
    if (filtro === 'product') {
      history.push(`/detailsProduct/${itemId}/slug/${tag}`);
    }
    if (filtro === 'brand') {
      history.push(`/brand/filterBrandBanner/${itemId}/${tag}`);
    }
  }


  useEffect(() => {
    console.log(datosPopup);

  }, []);

  return (
    <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
      {datosPopup && datosPopup.map((itemPopup, index) => (
        <>
          <a href='#' onClick={() => showRoutes(itemPopup.banner_data[0].id_filtro, itemPopup.banner_data[0].tipo_filtro, itemPopup.banner_data[0].id_tag)} style={styles.bannerLinkDesktop}>
            <img src={baseUrlImageBanners + itemPopup.banner_data[0].imagen_desk} width={'100%'} height={'100%'}></img>
          </a>
          <a href='#' onClick={() => showRoutes(itemPopup.banner_data[0].id_filtro, itemPopup.banner_data[0].tipo_filtro, itemPopup.banner_data[0].id_tag)} style={styles.bannerLinkMovil}>
            <img src={baseUrlImageBanners + itemPopup.banner_data[0].imagen} width={'100%'} height={'100%'}></img>
          </a>
        </>
      ))}
    </div>
  )
}

const styles = {
  bannerLinkDesktop: {
    display: 'block'
  },

  bannerLinkMovil: {
    display: 'none'
  },
  // Media Query para pantallas más pequeñas (ejemplo: ancho máximo de 768px)
  '@media (max-width: 768px)': {
    bannerLinkMovil: {
      display: 'block'
    },

    bannerLinkDesktop: {
      display: 'none'
    }
  },
};

export default Popup

