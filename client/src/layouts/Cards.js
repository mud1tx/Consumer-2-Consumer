import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsCartCheck } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { SingleProduct } from "../redux/action/productDetail";
import { useNavigate } from "react-router-dom";
import { AddToCart } from "../redux/action/addCart";

const Cards = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const allProductsData = props.allProductsData;

  const getProductDetailHandler = async (productId) => {
    const res = await fetch(`http://localhost:5000/${productId}`);
    const productData = await res.json();
    const { ok } = productData;
    if (!ok) {
    } else {
      dispatch(SingleProduct(productData.product));
      navigate(`/${productId}`);
    }
  };

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
    if (!ok) {
    } else {
      dispatch(AddToCart(productData.products));
    }
    console.log("cart", productData.products);
  };

  return (
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
                <div key={index}>
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
              <div className="flex items-center  justify-center gap-4">
                <button
                  className="hover:bg-primary shadow-lg duration-700 border border-primary text-primary hover:text-text_color focus:outline-none rounded-sm  px-2 py-1"
                  onClick={() => {
                    getProductDetailHandler(product._id);
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
              {/* <p>
              <span className="text-md text-main_color-1000 font-bold">
                Price:{" "}
              </span>
              {product.price}{" "}
              <span className="text-xs text-main_color-600 ">INR</span>
            </p>
            <div className="flex justify-between items-center mt-4 ">
              <button
                className="border-2 hover:bg-main_color-1000 ease-in-out hover:text-main_color-200 duration-700 border-main_color-1000 rounded-sm  text-main_color-1000 pl-2 pr-2 pt-1 pb-1"
                onClick={() => {
                  getProductDetailHandler(product._id);
                }}
              >
                Details
              </button>
              {userLoggedIn?.isLoggedIn && (
                <BsCartCheck
                  className="text-main_color-1000 text-2xl"
                  onClick={() => {
                    getProductToCartHandler(product._id);
                  }}
                />
              )}
            </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
