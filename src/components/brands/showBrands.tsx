import React, { useEffect, useState } from 'react'
import { getAllBrands } from '../../services/brands'
import { Link } from 'react-router-dom';

const ShowBrandsComponent = () => {

    const [allBrands, setAllBrands] = useState([]);

    const getShowAllBrands = () => {
        getAllBrands()
            .then((res) => {
                console.log("Estas osn todas las marcas", res.data);
                setAllBrands(res.data);
            }).catch((err) => console.log(err));
    }

    const baseUrlImageBrand = "https://egoi.xyz/storage/app/public/brand/";

    useEffect(() => {
        getShowAllBrands();
    }, [])

    return (
        <div className='container'>
            <h4 className="mb-3" style={{ color: '#74737B' }}>Todas las marcas</h4>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {allBrands && allBrands.map((brand, index) => (
                    <div className="col" key={index}> {/* Agregamos key para evitar advertencias */}
                        <Link to={`/brand/${brand.name}/${brand.id}`} style={{textDecoration:"none"}}>
                            <a href="#" style={{ textDecoration: 'none', color: 'black' }}>
                                <div className="card">
                                    <img src={baseUrlImageBrand + brand.image} className="card-img-top" alt={`Imagen ${brand.image}`} style={{ width: '100%', height: '300px' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{brand.name}</h5> {/* Usar brand.name */}
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

export default ShowBrandsComponent
