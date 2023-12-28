import React, { useEffect, useState } from 'react';
import { getPopup } from '../../services/banners';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Popup({ datosPopup }) {
  const history = useHistory();
  const baseUrlImageBanners = "https://egoi.xyz/storage/app/public/banner/";

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
      } else {
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

  useEffect(() => {
    console.log("estos sonm los datos del popup",datosPopup);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {datosPopup && datosPopup.map((itemPopup, index) => (
        <div key={index} style={{ justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
          {/* <a onClick={()=>closeModalPopup()}className="btn-close" aria-label="Close" style={{ marginLeft: 'auto', marginRight: '10px', cursor: "pointer" }}></a> */}
          <a onClick={() => showRutes(itemPopup.banner_data[0].id_filtro, itemPopup.banner_data[0].tipo_filtro, itemPopup.banner_data[0].id_tag, itemPopup.banner_data[0].ids_filtro_sub, itemPopup.banner_data[0].ids_filtro_s_sub)} style={styles.bannerLinkDesktop}>
            <img src={baseUrlImageBanners + itemPopup.banner_data[0].imagen_desk} width={'100%'} height={'100%'} alt="Banner Desktop" />
          </a>

          <a href='#' onClick={() => showRutes(itemPopup.banner_data[0].id_filtro, itemPopup.banner_data[0].tipo_filtro, itemPopup.banner_data[0].id_tag, itemPopup.banner_data[0].ids_filtro_sub, itemPopup.banner_data[0].ids_filtro_s_sub)} style={styles.bannerLinkMovil}>
            <img src={baseUrlImageBanners + itemPopup.banner_data[0].imagen} width={'100%'} height={'100%'} alt="Banner Mobile" />
          </a>
        </div>
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
