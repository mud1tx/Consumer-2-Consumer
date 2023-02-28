import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import StripeCheckout from "react-stripe-checkout";
import { BASE_URL } from "../../BASE_URL";
import Loading from "../../components/Loading";

const ProductDetail = () => {
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const { prodId } = useParams();
  const [prodDetail, setProdDetail] = useState(null);
  const [days, setDays] = useState("");
  const [showBorrowBtn, setShowBorrowBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  const getProductDetailHandler = async (prodId) => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/${prodId}`);
    const productData = await res.json();
    const { ok } = productData;
    if (!ok) {
      setLoading(false);
      const { message } = productData;
      toast.error(`${message}`);
    } else {
      setLoading(false);
      if (
        productData.product.userId._id === userLoggedIn.user._id ||
        (productData.product.borrowed === true &&
          userLoggedIn.user._id !== productData.product.userId._id)
      ) {
        setShowBorrowBtn(false);
      }
      setProdDetail(productData.product);
    }
  };

  useEffect(() => {
    getProductDetailHandler(prodId);
  }, []);

  const handleFormSubmit = async () => {
    const prodData = {
      title: prodDetail.title,
      price: prodDetail.price,
      _id: prodDetail._id,
      userId: prodDetail.userId._id,
    };
    try {
      const ordersApi = await fetch(`${BASE_URL}/admin/orders`, {
        method: "POST",
        body: JSON.stringify({
          userId: userLoggedIn.user._id,
          prodData: prodData,
          days: days,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await ordersApi.json();
      setLoading(false);
      toast.success("Order Successfully placed");
      navigate("/orders");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const makePayment = async (productData) => {
    const prodData = {
      title: productData.title,
      price: productData.price,
      _id: productData._id,
    };
    try {
      const makePaymentApi = await fetch(`${BASE_URL}/admin/checkout`, {
        method: "POST",
        body: JSON.stringify({
          userId: userLoggedIn.user._id,
          prodData: prodData,
          days: days,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await makePaymentApi.json();
      if (res.sessionId) {
        setLoading(true);
        handleFormSubmit();
      } else {
        console.log("error occured");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className=" text-text_color font-Poppins capitalize">
          <div>
            <div className="2xl:container 2xl:mx-auto  bg-backgound_white lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4  ">
              <div className="flex justify-center items-center px-4 py-4 lg:flex-row flex-col-reverse gap-8">
                <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
                  <h2 className="font-semibold capitalize lg:text-4xl md:text-3xl text-xl lg:leading-9 leading-7 text-primary  mt-4">
                    <span className="capitalize ">{prodDetail?.title}</span>
                  </h2>

                  <p className=" font-medium text-base md:text-lg capitalize leading-6 text-text_color mt-4">
                    Description:{" "}
                    <span className="font-normal ml-2 md:text-base text-xs">
                      {prodDetail?.description}
                    </span>
                  </p>
                  <h1 className=" font-medium text-base md:text-lg leading-6 text-text_color  mt-4">
                    Category:{" "}
                    <span className="text-xs  ml-2  md:text-base font-normal">
                      {prodDetail?.category}
                    </span>
                  </h1>
                  <p className="  font-medium text-base md:text-lg leading-6 text-text_color mt-4">
                    UserName:{" "}
                    <span className="font-normal   ml-2  text-xs md:text-base">
                      {prodDetail?.userId.first_name +
                        " " +
                        prodDetail?.userId.last_name}
                    </span>
                  </p>
                  <p className=" font-medium text-base md:text-lg leading-6 text-text_color mt-4">
                    Email:{" "}
                    <span className="font-normal  ml-2  text-xs md:text-base">
                      {" "}
                      {prodDetail?.userId.email}
                    </span>
                  </p>
                  <p className=" font-medium text-base md:text-lg leading-6 text-text_color mt-4">
                    Address:{" "}
                    <span className="font-normal  ml-2  text-xs md:text-base">
                      {prodDetail?.userId.address}
                    </span>
                  </p>
                  <p className=" font-medium text-base md:text-lg leading-6 text-text_color mt-4">
                    Pin:
                    <span className="font-normal text-xs  ml-2  md:text-base">
                      {prodDetail?.userId.pin_code}
                    </span>
                  </p>
                  <p className=" font-medium text-base md:text-lg leading-6 text-text_color mt-4">
                    City:
                    <span className="font-normal text-xs  ml-2  md:text-base">
                      {" "}
                      {prodDetail?.userId.city}
                    </span>
                  </p>
                  <p className=" font-medium text-base md:text-lg leading-6 text-text_color mt-4">
                    country:{" "}
                    <span className="text-xs  ml-2  md:text-base font-normal">
                      {" "}
                      {prodDetail?.userId.country}
                    </span>
                  </p>
                  <p className=" font-semibold lg:text-2xl flex items-center justify-items-center text-text_color text-lg lg:leading-6 leading-5 mt-4 ">
                    Product Price:{" "}
                    <span className="md:text-lg   ml-2  text-lg text-primary ">
                      {" "}
                      {prodDetail?.price} INR/DAY
                    </span>
                  </p>

                  {showBorrowBtn && (
                    <div className="flex border-2 pt-2 py-3 mt-4 duration-700 border-primary  items-center justify-center">
                      <p className=" duration-700 text-xs sm:text-lg ">
                        Days Input From 1 to 30{" "}
                      </p>
                      <input
                        className="ml-2 border duration-700 border-primary focus:outline-none"
                        type="number"
                        min="1"
                        max="30"
                        name="days"
                        value={days}
                        onChange={(e) => {
                          setDays(e.target.value);
                        }}
                      />
                    </div>
                  )}
                  {days && days <= 31 && (
                    <StripeCheckout
                      stripeKey="pk_test_51LO0nNSBfCKAZDAkKq9TINx0QylNNPZB2VuFPQwLPnlRudxwz0x0PPTAl3I3SVjp6479PpXtgkTswBseoBwm8MWk002drvO5f4"
                      token={() => {
                        makePayment(prodDetail);
                      }}
                      name="PAYMENT"
                      image="https://picsum.photos/seed/picsum/200/300"
                      currency="INR"
                      amount={prodDetail.price * 100 * days}
                    >
                      <button
                        className="w-full text-xs sm:text-lg   duration-700 mt-2 border-2 border-primary pt-3 pb-3 bg-primary hover:bg-backgound_white "
                        type="submit"
                      >
                        Borrow
                      </button>
                    </StripeCheckout>
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
                          className="rounded-lg"
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
      )}
    </>
  );
};

export default ProductDetail;
