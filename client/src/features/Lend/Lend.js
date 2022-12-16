import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cards from "../../layouts/Cards";
import SkeletonComp from "../../components/SkeletonComp";



const Lend = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [lendData, setLendData] = useState([]);
  const [message, setMessage] = useState("");
  const [marker, setMarker] = useState(true);
  const [secMarker, setSecMarker] = useState(false);

  useEffect(() => {
    const lendItemHandler = async () => {
      const lendItemApi = await fetch("http://localhost:5000/admin/lend", {
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
        setLendData(res.data);
      }
      setMarker(false);
      setSecMarker(true);
      console.log("lend", res);
    };
    lendItemHandler();
  }, [userLoggedIn]);

  return (
    <>
    {/* <Navbar/> */}
    <div className=" pt-16 flex mb-4 gap-2  flex-wrap  items-center justify-center   h-full ">
      {marker && (
        <div className=" flex flex-wrap  p-4  justify-evenly items-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonComp key={index} />
          ))}
        </div>
      )}
      {!marker && secMarker && lendData?.length > 0 ? (
        <Cards allProductsData={lendData} />
      ) : (
        [secMarker && <h1 key="1">{message}</h1>]
      )}
    </div>
    </>
  );
};

export default Lend;
