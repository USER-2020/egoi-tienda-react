import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

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
import { subcategorieById } from '../../services/categories';
import { filterProductsRecents } from '../../services/filtros';

import { Display } from 'react-bootstrap-icons';
import { getBrandsByCategory } from '../../services/brands';


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


const HeaderCategories = ({handleClickFilterRecent, handleClickFilterZ_A, 
  handleClickFilterA_Z, handleClickFilterHigh_Low, handleClickFilterLow_High, 
  handleApplyRangeFilters, handlePriceStartChange,handlePriceEndChange, 
  priceStart, priceEnd, handleAplyFilterByBrand}) => {
// const HeaderCategories = ({onFilterCLick}) => {

 

  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [isOpen3, setIsOpen3] = useState<boolean>(false);


  const [brands, setBrands] = useState([]);
  const { category, subcategory, id, brandId } = useParams();
 
  const ref1 = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref1, ()=> setIsOpen1(false));
  const ref2 = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref2, ()=> setIsOpen2(false));
  const ref3 = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref3, ()=> setIsOpen3(false));

 
  const brandsBySubcategory = (id) =>{
    getBrandsByCategory(id)
    .then((res)=>{
      console.log(res);
      setBrands(res.data);
      console.log("Carga de marcas por categoria-subcategoria", brands);
    })
    .catch((err) => console.log(err));
  }
  
  // const [selectedFiltersRecent, setSelectedFiltersRecent] = useState('');


  // setSelectedFiltersRecent('recent');

  // const productsBySubcategoryWithFilter = (id, sort) => {
  //   if(sort = 'recent'){
  //     filterProductsRecents(id)
  //     .then((res)=>{
  //       console.log(res);
  //       setProducts(res.data);
  //       console.log("Productos filtrados por mas reciente", products);
  
  //     })
  //     .catch((err)=> console.log(err));
  //   }else{
  //     subcategorieById(id)
  //     .then((res) => {
  //       console.log(res);
  //       setProducts(res.data);
  //       console.log("Productos por el id", products);
  //     })
  //     .catch((err) => console.log(err));
  
  //   }
  //   };
    
  //   useEffect(()=>{
  //     if(id){
  //       productsBySubcategoryWithFilter(id, sort);
  //     }
  //   }, [id, sort]);

  useEffect(()=>{
    if(id || brandId){
      brandsBySubcategory(id);
    }
  },[id, brandId]);
 

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
                  {brands.length ? (
                      brands.map((brand, index) => (
                        <button key={index}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleAplyFilterByBrand}/>
                            <span>{brand.name}</span>
                        </button>
                        ))
                        ):(
                          <span>No hay marcas asociadas</span>
                        )}
                    {/* <button>
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
                    </button> */}
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
                          <input type="number" placeholder='Ej: 5000' 
                          className='inputPrecio'
                          value={priceStart}
                          onChange={handlePriceStartChange}/>
                        </div>
                        <h1>-</h1>
                        <div className="hasta">
                          Hasta
                          <input type="number" placeholder='Ej: 8000' 
                          className='inputPrecio'
                          value={priceEnd}
                          onChange={handlePriceEndChange}/>
                        </div> 
                      </div>
                      <button className='btnAplicar' onClick={handleApplyRangeFilters}>Aplicar</button>
                    </div>
                  </div>
                </div>
              </li>
              {/* <li><a href='#'>Ordenar por</a></li> */}
              <li>
              <div ref = {ref3} className={`dropdown ${isOpen3 ? "open" : ""}`}>
                  <button onClick={() => setIsOpen3(!isOpen3)}>
                    <span>Ordenar por</span>
                    {/* <Icon>
                      {isOpen ? "close" : "expand_more"}
                    </Icon> */}
                  </button>
                  <div className="menu3">
                    <div className="containerPersonalizado2">
                      
                        <h5>Precio</h5>
                        <button onClick={handleClickFilterLow_High}><strong><h6>Del más bajo al más alto</h6></strong></button>
                        <button onClick={handleClickFilterHigh_Low}><strong><h6>Del más alto al más bajo</h6></strong></button>
                        <h5>En orden alfabético</h5>
                        <button onClick={handleClickFilterA_Z}><strong><h6>De la A - Z</h6></strong></button>
                        <button onClick={handleClickFilterZ_A}><strong><h6>De la Z - A</h6></strong></button>
                        <h5>Otros</h5>
                        <button onClick={handleClickFilterRecent}><strong><h6>El más reciente</h6></strong></button>
                        
                         {/* <h5>Precio</h5>
                        <button onClick={() => onFilterCLick('L-H')}><strong><h6>Del más bajo al más alto</h6></strong></button>
                        <button onClick={() => onFilterCLick('H-L')}><strong><h6>Del más alto al más bajo</h6></strong></button>
                        <h5>En orden alfabético</h5>
                        <button onClick={() => onFilterCLick('A-Z')}><strong><h6>De la A - Z</h6></strong></button>
                        <button onClick={() => onFilterCLick('Z-A')}><strong><h6>De la Z - A</h6></strong></button>
                        <h5>Otros</h5>
                        <button onClick={() => onFilterCLick('recent')}><strong><h6>El más reciente</h6></strong></button>
                         */}
                        
                        
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
