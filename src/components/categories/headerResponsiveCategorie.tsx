import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Modal, ModalBody, Card } from 'reactstrap';

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
import category from '../../views/category'
import { subcategorieById } from '../../services/categories';
import { getBrandsByCategory } from '../../services/brands';



const Icon: FC<PropsWithChildren> = ({ children }) => <i>{children}</i>

// const useOnClickOutside= (
//   ref: RefObject<HTMLDivElement>,
//   handler: MouseEventHandler<HTMLButtonElement>
// )=>{
//   useEffect(() => {
//     const listener = (event: any)=>{
//       if(!ref.current || ref.current.contains(event.target)){
//         return;
//       }
//       handler(event);
//     };
//     document.addEventListener("mousedown", listener);
//     document.addEventListener("touchstart", listener);
//     return()=>{
//       document.removeEventListener("mousedown", listener);
//       document.removeEventListener("touchstart", listener);
//     };
//   }, [ref, handler]);
// }

// function ModalMarca({onClose}){
//     const [checkboxes, setCheckboxes] = useState([
//       {id: 1, label:'Iphone', checked:false},
//       {id: 2, label:'Samsung', checked:false},
//       {id: 3, label:'Huawei', checked:false},
//       {id: 4, label:'Motorola', checked:false},
//       {id: 5, label:'Nokia', checked:false}
//     ]);

//     function handleCheckboxChange(id) {
//       setCheckboxes(prevCheckboxes =>
//         prevCheckboxes.map(checkbox =>
//           checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
//         )
//       );
//     }

//     return(
//       <div className="modal">
//         <div className="modal-content">
//           <div className="modal-header">
//             <button onClick={onClose} className='close-button'>
//               X
//             </button>
//           </div>
//           <div className="modal-body">
//             <ul>
//               {checkboxes.map(checkbox=>(
//                 <li key={checkbox.id}>
//                   <label>
//                     <input 
//                     type="checkbox" 
//                     onChange={()=> handleCheckboxChange(checkbox.id)}
//                     checked= {checkbox.checked}/>
//                     {checkbox.label}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     )
// }

const HeaderResponsiveCategorie = ({
  handleClickFilterRecent,
  handleClickFilterHigh_Low,
  handleClickFilterLow_High,
  handleClickFilterA_Z,
  handleClickFilterZ_A,
  priceStart,
  priceEnd,
  handlePriceStartChange,
  handlePriceEndChange,
  handleApplyRangeFilters
}) => {


  const { category, subcategory, id, brandId } = useParams();
  // console.log(category)
  // console.log(subcategory)

  const [modalMarca, setModalMarca] = useState(false);
  const [modalPrecio, setModalPrecio] = useState(false);
  const [modalOrdenar, setModalOrdenar] = useState(false);
  const [fichaDeFiltros, setFichaDeFiltros]= useState(false);

  /**
   * The function toggles the value of a modal state variable.
   */
  const toggleMarca = () => {setModalMarca(!modalMarca); setFichaDeFiltros(true);}
  const togglePrecio = () => {setModalPrecio(!modalPrecio); setFichaDeFiltros(true);}
  const toggleOrdenar = () => {setModalOrdenar(!modalOrdenar); setFichaDeFiltros(true);}

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [orderBy, setOrderBy] = useState([]);

  // const productsBySubcategory =(id) =>{
  //   subcategorieById(id)
  //   .then((res)=>{
  //     console.log(res);
  //     setProducts(res.data);
  //     console.log("Productos por categoria desde el responsive", res.data.products);
  //   })
  // }

  // useEffect(()=>{
  //   if(id){
  //     productsBySubcategory(id)
  //   }
  // },[id]);

  const brandsBySubcategory = (id) => {
    getBrandsByCategory(id)
      .then((res) => {
        console.log(res);
        setBrands(res.data);
        console.log("Carga de marcas por categoria-subcategoria responsive", brands);
      })
      .catch((err) => console.log(err));
  }

  const handleChangeOrder = (e) => {
    const valueOrder = e.target.value;
    switch (valueOrder) {
      case "low_high":
        handleClickFilterLow_High();
        break;
      case "high_low":
        handleClickFilterHigh_Low();
        break;
      case "a_z":
        handleClickFilterA_Z();
        break;
      case "z_a":
        handleClickFilterZ_A();
        break;
      case "recent":
        handleClickFilterRecent();
        break;
      default:
        break;
    }
    setOrderBy(valueOrder);
  }

  useEffect(() => {
    if (id) {
      brandsBySubcategory(id);
    }
  }, [id]);

  return (

    <div className='containerHeaderResponsiveCategorie'>
      <div className='container'>
        {/* Nombre de la categoria  */}
        <h3 className='nameCategory'>{subcategory}</h3>

        <div className='card categoriesCard'>
          <ul>
            <li>
              <a onClick={toggleMarca}>Marcas
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
                </svg>
              </a>
              <Modal isOpen={modalMarca} toggle={toggleMarca} className='modal-bottom'>
                <ModalBody>
                  <h4>Filtrar por marca</h4>
                  <div className="containerModalMarca">
                    {brands.length ? (
                      brands.map((brand, index) => (
                        <div className="opcion" key={index}>
                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                          <span>{brand.name}</span>
                        </div>
                      ))
                    ) : (
                      <span>No hay marcas asociadas</span>
                    )}
                    {/* <div className="opcion">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <span>Samsung</span>
                      </div>
                      <div className="opcion">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <span>Huawei</span>
                      </div>
                      <div className="opcion">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <span>Motorola</span>
                      </div>
                      <div className="opcion">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <span>Nokia</span>
                      </div>
                       */}
                    <button className='btnFilter'>Aplicar Filtro</button>
                  </div>
                </ModalBody>
              </Modal>
            </li>

            <li>
              <a onClick={togglePrecio}>Precio
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
                </svg>
              </a>
              <Modal isOpen={modalPrecio} toggle={togglePrecio} className='modal-bottom'>
                <ModalBody>
                  <h4>Filtrar por precio</h4>
                  <div className="menu2">
                    <div className='containerPersonalizado'>
                      <div className="containerPrecios">
                        <div className="desde">

                          <input type="number" placeholder='Ej: 5000'
                            className='inputPrecio'
                            value={priceStart}
                            onChange={handlePriceStartChange} />
                        </div>
                        <h1>-</h1>
                        <div className="hasta">

                          <input type="number" placeholder='Ej: 8000'
                            className='inputPrecio'
                            value={priceEnd}
                            onChange={handlePriceEndChange} />
                        </div>
                      </div>
                      <button className='btnFilter' onClick={handleApplyRangeFilters} >Aplicar Filtro</button>
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </li>

            <li>
              <a onClick={toggleOrdenar}>Ordenar por
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
                </svg>
              </a>
              <Modal isOpen={modalOrdenar} toggle={toggleOrdenar} className='modal-bottom'>
                <ModalBody>
                  <h4>Ordenar por</h4>
                  <div className="containerModalOrdenar">
                    <select className="form-select" aria-label="Default select example" onChange={handleChangeOrder}>
                      <option selected>Selecciona ...</option>
                      <option value="low_high" >Del más bajo al más alto</option>
                      <option value="high_low" >Del más alto al más bajo</option>
                      <option value="a_z" >De la A - Z</option>
                      <option value="z_a" >De la Z - A</option>
                      <option value="recent" >El más reciente</option>

                    </select>
                  </div>
                </ModalBody>

              </Modal>
            </li>

          </ul>

          <hr />
          {fichaDeFiltros ? (
            <div className="filterSelected">
              <div className="containerMarca">
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </a>
                <p className='titleFilter'>Marca: </p>
                <p><strong>Marca Seleccionada</strong></p>
              </div>
              <div className="containerPrecio">
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </a>
                <p className='titleFilter'>Desde: </p>
                <p><strong>${priceStart}</strong></p>
                <p className='titleFilter'>Hasta: </p>
                <p><strong>${priceEnd}</strong></p>
              </div>
              <div className="containerOrdenar">
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </a>
                <p className='titleFilter'>Ordenar: </p>
                <p><strong>{orderBy}</strong></p>
              </div>
            </div>
          ) : (
            <div>
              <p>No hay ningun filtro seleccionado</p>
            </div>
          )}

        </div>

      </div>
    </div>

  )
}

export default HeaderResponsiveCategorie;
