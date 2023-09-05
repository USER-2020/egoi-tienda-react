import React, { useEffect, useState } from 'react'
import { getPoliticasPrivacidad } from '../services/sobreNosotros';
import parse  from 'html-react-parser';

const PoliticaPrivacidadComponent = () => {
    const [data, setData] = useState('');

    const polticsAndPrivacity = () => {
        getPoliticasPrivacidad()
        .then((res)=>{
            setData(res.data.data);
        }).catch((Err)=>console.log(Err));
    }

    useEffect(()=>{
        polticsAndPrivacity();
    },[])
    return (
        <div className="container for-container rtl" style={{textAlign: 'left'}}>
            <h2 className="text-center headerTitle">Política de privacidad</h2>
            <div className="for-padding">
                {parse(data)}
            </div>
        </div>
    )
}

export default PoliticaPrivacidadComponent
