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

const Bannerdown = () => {
  return (
    <div className='container'>
      <div className='container1'>

      
        <img src={bannerDown} className='bannerDownImg'/>
        <div className='figures'>
            <div className='aplicaciones'>
                <span className='span1'>
                    Descarga ahora el app de Egoi
                    en tu dispositivo favorito
                </span>
                <span className='span2'>
                    Y obtén un descuento del 10%
                    en tu primera compra
                </span>
                <span className='span3'>
                    <a href='#'>
                        <img src={appStore}/>
                    </a>
                    <a href='#'>
                        <img src={googleStore}/>
                    </a>
                </span>
            </div>
            <div className='diamond'>
                <img src={diamond}/>
            </div>
            <div className='triangle'>
                <img src={triangle}/>
            </div>
            <div className='circle'>
                <img src={circle}/>
            </div>
            <div className='ball'>
                <img src={ball}/>
            </div>
            <div className='smallball1'>
                <img src={smallBall}/>
            </div>
            <div className='smallball2'>
                <img src={smallBall}/>
            </div>
        </div>
      </div>
      </div>
    
  )
}

export default Bannerdown
