import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import StripeCheckout from "react-stripe-checkout";
import { BASE_URL } from "../../BASE_URL";

const ProductDetail = () => {
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const { prodId } = useParams();
  const [prodDetail, setProdDetail] = useState(null);
  const [days, setDays] = useState("");
  const [showBorrowBtn, setShowBorrowBtn] = useState(true);
  // const [product, setProduct] = useState({
  //   name: "React from fb",
  //   price: 10,
  //   productBy: "facebook",
  // });

  const getProductDetailHandler = async (prodId) => {
    const res = await fetch(`${BASE_URL}/${prodId}`);
    const productData = await res.json();
    const { ok } = productData;
    console.log("data ayaa hai yaar", productData);
    if (!ok) {
      const { message } = productData;
      toast.error(`${message}`);
    } else {
      if (productData.product.userId == userLoggedIn.user._id) {
        setShowBorrowBtn(false);
      }
      setProdDetail(productData.product);
    }
  };

  useEffect(() => {
    getProductDetailHandler(prodId);
  }, []);

  const handleFormSubmit = async () => {
    try {
      const ordersApi = await fetch(`${BASE_URL}/admin/orders`, {
        method: "POST",
        body: JSON.stringify({
          userId: userLoggedIn.user._id,
          days: days,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await ordersApi.json();
      toast.success("Order Successfully placed");
      navigate("/orders");
    } catch (err) {
      console.log(err);
    }
  };

  const makePayment = async (productData) => {
    const prodData = {
      category: productData.category,
      title: productData.title,
      price: productData.price,
      _id: productData._id,
      description: productData.description,
      userId: productData.userId._id,
    };
    try {
      const makePaymentApi = await fetch(
        `${BASE_URL}/payment/create-checkout-session`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: userLoggedIn.user._id,
            prodData: prodData,
            days: days,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await makePaymentApi.json();
      console.log("payment ki problem", res);
      if (res.url) {
        // handleFormSubmit();
        window.location.href = res.url;
      } else {
        console.log("error occured");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen text-text_color capitalize">
        <div>
          <div className="2xl:container capitalize font-Poppins 2xl:mx-auto  bg-backgound_white lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4  ">
            <div className="flex justify-center items-center px-4 py-4 lg:flex-row flex-col-reverse gap-8">
              <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
                <h2 className="font-semibold capitalize lg:text-4xl text-3xl lg:leading-9 leading-7 text-primary  mt-4">
                  <span className="capitalize ">{prodDetail?.title}</span>
                </h2>

                <p className=" font-medium text-base capitalize leading-6 text-text_color mt-4">
                  Description:{" "}
                  <span className="font-normal text-sm">
                    {prodDetail?.description}
                  </span>
                </p>
                <h1 className="  font-medium leading-6 text-text_color text-base mt-4">
                  Category:{" "}
                  <span className="text-sm font-normal">
                    {prodDetail?.category}
                  </span>
                </h1>
                <p className=" font-medium text-base leading-6 text-text_color mt-4">
                  UserName:{" "}
                  <span className="font-normal text-sm">
                    {prodDetail?.userId.first_name +
                      " " +
                      prodDetail?.userId.last_name}
                  </span>
                </p>
                <p className=" font-medium text-base leading-6 text-text_color mt-4">
                  Email:{" "}
                  <span className="font-normal text-sm">
                    {" "}
                    {prodDetail?.userId.email}
                  </span>
                </p>
                {prodDetail?.userId.address && (
                  <p className=" font-medium text-base leading-6 text-text_color mt-4">
                    address:{" "}
                    <span className="font-normal text-sm">
                      {prodDetail?.userId.address}
                    </span>
                  </p>
                )}
                {prodDetail?.userId.pin_code && (
                  <p className=" font-medium text-base leading-6 text-text_color mt-4">
                    Pin:
                    <span className="font-normal text-sm"></span>{" "}
                    {prodDetail?.userId.pin_code}
                  </p>
                )}
                {prodDetail?.userId.city && (
                  <p className=" font-medium text-base leading-6 text-text_color mt-4">
                    City:{" "}
                    <span
                      className="text-sm font-normal
                  "
                    >
                      {prodDetail?.userId.city}
                    </span>
                  </p>
                )}
                {prodDetail?.userId.country && (
                  <p className=" font-medium text-base leading-6 text-text_color mt-4">
                    country:{" "}
                    <span className="text-sm font-normal">
                      {" "}
                      {prodDetail?.userId.country}
                    </span>
                  </p>
                )}
                <p className=" font-semibold lg:text-2xl flex items-center justify-items-center text-text_color text-xl lg:leading-6 leading-5 mt-4 ">
                  Product Price:{" "}
                  <div className="lg:text-xl ml-1">
                  {" "} {prodDetail?.price} INR/DAY
                  </div>
                </p>

                <button className="focus:outline-none  focus:ring-2 border bg-primary border-primary hover:bg-backgound_white  duration-700 focus:ring-offset-2 focus:ring-gray-800 font-medium text-base hover:text-primary leading-4  text-text_color w-full py-5 lg:mt-12 mt-6">
                  Add to shopping bag
                </button>


                {showBorrowBtn && (
          <div className="flex border-2 pt-2 py-3 mt-4 border-primary  items-center justify-center">
            <p className=" duration-700 text-xs sm:text-lg ">Days Input From 1 to 30 </p>
            <input
            className="ml-2 border border-primary focus:outline-none"
              type="number"
              min="1"
              max="31"
              name="days"
              value={days}
              onChange={(e) => {
                setDays(e.target.value);
              }}
            />
            {days && (
              <button
                className="hover:bg-primary  text-sm  shadow-lg duration-700 border border-primary text-primary hover:text-text_color focus:outline-none rounded-sm  px-1 py-1"
                onClick={() => {
                  makePayment(prodDetail);
                }}
              >
                Borrow
              </button>
            )}
        
          </div>
        )}
              </div>

              <div className=" max-w-md">
                <Carousel
                  showStatus={false}
                  showArrows={false}
                  showIndicators={false}
                  showThumbs={true}
                  swipeScrollTolerance={20}
                  centerMode={true}
                  preventMovementUntilSwipeScrollTolerance={true}
                 centerSlidePercentage={100}
                >
                  {prodDetail?.image.map((img, index) => (
                    <div key={index}>
                      <img
                        className="rounded-md"
                        src={`data:image/jpeg;base64,${img.data}`}
                        alt={`${prodDetail?.category}`}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
     
      </div>
    </>
  );
};

export default ProductDetail;
