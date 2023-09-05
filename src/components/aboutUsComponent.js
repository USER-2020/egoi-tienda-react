import React, { useEffect, useState } from 'react'
import { getAcercadeEmpresa } from '../services/sobreNosotros';
import parse from 'html-react-parser';

const AboutUsComponent = () => {

    const [data, setData] = useState('');
    const [formattedDescription, setFormattedDescription]= useState('');


    const aboutUsInterprise = () => {
        getAcercadeEmpresa()
            .then((res) => {
                // console.log(res.data.data);
                setData(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        aboutUsInterprise();
        
    }, []);

    return (
        <div className="container for-container rtl" style={{ textAlign: 'left' }}>
            <h2 className="text-center headerTitle">Acerca de nuestra empresa</h2>
            <div className="for-padding">
                {parse(data)}
            </div>
        </div>
    )
}

export default AboutUsComponent
