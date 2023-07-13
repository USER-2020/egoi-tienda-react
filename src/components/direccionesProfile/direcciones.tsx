import React, { useEffect, useState } from 'react'
import { Card, Modal, ModalBody } from 'reactstrap'
import { allAddress, allDeptos, deleteAddress } from '../../services/address';
import { getCurrentUser } from '../../helpers/Utils';
import AdressCheckout from '../../views/user/adress';
import Swal from 'sweetalert2';
import UpdateAddress from '../../views/user/updateAddress';

function DireccionesPerfil() {

  const showAlertPrueba = () => {
    alert("funcionando boton agregar direccion");
  }

  const [AllAddress, setAllAddress] = useState([]);

  const [modalAddressCheckout, setModalAddressCheckout] = useState(false);

  const [modalAddressUpdate, setModalAddressUpdate] = useState(false);

  const [deptos, setDeptos] = useState([]);
  const [idAddress, setIdAddress]= useState('');



  const currenUser = getCurrentUser();
  const token = currenUser.token;

  const closeAddressCheckoutModal = () => {
    setModalAddressCheckout(false);
  }

  const detailAddress = () => {
    allAddress(token)
      .then((res) => {
        console.log("Direcciones", res.data);
        setAllAddress(res.data);
      }).catch((err) => console.log(err));
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

  const eliminarDireccion = (addrId) => {
    deleteAddress(addrId, token)
      .then(() => {
        console.log("Direccion ELiminada");
        Swal.fire({
          title: '¡Direccion Eliminada!',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        detailAddress();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const closeModalUpdate = () => {
    setModalAddressUpdate(false);
  }

  const refreshAddress = () => {
    if (token) {
      detailAddress();
    }
  }

  useEffect(() => {
    if (token) {
      detailAddress();
      getAllDeptos();
    }
  }, []);
  return (
    <div>
      <div className="containerDireccionesPerfil">
        {AllAddress && AllAddress.map((item, index) => (
          <Card>
            <div className="headerTipoDireccion" key={index}>
              <h6>{item.address_type === "home" ? "Hogar" : item.address_type 
              && item.address_type === "permanent" ? "Trabajo" : item.address_type 
              && item.address_type === "others" ? "Otro" : item.address_type}</h6>
            </div>
            <div className="infoDireccionPerfil">
              <div className="info">
                <div className="fragmento">
                  <h5>Celular</h5>
                  <p>+{item.phone}</p>
                </div>
                <div className="fragmento">
                  <h5>Ciudad</h5>
                  <p>{item.city}</p>
                </div>
              </div>
              <div className="info">
                <div className="fragmento">
                  <h5>Departamento</h5>
                  <p>{item.zip}</p>
                </div>
                <div className="fragmento">
                  <h5>Dirección</h5>
                  <p>{item.address}</p>
                </div>
              </div>
            </div>
            <div className="opcionesDireccionesPerfil">
              <a href="#" className='btn1' onClick={() => eliminarDireccion(item.id)}>
                <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.4 0.599693L9.29194 0.59965C8.68776 0.599291 8.23135 0.59902 7.83527 0.705755C6.76704 0.993621 5.93544 1.83184 5.65048 2.90141C5.5448 3.29805 5.54506 3.75529 5.54541 4.3639L5.54545 4.47168V4.82367H0.999997C0.558169 4.82367 0.199997 5.18185 0.199997 5.62367C0.199997 6.0655 0.558169 6.42367 0.999997 6.42367H1.84105L2.82154 16.2845C2.89658 17.0393 2.95745 17.6516 3.04592 18.1471C3.13735 18.6591 3.2677 19.1081 3.51376 19.52C3.90539 20.1756 4.4818 20.7005 5.1708 21.0278C5.60417 21.2337 6.06282 21.3197 6.57948 21.3604C7.07904 21.3996 7.69132 21.3996 8.44518 21.3996H10.3548C11.1087 21.3996 11.721 21.3996 12.2205 21.3604C12.7372 21.3197 13.1958 21.2337 13.6292 21.0278C14.3182 20.7005 14.8946 20.1756 15.2862 19.52C15.5323 19.1081 15.6626 18.6591 15.7541 18.1471C15.8425 17.6516 15.9034 17.0393 15.9785 16.2845L16.9589 6.42367H17.8C18.2418 6.42367 18.6 6.0655 18.6 5.62367C18.6 5.18185 18.2418 4.82367 17.8 4.82367H13.2545V4.47168L13.2546 4.3639C13.2549 3.75529 13.2552 3.29805 13.1495 2.90141C12.8646 1.83184 12.033 0.993621 10.9647 0.705755C10.5686 0.59902 10.1122 0.599291 9.50806 0.59965L9.4 0.599693ZM7.14545 4.82367H11.6545V4.47168C11.6545 3.70622 11.6477 3.47958 11.6034 3.31332C11.4647 2.79271 11.0613 2.38886 10.5484 2.25064C10.3851 2.20663 10.1619 2.19969 9.4 2.19969C8.63806 2.19969 8.41489 2.20663 8.25159 2.25064C7.73867 2.38886 7.33525 2.79271 7.19655 3.31332C7.15225 3.47958 7.14545 3.70622 7.14545 4.47168V4.82367ZM6.64812 8.28359C7.08777 8.23987 7.47963 8.56084 7.52334 9.0005L8.28698 16.6805C8.3307 17.1201 8.00972 17.512 7.57006 17.5557C7.1304 17.5994 6.73855 17.2784 6.69483 16.8388L5.9312 9.15881C5.88748 8.71915 6.20846 8.3273 6.64812 8.28359ZM12.1519 8.28359C12.5915 8.3273 12.9125 8.71915 12.8688 9.15881L12.1052 16.8388C12.0614 17.2784 11.6696 17.5994 11.2299 17.5557C10.7903 17.512 10.4693 17.1201 10.513 16.6805L11.2767 9.0005C11.3204 8.56084 11.7122 8.23987 12.1519 8.28359Z" fill="#45444F" />
                </svg>

                Eliminar
              </a>
              <a href="#" className='btn2' onClick={() => {
                setIdAddress(item.id);
                setModalAddressUpdate(true);
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.2659 6.88348L9.11652 3.73408L7.98515 2.60271L1.12449 9.46337L1.047 9.54069C0.678389 9.90804 0.343142 10.2421 0.165076 10.6805C-0.0129741 11.1188 -0.00568339 11.592 0.00233224 12.1122L0.00395849 12.2219L0.024131 13.6943L0.0246984 13.7362C0.0288956 14.0475 0.0330397 14.355 0.0704462 14.6095C0.112896 14.8984 0.211703 15.2317 0.490025 15.51C0.768353 15.7883 1.10163 15.8871 1.39051 15.9296C1.64501 15.967 1.95238 15.9711 2.26367 15.9753L2.3057 15.9759L3.77814 15.996L3.8876 15.9977C4.40794 16.0057 4.88117 16.013 5.31952 15.8349C5.75786 15.6569 6.09193 15.3216 6.45925 14.9531L6.53663 14.8755L13.3973 8.01486L12.2659 6.88348Z" fill="white" />
                  <path d="M9.13685 14.3961C8.69502 14.3961 8.33685 14.7543 8.33685 15.1961C8.33685 15.638 8.69502 15.9961 9.13685 15.9961L15.2 15.9961C15.6418 15.9961 16 15.638 16 15.1961C16 14.7543 15.6418 14.3961 15.2 14.3961L9.13685 14.3961Z" fill="white" />
                  <path d="M10.2482 2.60305L13.397 5.75178L14.5285 6.88328C14.9002 6.50934 15.2219 6.17509 15.4577 5.86604C15.7642 5.46427 16 5.01257 16 4.45387C16 3.89517 15.7642 3.44346 15.4577 3.04169C15.1726 2.66804 14.762 2.25755 14.289 1.78461L14.2154 1.71097C13.7425 1.23798 13.332 0.827436 12.9583 0.542353C12.5565 0.235812 12.1048 0 11.5461 0C10.9874 0 10.5357 0.235812 10.134 0.542353C9.82492 0.778145 9.49067 1.09976 9.11674 1.47156L10.2482 2.60305Z" fill="white" />
                </svg>
                Editar información
              </a>
            </div>

          </Card>

        ))}



        <Card className='containerAddNewDireccion'>
          <div>
            <a href="#" onClick={() => setModalAddressCheckout(true)}>Añadir nueva dirección</a>
          </div>
        </Card>

        <>
          <Modal
            className="modal-dialog-centered modal-lg"
            toggle={() => closeAddressCheckoutModal()}
            isOpen={modalAddressCheckout}

          >
            <ModalBody>
              <AdressCheckout closeModalAddress={closeAddressCheckoutModal} deptos={deptos} refreshAddress={refreshAddress} />
            </ModalBody>
          </Modal>

          <Modal
            className="modal-dialog-centered modal-lg"
            toggle={() => setModalAddressUpdate(false)}
            isOpen={modalAddressUpdate}

          >
            <ModalBody>
              <UpdateAddress closeModalUpdate={closeModalUpdate} deptos={deptos} refreshAddress={refreshAddress}
                idAddress={idAddress} />
            </ModalBody>
          </Modal>

        </>


      </div>
    </div>
  )
}

export default DireccionesPerfil
