import React, { useEffect, useState } from 'react'
import './detailCartOffCanvas.css';
import { Card } from 'reactstrap';
import start from '../../assets/egoi_icons/star-fill.svg';
import startEmpty from '../../assets/egoi_icons/star-fill-gray.svg';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const DetailCartOffCanvasNoToken = ({ productsInCart, getAllProductsByCartNotoken, setCantCart, onclose }) => {
  const [quantity, setQuantity] = useState();
  const [costoEnvio, setCostoEnvio] = useState(0);
  const [discountCoupon, setDiscountCoupon] = useState("");
  const history = useHistory();

  const baseUrlImageThumbnail = "https://egoi.xyz/storage/app/public/product/thumbnail/";

  const deleteOne = (product) => {

    const productIdToDelete = product.id;

    // Obtiene los datos actuales del carrito desde el localStorage
    let productsCartWithoutToken = JSON.parse(localStorage.getItem('productsCart'));

    if (productsCartWithoutToken) {
      // Verifica si hay datos en el carrito en el localStorage

      // Filtra el array para excluir el producto con el ID específico
      const updatedCart = productsCartWithoutToken.filter(item => item.id !== productIdToDelete);

      // Actualiza los datos del carrito en el localStorage con el nuevo array
      localStorage.setItem('productsCart', JSON.stringify(updatedCart));


    }

    gtag('event', 'remove_from_cart', {
      currency: 'COP',
      items: [{
        item_id: product.id,
        item_name: product.name,
        coupon: '',
        discount: product.discount,
        affiliation: 'Egoi',
        item_brand: '',
        item_category: '',
        item_variant: '',
        price: product.unit_price,
        currency: 'COP',
        quantity: product.min_qty
      }],
      value: product.unit_price
    });
    toast.error('Producto eliminado del carrito!');
    getAllProductsByCartNotoken();

  }


  const sumSubTotal = (productsCart) => {
    let total = 0;
    productsCart.map((product) => {
      if (product.discount > 0) {
        const precioTotal = (product.unit_price - product.discount) * product.min_qty;
        total += precioTotal;


      }
      if (product.discount_tag_valor) {
        const precioTotal = (product.discount_tag_valor) * product.min_qty;
        total += precioTotal;
      }

      if (product.discount_tag_valor === 0 && product.discount === 0) {
        const precioTotal = (product.unit_price) * product.min_qty;
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
      const precioTotalWithoutDiscount = (product.unit_price) * product.min_qty;
      totalWithoutDiscount += precioTotalWithoutDiscount;
    })
    return totalWithoutDiscount;
  }

  const discountWhithTags = (productsCart) => {
    let totalDiscounts = 0;
    productsCart.map((product) => {
      const descuentosTotales = (product.discount);
      totalDiscounts += descuentosTotales;
    })
    return totalDiscounts;
  }

  const subtotal = sumSubTotal(productsInCart);

  const subtotalWithoutDiscount = sumWithoutDiscount(productsInCart);

  const discountedProducts = discountWhithTags(productsInCart);

  const descuento = '$0';

  const totalPagar = () => {


    if (subtotal <= 39900) {
      const precioTotalaPagar = subtotal + 0;
      return `$${precioTotalaPagar.toLocaleString('es')}`;
    }
    const precioTotalaPagar = subtotal + costoEnvio;
    return `$${precioTotalaPagar.toLocaleString('es')}`;

  }

  const totalaPagar = totalPagar();

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
  }



  const handleDecrement = (quantityUPD, idProd) => {
    const productIdToDecrement = idProd;

    // Obtiene los datos actuales del carrito desde el localStorage
    let productsCartWhithoutToken = JSON.parse(localStorage.getItem('productsCart'));

    if (productsCartWhithoutToken && productsCartWhithoutToken[productIdToDecrement]) {
      // Verifica si el producto existe en el carrito en el localStorage
      // y si es así, incrementa la cantidad deseada (por ejemplo, en 1)
      productsCartWhithoutToken[productIdToDecrement].min_qty -= 1;

      // Actualiza los datos del producto en el carrito
      // Actualiza los datos del carrito en el localStorage
      localStorage.setItem('productsCart', JSON.stringify(productsCartWhithoutToken));
    }
  }
  const handleIncrement = (quantityUPD, idProd) => {
    // Supongamos que tienes el ID del producto que deseas incrementar
    const productIdToIncrement = idProd;

    // Obtiene los datos actuales del carrito desde el localStorage
    let productsCartWhithoutToken = JSON.parse(localStorage.getItem('productsCart'));

    if (productsCartWhithoutToken && productsCartWhithoutToken[productIdToIncrement]) {
      // Verifica si el producto existe en el carrito en el localStorage
      // y si es así, incrementa la cantidad deseada (por ejemplo, en 1)
      productsCartWhithoutToken[productIdToIncrement].min_qty += 1;

      // Actualiza los datos del producto en el carrito
      // Actualiza los datos del carrito en el localStorage
      localStorage.setItem('productsCart', JSON.stringify(productsCartWhithoutToken));
    }

    // Realiza otras acciones necesarias después de incrementar la cantidad
    // (por ejemplo, actualiza el estado de tu componente si es necesario).
    // ...

    // Si deseas actualizar el estado local en tu componente, puedes hacerlo así:
    // setQuantity(quantityUPD + 1);
  };


  useEffect(() => {
    console.log("Productos del carrito en el offcanvas", productsInCart);
    getAllProductsByCartNotoken();
  }, []);
  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className='offCanvasDetailCart'>
        <div className="header">
          <h5>Carrito de compras</h5>
        </div>
        <hr />
        <div className="body">
          {productsInCart && productsInCart.length > 0 ? (
            <div >
              {productsInCart.map((products, index) => (
                <Card key={index}>
                  <div className="caracteristicasDetalle">
                    <div className="img">
                      <img src={baseUrlImageThumbnail + products.thumbnail} alt={products.name} style={{ width: '50px', height: '50px', marginRight: '16px' }} />
                    </div>
                    <div className="info">
                      <div className="starts">
                        {[...Array(5)].map((_, index) => (
                          <img
                            key={index}
                            src={index < products.count_rating ? start : startEmpty}
                            alt=""
                          />
                        ))}
                      </div>
                      <div className="productInfo">
                        <h6>{products.name}</h6>
                        {products.unit_price >= 79990 ? (
                          <div className='cutEnvio'>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M13.5738 6.63403C13.1555 6.60036 12.6195 6.5999 11.8575 6.5999H5.53365C5.20228 6.5999 4.93365 6.33126 4.93366 5.99989C4.93367 5.66852 5.2023 5.3999 5.53367 5.3999L11.8831 5.3999C12.6136 5.3999 13.1979 5.39989 13.6701 5.4379C14.1544 5.4769 14.5729 5.5588 14.9581 5.7522C15.5758 6.0623 16.0796 6.55796 16.3959 7.16963C16.5937 7.5522 16.6774 7.96782 16.7171 8.44703C16.7394 8.71606 16.7488 9.02184 16.7528 9.37049H17.3906C18.2149 9.37049 18.8697 9.37048 19.3978 9.413C19.9382 9.4565 20.3981 9.54742 20.8192 9.75885C21.5001 10.1007 22.0553 10.647 22.4038 11.3209C22.6199 11.7388 22.7127 12.1953 22.757 12.7297C22.8002 13.2511 22.8002 13.8972 22.8002 14.7086V15.6375C22.8002 15.8056 22.8002 15.9662 22.789 16.1018C22.7767 16.2499 22.748 16.4204 22.66 16.5906C22.5368 16.8288 22.3412 17.0207 22.1027 17.1405C21.933 17.2257 21.7633 17.2535 21.6149 17.2654C21.4785 17.2764 21.3164 17.2764 21.1453 17.2764L21.0251 17.2764C20.7695 18.0488 20.034 18.5999 19.178 18.5999C18.322 18.5999 17.5865 18.0487 17.3309 17.2764H9.94356C9.68799 18.0488 8.95248 18.5999 8.09648 18.5999C7.22063 18.5999 6.47092 18.0229 6.2324 17.2223C5.98721 17.21 5.79037 17.2042 5.53366 17.2042C5.20229 17.2042 4.93366 16.9356 4.93366 16.6042C4.93366 16.2729 5.20229 16.0042 5.53366 16.0042C5.80655 16.0042 6.02013 16.0104 6.26817 16.0226C6.53951 15.2784 7.26044 14.7528 8.09648 14.7528C8.95248 14.7528 9.68799 15.304 9.94356 16.0764H15.5557V10.2352C15.5557 9.4839 15.5553 8.95705 15.5212 8.54619C15.4877 8.1426 15.425 7.90448 15.33 7.72082C15.1312 7.33633 14.813 7.0221 14.4197 6.82463C14.2303 6.72952 13.9853 6.66716 13.5738 6.63403ZM16.7557 10.5705V16.0764H17.3309C17.5865 15.304 18.322 14.7528 19.178 14.7528C20.034 14.7528 20.7695 15.304 21.0251 16.0764H21.1256C21.3235 16.0764 21.4363 16.0759 21.5186 16.0693C21.547 16.067 21.5642 16.0644 21.5732 16.0628C21.5789 16.0588 21.5838 16.0542 21.5876 16.0493C21.5891 16.0404 21.5912 16.0255 21.5931 16.0026C21.5997 15.9228 21.6002 15.8129 21.6002 15.6175V14.7352C21.6002 13.8912 21.5997 13.2949 21.5611 12.8289C21.523 12.3701 21.4511 12.0911 21.3378 11.8721C21.1068 11.4253 20.7373 11.0605 20.2808 10.8313C20.0555 10.7181 19.769 10.6468 19.3015 10.6091C18.8272 10.5709 18.2207 10.5705 17.3646 10.5705H16.7557ZM2.71131 9.7499C2.71131 9.41853 2.97994 9.1499 3.31131 9.1499H7.08909C7.42046 9.1499 7.68909 9.41853 7.68909 9.7499C7.68909 10.0813 7.42046 10.3499 7.08909 10.3499H3.31131C2.97994 10.3499 2.71131 10.0813 2.71131 9.7499ZM1.2002 12.7499C1.2002 12.4185 1.46882 12.1499 1.8002 12.1499H7.84465C8.17602 12.1499 8.44465 12.4185 8.44465 12.7499C8.44465 13.0813 8.17602 13.3499 7.84465 13.3499H1.8002C1.46882 13.3499 1.2002 13.0813 1.2002 12.7499ZM8.09648 15.9528C7.68264 15.9528 7.36075 16.2775 7.3534 16.6624L7.35327 16.6764C7.35327 17.0676 7.67764 17.3999 8.09648 17.3999C8.51533 17.3999 8.83969 17.0676 8.83969 16.6764C8.83969 16.2851 8.51533 15.9528 8.09648 15.9528ZM19.178 15.9528C18.7591 15.9528 18.4348 16.2851 18.4348 16.6764C18.4348 17.0676 18.7591 17.3999 19.178 17.3999C19.5968 17.3999 19.9212 17.0676 19.9212 16.6764C19.9212 16.2851 19.5968 15.9528 19.178 15.9528Z" fill="#089705" />
                            </svg>
                            <p>Envío Gratis</p>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {products.discount === 0 && products.discount_tag_valor === 0 && (
                          <>
                            <h5> ${((products.unit_price) * products.min_qty).toLocaleString('es')}</h5>
                          </>
                        )}
                        {products.discount > 0 && (
                          <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                              <h5 style={{ color: '#A2A1A7', fontSize: '12px' }}><s>${((products.unit_price) * products.min_qty).toLocaleString('es')}</s></h5>
                              <h5> ${((products.unit_price - products.discount) * products.min_qty).toLocaleString('es')}</h5>
                            </div>
                          </>
                        )}
                        {products.discount_tag_valor > 0 && (
                          <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                              <h5 style={{ color: '#A2A1A7', fontSize: '12px' }}><s>${((products.unit_price) * products.min_qty).toLocaleString('es')}</s></h5>
                              <h5>${(products.discount_tag_valor * products.min_qty).toLocaleString('es')}</h5>
                            </div>
                          </>
                        )}
                        <div className="cant">
                          <p>Cantidad:</p>
                          {/* <input type="number" value={products.quantity} disabled /> */}
                          {products.min_qty >= 2 && (

                            <button className='btnIzq' onClick={() => { setQuantity(products.min_qty); handleDecrement(products.min_qty, products.id); getAllProductsByCartNotoken() }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                              </svg>
                            </button>
                          )}
                          <h5>{products.min_qty}</h5>

                          <button className='btnDer' onClick={() => { setQuantity(products.min_qty); handleIncrement(products.min_qty, products.id); getAllProductsByCartNotoken() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                            </svg>
                          </button>

                        </div>
                      </div>
                    </div>
                    <div className="deleteProduct">
                      <a href="#" onClick={(e) => { e.preventDefault(); deleteOne(products) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div >
              <div className="noProductsOnCart">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#FC5241" className="bi bi-cart-x" viewBox="0 0 16 16">
                  <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <p>Aún no tienes productos en el carrito</p>
                <a href="#" onClick={(e) => { e.preventDefault(); onclose() }}>Ir a comprar</a>
              </div>
            </div>
          )}
        </div>
        {productsInCart.length > 0 && (
          <div className="footer">
            <div className="subtotal">
              <p>Subtotal</p>
              <p>${subtotalWithoutDiscount.toLocaleString('es')}</p>

            </div>
            <div className="descuentos">
              <p>Descuentos</p>
              {discountCoupon && discountCoupon.total !== undefined ? (
                <p>{discountCoupon.discount}</p>

              ) : (
                <p>${discountedProducts.toLocaleString('es')}</p>
              )}

            </div>
            <div className="totalAPagar">
              <h5>Total</h5>
              <p><strong>{totalaPagar}</strong></p>
            </div>

            <div className="btns">
              <button onClick={(e) => { e.preventDefault(); history.push(`/detailCart`) }}>Ir a mi carrito </button>
              <a href='#' onClick={(e) => { e.preventDefault(); onclose() }}>Seguir comprando</a>
            </div>
          </div>
        )}
      </div>
    </>

  )
}

export default DetailCartOffCanvasNoToken
