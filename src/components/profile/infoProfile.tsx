import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { Card, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap'
import es from "react-phone-input-2/lang/es.json";
import { Eye, EyeSlash, X } from "react-bootstrap-icons";
import { getUserProfileInfo, updateInfoProfile } from '../../services/ordenes';
import { getCurrentUser } from '../../helpers/Utils';
import Swal from 'sweetalert2';

function InfoProfile() {

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [detailInfoProfile, setDetailInfoProfile] = useState('');

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const currenUser = getCurrentUser();
  const token = currenUser.token;

  const getAllInfoPerfil = () => {
    getUserProfileInfo(token)
      .then((res) => {
        // console.log(res.data);
        setDetailInfoProfile(res.data);
      }).catch((err) => console.log(err));
  }

  const onSubmit = (data) => {
    updateInfoProfile(token, data)
      .then((res) => {
        // console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'Has actualizado correctamenter el perfil',
          confirmButtonColor: '#fc5241',
        });
        setPhone("");
        setPassword("");
        setConfirmPassword("");
      }).catch((err) => {
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: 'Error actualizando el perfil, intente de nuevo',
          confirmButtonColor: '#fc5241',
        });
        console.log(err);
      });
  }

  const handleSubmitInfoProfile = (e) => {
    e.preventDefault();

    const data = {
      f_name: detailInfoProfile.f_name,
      l_name: detailInfoProfile.l_name,
      phone: phone,
      password: password,
    }

    onSubmit(data);
  }

  useEffect(() => {
    if (token) {
      getAllInfoPerfil();
    }
  }, [])

  return (
    <div>
      <Card>
        <div className="headerInfoProfile">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="8" width="40" height="40" rx="20" fill="#FC5241" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M28 21.9998C26.107 21.9998 24.55 23.5722 24.55 25.5398C24.55 27.5074 26.107 29.0798 28 29.0798C29.893 29.0798 31.45 27.5074 31.45 25.5398C31.45 23.5722 29.893 21.9998 28 21.9998ZM25.2585 29.3692C24.0994 28.5049 23.35 27.1076 23.35 25.5398C23.35 22.9345 25.4195 20.7998 28 20.7998C30.5805 20.7998 32.65 22.9345 32.65 25.5398C32.65 27.128 31.881 28.5413 30.6959 29.4027C31.8876 29.7123 32.699 30.243 33.2198 31.0022C33.6309 31.6014 33.8196 32.2883 33.9106 32.9909C34 33.6805 34 34.4316 34 35.1764V35.1998C34 35.5312 33.7314 35.7998 33.4 35.7998C33.0686 35.7998 32.8 35.5312 32.8 35.1998C32.8 34.428 32.799 33.7504 32.7206 33.1452C32.6429 32.5457 32.4941 32.0657 32.2302 31.681C31.725 30.9445 30.6345 30.3395 27.9933 30.2798C25.3591 30.2808 24.2753 30.8879 23.7721 31.6325C23.5071 32.0248 23.3575 32.5168 23.2795 33.1272C23.2009 33.7425 23.2 34.4283 23.2 35.1998C23.2 35.5312 22.9314 35.7998 22.6 35.7998C22.2686 35.7998 22 35.5312 22 35.1998L22 35.1771C22 34.4316 22 33.6735 22.0892 32.9751C22.18 32.2647 22.3679 31.5673 22.7779 30.9606C23.2925 30.1991 24.0911 29.6683 25.2585 29.3692Z" fill="white" />
            <rect x="0.5" y="0.5" width="55" height="55" rx="27.5" stroke="#FC5241" stroke-opacity="0.16" />
          </svg>
          <h5></h5>
        </div>
        <p>Información sobre tu cuenta</p>
        <div className="containerFormInfoProfile">
          <div className="nombreInfoPerfil">
            Nombre
            <h6>{detailInfoProfile.f_name}</h6>

          </div>
          <div className="nombreInfoPerfil">
            Apellido
            <h6>{detailInfoProfile.l_name}</h6>

          </div>
          <div className="correoInfoPerfil">
            Correo Electrónico
            <h6>{detailInfoProfile.email}</h6>
          </div>
          <Form style={{ marginTop: '20px' }} onSubmit={handleSubmitInfoProfile}>
            <FormGroup>
              <PhoneInput
                localization={es}
                country={"co"}
                value={phone}
                onChange={setPhone}
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
            <FormGroup controlId="formBasicPassword">
              <InputGroup style={{ borderRadius: "50px" }}>
                <Input
                  style={{

                    borderTopLeftRadius: "50px",
                    borderBottomLeftRadius: "50px",
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password} onChange={(event) => setPassword(event.target.value)}
                />
                <InputGroupText
                  style={{
                    borderTopRightRadius: "50px",
                    borderBottomRightRadius: "50px",

                    width: "45px",
                    borderRight: "none !important",
                    backgroundColor: "white",
                  }}
                  onClick={toggleShowPassword}
                >
                  {" "}
                  {showPassword ? <EyeSlash style={{ cursor: 'pointer' }} /> : <Eye style={{ cursor: 'pointer' }} />}
                </InputGroupText>
              </InputGroup>
            </FormGroup>

            <FormGroup controlId="formBasicConfirmPassword">
              <InputGroup style={{ borderRadius: "50px" }}>
                <Input
                  style={{
                    borderTopLeftRadius: "50px",
                    borderBottomLeftRadius: "50px",
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <InputGroupText
                  style={{
                    cursor: "pointer",
                    borderTopRightRadius: "50px",
                    borderBottomRightRadius: "50px",

                    width: "45px",
                    borderRight: "none !important",
                    backgroundColor: "white",
                  }}
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <EyeSlash style={{ cursor: 'pointer' }} /> : <Eye style={{ cursor: 'pointer' }} />}
                </InputGroupText>
              </InputGroup>
            </FormGroup>
            <div className="btnUpdateInfoProfile" style={{
              width: '100%',
              justifyContent: 'center',
              textAlign: 'center',
              height: '48px',
              marginTop: '40px'
            }}>
              <button type='submit' style={{
                textDecoration: 'none',
                alignContent:'center',
                justifyContent:'center',
                color: 'white',
                textAlign:'center',
                alignSelf: 'center',
                backgroundColor: '#FC5241',
                width: '100%',
                height: '48px',
                cursor: 'pointer',
                borderRadius: '32px',
                border: 'none'
              }}>Actualizar</button>
            </div>
          </Form>

        </div >
      </Card>
    </div>
  )
}

export default InfoProfile
