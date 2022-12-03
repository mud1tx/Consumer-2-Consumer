import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector} from "react-redux";

const Cart = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [cartProducts, setCartProducts] = useState([]);

  const getCartData = async () => {
    const cartApiResponse = await fetch("http://localhost:5000/cart/products", {
      method: "POST",
      body: JSON.stringify({
        userData: userLoggedIn.user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const cartData = await cartApiResponse.json();
    const { ok } = cartData;
    if (!ok) {
    } else {
      setCartProducts(cartData.products);
    }
    console.log("cartData", cartData);
  };

  useEffect(() => {
    getCartData();
  }, []);
  //   const [cartProducts, setCartProducts] = useState([]);
  //   console.log("reducer", cartData);

  return (
    <div className=" flex flex-wrap justify-center items-start gap-4  mt-8">
      {cartProducts.map((product) => (
        <div
          key={product.productId._id}
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
              {product.productId.image.map((img, index) => (
                <div key={index}>
                  <img
                    className="w-full"
                    src={`data:${product.productId.imageType[index]};base64,${img}`}
                    alt={`${product.productId.category}`}
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
              {product.productId.title}
            </h1>
            <p>
              <span className="text-md font-bold text-main_color-1000">
                Category:{" "}
              </span>
              {product.productId.category}
            </p>

            <p>
              <span className="text-md text-main_color-1000 font-bold">
                Price:{" "}
              </span>
              {product.productId.price}{" "}
              <span className="text-xs text-main_color-600 ">INR</span>
            </p>
            <div className="flex justify-between items-center mt-4 ">
              <button
                className="border-2 hover:bg-main_color-1000 ease-in-out hover:text-main_color-200 duration-700 border-main_color-1000 rounded-sm  text-main_color-1000 pl-2 pr-2 pt-1 pb-1"
                // onClick={() => {
                //   getProductDetailHandler(product._id);
                // }}
              >
                Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
