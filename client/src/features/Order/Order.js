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
  }, [userLoggedIn?.user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        [
          orderData?.length > 0 ? (
            <div
              className="pl-2 pr-2 pb-2  container"
              key={Math.random() * 1000000}
            >
              <h1 className=" text-primary font-medium  md:text-3xl text-xl sm:text-2xl ">
                Orders
              </h1>
              {orderData.map((order) => (
                <div key={order._id}>
                  {order.products?.map((product) => (
                    <div key={Math.random() * 10000000} className=" ">
                      <div className=" border-b mt-4 border-black/40 flex flex-col items-start ">
                        <div className=" w-20 h-20 ">
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
                                  className=" rounded-full"
                                  src={`data:image/jpeg;base64,${img.data}`}
                                  alt={`${product.productId.category}`}
                                />
                              </div>
                            ))}
                          </Carousel>
                        </div>
                        <p className=" capitalize text-xs text-primary">
                          {product.expire > Date.now()
                            ? `${Math.ceil(
                                (product.expire - Date.now()) / 86400000
                              )} day left to return the product`
                            : `product returned ${Math.ceil(
                                (Date.now() - product.expire) / 86400000
                              )} days ago`}
                        </p>
                        <div className=" flex flex-col items-start justify-start mb-6 ">
                          <div className=" ">
                            <div className=" flex items-start flex-col ">
                              <p className=" font-semibold flex  sm:text-xl text-lg">
                                Product Id:
                                <span className="font-normal ">
                                  {product.productId._id}
                                </span>
                              </p>
                              <p className="font-semibold  sm:text-xl text-lg">
                                Category:
                                <span className=" font-normal max-w-xs truncate ml-2">
                                  {product.productId.category}
                                </span>
                              </p>
                              <p className="font-semibold  sm:text-xl text-lg">
                                Title:
                                <span className="font-normal max-w-xs truncate ml-2">
                                  {product.productId.title}{" "}
                                </span>
                              </p>
                              <p className="font-semibold flex items-start sm:text-xl text-lg">
                                Details:
                                <p className="font-normal w-64 truncate ml-2">
                                  {product.productId.description}
                                </p>
                              </p>
                            </div>

                            <div className=" flex flex-col gap-x-2">
                              <p className="font-semibold  sm:text-xl text-lg">
                                Price:
                                <span className="font-normal max-w-xs truncate ml-2">
                                  {product.productId.price}INR/DAY
                                </span>
                              </p>
                              <p className="font-semibold  sm:text-xl text-lg">
                                Owner Name:
                                <span className="font-normal max-w-xs truncate ml-2">
                                  {product.productId.userId.first_name +
                                    " " +
                                    product.productId.userId.first_name}
                                </span>
                              </p>

                              <p className="font-semibold  sm:text-xl text-lg">
                                Email:
                                <span className="font-normal max-w-xs truncate ml-2">
                                  {product.productId.userId.email}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className=" ">
                            <div className="flex items-start flex-col ">
                              <p className="font-semibold   sm:text-xl text-lg ">
                                Address
                                {product.productId.userId.address && (
                                  <span className="font-normal max-w-xs w-64  truncate ml-2 ">
                                    {product.productId.userId.address}
                                  </span>
                                )}
                              </p>

                              <p className="font-semibold  flex  items-start sm:text-xl text-lg">
                                Pincode:
                                {product.productId.userId.pin_code && (
                                  <p className="font-normal max-w-xs w-64  truncate ml-2 ">
                                    {product.productId.userId.pin_code}
                                  </p>
                                )}
                              </p>
                              <p className="font-semibold  flex  items-start sm:text-xl text-lg">
                                City:
                                {product.productId.userId.city && (
                                  <p className=" font-normal max-w-xs w-64  truncate ml-2">
                                    {product.productId.userId.city}
                                  </p>
                                )}
                              </p>
                              <p className="font-semibold  flex  items-start sm:text-xl text-lg">
                                Country:
                                {product.productId.userId.country && (
                                  <span className="font-normal max-w-xs w-64  truncate ml-2">
                                    {product.productId.userId.country}
                                  </span>
                                )}
                              </p>
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
