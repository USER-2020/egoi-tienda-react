import React, { useEffect, useState } from 'react'
import { allCategories } from '../../services/categories';
import { Link } from 'react-router-dom';

const ShowCategoriesComponent = () => {
    const [allCategory, setAllCategory ] = useState([]);

    const baseUrlImage = "https://egoi.xyz/storage/app/public/category/";

    const getAllCategories = () =>{
        allCategories()
        .then((res)=>{
            console.log("estas son todas las categorias", res.data);
            setAllCategory(res.data);
        }).catch((err)=> console.log(err));
    }

    useEffect(()=>{
        getAllCategories();
    },[]);

  return (
    <div className='container'>
      <h4 className="mb-3" style={{ color: '#74737B' }}>Todas las categorias</h4>
            <div className="row row-cols-1 row-cols-md-5 g-4">
                {allCategory && allCategory.map((category, index) => (
                    <div className="col" key={index}> {/* Agregamos key para evitar advertencias */}
                        <Link to={`/categories/${category.name}/${category.name}/${category.id}`} style={{textDecoration:"none"}}>
                            <a href="#" style={{ textDecoration: 'none', color: 'black' }}>
                                <div className="card" style={{height:'300px'}}>
                                    <img src={baseUrlImage + category.icon} className="card-img-top" alt={`Imagen ${category.icon}`} style={{ width: '100%', height: '200px' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{category.name}</h5> {/* Usar category.name */}
                                        {/* <p className="card-text">Contenido de la tarjeta {index + 1}.</p> */}
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                ))}

            </div>
    </div>
  )
}

export default ShowCategoriesComponent
