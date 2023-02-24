import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cards from "../../layouts/Cards";
import SkeletonComp from "../../components/SkeletonComp";
import { BASE_URL } from "../../BASE_URL";
import EmptyBorrowSvg from "../../assets/EmptyBorrowSvg";
const BorrowDetail = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [borrowData, setBorrowData] = useState([]);
  const [message, setMessage] = useState("");
  const [marker, setMarker] = useState(true);
  const [secMarker, setSecMarker] = useState(false);

  useEffect(() => {
    const borrowItemHandler = async () => {
      const borrowItemApi = await fetch(`${BASE_URL}/admin/borrow`, {
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
        const borrowProductArray = [];
        res.data.map((prod) => borrowProductArray.push(prod.productId));
        setBorrowData(borrowProductArray);
      }
      setMarker(false);
      setSecMarker(true);
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
        <Cards
          allProductsData={borrowData}
          showChatsCartBtn={true}
          showDeleteBtn={false}
        />
      ) : (
        [
          secMarker && (
            <div
              key={Math.random() * 10000}
              className="flex font-Poppins flex-col justify-center h-screen items-center"
            >
              <EmptyBorrowSvg />
            </div>
          ),
        ]
      )}
    </div>
  );
};

export default BorrowDetail;
