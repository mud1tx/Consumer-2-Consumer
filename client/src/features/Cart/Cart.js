import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaWhatsappSquare } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../BASE_URL";
import { useNavigate } from "react-router-dom";
import EmptyCartSvg from "../../assets/EmptyCartSvg";
import Loading from "../../components/Loading";

const Cart = () => {
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [cartProducts, setCartProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const getCartData = async () => {
    setLoading(true);
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
    console.log(cartData);
    const { ok } = cartData;
    let totalPrice = 0;
    for (let i = 0; i < cartData?.products?.length; i++) {
      totalPrice = totalPrice + cartData.products[i].productId.price;
    }
    setPrice(totalPrice);
    if (!ok) {
      setLoading(false);
      const { message } = cartData;
      toast.error(`${message}`);
    } else {
      setLoading(false);
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
      {loading ? (
        <Loading />
      ) : (
        [
          cartProducts.length > 0 ? (
            <div className="" key={Math.random() * 10000000}>
              <div className="" id="chec-div">
                <div className="container" id="checkout">
                  <div
                    className="  flex md:flex-row  flex-col items-start   justify-between"
                    id="cart"
                  >
                    <div
                      className=" flex flex-col ml-8 md:ml-0 items-start justify-start "
                      id="scroll"
                    >
                      <p className="text-3xl text-primary font-semibold">
                        Your Cart
                      </p>
                      {cartProducts.map((product) => (
                        <div
                          key={product.productId._id}
                          className=" flex flex-col items-start justify-start pb-10  "
                        >
                          <div className="w-16 h-16  mb-4">
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
                                <div key={index} className="">
                                  <img
                                    className="rounded-full"
                                    src={`data:image/jpeg;base64,${img.data}`}
                                    alt={`${product.productId.category}`}
                                  />
                                </div>
                              ))}
                            </Carousel>
                          </div>
                          <div className="flex text-text_color flex-col items-start ">
                            <p className="text-xs text-primary">
                              {product.productId._id}
                            </p>
                            <div className="">
                              <p className=" text-text_color md:text-lg flex gap-x-2 font-semibold  text-base mr-2">
                                Category:
                                <span className="font-normal text-text_color  w-40 truncate">
                                  {product.productId.category}
                                </span>
                              </p>
                            </div>
                            <p className=" md:text-lg flex gap-x-2 font-semibold  text-base mr-2">
                              Product Name:{" "}
                              <span className="font-normal w-40 truncate">
                                {product.productId.title}
                              </span>
                            </p>
                            <p className="md:text-lg flex gap-x-2 font-semibold  text-base mr-2">
                              Product Details:{" "}
                              <span className="font-normal w-40 truncate">
                                {product.productId.description}
                              </span>
                            </p>
                            <p className="md:text-lg flex gap-x-2 text-primary font-semibold  text-base mr-2">
                              {product.productId.price} INR/DAY
                            </p>
                            <div>
                              <div className=" flex mt-4  items-center justify-center gap-20">
                                <div className=" cursor-pointer text-red-500">
                                  <RiDeleteBin6Line
                                    className="text-2xl"
                                    onClick={() => {
                                      removeCartProduct(product.productId._id);
                                    }}
                                  />
                                </div>

                                <div>
                                  <button
                                    onClick={() => {
                                      navigate("/admin/chats");
                                    }}
                                  >
                                    <BsFillChatDotsFill className="text-xl text-primary" />
                                  </button>
                                </div>
                              </div>
                              <div className="mt-2">
                                <button
                                  onClick={() => {
                                    navigate(`/${product.productId._id}`);
                                  }}
                                  className="md:text-base text-sm capitalize leading-none w-full py-2 hover:bg-primary  border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-primary  hover:text-text_color duration-700 border"
                                >
                                  Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="  xl:w-1/3 md:w-1/2 w-full   md:border md:border-black/40 font-Poppins bg-main_white h-full ">
                      <div className="flex flex-col  px-8  md:py-8 justify-between overflow-y-auto">
                        <div>
                          <p className="text-xl font-Poppins md:text-2xl font-black leading-9 text-primary">
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
                            <p className="md:text-xl text-sm leading-medium  text-text_color">
                              Total Amount
                            </p>
                            <p className="md:text-xl text-base font-bold leading-normal text-right text-text_color">
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
            <div key={Math.random() * 10000000}>
              <EmptyCartSvg />
            </div>
          ),
        ]
      )}
    </>
  );
};

export default Cart;
