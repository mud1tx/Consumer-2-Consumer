import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsCartCheck } from "react-icons/bs";

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
    <div className=" flex flex-wrap justify-center items-start gap-4  mt-8">
      {allProductsData.map((product) => (
        <div
          key={product._id}
          className=" border-2 border-main_color-1000 mb-8 rounded-md p-2 "
        >
          <div className=" h-auto rounded-md" style={{ maxWidth: "30rem" }}>
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
                <div
                  key={index}
                  // style={{ width: "30rem" }}
                >
                  <img
                    // className="w-full"
                    style={{ width: "100%" }}
                    src={`data:${product.imageType[index]};base64,${img}`}
                    alt={`${product.category}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="Content ">
            <h1>
              <span className="text-md font-bold text-main_color-1000">
                Title:{" "}
              </span>
              {product.title}
            </h1>
            <p>
              <span className="text-md font-bold text-main_color-1000">
                Category:{" "}
              </span>
              {product.category}
            </p>

            <p>
              <span className="text-md text-main_color-1000 font-bold">
                Price:{" "}
              </span>
              {product.price}{" "}
              <span className="text-xs text-main_color-600 ">INR</span>
            </p>
            <div className="flex justify-between items-center mt-4 ">
              <button className="border-2 hover:bg-main_color-1000 ease-in-out hover:text-main_color-200 duration-700 border-main_color-1000 rounded-sm  text-main_color-1000 pl-2 pr-2 pt-1 pb-1">
                Details
              </button>
              <BsCartCheck
                className="text-main_color-1000 text-2xl"
                onClick={() => {
                  getProductDetailHandler(product._id);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
