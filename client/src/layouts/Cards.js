import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsCartCheck } from "react-icons/bs";
import classes from './Cards.module.css';

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
    <div className=" bg-main_color-100 flex flex-wrap justify-center items-start   ">
      {/* <h1>This Is card</h1> */}
      {allProductsData.map((product) => (
        <div
          key={product._id}
          className=" border border-main_color-50  p-3  hover:bg-main_color-150 hover:border-main_color-150  duration-700"
        >
          <div className=" h-auto  max-w-xs" >
            <Carousel
              // length={3}
              // className="w-20"
              // style={{ width: "1rem" }}
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
                    className="w-full"
                    src={`data:${product.imageType[index]};base64,${img}`}
                    alt={`${product.category}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="Content mt-10  pt-6 pb-2">
            <h1 className="text-main_color-25 mt-2 mb-2">
              <span className="text-md font-bold text-main_color-25">
                Title:{" "}
              </span>
              {product.title}
            </h1>
            <p className="text-main_color-25">
              <span className="text-md font-bold ">
                Category:{" "}
              </span>
              {product.category}
            </p>

          
            <div className="flex justify-between items-center mt-4 ">


            <p className="text-3xl text-main_color-25">
              {product.price}{" "}
              <span className="text-xs text-main_color-25 ">INR</span>
            </p>
              <div className="flex items-center  justify-center gap-4">
              <button className="border rounded-md border-main_color-25 text-main_color-25 pl-2 pr-2 pt-1 pb-1">
                Details
              </button>
              <button>
              <BsCartCheck
                className="text-main_color-25 text-4xl"
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
