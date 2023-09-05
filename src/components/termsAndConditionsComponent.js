import React, { useEffect, useState } from 'react'
import { getTerminosCondiciones } from '../services/sobreNosotros';
import parse from 'html-react-parser';

const TermsAndConditionsComponent = () => {

  const [data ,setData] = useState('');

  const termsAndConditionsInterprise = () => {
    getTerminosCondiciones()
    .then((res)=>{
      console.log(res.data.data);
      setData(res.data.data);
    }).catch((err)=>console.log(err));
  }

  useEffect(()=>{
    termsAndConditionsInterprise();
  },[]);

  return (
    <div class="container for-container rtl" style={{textAlign: 'left'}}>
      <h2 class="text-center headerTitle">Términos y condiciones</h2>
      <div class="for-padding">
        {parse(data)}
      </div>
    </div>
  )
}

export default TermsAndConditionsComponent
