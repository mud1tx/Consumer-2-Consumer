import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsCartCheck } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddToCart } from "../redux/action/addCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cards = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const allProductsData = props.allProductsData;
  const [dateValue, setDateValue] = useState("");

  const getProductToCartHandler = async (productId) => {
    const res = await fetch("http://localhost:5000/cart", {
      method: "POST",
      body: JSON.stringify({
        prodId: productId,
        userId: userLoggedIn.user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const productData = await res.json();
    const { ok } = productData;
    const { message } = productData;
    if (ok === 200) {
      toast.success(`${message}`);
    } else if (!ok) {
      toast.error(`${message}`);
    } else {
      dispatch(AddToCart(productData.products));
      toast.success(`${message}`);
    }
    console.log("cart", productData.products);
  };

  const handleInputs = (e) => {
    const value = e.target.value;
    setDateValue(value);
  };

  const borrowHandler = async (e) => {
    e.preventDefault();
    // try{}catch{}
    // const orderApi = await fetch("http://localhost:5000/order", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     currentUser: currentUser,
    //     productData: productData,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const orderRes = await orderApi.json();
    console.log(e);
  };

  const date = new Date();
  let currentDate = date.toISOString().substring(0, 10);
  console.log(currentDate);

  return (
    <>
      <div className="flex flex-wrap  p-4 bg-backgound_white justify-evenly items-center">
        {allProductsData.map((product) => (
          <div
            key={product._id}
            className="bg-main_white  border border-backgound_white  transform transition duration-700 delay-500  hover:scale-105 rounded-md 
          shadow-xs hover:shadow-2xl
          mb-6 p-4"
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
                {product.image.map((img, index) => (
                  <div key={100 * index}>
                    <img
                      className=" h-40
                    lg md:h-36 w-full object-cover object-center 
                    "
                      src={`data:${product.imageType[index]};base64,${img}`}
                      alt={`${product.category}`}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="Content   rounded-sm mt-10  pt-6 pb-2">
              <h1 className="text-text_color  mt-2 mb-2">
                <span className="text-md font-bold ">Title: </span>
                {product.title}
              </h1>
              <p className="text-text_color">
                <span className="text-md font-bold ">Category: </span>
                {product.category}
              </p>

              <div className="flex justify-between rounded-md items-center mt-4 ">
                <p className="text-3xl text-text_color">
                  {product.price}{" "}
                  <span className="text-xs text-primary ">INR</span>
                </p>
                {/* {userLoggedIn?.isLoggedIn && (
                  <button
                    className="hover:bg-primary shadow-lg duration-700 border border-primary text-primary hover:text-text_color focus:outline-none rounded-sm  px-2 py-1"
                    type="submit"
                    onClick={() => {
                      navigate(`/orders/${product._id}`);
                    }}
                  >
                    Borrow
                  </button>
                )} */}
                {/* <button
                  className="hover:bg-primary shadow-lg duration-700 border border-primary text-primary hover:text-text_color focus:outline-none rounded-sm  px-2 py-1"
                  onClick={() => {
                    borrowHandler(userLoggedIn.user, product);
                  }}
                >
                  Borrow
                </button> */}
                <div className="flex items-center  justify-center gap-4">
                  <button
                    className="hover:bg-primary shadow-lg duration-700 border border-primary text-primary hover:text-text_color focus:outline-none rounded-sm  px-2 py-1"
                    onClick={() => {
                      navigate(`/${product._id}`);
                    }}
                  >
                    Details
                  </button>
                  {userLoggedIn?.isLoggedIn && (
                    <button>
                      <BsCartCheck
                        className="text-main_color-1000 text-2xl"
                        onClick={() => {
                          getProductToCartHandler(product._id);
                        }}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Cards;
