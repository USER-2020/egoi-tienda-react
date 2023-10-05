import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, ModalBody } from 'reactstrap';
import '../../styles/myOrders.css';
import cart from '../../assets/egoi_icons/Cart-8.svg';
import eye from '../../assets/egoi_icons/Eye.svg';
import heart from '../../assets/egoi_icons/Heart.svg';
import chat from '../../assets/egoi_icons/Chat.svg';
import user from '../../assets/egoi_icons/user-1.svg';
import point from '../../assets/egoi_icons/Map Point.svg';
import warning from '../../assets/egoi_icons/Warning.svg';
import ModalCancelarPedido from './modalesOrdenes/modalCancelarPedido';
import TableOrders from './tableOrders.tsx';
import DetailPedido from './detailPedido.tsx';
import TrackOrder from '../tracking/trackOrder.tsx';
import TrackSearch from '../tracking/trackSearch.tsx';
import Lista from '../favList/lista.tsx';
import ChatWithSeller from '../chat/chatWithSeller.tsx';
import InfoProfile from '../profile/infoProfile.tsx';
import DireccionesPerfil from '../direccionesProfile/direcciones.tsx';
import TicketSuport from '../ticketSuport/ticketSuport.tsx';
import DetailTicketSupport from '../ticketSuport/detailTicketSupport.tsx';
import ModalMenuOrdersResponsive from './modalesOrdenes/modalMenuOrdersResponsive';
import { getCurrentUser } from '../../helpers/Utils';
import { getOrdenDetalleById, getOrdenes } from '../../services/ordenes';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function Orders(props) {

    const location = useLocation();
    const history = useHistory();
    const searchParams = new URLSearchParams(location.search);
    const urlActiveOption = searchParams.get('activeOption');
    const urlSelectedOption = searchParams.get('selectedOption');




    const [activeOption, setActiveOption] = useState(urlActiveOption || 'MisPedidos');
    const [selectedOption, setSelectedOption] = useState(urlSelectedOption || 'Mis pedidos');



    // const [activeOption, setActiveOption] = useState('MisPedidos');
    // const [selectedOption, setSelectedOption] = useState('Mis Pedidos');

    /* Flujo de componetnes mis pedidos */
    const [misPedidos, setMisPedidos] = useState(true);
    const [showTableOrder, setShowTableOrder] = useState(true);
    const [showDetailOrder, setShowDetailOrder] = useState(false);
    const [showTrackOrder, setShowTrackOrder] = useState(false);

    /* Flujo de componetnes sigue tu pedido */
    const [sigueTuPedido, setSigueTuPedido] = useState(false);
    const [showTrackSearch, setShowTrackSearch] = useState(true);

    /* Flujo de componetnes lista de deseos */
    const [listaDeseos, setListaDeseos] = useState(false);
    const [showFavList, setShowFavList] = useState(true);

    /* Flujo de componetnes chatear con vendedores */
    const [chatear, setChatear] = useState(false);
    const [showChatVend, setShowChatVend] = useState(true);

    /* Flujo de componentes informacion de perfil */
    const [infoPerfil, setInfoPerfil] = useState(false);
    const [showInfoPerfil, setShowInfoPerfil] = useState(true);

    /* Flujo de componentes de direccion */
    const [direcciones, setDirecciones] = useState(false);
    const [showDirecciones, setShowDirecciones] = useState(true);

    /* Flujo de componentes de ticekt de soporte */
    const [ticket, setTicket] = useState(false);
    const [showTicketSuport, setShowTicketSuport] = useState(true);
    const [showDetailTicketSupport, setShowDetailTicketSupport] = useState(false);

    /* Cosas del responsive */
    const [modalMenuOrders, setModalMenuOrders] = useState(false);

    /* Detalle id de la orden */
    const [orderDetalleId, setOrderDetalleId] = useState('');

    /* Id del ticket */
    const [idTicket, setIdTicket] = useState('');
    const [statusTicket, setStatusTicket] = useState('');
    const [priorityTicket, setPriorityTicket] = useState('');

    const handleMenuOptionClick = (option) => {
        setActiveOption(option);
        if (option === 'MisPedidos') {
            closeDetailAndShowTable();
            setSelectedOption('Mis pedidos');
            // history.push(`/myorders?activeOption=MisPedidos&selectedOption=Mis%20pedidos`);
            closeModalMenuOrders();
        }
        if (option === 'SigueTuPedido') {
            closeMisPedidosAndShowTrack();
            setSelectedOption('Sigue tu pedido');
            // history.push(`/myorders?activeOption=SigueTuPedido&selectedOption=Sigue%20tu%20pedido`);
            closeModalMenuOrders();

        }

        if (option === 'ListaDeseos') {
            closeSigueTuPedidoAndShowFavList();
            setSelectedOption("Lista Deseos");
            closeModalMenuOrders();
        }

        if (option === 'Chatear') {
            closeListaDeseosAndShowChat();
            setSelectedOption("Chatear con los vendedores");
            closeModalMenuOrders();
        }

        if (option === 'InfoPerfil') {
            closeChatearAndShowPerfil();
            setSelectedOption("Información del perfil");
            closeModalMenuOrders();
        }

        if (option === 'Direccion') {
            closeInfoPerfilAndShowDirecciones();
            setSelectedOption("Información de las direcciones");
            closeModalMenuOrders();
        }

        if (option === 'Ticket') {
            closeDireccionesAndShowTicket();
            setSelectedOption("Crear un ticket");
            closeModalMenuOrders();
        }

        // if (option === 'DetallePedido') {
        //     setSelectedOption("Detalle de pedido");
        //     closeModalMenuOrders();
        // }

        // if (option === 'DetallePedido') {
        //     setSelectedOption("Detalle de pedido");
        //     closeModalMenuOrders();
        // }

        // if (option === 'RastreaPedido') {
        //     setSelectedOption("Rastrear pedido");
        //     closeModalMenuOrders();
        // }
    };

    const closeModalCancelOrder = () => {
        // setModalCancelOrder(false);
    }

    const closeModalMenuOrders = () => {
        setModalMenuOrders(false);
    }

    const closeDireccionesAndShowTicket = () => {
        setTicket(true);
        setDirecciones(false);
        setInfoPerfil(false);
        setMisPedidos(false);
        setSigueTuPedido(false);
        setListaDeseos(false);
        setChatear(false);
        setShowTicketSuport(true);
        setShowDetailTicketSupport(false);

    }

    const closeInfoPerfilAndShowDirecciones = () => {
        setDirecciones(true);
        setInfoPerfil(false);
        setMisPedidos(false);
        setSigueTuPedido(false);
        setListaDeseos(false);
        setChatear(false);
        setTicket(false);
    }

    const closeChatearAndShowPerfil = () => {
        setInfoPerfil(true);
        setMisPedidos(false);
        setSigueTuPedido(false);
        setListaDeseos(false);
        setChatear(false);
        setDirecciones(false);
        setTicket(false);

    }

    const closeListaDeseosAndShowChat = () => {
        setChatear(true);
        setMisPedidos(false);
        setSigueTuPedido(false);
        setListaDeseos(false);
        setInfoPerfil(false);
        setDirecciones(false);
        setTicket(false);

    }

    const closeSigueTuPedidoAndShowFavList = () => {
        setListaDeseos(true);
        setMisPedidos(false);
        setSigueTuPedido(false);
        setChatear(false);
        setInfoPerfil(false);
        setDirecciones(false);
        setTicket(false);
    }

    const handleChangueTrackOrder = (nroPedido) => {
        setShowTrackOrder(true);
        setShowTrackSearch(false);
        setOrderDetalleId(nroPedido);
    }

    const closeMisPedidosAndShowTrack = () => {
        setMisPedidos(false);
        setSigueTuPedido(true);
        setShowTrackSearch(true);
        setShowTrackOrder(false);
        setListaDeseos(false);
        setChatear(false);
        setInfoPerfil(false);
        setDirecciones(false);
        setTicket(false);
    }



    const closemodalAndOpenOtherModal = () => {
        setShowTableOrder(false);
        setShowDetailOrder(true);

    }

    const closeDetailAndShowTable = () => {
        setShowTableOrder(true);
        setShowDetailOrder(false);
        setShowTrackOrder(false);
        setMisPedidos(true);
        setSigueTuPedido(false);
        setListaDeseos(false);
        setChatear(false);
        setInfoPerfil(false);
        setDirecciones(false);
        setTicket(false);
    }

    const closeDetailShowTrack = () => {
        setActiveOption('RastrearPedido');
        setSelectedOption('Rastrear pedido');
        setShowDetailOrder(false);
        setShowTableOrder(false);
        setShowTrackOrder(true);
        setListaDeseos(false);
    }

    const closeTicketTableShowDetailTicket = () => {
        setShowTicketSuport(false);
        setShowDetailTicketSupport(true);
    }

    /* Funciones de conexiones de api manejando el id del detalle de la order*/
    const handleOrderClick = (orderId) => {
        setOrderDetalleId(orderId);
        // history.push(`/myorders?activeOption=DetallePedido&selectedOption=Detalle%20de%20pedido`);
        // console.log("desde la principal", orderDetalleId);
        setActiveOption('DetallePedido');
        setSelectedOption('Detalle del pedido');
        closemodalAndOpenOtherModal();
        // Realizar otras acciones necesarias con el ID de la orden
    };

    /* funmcion de manejo de datos entre los componetnes de tickets */
    const handleTicketClick = (idTicket) => {
        setIdTicket(idTicket);
    }

    const handleTicketClickPriority = (priority) => {
        setPriorityTicket(priority);
    }

    const handleTicketClickStatus = (statusTicketGet) => {
        setStatusTicket(statusTicketGet);
    }

    // useEffect(() => {
    //     console.log("desde la principal", orderDetalleId);

    // }, []);

  

    useEffect(() => {
        if (urlActiveOption && urlSelectedOption) {

            handleMenuOptionClick(urlActiveOption);
            setActiveOption(urlActiveOption);
            setSelectedOption(urlSelectedOption);
            // history.push(`/myorders?activeOption=${activeOption}&selectedOption=${selectedOption}`);
        }

    }, [urlActiveOption, urlSelectedOption]);

    useEffect(() => {
        // history.push(`/myOrders?activeOption=MisPedidos&selectedOption=Mis%20pedidos`);
        history.push(`/myorders?activeOption=${activeOption}&selectedOption=${selectedOption}`);
    }, [activeOption, selectedOption]);

    return (
        <>

            <div className='container'>
                <div className="contenedorOrdersOpciones">
                    <h6 style={{ color: '#74737B' }}>{selectedOption}</h6>
                    <div className="containerMenuAndContenidoMisOrdenes">
                        <div className="menuMisOrdenes">
                            <ul>
                                <li className={`opcion ${activeOption === 'MisPedidos' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleMenuOptionClick('MisPedidos') }}>
                                    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="img_opcion">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3462 10.2956C16.7352 10.6877 16.7328 11.3208 16.3407 11.7098L13.7003 14.3299H26.2997L23.6593 11.7098C23.2672 11.3208 23.2648 10.6877 23.6538 10.2956C24.0428 9.90361 24.676 9.90115 25.068 10.2902L29.1392 14.3299H32C32.5523 14.3299 33 14.7776 33 15.3299C33 15.8822 32.5523 16.3299 32 16.3299H8C7.44772 16.3299 7 15.8822 7 15.3299C7 14.7776 7.44772 14.3299 8 14.3299H10.8608L14.932 10.2902C15.324 9.90115 15.9572 9.90361 16.3462 10.2956ZM12.3313 17.0103H27.6686C28.1494 17.0103 28.5593 17.0103 28.8977 17.0332C29.2524 17.0572 29.6004 17.1096 29.9423 17.2502C30.7207 17.5701 31.3416 18.1848 31.6658 18.9615C31.8085 19.3034 31.8616 19.6512 31.8859 20.0046C31.9091 20.3411 31.9091 20.7486 31.909 21.2251V21.295C31.9091 22.7765 31.9091 23.9399 31.8444 24.88C31.7786 25.8372 31.6424 26.6362 31.3336 27.3758C30.5665 29.2135 29.0962 30.6711 27.2486 31.4305C26.5057 31.7359 25.703 31.8707 24.7398 31.9359C23.7932 32 22.6214 32 21.1277 32H18.8722C17.3785 32 16.2068 32 15.2601 31.9359C14.2969 31.8707 13.4942 31.7359 12.7513 31.4305C10.9037 30.6711 9.43341 29.2135 8.66629 27.3758C8.35751 26.6362 8.22132 25.8372 8.1555 24.88C8.09086 23.9399 8.09086 22.7766 8.09087 21.295L8.09087 21.225C8.09085 20.7485 8.09084 20.3411 8.11398 20.0046C8.13828 19.6512 8.19143 19.3034 8.33412 18.9615C8.65836 18.1848 9.2792 17.5701 10.0576 17.2502C10.3995 17.1096 10.7475 17.0572 11.1023 17.0332C11.4406 17.0103 11.8505 17.0103 12.3313 17.0103ZM11.2373 19.0286C10.9835 19.0458 10.877 19.0757 10.8179 19.1C10.5271 19.2195 10.2984 19.4478 10.1798 19.732C10.1564 19.788 10.1265 19.8912 10.1093 20.1418C10.0914 20.4014 10.0909 20.7396 10.0909 21.2577C10.0909 22.7846 10.0914 23.8793 10.1508 24.7428C10.2095 25.5972 10.3225 26.1515 10.5119 26.6054C11.0735 27.9506 12.1516 29.0217 13.5116 29.5807C13.9717 29.7698 14.5328 29.8821 15.3952 29.9405C16.2664 29.9995 17.3706 30 18.909 30H21.0909C22.6293 30 23.7335 29.9995 24.6047 29.9405C25.4671 29.8821 26.0283 29.7698 26.4883 29.5807C27.8483 29.0217 28.9265 27.9506 29.488 26.6054C29.6775 26.1515 29.7904 25.5972 29.8491 24.7428C29.9085 23.8793 29.909 22.7846 29.909 21.2577C29.909 20.7396 29.9085 20.4014 29.8906 20.1418C29.8734 19.8912 29.8435 19.788 29.8201 19.732C29.7015 19.4478 29.4728 19.2195 29.182 19.1C29.123 19.0757 29.0164 19.0458 28.7626 19.0286C28.4999 19.0108 28.1582 19.0103 27.6363 19.0103H12.3636C11.8417 19.0103 11.5 19.0108 11.2373 19.0286ZM17.2727 21.3402C17.825 21.3402 18.2727 21.7879 18.2727 22.3402V26.6701C18.2727 27.2224 17.825 27.6701 17.2727 27.6701C16.7204 27.6701 16.2727 27.2224 16.2727 26.6701V22.3402C16.2727 21.7879 16.7204 21.3402 17.2727 21.3402ZM22.7272 21.3402C23.2795 21.3402 23.7272 21.7879 23.7272 22.3402V26.6701C23.7272 27.2224 23.2795 27.6701 22.7272 27.6701C22.1749 27.6701 21.7272 27.2224 21.7272 26.6701V22.3402C21.7272 21.7879 22.1749 21.3402 22.7272 21.3402Z" fill="#171523" />
                                    </svg>
                                    <a href='#' >Mis pedidos</a>
                                </li>
                                <li className={`opcion ${activeOption === 'SigueTuPedido' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleMenuOptionClick('SigueTuPedido') }}>
                                    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='img_opcion'>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3911 11.3494C9.98137 12.3774 8.79326 13.6705 7.95955 14.7069C7.28956 15.5398 7.2001 15.7026 7.2001 16C7.2001 16.2974 7.28956 16.4602 7.95955 17.2931C8.79326 18.3295 9.98137 19.6226 11.3911 20.6506C12.8064 21.6826 14.3794 22.4 16.0001 22.4C17.6208 22.4 19.1938 21.6826 20.6091 20.6506C22.0188 19.6226 23.2069 18.3295 24.0406 17.2931C24.7106 16.4602 24.8001 16.2974 24.8001 16C24.8001 15.7026 24.7106 15.5398 24.0406 14.7069C23.2069 13.6705 22.0188 12.3774 20.6091 11.3494C19.1938 10.3174 17.6208 9.6 16.0001 9.6C14.3794 9.6 12.8064 10.3174 11.3911 11.3494ZM10.4484 10.0567C12.0085 8.91905 13.9097 8 16.0001 8C18.0904 8 19.9917 8.91905 21.5518 10.0567C23.1173 11.1983 24.4056 12.6079 25.2873 13.704C25.3154 13.739 25.3434 13.7736 25.3713 13.8081C25.9162 14.4832 26.4001 15.0826 26.4001 16C26.4001 16.9174 25.9162 17.5168 25.3713 18.1919C25.3434 18.2264 25.3154 18.261 25.2873 18.296C24.4056 19.3921 23.1173 20.8017 21.5518 21.9434C19.9917 23.0809 18.0904 24 16.0001 24C13.9097 24 12.0085 23.0809 10.4484 21.9434C8.88288 20.8017 7.59459 19.3921 6.71286 18.296C6.68476 18.261 6.65676 18.2264 6.62892 18.1919C6.08401 17.5168 5.6001 16.9174 5.6001 16C5.6001 15.0826 6.08401 14.4832 6.62892 13.8081C6.65676 13.7736 6.68476 13.739 6.71286 13.704C7.59459 12.6079 8.88288 11.1983 10.4484 10.0567ZM16.0001 14.1C14.9357 14.1 14.082 14.9557 14.082 16C14.082 17.0443 14.9357 17.9 16.0001 17.9C17.0645 17.9 17.9182 17.0443 17.9182 16C17.9182 14.9557 17.0645 14.1 16.0001 14.1ZM12.482 16C12.482 14.062 14.0622 12.5 16.0001 12.5C17.938 12.5 19.5182 14.062 19.5182 16C19.5182 17.938 17.938 19.5 16.0001 19.5C14.0622 19.5 12.482 17.938 12.482 16Z" fill="#171523" />
                                    </svg>
                                    <a href='#'>Sigue tu pedido</a>
                                </li>
                                <li className={`opcion ${activeOption === 'ListaDeseos' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleMenuOptionClick('ListaDeseos') }}>
                                    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='img_opcion'>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.16977 8.31899C9.38258 5.76021 13.0251 5.76021 15.2379 8.31899L15.9999 9.20013L16.7619 8.31899C18.9747 5.76021 22.6172 5.76021 24.83 8.31899C26.6657 10.4417 26.9852 13.7669 25.2901 16.1259C24.545 17.1629 23.6408 18.3392 22.6001 19.5426C21.0155 21.3749 19.5019 22.8434 18.3834 23.8548C17.8238 24.3608 17.3622 24.7532 17.0389 25.0203C16.8773 25.1539 16.7501 25.2562 16.6625 25.3258C16.6187 25.3606 16.5848 25.3872 16.5613 25.4055L16.5342 25.4266L16.5266 25.4324L16.5237 25.4347C16.5236 25.4347 16.5232 25.435 16.0368 24.7999C15.5582 25.441 15.5581 25.4409 15.558 25.4408L15.5547 25.4383L15.5469 25.4325L15.519 25.4113C15.4949 25.393 15.4601 25.3664 15.4152 25.3315C15.3253 25.2618 15.1951 25.1594 15.0297 25.0257C14.699 24.7584 14.2276 24.3657 13.6582 23.8592C12.5201 22.8471 10.9862 21.3771 9.3997 19.5426C8.35898 18.3392 7.45476 17.1629 6.70966 16.1259C5.01456 13.7669 5.33408 10.4417 7.16977 8.31899ZM16.0368 24.7999L15.558 25.4408L16.043 25.8028L16.5237 25.4347L16.0368 24.7999ZM16.0309 23.7777C16.3373 23.5243 16.7765 23.1507 17.3103 22.6681C18.3915 21.6904 19.8569 20.2686 21.3898 18.496C22.3938 17.3351 23.2684 16.1976 23.9908 15.1923C25.2159 13.4873 25.0151 10.9791 23.6198 9.36558C22.0451 7.54468 19.5468 7.54468 17.9721 9.36558L15.9999 11.6462L14.0277 9.36558C12.453 7.54468 9.9547 7.54468 8.38 9.36558C6.98464 10.9791 6.78389 13.4873 8.009 15.1923C8.73136 16.1976 9.60598 17.3351 10.6099 18.496C12.1409 20.2664 13.623 21.6867 14.7215 22.6636C15.2676 23.1493 15.7179 23.5245 16.0309 23.7777Z" fill="black" />
                                    </svg>
                                    <a href='#'>Lista de deseos</a></li>
                                <li className={`opcion ${activeOption === 'Chatear' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleMenuOptionClick('Chatear') }}>
                                    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='img_opcion'>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.59961 15.9996C5.59961 10.2558 10.2558 5.59961 15.9996 5.59961C21.7434 5.59961 26.3996 10.2558 26.3996 15.9996V22.8937C26.3996 23.3968 26.3996 23.8306 26.3652 24.1856C26.3288 24.5616 26.2478 24.9326 26.0317 25.2765C25.8399 25.5818 25.5818 25.8399 25.2765 26.0317C24.9326 26.2478 24.5616 26.3288 24.1856 26.3652C23.8306 26.3996 23.3968 26.3996 22.8937 26.3996H15.9996C10.2558 26.3996 5.59961 21.7434 5.59961 15.9996ZM15.9996 7.19961C11.1395 7.19961 7.19961 11.1395 7.19961 15.9996C7.19961 20.8597 11.1395 24.7996 15.9996 24.7996H22.8568C23.4072 24.7996 23.7627 24.7987 24.0312 24.7727C24.2874 24.7478 24.3789 24.7061 24.4252 24.677C24.527 24.613 24.613 24.527 24.677 24.4252C24.7061 24.3789 24.7478 24.2874 24.7727 24.0312C24.7987 23.7627 24.7996 23.4072 24.7996 22.8568V15.9996C24.7996 11.1395 20.8597 7.19961 15.9996 7.19961Z" fill="black" />
                                        <path d="M14.4 16.3992C14.4 17.062 13.8627 17.5992 13.2 17.5992C12.5373 17.5992 12 17.062 12 16.3992C12 15.7365 12.5373 15.1992 13.2 15.1992C13.8627 15.1992 14.4 15.7365 14.4 16.3992Z" fill="black" />
                                        <path d="M20 16.3992C20 17.062 19.4627 17.5992 18.8 17.5992C18.1373 17.5992 17.6 17.062 17.6 16.3992C17.6 15.7365 18.1373 15.1992 18.8 15.1992C19.4627 15.1992 20 15.7365 20 16.3992Z" fill="black" />
                                    </svg>
                                    <a href='#'>Chatear con el vendedor</a></li>
                                <li className={`opcion ${activeOption === 'InfoPerfil' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleMenuOptionClick('InfoPerfil') }}>
                                    <svg width="22" height="22" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className='img_opcion'>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.49999C10.107 6.49999 8.55 8.0724 8.55 10.04C8.55 12.0076 10.107 13.58 12 13.58C13.893 13.58 15.45 12.0076 15.45 10.04C15.45 8.0724 13.893 6.49999 12 6.49999ZM9.25855 13.8694C8.09938 13.0051 7.35 11.6078 7.35 10.04C7.35 7.43466 9.41951 5.29999 12 5.29999C14.5805 5.29999 16.65 7.43466 16.65 10.04C16.65 11.6282 15.881 13.0415 14.6959 13.9029C15.8876 14.2125 16.699 14.7432 17.2198 15.5023C17.6309 16.1016 17.8196 16.7885 17.9106 17.4911C18 18.1807 18 18.9318 18 19.6765V19.7C18 20.0314 17.7314 20.3 17.4 20.3C17.0686 20.3 16.8 20.0314 16.8 19.7C16.8 18.9281 16.799 18.2506 16.7206 17.6453C16.6429 17.0459 16.4941 16.5658 16.2302 16.1812C15.725 15.4447 14.6345 14.8397 11.9933 14.78C9.35912 14.781 8.27527 15.3881 7.77214 16.1327C7.50707 16.525 7.35753 17.017 7.27954 17.6274C7.20092 18.2427 7.2 18.9285 7.2 19.7C7.2 20.0314 6.93137 20.3 6.6 20.3C6.26863 20.3 6 20.0314 6 19.7L6 19.6773C5.99999 18.9318 5.99998 18.1737 6.08921 17.4753C6.17997 16.7649 6.36793 16.0675 6.77786 15.4608C7.29247 14.6993 8.09106 14.1685 9.25855 13.8694Z" fill="#171523" />
                                    </svg>
                                    <a href='#'>Información de tu perfil</a></li>
                                <li className={`opcion ${activeOption === 'Direccion' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleMenuOptionClick('Direccion') }}>
                                    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='img_opcion'>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0002 7.19961C12.0476 7.19961 8.8002 10.5151 8.8002 14.6592C8.8002 15.441 9.0957 16.3662 9.63392 17.3813C10.167 18.3868 10.9057 19.4202 11.7148 20.4025C13.3132 22.3429 15.1277 24.0136 16.0002 24.7814C16.8727 24.0136 18.6872 22.3429 20.2856 20.4025C21.0947 19.4202 21.8334 18.3868 22.3665 17.3813C22.9047 16.3662 23.2002 15.441 23.2002 14.6592C23.2002 10.5151 19.9528 7.19961 16.0002 7.19961ZM7.2002 14.6592C7.2002 9.67997 11.1162 5.59961 16.0002 5.59961C20.8842 5.59961 24.8002 9.67997 24.8002 14.6592C24.8002 15.8123 24.376 17.0068 23.7801 18.1308C23.179 19.2645 22.3692 20.3895 21.5206 21.4197C19.8232 23.4803 17.9107 25.2332 17.0241 26.0116C16.4349 26.5289 15.5655 26.5289 14.9763 26.0116C14.0897 25.2332 12.1772 23.4803 10.4798 21.4197C9.63123 20.3895 8.82137 19.2645 8.22031 18.1308C7.6244 17.0068 7.2002 15.8123 7.2002 14.6592ZM16.0002 11.3647C14.9994 11.3647 14.1335 12.2189 14.1335 13.3414C14.1335 14.4639 14.9994 15.3181 16.0002 15.3181C17.0009 15.3181 17.8669 14.4639 17.8669 13.3414C17.8669 12.2189 17.0009 11.3647 16.0002 11.3647ZM12.5335 13.3414C12.5335 11.3968 14.0554 9.76468 16.0002 9.76468C17.945 9.76468 19.4669 11.3968 19.4669 13.3414C19.4669 15.286 17.945 16.9181 16.0002 16.9181C14.0554 16.9181 12.5335 15.286 12.5335 13.3414Z" fill="black" />
                                    </svg>
                                    <a href='#'>Dirección</a></li>
                                <li className={`opcion ${activeOption === 'Ticket' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleMenuOptionClick('Ticket') }}>
                                    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='img_opcion'>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7284 5.59962C14.7593 5.59963 14.7906 5.59964 14.8223 5.59964H17.177C17.2087 5.59964 17.24 5.59963 17.2709 5.59962C18.0346 5.59943 18.551 5.59931 19.0463 5.7182C19.4841 5.82331 19.9026 5.99668 20.2866 6.23195C20.7208 6.49805 21.0859 6.86337 21.6258 7.40351C21.6476 7.42535 21.6698 7.44748 21.6922 7.46989L21.1265 8.03558L21.6922 7.46989L24.5294 10.3071C24.5518 10.3295 24.5739 10.3516 24.5958 10.3735C25.1359 10.9134 25.5012 11.2785 25.7673 11.7127C26.0026 12.0966 26.176 12.5152 26.2811 12.953C26.4 13.4482 26.3998 13.9647 26.3997 14.7284C26.3996 14.7593 26.3996 14.7906 26.3996 14.8223V17.177C26.3996 17.2087 26.3996 17.24 26.3997 17.2709C26.3998 18.0346 26.4 18.551 26.2811 19.0463C26.176 19.4841 26.0026 19.9026 25.7673 20.2866C25.5012 20.7208 25.1359 21.0859 24.5958 21.6258C24.5739 21.6476 24.5518 21.6698 24.5294 21.6922L21.6922 24.5294C21.6698 24.5518 21.6476 24.5739 21.6258 24.5958C21.0859 25.1359 20.7208 25.5012 20.2866 25.7673C19.9026 26.0026 19.4841 26.176 19.0463 26.2811C18.551 26.4 18.0346 26.3998 17.2709 26.3997C17.24 26.3996 17.2087 26.3996 17.177 26.3996H14.8223C14.7906 26.3996 14.7593 26.3996 14.7284 26.3997C13.9647 26.3998 13.4482 26.4 12.953 26.2811C12.5152 26.176 12.0966 26.0026 11.7127 25.7673C11.2785 25.5012 10.9133 25.1359 10.3734 24.5957C10.3516 24.5739 10.3295 24.5518 10.3071 24.5294L7.4699 21.6922C7.44748 21.6698 7.42535 21.6476 7.40351 21.6258C6.86336 21.0859 6.49805 20.7208 6.23195 20.2866C5.99668 19.9026 5.82331 19.4841 5.7182 19.0463C5.59931 18.551 5.59943 18.0346 5.59962 17.2709C5.59963 17.24 5.59964 17.2087 5.59964 17.177V14.8223C5.59964 14.7906 5.59963 14.7593 5.59962 14.7284C5.59943 13.9647 5.59931 13.4482 5.7182 12.953C5.82331 12.5152 5.99668 12.0966 6.23195 11.7127C6.49805 11.2785 6.86335 10.9134 7.4035 10.3735C7.42534 10.3516 7.44747 10.3295 7.46989 10.3071L10.3071 7.4699C10.3295 7.44748 10.3516 7.42535 10.3735 7.4035C10.9134 6.86335 11.2785 6.49805 11.7127 6.23195C12.0966 5.99668 12.5152 5.82331 12.953 5.7182C13.4482 5.59931 13.9647 5.59943 14.7284 5.59962ZM14.8223 7.19964C13.9304 7.19964 13.6148 7.20478 13.3265 7.27399C13.052 7.33991 12.7895 7.44863 12.5487 7.59617C12.2959 7.75107 12.0692 7.97058 11.4385 8.60127L8.60127 11.4385C7.97058 12.0692 7.75107 12.2959 7.59617 12.5487C7.44863 12.7895 7.33991 13.052 7.27399 13.3265C7.20478 13.6148 7.19964 13.9304 7.19964 14.8223V17.177C7.19964 18.0689 7.20478 18.3845 7.27399 18.6727C7.33991 18.9473 7.44863 19.2098 7.59617 19.4506C7.75107 19.7033 7.97058 19.9301 8.60127 20.5608L11.4385 23.398C12.0692 24.0287 12.2959 24.2482 12.5487 24.4031C12.7895 24.5506 13.052 24.6594 13.3265 24.7253C13.6148 24.7945 13.9304 24.7996 14.8223 24.7996H17.177C18.0689 24.7996 18.3845 24.7945 18.6727 24.7253C18.9473 24.6594 19.2098 24.5506 19.4506 24.4031C19.7033 24.2482 19.9301 24.0287 20.5608 23.398L23.398 20.5608C24.0287 19.9301 24.2482 19.7033 24.4031 19.4506C24.5506 19.2098 24.6594 18.9473 24.7253 18.6727C24.7945 18.3845 24.7996 18.0689 24.7996 17.177V14.8223C24.7996 13.9304 24.7945 13.6148 24.7253 13.3265C24.6594 13.052 24.5506 12.7895 24.4031 12.5487C24.2482 12.2959 24.0287 12.0692 23.398 11.4385L20.5608 8.60127C19.9301 7.97059 19.7033 7.75107 19.4506 7.59617C19.2098 7.44863 18.9473 7.33991 18.6727 7.27399C18.3845 7.20478 18.0689 7.19964 17.177 7.19964H14.8223ZM15.9996 10.3996C16.4415 10.3996 16.7996 10.7578 16.7996 11.1996V17.5996C16.7996 18.0415 16.4415 18.3996 15.9996 18.3996C15.5578 18.3996 15.1996 18.0415 15.1996 17.5996V11.1996C15.1996 10.7578 15.5578 10.3996 15.9996 10.3996Z" fill="black" />
                                        <path d="M16.7992 20.8C16.7992 21.2418 16.441 21.6 15.9992 21.6C15.5574 21.6 15.1992 21.2418 15.1992 20.8C15.1992 20.3582 15.5574 20 15.9992 20C16.441 20 16.7992 20.3582 16.7992 20.8Z" fill="black" />
                                    </svg>
                                    <a href='#'>Ticket de soporte</a></li>
                            </ul>
                        </div>
                        <div className="contenidoMisOrdenes">

                            {misPedidos && (

                                <div className="mispedidos">
                                    {/* modales de mims pedidos */}
                                    {showTableOrder && (
                                        <TableOrders setOrderDetalleId={handleOrderClick} />
                                    )}
                                    {showDetailOrder && (
                                        <DetailPedido closeDetailOpenTrack={closeDetailShowTrack} orderDetalleId={orderDetalleId} />
                                    )}
                                    {showTrackOrder && (
                                        <TrackOrder orderDetalleId={orderDetalleId} />
                                    )}
                                </div>
                            )}
                            {sigueTuPedido && (

                                <div className="sigueTuPedido">
                                    {showTrackSearch && (
                                        <TrackSearch handleChangueTrackOrder={handleChangueTrackOrder} />
                                    )}
                                    {showTrackOrder && (
                                        <TrackOrder orderDetalleId={orderDetalleId} />
                                    )}
                                </div>
                            )}
                            {listaDeseos && (
                                <div className="listaDeDeseos">
                                    {showFavList && (
                                        <Lista />
                                    )}
                                </div>
                            )}
                            {chatear && (
                                <div className="chatearVendedor">
                                    {showChatVend && (
                                        <ChatWithSeller />
                                    )}
                                </div>
                            )}
                            {infoPerfil && (
                                <div className="infoPerfil">
                                    {showInfoPerfil && (
                                        <InfoProfile />
                                    )}
                                </div>
                            )}
                            {direcciones && (
                                <div className="direccionPerfil">
                                    {showDirecciones && (
                                        <DireccionesPerfil />
                                    )}
                                </div>
                            )}
                            {ticket && (
                                <div className="ticketSoporte">
                                    {showTicketSuport && (
                                        <TicketSuport closemodalAndOpenOtherModal={closeTicketTableShowDetailTicket} setIdTicket={handleTicketClick} setPriorityTicket={handleTicketClickPriority} setStatusTicket={handleTicketClickStatus} />
                                    )}
                                    {showDetailTicketSupport && (
                                        <DetailTicketSupport idTicket={idTicket} status={statusTicket} priority={priorityTicket} />
                                    )}
                                </div>
                            )}
                        </div >
                    </div>
                </div>
                <div className="contenedorOrdersOpcionesResponsive">
                    <h6 style={{ color: '#74737B' }}>{selectedOption}</h6>
                    <div className="contenidoMisOrdenesResponsive">

                        {misPedidos && (

                            <div className="mispedidosResponsive">
                                {/* modales de mims pedidos */}
                                {showTableOrder && (
                                    <TableOrders setOrderDetalleId={handleOrderClick} />
                                )}
                                {showDetailOrder && (
                                    <DetailPedido closeDetailOpenTrack={closeDetailShowTrack} orderDetalleId={orderDetalleId} />
                                )}
                                {showTrackOrder && (
                                    <TrackOrder orderDetalleId={orderDetalleId} />
                                )}
                                <div className="btnOpcionesMenuResponsive">
                                    <a href="#" onClick={() => setModalMenuOrders(true)}>Menú de opciones</a>
                                </div>
                            </div>
                        )}
                        {sigueTuPedido && (

                            <div className="sigueTuPedidoResponsive">
                                {showTrackSearch && (
                                    <TrackSearch handleChangueTrackOrder={handleChangueTrackOrder} />
                                )}
                                {showTrackOrder && (
                                    <TrackOrder orderDetalleId={orderDetalleId} />
                                )}
                                <div className="btnOpcionesMenuResponsive">
                                    <a href="#" onClick={() => setModalMenuOrders(true)}>Menú de opciones</a>
                                </div>
                            </div>
                        )}
                        {listaDeseos && (
                            <div className="listaDeDeseosResponsive">
                                {showFavList && (
                                    <Lista />
                                )}
                                <div className="btnOpcionesMenuResponsive">
                                    <a href="#" onClick={() => setModalMenuOrders(true)}>Menú de opciones</a>
                                </div>
                            </div>
                        )}
                        {chatear && (
                            <div className="chatearVendedorResponsive">
                                {showChatVend && (
                                    <ChatWithSeller />
                                )}
                                <div className="btnOpcionesMenuResponsive">
                                    <a href="#" onClick={() => setModalMenuOrders(true)}>Menú de opciones</a>
                                </div>
                            </div>
                        )}
                        {infoPerfil && (
                            <div className="infoPerfilResponsive">
                                {showInfoPerfil && (
                                    <InfoProfile />
                                )}
                                <div className="btnOpcionesMenuResponsive">
                                    <a href="#" onClick={() => setModalMenuOrders(true)}>Menú de opciones</a>
                                </div>
                            </div>
                        )}
                        {direcciones && (
                            <div className="direccionPerfilResponsive">
                                {showDirecciones && (
                                    <DireccionesPerfil />
                                )}
                                <div className="btnOpcionesMenuResponsive">
                                    <a href="#" onClick={() => setModalMenuOrders(true)}>Menú de opciones</a>
                                </div>
                            </div>
                        )}
                        {ticket && (
                            <div className="ticketSoporteResponsive">
                                {showTicketSuport && (
                                    <TicketSuport closemodalAndOpenOtherModal={closeTicketTableShowDetailTicket} setIdTicket={handleTicketClick} setPriorityTicket={handleTicketClickPriority} setStatusTicket={handleTicketClickStatus} />
                                )}
                                {showDetailTicketSupport && (
                                    <DetailTicketSupport idTicket={idTicket} status={statusTicket} priority={priorityTicket} />
                                )}
                                <div className="btnOpcionesMenuResponsive">
                                    <a href="#" onClick={(e) => {e.preventDefault(); setModalMenuOrders(true)}}>Menú de opciones</a>
                                </div>
                            </div>
                        )}

                        {/* Modales */}
                        <Modal
                            className="modal-dialog-centered modal-sm"
                            toggle={() => closeModalMenuOrders()}
                            isOpen={modalMenuOrders}
                        >
                            <ModalBody>
                                <ModalMenuOrdersResponsive handleMenuOptionClick={handleMenuOptionClick} activeOption={activeOption} />
                            </ModalBody>
                        </Modal>
                    </div >

                </div>
            </div>



        </>
    )
}

export default Orders
