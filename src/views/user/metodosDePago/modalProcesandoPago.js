import React from 'react'
import { ThreeDots } from 'react-loader-spinner';

function ModalProcesandoPago() {
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'center', alignSelf:'center', alignItems:'center'}}>
      <h2>Procesando pago</h2>
      <ThreeDots height={80} width={80} color="#FC5241"/>
    </div>
  )
}

export default ModalProcesandoPago
