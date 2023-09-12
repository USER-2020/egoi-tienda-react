import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import { Card, Col, Row, Button, FormGroup, Form, Input, InputGroupText, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import es from "react-phone-input-2/lang/es.json";
import '../../styles/detailsCart.css';
import { addressById, allCitysByIdDepto, saveAddress, updateAddress } from '../../services/address';
import { getCurrentUser } from '../../helpers/Utils';
import { ThreeCircles } from 'react-loader-spinner';

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
    const [country, setCountry] = useState("Colombia");
    const [localDescription, setLocalDescription] = useState("");
    const [barrio, setBarrio] = useState("");
    const [latitude, setLatitude] = useState("1234");
    const [longitude, setLongitude] = useState("4321");
    const [loading, setLoading] = useState(false);
    const [selectedZip, setSelectedZip] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [selectedCiudad, setSelectedCiudad] = useState();
    const [selectedDepto, setSelectedDepto] = useState();
    const [deptoId, setDeptoId] = useState();
    const [dataAddress, setDataAddress] = useState("");

    const [isLoading, setIsLoading] = useState(true);



    const currenUser = getCurrentUser();

    const token = currenUser.token;


    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };


    const getAddressById = () => {
        addressById(idAddress, token)
            .then((res) => {
                // console.log("Datos traidos de la direcicon ID", res.data);
                // console.log("Nombre", res.data[0].contact_person_name);
                // console.log("Celular", res.data[0].phone);
                // console.log("Como llegar", res.data[0].local_description);
                console.log(res.data[0]);
                setDataAddress(res.data);
                setContactPersonName(res.data[0].f_name || '');
                setContactPersonLastName(res.data[0].l_name || '');
                setContactPersonFullName(res.data[0].contact_person_name || '');
                setAddressType(res.data[0].address_type || '');
                setAddress(res.data[0].address || '');
                setZip(res.data[0].zip || '');
                setCity(res.data.city || ''); // Asumiendo que city es un objeto
                setphone(res.data[0].phone || '');
                setphone2(res.data[0].phone_2 || '');
                setCountry(res.data[0].country || 'Colombia');
                setLocalDescription(res.data[0].local_description || '');
                setBarrio(res.data[0].barrio || '');
                setLatitude(res.data[0].latitude || '1234');
                setLongitude(res.data[0].longitude || '4321');
                setSelectedZip(res.data[0].zip || ''); // Asumiendo que zip es un valor válido
                setSelectedCity(res.data.city || ''); // Asumiendo que city es un valor válido
                setSelectedDepto(res.data[0].zip || ''); // Asumiendo que zip es un valor válido
                setIsLoading(false);


            })
    }

    const handleSelectChangeZip = (e) => {
        const valorSeleccionadoZip = (e.target.value);
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
        const valorSeleccionadoCity = parseInt(e.target.value);
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
        if (!contactPersonName || !contactPersonLastName || !address || !selectedDepto || !selectedCiudad || !phone || !phone2 || !barrio || !localDescription) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete todos los campos. ",
                confirmButtonColor: "#0d6efd",
            });
            setLoading(false);


        } else {

            updateAddress(idAddress, data, token)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Actualización exitosa!',
                        text: 'La dirección ha sido actualizada exitosamente.',
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
                    setLoading(false);
                })
        }
    }

    const handleSubmitAddress = (e) => {
        e.preventDefault();

        const data = {
            address_type: selectedLink,
            contact_person_name: contactPersonFullName,
            f_name: contactPersonName,
            l_name: contactPersonLastName,
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
        // getAddressById();
        const fullName = contactPersonName + " " + contactPersonLastName;
        setContactPersonFullName(fullName);

        // console.log("Id Address: ", idAddress);
    }, [selectedZip, token, contactPersonName, contactPersonLastName, contactPersonFullName]);

    // useEffect(() => {
    //     getAddressById();         // ... otros estados


    // },[]);

    useEffect(() => {
        if (idAddress) {
            console.log("entre a la funcion ");
            getAddressById();
        }
    }, [idAddress]);


    return (
        <>


            <Row>
                <Col id='modalAddress'>
                    <div style={{ paddingLeft: "2%", paddingRight: "2%", marginBottom: '10px', textAlign:'center' }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <h5 style={{ color: "#fc5241", marginBottom: "20px" }}>Actualizar la dirección de entrega</h5>
                        </div>
                        {isLoading ? (
                            <div className="loadingDiv" style={{ display:'flex'}}>
                                <ThreeCircles
                                    height="100"
                                    width="100"
                                    color="#FC5241"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel="three-circles-rotating"
                                    outerCircleColor=""
                                    innerCircleColor=""
                                    middleCircleColor=""
                                />
                                <h2 style={{ color: '#FC5241' }}>Cargando la información de tu ubicación...</h2>
                            </div>
                        ) : (
                            <Card style={{ border: 'none' }}>
                                <Form onSubmit={handleSubmitAddress}>

                                    <div className='tipoDireccion' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', height: '48px' }}>
                                        <a href='#' style={{
                                            width: '100px',
                                            backgroundColor: selectedLink === 'home' ? '#FC5241' : 'white',
                                            textDecoration: 'none', color: selectedLink === 'home' ? 'white' : 'black',
                                            height: '28px',
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
                                            height: '28px',
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
                                            height: '28px',
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
                                            placeholder="Nombre del contacto"
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
                                            placeholder="Dirección"
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
                                            {loading ? 'Cargando...' : 'Actualizar'}
                                        </Button>

                                    </div>



                                </Form>
                            </Card>
                        )}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default UpdateAddress
