import React, { useEffect, useState } from 'react'
import { getPreguntasFrecuentes } from '../services/sobreNosotros';
import parse from 'html-react-parser';

const PreguntasFrecuentes = () => {

    const [data ,setData] = useState('');

    const getFAQ = ()=>{
        getPreguntasFrecuentes()
        .then((res)=>{
            console.log(res.data.data);
            setData(res.data.data);
        }).catch((err)=>console.log(err));
    }

    useEffect(()=>{
        getFAQ();
    },[]);

    return (
        <div class="container for-container rtl" style={{ textAlign: 'left' }}>
            <h2 class="text-center headerTitle">Preguntas frecuentes</h2>
            <div class="for-padding">
                {parse(data)}
            </div>
        </div>
    )
}

export default PreguntasFrecuentes
