import React, { useEffect, useRef, useState } from "react";

import "../../styles/detailsCart.css";
import {
  Card,
  InputGroup,
  Table,
  InputGroupAddon,
  Input,
  InputGroupText,
  Modal,
  ModalBody,
} from "reactstrap";
import iphone from "../../assets/iphoneMuestra.png";
import Login from "../../views/user/login";
import Register from "../../views/user/register";
import { getCurrentUser, setCurrentUser } from "../../helpers/Utils";
import { useParams, useHistory, Link } from "react-router-dom";
import { allProductsCart, deleteItemCart } from "../../services/cart";
import Swal from "sweetalert2";
import { checkout } from "../../constants/defaultValues";
import AddressCart from "./checkout.tsx";
import start from "../../assets/egoi_icons/star-fill.svg";
import startEmpty from "../../assets/egoi_icons/star-fill-gray.svg";
import { aplyCupon } from "../../services/cupon";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { updateQuantityCart } from "./../../services/cart";
function DetailCart({ setCantCart, setIsLoggedInPartner, productsCart }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [modalViewRegistro, setModalViewRegistro] = useState(false);
  const [modalViewLogin, setModalViewLogin] = useState(false);
  const [modalViewCart, setModalViewCart] = useState(false);
  const [changeFormLogin, setChangeFormLogin] = useState(false);
  const [changeFormRegister, setChangeFormRegister] = useState(false);
  // const [productsCart, setProductsCart] = useState([]);
  const [costoEnvio, setCostoEnvio] = useState(0);
  const [totalAPagar, setTotalAPagar] = useState("");
  const [quantity, setQuantity] = useState();

  const [cupon, setCupon] = useState("");
  const [discountCoupon, setDiscountCoupon] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const { id, slug } = useParams();

  const currenUser = getCurrentUser();
  const history = useHistory();
  const token = currenUser ? currenUser.token : null; // Manejo de seguridad en caso de que currentUser sea null

  const [isScrollModalEnabled, setIsScrollModalEnabled] = useState(true);

  const baseUrlImage = "https://egoi.xyz/storage/app/public/product/";
  const baseUrlImageThumbnail =
    "https://egoi.xyz/storage/app/public/product/thumbnail/";

  const closeModalRegistro = () => {
    setModalViewRegistro(false);
  };

  const closeModalLogin = () => {
    setModalViewLogin(false);
  };

  const closeModalCart = () => {
    setModalViewCart(false);
  };

  const handleChangeFormLogin = () => {
    if (modalViewLogin === true) {
      setModalViewRegistro(true);
    }
  };

  const handleChangeFormRegister = () => {
    if (modalViewRegistro === true) {
      setModalViewLogin(true);
    }
  };

  const handleLogin = () => {
    // Code to handle user login, such as storing session storage, etc.
    if (currenUser) {
      setIsLoggedIn(true);
      // console.log("Estas logueado")
    } else {
      setIsLoggedIn(false);
    }
  };

  /* Buttons of the quantity */

  // Función asincrónica para actualizar la cantidad en el carrito utilizando Axios
  async function updateQuantity(productId, newQuantity, token) {
    updateQuantityCart(productId, newQuantity, token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    // try {
    //   // Realiza una solicitud PUT para actualizar la cantidad en el servidor
    //   const response = await axios.put(`/api/cart/${productId}`, { quantity: newQuantity });

    //   // Verifica si la solicitud se completó con éxito (código de estado 200)
    //   if (response.status === 200) {
    //     // La actualización se completó con éxito, puedes manejar la respuesta si es necesario
    //     console.log(`Actualización exitosa para el producto ${productId} en el carrito`);
    //   } else {
    //     // Manejo de errores si la solicitud no devuelve el código de estado esperado
    //     console.error('Error en la solicitud de actualización:', response.statusText);
    //   }
    // } catch (error) {
    //   // Manejo de errores si ocurre algún problema en la solicitud
    //   console.error('Error al realizar la solicitud de actualización:', error);
    //   throw error; // Puedes relanzar el error para manejarlo en un nivel superior si es necesario
    // }
  }

  const handleIncrement = (quantityUPD, idCant) => {
    setQuantity(quantityUPD + 1);
    // updateQuantity(quantity, idCant, token);
    updateQuantityCart(quantityUPD + 1, idCant, token);
    // getAllProductsByCart();
    setCantCart();
  };

  const handleDecrement = (quantityUPD, idCant) => {
    if (quantityUPD > 0) {
      setQuantity(quantityUPD - 1);
      // updateQuantity(quantity, idCant, token);
      updateQuantityCart(quantityUPD - 1, idCant, token);
      // getAllProductsByCart();
      setCantCart();
    }
  };

  const handleQuantity = (e) => {
    const value = e.target.value;
    // getAllProductsByCart();
    setQuantity(value);

    // console.log("quantity: ", value);
  };
  /*  */

  const handleLogout = () => {
    // Code to handle user logout, such as clearing session storage, etc.
    // console.log("Entro al logout");
    setCurrentUser();
    setIsLoggedIn(false);
  };

  // const toCheckout = () => {
  //   if(currenUser){
  //     history.push({checkout});
  //   }
  //   setModalViewLogin(true);

  // }

  // const getAllProductsByCart = () => {
  //   if (token) {
  //     allProductsCart(token)
  //       .then((res) => {
  //         // console.log(res);
  //         setProductsCart(res.data);
  //         // console.log("traer todos los producstos del carrito", productsCart);

  //       })
  //       .catch((err) => console.log(err));
  //   }

  // }

  // const getAllProductsByCart = async () => {
  //   if (token) {
  //     // console.log(token);
  //     try {
  //       const res = await allProductsCart(token);
  //       setProductsCart(res.data);
  //       setIsLoading(false);
  //       // Ahora puedes mostrar el resultado aquí, ya que esta parte del código se ejecutará después de que se resuelva la promesa
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }

  const deleteOne = (
    key,
    nameProduct,
    price,
    discountF,
    discountT,
    quantity
  ) => {
    deleteItemCart(key, token)
      .then((res) => {
        // console.log(res);
        Swal.fire({
          icon: "error",
          title: "Producto eliminado del carrito",
          // text: 'Sesión expirada. Por favor, vuelva a logearse.',
          confirmButtonColor: "#fc5241",
        });
        let discount = 0;
        if (discountF > 0) {
          discount = discountF;
        }
        if (discountT > 0) {
          discount = discountT;
        }
        if (discountF === 0 && discountT === 0) {
          discount = 0;
        }
        gtag("event", "remove_from_cart", {
          currency: "COP",
          items: [
            {
              item_id: key,
              item_name: nameProduct,
              coupon: "",
              discount: discount,
              affiliation: "Egoi",
              item_brand: "",
              item_category: "",
              item_variant: "",
              price: price,
              currency: "COP",
              quantity: quantity,
            },
          ],
          value: price,
        });

        setCantCart();
        setIsLoggedInPartner(true);
      })
      .catch((err) => console.log(err));
  };

  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset || document.documentElement.scrollTop);
  const [scrollModal, setScrollModal] = useState(null);  // Puedes inicializarlo a null
  const threshold = 50;

  // Ref del modal
  const scrollModalToPayRef = useRef(null);

  useEffect(() => {
    setScrollModal(scrollModalToPayRef.current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // console.log("Scroll Detected");
      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollModalToPayRef.current) {
        if (currentScrollPos > prevScrollPos && currentScrollPos > threshold) {
          // Scrolling hacia abajo y después de pasar el umbral
          scrollModalToPayRef.current.classList.remove('hidden');
          scrollModalToPayRef.current.classList.add('visible');
        } else {
          // Scrolling hacia arriba o antes de pasar el umbral
          scrollModalToPayRef.current.classList.remove('visible');
          scrollModalToPayRef.current.classList.add('hidden');
        }
      }

      setPrevScrollPos(currentScrollPos);
      // console.log(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, scrollModal, threshold]);




  const sumSubTotal = (productsCart) => {
    let total = 0;
    productsCart.map((product) => {
      if (product.discount > 0) {
        const precioTotal =
          (product.price - product.discount) * product.quantity;
        total += precioTotal;
      }
      if (product.discount_tag) {
        const precioTotal = product.discount_tag * product.quantity;
        total += precioTotal;
      }

      if (product.discount_tag === 0 && product.discount === 0) {
        const precioTotal = product.price * product.quantity;
        total += precioTotal;
      }

      // const precioTotal = product.price * product.quantity;
      // total += precioTotal;
    });
    return total;
  };

  const sumWithoutDiscount = (productsCart) => {
    let totalWithoutDiscount = 0;
    productsCart.map((product) => {
      const precioTotalWithoutDiscount = product.price * product.quantity;
      totalWithoutDiscount += precioTotalWithoutDiscount;
    });
    return totalWithoutDiscount;
  };

  const discountWhithTags = (productsCart) => {
    let totalDiscounts = 0;
    productsCart.map((product) => {
      const descuentosTotales = product.discount;
      totalDiscounts += descuentosTotales;
    });
    return totalDiscounts;
  };

  const subtotal = sumSubTotal(productsCart);

  const subtotalWithoutDiscount = sumWithoutDiscount(productsCart);

  const discountedProducts = discountWhithTags(productsCart);

  const impuesto = "0";

  const envio = "0";

  const descuento = "$0";

  const costoDeENvio = () => {
    // console.log(subtotal);
    if (subtotal && subtotal <= 39900) {
      setCostoEnvio(0);
    } else if (subtotal && subtotal <= 79990 && subtotal > 39900) {
      const costodelEnvio = 9900;
      setCostoEnvio(costodelEnvio);
    } else {
      setCostoEnvio(0);
    }
  };

  const totalPagar = () => {
    if (subtotal <= 39900) {
      const precioTotalaPagar = subtotal + 0;
      return `$${precioTotalaPagar.toLocaleString("es")}`;
    }
    const precioTotalaPagar = subtotal + costoEnvio;
    return `$${precioTotalaPagar.toLocaleString("es")}`;
  };

  const totalaPagar = totalPagar();

  const aplicarCupon = () => {
    if (cupon && token) {
      // console.log(cupon);
      aplyCupon(cupon, token)
        .then((res) => {
          // console.log("Cupon aplicado ==>", res.data);
          // console.log("Total", res.data.total);
          setDiscountCoupon(res.data);

          // Validar si el cupón es inválido
          if (
            res.data.messages &&
            res.data.messages.includes("Invalid Coupon")
          ) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Cupón inválido",
              confirmButtonColor: "#dc3545",
            });
          } else {
            // El cupón se aplicó correctamente
            // Continuar con el flujo de la aplicación
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text:
              "Ocurrió un error al aplicar el cupón. Por favor, inténtelo de nuevo.",
            confirmButtonColor: "#dc3545",
          });
        });
    }
  };

  let formattedDiscount = "";
  let formattedTotal = "";

  if (discountCoupon && discountCoupon.total !== undefined) {
    formattedDiscount = discountCoupon.discount.toString().replace(",", ".");
    formattedTotal = discountCoupon.total.toString().replace(",", ".");
  }

  useEffect(() => {
    if (!token) {
      history.goBack();
      setModalViewLogin(true);
      // console.log("No hay token");
    } else {
      // history.push(`/detailsProduct/${id}/${slug}`);
    }

    costoDeENvio();
    // console.log(costoEnvio);
    // console.log(discountCoupon.total);
    // console.log(discountCoupon.discount);
  }, [token, subtotal, discountCoupon]);

  useEffect(() => {
    // Establece un temporizador para esperar 3 segundos
    const timer = setTimeout(() => {
      // Realiza la validación después de 3 segundos
      if (productsCart.length >= 0) {
        setIsLoading(false);
      }
    }, 1000); // 3000 milisegundos (3 segundos)

    // Limpia el temporizador si el componente se desmonta antes de que se cumplan los 3 segundos
    return () => {
      clearTimeout(timer);
    };
  }, [productsCart]);

  useEffect(() => {
    // getAllProductsByCart();
    setCantCart();
  }, [quantity]);

  return (
    <>
      <div className="container">
        <h5 style={{ color: "#74737B" }}>Carrito de compras</h5>

        {isLoading ? (
          <div className="containerProductsAndDetailpurchaseResponsive">
            <div className="loadingDiv">
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
              <h2 style={{ color: "#FC5241" }}>Cargando...</h2>
            </div>
          </div>
        ) : productsCart && productsCart.length > 0 ? (
          <div className="containerProductsAndDetailpurchaseResponsive">
            {productsCart.map((products, index) => (
              <Card key={index}>
                <div className="caracteristicasDetalleDelProductoResponsive">
                  <div className="img">
                    <img
                      src={baseUrlImageThumbnail + products.thumbnail}
                      alt={products.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  <div className="info">
                    <div className="starts">
                      {[...Array(5)].map((_, index) => (
                        <img
                          key={index}
                          src={
                            index < products.count_rating ? start : startEmpty
                          }
                          alt=""
                        />
                      ))}
                    </div>
                    <div className="productInfo">
                      <h6>{products.name}</h6>
                      {products.price >= 79990 ? (
                        <div className="cutEnvio">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13.5738 6.63403C13.1555 6.60036 12.6195 6.5999 11.8575 6.5999H5.53365C5.20228 6.5999 4.93365 6.33126 4.93366 5.99989C4.93367 5.66852 5.2023 5.3999 5.53367 5.3999L11.8831 5.3999C12.6136 5.3999 13.1979 5.39989 13.6701 5.4379C14.1544 5.4769 14.5729 5.5588 14.9581 5.7522C15.5758 6.0623 16.0796 6.55796 16.3959 7.16963C16.5937 7.5522 16.6774 7.96782 16.7171 8.44703C16.7394 8.71606 16.7488 9.02184 16.7528 9.37049H17.3906C18.2149 9.37049 18.8697 9.37048 19.3978 9.413C19.9382 9.4565 20.3981 9.54742 20.8192 9.75885C21.5001 10.1007 22.0553 10.647 22.4038 11.3209C22.6199 11.7388 22.7127 12.1953 22.757 12.7297C22.8002 13.2511 22.8002 13.8972 22.8002 14.7086V15.6375C22.8002 15.8056 22.8002 15.9662 22.789 16.1018C22.7767 16.2499 22.748 16.4204 22.66 16.5906C22.5368 16.8288 22.3412 17.0207 22.1027 17.1405C21.933 17.2257 21.7633 17.2535 21.6149 17.2654C21.4785 17.2764 21.3164 17.2764 21.1453 17.2764L21.0251 17.2764C20.7695 18.0488 20.034 18.5999 19.178 18.5999C18.322 18.5999 17.5865 18.0487 17.3309 17.2764H9.94356C9.68799 18.0488 8.95248 18.5999 8.09648 18.5999C7.22063 18.5999 6.47092 18.0229 6.2324 17.2223C5.98721 17.21 5.79037 17.2042 5.53366 17.2042C5.20229 17.2042 4.93366 16.9356 4.93366 16.6042C4.93366 16.2729 5.20229 16.0042 5.53366 16.0042C5.80655 16.0042 6.02013 16.0104 6.26817 16.0226C6.53951 15.2784 7.26044 14.7528 8.09648 14.7528C8.95248 14.7528 9.68799 15.304 9.94356 16.0764H15.5557V10.2352C15.5557 9.4839 15.5553 8.95705 15.5212 8.54619C15.4877 8.1426 15.425 7.90448 15.33 7.72082C15.1312 7.33633 14.813 7.0221 14.4197 6.82463C14.2303 6.72952 13.9853 6.66716 13.5738 6.63403ZM16.7557 10.5705V16.0764H17.3309C17.5865 15.304 18.322 14.7528 19.178 14.7528C20.034 14.7528 20.7695 15.304 21.0251 16.0764H21.1256C21.3235 16.0764 21.4363 16.0759 21.5186 16.0693C21.547 16.067 21.5642 16.0644 21.5732 16.0628C21.5789 16.0588 21.5838 16.0542 21.5876 16.0493C21.5891 16.0404 21.5912 16.0255 21.5931 16.0026C21.5997 15.9228 21.6002 15.8129 21.6002 15.6175V14.7352C21.6002 13.8912 21.5997 13.2949 21.5611 12.8289C21.523 12.3701 21.4511 12.0911 21.3378 11.8721C21.1068 11.4253 20.7373 11.0605 20.2808 10.8313C20.0555 10.7181 19.769 10.6468 19.3015 10.6091C18.8272 10.5709 18.2207 10.5705 17.3646 10.5705H16.7557ZM2.71131 9.7499C2.71131 9.41853 2.97994 9.1499 3.31131 9.1499H7.08909C7.42046 9.1499 7.68909 9.41853 7.68909 9.7499C7.68909 10.0813 7.42046 10.3499 7.08909 10.3499H3.31131C2.97994 10.3499 2.71131 10.0813 2.71131 9.7499ZM1.2002 12.7499C1.2002 12.4185 1.46882 12.1499 1.8002 12.1499H7.84465C8.17602 12.1499 8.44465 12.4185 8.44465 12.7499C8.44465 13.0813 8.17602 13.3499 7.84465 13.3499H1.8002C1.46882 13.3499 1.2002 13.0813 1.2002 12.7499ZM8.09648 15.9528C7.68264 15.9528 7.36075 16.2775 7.3534 16.6624L7.35327 16.6764C7.35327 17.0676 7.67764 17.3999 8.09648 17.3999C8.51533 17.3999 8.83969 17.0676 8.83969 16.6764C8.83969 16.2851 8.51533 15.9528 8.09648 15.9528ZM19.178 15.9528C18.7591 15.9528 18.4348 16.2851 18.4348 16.6764C18.4348 17.0676 18.7591 17.3999 19.178 17.3999C19.5968 17.3999 19.9212 17.0676 19.9212 16.6764C19.9212 16.2851 19.5968 15.9528 19.178 15.9528Z"
                              fill="#089705"
                            />
                          </svg>
                          <p>Envío Gratis</p>
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {products.discount === 0 && products.discount_tag === 0 && (
                        <>
                          <h5>
                            {" "}
                            $
                            {(
                              products.price * products.quantity
                            ).toLocaleString("es")}
                          </h5>
                        </>
                      )}
                      {products.discount > 0 && (
                        <>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "5px",
                            }}
                          >
                            <h5 style={{ color: "#A2A1A7", fontSize: "12px" }}>
                              <s>
                                $
                                {(
                                  products.price * products.quantity
                                ).toLocaleString("es")}
                              </s>
                            </h5>
                            <h5>
                              {" "}
                              $
                              {(
                                (products.price - products.discount) *
                                products.quantity
                              ).toLocaleString("es")}
                            </h5>
                          </div>
                        </>
                      )}
                      {products.discount_tag > 0 && (
                        <>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "5px",
                            }}
                          >
                            <h5 style={{ color: "#A2A1A7", fontSize: "12px" }}>
                              <s>
                                $
                                {(
                                  products.price * products.quantity
                                ).toLocaleString("es")}
                              </s>
                            </h5>
                            <h5>
                              $
                              {(
                                products.discount_tag * products.quantity
                              ).toLocaleString("es")}
                            </h5>
                          </div>
                        </>
                      )}
                      <div className="cant">
                        <p>Cantidad:</p>
                        {/* <input type="number" value={products.quantity} disabled /> */}
                        {products.quantity >= 2 && (
                          <button
                            className="btnIzq"
                            onClick={() => {
                              setQuantity(products.quantity);
                              handleDecrement(products.quantity, products.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-dash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                            </svg>
                          </button>
                        )}
                        <h5>{products.quantity}</h5>

                        <button
                          className="btnDer"
                          onClick={() => {
                            setQuantity(products.quantity);
                            handleIncrement(products.quantity, products.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-plus-lg"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="deleteProduct">
                    <a
                      href="#"
                      onClick={() =>
                        deleteOne(
                          products.id,
                          products.name,
                          products.price,
                          products.discount,
                          products.discount_tag,
                          products.quantity
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="containerProductsAndDetailpurchaseResponsive">
            <div className="noProductsOnCart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="#FC5241"
                className="bi bi-cart-x"
                viewBox="0 0 16 16"
              >
                <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
              <p>Aún no tienes productos en el carrito</p>
              <a href="/">Ir a comprar</a>
            </div>
          </div>
        )}
        <div className="containerProductsAndDetailpurchase">
          {isLoading ? (
            <div className="containerTableProducts">
              <div className="loadingDiv">
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
                <h2 style={{ color: "#FC5241" }}>Cargando...</h2>
              </div>
            </div>
          ) : productsCart.length > 0 ? (
            <div className="containerTableProducts">
              <Table>
                <thead>
                  <tr>
                    <th>SL#</th>
                    <th>Detalles del producto</th>
                    <th>Precio por unidad</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    {/* <th>Costo de envío</th> */}
                  </tr>
                </thead>
              </Table>

              {productsCart &&
                productsCart.map((products, index) => (
                  <Card key={index}>
                    <div className="caracteristica#">
                      <strong>{index + 1}</strong>
                    </div>
                    <div className="caracteristicaDetalleProducto">
                      <div className="caracteristicaImg">
                        <img
                          src={baseUrlImageThumbnail + products.thumbnail}
                          alt={products.name}
                          style={{ width: "72px", height: "72px" }}
                        />
                      </div>
                      <div className="caracteristicaName">{products.name}</div>
                    </div>
                    <div className="caracteristicaPrecio">
                      {products.discount === 0 &&
                        products.discount_tag === 0 && (
                          <>${products.price.toLocaleString("es")}</>
                        )}
                      {products.discount_tag > 0 && (
                        <>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "5px",
                            }}
                          >
                            <p
                              style={{ marginBottom: "0px", color: "#A2A1A7" }}
                            >
                              <s>$ {products.price.toLocaleString("es")}</s>
                            </p>
                            <p style={{ marginBottom: "0px" }}>
                              $ {products.discount_tag.toLocaleString("es")}
                            </p>
                          </div>
                        </>
                      )}
                      {products.discount > 0 && (
                        <>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "5px",
                            }}
                          >
                            <p
                              style={{ marginBottom: "0px", color: "#A2A1A7" }}
                            >
                              <s>$ {products.price.toLocaleString("es")}</s>
                            </p>
                            <p style={{ marginBottom: "0px" }}>
                              ${" "}
                              {(
                                products.price - products.discount
                              ).toLocaleString("es")}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="caracteristicaCantidad">
                      {products.quantity >= 2 && (
                        <button
                          className="btnIzq"
                          onClick={() => {
                            setQuantity(products.quantity);
                            handleDecrement(products.quantity, products.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-dash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                          </svg>
                        </button>
                      )}

                      <input
                        type="number"
                        value={products.quantity}
                        onChange={(e) => handleQuantity(e.target.value)}
                        inputMode="none" // Esto desactivará los botones de incremento y decremento
                        disabled
                      />

                      <button
                        className="btnDer"
                        onClick={() => {
                          setQuantity(products.quantity);
                          handleIncrement(products.quantity, products.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="caracteristicaPrecioTotal">
                      {products.discount === 0 &&
                        products.discount_tag === 0 && (
                          <>
                            $
                            {(
                              products.price * products.quantity
                            ).toLocaleString("es")}
                          </>
                        )}
                      {products.discount > 0 && (
                        <>
                          ${" "}
                          {(
                            (products.price - products.discount) *
                            products.quantity
                          ).toLocaleString("es")}
                        </>
                      )}
                      {products.discount_tag > 0 && (
                        <>
                          {(
                            products.discount_tag * products.quantity
                          ).toLocaleString("es")}
                        </>
                      )}
                    </div>
                    {/* <div className="caracteristicaCostoEnvio">
                      ${costoEnvio.toLocaleString('es')}
                    </div> */}
                    <a
                      href="#"
                      onClick={() =>
                        deleteOne(
                          products.id,
                          products.name,
                          products.price,
                          products.discount,
                          products.discount_tag,
                          products.quantity
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                      </svg>
                    </a>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="containerTableProducts">
              <div className="noProductsOnCart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="#FC5241"
                  className="bi bi-cart-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <p>Aún no tienes productos en el carrito</p>
                <a href="/">Ir a comprar</a>
              </div>
            </div>
          )}

          {isLoading ? (
            <div></div>
          ) : (
            productsCart &&
            productsCart.length > 0 && (
              <div className="containerDetailpurchase">
                <Card>
                  <div className="subtotal">
                    <p>Subtotal</p>
                    <p>${subtotalWithoutDiscount.toLocaleString("es")}</p>
                  </div>
                  <div className="impuesto">
                    <p>Impuesto</p>
                    <p>$0</p>
                  </div>
                  <div className="envio">
                    <p>Envío</p>
                    {productsCart && productsCart.length === 0 ? (
                      <p>$0</p>
                    ) : subtotal <= 39900 ? (
                      <span className="badge text-bg-success">
                        Paga el cliente
                      </span>
                    ) : (
                      <p>${costoEnvio.toLocaleString("es")}</p>
                    )}
                  </div>
                  <div className="descuento">
                    <p>Descuento</p>
                    {discountCoupon && discountCoupon.total !== undefined ? (
                      <p>{discountCoupon.discount}</p>
                    ) : (
                      <p>${discountedProducts.toLocaleString("es")}</p>
                    )}
                  </div>
                  <div className="cupon">
                    {/* <InputGroup size='sm' style={{ backgroundColor: 'white', height: '45px', width: '215px' }}>
                  <InputGroupText addonType="prepend" style={{ backgroundColor: 'white', borderRight: 'none' }}>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2378 5.38368C11.2254 4.47237 12.7741 4.47237 13.7617 5.38368C14.0598 5.65873 14.4774 5.79182 14.896 5.73689C16.2331 5.56147 17.5076 6.43085 17.7563 7.75667C17.8274 8.13581 18.0759 8.472 18.4433 8.6623C19.648 9.28626 20.1493 10.7333 19.5414 11.9481C19.3665 12.2976 19.3665 12.7028 19.5414 13.0523C20.1493 14.2671 19.648 15.7141 18.4433 16.3381C18.0759 16.5284 17.8274 16.8646 17.7563 17.2437C17.5076 18.5695 16.2331 19.4389 14.896 19.2635C14.4774 19.2086 14.0598 19.3417 13.7617 19.6167C12.7741 20.528 11.2254 20.528 10.2378 19.6167C9.93975 19.3417 9.52215 19.2086 9.10348 19.2635C7.76641 19.4389 6.49193 18.5695 6.24323 17.2437C6.17211 16.8646 5.92364 16.5284 5.55622 16.3381C4.3515 15.7141 3.85025 14.2671 4.45814 13.0523C4.63302 12.7028 4.63302 12.2976 4.45814 11.9481C3.85025 10.7333 4.3515 9.28626 5.55622 8.6623C5.92364 8.472 6.17211 8.13581 6.24323 7.75667C6.49193 6.43085 7.76641 5.56147 9.10348 5.73689C9.52215 5.79182 9.93976 5.65873 10.2378 5.38368ZM12.9479 6.26557C12.42 5.77841 11.5795 5.77841 11.0516 6.26557C10.4869 6.78668 9.71219 7.02704 8.94738 6.92669C8.20567 6.82938 7.54725 7.3137 7.42266 7.97791C7.28126 8.73173 6.79282 9.37323 6.10811 9.72786C5.46475 10.0611 5.2277 10.8044 5.53128 11.4111C5.87531 12.0986 5.87531 12.9018 5.53128 13.5893C5.2277 14.196 5.46475 14.9393 6.10811 15.2725C6.79282 15.6272 7.28126 16.2687 7.42266 17.0225C7.54725 17.6867 8.20567 18.171 8.94738 18.0737C9.71219 17.9734 10.4869 18.2137 11.0516 18.7348C11.5795 19.222 12.42 19.222 12.9479 18.7348C13.5126 18.2137 14.2873 17.9734 15.0521 18.0737C15.7938 18.171 16.4523 17.6867 16.5769 17.0225C16.7183 16.2687 17.2067 15.6272 17.8914 15.2725C18.5348 14.9393 18.7718 14.196 18.4682 13.5893C18.1242 12.9018 18.1242 12.0986 18.4682 11.4111C18.7718 10.8044 18.5348 10.0611 17.8914 9.72786C17.2067 9.37323 16.7183 8.73173 16.5769 7.97791L17.1666 7.86729L16.5769 7.97791C16.4523 7.3137 15.7938 6.82938 15.0521 6.92669C14.2873 7.02704 13.5126 6.78668 12.9479 6.26557ZM8.39976 10.1002C8.39976 9.43745 8.93701 8.9002 9.59976 8.9002C10.2625 8.9002 10.7998 9.43745 10.7998 10.1002C10.7998 10.7629 10.2625 11.3002 9.59976 11.3002C8.93701 11.3002 8.39976 10.7629 8.39976 10.1002ZM15.3983 9.07593C15.6327 9.31025 15.6327 9.69015 15.3983 9.92446L9.42402 15.8988C9.18971 16.1331 8.80981 16.1331 8.57549 15.8988C8.34118 15.6645 8.34118 15.2846 8.57549 15.0503L14.5498 9.07593C14.7841 8.84162 15.164 8.84162 15.3983 9.07593ZM13.1998 14.9002C13.1998 14.2375 13.737 13.7002 14.3998 13.7002C15.0625 13.7002 15.5998 14.2375 15.5998 14.9002C15.5998 15.5629 15.0625 16.1002 14.3998 16.1002C13.737 16.1002 13.1998 15.5629 13.1998 14.9002Z" fill="#171523" />
                    </svg>
                  </InputGroupText>
                  <Input placeholder='Cupon Promocional'
                    style={{
                      borderLeft: 'none',
                      textAlign: 'left',
                      paddingLeft: '0'
                    }}
                    value={cupon}
                    onChange={(e) => setCupon(e.target.value)} />
                </InputGroup> */}
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
                    {discountedProducts === 0 ? (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          aplicarCupon();
                        }}
                      >
                        Aplicar cupón
                      </a>
                    ) : (
                      <a
                        href="#"
                        style={{
                          pointerEvents: "none",
                          backgroundColor: "gray",
                        }}
                      >
                        Aplicar cupón
                      </a>
                    )}
                  </div>
                  <div className="totalCash">
                    <h6>Total a pagar</h6>
                    {subtotal <= 39900 ? (
                      <h5>
                        <strong>{totalaPagar}</strong>
                      </h5>
                    ) : discountCoupon && discountCoupon.total !== undefined ? (
                      <h5>
                        <strong>{discountCoupon.total}</strong>
                      </h5>
                    ) : (
                      <h5>
                        <strong>{totalaPagar}</strong>
                      </h5>
                    )}
                  </div>
                  <div className="capsulas">
                    <div className="cut">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.5738 6.63403C13.1555 6.60036 12.6195 6.5999 11.8575 6.5999H5.53365C5.20228 6.5999 4.93365 6.33126 4.93366 5.99989C4.93367 5.66852 5.2023 5.3999 5.53367 5.3999L11.8831 5.3999C12.6136 5.3999 13.1979 5.39989 13.6701 5.4379C14.1544 5.4769 14.5729 5.5588 14.9581 5.7522C15.5758 6.0623 16.0796 6.55796 16.3959 7.16963C16.5937 7.5522 16.6774 7.96782 16.7171 8.44703C16.7394 8.71606 16.7488 9.02184 16.7528 9.37049H17.3906C18.2149 9.37049 18.8697 9.37048 19.3978 9.413C19.9382 9.4565 20.3981 9.54742 20.8192 9.75885C21.5001 10.1007 22.0553 10.647 22.4038 11.3209C22.6199 11.7388 22.7127 12.1953 22.757 12.7297C22.8002 13.2511 22.8002 13.8972 22.8002 14.7086V15.6375C22.8002 15.8056 22.8002 15.9662 22.789 16.1018C22.7767 16.2499 22.748 16.4204 22.66 16.5906C22.5368 16.8288 22.3412 17.0207 22.1027 17.1405C21.933 17.2257 21.7633 17.2535 21.6149 17.2654C21.4785 17.2764 21.3164 17.2764 21.1453 17.2764L21.0251 17.2764C20.7695 18.0488 20.034 18.5999 19.178 18.5999C18.322 18.5999 17.5865 18.0487 17.3309 17.2764H9.94356C9.68799 18.0488 8.95248 18.5999 8.09648 18.5999C7.22063 18.5999 6.47092 18.0229 6.2324 17.2223C5.98721 17.21 5.79037 17.2042 5.53366 17.2042C5.20229 17.2042 4.93366 16.9356 4.93366 16.6042C4.93366 16.2729 5.20229 16.0042 5.53366 16.0042C5.80655 16.0042 6.02013 16.0104 6.26817 16.0226C6.53951 15.2784 7.26044 14.7528 8.09648 14.7528C8.95248 14.7528 9.68799 15.304 9.94356 16.0764H15.5557V10.2352C15.5557 9.4839 15.5553 8.95705 15.5212 8.54619C15.4877 8.1426 15.425 7.90448 15.33 7.72082C15.1312 7.33633 14.813 7.0221 14.4197 6.82463C14.2303 6.72952 13.9853 6.66716 13.5738 6.63403ZM16.7557 10.5705V16.0764H17.3309C17.5865 15.304 18.322 14.7528 19.178 14.7528C20.034 14.7528 20.7695 15.304 21.0251 16.0764H21.1256C21.3235 16.0764 21.4363 16.0759 21.5186 16.0693C21.547 16.067 21.5642 16.0644 21.5732 16.0628C21.5789 16.0588 21.5838 16.0542 21.5876 16.0493C21.5891 16.0404 21.5912 16.0255 21.5931 16.0026C21.5997 15.9228 21.6002 15.8129 21.6002 15.6175V14.7352C21.6002 13.8912 21.5997 13.2949 21.5611 12.8289C21.523 12.3701 21.4511 12.0911 21.3378 11.8721C21.1068 11.4253 20.7373 11.0605 20.2808 10.8313C20.0555 10.7181 19.769 10.6468 19.3015 10.6091C18.8272 10.5709 18.2207 10.5705 17.3646 10.5705H16.7557ZM2.71131 9.7499C2.71131 9.41853 2.97994 9.1499 3.31131 9.1499H7.08909C7.42046 9.1499 7.68909 9.41853 7.68909 9.7499C7.68909 10.0813 7.42046 10.3499 7.08909 10.3499H3.31131C2.97994 10.3499 2.71131 10.0813 2.71131 9.7499ZM1.2002 12.7499C1.2002 12.4185 1.46882 12.1499 1.8002 12.1499H7.84465C8.17602 12.1499 8.44465 12.4185 8.44465 12.7499C8.44465 13.0813 8.17602 13.3499 7.84465 13.3499H1.8002C1.46882 13.3499 1.2002 13.0813 1.2002 12.7499ZM8.09648 15.9528C7.68264 15.9528 7.36075 16.2775 7.3534 16.6624L7.35327 16.6764C7.35327 17.0676 7.67764 17.3999 8.09648 17.3999C8.51533 17.3999 8.83969 17.0676 8.83969 16.6764C8.83969 16.2851 8.51533 15.9528 8.09648 15.9528ZM19.178 15.9528C18.7591 15.9528 18.4348 16.2851 18.4348 16.6764C18.4348 17.0676 18.7591 17.3999 19.178 17.3999C19.5968 17.3999 19.9212 17.0676 19.9212 16.6764C19.9212 16.2851 19.5968 15.9528 19.178 15.9528Z"
                          fill="#089705"
                        />
                      </svg>
                      {subtotal >= 79990 ? (
                        <p>3 días envío gratis</p>
                      ) : (
                        <p>3 dias envío</p>
                      )}
                    </div>
                    <div className="cut">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.005 5.40022C11.9396 5.39967 11.874 5.40992 11.811 5.43101L7.61104 6.83735C7.367 6.91906 7.2 7.14963 7.2 7.41197V11.3023C7.2 12.5265 7.48683 13.7335 8.03717 14.8255C8.79591 16.331 10.02 17.5482 11.5252 18.2949L11.7604 18.4116C11.8375 18.4498 11.9212 18.4685 12.0048 18.4678C12.0852 18.467 12.1654 18.4484 12.2396 18.4116L12.4748 18.2949C13.98 17.5482 15.2041 16.331 15.9628 14.8255C16.5132 13.7335 16.8 12.5265 16.8 11.3023V7.41197C16.8 7.14963 16.633 6.91906 16.389 6.83735L12.189 5.43101C12.1292 5.41099 12.0671 5.40074 12.005 5.40022ZM11.43 4.2931C11.6198 4.22956 11.8175 4.1986 12.0151 4.20026C12.2026 4.20184 12.3899 4.2328 12.57 4.2931L16.77 5.69944C17.506 5.94588 18 6.6366 18 7.41197V11.3023C18 12.7139 17.6693 14.1059 17.0344 15.3655C16.1592 17.1022 14.7466 18.5075 13.0081 19.3699L12.7729 19.4865C12.5342 19.605 12.2749 19.6654 12.0153 19.6677C11.7455 19.6701 11.4753 19.6097 11.2271 19.4865L10.9919 19.3699C9.25344 18.5075 7.84081 17.1022 6.96557 15.3655C6.33073 14.1059 6 12.7139 6 11.3023V7.41197C6 6.6366 6.49403 5.94588 7.23002 5.69944L11.43 4.2931ZM14.8233 9.73422C15.0581 9.96801 15.059 10.3479 14.8252 10.5827L11.8252 13.5963C11.7126 13.7094 11.5596 13.773 11.4 13.773C11.2404 13.773 11.0874 13.7094 10.9748 13.5963L9.77478 12.3909C9.54099 12.1561 9.54185 11.7762 9.7767 11.5424C10.0115 11.3086 10.3914 11.3094 10.6252 11.5443L11.4 12.3226L13.9748 9.73614C14.2086 9.50129 14.5885 9.50044 14.8233 9.73422Z"
                          fill="#089705"
                        />
                      </svg>
                      <p>100% auténtico</p>
                    </div>
                    <div className="cut">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.0172 6.04295C15.493 6.00027 14.8237 5.9998 13.8833 5.9998H10.671C9.73398 5.9998 8.91937 6.00008 8.25046 6.04366C7.56064 6.0886 7.12226 6.17594 6.8863 6.29576C6.37376 6.55605 5.95742 6.97117 5.69662 7.48131C5.56607 7.73669 5.48568 8.05769 5.44346 8.57271C5.40067 9.09479 5.4002 9.76162 5.4002 10.699V12.2446C5.4002 13.182 5.40067 13.8488 5.44346 14.3709C5.48568 14.8859 5.56607 15.2069 5.69662 15.4623C5.95742 15.9724 6.37376 16.3876 6.8863 16.6478C7.12226 16.7677 7.56064 16.855 8.25046 16.9C8.91937 16.9435 9.73398 16.9438 10.671 16.9438H17.7482L17.1151 16.3128C16.8804 16.0789 16.8798 15.699 17.1137 15.4642C17.3476 15.2295 17.7275 15.2289 17.9622 15.4628L19.6237 17.1188C19.7367 17.2314 19.8002 17.3843 19.8002 17.5438C19.8002 17.7033 19.7367 17.8562 19.6237 17.9688L17.9622 19.6248C17.7275 19.8587 17.3476 19.8581 17.1137 19.6234C16.8798 19.3887 16.8804 19.0088 17.1151 18.7748L17.7482 18.1438H10.6549C9.7369 18.1438 8.88456 18.1438 8.17244 18.0974C7.47708 18.0521 6.81784 17.959 6.34295 17.7178C5.60494 17.343 5.00455 16.7448 4.62815 16.0085C4.39652 15.5554 4.2958 15.0585 4.24748 14.4689C4.20019 13.8921 4.20019 13.1761 4.2002 12.2712V10.6725C4.20019 9.7675 4.20019 9.05152 4.24748 8.47467C4.2958 7.88512 4.39652 7.38817 4.62815 6.93507C5.00455 6.19882 5.60494 5.6006 6.34295 5.22582C6.81784 4.98466 7.47708 4.8915 8.17244 4.8462C8.88456 4.7998 9.73691 4.7998 10.6549 4.7998L13.9097 4.7998C14.8179 4.7998 15.536 4.7998 16.1146 4.84691C16.7056 4.89504 17.2035 4.9953 17.6574 5.22582C18.3954 5.6006 18.9958 6.19882 19.3722 6.93507C19.6937 7.56381 19.7675 8.29073 19.7903 9.24953C19.8002 9.66468 19.8002 10.1427 19.8002 10.6931V12.2446C19.8002 13.3705 18.885 14.2798 17.7602 14.2798H15.3233C13.7703 14.2798 12.5079 13.0245 12.5079 11.4718C12.5079 9.9191 13.7703 8.66381 15.3233 8.66381H18.5637C18.5238 8.10005 18.4448 7.75716 18.3038 7.48131C18.043 6.97117 17.6266 6.55604 17.1141 6.29576C16.8572 6.16529 16.5343 6.08506 16.0172 6.04295ZM18.5986 9.86381H15.3233C14.4292 9.86381 13.7079 10.5856 13.7079 11.4718C13.7079 12.358 14.4292 13.0798 15.3233 13.0798H17.7602C18.226 13.0798 18.6002 12.704 18.6002 12.2446V10.699C18.6002 10.3943 18.6002 10.1174 18.5986 9.86381Z"
                          fill="#089705"
                        />
                        <path
                          d="M14.7695 11.4719C14.7695 11.1671 15.0167 10.9199 15.3215 10.9199H15.8791C16.1839 10.9199 16.4311 11.1671 16.4311 11.4719C16.4311 11.7768 16.1839 12.0239 15.8791 12.0239H15.3215C15.0167 12.0239 14.7695 11.7768 14.7695 11.4719Z"
                          fill="#089705"
                        />
                        <path
                          d="M7.01562 8.15991C7.01562 7.85505 7.26276 7.60791 7.56763 7.60791H10.8944C11.1993 7.60791 11.4464 7.85505 11.4464 8.15991C11.4464 8.46477 11.1993 8.71191 10.8944 8.71191H7.56763C7.26276 8.71191 7.01562 8.46477 7.01562 8.15991Z"
                          fill="#089705"
                        />
                      </svg>
                      <p>Garantía reembolso</p>
                    </div>
                    <div className="cut">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.3552 6.04686C15.785 6.00027 15.0576 5.9998 14.0396 5.9998H10.5596C9.54506 5.9998 8.66083 6.00008 7.93427 6.04757C7.18681 6.09644 6.70298 6.19159 6.43764 6.32679C5.87315 6.61441 5.41421 7.07335 5.12659 7.63783C4.98068 7.92419 4.89268 8.28099 4.84666 8.84419C4.80008 9.4144 4.79961 10.1418 4.79961 11.1598V12.8398C4.79961 13.8578 4.80008 14.5852 4.84666 15.1554C4.89268 15.7186 4.98068 16.0754 5.12659 16.3618C5.41421 16.9263 5.87315 17.3852 6.43764 17.6728C6.70298 17.808 7.18681 17.9032 7.93427 17.952C8.66083 17.9995 9.54506 17.9998 10.5596 17.9998H14.0396C15.0576 17.9998 15.785 17.9993 16.3552 17.9527C16.9184 17.9067 17.2752 17.8187 17.5616 17.6728C18.1261 17.3852 18.585 16.9263 18.8726 16.3618C19.0185 16.0754 19.1065 15.7186 19.1526 15.1554C19.1567 15.1048 19.1605 15.053 19.1639 14.9998H15.5996C13.9428 14.9998 12.5996 13.6567 12.5996 11.9998C12.5996 10.3429 13.9428 8.9998 15.5996 8.9998H19.1639C19.1605 8.94663 19.1567 8.89479 19.1526 8.84419C19.1065 8.28099 19.0185 7.92419 18.8726 7.63783C18.585 7.07335 18.1261 6.61441 17.5616 6.32679C17.2752 6.18088 16.9184 6.09287 16.3552 6.04686ZM19.1975 10.1998H15.5996C14.6055 10.1998 13.7996 11.0057 13.7996 11.9998C13.7996 12.9939 14.6055 13.7998 15.5996 13.7998H19.1975C19.1996 13.5111 19.1996 13.1929 19.1996 12.8398V11.1598C19.1996 10.8067 19.1996 10.4886 19.1975 10.1998ZM16.4529 4.85084C17.0904 4.90292 17.6226 5.01111 18.1064 5.25758C18.8967 5.66025 19.5392 6.30276 19.9418 7.09304C20.1883 7.57677 20.2965 8.10906 20.3486 8.74647C20.3996 9.37126 20.3996 10.1476 20.3996 11.1331V12.8665C20.3996 13.852 20.3996 14.6284 20.3486 15.2531C20.2965 15.8905 20.1883 16.4228 19.9418 16.9066C19.5392 17.6968 18.8967 18.3394 18.1064 18.742C17.6226 18.9885 17.0904 19.0967 16.4529 19.1488C15.8282 19.1998 15.0518 19.1998 14.0663 19.1998H10.5435C9.548 19.1998 8.6259 19.1998 7.856 19.1495C7.10285 19.1002 6.39759 18.9992 5.89285 18.742C5.10257 18.3394 4.46005 17.6968 4.05738 16.9066C3.81091 16.4228 3.70273 15.8905 3.65065 15.2531C3.5996 14.6283 3.59961 13.852 3.59961 12.8665V11.1332C3.59961 10.1476 3.5996 9.37126 3.65065 8.74647C3.70273 8.10906 3.81091 7.57677 4.05738 7.09304C4.46005 6.30276 5.10257 5.66025 5.89285 5.25758C6.39759 5.0004 7.10285 4.89936 7.856 4.85013C8.6259 4.7998 9.54799 4.7998 10.5435 4.7998L14.0663 4.7998C15.0518 4.7998 15.8282 4.7998 16.4529 4.85084Z"
                          fill="#089705"
                        />
                        <path
                          d="M15 11.9999C15 11.6685 15.2686 11.3999 15.6 11.3999H16.2C16.5314 11.3999 16.8 11.6685 16.8 11.9999C16.8 12.3313 16.5314 12.5999 16.2 12.5999H15.6C15.2686 12.5999 15 12.3313 15 11.9999Z"
                          fill="#089705"
                        />
                        <path
                          d="M6.59961 8.3998C6.59961 8.06843 6.86824 7.7998 7.19961 7.7998H10.7996C11.131 7.7998 11.3996 8.06843 11.3996 8.3998C11.3996 8.73118 11.131 8.9998 10.7996 8.9998H7.19961C6.86824 8.9998 6.59961 8.73118 6.59961 8.3998Z"
                          fill="#089705"
                        />
                      </svg>
                      <p>Pago seguro</p>
                    </div>
                  </div>
                </Card>
                {productsCart.length > 0 ? (
                  <>
                    <div className="toPay">
                      {/* <Link to={`/checkout/${subtotal.toLocaleString('es')}/${costoEnvio.toLocaleString('es')}/${discountCoupon && discountCoupon.total !== undefined ? discountCoupon.total : totalaPagar}/${discountCoupon && discountCoupon.discount !== undefined ? discountCoupon.discount : descuento}`}> */}
                      {/* <Link to={checkout}> */}
                      <a href={`/checkout`}>Ir a pagar</a>
                      {/* </Link> */}
                    </div>
                    <div className="awaitShopping">
                      <a href="/">Seguir comprando</a>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            )
          )}
        </div>


        {isScrollModalEnabled && (
          <div id="scrollModalToPay" ref={scrollModalToPayRef} className="scroll-modal">
            <div className="scroll-modal-content">
              {/* <!-- Contenido del modal --> */}
              <div className="containerCaracteristicaEnvio">
                <p className="caract">Envío</p>
                <p className="envio">
                  {productsCart && productsCart.length === 0 ? (
                    <p>$0</p>
                  ) : subtotal <= 39900 ? (
                    <span className="badge text-bg-success">Paga el cliente</span>
                  ) : (
                    <p>${costoEnvio.toLocaleString("es")}</p>
                  )}
                </p>
              </div>
              <div className="containerCaracteristicaPrecio">
                <p>Precio Total</p>
                <h6>{totalaPagar}</h6>
              </div>
              {productsCart.length > 0 ? (
                <>
                  <div className="awaitShopping">
                    {/* <Link to={`/checkout/${subtotal.toLocaleString('es')}/${costoEnvio.toLocaleString('es')}/${discountCoupon && discountCoupon.total !== undefined ? discountCoupon.total : totalaPagar}/${discountCoupon && discountCoupon.discount !== undefined ? discountCoupon.discount : descuento}`}> */}
                    <a href={`/checkout`}>Continuar compra</a>
                    {/* </Link> */}
                  </div>
                  <div className="toPay">
                    {/* <Link to={`/detailCart/address/${subtotal}/${totalaPagar}`}> */}
                    <a href="/">Seguir comprando</a>
                    {/* </Link> */}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailCart;
