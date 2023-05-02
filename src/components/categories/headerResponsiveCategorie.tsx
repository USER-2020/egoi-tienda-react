import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Modal , ModalBody , Card} from 'reactstrap';

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



const Icon: FC<PropsWithChildren> = ({children}) => <i>{children}</i>

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

  const HeaderResponsiveCategorie = () => {

  
    const { category, subcategory } = useParams();
    // console.log(category)
    // console.log(subcategory)
  
    const [modalMarca, setModalMarca]= useState(false);
    const [modalPrecio, setModalPrecio]= useState(false);
    const [modalOrdenar, setModalOrdenar]=useState(false);

    /**
     * The function toggles the value of a modal state variable.
     */
    const toggleMarca = () => setModalMarca(!modalMarca);
    const togglePrecio = () => setModalPrecio(!modalPrecio);
    const toggleOrdenar = () => setModalOrdenar(!modalOrdenar)
    


    return (

    <div className='containerHeaderResponsiveCategorie'>
      <div className='container'>
        {/* Nombre de la categoria  */}
        <h3 className='nameCategory'>{subcategory}</h3>

        <div className='card categoriesCard'>
            <ul>
              <li>
                <a onClick={toggleMarca}>Marcas</a>
                <Modal isOpen={modalMarca} toggle={toggleMarca} className='modal-bottom'>
                  <ModalBody>
                    <h4>Filtrar por marca</h4>
                    <div className="containerModalMarca">
                      <div className="opcion">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <span>IPhone</span>
                      </div>
                      <div className="opcion">
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
                      
                      <button className='btnFilter'>Aplicar Filtro</button>
                    </div>
                  </ModalBody>
                </Modal>
              </li>     
              
              <li>
                <a onClick={togglePrecio}>Precio</a>
                <Modal isOpen={modalPrecio} toggle={togglePrecio} className='modal-bottom'>
                  <ModalBody>
                  <h4>Filtrar por precio</h4>
                  <div className="menu2">
                    <div className='containerPersonalizado'>
                      <div className="containerPrecios">
                        <div className="desde">
                          
                          <input type="number" placeholder='Ej: 5000' className='inputPrecio'/>
                        </div>
                        <h1>-</h1>
                        <div className="hasta">
                          
                          <input type="number" placeholder='Ej: 8000' className='inputPrecio'/>
                        </div> 
                      </div>
                      <button className='btnFilter'>Aplicar Filtro</button>
                    </div>
                  </div>
                  </ModalBody>
                </Modal>
              </li>
              
              <li>
                <a onClick={toggleOrdenar}>Ordenar por</a>
                <Modal isOpen={modalOrdenar} toggle={toggleOrdenar} className='modal-bottom'>
                  <ModalBody>
                    <h4>Ordenar por</h4>
                    <div className="containerModalOrdenar">
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Selecciona ...</option>
                        <option value="1">Del más bajo al más alto</option>
                        <option value="2">Del más alto al más bajo</option>
                        <option value="3">De la A - Z</option>
                        <option value="4">De la Z - A</option>
                        <option value="5">El más reciente</option>
                        
                      </select>
                    </div>
                  </ModalBody>

                </Modal>
              </li>
              
            </ul>
              
        </div>
                  
      </div>
    </div>
      
    )
  } 

  export default HeaderResponsiveCategorie;
