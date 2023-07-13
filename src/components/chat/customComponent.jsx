import React from 'react';

const CustomComponent = ({ data }) => {
  return (
    <div>
      <h3>Historial de mensajes:</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomComponent;
