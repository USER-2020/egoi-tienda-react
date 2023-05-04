import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import '../../styles/headerCategories.css'

import {
  FC, 
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useRef,
  useState
} from "react"


const Icon: FC<PropsWithChildren> = ({children}) => <i>{children}</i>

const useOnClickOutside= (
  ref: RefObject<HTMLDivElement>,
  handler: MouseEventHandler<HTMLButtonElement>
)=>{
  useEffect(() => {
    const listener = (event: any)=>{
      if(!ref.current || ref.current.contains(event.target)){
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return()=>{
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const HeaderCategories = () => {

  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [isOpen3, setIsOpen3] = useState<boolean>(false);
  // const { match } = props;
  // const category  = props.match ? props.match.params : '';
  // const subcategory = props.match ? props.match.params : '';
  const { category, subcategory, id } = useParams();
  console.log(category)
  console.log(subcategory)
  // console.log(id)
  // const [buttonsState, setButtonsState] = useState({
  //   brands:false,
  //   price:false,
  //   sortBy:false,
  // })
  const ref1 = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref1, ()=> setIsOpen1(false));
  const ref2 = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref2, ()=> setIsOpen2(false));
  const ref3 = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref3, ()=> setIsOpen3(false));

    // type IconProps = {
    // children:ReactNode;
    // className?: string;
    // iconRef?: RefObject<HTMLSpanElement>;
    // }

    // const Icon: FC<IconProps> = ({
    // children, iconRef, className}) => (
    //   <span>{children}</span>
    //   );
  
    // const buttonRef = useRef<HTMLButtonElement>(null);
    // const chevronRef = useRef<HTMLSpanElement>(null);
    // const [isOpen, setIsOpen] = useState<boolean>(false);
    // const [menuTop, setMenuTop] = useState<string>();
    // const [menuRight, setMenuRight] = useState<string>();

    // const handleClick = () => {
    //   const buttonRect = buttonRef?.current?.getBound
    // }

  return (

  <div className='containerHeaderCategorie'>
    <div className='containerHeaderFull'>
      <div className='container'>
        {/* Nombre de la categoria  */}
        <h3 className='nameCategory'>{subcategory}</h3>

        <div className='card categoriesCard'>
            <ul>
              {/* <li><a href='#'>Marcas</a></li> */}
              <li>
                <div ref = {ref1} className={`dropdown ${isOpen1 ? "open" : ""}`}>
                  <button onClick={() => setIsOpen1(!isOpen1)}>
                    <span>Marcas</span>
                    {/* <Icon>
                      {isOpen ? "close" : "expand_more"}
                    </Icon> */}
                  </button>
                  <div className="menu">
                    <button>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                      <span>IPhone</span>
                    </button>
                    <button>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                      <span>Samsung</span>
                    </button>
                    <button>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                      <span>Huawei</span>
                    </button>
                    <button>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                      <span>Motorola</span>
                    </button>
                    <button>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                      <span>Nokia</span>
                    </button>
                  </div>
                </div>
              </li>
              {/* <li><a href='#'>Precio</a></li> */}
              <li>
              <div ref = {ref2} className={`dropdown ${isOpen2 ? "open" : ""}`}>
                  <button onClick={() => setIsOpen2(!isOpen2)}>
                    <span>Precio</span>
                    {/* <Icon>
                      {isOpen ? "close" : "expand_more"}
                    </Icon> */}
                  </button>
                  <div className="menu2">
                    <div className='containerPersonalizado'>
                      <div className="containerPrecios">
                        <div className="desde">
                          Desde
                          <input type="number" placeholder='Ej: 5000' className='inputPrecio'/>
                        </div>
                        <h1>-</h1>
                        <div className="hasta">
                          Hasta
                          <input type="number" placeholder='Ej: 8000' className='inputPrecio'/>
                        </div> 
                      </div>
                      <button className='btnAplicar'>Aplicar</button>
                    </div>
                  </div>
                </div>
              </li>
              {/* <li><a href='#'>Ordenar por</a></li> */}
              <li>
              <div ref = {ref3} className={`dropdown ${isOpen3 ? "open" : ""}`}>
                  <button onClick={() => setIsOpen3(!isOpen3)}>
                    <span>Ordenar Por</span>
                    {/* <Icon>
                      {isOpen ? "close" : "expand_more"}
                    </Icon> */}
                  </button>
                  <div className="menu3">
                    <div className="containerPersonalizado2">
                        <h5>Precio</h5>
                        <button><strong><h6>Del más bajo al más alto</h6></strong></button>
                        <button><strong><h6>Del más alto al más bajo</h6></strong></button>
                        <h5>En orden alfabético</h5>
                        <button><strong><h6>De la A - Z</h6></strong></button>
                        <button><strong><h6>De la Z - A</h6></strong></button>
                        <h5>Otros</h5>
                        <button><strong><h6>El más reciente</h6></strong></button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
              
        </div>
      </div>
    </div>
  </div>
    
  )
} 

export default HeaderCategories;
