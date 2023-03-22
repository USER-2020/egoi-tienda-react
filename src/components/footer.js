import React, { useState } from "react";
import styles from "../styles/navbar.css";
import logo from "../assets/logo.png";

const Footer = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return(
        <footer>
            <div className="row">
                <div className="footerLogo">
                    <div className="izq">
                        <img src={logo} alt="logo" className={styles.logo} width={'187px'} height={'62px'}/>
                    </div>
                    <div className="der">
                        <img src={logo} alt="logo" className={styles.logo} width={'187px'} height={'62px'}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <h1>Div21</h1>
            </div>
            <div className="row">
                <h1>Div31</h1>
            </div>
        </footer>
    );
};

export default Footer;