import axios from "axios";
import { urlBase } from "../constants/defaultValues";

export const getBanners = () =>
    axios.get(`${urlBase}/banners`, {
        params: {
            option: "web"
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });


//Traer popup principal
export const getPopup = () =>
    axios.get(`${urlBase}/banners/img_modal`, {
        params: {
            option: "web"
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });



