import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cards from "../../layouts/Cards";
import SkeletonComp from "../../components/SkeletonComp";
import { BASE_URL } from "../../BASE_URL";
import NoProductSvg from "../../assets/NoProductSvg";
const Lend = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [lendData, setLendData] = useState([]);
  const [message, setMessage] = useState("");
  const [marker, setMarker] = useState(true);
  const [secMarker, setSecMarker] = useState(false);

  useEffect(() => {
    const lendItemHandler = async () => {
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
        setMessage(res.msg);
      } else {
        const lendProductArray = [];
        res.data.map((prod) => lendProductArray.push(prod));
        setLendData(lendProductArray);
      }
      setMarker(false);
      setSecMarker(true);
    };
    lendItemHandler();
  }, [userLoggedIn]);

  return (
    <>
      <div className=" pt-16 flex mb-4 gap-2  flex-wrap  items-center justify-center   h-full ">
        {marker && (
          <div className=" flex flex-wrap  p-4  justify-evenly items-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonComp key={index} />
            ))}
          </div>
        )}
        {!marker && secMarker && lendData?.length > 0 ? (
          <Cards
            allProductsData={lendData}
            showChatsCartBtn={true}
            showDeleteBtn={false}
          />
        ) : (
          [
            secMarker && (
              <div
                className="md:text-4xl flex flex-col items-center justify-center h-screen text-lg sm:text-xl text-text_color font-semibold font-Poppins "
                key={Math.random() * 10000}
              >
                <NoProductSvg />
              </div>
            ),
          ]
        )}
      </div>
    </>
  );
};

export default Lend;
