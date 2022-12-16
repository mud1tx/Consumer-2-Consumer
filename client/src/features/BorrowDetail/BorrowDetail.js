import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cards from "../../layouts/Cards";
import SkeletonComp from "../../components/SkeletonComp";

const BorrowDetail = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [borrowData, setBorrowData] = useState([]);
  const [message, setMessage] = useState("");
  const [marker, setMarker] = useState(true);
  const [secMarker, setSecMarker] = useState(false);

  useEffect(() => {
    const borrowItemHandler = async () => {
      const borrowItemApi = await fetch("http://localhost:5000/admin/borrow", {
        method: "POST",
        body: JSON.stringify({
          userId: userLoggedIn?.user?._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await borrowItemApi.json();
      const { ok } = res;
      if (!ok) {
        setMessage(res.msg);
      } else {
        setBorrowData(res.data);
      }
      setMarker(false);
      setSecMarker(true);
      console.log("borrow", res);
    };
    borrowItemHandler();
  }, [userLoggedIn]);

  return (
    <div className=" pt-20  ">
      {marker && (
        <div className="flex flex-wrap  p-4  justify-evenly items-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonComp key={index} />
          ))}
        </div>
      )}
      {!marker && secMarker && borrowData?.length > 0 ? (
        <Cards allProductsData={borrowData} />
      ) : (
        [secMarker && <h1 key="1">{message}</h1>]
      )}
    </div>
  );
};

export default BorrowDetail;
