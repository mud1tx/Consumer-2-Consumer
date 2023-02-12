import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cards from "../../layouts/Cards";
import SkeletonComp from "../../components/SkeletonComp";
import { BASE_URL } from "../../BASE_URL";

const AdminProduct = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [adminProd, setAdminProd] = useState([]);
  const [marker, setMarker] = useState(true);
  const [secMarker, setSecMarker] = useState(false);

  const getAdminProducts = async () => {
    const adminProductApiResponse = await fetch(`${BASE_URL}/admin/products`, {
      method: "POST",
      body: JSON.stringify({
        userId: userLoggedIn.user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const adminData = await adminProductApiResponse.json();
    console.log("admin product", adminData);
    const { ok } = adminData;
    if (!ok) {
    } else {
      setAdminProd(adminData.userProducts);
      setMarker(false);
      setSecMarker(true);
    }
  };

  useEffect(() => {
    getAdminProducts();
  }, []);

  return (
    <>
      <div className=" bg-main_white  h-screen pt-20  w-full  ">
        {marker && (
          <div className="flex flex-wrap bg-main_white p-4  justify-evenly items-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonComp key={index} />
            ))}
          </div>
        )}
        {!marker && secMarker && adminProd?.length > 0 ? (
          <Cards
            allProductsData={adminProd}
            showChatsCartBtn={false}
            showDeleteBtn={true}
          />
        ) : (
          [secMarker && <h1 key="1">You didn't add any product</h1>]
        )}
      </div>
    </>
  );
};

export default AdminProduct;
