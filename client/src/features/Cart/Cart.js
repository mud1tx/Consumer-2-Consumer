import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux";
import { FaWhatsappSquare, FaWhatsapp } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { GiEmptyWoodBucket } from "react-icons/gi";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../BASE_URL";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import EmptyCartSvg from "../../assets/EmptyCartSvg";

const Cart = () => {
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [cartProducts, setCartProducts] = useState([]);
  const [price, setPrice] = useState(0);

  const getCartData = async () => {
    const cartApiResponse = await fetch(`${BASE_URL}/cart/products`, {
      method: "POST",
      body: JSON.stringify({
        userData: userLoggedIn?.user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const cartData = await cartApiResponse.json();
    const { ok } = cartData;
    let totalPrice = 0;
    for (let i = 0; i < cartData?.products?.length; i++) {
      totalPrice = totalPrice + cartData.products[i].productId.price;
    }
    setPrice(totalPrice);
    if (!ok) {
      const { message } = cartData;
      toast.error(`${message}`);
    } else {
      setCartProducts(cartData.products);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const removeCartProduct = async (prodId) => {
    const removeProductApi = await fetch(`${BASE_URL}/cart-delete-item`, {
      method: "POST",
      body: JSON.stringify({
        productId: prodId,
        userId: userLoggedIn.user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await removeProductApi.json();
    let totalPrice = 0;
    for (let i = 0; i < res.products.length; i++) {
      totalPrice = totalPrice + res.products[i].productId.price;
    }
    setPrice(totalPrice);
    const { ok } = res;
    const { message } = res;
    if (!ok) {
      toast.error(`${message}`);
    } else {
      toast.success(`${message}`);
      setCartProducts(res.products);
    }
  };

  return (
    <>
      {cartProducts.length > 0 ? (
        <div className="bg-main_white">
          {/* <div className="flex items-center justify-center py-8"></div> */}
          <div
            className="w-full h-screen  top-0 overflow-y-auto overflow-x-hidden flex items-center  fixed sticky-0"
            id="chec-div"
          >
            <div
              className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
              id="checkout"
            >
              <div
                className="flex md:flex-row flex-col justify-center bg-main_white"
                id="cart"
              >
                <div
                  className="lg:w-1/2 font-Poppins bg-main_white w-full   p-10 md:pr-4 md:py-12  overflow-y-auto overflow-x-hidden "
                  id="scroll"
                >
                  <p className="text-3xl md:text-4xl font-bold  mt-6 leading-10    text-primary pt-3">
                    Your Cart
                  </p>
                  {cartProducts.map((product) => (
                    <div
                      key={product.productId._id}
                      className="md:flex items-center mt-18 py-10    "
                    >
                      <div className=" h-auto  max-w-xs ">
                        <Carousel
                          infiniteLoop
                          autoPlay
                          showStatus={false}
                          showArrows={false}
                          showThumbs={false}
                          showIndicators={false}
                          stopOnHover={true}
                          interval={2000}
                        >
                          {product.productId.image.map((img, index) => (
                            <div key={index}>
                              <img
                                className="h-40 rounded-md lg md:h-36 w-full object-cover object-center"
                                // src={`data:${product.productId.imageType[index]};base64,${img}`}
                                src={`data:image/jpeg;base64,${img.data}`}
                                alt={`${product.productId.category}`}
                              />
                            </div>
                          ))}
                        </Carousel>
                      </div>
                      <div className="md:pl-3 md:w-3/4">
                        <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                          {product.productId._id}
                        </p>
                        <div className="flex items-center justify-between w-full pt-1">
                          <p className="text-base font-black leading-none text-gray-800">
                            This Is {product.productId.category}
                          </p>
                        </div>
                        <p className="text-xs leading-3 text-text_color pt-2 py-4">
                          Product Name: {product.productId.title}
                        </p>
                        <p className="w-96 text-xs leading-3 text-text_color">
                          Product Details h: {product.productId.description}
                        </p>
                        <div className="flex items-center justify-between pt-5 pr-6">
                          <div className="flex itemms-center">
                            <p className="text-xs leading-3 flex flex-col-reverse gap-2 underline text-secondry pl-5 cursor-pointer">
                              Remove:
                              <RiDeleteBin6Line
                                className="text-2xl"
                                onClick={() => {
                                  removeCartProduct(product.productId._id);
                                }}
                              />
                            </p>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                navigate(`/${product.productId._id}`);
                              }}
                              className="hover:bg-primary font-Poppins  duration-700 border border-primary text-primary hover:text-text_color focus:outline-none rounded-sm  px-1 py-1"
                            >
                              Details
                            </button>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                navigate("/admin/chats");
                              }}
                            >
                              <FaWhatsappSquare className="text-3xl text-primary" />
                            </button>
                          </div>
                          <p className="text-lg font-black leading-none text-gray-800">
                            {product.productId.price} INR/DAY
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="xl:w-1/2 md:w-1/3 w-full font-Poppins bg-main_white h-full ">
                  <div className="flex flex-col md:h-screen px-16 py- md:py-20 justify-between overflow-y-auto">
                    <div>
                      <p className="text-2xl font-Poppins md:text-4xl font-black leading-9 text-primary">
                        Order Summary:
                      </p>
                      <div className="flex items-center justify-between pt-16">
                        <p className="md:text-base text-sm  leading-none text-text_color">
                          Subtotal
                        </p>
                        <p className="md:text-base text-sm leading-none text-text_color">
                          {price} INR/DAY
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-5">
                        <p className="md:text-base text-sm leading-none text-text_color">
                          Shipping
                        </p>
                        <p className="md:text-base text-sm leading-none text-text_color">
                          {cartProducts.length * 10} INR/DAY
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center md:pb-6 pb-4 justify-between lg:pt-5 pt-20">
                        <p className="md:text-2xl text-sm leading-medium  text-text_color">
                          Total Amount
                        </p>
                        <p className="md:text-2xl text-base font-bold leading-normal text-right text-text_color">
                          {price + cartProducts.length * 10} INR/DAY
                        </p>
                      </div>
                      <button className="md:text-base text-sm capitalize leading-none w-full py-5 hover:bg-primary border border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-primary  hover:text-text_color duration-700 ">
                        Click On Details to buy the item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <EmptyCartSvg />
        </div>
      )}
      <Footer />
      <ToastContainer />
    </>
  );
  // const userLoggedIn = useSelector((state) => state.authenticateUser);
  // const [cartProducts, setCartProducts] = useState([]);

  // const getCartData = async () => {
  //   const cartApiResponse = await fetch("http://localhost:5000/cart/products", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       userData: userLoggedIn.user._id,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const cartData = await cartApiResponse.json();
  //   const { ok } = cartData;
  //   if (!ok) {
  //   } else {
  //     setCartProducts(cartData.products);
  //   }
  //   console.log("cartData", cartData);
  // };

  // useEffect(() => {
  //   getCartData();
  // }, []);

  // return (
  //   <div className=" flex flex-wrap justify-center items-start gap-4  mt-8">
  //     {cartProducts.map((product) => (
  //       <div
  //         key={product.productId._id}
  //         className=" border-2 border-main_color-1000 mb-8 rounded-md p-2 "
  //       >
  //         <div className=" h-auto rounded-md" style={{ maxWidth: "30rem" }}>
  //           <Carousel
  //             infiniteLoop
  //             autoPlay
  //             showStatus={false}
  //             showArrows={false}
  //             showThumbs={false}
  //             showIndicators={false}
  //             stopOnHover={true}
  //             interval={2000}
  //           >
  //             {product.productId.image.map((img, index) => (
  //               <div key={index}>
  //                 <img
  //                   className="w-full"
  //                   src={`data:${product.productId.imageType[index]};base64,${img}`}
  //                   alt={`${product.productId.category}`}
  //                 />
  //               </div>
  //             ))}
  //           </Carousel>
  //         </div>
  //         <div className="Content ">
  //           <h1>
  //             <span className="text-md font-bold text-main_color-1000">
  //               Title:{" "}
  //             </span>
  //             {product.productId.title}
  //           </h1>
  //           <p>
  //             <span className="text-md font-bold text-main_color-1000">
  //               Category:{" "}
  //             </span>
  //             {product.productId.category}
  //           </p>

  //           <p>
  //             <span className="text-md text-main_color-1000 font-bold">
  //               Price:{" "}
  //             </span>
  //             {product.productId.price}{" "}
  //             <span className="text-xs text-main_color-600 ">INR</span>
  //           </p>
  //           <div className="flex justify-between items-center mt-4 ">
  //             <button
  //               className="border-2 hover:bg-main_color-1000 ease-in-out hover:text-main_color-200 duration-700 border-main_color-1000 rounded-sm  text-main_color-1000 pl-2 pr-2 pt-1 pb-1"
  //             >
  //               Details
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default Cart;
