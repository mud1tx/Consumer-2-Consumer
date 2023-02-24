import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BASE_URL } from "../../BASE_URL";
import EmptyOrderSvvg from "../../assets/EmptyOrderSvvg";
import Loading from "../../components/Loading";

const Order = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [message, setMessage] = useState("");
  const [orderData, setOrderData] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrderHandler = async () => {
    try {
      setLoading(true);
      const orderApi = await fetch(`${BASE_URL}/admin/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          currentUserId: userLoggedIn?.user?._id,
        },
      });
      const res = await orderApi.json();
      const { ok } = res;
      if (!ok) {
        setLoading(false);
        setMessage(res.msg);
      } else {
        setLoading(false);
        setOrderData(res.data);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchOrderHandler();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        [
          orderData?.length > 0 ? (
            <div
              className=" pl-2 pr-2 pb-2 pt-16"
              key={Math.random() * 1000000}
            >
              <h1 className="md:text-4xl text-3xl font-bold  text-primary ml-2">
                Order
              </h1>
              {orderData.map((order) => (
                <div key={order._id}>
                  {order.products?.map((product) => (
                    <div
                      key={Math.random() * 10000000}
                      className="md:flex items-center mt-18 py-8 border   border-t  border-gray-200 "
                    >
                      <div className="flex flex-col lg:flex-row justify-between items-center gap-x-4 ">
                        <div className=" lg:h-auto w-96   lg:max-w-xs ">
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
                                  className="lg:h-40 h-64   p-2  md:w-full object-cover object-center"
                                  src={`data:image/jpeg;base64,${img.data}`}
                                  alt={`${product.productId.category}`}
                                />
                              </div>
                            ))}
                          </Carousel>
                        </div>

                        <div className=" flex lg:flex-row flex-col   text-text_color font-Poppins">
                          <div className="flex  gap-4 flex-col sm:flex-row ">
                            <div className="basicDetails lg:border-b-0 border-b p-2 basis-2  flex-col  flex justify-between max-w-md">
                              <p className="">
                                <span className="font-medium  text-lg ">
                                  Product Id:{" "}
                                </span>
                                <span className="text-base">
                                  {" "}
                                  {product.productId._id}
                                </span>
                              </p>
                              <p className="">
                                <span className="text-lg  font-medium">
                                  Category:
                                </span>
                                <span className="text-base">
                                  {product.productId.category}
                                </span>
                              </p>
                              <p className="">
                                <span className="text-lg font-medium">
                                  Title:{" "}
                                </span>{" "}
                                <span className="text-base">
                                  {product.productId.title}{" "}
                                </span>
                              </p>
                              <p className="">
                                <span className="text-lg font-medium  ">
                                  Product Details:{" "}
                                </span>
                                {product.productId.description}
                              </p>
                            </div>

                            <div className="font-Poppins basis-2 p-2 lg:border-b-0 border-b lg:border-l">
                              <p className="">
                                <span className="font-medium text-lg">
                                  Price:
                                </span>
                                <span className="text-base">
                                  {product.productId.price}
                                </span>
                                <span className="text-primary text-sm ml-1">
                                  {" "}
                                  INR/DAY
                                </span>
                              </p>
                              <p className="">
                                <span className="text-lg font-medium ">
                                  Owner Name:
                                </span>
                                <span className="text-base ">
                                  {product.productId.userId.first_name +
                                    " " +
                                    product.productId.userId.first_name}
                                </span>
                              </p>

                              <p className="">
                                <span className="text-lg font-medium ">
                                  Email:{" "}
                                </span>
                                <span>{product.productId.userId.email}</span>
                              </p>
                            </div>
                          </div>
                          <div className="basis lg:border-l p-2 ">
                            <p>
                              {product.expire > Date.now()
                                ? `${Math.ceil(
                                    (product.expire - Date.now()) / 86400000
                                  )} day left to return the product`
                                : `product returned ${Math.ceil(
                                    (Date.now() - product.expire) / 86400000
                                  )} days ago`}
                            </p>

                            <div className=" ">
                              <span className="text-lg flex font-medium ">
                                Address
                                {product.productId.userId.address && (
                                  <p className=" text-base ml-1 font-normal">
                                    {product.productId.userId.address}
                                  </p>
                                )}
                              </span>

                              <span className="text-lg flex font-medium ">
                                Pincode:
                                {product.productId.userId.pin_code && (
                                  <p className=" text-lg ml-1 font-medium">
                                    {product.productId.userId.pin_code}
                                  </p>
                                )}
                              </span>
                              <span className="text-lg flex font-medium">
                                City:
                                {product.productId.userId.city && (
                                  <p className="text-base font-normal ml-1 ">
                                    {product.productId.userId.city}
                                  </p>
                                )}
                              </span>
                              <span className="text-lg flex  font-medium">
                                Country
                                {product.productId.userId.country && (
                                  <p className="font-normal text-base ml-1">
                                    {product.productId.userId.country}
                                  </p>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div key={Math.random() * 1000000}>
              <EmptyOrderSvvg />
            </div>
          ),
        ]
      )}
    </>
  );
};

export default Order;
