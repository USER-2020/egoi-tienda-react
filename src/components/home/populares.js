import React from 'react';
import '../../styles/tiendasPopulares.css';
import verification from '../../assets/Verification.png';
import velez from '../../assets/velez.png';
import logoVelez from '../../assets/velezPNG.png';
import pacoR from '../../assets/pacorabanne.png';
import logoPacoR from '../../assets/pacorabannePNG.png';
import rayban from '../../assets/reiban.png';
import logoRayban from '../../assets/raybanPNG.png';
import tossit from '../../assets/tisot.png';
import logoTossit from '../../assets/tissotPNG.png';

const Populares = () => {
  return (
    <div className='container'>
      <div className='containerTiendasPopulares'>
        <div className='spanRecent'>
                <img src={verification}/>
                <h4>Tiendas populares</h4>
                <a href='#' className='refshowAll'>
                    Ver todos
                </a>
            </div>
            <div className='containerTiendas'>
                <div className='container1'>
                    <img src={velez} className='imgFondo'/>
                    <div className='div1'>
                        <img src={logoVelez} className='imgLogo'/>

                        <div className='div2'>
                            <span className='spanText'>
                                Velez
                            </span>
                            <a href='#' className='enlaceTienda'>
                                Ver Tienda
                            </a>
                        </div>
                    </div>
                    
                </div>

                <div className='container1'>
                    <img src={pacoR} className='imgFondo'/>
                    <div className='div1'>
                        <img src={logoPacoR} className='imgLogo'/>

                        <div className='div2'>
                            <span className='spanText'>
                                Paco Rabanne
                            </span>
                            <a href='#' className='enlaceTienda'>
                                Ver Tienda
                            </a>
                        </div>
                    </div>
                    
                </div>

                <div className='container1'>
                    <img src={rayban} className='imgFondo'/>
                    <div className='div1'>
                        <img src={logoRayban} className='imgLogo'/>

                        <div className='div2'>
                            <span className='spanText'>
                                Ray-ban
                            </span>
                            <a href='#' className='enlaceTienda'>
                                Ver Tienda
                            </a>
                        </div>
                    </div>
                    
                </div>

                <div className='container1'>
                    <img src={tossit} className='imgFondo'/>
                    <div className='div1'>
                        <img src={logoTossit} className='imgLogo'/>

                        <div className='div2'>
                            <span className='spanText'>
                                TISSOT
                            </span>
                            <a href='#' className='enlaceTienda'>
                                Ver Tienda
                            </a>
                        </div>
                    </div>
                    
                </div>
            </div>
      </div>
    </div>
    
  )
}

export default Populares
