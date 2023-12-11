import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Row } from 'reactstrap'
import { sendCalificarProducto } from './../../services/calificarProducto';
import ReactStars from 'react-rating-stars-component';
import Swal from 'sweetalert2';
import { getCurrentUser } from '../../helpers/Utils';



const ModalCommentsAndRaitingProducts = ({ closeModal, productInfo }) => {
    /* Imagenes */
    const baseUrlImageThumbnail = "https://egoi.xyz/storage/app/public/product/thumbnail/";
    const [valueStart, setValueStart] = useState(0);
    const [comment, setComment] = useState('');

    const currenUser = getCurrentUser();
    const token = currenUser.token;

    const firstExample = {
        count: 5,
        size: 30,
        edit: true,
        value: valueStart,
        activeColor: "#FC5241",
        onChange: (newValue) => {
            // console.log(`${newValue}`);
            setValueStart(newValue);
        }
    };

    const onSubmit = (data) => {
        console.log(data);
        console.log(data.product_id);
        console.log(data.comment);
        console.log(data.rating);
        sendCalificarProducto(data.product_id, data.comment, data.rating, token)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: '¡Calificación enviada!',
                    text: '¡Gracias por compartir tu opinión acerca del producto!',
                    confirmButtonColor: '#FC5241',
                    confirmButtonText: 'Aceptar', // Cambia el texto del botón de confirmación
                    customClass: {
                        confirmButton: 'custom-confirm-button-class', // Agrega tus estilos personalizados al botón
                    },
                });
                closeModal();
            }).catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Se ha producido un error durante la calificación. Por favor, inténtelo de nuevo.',
                    confirmButtonColor: '#FC5241',
                });
            });
    }

    const handleChangueOnSubmit = (event) => {
        event.preventDefault();
        const data = {
            product_id: productInfo.detalle.id,
            comment: comment,
            rating: valueStart
        }
        onSubmit(data);

    }



    useEffect(() => {
        console.log(productInfo);
    }, []);

    return (
        <Row>
            <Col>
                <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <h5 style={{ color: "#fc5241" }}>Califica nuestros productos</h5>
                        <p>Cuéntanos cómo te pareció el producto</p>
                        <div className="d-flex p-2 gap-3">
                            <img src={baseUrlImageThumbnail + productInfo.detalle.thumbnail} style={{
                                borderRadius: '20px',
                                width: '50px'
                            }} />
                            <p><strong>{productInfo.detalle.name}</strong></p>
                        </div>
                        <Form style={{ width: '100%' }} onSubmit={handleChangueOnSubmit}>
                            <ReactStars {...firstExample} />
                            <FormGroup row>
                                <Input
                                    addon={true}
                                    id="exampleText"
                                    name="text"
                                    type="textarea"
                                    placeholder='Deja tu comentario...'
                                    style={{ height: '100px', borderRadius: '24px' }}
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                />
                            </FormGroup>

                            <div style={{ width: '100%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                <Button style={{
                                    display: "flex",
                                    alignSelf: "center",
                                    textDecoration: "none",
                                    color: "white",
                                    width: "60%",
                                    height: "48px",
                                    justifyContent: "center",
                                    backgroundColor: "#FC5241",
                                    alignItems: "center",
                                    borderRadius: "32px",
                                    textAlign: 'center',
                                    border: 'none',
                                    fontWeight: '700'
                                }}
                                    type='submit'>Califica</Button>
                            </div>
                        </Form>

                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default ModalCommentsAndRaitingProducts
