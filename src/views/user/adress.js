import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import es from "react-phone-input-2/lang/es.json";
import '../../styles/detailsCart.css';

function AdressCheckout({closeModalAddress}) {

    const {
        reset,
        formState: { errors },
      } = useForm();

    const [selectedLink, setSelectedLink] = useState('hogar');
    const [contactPersonName, setContactPersonName ] = useState("");
    const [addressType, setAddressType ] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setphone] = useState("");
    const [phone2, setphone2] = useState("");
    const [country, setCountry] = useState("");
    const [latitude, setLatitude ] = useState("");
    const [longitude, setLongitude]= useState("");
    const [loading, setLoading] = useState(false);

    const onSubmmit = (data)=>{
        setLoading(true);
        Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso!',
            text: 'El registro ha sido completado exitosamente',
            confirmButtonColor:'#0d6efd',
        });
        setLoading(false);
        closeModalAddress();
    }

    const handleLinkClick = (link) => {
        setSelectedLink(link);
      };



  return (
    <>
    <Row>
        <Col id='modalAddress'>
            <div style={{ paddingLeft: "2%", paddingRight: "2%" , marginBottom:'10px'}}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h5 style={{ color: "#fc5241", marginBottom:"20px" }}>Direccion de entrega</h5>
            </div>
            <Card style={{border:'none'}}>
                <Form>

                    {/* Tipo de direccion  */}
                    {/* <FormGroup controlId = "formAddressType">
                        <Input addon={true}
                        name="addressType"
                        classNanme="form-control"
                        style={{
                            borderRadius: "50px",
                        }}
                        placeholder="Tipo de direcccion"
                        value={contactPersonName}
                        />

                    </FormGroup> */}
                    <div className='tipoDireccion' style={{display:'flex', flexDirection:'row', justifyContent:'space-around', width:'100%', height:'48px'}}>
                        <a href='#' style={{width:'100px',
                          backgroundColor: selectedLink === 'hogar' ? '#FC5241' : 'white', 
                          textDecoration:'none', color: selectedLink === 'hogar' ? 'white' : 'black', 
                          height:'30px', 
                          alignSelf:'center', 
                          textAlign:'center', 
                          borderRadius:'12px',
                         }}
                         onClick={()=>handleLinkClick('hogar')}
                         >
                            Hogar
                        </a>
                        <a href='#' style={{width:'100px',
                          backgroundColor: selectedLink === 'trabajo' ? '#FC5241' : 'white', 
                          textDecoration:'none', color: selectedLink === 'trabajo' ? 'white' : 'black', 
                          height:'30px', 
                          alignSelf:'center', 
                          textAlign:'center', 
                          borderRadius:'12px',
                         }}
                         onClick={()=>handleLinkClick('trabajo')}
                         >
                            Trabajo
                        </a>
                        <a href='#' style={{width:'100px',
                          backgroundColor: selectedLink === 'otro' ? '#FC5241' : 'white', 
                          textDecoration:'none', color: selectedLink === 'otro' ? 'white' : 'black', 
                          height:'30px', 
                          alignSelf:'center', 
                          textAlign:'center', 
                          borderRadius:'12px',
                         }}
                         onClick={()=>handleLinkClick('otro')}
                         >
                            Otro
                        </a>
                    </div>
        
                    
                    {/* Nombre  */}
                    <FormGroup controlId = "formBasicName">
                        <Input addon={true}
                        name="contactPersonName"
                        classNanme="form-control"
                        style={{
                            borderRadius: "50px",
                        }}
                        placeholder="Nombre de contacto"
                        value={contactPersonName}
                        />

                    </FormGroup>

                    <FormGroup controlId = "formBasicDireccion">
                        <Input addon={true}
                        name="address"
                        classNanme="form-control"
                        style={{
                            borderRadius: "50px",
                        }}
                        placeholder="Direccion"
                        value={address}
                        />

                    </FormGroup>

                    <FormGroup controlId = "formBasicCountry">
                        <Input addon={true}
                        name="country"
                        classNanme="form-control"
                        style={{
                            borderRadius: "50px",
                        }}
                        placeholder="Pais"
                        value={country}
                        />

                    </FormGroup>

                    <FormGroup controlId = "countryAndZip" style={{display:'flex', flexDirection:'row', gap:'10px'}}>
                        
                        <Input addon={true}
                        name="city"
                        classNanme="form-control"
                        style={{
                            borderRadius: "50px",
                        }}
                        placeholder="Ciudad"
                        value={city}
                        />

                        <Input addon={true}
                        name="zip"
                        classNanme="form-control"
                        style={{
                            borderRadius: "50px",
                        }}
                        placeholder="Departamento"
                        value={zip}
                        />

                    </FormGroup>

                    <FormGroup controlId="formBasicCellphone1">
                        <PhoneInput
                        localization={es}
                        country={"co"}
                        value={phone}
                        inputStyle={{
                            width: "100%",
                            height: "10px",
                            borderRadius: "50px",
                            outline: "none",
                            ":focus": {
                            borderRadius: "50px",
                            },
                        }}
                        />
                    </FormGroup>

                    <FormGroup controlId="formBasicCellphone2">
                        <PhoneInput
                        localization={es}
                        country={"co"}
                        value={phone2}
                        inputStyle={{
                            width: "100%",
                            height: "10px",
                            borderRadius: "50px",
                            outline: "none",
                            ":focus": {
                            borderRadius: "50px",
                            },
                        }}
                        />
                    </FormGroup>

                    <FormGroup controlId="latitudAndLongitud" style={{display:'flex', flexDirection:'row', gap:'10px'}}>
                        <Input addon={true}
                        name='latitude'
                        classNanme="form-control"
                        style={{
                            borderRadius: "50px",
                        }}
                        placeholder="Latitud"
                        value={latitude}/>

                        <Input addon={true}
                        name='longitude'
                        classNanme="form-control"
                        style={{
                            borderRadius: "50px",
                        }}
                        placeholder="Longitud"
                        value={longitude}/>

                    </FormGroup>

                <div style={{display:'flex', flexDirection:'column'}}>
                
                        <Button
                        style={{
                            backgroundColor: "#fc5241",
                            borderColor: "#fc5241",
                            borderRadius: "50px",
                            marginTop: "10px"
                        }}
                        type="submit"
                        disabled={loading}
                        >
                        {loading ? 'Cargando...' : 'Registrar'}
                        </Button>
                    
                </div>
                    

                    
                </Form>
            </Card>
            </div>
        </Col>
    </Row>
    </>
  )
}

export default AdressCheckout;
