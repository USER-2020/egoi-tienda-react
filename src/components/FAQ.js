import React, { useEffect, useState } from 'react';
import { getPreguntasFrecuentes } from '../services/sobreNosotros';
import parse from 'html-react-parser';

const PreguntasFrecuentes = () => {
    const [data, setData] = useState([]);

    const getFAQ = () => {
        getPreguntasFrecuentes()
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getFAQ();
    }, []);

    return (
        <div className="container for-container rtl" style={{ textAlign: 'left' }}>
            <h2 className="text-center headerTitle">Preguntas frecuentes</h2>
            <div className="for-padding">
                {data && data.length > 0 ? (
                    // Mapea los datos para renderizar preguntas frecuentes
                    data.map((dato, index) => (
                        <div key={index}>
                            {/* Renderiza el contenido de la pregunta utilizando parse */}
                            {dato.question}- {dato.answer}
                        </div>
                    ))
                ) : (
                    <p>No hay preguntas registradas</p>
                )}
            </div>
        </div>
    );
};

export default PreguntasFrecuentes;
