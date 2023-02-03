import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Order = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [message, setMessage] = useState("");
  const [orderData, setOrderData] = useState("");

  const fetchOrderHandler = async () => {
    try {
      const orderApi = await fetch("http://localhost:5000/admin/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          currentUserId: userLoggedIn?.user?._id,
        },
      });
      const res = await orderApi.json();
      const { ok } = res;
      if (!ok) {
        setMessage(res.msg);
      } else {
        setOrderData(res.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchOrderHandler();
  }, []);

  return (
    <>
      {orderData?.length > 0 ? (
        <div>
          <div className="flex items-center justify-center py-8"></div>
          <div
            className="w-full h-full bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
            id="chec-div"
          >
            <div
              className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
              id="checkout"
            >
              <div className="flex md:flex-row flex-col justify-end" id="cart">
                <div
                  className="lg:w-1/2 bg-backgound_white w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8  overflow-y-auto overflow-x-hidden h-screen"
                  id="scroll"
                >
                  <p className="text-5xl font-black leading-10  mb-10  text-primary pt-3">
                    Your Cart
                  </p>
                  {orderData.map((order) => (
                    <div key={order._id}>
                      {order.products?.map((product) => (
                        <div
                          key={Math.random() * 10000000}
                          className="md:flex items-center mt-18 py-8    border-t  border-backgound_white "
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
                                    className="h-40 lg md:h-36 w-full object-cover object-center"
                                    src={`data:${product.productId.imageType[index]};base64,${img}`}
                                    alt={`${product.productId.category}`}
                                  />
                                </div>
                              ))}
                            </Carousel>
                            {/* </div> */}
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
                              <p className="text-xl font-black leading-none text-gray-800">
                                {product.productId.price} INR
                              </p>
                            </div>
                            <p>
                              {product.expire > Date.now()
                                ? `${Math.ceil(
                                    (product.expire - Date.now()) / 86400000
                                  )} day left to return the product`
                                : `product returned ${Math.ceil(
                                    (Date.now() - product.expire) / 86400000
                                  )} days ago`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>
            Order is
            emptyefwj;ertfkwlrwerkjwelgkjeklrjwekrttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttr
          </h1>
          <h1>
            Order is
            emptyefwj;ertfkwlrwerkjwelgkjeklrjwekrttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttr
          </h1>
        </div>
      )}
    </>
  );
};

export default Order;
