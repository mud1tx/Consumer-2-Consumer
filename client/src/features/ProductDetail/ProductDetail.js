import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
        <div>
          <div>
            <div className="2xl:container 2xl:mx-auto h-screen bg-backgound_white lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4  ">
              <div className="flex justify-center items-center px-4 py-4 lg:flex-row flex-col-reverse gap-8">
                <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
                  <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-primary  mt-4">
                    {prodDetail?.title}
                  </h2>

                  <p className=" font-normal text-base leading-6 text-text_color mt-8">
                    {prodDetail?.description}
                  </p>
                  <h1 className=" font-normal  leading-6 text-text_color text-lg mt-8">
                    Category:{" "}
                    <span className="text-base">{prodDetail?.category}</span>
                  </h1>
                  <p className=" font-normal text-base leading-6 text-text_color mt-8">
                    {prodDetail?.userId.first_name +
                      " " +
                      prodDetail?.userId.last_name}
                  </p>
                  <p className=" font-normal text-base leading-6 text-text_color mt-8">
                    {prodDetail?.userId.email}
                  </p>
                  {prodDetail?.userId.address && (
                    <p className=" font-normal text-base leading-6 text-text_color mt-8">
                      {prodDetail?.userId.address}
                    </p>
                  )}
                  {prodDetail?.userId.pin_code && (
                    <p className=" font-normal text-base leading-6 text-text_color mt-8">
                      {prodDetail?.userId.pin_code}
                    </p>
                  )}
                  {prodDetail?.userId.city && (
                    <p className=" font-normal text-base leading-6 text-text_color mt-8">
                      {prodDetail?.userId.city}
                    </p>
                  )}
                  {prodDetail?.userId.country && (
                    <p className=" font-normal text-base leading-6 text-text_color mt-8">
                      {prodDetail?.userId.country}
                    </p>
                  )}
                  <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">
                    {prodDetail?.price} INR
                  </p>

                  <button className="focus:outline-none  focus:ring-2 border bg-primary border-primary hover:bg-backgound_white  duration-700 focus:ring-offset-2 focus:ring-gray-800 font-medium text-base hover:text-primary leading-4  text-text_color w-full py-5 lg:mt-12 mt-6">
                    Add to shopping bag
                  </button>
                </div>

                <div className=" w-full max-w-2xl  pt-16 sm:w-96 md:w-8/12  lg:w-6/12  lg:gap-8 sm:gap-6 gap-4">
                  <Carousel
                    showStatus={false}
                    showArrows={false}
                    showIndicators={false}
                    showThumbs={true}
                  >
                    {prodDetail?.image.map((img, index) => (
                      <div key={index}>
                        <img
                          className=""
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
          {showBorrowBtn && (
            <div>
              <label>Number of days you want to borrow(1 to 31)</label>
              <input
                type="number"
                min="1"
                max="30"
                name="days"
                value={days}
                onChange={(e) => {
                  setDays(e.target.value);
                }}
              />
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
                    className="hover:bg-primary shadow-lg duration-700 border border-primary text-primary hover:text-text_color focus:outline-none rounded-sm  px-2 py-1"
                    type="submit"
                  >
                    Borrow
                  </button>
                </StripeCheckout>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetail;
