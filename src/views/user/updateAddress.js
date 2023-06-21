import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import es from "react-phone-input-2/lang/es.json";
import '../../styles/detailsCart.css';
import { allCitysByIdDepto, saveAddress, updateAddress } from '../../services/address';
import { getCurrentUser } from '../../helpers/Utils';

function UpdateAddress({ closeModalUpdate, deptos, refreshAddress, idAddress }) {

    const {
        reset,
        formState: { errors },
    } = useForm();

    const [selectedLink, setSelectedLink] = useState('home');
    const [contactPersonName, setContactPersonName] = useState("");
    const [contactPersonLastName, setContactPersonLastName] = useState("");
    const [contactPersonFullName, setContactPersonFullName] = useState("");
    const [addressType, setAddressType] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setphone] = useState("");
    const [phone2, setphone2] = useState("");
    const [country, setCountry] = useState("");
    const [localDescription, setLocalDescription] = useState("");
    const [barrio, setBarrio] = useState("");
    const [latitude, setLatitude] = useState("1234");
    const [longitude, setLongitude] = useState("4321");
    const [loading, setLoading] = useState(false);
    const [selectedZip, setSelectedZip] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [deptoId, setDeptoId] = useState();



    const currenUser = getCurrentUser();

    const token = currenUser.token;


    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };

    const handleSelectChangeZip = (e) => {
        const valorSeleccionadoZip = (e.target.value);
        setSelectedZip(valorSeleccionadoZip);
        console.log(valorSeleccionadoZip);
        // return valorSeleccionado;
        // Realizar otras acciones con el valor seleccionado
    };

    const handleSelectChangeCity = (e) => {
        const valorSeleccionadoCity = parseInt(e.target.value);
        setSelectedCity(valorSeleccionadoCity);
        console.log(valorSeleccionadoCity);
        // return valorSeleccionadoTalla;
        // Realizar otras acciones con el valor seleccionado
    };

    const onSubmit = (data) => {
        setLoading(true);
        updateAddress(idAddress, data, token)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Actualizacion exitosa!',
                    text: 'La direccion ha sido actualizada exitosamente.',
                    confirmButtonColor: '#0d6efd',
                });
                closeModalUpdate();
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
            zip: selectedZip,
            city: selectedCity,
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
        const fullName = contactPersonName + " " + contactPersonLastName;
        setContactPersonFullName(fullName);
        // console.log("Id Address: ", idAddress);
    }, [selectedZip, token, contactPersonName, contactPersonLastName, contactPersonFullName])

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

                                {/* Nombre */}
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
                                <FormGroup controlId="formBasicDescripcionandBarrio" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
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

                                    <Input addon={true}
                                        name="local_description"
                                        classNanme="form-control"
                                        style={{
                                            borderRadius: "50px",
                                        }}
                                        placeholder="Como llegar"
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
                                        {loading ? 'Cargando...' : 'Actualizar'}
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

export default UpdateAddress
