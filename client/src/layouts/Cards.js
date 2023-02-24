import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsCartCheck ,BsFillCartCheckFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaWhatsappSquare,FaWhatsapp} from "react-icons/fa";
import { AddToCart } from "../redux/action/addCart";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../context/ChatProvider";
import { BASE_URL } from "../BASE_URL";

const Cards = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const allProductsData = props.allProductsData;
  const showChatsCartBtn = props.showChatsCartBtn;
  const showDeleteBtn = props.showDeleteBtn;
  const { chats, setChats } = ChatState();

  const getProductToCartHandler = async (productId) => {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      body: JSON.stringify({
        prodId: productId,
        userId: userLoggedIn?.user?._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const productData = await res.json();
    const { ok } = productData;
    const { message } = productData;
    if (ok === 200) {
      toast.success(`${message}`);
    } else if (!ok) {
      toast.error(`${message}`);
    } else {
      dispatch(AddToCart(productData.products));
      toast.success(`${message}`);
    }
  };

  const chatIdHandler = async (e) => {
    e.preventDefault();
    try {
      const newConvApi = await fetch(`${BASE_URL}/admin/chats`, {
        method: "POST",
        body: JSON.stringify({
          senderId: e.target[0].value,
          receiverId: e.target[1].value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await newConvApi.json();
      const { ok } = res;
      if (!ok) {
        navigate("/admin/chats");
      } else {
        navigate("/admin/chats");
        if (!chats.find((c) => c._id === res.data._id)) {
          setChats([res, ...chats]);
        }
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const onDeleteHandler = async (data) => {
    try {
      const deleteProductApi = await fetch(`${BASE_URL}/delete`, {
        method: "POST",
        body: JSON.stringify({
          userId: userLoggedIn?.user?._id,
          prodId: data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await deleteProductApi.json();
      const { ok } = res;
      if (ok) {
        toast.success(`${res.message}`);
        navigate("/");
      } else {
        toast.error(`${res.message}`);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <>
      <div className="flex flex-wrap  p-4 bg-backgound_white justify-evenly items-center">
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
                {product.image?.map((img, index) => (
                  <div key={100 * index}>
                    <img
                      className=" h-40
                    lg md:h-36 w-full object-cover object-center 
                    "
                      src={`data:image/jpeg;base64,${img.data}`}
                      alt=""
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="Content   rounded-sm mt-10  pt-6 pb-2">
              <h1 className="text-text_color  max-w-xs mt-2 mb-2 truncate">
                <span className="text-md  overflow-hidden font-bold ">
                  Title:{" "}
                </span>
                {product.title}
              </h1>
              <p className="text-text_color max-w-xs">
                <span className="text-md font-bold ">Category: </span>
                {product.category}
              </p>
              <div className="flex justify-between rounded-md items-center mt-4 ">
                <p className="text-3xl text-text_color">
                  {product.price}{" "}
                  <span className="text-xs text-primary ">INR</span>
                </p>

                <div className="flex items-center flex-row  justify-center gap-3">
                  {userLoggedIn?.isLoggedIn && (
                    <button
                      className="hover:bg-primary font-Poppins  duration-700 border border-primary text-primary hover:text-text_color focus:outline-none rounded-sm  px-1 py-1"
                      onClick={() => {
                        navigate(`/${product._id}`);
                      }}
                    >
                      Details
                    </button>
                  )}
                  {showDeleteBtn && (
                    <button
                      className="hover:bg-primary  duration-700 border  px-1 py-1 border-primary text-primary hover:text-text_color focus:outline-none rounded-sm  "
                      onClick={() => {
                        onDeleteHandler(product._id);
                        // navigate(`/${product._id}`);
                      }}
                    >
                      Delete
                    </button>
                  )}

                  {userLoggedIn?.isLoggedIn && showChatsCartBtn && (
                    <form onSubmit={chatIdHandler}>
                      <input
                        type="hidden"
                        name="senderId"
                        value={userLoggedIn?.user?._id || ""}
                      />
                      <input
                        type="hidden"
                        name="receiverId"
                        value={product.userId || ""}
                      />
                      <button type="submit">
                        <FaWhatsappSquare className="text-3xl text-primary" />
                      </button>
                    </form>
                  )}

                  {userLoggedIn?.isLoggedIn && showChatsCartBtn && (
                    <button>
                      <BsFillCartCheckFill
                        className="text-main_color-1000  text-primary text-3xl"
                        onClick={() => {
                          getProductToCartHandler(product._id);
                        }}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
