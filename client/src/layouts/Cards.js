import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsCartCheck } from "react-icons/bs";
import classes from "./Cards.module.css";
// import Button from "../components/Button";
const Cards = (props) => {
  const allProductsData = props.allProductsData;

  const getProductDetailHandler = async (productId) => {
    const res = await fetch("http://localhost:5000/", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(productId);
    const productData = await res.json();
    console.log(productData);
  };

  return (
    <div className="   flex flex-wrap  p-4 bg-backgound_white justify-evenly items-center   ">
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
                <div key={index} className={classes.productImage}>
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
                <button className="
               hover:bg-primary shadow-lg duration-700 border border-primary   text-primary hover:text-text_color
                 focus:outline-none
                  rounded-sm  px-2 py-1">
                  Details
                </button>
                {/* <Button/> */}
                <button>
                  <BsCartCheck
                    className="text-main_color-25 text-text_color text-3xl"
                    onClick={() => {
                      getProductDetailHandler(product._id);
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
