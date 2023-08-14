import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';

import '../../styles/detailsCart.css';
import { Card, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Modal, ModalBody, Row } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getCurrentUser } from '../../helpers/Utils';
import { allProductsCart } from '../../services/cart';
import start from '../../assets/Star.png';
import { Link } from 'react-router-dom';
import AdressCheckout from '../../views/user/adress';
import es from "react-phone-input-2/lang/es.json";
import PhoneInput from 'react-phone-input-2';
import { addressById, allAddress, allDeptos, deleteAddress } from '../../services/address';
import UpdateAddress from '../../views/user/updateAddress';
import { set } from 'react-hook-form';
import Swal from 'sweetalert2';
import TarjetaCreditoModal from '../../views/user/metodosDePago/tarjetaCredito';
import EfectyModal from '../../views/user/metodosDePago/efecty';
import PseModal from '../../views/user/metodosDePago/pse';
import TarjetaDebitoModal from '../../views/user/metodosDePago/tarjetaDebito';
import { allBanks } from '../../services/bank';
import { aplyCupon } from '../../services/cupon';
import CashDeliveryOTP from '../../views/user/metodosDePago/cashDeliveryOTP';
import axios from 'axios';
import { makePay, referenciaPago } from '../../services/metodosDePago';
import { PDFViewer } from '@react-pdf/renderer';
import PDFContent from '../PDF/PDFContent';
import SuccessPurchase from '../../views/user/success_purchase';
import efectyLogo from '../../assets/egoi_icons/logo_efecty.svg';
import pseLogo from '../../assets/egoi_icons/logo_pse.svg';




function AddressCart() {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [previousStep, setPreviousStep] = useState(0);
  const [activeStep, setActiveStep] = useState(2);
  const [valueProgressBar, setValueProgressBar] = useState(50);
  const [productsCart, setProductsCart] = useState([]);
  const [modalViewRegistro, setModalViewRegistro] = useState(false);
  const [modalViewLogin, setModalViewLogin] = useState(false);
  const [modalAddressCheckout, setModalAddressCheckout] = useState(false);
  const [modalAddressUpdate, setModalAddressUpdate] = useState(false);
  const [modalTarjetaCredito, setModalTarjetaCredito] = useState(false);
  const [modalEfecty, setModalEfecty] = useState(false);
  const [modalPse, setModalPse] = useState(false);
  const [modalOTP, setModalOTP] = useState(false);
  const [selectedLink, setSelectedLink] = useState('hogar');
  const [address, setAddress] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [dataAddress, setDataAddress] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [idAddress, setIdAddress] = useState([]);
  const [descriptionOrder, setDescriptionOrder] = useState("");

  const [modalDataPSE, setModalDataPSE] = useState("");
  const [modalDataTarjetas, setModalDataTarjetas] = useState("");


  //Modal de pedido exitoso
  const [modalSuccessPurchase, setModalSuccessPurchase] = useState(false);


  // Modales de metodos de pagos 
  const [modalTarjetaDebito, setModalTarjetaDebito] = useState(false);
  const [isScrollModalEnabled, setIsScrollModalEnabled] = useState(true);
  const [dataRef, setDataRef] = useState([]);

  const [deptos, setDeptos] = useState([]);

  const [dataOrderDetail, setDataOrderDetail] = useState([]);


  const [cupon, setCupon] = useState("");
  const [discountCoupon, setDiscountCoupon] = useState("");

  /* Estado para la IP */
  const [ipAddress, setIpAddress] = useState('');

  /* Generacion de pdf */
  const [showPDF, setShowPDF] = useState(false);

  /* Boton deshabilitado */
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);





  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const { subtotal, total, costoEnvio, cuponDescuento } = useParams();

  const currenUser = getCurrentUser();

  const history = useHistory();

  const token = currenUser.token;

  const userEmail = currenUser.email;

  const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";
  const baseUrlImageThumbnail = "https://egoi.xyz/storage/app/public/product/thumbnail/";


  const handleStepClick = (step, stepProgress) => {
    setActiveStep(step);
    setValueProgressBar(stepProgress);
  };


  /* CAmbio de precio subtotal */
  const subtotalNumber = parseInt(subtotal.replace(',', ''), 10);



  const getAllProductsByCart = () => {
    if (token) {
      allProductsCart(token)
        .then((res) => {
          console.log(res);
          setProductsCart(res.data);
          console.log("traer todos los producstos del carrito", productsCart);

          // Obtener los nombres de los productos del carrito
          const productNames = res.data.map((product) => product.name);
          console.log(productNames);
          // Concatenar los nombres de los productos separados por comas
          const concatenatedNames = productNames.join(', ');

          console.log("Traer todos los productos del carrito", res.data);
          console.log("Nombres de los productos concatenados:", concatenatedNames);
          setDescriptionOrder(concatenatedNames);

        })
        .catch((err) => console.log(err));
    }

  }

  const getAllAddress = () => {
    if (token) {
      allAddress(token)
        .then((res) => {
          console.log(res.data);
          setAddress(res.data);
          console.log("Estas son las direcciones", address);

        })
    }
  }

  const getAllDeptos = () => {
    if (token) {
      allDeptos(token)
        .then((res) => {
          console.log(res.data);
          setDeptos(res.data);
        })
    }
  }



  const handleCheckboxChange = (index) => {
    if (selectedCheckbox === index) {
      // Deseleccionar el checkbox actual si se hace clic nuevamente en él
      setSelectedCheckbox(null);
    } else {
      // Seleccionar el checkbox correspondiente al índice dado
      setSelectedCheckbox(index);
      if (index === 0) {
        console.log(index);
        setModalTarjetaDebito(true);
        setBotonDeshabilitado(true);
      }
      if (index === 1) {
        console.log(index);
        setModalTarjetaCredito(true);
        setBotonDeshabilitado(true);
      }
      if (index === 2) {
        console.log(index);
        setModalPse(true);
        setBotonDeshabilitado(true);
      }
      if (index === 3) {
        console.log(index);
        handleSubmitOrderEfecty();
        setBotonDeshabilitado(true);

      }
      if (index === 4) {
        console.log(index);
        setModalOTP(true);
        setBotonDeshabilitado(true);
      }
    }
  };

  const checkboxChange = (index, id) => {
    setSelectedAddressIndex(index);
    setSelectedAddressId(id);
  };

  const closeModalAddress = () => {
    setModalAddressCheckout(false);
  }

  const closeModalUpdate = () => {
    setModalAddressUpdate(false);
  }

  const closeModalEfecty = () => {
    setModalEfecty(false);
  }

  const closeModalTarjetaCredito = () => {
    setModalTarjetaCredito(false);
  }

  const closeModalTarjetaDebito = () => {
    setModalTarjetaDebito(false);
  }

  const closeModalPse = () => {
    setModalPse(false);
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })



  var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
  window.addEventListener("scroll", function () {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    var scrollModal = document.getElementById("scrollModalCheckout");

    if (scrollModal !== null) {
      if (currentScrollPos > prevScrollPos) {
        scrollModal.style.display = "block";
      } else {
        scrollModal.style.display = "none";
      }
    }

    prevScrollPos = currentScrollPos;
  });

  const openAddressCheckoutModal = () => {
    setModalAddressCheckout(true);
    setIsScrollModalEnabled(false);
  };

  const closeAddressCheckoutModal = () => {
    setModalAddressCheckout(false);
    setIsScrollModalEnabled(true);
  };

  const closeModalPDF = () => {
    setShowPDF(false);
    setIsScrollModalEnabled(true);
  }

  const closeModalOTP = () => {
    setModalOTP(false);
    setIsScrollModalEnabled(true);
  }


  const updateBtn = (addrId) => {
    if (token) {
      swalWithBootstrapButtons.fire({
        title: '¿Quieres eliminar o actualizar esta dirección?',
        text: "Esto no es reversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Eliminar',
        reverseButtons: true,
        didOpen: () => {
          const confirmButton = document.querySelector('.swal2-confirm');
          confirmButton.style.marginLeft = '8px'; // Agrega margen izquierdo al botón de confirmación
        }
      }).then((result) => {
        if (result.isConfirmed) {
          setIdAddress(addrId);
          setModalAddressUpdate(true);

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel

        ) {
          swalWithBootstrapButtons.fire(
            'Eliminado',
            'Tu direccion fue eliminada',
            'error'
          );
          console.log(addrId);
          eliminarDireccion(addrId);



        }
      })


    }
  }
  /* traer datos de los modales para efectuar el pago */
  const handleModalData = (data) => {
    console.log("Datos del modal:", data);
    setModalDataTarjetas(data);
    setModalDataPSE(data);
    setModalTarjetaCredito(false);
    setModalPse(false);
    setModalTarjetaDebito(false);


  };

  const getAddressById = () => {
    addressById(selectedAddressId, token)
      .then((res) => {
        console.log("Datos traidos de la direcicon ID", res.data);
        console.log("Nombre", res.data[0].contact_person_name);
        console.log("Celular", res.data[0].phone);
        console.log("Como llegar", res.data[0].local_description);
        setDataAddress(res.data);

      })
  }


  const eliminarDireccion = (addrId) => {
    deleteAddress(addrId, token)
      .then(() => {
        console.log("Dirección ELiminada");
        getAllAddress();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const refreshAddress = () => {
    if (token) {
      getAllAddress();
    }
  }

  const aplicarCupon = () => {
    if (cupon && token) {
      console.log(cupon);
      aplyCupon(cupon, token)
        .then((res) => {
          console.log("Cupon aplicado ==>", res.data);
          console.log("Total", res.data.total);
          setDiscountCoupon(res.data);

          // Validar si el cupón es inválido
          if (res.data.messages && res.data.messages.includes('Invalid Coupon')) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Cupón inválido',
              confirmButtonColor: '#dc3545',
            });
          } else {
            // El cupón se aplicó correctamente
            // Continuar con el flujo de la aplicación
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al aplicar el cupón. Por favor, inténtelo de nuevo.',
            confirmButtonColor: '#dc3545',
          });
        });
    }
  }



  const handleSubmitOrderPaymentCard = () => {
    if (token) {
      console.log("Envio de orden por tarjeta");


      /* The code is assigning a default value to the variable `amountValue` which is equal to the
      value of `total`. Then, it checks if there is a `discountCoupon` object and if the `total`
      property of that object is defined. If it is defined, the code assigns the value of
      `discountCoupon.total` to the `amountValue` variable, which means that the total value with
      the discount applied will be used instead of the original total value. */
      let amountValue = total; // Valor por defecto, en caso de que no haya cupón aplicado

      if (discountCoupon && discountCoupon.total !== undefined) {
        amountValue = discountCoupon.total; // Si hay un cupón aplicado, asigna el valor del total con descuento
        console.log("precio con descuento", amountValue);
      }
      /* The code is checking if there is a variable called "cupon" and if it is not undefined. If it
      exists, it assigns its value to the variable "cuponCode". If it doesn't exist or is undefined,
      "cuponCode" remains as "0". */
      let cuponCode = "0";
      if (cupon && cupon !== undefined) {
        cuponCode = cupon; // Si hay un cupón aplicado, asigna el valor del
      }



      /* The above code is checking if there is a discount coupon available and if it has a defined
      discount value. If there is a discount coupon with a defined discount value, the value of the
      discount is assigned to the variable `cuponOffSale`. If there is no discount coupon or the
      discount value is undefined, the value of `cuponOffSale` remains "0". */
      let cuponOffSale = "$0";
      if (discountCoupon && discountCoupon.discount !== undefined) {
        cuponOffSale = discountCoupon.discount;
      }
      // Eliminar el símbolo "$" y convertir a número
      const numericValue = Number(amountValue.replace("$", ""));

      //Cupon code limpio
      const cuponCodeLimpio = Number(cuponCode.replace("$", ""));

      //Descuento limpio
      const cuponDescuentoLimpio = Number(cuponOffSale.replace("$", ""));

      //Anio de vencimiento 
      let year = "";
      if (modalDataTarjetas && modalDataTarjetas.cardYear) {
        year = "20" + modalDataTarjetas.cardYear;
      }

      //issuer_Id para pse
      let issuerID = "";
      if (modalDataPSE && modalDataPSE.issuer === "pse") {
        issuerID = "1037";
      }

      //Id del banco asociado para pse
      let valueIdBank = "";
      if (modalDataPSE && modalDataPSE.valueBank) {
        valueIdBank = modalDataPSE.valueBank;
      }

      //Tipo de tarjeta
      let tipo = "visa";
      if (modalDataPSE && modalDataPSE.issuer === "pse") {
        tipo = modalDataPSE.issuer;
      }

      //Documento
      let DI = "";
      if (modalDataPSE) {
        DI = modalDataPSE.identificationNumber;
      }
      if (modalDataTarjetas) {
        DI = modalDataTarjetas.identificationNumber;
      }

      //Concatenacion de los datos del numero de tarjeta
      let CardNumber = "";
      if (modalDataTarjetas && modalDataTarjetas.cardNumber) {
        const cardNumber = modalDataTarjetas.cardNumber.replace(/\s/g, '');
        CardNumber = cardNumber;
        // Resto del código para utilizar el cardNumber sin espacios
      }



      const dataOrder = {

        firstname: dataAddress[0].contact_person_name, //nombre del usuario traido odesde el id de la direccion seleccionada
        lastname: dataAddress[0].contact_person_name, //apellido del usuario traido desde el id de la direccion seleccionada
        email: "juanfernandozuluaga2014310@gmail.com", // correo del usuario userEmail
        numberPhone: dataAddress[0].phone, //numero de celular del usuario traido desde el id de la direccion seleccionada
        type: tipo, //medio de pago traido del id del metodo de pago selesccionado
        issuer_id: issuerID,  // id de banco traido del modal de pago seleccionado solo para pse !!
        installments: modalDataTarjetas.cuotes,//cuotas de tarjeta
        financial_institution: valueIdBank, //id del tipo de banco que se obtiene del modal de pago
        identificationNumber: DI, //cedula del usuario traido del modal de pago
        amount: numericValue, //valor de la compra
        ipAddress: ipAddress, //ip del cliente
        description: descriptionOrder, //Descripción del producto adquirido, el motivo del pago. Ej. - "Celular Xiaomi Redmi Note 11S 128gb 6gb Ram Original Global Blue Version" (descripción de un producto en el marketplace).
        callback_url: "https://egoi.xyz/admin/auth/login", //URL a la cual Mercado Pago hace la redirección final (sólo para transferencia bancaria).
        cardNumber: CardNumber,//numero de la tarjeta traido de los modales de tarejta
        nameInCard: modalDataTarjetas.nameCard, //nombre del propietatio de la tarjeta traido de los modales de tarjeta
        expirationMonth: modalDataTarjetas.cardMonth,//mes de vencimiento tarjeta traido de los modales de tarjeta
        expirationYear: year,// año de vencimiento, tarjeta traido de los mdoales de tarjeta
        securityCode: modalDataTarjetas.securityCode,//codigo de seguridad tarjeta traido de los modales de tarjeta 
        address_id: selectedAddressId, // id de la direccion
        billing_address_id: selectedAddressId, // id de la direccion
        coupon_code: cuponCodeLimpio, //codigo del cupon
        coupon_discount: cuponDescuentoLimpio, //el decuento que te da el cupon 
        order_note: dataAddress[0].local_description// como llegar infor traida de la direccion seleccionada por Id
      }


      verifyPurchase(dataOrder);
    }
  }

  const openWindowPSExternal = (direccion_url_pse) => {
    window.open(direccion_url_pse, "_blank");
  }

  /* Verificar compra */
  const verifyPurchase = (dataOrder) => {
    console.log("Estos son los datos de las ordenes", dataOrder);

    makePay(dataOrder, token)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.data.MpTransactionId.responsePayMp.transaction_details.external_resource_url);
        let direccion_url_pse = res.data.data.MpTransactionId.responsePayMp.transaction_details.external_resource_url;
        if (direccion_url_pse !== null) {
          openWindowPSExternal(direccion_url_pse);
        }
        console.log("El pago se registro");
        Swal.fire({
          icon: 'success',
          title: '¡Tu compra ha sido registrada!',
          text: 'La compra se ha realizado exitosamente.',
        });
      }).catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error procesando el pago!',

        })
      });

  }
  /* Generar referencia de pago de efecty */
  const generateEfectyREF = (data, descriptionOrder) => {
    referenciaPago(data, token)
      .then((res) => {
        console.log(res.data);
        const newDataRef = res.data;
        setDataRef(newDataRef);
        let timerInterval;
        Swal.fire({
          title: 'Generando ticket!',
          html: 'Generando<b></b>',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          didClose: () => {
            clearInterval(timerInterval);
            setModalEfecty(true);
            // Actualizar el estado para mostrar el PDF
            // setShowPDF(true);

            // Abre la ventana emergente y renderiza el PDF después de cerrar el Swal
            setTimeout(() => {
              const newWindow = window.open('', '_blank', 'width=600,height=400');

              // Establece los estilos CSS para el contenedor
              const containerStyles = {
                width: '100vw',
                height: '100vh',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
              };

              // Establece los estilos CSS para el PDFViewer
              const viewerStyles = {
                width: '100%',
                height: '100%',
              };



              // Renderiza el componente PDFViewer en la nueva ventana
              ReactDOM.render(
                <div style={containerStyles}>
                  <PDFViewer style={viewerStyles}>
                    <PDFContent closeModalPDF={newWindow.close} dataRefEfecty={newDataRef}
                      totalAmount={formattedTotal !== '' ? formattedTotal : total}
                      description={descriptionOrder} />
                  </PDFViewer>
                </div>,
                newWindow.document.body
              );
            }, 1000); // Ajusta el tiempo de espera según tus necesidades
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer');
          }
        });
      })
      .catch((err) => console.log(err));
  }


  const handleSubmitOrderEfecty = () => {
    if (token) {
      console.log("Envio de orden por efecty");
      console.log(formattedTotal);

      let amountValue = formattedTotal !== '' ? formattedTotal : total; // Valor por defecto, en caso de que no haya cupón aplicado

      const unformattedValue = amountValue ? amountValue.toString().replace(/[,]/g, '') : '';
      // Eliminar el símbolo "$" y convertir a número
      const numericValue = unformattedValue ? Number(unformattedValue.replace("$", "")) : 0;

      const dataOrder = {
        transaction_amount: numericValue, // Monto total validado si es con cupón o no
        description: descriptionOrder, // Descripción concatenada de los productos del carrito de compras
        payment_method_id: "efecty", // Id del método de pago seleccionado
        email: "juanfernandozuluaga2014310@gmail.com" // Email del usuario //userEmail
      }

      generateEfectyREF(dataOrder, descriptionOrder);
    }
  }

  let formattedDiscount = '';
  let formattedTotal = '';
  if (discountCoupon && discountCoupon.discount !== undefined && discountCoupon.total !== undefined) {
    formattedDiscount = discountCoupon.discount.toString().replace(',', '.');

    formattedTotal = discountCoupon.total.toString().replace(',', '.');
  }


  /* Estado para obtener IP del usuario */
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const data = response.data.ip;
        console.log(data);
        setIpAddress(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIp();
  }, []);





  useEffect(() => {

    if (token) {
      getAllProductsByCart();
      getAllAddress();
      getAllDeptos();

      console.log(ipAddress);

    } else {

      history.goBack();
      setModalViewLogin(true);
    }
    ;
    console.log(total);
    handleStepClick(activeStep, valueProgressBar);
    if (cupon) {
      console.log("Este es el cupon", cupon);

    }
    if (selectedAddressId) {
      console.log("Este es el id de la direccion", selectedAddressId);
    }

    if (selectedAddressId) {
      getAddressById();
    }



    if (showPDF) {
      console.log("se muestra el pdf", showPDF);
    }

    if (subtotalNumber) {
      console.log("Este es el subtotal formateado", subtotalNumber);
    }


  }, [activeStep, token, selectedAddressId, showPDF, modalDataPSE, modalDataTarjetas, subtotalNumber]);

  return (
    <>
      <div className='container'>
        <h5 style={{ color: '#74737B', fontSize: '16px' }}>Dirección de envío y facturación</h5>
        <div className="containerCheckoutSteps">
          <div className="containerProgressBar">
            <div className="accordion" id="accordionExample">
              <div className="steps">
                <progress id="progress" value={valueProgressBar} max={100} ></progress>
                <div className={`step-item ${activeStep >= 1 ? 'active' : ''}`} >
                  <button className={`step-button text-center ${activeStep >= 1 ? 'active' : ''}`} type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" onClick={() => handleStepClick(1, 0)}>
                    1
                  </button>
                  <div className="step-title">
                    Inicia sesión / Registro
                  </div>
                </div>
                <div className={`step-item ${activeStep >= 2 ? 'active' : ''}`} >
                  <button className={`step-button text-center ${activeStep >= 2 ? 'active' : ''}`} type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" onClick={() => handleStepClick(2, 50)}>
                    2
                  </button>
                  <div className="step-title">
                    Dirección y facturación
                  </div>
                </div>
                <div className={`step-item ${activeStep >= 3 ? 'active' : ''}`}>
                  <button className={`step-button text-center ${activeStep >= 3 ? 'active' : ''}`} type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onClick={() => handleStepClick(3, 100)}>
                    3
                  </button>
                  <div className="step-title">
                    Método de pago
                  </div>
                </div>
              </div>

              <div className="card">
                <div id="headingOne">
                </div>

                <div id="collapseOne" className="collapse" aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample">
                  <div className="card-body">
                    <h2><strong>Hola, Juan Perez, ya estas logueado, sigue con el checkout!</strong></h2>
                  </div>
                </div>
              </div>
              <div className="card">
                <div id="headingTwo">

                </div>
                <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="cards">
                    {address && address.map((addr, index) => (

                      <div className="card-body card1" key={index}>
                        <div className="contenedorP">
                          <div className="seleccion">
                            <Input type="checkbox" name="" id={addr.id}
                              checked={selectedAddressIndex === index}
                              onChange={() => checkboxChange(index, addr.id)} />
                            <p>{addr.address_type === "home" ? "Hogar" : addr.address_type && addr.address_type === "permanent" ? "Trabajo" : addr.address_type && addr.address_type === "others" ? "Otro" : addr.address_type}</p>
                          </div>
                          <div className="contenido">
                            <p>Nombre Contacto: {addr.contact_person_name}</p>
                            <p>Dirección: {addr.address}</p>
                            <p>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.46399 3.79261C7.03626 3.23986 6.28321 3.05281 5.63801 3.32126C5.54774 3.35882 5.45344 3.41223 5.32375 3.48569L5.31028 3.49332L5.30288 3.49751L5.29566 3.50201C5.00861 3.68109 4.82023 3.95405 4.69556 4.2289C4.57038 4.50491 4.49755 4.8085 4.45538 5.08768C4.37743 5.60368 4.39469 6.107 4.42814 6.31578C4.42878 6.32507 4.42964 6.33573 4.4308 6.34777C4.43434 6.38486 4.44065 6.43506 4.45185 6.49892C4.47423 6.62664 4.51613 6.809 4.59449 7.05051C4.75112 7.53321 5.05395 8.25386 5.64003 9.24952C6.2264 10.2457 6.74008 10.912 7.11324 11.3338C7.29979 11.5446 7.45108 11.6942 7.55859 11.7932C7.61234 11.8427 7.65512 11.8795 7.68586 11.905C7.70123 11.9177 7.71358 11.9276 7.72279 11.9349L7.73265 11.9425C8.00181 12.1592 8.45179 12.4476 8.9564 12.6281C9.4537 12.806 10.0856 12.9072 10.6471 12.62L10.6547 12.6161L10.6621 12.6119L10.6814 12.601C10.8074 12.5297 10.901 12.4767 10.9784 12.4195C11.5423 12.0025 11.7563 11.2599 11.4798 10.6149C11.442 10.5267 11.3879 10.4347 11.3165 10.3136L11.3051 10.2941L11.1821 10.0852L11.1723 10.0685C11.0482 9.85764 10.949 9.68917 10.8532 9.56178C10.7271 9.39402 10.5591 9.29629 10.4304 9.23454C10.2527 9.14925 10.0549 9.11514 9.87898 9.0991C9.70021 9.08282 9.51069 9.08282 9.34048 9.08362L9.29644 9.08384C9.13673 9.08467 8.99414 9.0854 8.86305 9.07739C8.71793 9.06852 8.61986 9.05025 8.5575 9.02624C8.52407 9.01336 8.49098 8.99816 8.45836 8.98064C8.42394 8.96216 8.40425 8.94866 8.39188 8.93821C8.28826 8.85067 8.0171 8.59839 7.76503 8.17016C7.47008 7.66907 7.42997 7.31682 7.42685 7.28477C7.42182 7.1909 7.43098 7.09725 7.45341 7.0059C7.4707 6.93552 7.51126 6.83979 7.57954 6.71111C7.62692 6.6218 7.67846 6.53305 7.73473 6.43616C7.75991 6.39279 7.78605 6.34779 7.81317 6.30038C7.8961 6.15546 7.98481 5.99375 8.05212 5.83081C8.1183 5.67061 8.17652 5.47988 8.1735 5.28005C8.17216 5.19117 8.16407 5.06448 8.11427 4.9331C8.05058 4.76509 7.94017 4.57761 7.80031 4.34009L7.78253 4.3099L7.65944 4.10109L7.64614 4.07848C7.57599 3.95922 7.52232 3.86798 7.46399 3.79261Z" fill="#171523" />
                              </svg>
                              +{addr.phone}
                            </p>

                          </div>
                        </div>
                        <div className="opcionesUpdateOrDelete">
                          <a href="#" onClick={() => updateBtn(addr.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FC5241" className="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                    <div className="addNewAddress" >
                      <a href="#" onClick={() => setModalAddressCheckout(true)}>Agregar dirección</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div id="headingThree">

                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample">
                  <div className="card-body paymentMethods">
                    <h6>Escoge tu médoto de pago</h6>
                    <Card>
                      <div className="payment">
                        <div className="imgPayment">
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9632 11H23.0368C24.4035 11 25.4801 11 26.351 11.0594C27.2387 11.12 27.9853 11.2456 28.6788 11.5328C30.394 12.2433 31.7567 13.606 32.4672 15.3212C32.7853 16.0893 32.906 16.9257 32.9584 17.9489C33 18.7623 33 19.7511 33 20.9741V21.0369C33 22.4035 33 23.4801 32.9406 24.351C32.88 25.2387 32.7544 25.9853 32.4672 26.6788C31.7567 28.394 30.394 29.7567 28.6788 30.4672C27.9853 30.7544 27.2387 30.88 26.351 30.9406C25.4801 31 24.4035 31 23.0369 31H16.9631C15.5965 31 14.5199 31 13.649 30.9406C12.7613 30.88 12.0147 30.7544 11.3212 30.4672C9.60602 29.7567 8.2433 28.394 7.53284 26.6788C7.2456 25.9853 7.11997 25.2387 7.05941 24.351C6.99999 23.4801 7 22.4035 7 21.0368V20.974C7 19.7511 7 18.7623 7.04161 17.9489C7.09395 16.9257 7.21468 16.0893 7.53284 15.3212C8.2433 13.606 9.60602 12.2433 11.3212 11.5328C12.0147 11.2456 12.7613 11.12 13.649 11.0594C14.5199 11 15.5965 11 16.9632 11ZM13.7851 13.0548C12.9993 13.1084 12.4957 13.2111 12.0866 13.3806C10.8614 13.8881 9.88807 14.8614 9.3806 16.0866C9.27532 16.3407 9.19613 16.6303 9.13834 17H30.8617C30.8039 16.6303 30.7247 16.3407 30.6194 16.0866C30.1119 14.8614 29.1386 13.8881 27.9134 13.3806C27.5043 13.2111 27.0007 13.1084 26.2149 13.0548C25.4201 13.0005 24.4115 13 23 13H17C15.5885 13 14.5799 13.0005 13.7851 13.0548ZM30.9906 19H9.00942C9.00011 19.5665 9 20.2225 9 21C9 22.4115 9.00054 23.4201 9.05477 24.2149C9.10839 25.0007 9.21112 25.5043 9.3806 25.9134C9.88807 27.1386 10.8614 28.1119 12.0866 28.6194C12.4957 28.7889 12.9993 28.8916 13.7851 28.9452C14.5799 28.9995 15.5885 29 17 29H23C24.4115 29 25.4201 28.9995 26.2149 28.9452C27.0007 28.8916 27.5043 28.7889 27.9134 28.6194C29.1386 28.1119 30.1119 27.1386 30.6194 25.9134C30.7889 25.5043 30.8916 25.0007 30.9452 24.2149C30.9995 23.4201 31 22.4115 31 21C31 20.2225 30.9999 19.5665 30.9906 19ZM25 22C25 21.4477 25.4477 21 26 21H28C28.5523 21 29 21.4477 29 22C29 22.5523 28.5523 23 28 23H26C25.4477 23 25 22.5523 25 22Z" fill="#A75BFF" />
                          </svg>
                        </div>
                        <div className="contentPayment">
                          <h6>Tarjeta Débito</h6>
                          <p>Paga con tarjetas débito</p>
                        </div>
                      </div>
                      <div className="checkPayment">
                        <Input type='checkbox'
                          checked={selectedCheckbox === 0}
                          onChange={() => handleCheckboxChange(0)} />
                      </div>
                    </Card>
                    <Card>
                      <div className="payment">
                        <div className="imgPayment">
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9632 11H23.0368C24.4035 11 25.4801 11 26.351 11.0594C27.2387 11.12 27.9853 11.2456 28.6788 11.5328C30.394 12.2433 31.7567 13.606 32.4672 15.3212C32.7853 16.0893 32.906 16.9257 32.9584 17.9489C33 18.7623 33 19.7511 33 20.9741V21.0369C33 22.4035 33 23.4801 32.9406 24.351C32.88 25.2387 32.7544 25.9853 32.4672 26.6788C31.7567 28.394 30.394 29.7567 28.6788 30.4672C27.9853 30.7544 27.2387 30.88 26.351 30.9406C25.4801 31 24.4035 31 23.0369 31H16.9631C15.5965 31 14.5199 31 13.649 30.9406C12.7613 30.88 12.0147 30.7544 11.3212 30.4672C9.60602 29.7567 8.2433 28.394 7.53284 26.6788C7.2456 25.9853 7.11997 25.2387 7.05941 24.351C6.99999 23.4801 7 22.4035 7 21.0368V20.974C7 19.7511 7 18.7623 7.04161 17.9489C7.09395 16.9257 7.21468 16.0893 7.53284 15.3212C8.2433 13.606 9.60602 12.2433 11.3212 11.5328C12.0147 11.2456 12.7613 11.12 13.649 11.0594C14.5199 11 15.5965 11 16.9632 11ZM13.7851 13.0548C12.9993 13.1084 12.4957 13.2111 12.0866 13.3806C10.8614 13.8881 9.88807 14.8614 9.3806 16.0866C9.27532 16.3407 9.19613 16.6303 9.13834 17H30.8617C30.8039 16.6303 30.7247 16.3407 30.6194 16.0866C30.1119 14.8614 29.1386 13.8881 27.9134 13.3806C27.5043 13.2111 27.0007 13.1084 26.2149 13.0548C25.4201 13.0005 24.4115 13 23 13H17C15.5885 13 14.5799 13.0005 13.7851 13.0548ZM30.9906 19H9.00942C9.00011 19.5665 9 20.2225 9 21C9 22.4115 9.00054 23.4201 9.05477 24.2149C9.10839 25.0007 9.21112 25.5043 9.3806 25.9134C9.88807 27.1386 10.8614 28.1119 12.0866 28.6194C12.4957 28.7889 12.9993 28.8916 13.7851 28.9452C14.5799 28.9995 15.5885 29 17 29H23C24.4115 29 25.4201 28.9995 26.2149 28.9452C27.0007 28.8916 27.5043 28.7889 27.9134 28.6194C29.1386 28.1119 30.1119 27.1386 30.6194 25.9134C30.7889 25.5043 30.8916 25.0007 30.9452 24.2149C30.9995 23.4201 31 22.4115 31 21C31 20.2225 30.9999 19.5665 30.9906 19ZM25 22C25 21.4477 25.4477 21 26 21H28C28.5523 21 29 21.4477 29 22C29 22.5523 28.5523 23 28 23H26C25.4477 23 25 22.5523 25 22Z" fill="#A75BFF" />
                          </svg>
                        </div>
                        <div className="contentPayment">
                          <h6>Tarjeta de Crédito</h6>
                          <p>VISA, MasterCard, American Express</p>
                        </div>
                      </div>
                      <div className="checkPayment">
                        <Input type='checkbox'
                          checked={selectedCheckbox === 1}
                          onChange={() => handleCheckboxChange(1)} />
                      </div>
                    </Card>
                    <Card>
                      <div className="payment">
                        <div className="imgPayment">
                          <img src={pseLogo} />

                        </div>
                        <div className="contentPayment">
                          <h6>PSE</h6>
                          <p>Pago por transferencia</p>
                        </div>
                      </div>
                      <div className="checkPayment">
                        <Input type='checkbox'
                          checked={selectedCheckbox === 2}
                          onChange={() => handleCheckboxChange(2)} />
                      </div>
                    </Card>
                    <Card>
                      <div className="payment">
                        <div className="imgPayment">
                          <img src={efectyLogo} />
                        </div>
                        <div className="contentPayment">
                          <h6>Efecty</h6>
                          <p>Pago realizado por consignación</p>
                        </div>
                      </div>
                      <div className="checkPayment">
                        <Input type='checkbox'
                          checked={selectedCheckbox === 3}
                          onChange={() => handleCheckboxChange(3)} />
                      </div>
                    </Card>
                    {subtotalNumber >= 79900 ? (

                      <Card>
                        <div className="payment">
                          <div className="imgPayment">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3063 9H18.3604C19.611 8.99999 20.6081 8.99999 21.4132 9.06317C22.2378 9.12789 22.9466 9.26351 23.5987 9.58267C24.6475 10.0961 25.5078 10.919 26.0495 11.9403C26.3889 12.5801 26.5324 13.2757 26.6005 14.0764C26.6387 14.5256 26.6549 15.0361 26.6617 15.6176H27.7757C29.1866 15.6176 30.3043 15.6176 31.205 15.6883C32.1253 15.7606 32.9051 15.9112 33.6186 16.2604C34.7755 16.8267 35.7236 17.734 36.3203 18.859C36.6909 19.5578 36.8501 20.3215 36.926 21.2142C37 22.0843 37 23.1621 37 24.5135V26.0633C37 26.3429 37.0001 26.6116 36.9808 26.8386C36.9596 27.0876 36.9099 27.3746 36.7583 27.6605C36.5468 28.0592 36.2135 28.3759 35.8127 28.5721C35.5291 28.7109 35.2455 28.7564 34.9953 28.776C34.7642 28.7942 34.489 28.7941 34.1955 28.7941H33.9674C33.5313 30.0925 32.2694 31 30.8333 31C29.3973 31 28.1354 30.0925 27.6993 28.7941H15.0229C14.5868 30.0925 13.3249 31 11.8889 31C10.4096 31 9.1151 30.037 8.71773 28.6758C8.11401 28.5963 7.57317 28.4587 7.06797 28.2114C6.01912 27.6981 5.15884 26.8751 4.61714 25.8538C4.27778 25.214 4.13428 24.5185 4.06617 23.7177C3.99998 22.9395 3.99999 21.9775 4 20.7801V17.014C3.99999 15.8166 3.99998 14.8546 4.06617 14.0764C4.13428 13.2757 4.27778 12.5801 4.61714 11.9403C5.15884 10.919 6.01911 10.0961 7.06797 9.58267C7.72004 9.26351 8.42891 9.12789 9.2535 9.06317C10.0586 8.99999 11.0557 8.99999 12.3063 9ZM8.80097 26.6667C9.27478 25.4364 10.5001 24.5882 11.8889 24.5882C13.3249 24.5882 14.5868 25.4957 15.0229 26.7941H24.6667V17.0588C24.6667 15.8062 24.6658 14.9294 24.6077 14.2459C24.5507 13.5754 24.4439 13.1814 24.2827 12.8774C23.9438 12.2385 23.3989 11.7116 22.7194 11.379C22.3891 11.2173 21.9637 11.1125 21.2567 11.057C20.5391 11.0007 19.6204 11 18.3185 11H12.3481C11.0462 11 10.1276 11.0007 9.40999 11.057C8.70292 11.1125 8.27757 11.2173 7.94723 11.379C7.26778 11.7116 6.7229 12.2385 6.38399 12.8774C6.22278 13.1814 6.11601 13.5754 6.05897 14.2459C6.00084 14.9294 6 15.8062 6 17.0588V20.7353C6 21.9879 6.00084 22.8647 6.05897 23.5482C6.11601 24.2187 6.22278 24.6128 6.38399 24.9167C6.7229 25.5556 7.26778 26.0825 7.94723 26.4151C8.17065 26.5244 8.43613 26.6073 8.80097 26.6667ZM26.6667 17.6176V26.7941H27.6993C28.1354 25.4957 29.3973 24.5882 30.8333 24.5882C32.2694 24.5882 33.5313 25.4957 33.9674 26.7941H34.163C34.5003 26.7941 34.6956 26.7934 34.8388 26.7822C34.8985 26.7775 34.9313 26.7719 34.9459 26.769C34.9605 26.7602 34.9715 26.7503 34.9796 26.7407C34.9819 26.7263 34.9851 26.7032 34.988 26.6691C34.9992 26.5374 35 26.3554 35 26.0294V24.5588C35 23.1518 34.9992 22.1592 34.9332 21.3837C34.8684 20.6212 34.7459 20.1591 34.5534 19.7962C34.1595 19.0535 33.5268 18.4422 32.7393 18.0568C32.3476 17.865 31.8513 17.7452 31.0485 17.6822C30.2352 17.6184 29.196 17.6176 27.7333 17.6176H26.6667ZM11.8889 26.5882C11.144 26.5882 10.6049 27.1526 10.5928 27.7714L10.5926 27.7941C10.5926 28.4226 11.1347 29 11.8889 29C12.6431 29 13.1852 28.4226 13.1852 27.7941C13.1852 27.1656 12.6431 26.5882 11.8889 26.5882ZM30.8333 26.5882C30.0792 26.5882 29.537 27.1656 29.537 27.7941C29.537 28.4226 30.0792 29 30.8333 29C31.5875 29 32.1296 28.4226 32.1296 27.7941C32.1296 27.1656 31.5875 26.5882 30.8333 26.5882Z" fill="#A75BFF" />
                            </svg>

                          </div>
                          <div className="contentPayment">
                            <h6>Pago contra entrega</h6>
                            <p>Realizarás el pago al recibir tu pedido</p>
                          </div>
                        </div>
                        <div className="checkPayment">
                          <Input type='checkbox'
                            checked={selectedCheckbox === 4}
                            onChange={() => handleCheckboxChange(4)} />
                        </div>
                      </Card>
                    ) : (<></>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="containerDetailpurchase">
            <Card>
              <div className="subtotal">
                <p>Subtotal</p>
                <p>${subtotal.toLocaleString('en')}</p>
              </div>
              <div className="impuesto">
                <p>Impuesto</p>
                <p>$0</p>
              </div>
              <div className="envio">
                <p>Envío</p>
                <p>${costoEnvio.toLocaleString('en')}</p>
              </div>
              <div className="descuento">
                <p>Descuento</p>
                {discountCoupon && discountCoupon.total !== undefined ? (
                  <p>{discountCoupon.discount}</p>

                ) : (
                  <p>{cuponDescuento}</p>
                )}
              </div>
              <div className="cupon">
                <Input
                  addon={true}
                  name="cuoponDiscount"
                  classNanme="form-control"
                  style={{
                    borderRadius: "50px",

                  }}
                  type="text"
                  placeholder="Cupón promocional"
                  value={cupon}
                  onChange={(event) => setCupon(event.target.value)}
                />
                <a href="#" onClick={() => aplicarCupon()}>Aplicar cupón</a>
              </div>
              <div className="totalCash">
                <h6>Total a pagar</h6>
                {discountCoupon && discountCoupon.total !== undefined ? (
                  <h5><strong>{discountCoupon.total}</strong></h5>
                ) : (
                  <h5><strong>{total}</strong></h5>

                )}
              </div>
              <div className="capsulas">
                <div className="cut">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5738 6.63403C13.1555 6.60036 12.6195 6.5999 11.8575 6.5999H5.53365C5.20228 6.5999 4.93365 6.33126 4.93366 5.99989C4.93367 5.66852 5.2023 5.3999 5.53367 5.3999L11.8831 5.3999C12.6136 5.3999 13.1979 5.39989 13.6701 5.4379C14.1544 5.4769 14.5729 5.5588 14.9581 5.7522C15.5758 6.0623 16.0796 6.55796 16.3959 7.16963C16.5937 7.5522 16.6774 7.96782 16.7171 8.44703C16.7394 8.71606 16.7488 9.02184 16.7528 9.37049H17.3906C18.2149 9.37049 18.8697 9.37048 19.3978 9.413C19.9382 9.4565 20.3981 9.54742 20.8192 9.75885C21.5001 10.1007 22.0553 10.647 22.4038 11.3209C22.6199 11.7388 22.7127 12.1953 22.757 12.7297C22.8002 13.2511 22.8002 13.8972 22.8002 14.7086V15.6375C22.8002 15.8056 22.8002 15.9662 22.789 16.1018C22.7767 16.2499 22.748 16.4204 22.66 16.5906C22.5368 16.8288 22.3412 17.0207 22.1027 17.1405C21.933 17.2257 21.7633 17.2535 21.6149 17.2654C21.4785 17.2764 21.3164 17.2764 21.1453 17.2764L21.0251 17.2764C20.7695 18.0488 20.034 18.5999 19.178 18.5999C18.322 18.5999 17.5865 18.0487 17.3309 17.2764H9.94356C9.68799 18.0488 8.95248 18.5999 8.09648 18.5999C7.22063 18.5999 6.47092 18.0229 6.2324 17.2223C5.98721 17.21 5.79037 17.2042 5.53366 17.2042C5.20229 17.2042 4.93366 16.9356 4.93366 16.6042C4.93366 16.2729 5.20229 16.0042 5.53366 16.0042C5.80655 16.0042 6.02013 16.0104 6.26817 16.0226C6.53951 15.2784 7.26044 14.7528 8.09648 14.7528C8.95248 14.7528 9.68799 15.304 9.94356 16.0764H15.5557V10.2352C15.5557 9.4839 15.5553 8.95705 15.5212 8.54619C15.4877 8.1426 15.425 7.90448 15.33 7.72082C15.1312 7.33633 14.813 7.0221 14.4197 6.82463C14.2303 6.72952 13.9853 6.66716 13.5738 6.63403ZM16.7557 10.5705V16.0764H17.3309C17.5865 15.304 18.322 14.7528 19.178 14.7528C20.034 14.7528 20.7695 15.304 21.0251 16.0764H21.1256C21.3235 16.0764 21.4363 16.0759 21.5186 16.0693C21.547 16.067 21.5642 16.0644 21.5732 16.0628C21.5789 16.0588 21.5838 16.0542 21.5876 16.0493C21.5891 16.0404 21.5912 16.0255 21.5931 16.0026C21.5997 15.9228 21.6002 15.8129 21.6002 15.6175V14.7352C21.6002 13.8912 21.5997 13.2949 21.5611 12.8289C21.523 12.3701 21.4511 12.0911 21.3378 11.8721C21.1068 11.4253 20.7373 11.0605 20.2808 10.8313C20.0555 10.7181 19.769 10.6468 19.3015 10.6091C18.8272 10.5709 18.2207 10.5705 17.3646 10.5705H16.7557ZM2.71131 9.7499C2.71131 9.41853 2.97994 9.1499 3.31131 9.1499H7.08909C7.42046 9.1499 7.68909 9.41853 7.68909 9.7499C7.68909 10.0813 7.42046 10.3499 7.08909 10.3499H3.31131C2.97994 10.3499 2.71131 10.0813 2.71131 9.7499ZM1.2002 12.7499C1.2002 12.4185 1.46882 12.1499 1.8002 12.1499H7.84465C8.17602 12.1499 8.44465 12.4185 8.44465 12.7499C8.44465 13.0813 8.17602 13.3499 7.84465 13.3499H1.8002C1.46882 13.3499 1.2002 13.0813 1.2002 12.7499ZM8.09648 15.9528C7.68264 15.9528 7.36075 16.2775 7.3534 16.6624L7.35327 16.6764C7.35327 17.0676 7.67764 17.3999 8.09648 17.3999C8.51533 17.3999 8.83969 17.0676 8.83969 16.6764C8.83969 16.2851 8.51533 15.9528 8.09648 15.9528ZM19.178 15.9528C18.7591 15.9528 18.4348 16.2851 18.4348 16.6764C18.4348 17.0676 18.7591 17.3999 19.178 17.3999C19.5968 17.3999 19.9212 17.0676 19.9212 16.6764C19.9212 16.2851 19.5968 15.9528 19.178 15.9528Z" fill="#089705" />
                  </svg>
                  {subtotalNumber >= 79900 ? (
                    <p>3 días envío gratis</p>
                  ) : (
                    <p>3 dias envio</p>
                  )}
                </div>
                <div className="cut">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.005 5.40022C11.9396 5.39967 11.874 5.40992 11.811 5.43101L7.61104 6.83735C7.367 6.91906 7.2 7.14963 7.2 7.41197V11.3023C7.2 12.5265 7.48683 13.7335 8.03717 14.8255C8.79591 16.331 10.02 17.5482 11.5252 18.2949L11.7604 18.4116C11.8375 18.4498 11.9212 18.4685 12.0048 18.4678C12.0852 18.467 12.1654 18.4484 12.2396 18.4116L12.4748 18.2949C13.98 17.5482 15.2041 16.331 15.9628 14.8255C16.5132 13.7335 16.8 12.5265 16.8 11.3023V7.41197C16.8 7.14963 16.633 6.91906 16.389 6.83735L12.189 5.43101C12.1292 5.41099 12.0671 5.40074 12.005 5.40022ZM11.43 4.2931C11.6198 4.22956 11.8175 4.1986 12.0151 4.20026C12.2026 4.20184 12.3899 4.2328 12.57 4.2931L16.77 5.69944C17.506 5.94588 18 6.6366 18 7.41197V11.3023C18 12.7139 17.6693 14.1059 17.0344 15.3655C16.1592 17.1022 14.7466 18.5075 13.0081 19.3699L12.7729 19.4865C12.5342 19.605 12.2749 19.6654 12.0153 19.6677C11.7455 19.6701 11.4753 19.6097 11.2271 19.4865L10.9919 19.3699C9.25344 18.5075 7.84081 17.1022 6.96557 15.3655C6.33073 14.1059 6 12.7139 6 11.3023V7.41197C6 6.6366 6.49403 5.94588 7.23002 5.69944L11.43 4.2931ZM14.8233 9.73422C15.0581 9.96801 15.059 10.3479 14.8252 10.5827L11.8252 13.5963C11.7126 13.7094 11.5596 13.773 11.4 13.773C11.2404 13.773 11.0874 13.7094 10.9748 13.5963L9.77478 12.3909C9.54099 12.1561 9.54185 11.7762 9.7767 11.5424C10.0115 11.3086 10.3914 11.3094 10.6252 11.5443L11.4 12.3226L13.9748 9.73614C14.2086 9.50129 14.5885 9.50044 14.8233 9.73422Z" fill="#089705" />
                  </svg>
                  <p>100% auténtico</p>
                </div>
                <div className="cut">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0172 6.04295C15.493 6.00027 14.8237 5.9998 13.8833 5.9998H10.671C9.73398 5.9998 8.91937 6.00008 8.25046 6.04366C7.56064 6.0886 7.12226 6.17594 6.8863 6.29576C6.37376 6.55605 5.95742 6.97117 5.69662 7.48131C5.56607 7.73669 5.48568 8.05769 5.44346 8.57271C5.40067 9.09479 5.4002 9.76162 5.4002 10.699V12.2446C5.4002 13.182 5.40067 13.8488 5.44346 14.3709C5.48568 14.8859 5.56607 15.2069 5.69662 15.4623C5.95742 15.9724 6.37376 16.3876 6.8863 16.6478C7.12226 16.7677 7.56064 16.855 8.25046 16.9C8.91937 16.9435 9.73398 16.9438 10.671 16.9438H17.7482L17.1151 16.3128C16.8804 16.0789 16.8798 15.699 17.1137 15.4642C17.3476 15.2295 17.7275 15.2289 17.9622 15.4628L19.6237 17.1188C19.7367 17.2314 19.8002 17.3843 19.8002 17.5438C19.8002 17.7033 19.7367 17.8562 19.6237 17.9688L17.9622 19.6248C17.7275 19.8587 17.3476 19.8581 17.1137 19.6234C16.8798 19.3887 16.8804 19.0088 17.1151 18.7748L17.7482 18.1438H10.6549C9.7369 18.1438 8.88456 18.1438 8.17244 18.0974C7.47708 18.0521 6.81784 17.959 6.34295 17.7178C5.60494 17.343 5.00455 16.7448 4.62815 16.0085C4.39652 15.5554 4.2958 15.0585 4.24748 14.4689C4.20019 13.8921 4.20019 13.1761 4.2002 12.2712V10.6725C4.20019 9.7675 4.20019 9.05152 4.24748 8.47467C4.2958 7.88512 4.39652 7.38817 4.62815 6.93507C5.00455 6.19882 5.60494 5.6006 6.34295 5.22582C6.81784 4.98466 7.47708 4.8915 8.17244 4.8462C8.88456 4.7998 9.73691 4.7998 10.6549 4.7998L13.9097 4.7998C14.8179 4.7998 15.536 4.7998 16.1146 4.84691C16.7056 4.89504 17.2035 4.9953 17.6574 5.22582C18.3954 5.6006 18.9958 6.19882 19.3722 6.93507C19.6937 7.56381 19.7675 8.29073 19.7903 9.24953C19.8002 9.66468 19.8002 10.1427 19.8002 10.6931V12.2446C19.8002 13.3705 18.885 14.2798 17.7602 14.2798H15.3233C13.7703 14.2798 12.5079 13.0245 12.5079 11.4718C12.5079 9.9191 13.7703 8.66381 15.3233 8.66381H18.5637C18.5238 8.10005 18.4448 7.75716 18.3038 7.48131C18.043 6.97117 17.6266 6.55604 17.1141 6.29576C16.8572 6.16529 16.5343 6.08506 16.0172 6.04295ZM18.5986 9.86381H15.3233C14.4292 9.86381 13.7079 10.5856 13.7079 11.4718C13.7079 12.358 14.4292 13.0798 15.3233 13.0798H17.7602C18.226 13.0798 18.6002 12.704 18.6002 12.2446V10.699C18.6002 10.3943 18.6002 10.1174 18.5986 9.86381Z" fill="#089705" />
                    <path d="M14.7695 11.4719C14.7695 11.1671 15.0167 10.9199 15.3215 10.9199H15.8791C16.1839 10.9199 16.4311 11.1671 16.4311 11.4719C16.4311 11.7768 16.1839 12.0239 15.8791 12.0239H15.3215C15.0167 12.0239 14.7695 11.7768 14.7695 11.4719Z" fill="#089705" />
                    <path d="M7.01562 8.15991C7.01562 7.85505 7.26276 7.60791 7.56763 7.60791H10.8944C11.1993 7.60791 11.4464 7.85505 11.4464 8.15991C11.4464 8.46477 11.1993 8.71191 10.8944 8.71191H7.56763C7.26276 8.71191 7.01562 8.46477 7.01562 8.15991Z" fill="#089705" />
                  </svg>
                  <p>Garantía reembolso</p>
                </div>
                <div className="cut">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3552 6.04686C15.785 6.00027 15.0576 5.9998 14.0396 5.9998H10.5596C9.54506 5.9998 8.66083 6.00008 7.93427 6.04757C7.18681 6.09644 6.70298 6.19159 6.43764 6.32679C5.87315 6.61441 5.41421 7.07335 5.12659 7.63783C4.98068 7.92419 4.89268 8.28099 4.84666 8.84419C4.80008 9.4144 4.79961 10.1418 4.79961 11.1598V12.8398C4.79961 13.8578 4.80008 14.5852 4.84666 15.1554C4.89268 15.7186 4.98068 16.0754 5.12659 16.3618C5.41421 16.9263 5.87315 17.3852 6.43764 17.6728C6.70298 17.808 7.18681 17.9032 7.93427 17.952C8.66083 17.9995 9.54506 17.9998 10.5596 17.9998H14.0396C15.0576 17.9998 15.785 17.9993 16.3552 17.9527C16.9184 17.9067 17.2752 17.8187 17.5616 17.6728C18.1261 17.3852 18.585 16.9263 18.8726 16.3618C19.0185 16.0754 19.1065 15.7186 19.1526 15.1554C19.1567 15.1048 19.1605 15.053 19.1639 14.9998H15.5996C13.9428 14.9998 12.5996 13.6567 12.5996 11.9998C12.5996 10.3429 13.9428 8.9998 15.5996 8.9998H19.1639C19.1605 8.94663 19.1567 8.89479 19.1526 8.84419C19.1065 8.28099 19.0185 7.92419 18.8726 7.63783C18.585 7.07335 18.1261 6.61441 17.5616 6.32679C17.2752 6.18088 16.9184 6.09287 16.3552 6.04686ZM19.1975 10.1998H15.5996C14.6055 10.1998 13.7996 11.0057 13.7996 11.9998C13.7996 12.9939 14.6055 13.7998 15.5996 13.7998H19.1975C19.1996 13.5111 19.1996 13.1929 19.1996 12.8398V11.1598C19.1996 10.8067 19.1996 10.4886 19.1975 10.1998ZM16.4529 4.85084C17.0904 4.90292 17.6226 5.01111 18.1064 5.25758C18.8967 5.66025 19.5392 6.30276 19.9418 7.09304C20.1883 7.57677 20.2965 8.10906 20.3486 8.74647C20.3996 9.37126 20.3996 10.1476 20.3996 11.1331V12.8665C20.3996 13.852 20.3996 14.6284 20.3486 15.2531C20.2965 15.8905 20.1883 16.4228 19.9418 16.9066C19.5392 17.6968 18.8967 18.3394 18.1064 18.742C17.6226 18.9885 17.0904 19.0967 16.4529 19.1488C15.8282 19.1998 15.0518 19.1998 14.0663 19.1998H10.5435C9.548 19.1998 8.6259 19.1998 7.856 19.1495C7.10285 19.1002 6.39759 18.9992 5.89285 18.742C5.10257 18.3394 4.46005 17.6968 4.05738 16.9066C3.81091 16.4228 3.70273 15.8905 3.65065 15.2531C3.5996 14.6283 3.59961 13.852 3.59961 12.8665V11.1332C3.59961 10.1476 3.5996 9.37126 3.65065 8.74647C3.70273 8.10906 3.81091 7.57677 4.05738 7.09304C4.46005 6.30276 5.10257 5.66025 5.89285 5.25758C6.39759 5.0004 7.10285 4.89936 7.856 4.85013C8.6259 4.7998 9.54799 4.7998 10.5435 4.7998L14.0663 4.7998C15.0518 4.7998 15.8282 4.7998 16.4529 4.85084Z" fill="#089705" />
                    <path d="M15 11.9999C15 11.6685 15.2686 11.3999 15.6 11.3999H16.2C16.5314 11.3999 16.8 11.6685 16.8 11.9999C16.8 12.3313 16.5314 12.5999 16.2 12.5999H15.6C15.2686 12.5999 15 12.3313 15 11.9999Z" fill="#089705" />
                    <path d="M6.59961 8.3998C6.59961 8.06843 6.86824 7.7998 7.19961 7.7998H10.7996C11.131 7.7998 11.3996 8.06843 11.3996 8.3998C11.3996 8.73118 11.131 8.9998 10.7996 8.9998H7.19961C6.86824 8.9998 6.59961 8.73118 6.59961 8.3998Z" fill="#089705" />
                  </svg>
                  <p>Pago auténtico</p>
                </div>
              </div>
            </Card>
            {activeStep < 3 && (
              <>
                <div className="toPay">
                  <a href="/detailCart">Ir al carrito</a>
                </div>
                <div className="awaitShopping">
                  <a href="#" onClick={() => handleStepClick(3, 100)} type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Proceder con la compra</a>
                </div>
              </>

            )}
            {activeStep >= 3 && (
              <>
                <div className="turnCheckout">
                  <a href="#" onClick={() => handleStepClick(2, 50)} type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Regresar al checkout</a>
                </div>
                {botonDeshabilitado ? (
                  <div className="toPay">
                    <a href="#" onClick={() => setModalSuccessPurchase(true)}>Finalizar compra</a>
                  </div>

                ) : (
                  <div className="toPay">
                    <a href="#" onClick={() => setModalSuccessPurchase(true)}
                      style={{
                        display: 'none'
                      }}
                    >Finalizar compra</a>
                  </div>
                )}

              </>
            )}
          </div>
        </div>
        <div className="containerCheckoutResponsive">
          {productsCart.map((products, index) => (
            <Card key={index}>
              <div className="caracteristicasDetalleDelProductoResponsive">
                <div className="img">
                  <img src={baseUrlImageThumbnail + products.thumbnail} alt={products.name} style={{ width: '100px', height: '100px' }} />
                </div>
                <div className="info">
                  <div className="starts">
                    <img src={start} alt="" />
                    <img src={start} alt="" />
                    <img src={start} alt="" />
                    <img src={start} alt="" />
                    <img src={start} alt="" />
                  </div>
                  <div className="productInfo">
                    <h6>{products.name}</h6>
                    {products.price >= 79900 ? (
                      <div className='cutEnvio'>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M13.5738 6.63403C13.1555 6.60036 12.6195 6.5999 11.8575 6.5999H5.53365C5.20228 6.5999 4.93365 6.33126 4.93366 5.99989C4.93367 5.66852 5.2023 5.3999 5.53367 5.3999L11.8831 5.3999C12.6136 5.3999 13.1979 5.39989 13.6701 5.4379C14.1544 5.4769 14.5729 5.5588 14.9581 5.7522C15.5758 6.0623 16.0796 6.55796 16.3959 7.16963C16.5937 7.5522 16.6774 7.96782 16.7171 8.44703C16.7394 8.71606 16.7488 9.02184 16.7528 9.37049H17.3906C18.2149 9.37049 18.8697 9.37048 19.3978 9.413C19.9382 9.4565 20.3981 9.54742 20.8192 9.75885C21.5001 10.1007 22.0553 10.647 22.4038 11.3209C22.6199 11.7388 22.7127 12.1953 22.757 12.7297C22.8002 13.2511 22.8002 13.8972 22.8002 14.7086V15.6375C22.8002 15.8056 22.8002 15.9662 22.789 16.1018C22.7767 16.2499 22.748 16.4204 22.66 16.5906C22.5368 16.8288 22.3412 17.0207 22.1027 17.1405C21.933 17.2257 21.7633 17.2535 21.6149 17.2654C21.4785 17.2764 21.3164 17.2764 21.1453 17.2764L21.0251 17.2764C20.7695 18.0488 20.034 18.5999 19.178 18.5999C18.322 18.5999 17.5865 18.0487 17.3309 17.2764H9.94356C9.68799 18.0488 8.95248 18.5999 8.09648 18.5999C7.22063 18.5999 6.47092 18.0229 6.2324 17.2223C5.98721 17.21 5.79037 17.2042 5.53366 17.2042C5.20229 17.2042 4.93366 16.9356 4.93366 16.6042C4.93366 16.2729 5.20229 16.0042 5.53366 16.0042C5.80655 16.0042 6.02013 16.0104 6.26817 16.0226C6.53951 15.2784 7.26044 14.7528 8.09648 14.7528C8.95248 14.7528 9.68799 15.304 9.94356 16.0764H15.5557V10.2352C15.5557 9.4839 15.5553 8.95705 15.5212 8.54619C15.4877 8.1426 15.425 7.90448 15.33 7.72082C15.1312 7.33633 14.813 7.0221 14.4197 6.82463C14.2303 6.72952 13.9853 6.66716 13.5738 6.63403ZM16.7557 10.5705V16.0764H17.3309C17.5865 15.304 18.322 14.7528 19.178 14.7528C20.034 14.7528 20.7695 15.304 21.0251 16.0764H21.1256C21.3235 16.0764 21.4363 16.0759 21.5186 16.0693C21.547 16.067 21.5642 16.0644 21.5732 16.0628C21.5789 16.0588 21.5838 16.0542 21.5876 16.0493C21.5891 16.0404 21.5912 16.0255 21.5931 16.0026C21.5997 15.9228 21.6002 15.8129 21.6002 15.6175V14.7352C21.6002 13.8912 21.5997 13.2949 21.5611 12.8289C21.523 12.3701 21.4511 12.0911 21.3378 11.8721C21.1068 11.4253 20.7373 11.0605 20.2808 10.8313C20.0555 10.7181 19.769 10.6468 19.3015 10.6091C18.8272 10.5709 18.2207 10.5705 17.3646 10.5705H16.7557ZM2.71131 9.7499C2.71131 9.41853 2.97994 9.1499 3.31131 9.1499H7.08909C7.42046 9.1499 7.68909 9.41853 7.68909 9.7499C7.68909 10.0813 7.42046 10.3499 7.08909 10.3499H3.31131C2.97994 10.3499 2.71131 10.0813 2.71131 9.7499ZM1.2002 12.7499C1.2002 12.4185 1.46882 12.1499 1.8002 12.1499H7.84465C8.17602 12.1499 8.44465 12.4185 8.44465 12.7499C8.44465 13.0813 8.17602 13.3499 7.84465 13.3499H1.8002C1.46882 13.3499 1.2002 13.0813 1.2002 12.7499ZM8.09648 15.9528C7.68264 15.9528 7.36075 16.2775 7.3534 16.6624L7.35327 16.6764C7.35327 17.0676 7.67764 17.3999 8.09648 17.3999C8.51533 17.3999 8.83969 17.0676 8.83969 16.6764C8.83969 16.2851 8.51533 15.9528 8.09648 15.9528ZM19.178 15.9528C18.7591 15.9528 18.4348 16.2851 18.4348 16.6764C18.4348 17.0676 18.7591 17.3999 19.178 17.3999C19.5968 17.3999 19.9212 17.0676 19.9212 16.6764C19.9212 16.2851 19.5968 15.9528 19.178 15.9528Z" fill="#089705" />
                        </svg>
                        <p>Envío Gratis</p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <h5>$ {products.price.toLocaleString('en')}</h5>
                    <div className="cant">
                      <p>Cantidad:</p>
                      <input type="number" value={products.quantity} disabled />
                    </div>
                  </div>
                </div>
                <div className="deleteProduct">
                </div>
              </div>
            </Card>
          ))}
          <div className="containerCupon">
            <input type="text"
              placeholder='¿Tienes un cupón?'
              value={cupon}
              onChange={(e) => setCupon(e.target.value)} />
            <div className="btnCupon">
              <a href="#" onClick={() => aplicarCupon()}>Aplicar cupón</a>
            </div>
          </div>
          <div className="factura">
            <p className='title'>Factura</p>
            <span className="subtotal">
              <p className="def">En productos</p>
              <p className="precio">$ {subtotal}</p>
            </span>
            <span className="costoEnvio">
              <p className="def">Costo de envío</p>
              <p className="precio">$ {costoEnvio}</p>
            </span>

            <span className="cupon">
              <p className="def">Cupón</p>
              {discountCoupon && discountCoupon.total !== undefined ? (
                <p className='precio'>
                  {discountCoupon.discount}
                </p>

              ) : (<p className="precio"> {cuponDescuento}</p>)}
            </span>
            <span className="impuesto">
              <p className="def">Impuesto</p>
              <p className="precio">$ 0</p>
            </span>
            <div className="containertotalAPagarResponsive">
              <p>Total a pagar</p>
              {discountCoupon && discountCoupon.total !== undefined ? (
                <p>{discountCoupon.total}</p>
              ) : (

                <p>{total}</p>
              )}
            </div>
            {/* elegir direccion Responsive */}
            <p className="title" style={{ marginTop: '30px' }}>Dirección de entrega
            </p>
            <div className="card-body direcciones">
              <Card>
                <ul>

                  {address && address.map((addr, index) => (

                    <li key={index}>
                      <div className="img">
                        {addr.address_type === "home" ? <svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8722 8.13225C16.3032 7.95546 15.6968 7.95546 15.1278 8.13225C14.8494 8.21876 14.5513 8.38528 14.1231 8.72385C13.6875 9.0683 13.1692 9.54775 12.4336 10.2293L8.97759 13.4312C8.19904 14.1526 7.91535 14.4233 7.71401 14.7351C7.52397 15.0295 7.38277 15.3555 7.29692 15.6996C7.20556 16.0658 7.2 16.4684 7.2 17.5456V19.2748C7.2 20.3946 7.20059 21.1877 7.24981 21.8078C7.29834 22.4193 7.39035 22.7931 7.53552 23.0864C7.83014 23.6816 8.29804 24.1612 8.86828 24.4603C9.1454 24.6057 9.49997 24.6991 10.0889 24.7486C10.5829 24.7902 11.1912 24.7979 12 24.7993V21.6C12 21.5627 12 21.5261 12 21.4899C11.9996 20.8536 11.9994 20.3811 12.109 19.9717C12.4049 18.8675 13.2675 18.0049 14.3718 17.709C14.7811 17.5993 15.2536 17.5996 15.8899 17.5999C15.9261 17.5999 15.9628 17.6 16 17.6C16.0372 17.6 16.0739 17.5999 16.1101 17.5999C16.7464 17.5996 17.2189 17.5993 17.6282 17.709C18.7325 18.0049 19.5951 18.8675 19.891 19.9717C20.0006 20.3811 20.0004 20.8536 20 21.4899C20 21.5261 20 21.5627 20 21.6V24.7993C20.8088 24.7979 21.4171 24.7902 21.9111 24.7486C22.5 24.6991 22.8546 24.6057 23.1317 24.4603C23.702 24.1612 24.1699 23.6816 24.4645 23.0864C24.6097 22.7931 24.7017 22.4193 24.7502 21.8078C24.7994 21.1877 24.8 20.3946 24.8 19.2748V17.5456C24.8 16.4684 24.7944 16.0658 24.7031 15.6996C24.6172 15.3555 24.476 15.0295 24.286 14.7351C24.0847 14.4233 23.801 14.1526 23.0224 13.4312L19.5664 10.2293C18.8308 9.54775 18.3125 9.0683 17.8769 8.72385C17.4487 8.38528 17.1506 8.21876 16.8722 8.13225ZM18.4 24.7997V21.6C18.4 20.8045 18.3931 20.5637 18.3455 20.3859C18.1975 19.8337 17.7663 19.4024 17.2141 19.2545C17.0363 19.2068 16.7955 19.2 16 19.2C15.2045 19.2 14.9637 19.2068 14.7859 19.2545C14.2337 19.4024 13.8025 19.8337 13.6545 20.3859C13.6069 20.5637 13.6 20.8045 13.6 21.6V24.7997H18.4ZM14.6531 6.6043C15.5313 6.33144 16.4687 6.33144 17.3469 6.6043C17.8899 6.77302 18.3658 7.07061 18.8693 7.46882C19.3599 7.85672 19.9238 8.37919 20.6296 9.0331L24.1098 12.2576C24.1354 12.2812 24.1606 12.3046 24.1856 12.3277C24.862 12.9542 25.3063 13.3656 25.6302 13.8673C25.9162 14.3104 26.1274 14.7989 26.2555 15.3123C26.4003 15.8928 26.4002 16.5041 26.4 17.4425C26.4 17.4764 26.4 17.5108 26.4 17.5456V19.3089C26.4 20.3869 26.4 21.2435 26.3452 21.9344C26.2891 22.6413 26.1718 23.2438 25.8985 23.7961C25.4568 24.6885 24.7498 25.4184 23.8749 25.8773C23.3306 26.1628 22.7368 26.2848 22.0452 26.343C21.3712 26.3997 20.5368 26.3997 19.4918 26.3997H12.5082C11.4633 26.3997 10.6288 26.3997 9.95485 26.343C9.26317 26.2848 8.66938 26.1628 8.12508 25.8773C7.25023 25.4184 6.54324 24.6885 6.10155 23.7961C5.82819 23.2438 5.71093 22.6413 5.65483 21.9344C5.59999 21.2435 5.6 20.3869 5.6 19.3089L5.6 17.5456C5.6 17.5108 5.6 17.4764 5.59999 17.4425C5.5998 16.5041 5.59968 15.8928 5.7445 15.3123C5.8726 14.7989 6.08377 14.3104 6.36982 13.8673C6.69373 13.3656 7.13799 12.9542 7.81445 12.3277C7.83937 12.3046 7.86462 12.2812 7.89018 12.2576L11.3705 9.03309C12.0762 8.37919 12.6401 7.85672 13.1307 7.46882C13.6343 7.07061 14.1101 6.77302 14.6531 6.6043Z" fill="#171523" />
                        </svg>
                          : addr.address_type && addr.address_type === "permanent" ? <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-buildings" viewBox="0 0 16 16">
                            <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z" />
                            <path d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z" />
                          </svg> : addr.address_type && addr.address_type === 'others' ? <svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0002 7.19961C12.0476 7.19961 8.8002 10.5151 8.8002 14.6592C8.8002 15.441 9.0957 16.3662 9.63392 17.3813C10.167 18.3868 10.9057 19.4202 11.7148 20.4025C13.3132 22.3429 15.1277 24.0136 16.0002 24.7814C16.8727 24.0136 18.6872 22.3429 20.2856 20.4025C21.0947 19.4202 21.8334 18.3868 22.3665 17.3813C22.9047 16.3662 23.2002 15.441 23.2002 14.6592C23.2002 10.5151 19.9528 7.19961 16.0002 7.19961ZM7.2002 14.6592C7.2002 9.67997 11.1162 5.59961 16.0002 5.59961C20.8842 5.59961 24.8002 9.67997 24.8002 14.6592C24.8002 15.8123 24.376 17.0068 23.7801 18.1308C23.179 19.2645 22.3692 20.3895 21.5206 21.4197C19.8232 23.4803 17.9107 25.2332 17.0241 26.0116C16.4349 26.5289 15.5655 26.5289 14.9763 26.0116C14.0897 25.2332 12.1772 23.4803 10.4798 21.4197C9.63123 20.3895 8.82137 19.2645 8.22031 18.1308C7.6244 17.0068 7.2002 15.8123 7.2002 14.6592ZM16.0002 11.3647C14.9994 11.3647 14.1335 12.2189 14.1335 13.3414C14.1335 14.4639 14.9994 15.3181 16.0002 15.3181C17.0009 15.3181 17.8669 14.4639 17.8669 13.3414C17.8669 12.2189 17.0009 11.3647 16.0002 11.3647ZM12.5335 13.3414C12.5335 11.3968 14.0554 9.76468 16.0002 9.76468C17.945 9.76468 19.4669 11.3968 19.4669 13.3414C19.4669 15.286 17.945 16.9181 16.0002 16.9181C14.0554 16.9181 12.5335 15.286 12.5335 13.3414Z" fill="black" />
                          </svg> : addr.address_type}

                      </div>
                      <div className="descripcion">
                        <p> <strong>{addr.address_type === "home" ? "Hogar" : addr.address_type && addr.address_type === "permanent" ? "Trabajo" : addr.address_type && addr.address_type === "others" ? "Otro" : addr.address_type}</strong> </p>
                        <p>{addr.address}</p>
                      </div>
                      <div className="opciones">
                        <a href="#" className='updateDireccion' onClick={() => updateBtn(addr.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </a>
                        <div className="checkPaymentResponsive" >
                          <Input type='radio' style={{ width: '30px', height: '30px', margin: '0' }}
                            checked={selectedAddressIndex === index}
                            onChange={() => checkboxChange(index, addr.id)} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="btnAdd">
                  <a href="#" onClick={() => setModalAddressCheckout(true)}>Agregar nueva dirección</a>
                </div>
              </Card>
            </div>

            <p className='title' style={{ marginTop: '30px' }}>Método de pago
            </p>
            <div className="card-body paymentMethods">

              <Card>
                <div className="payment">
                  <div className="imgPayment">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9632 11H23.0368C24.4035 11 25.4801 11 26.351 11.0594C27.2387 11.12 27.9853 11.2456 28.6788 11.5328C30.394 12.2433 31.7567 13.606 32.4672 15.3212C32.7853 16.0893 32.906 16.9257 32.9584 17.9489C33 18.7623 33 19.7511 33 20.9741V21.0369C33 22.4035 33 23.4801 32.9406 24.351C32.88 25.2387 32.7544 25.9853 32.4672 26.6788C31.7567 28.394 30.394 29.7567 28.6788 30.4672C27.9853 30.7544 27.2387 30.88 26.351 30.9406C25.4801 31 24.4035 31 23.0369 31H16.9631C15.5965 31 14.5199 31 13.649 30.9406C12.7613 30.88 12.0147 30.7544 11.3212 30.4672C9.60602 29.7567 8.2433 28.394 7.53284 26.6788C7.2456 25.9853 7.11997 25.2387 7.05941 24.351C6.99999 23.4801 7 22.4035 7 21.0368V20.974C7 19.7511 7 18.7623 7.04161 17.9489C7.09395 16.9257 7.21468 16.0893 7.53284 15.3212C8.2433 13.606 9.60602 12.2433 11.3212 11.5328C12.0147 11.2456 12.7613 11.12 13.649 11.0594C14.5199 11 15.5965 11 16.9632 11ZM13.7851 13.0548C12.9993 13.1084 12.4957 13.2111 12.0866 13.3806C10.8614 13.8881 9.88807 14.8614 9.3806 16.0866C9.27532 16.3407 9.19613 16.6303 9.13834 17H30.8617C30.8039 16.6303 30.7247 16.3407 30.6194 16.0866C30.1119 14.8614 29.1386 13.8881 27.9134 13.3806C27.5043 13.2111 27.0007 13.1084 26.2149 13.0548C25.4201 13.0005 24.4115 13 23 13H17C15.5885 13 14.5799 13.0005 13.7851 13.0548ZM30.9906 19H9.00942C9.00011 19.5665 9 20.2225 9 21C9 22.4115 9.00054 23.4201 9.05477 24.2149C9.10839 25.0007 9.21112 25.5043 9.3806 25.9134C9.88807 27.1386 10.8614 28.1119 12.0866 28.6194C12.4957 28.7889 12.9993 28.8916 13.7851 28.9452C14.5799 28.9995 15.5885 29 17 29H23C24.4115 29 25.4201 28.9995 26.2149 28.9452C27.0007 28.8916 27.5043 28.7889 27.9134 28.6194C29.1386 28.1119 30.1119 27.1386 30.6194 25.9134C30.7889 25.5043 30.8916 25.0007 30.9452 24.2149C30.9995 23.4201 31 22.4115 31 21C31 20.2225 30.9999 19.5665 30.9906 19ZM25 22C25 21.4477 25.4477 21 26 21H28C28.5523 21 29 21.4477 29 22C29 22.5523 28.5523 23 28 23H26C25.4477 23 25 22.5523 25 22Z" fill="#A75BFF" />
                    </svg>
                  </div>
                  <div className="contentPayment">
                    <h6>Tarjeta Débito</h6>
                    <p>Paga con tarjetas débito</p>
                  </div>
                  <div className="checkPayment">
                    <Input type='radio'
                      checked={selectedCheckbox === 0}
                      onChange={() => handleCheckboxChange(0)} />
                  </div>
                </div>
              </Card>
              <Card>
                <div className="payment">
                  <div className="imgPayment">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9632 11H23.0368C24.4035 11 25.4801 11 26.351 11.0594C27.2387 11.12 27.9853 11.2456 28.6788 11.5328C30.394 12.2433 31.7567 13.606 32.4672 15.3212C32.7853 16.0893 32.906 16.9257 32.9584 17.9489C33 18.7623 33 19.7511 33 20.9741V21.0369C33 22.4035 33 23.4801 32.9406 24.351C32.88 25.2387 32.7544 25.9853 32.4672 26.6788C31.7567 28.394 30.394 29.7567 28.6788 30.4672C27.9853 30.7544 27.2387 30.88 26.351 30.9406C25.4801 31 24.4035 31 23.0369 31H16.9631C15.5965 31 14.5199 31 13.649 30.9406C12.7613 30.88 12.0147 30.7544 11.3212 30.4672C9.60602 29.7567 8.2433 28.394 7.53284 26.6788C7.2456 25.9853 7.11997 25.2387 7.05941 24.351C6.99999 23.4801 7 22.4035 7 21.0368V20.974C7 19.7511 7 18.7623 7.04161 17.9489C7.09395 16.9257 7.21468 16.0893 7.53284 15.3212C8.2433 13.606 9.60602 12.2433 11.3212 11.5328C12.0147 11.2456 12.7613 11.12 13.649 11.0594C14.5199 11 15.5965 11 16.9632 11ZM13.7851 13.0548C12.9993 13.1084 12.4957 13.2111 12.0866 13.3806C10.8614 13.8881 9.88807 14.8614 9.3806 16.0866C9.27532 16.3407 9.19613 16.6303 9.13834 17H30.8617C30.8039 16.6303 30.7247 16.3407 30.6194 16.0866C30.1119 14.8614 29.1386 13.8881 27.9134 13.3806C27.5043 13.2111 27.0007 13.1084 26.2149 13.0548C25.4201 13.0005 24.4115 13 23 13H17C15.5885 13 14.5799 13.0005 13.7851 13.0548ZM30.9906 19H9.00942C9.00011 19.5665 9 20.2225 9 21C9 22.4115 9.00054 23.4201 9.05477 24.2149C9.10839 25.0007 9.21112 25.5043 9.3806 25.9134C9.88807 27.1386 10.8614 28.1119 12.0866 28.6194C12.4957 28.7889 12.9993 28.8916 13.7851 28.9452C14.5799 28.9995 15.5885 29 17 29H23C24.4115 29 25.4201 28.9995 26.2149 28.9452C27.0007 28.8916 27.5043 28.7889 27.9134 28.6194C29.1386 28.1119 30.1119 27.1386 30.6194 25.9134C30.7889 25.5043 30.8916 25.0007 30.9452 24.2149C30.9995 23.4201 31 22.4115 31 21C31 20.2225 30.9999 19.5665 30.9906 19ZM25 22C25 21.4477 25.4477 21 26 21H28C28.5523 21 29 21.4477 29 22C29 22.5523 28.5523 23 28 23H26C25.4477 23 25 22.5523 25 22Z" fill="#A75BFF" />
                    </svg>
                  </div>
                  <div className="contentPayment">
                    <h6>Tarjeta de Crédito</h6>
                    <p>VISA, MasterCard, American Express</p>
                  </div>
                  <div className="checkPayment">
                    <Input type='radio'
                      checked={selectedCheckbox === 1}
                      onChange={() => handleCheckboxChange(1)} />
                  </div>
                </div>
              </Card>
              <Card>
                <div className="payment">
                  <div className="imgPayment">
                    <img src={pseLogo} />
                    {/* <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <rect width="40" height="40" rx="20" fill="url(#pattern0)" />
                      <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlinkHref="#image0_1551_1918" transform="scale(0.00333333)" />
                        </pattern>
                        <image id="image0_1551_1918" width="300" height="300" xlinkHref="data:image/png;base64,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" />
                      </defs>
                    </svg> */}

                  </div>
                  <div className="contentPayment">
                    <h6>PSE</h6>
                    <p>Pago por transferencia</p>
                  </div>
                  <div className="checkPayment">
                    <Input type='radio'
                      checked={selectedCheckbox === 2}
                      onChange={() => handleCheckboxChange(2)} />
                  </div>
                </div>
              </Card>
              <Card>
                <div className="payment">
                  <div className="imgPayment">
                    <img src={efectyLogo} />
                    {/* <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <rect width="40" height="40" rx="20" fill="#F7EA23" />
                      <rect width="40" height="40" rx="20" fill="url(#pattern0)" />
                      <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlinkHref="#image0_1283_904" transform="translate(0.0674399 0.07122) scale(0.00275859)" />
                        </pattern>
                        <image id="image0_1283_904" width="300" height="300" xlinkHref="data:image/png;base64,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" />
                      </defs>
                    </svg> */}


                  </div>
                  <div className="contentPayment">
                    <h6>Efecty</h6>
                    <p>Pago realizado por consignación</p>
                  </div>
                  <div className="checkPayment">
                    <Input type='radio'
                      checked={selectedCheckbox === 3}
                      onChange={() => handleCheckboxChange(3)} />
                  </div>
                </div>
              </Card>
              <Card>
                {subtotalNumber >= 79900 ? (
                  <div className="payment">
                    <div className="imgPayment">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3063 9H18.3604C19.611 8.99999 20.6081 8.99999 21.4132 9.06317C22.2378 9.12789 22.9466 9.26351 23.5987 9.58267C24.6475 10.0961 25.5078 10.919 26.0495 11.9403C26.3889 12.5801 26.5324 13.2757 26.6005 14.0764C26.6387 14.5256 26.6549 15.0361 26.6617 15.6176H27.7757C29.1866 15.6176 30.3043 15.6176 31.205 15.6883C32.1253 15.7606 32.9051 15.9112 33.6186 16.2604C34.7755 16.8267 35.7236 17.734 36.3203 18.859C36.6909 19.5578 36.8501 20.3215 36.926 21.2142C37 22.0843 37 23.1621 37 24.5135V26.0633C37 26.3429 37.0001 26.6116 36.9808 26.8386C36.9596 27.0876 36.9099 27.3746 36.7583 27.6605C36.5468 28.0592 36.2135 28.3759 35.8127 28.5721C35.5291 28.7109 35.2455 28.7564 34.9953 28.776C34.7642 28.7942 34.489 28.7941 34.1955 28.7941H33.9674C33.5313 30.0925 32.2694 31 30.8333 31C29.3973 31 28.1354 30.0925 27.6993 28.7941H15.0229C14.5868 30.0925 13.3249 31 11.8889 31C10.4096 31 9.1151 30.037 8.71773 28.6758C8.11401 28.5963 7.57317 28.4587 7.06797 28.2114C6.01912 27.6981 5.15884 26.8751 4.61714 25.8538C4.27778 25.214 4.13428 24.5185 4.06617 23.7177C3.99998 22.9395 3.99999 21.9775 4 20.7801V17.014C3.99999 15.8166 3.99998 14.8546 4.06617 14.0764C4.13428 13.2757 4.27778 12.5801 4.61714 11.9403C5.15884 10.919 6.01911 10.0961 7.06797 9.58267C7.72004 9.26351 8.42891 9.12789 9.2535 9.06317C10.0586 8.99999 11.0557 8.99999 12.3063 9ZM8.80097 26.6667C9.27478 25.4364 10.5001 24.5882 11.8889 24.5882C13.3249 24.5882 14.5868 25.4957 15.0229 26.7941H24.6667V17.0588C24.6667 15.8062 24.6658 14.9294 24.6077 14.2459C24.5507 13.5754 24.4439 13.1814 24.2827 12.8774C23.9438 12.2385 23.3989 11.7116 22.7194 11.379C22.3891 11.2173 21.9637 11.1125 21.2567 11.057C20.5391 11.0007 19.6204 11 18.3185 11H12.3481C11.0462 11 10.1276 11.0007 9.40999 11.057C8.70292 11.1125 8.27757 11.2173 7.94723 11.379C7.26778 11.7116 6.7229 12.2385 6.38399 12.8774C6.22278 13.1814 6.11601 13.5754 6.05897 14.2459C6.00084 14.9294 6 15.8062 6 17.0588V20.7353C6 21.9879 6.00084 22.8647 6.05897 23.5482C6.11601 24.2187 6.22278 24.6128 6.38399 24.9167C6.7229 25.5556 7.26778 26.0825 7.94723 26.4151C8.17065 26.5244 8.43613 26.6073 8.80097 26.6667ZM26.6667 17.6176V26.7941H27.6993C28.1354 25.4957 29.3973 24.5882 30.8333 24.5882C32.2694 24.5882 33.5313 25.4957 33.9674 26.7941H34.163C34.5003 26.7941 34.6956 26.7934 34.8388 26.7822C34.8985 26.7775 34.9313 26.7719 34.9459 26.769C34.9605 26.7602 34.9715 26.7503 34.9796 26.7407C34.9819 26.7263 34.9851 26.7032 34.988 26.6691C34.9992 26.5374 35 26.3554 35 26.0294V24.5588C35 23.1518 34.9992 22.1592 34.9332 21.3837C34.8684 20.6212 34.7459 20.1591 34.5534 19.7962C34.1595 19.0535 33.5268 18.4422 32.7393 18.0568C32.3476 17.865 31.8513 17.7452 31.0485 17.6822C30.2352 17.6184 29.196 17.6176 27.7333 17.6176H26.6667ZM11.8889 26.5882C11.144 26.5882 10.6049 27.1526 10.5928 27.7714L10.5926 27.7941C10.5926 28.4226 11.1347 29 11.8889 29C12.6431 29 13.1852 28.4226 13.1852 27.7941C13.1852 27.1656 12.6431 26.5882 11.8889 26.5882ZM30.8333 26.5882C30.0792 26.5882 29.537 27.1656 29.537 27.7941C29.537 28.4226 30.0792 29 30.8333 29C31.5875 29 32.1296 28.4226 32.1296 27.7941C32.1296 27.1656 31.5875 26.5882 30.8333 26.5882Z" fill="#A75BFF" />
                      </svg>

                    </div>
                    <div className="contentPayment">
                      <h6>Pago contra entrega</h6>
                      <p>Realizarás el pago al recibir tu pedido</p>
                    </div>
                    <div className="checkPayment">
                      <Input type='radio'
                        checked={selectedCheckbox === 4}
                        onChange={() => handleCheckboxChange(4)} />
                    </div>

                  </div>
                ) : (<></>
                )}
              </Card>

            </div>


          </div>



        </div>
        {isScrollModalEnabled && (
          <div id="scrollModalCheckout" className="scroll-modal">
            <div className="scroll-modal-content">
              {/* Contenido del modal */}
              <div className="containerInfoPedido">
                <p>Tu pedido tardará de 3 a 4 días hábiles en llegar a tu domicilio</p>
              </div>

              {botonDeshabilitado ? (
                <div className="containerToPayResponsive">
                  <a href="#" onClick={() => setModalSuccessPurchase(true)} >Finalizar compra</a>
                </div>
              ) : (
                <div className="containerToPayResponsive">
                  <a href="#" style={{ pointerEvents: 'none', backgroundColor: 'gray', height: '100%', borderRadius: '32px', borderColor: 'gray' }} >Finalizar compra</a>
                </div>
              )}
            </div>
          </div>
        )}



      </div>

      {/* Modales */}
      <Modal
        className="modal-dialog-centered modal-lg"
        toggle={() => closeAddressCheckoutModal()}
        isOpen={modalAddressCheckout}
        onOpened={() => setIsScrollModalEnabled(false)}
        onClosed={() => setIsScrollModalEnabled(true)}
      >
        <ModalBody>
          <AdressCheckout closeModalAddress={closeModalAddress} deptos={deptos} refreshAddress={refreshAddress} />
        </ModalBody>
      </Modal>

      <Modal
        className="modal-dialog-centered modal-lg"
        toggle={() => setModalAddressUpdate(false)}
        isOpen={modalAddressUpdate}
        onOpened={() => setIsScrollModalEnabled(false)}
        onClosed={() => setIsScrollModalEnabled(true)}
      >
        <ModalBody>
          <UpdateAddress closeModalUpdate={closeModalUpdate} deptos={deptos} refreshAddress={refreshAddress}
            idAddress={idAddress} />
        </ModalBody>
      </Modal>

      {/* Modal checkout tarjeta de credito */}
      <Modal
        className="modal-dialog-centered modal-md"
        toggle={() => setModalTarjetaCredito(false)}
        isOpen={modalTarjetaCredito}
        onOpened={() => setIsScrollModalEnabled(false)}
        onClosed={() => setIsScrollModalEnabled(true)}
      >
        <ModalBody>
          <TarjetaCreditoModal
            // handleModalData={handleModalData} 
            closeModalTarjetaCredito={closeModalTarjetaCredito}
            dataOrderAddress={dataAddress}
            total={formattedTotal !== '' ? formattedTotal : total}
            discountCoupon={discountCoupon}
            cupon={cupon}
            ipAddress={ipAddress}
            idAddress={selectedAddressId}
            descriptionOrder={descriptionOrder} />
        </ModalBody>
      </Modal>


      {/* Modal checkout tarjeta de credito */}
      <Modal
        className="modal-dialog-centered modal-md"
        toggle={() => setModalTarjetaDebito(false)}
        isOpen={modalTarjetaDebito}
        onOpened={() => setIsScrollModalEnabled(false)}
        onClosed={() => setIsScrollModalEnabled(true)}
      >
        <ModalBody>
          <TarjetaDebitoModal
            closeModalTarjetaDebito={closeModalTarjetaDebito}
            dataOrderAddress={dataAddress}
            total={formattedTotal !== '' ? formattedTotal : total}
            discountCoupon={discountCoupon}
            cupon={cupon}
            ipAddress={ipAddress}
            idAddress={selectedAddressId}
            descriptionOrder={descriptionOrder}
          />
        </ModalBody>
      </Modal>

      {/* Modal checkout efecty */}
      <Modal
        className="modal-dialog-centered modal-sm"
        toggle={() => setModalEfecty(false)}
        isOpen={modalEfecty}
        onOpened={() => setIsScrollModalEnabled(false)}
        onClosed={() => setIsScrollModalEnabled(true)}
      >
        <ModalBody>
          <EfectyModal totalAmount={formattedTotal !== '' ? formattedTotal : total}
            closeEfectyModal={closeModalEfecty}
            dataRef={dataRef}
            addressId={selectedAddressId}
            descriptionOrder={descriptionOrder}
            cupon={cupon} />
        </ModalBody>
      </Modal>

      {/* Modal checkout pse */}
      <Modal
        className="modal-dialog-centered modal-sm"
        toggle={() => setModalPse(false)}
        isOpen={modalPse}
        onOpened={() => setIsScrollModalEnabled(false)}
        onClosed={() => setIsScrollModalEnabled(true)}
      >
        <ModalBody>
          <PseModal
            closeModalPse={closeModalPse}
            dataOrderAddress={dataAddress}
            total={formattedTotal !== '' ? formattedTotal : total}
            discountCoupon={discountCoupon}
            cupon={cupon}
            ipAddress={ipAddress}
            idAddress={selectedAddressId}
            descriptionOrder={descriptionOrder}
          />
        </ModalBody>
      </Modal>

      {/* Modal OTP */}
      <Modal
        className="modal-dialog-centered modal-sm"
        toggle={() => setModalOTP(false)}
        isOpen={modalOTP}
        onOpened={() => setIsScrollModalEnabled(false)}
        onClosed={() => setIsScrollModalEnabled(true)}
      >
        <ModalBody>
          <CashDeliveryOTP phone={dataAddress[0]?.phone}
            closeModalOTP={closeModalOTP}
            addressId={selectedAddressId}
            descriptionOrder={descriptionOrder}
            cupon={cupon} />
        </ModalBody>
      </Modal>

      {/* Modal compra exitosa */}
      <Modal
        className="modal-dialog-centered modal-md"
        toggle={() => setModalSuccessPurchase(false)}
        isOpen={modalSuccessPurchase}
        onOpened={() => setIsScrollModalEnabled(false)}
        onClosed={() => setIsScrollModalEnabled(true)}
      >
        <ModalBody>
          <SuccessPurchase />
        </ModalBody>

      </Modal>


    </>
  )
}

export default AddressCart;
