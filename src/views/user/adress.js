import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import es from "react-phone-input-2/lang/es.json";
import '../../styles/detailsCart.css';
import { allCitysByIdDepto, saveAddress } from '../../services/address';
import { getCurrentUser } from '../../helpers/Utils';

function AdressCheckout({ closeModalAddress, deptos, refreshAddress }) {

    const {
        reset,
        formState: { errors },
    } = useForm();

    const [selectedLink, setSelectedLink] = useState('home');
    const [contactPersonName, setContactPersonName] = useState("");
    const [contactPersonLastName, setContactPersonLastName] = useState("");
    const [contactPersonFullName, setContactPersonFullName] = useState("");

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [barrio, setBarrio] = useState("");
    const [phone, setphone] = useState("");
    const [phone2, setphone2] = useState("");
    const [country, setCountry] = useState("Colombia");
    const [latitude, setLatitude] = useState("1234");
    const [longitude, setLongitude] = useState("4321");
    const [localDescription, setLocalDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedZip, setSelectedZip] = useState();
    const [selectedDepto, setSelectedDepto] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [selectedCiudad, setSelectedCiudad] = useState();
    const [deptoId, setDeptoId] = useState();



    const currenUser = getCurrentUser();

    const token = currenUser.token;



    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };

    const handleSelectChangeZip = (e) => {
        const valorSeleccionadoZip = e.target.value;
        setSelectedZip(valorSeleccionadoZip);
        console.log(valorSeleccionadoZip);

        const deptoSeleccionado = deptos.find((depto) => depto.id_departamento === parseInt(valorSeleccionadoZip));

        console.log(deptoSeleccionado);
        if (deptoSeleccionado) {
            setSelectedDepto(deptoSeleccionado.departamento);

        }
        // return valorSeleccionado;
        // Realizar otras acciones con el valor seleccionado
    };

    const handleSelectChangeCity = (e) => {
        const valorSeleccionadoCity = e.target.value;
        setSelectedCity(valorSeleccionadoCity);
        console.log(valorSeleccionadoCity);

        const citySeleccionada = city.find((ciudad) => ciudad.id === parseInt(valorSeleccionadoCity));

        console.log(citySeleccionada);
        if (citySeleccionada) {
            setSelectedCiudad(citySeleccionada.nombre);

        }
        // return valorSeleccionadoTalla;
        // Realizar otras acciones con el valor seleccionado
    };

    const onSubmit = (data) => {
        setLoading(true);
        saveAddress(data, token)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    text: 'La direccion ha sido registrada exitosamente.',
                    confirmButtonColor: '#0d6efd',
                });
                closeModalAddress();
                refreshAddress();
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Se ha producido un error durante el registro. Por favor, inténtelo de nuevo.',
                    confirmButtonColor: '#dc3545',
                });
            })
    }

    const handleSubmitAddress = (e) => {
        e.preventDefault();

        const data = {
            address_type: selectedLink,
            contact_person_name: contactPersonFullName,
            address: address,
            country: country,
            zip: selectedDepto,
            city: selectedCiudad,
            phone: phone,
            phone_2: phone2,
            latitude: latitude,
            longitude: longitude,
            barrio: barrio,
            local_description: localDescription,
            is_billing: 'ppp'
        };
        onSubmit(data);
    }

    useEffect(() => {
        if (selectedZip) {
            allCitysByIdDepto(selectedZip, token)
                .then((res) => {
                    console.log(res.data);
                    setCity(res.data);
                })
        }
        if (selectedDepto || selectedCiudad) {
            console.log(selectedDepto);
            console.log(selectedCiudad);
        }

        const fullName = contactPersonName + " " + contactPersonLastName;
        setContactPersonFullName(fullName);
        
        if(contactPersonFullName){
            console.log(contactPersonFullName);
        }
    }, [selectedZip, token, selectedDepto,contactPersonName, contactPersonLastName, contactPersonFullName])

    return (
        <>
            <Row>
                <Col id='modalAddress'>
                    <div style={{ paddingLeft: "2%", paddingRight: "2%", marginBottom: '10px' }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <h5 style={{ color: "#fc5241", marginBottom: "20px" }}>Direccion de entrega</h5>
                        </div>
                        <Card style={{ border: 'none' }}>
                            <Form onSubmit={handleSubmitAddress}>

                                <div className='tipoDireccion' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', height: '48px' }}>
                                    <a href='#' style={{
                                        width: '100px',
                                        backgroundColor: selectedLink === 'home' ? '#FC5241' : 'white',
                                        textDecoration: 'none', color: selectedLink === 'home' ? 'white' : 'black',
                                        height: '30px',
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        borderRadius: '12px',
                                    }}
                                        onClick={() => handleLinkClick('home')}
                                    >
                                        Hogar
                                    </a>
                                    <a href='#' style={{
                                        width: '100px',
                                        backgroundColor: selectedLink === 'permanent' ? '#FC5241' : 'white',
                                        textDecoration: 'none', color: selectedLink === 'permanent' ? 'white' : 'black',
                                        height: '30px',
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        borderRadius: '12px',
                                    }}
                                        onClick={() => handleLinkClick('permanent')}
                                    >
                                        Trabajo
                                    </a>
                                    <a href='#' style={{
                                        width: '100px',
                                        backgroundColor: selectedLink === 'others' ? '#FC5241' : 'white',
                                        textDecoration: 'none', color: selectedLink === 'others' ? 'white' : 'black',
                                        height: '30px',
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        borderRadius: '12px',
                                    }}
                                        onClick={() => handleLinkClick('others')}
                                    >
                                        Otro
                                    </a>
                                </div>


                                {/* Nombre  */}
                                <FormGroup controlId="formBasicName">
                                    <Input addon={true}
                                        name="contactPersonName"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="Nombre de contacto"
                                        value={contactPersonName}
                                        onChange={(event) => setContactPersonName(event.target.value)}
                                    />

                                </FormGroup>
                                {/* Apelelido */}
                                <FormGroup controlId="formBasicName">
                                    <Input addon={true}
                                        name="contactPersonApellido"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="Apellido del contacto"
                                        value={contactPersonLastName}
                                        onChange={(event) => setContactPersonLastName(event.target.value)}
                                    />

                                </FormGroup>

                                {/*Direccion*/}
                                <FormGroup controlId="formBasicDireccion">
                                    <Input addon={true}
                                        name="address"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="Direccion"
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                    />

                                </FormGroup>

                                <FormGroup controlId="formBasicCountry">
                                    <Input addon={true}
                                        name="country"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="Pais"
                                        value={country}
                                        onChange={(event) => setCountry(event.target.value)}
                                    />

                                </FormGroup>

                                <FormGroup controlId="countryAndZip" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>

                                    <Input addon={true}
                                        name="zip"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        value={selectedZip}
                                        type='select'
                                        onChange={handleSelectChangeZip}

                                    >
                                        <option value="">Departamento</option>
                                        {deptos && deptos.map((depto, index) => (
                                            <option value={depto.id_departamento} key={index}>{depto.departamento}</option>
                                        ))}
                                    </Input>

                                    <Input addon={true}
                                        name="city"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="Ciudad"
                                        value={selectedCity}
                                        type='select'
                                        onChange={handleSelectChangeCity}
                                    >
                                        <option value="">Ciudad</option>
                                        {city && city.map((city, index) => (
                                            <option value={city.id} key={index}>{city.nombre}</option>
                                        ))}
                                    </Input>


                                </FormGroup>

                                {/* Como llegar o descripcion  y barrio */}
                                <FormGroup controlId="formBasicDescripcionandBarrio" >
                                    <Input addon={true}
                                        name="barrio"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="Barrio"
                                        value={barrio}
                                        onChange={(event) => setBarrio(event.target.value)}
                                    />



                                </FormGroup>

                                <FormGroup>
                                    <Input addon={true}
                                        type="textarea"
                                        name="local_description"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="¿Cómo llegar?"
                                        value={localDescription}
                                        onChange={(event) => setLocalDescription(event.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup controlId="formBasicCellphone1">
                                    <PhoneInput
                                        localization={es}
                                        country={"co"}
                                        value={phone}
                                        onChange={setphone}
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
                                        onChange={setphone2}
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

                                <FormGroup controlId="latitudAndLongitud" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                    <Input addon={true}
                                        name='latitude'
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="Latitud"
                                        value={latitude}
                                        hidden />

                                    <Input addon={true}
                                        name='longitude'
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="Longitud"
                                        value={longitude}
                                        hidden />

                                </FormGroup>

                                <div style={{ display: 'flex', flexDirection: 'column' }}>

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
