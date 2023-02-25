import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../BASE_URL";
import NoProductSvg from "../../assets/NoProductSvg";
import Loading from "../../components/Loading";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Lend = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [lendData, setLendData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const lendItemHandler = async () => {
      setLoading(true);
      const lendItemApi = await fetch(`${BASE_URL}/admin/lend`, {
        method: "POST",
        body: JSON.stringify({
          userId: userLoggedIn?.user?._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await lendItemApi.json();
      const { ok } = res;
      if (!ok) {
        setLoading(false);
      } else {
        setLoading(false);
        setLendData(res.data);
      }
    };
    lendItemHandler();
  }, [userLoggedIn]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        [
          lendData?.length > 0 ? (
            <div
              className=" pl-2 pr-2 pb-2 pt-16"
              key={Math.random() * 1000000}
            >
              <h1 className="md:text-4xl text-3xl font-bold  text-primary ml-2">
                Lend
              </h1>
              {lendData.map((lend) => (
                <div key={lend._id}>
                  <div className="md:flex items-center mt-18 py-8 border   border-t  border-gray-200 ">
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
                          {lend.image.map((img, index) => (
                            <div key={index}>
                              <img
                                className="lg:h-40 h-64   p-2  md:w-full object-cover object-center"
                                src={`data:image/jpeg;base64,${img.data}`}
                                alt={`${lend.category}`}
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
                              <span className="text-base"> {lend._id}</span>
                            </p>
                            <p className="">
                              <span className="text-lg  font-medium">
                                Category:
                              </span>
                              <span className="text-base">{lend.category}</span>
                            </p>
                            <p className="">
                              <span className="text-lg font-medium">
                                Title:{" "}
                              </span>{" "}
                              <span className="text-base">{lend.title} </span>
                            </p>
                            <p className="">
                              <span className="text-lg font-medium  ">
                                Product Details:{" "}
                              </span>
                              {lend.description}
                            </p>
                          </div>

                          <div className="font-Poppins basis-2 p-2 lg:border-b-0 border-b lg:border-l">
                            <p className="">
                              <span className="font-medium text-lg">
                                Price:
                              </span>
                              <span className="text-base">{lend.price}</span>
                              <span className="text-primary text-sm ml-1">
                                {" "}
                                INR/DAY
                              </span>
                            </p>
                            <p className="">
                              <span className="text-lg font-medium ">
                                Lend To:
                              </span>
                              <span className="text-base ">
                                {lend.borrowedUserId.first_name +
                                  " " +
                                  lend.borrowedUserId.first_name}
                              </span>
                            </p>

                            <p className="">
                              <span className="text-lg font-medium ">
                                Email:{" "}
                              </span>
                              <span>{lend.borrowedUserId.email}</span>
                            </p>
                          </div>
                        </div>
                        <div className="basis lg:border-l p-2 ">
                          <div className=" ">
                            <span className="text-lg flex font-medium ">
                              Address
                              <p className=" text-base ml-1 font-normal">
                                {lend.borrowedUserId.address}
                              </p>
                            </span>

                            <span className="text-lg flex font-medium ">
                              Pincode:
                              <p className=" text-lg ml-1 font-medium">
                                {lend.borrowedUserId.pin_code}
                              </p>
                            </span>
                            <span className="text-lg flex font-medium">
                              City:
                              <p className="text-base font-normal ml-1 ">
                                {lend.borrowedUserId.city}
                              </p>
                            </span>
                            <span className="text-lg flex  font-medium">
                              Country
                              <p className="font-normal text-base ml-1">
                                {lend.borrowedUserId.country}
                              </p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ))} */}
                </div>
              ))}
            </div>
          ) : (
            <div key={Math.random() * 1000000}>
              <NoProductSvg />
            </div>
          ),
        ]
      )}
    </>
  );
};

export default Lend;
