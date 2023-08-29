import React, { useState } from "react";
import styles from "../styles/navbar.css";
import logo from "../assets/logo.png";
import efecty from "../assets/mastercard-8 4.png";
import pse from "../assets/mastercard-8 3.png";
import visa from "../assets/mastercard-8 2.png";
import mastercard from "../assets/mastercard-8 1.png";
import americanexpress from "../assets/mastercard-8 5.png";
// import playstore from "../assets/image 1.png";
// import appstore from "../assets/image 2.png";
// import superintendencia from "../assets/LogoSuperintendencia.png";
import { activar } from './../services/login';
import appstore from "../assets/appstore.svg";
import playstore from "../assets/playStore.svg";
import logoSIC from "../assets/logo-sic.png";
import { getCurrentUser } from './../helpers/Utils';
import {
    InputGroup,
    Input,
    Modal,
    ModalBody,
} from "reactstrap";
import Register from "../views/user/register.js";
import Login from "../views/user/login.js";


const Footer = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [modalViewRegistro, setModalViewRegistro] = useState(false);
    const [modalViewLogin, setModalViewLogin] = useState(false);
    const [changeFormLogin, setChangeFormLogin] = useState(false);
    const [changeFormRegister, setChangeFormRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const currenUser = getCurrentUser();

    const closeModalRegistro = () => {
        setModalViewRegistro(false);
    };

    const closeModalLogin = () => {
        setModalViewLogin(false);
    };

    const handleChangeFormLogin = () => {

        if (modalViewLogin === true) {
            setModalViewRegistro(true);
        }
    };

    const handleChangeFormRegister = () => {

        if (modalViewRegistro === true) {
            setModalViewLogin(true);
        }

    };

    const handleLogin = () => {
        // Code to handle user login, such as storing session storage, etc.
        if (currenUser) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

    };

    /* Lista de deseos */
    const handleFavList = () => {
        if (currenUser) {
            const url = `/myorders?activeOption=ListaDeseos&selectedOption=Lista%20Deseos`;
            window.location.href = url;
        } else {
            setModalViewLogin(true);
        }
    }

    /* Seguir tu pedido */
    const handleSeguirPedido = () => {
        if (currenUser) {
            const url = `/myorders?activeOption=SigueTuPedido&selectedOption=Sigue%20tu%20pedido`;
            window.location.href = url;
        } else {
            setModalViewLogin(true);
        }
    }

    /* Informacion de tu perfil */
    const handleInfoPerfil = () => {
        if (currenUser) {
            const url = `/myorders?activeOption=InfoPerfil&selectedOption=Información%20del%20perfil`;
            window.location.href = url;
        } else {
            setModalViewLogin(true);
        }
    }

    /* Direccion */
    const handleDireccion = () => {
        if (currenUser) {
            const url = `/myorders?activeOption=Direccion&selectedOption=Información%20de%20las%20direcciones`;
            window.location.href = url;
        } else {
            setModalViewLogin(true);
        }
    }

    /* Ticket de soporte */
    const handleTicketSupport = () => {
        if(currenUser){
            const url = `/myorders?activeOption=Ticket&selectedOption=Crear%20un%20ticket`;
            window.location.href = url;
        }else{
            setModalViewLogin(true);
        }
    }

    return (
        <footer className="container">
            <div className="containerFooter containerFooterResponsive w-100">
                <div className="row">
                    <div className="footerLogo">
                        <div className="izq">
                            <a href="/">
                                <img src={logo} alt="logo" className={styles.logo} width={'187px'} height={'62px'} />
                            </a>
                        </div>
                        <div className="derPagos">
                            <img src={efecty} alt="logo" className={styles.logo} width={'100px'} height={'60px'} />
                            <img src={pse} alt="logo" className={styles.logo} width={'100px'} height={'60px'} />
                            <img src={visa} alt="logo" className={styles.logo} width={'100px'} height={'60px'} />
                            <img src={mastercard} alt="logo" className={styles.logo} width={'100px'} height={'60px'} />
                            <img src={americanexpress} alt="logo" className={styles.logo} width={'100px'} height={'60px'} />
                        </div>
                    </div>
                </div>
                <div className="filaMedia">
                    <div className="footerLogo">
                        <div className="izqIconsMedia">
                            {/* Facebook */}

                            <p>Síguenos</p>

                            <div className="iconsRedes">
                                <a href="https://Facebook.com/egoicolombia" target="_blank" rel="noreferrer"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1144_723)">
                                        <path d="M19.5 0.245117C20.7396 0.245117 21.7995 0.685221 22.6797 1.56543C23.5599 2.44564 24 3.50553 24 4.74512V19.7451C24 20.9847 23.5599 22.0446 22.6797 22.9248C21.7995 23.805 20.7396 24.2451 19.5 24.2451H16.5625V14.9482H19.6719L20.1406 11.3232H16.5625V9.01074C16.5625 8.42741 16.6849 7.98991 16.9297 7.69824C17.1745 7.40658 17.651 7.26074 18.3594 7.26074L20.2656 7.24512V4.01074C19.6094 3.91699 18.6823 3.87012 17.4844 3.87012C16.0677 3.87012 14.9349 4.28678 14.0859 5.12012C13.237 5.95345 12.8125 7.13053 12.8125 8.65137V11.3232H9.6875V14.9482H12.8125V24.2451H4.5C3.26042 24.2451 2.20052 23.805 1.32031 22.9248C0.440104 22.0446 0 20.9847 0 19.7451V4.74512C0 3.50553 0.440104 2.44564 1.32031 1.56543C2.20052 0.685221 3.26042 0.245117 4.5 0.245117H19.5Z" fill="#A2A1A7" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1144_723">
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.245117)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                </a>
                                {/* Instagram  */}
                                <a href="https://instagram.com/egoi_colombia" target="_blank" rel="noreferrer"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1144_717)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.05273 0.072C8.33236 0.0130909 8.74036 0 12 0C15.2596 0 15.6676 0.0141818 16.9462 0.072C18.2247 0.129818 19.0975 0.333818 19.8611 0.629455C20.6607 0.931636 21.3862 1.404 21.9862 2.01491C22.5971 2.61382 23.0684 3.33818 23.3695 4.13891C23.6662 4.90255 23.8691 5.77527 23.928 7.05164C23.9869 8.33346 24 8.74146 24 12C24 15.2596 23.9858 15.6676 23.928 16.9473C23.8702 18.2236 23.6662 19.0964 23.3695 19.86C23.0684 20.6608 22.5963 21.3864 21.9862 21.9862C21.3862 22.5971 20.6607 23.0684 19.8611 23.3695C19.0975 23.6662 18.2247 23.8691 16.9484 23.928C15.6676 23.9869 15.2596 24 12 24C8.74036 24 8.33236 23.9858 7.05273 23.928C5.77636 23.8702 4.90364 23.6662 4.14 23.3695C3.33919 23.0683 2.61362 22.5963 2.01382 21.9862C1.40332 21.3869 0.930889 20.6617 0.629455 19.8611C0.333818 19.0975 0.130909 18.2247 0.072 16.9484C0.0130909 15.6665 0 15.2585 0 12C0 8.74036 0.0141818 8.33236 0.072 7.05382C0.129818 5.77527 0.333818 4.90255 0.629455 4.13891C0.931334 3.33827 1.40413 2.61307 2.01491 2.01382C2.61386 1.40346 3.3387 0.931029 4.13891 0.629455C4.90255 0.333818 5.77636 0.130909 7.05273 0.072ZM16.8491 2.232C15.5836 2.17418 15.204 2.16218 12 2.16218C8.796 2.16218 8.41636 2.17418 7.15091 2.232C5.98036 2.28545 5.34545 2.48073 4.92218 2.64545C4.36255 2.86364 3.96218 3.12218 3.54218 3.54218C3.14405 3.92951 2.83765 4.40104 2.64545 4.92218C2.48073 5.34545 2.28545 5.98036 2.232 7.15091C2.17418 8.41636 2.16218 8.796 2.16218 12C2.16218 15.204 2.17418 15.5836 2.232 16.8491C2.28545 18.0196 2.48073 18.6545 2.64545 19.0778C2.83745 19.5982 3.144 20.0705 3.54218 20.4578C3.92945 20.856 4.40182 21.1625 4.92218 21.3545C5.34545 21.5193 5.98036 21.7145 7.15091 21.768C8.41636 21.8258 8.79491 21.8378 12 21.8378C15.2051 21.8378 15.5836 21.8258 16.8491 21.768C18.0196 21.7145 18.6545 21.5193 19.0778 21.3545C19.6375 21.1364 20.0378 20.8778 20.4578 20.4578C20.856 20.0705 21.1625 19.5982 21.3545 19.0778C21.5193 18.6545 21.7145 18.0196 21.768 16.8491C21.8258 15.5836 21.8378 15.204 21.8378 12C21.8378 8.796 21.8258 8.41636 21.768 7.15091C21.7145 5.98036 21.5193 5.34545 21.3545 4.92218C21.1364 4.36255 20.8778 3.96218 20.4578 3.54218C20.0705 3.14408 19.5989 2.83768 19.0778 2.64545C18.6545 2.48073 18.0196 2.28545 16.8491 2.232ZM10.4673 15.6993C11.3233 16.0556 12.2764 16.1037 13.1639 15.8353C14.0514 15.567 14.8182 14.9988 15.3334 14.2279C15.8485 13.457 16.0801 12.5311 15.9884 11.6085C15.8968 10.6858 15.4876 9.82361 14.8309 9.16909C14.4123 8.7507 13.906 8.43034 13.3487 8.23107C12.7914 8.0318 12.1968 7.95858 11.6078 8.01667C11.0188 8.07477 10.45 8.26274 9.94233 8.56705C9.43468 8.87136 9.00081 9.28445 8.67197 9.77657C8.34312 10.2687 8.12748 10.8276 8.04056 11.413C7.95365 11.9985 7.99762 12.596 8.16932 13.1624C8.34101 13.7288 8.63616 14.2501 9.03351 14.6888C9.43087 15.1275 9.92054 15.4726 10.4673 15.6993ZM7.63855 7.63855C8.2113 7.06579 8.89126 6.61146 9.6396 6.30149C10.3879 5.99151 11.19 5.83197 12 5.83197C12.81 5.83197 13.6121 5.99151 14.3604 6.30149C15.1087 6.61146 15.7887 7.06579 16.3615 7.63855C16.9342 8.2113 17.3885 8.89126 17.6985 9.6396C18.0085 10.3879 18.168 11.19 18.168 12C18.168 12.81 18.0085 13.6121 17.6985 14.3604C17.3885 15.1087 16.9342 15.7887 16.3615 16.3615C15.2047 17.5182 13.6359 18.168 12 18.168C10.3641 18.168 8.79528 17.5182 7.63855 16.3615C6.48182 15.2047 5.83197 13.6359 5.83197 12C5.83197 10.3641 6.48182 8.79528 7.63855 7.63855ZM19.536 6.75055C19.6779 6.61666 19.7916 6.45565 19.8701 6.27706C19.9487 6.09847 19.9907 5.90593 19.9935 5.71083C19.9964 5.51574 19.9601 5.32205 19.8867 5.14125C19.8134 4.96044 19.7045 4.79619 19.5665 4.65822C19.4285 4.52026 19.2643 4.41137 19.0835 4.33802C18.9027 4.26467 18.709 4.22834 18.5139 4.23118C18.3188 4.23403 18.1263 4.27599 17.9477 4.35458C17.7691 4.43317 17.6081 4.54679 17.4742 4.68873C17.2138 4.96476 17.0712 5.33141 17.0768 5.71083C17.0823 6.09026 17.2355 6.4526 17.5038 6.72092C17.7721 6.98924 18.1345 7.14243 18.5139 7.14796C18.8933 7.15349 19.26 7.01093 19.536 6.75055Z" fill="#A2A1A7" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1144_717">
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.245117)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                </a>
                            </div>



                        </div>
                        <div className="derApps">
                            <a href="https://play.google.com/store/apps/details?id=com.egoi_user.flutter" target="_blank" rel="noreferrer">
                                <img src={playstore} alt="logo" className={styles.logo} width={'180px'} height={'54px'} />

                            </a>
                            <a href="https://apps.apple.com/co/app/egoi/id6443907168" target="_blank" rel="noreferrer">
                                <img src={appstore} alt="logo" className={styles.logo} width={'180px'} height={'54px'} />
                            </a>

                        </div>
                    </div>
                </div>
                <div className="rowf">
                    <ul>
                        <li><strong>Atajos</strong></li>
                        <a href="/topFeatured"><li>Productos destacados </li></a>
                        <a href="/addRecently"><li>Últimos productos</li></a>
                        <a href="/bestSellers"><li>Productos más vendidos</li></a>
                        <a href="/topRated"><li>Productos mejor calificados</li></a>
                        <a href="/allBrands"><li>Todas las marcas </li></a>
                        <a href="/allCategories"><li>Todas las categorías </li></a>
                    </ul>
                    <ul>
                        <li><strong>Información sobre tu cuenta y el envío</strong></li>
                        <a href="#" onClick={handleInfoPerfil}><li>Información de tu perfil </li></a>
                        <a href="#" onClick={handleFavList}><li>Lista de deseos </li></a>
                        <a href="#" onClick={handleSeguirPedido}><li>Seguir tu pedido </li></a>
                        <a href="#" onClick={handleDireccion}><li>Dirección </li></a>
                        <a href="#" onClick={handleTicketSupport}><li>Ticket de soporte</li></a>
                    </ul>
                    <ul>
                        <li><strong>Sobre nosotros</strong></li>
                        <a href="/privacyPolicy"><li>Política de privacidad</li></a>
                        <a href="/termsAndConditions"><li>Términos y condiciones </li></a>
                        <a href="/contactUs"><li>Contáctanos </li></a>
                        <a href="/aboutUs"><li>Acerca de la empresa </li></a>
                        <a href="/"><li>Preguntas frecuentes</li></a>
                    </ul>
                    {/* <div className="bottom-right">
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <img src={superintendencia} alt="logo" className={styles.logo} width={'120px'} height={'36px'} />
                    </div> */}
                </div>
                <div className="row">
                    <div className="footerLogo">
                        <div className="izqIconsMedia">
                        </div>
                        <div className="iconICS" style={{ float: 'right' }}>
                            <a href="https://www.sic.gov.co" target="_blanck">
                                <img src={logoSIC} alt="logo" className={styles.logo} width={'240px'} height={'55px'} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                className="modal-dialog-centered modal-md"
                toggle={() => setModalViewLogin(false)}
                isOpen={modalViewLogin && !changeFormLogin}
            >
                <ModalBody>
                    <Login closeModalLogin={closeModalLogin} handleLogin={handleLogin} closeModalRegistro={closeModalRegistro} handleChangeFormLogin={handleChangeFormLogin} changeFormRegister={changeFormRegister} />
                </ModalBody>
            </Modal>
            <Modal
                className="modal-dialog-centered modal-md"
                toggle={() => setModalViewRegistro(false)}
                isOpen={modalViewRegistro && !changeFormRegister}
            >
                <ModalBody>
                    <Register closeModalRegistro={closeModalRegistro} handleChangeFormRegister={handleChangeFormRegister} />
                </ModalBody>
            </Modal>
        </footer>




    );
};

export default Footer;