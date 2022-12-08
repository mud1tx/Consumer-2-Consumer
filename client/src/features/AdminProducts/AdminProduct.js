import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cards from "../../layouts/Cards";
import SkeletonComp from "../../components/SkeletonComp";

const AdminProduct = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [adminProd, setAdminProd] = useState([]);
  const [marker, setMarker] = useState(true);
  const [secMarker, setSecMarker] = useState(false);

  const getAdminProducts = async () => {
    const adminProductApiResponse = await fetch(
      "http://localhost:5000/admin/products",
      {
        method: "POST",
        body: JSON.stringify({
          userId: userLoggedIn.user._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const adminData = await adminProductApiResponse.json();
    const { ok } = adminData;
    if (!ok) {
    } else {
      setAdminProd(adminData.userProducts);
      setMarker(false);
      setSecMarker(true);
    }
    // console.log("adminData", adminData);
  };

  useEffect(() => {
    getAdminProducts();
  },[]);

  return (
    <div className=" pt-20 bg-main_color-200 ">
      {marker && (
        <div className="flex flex-wrap  p-4 bg-backgound_white justify-evenly items-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonComp key={index} />
          ))}
        </div>
      )}
      {!marker && secMarker && adminProd?.length > 0 ? (
        <Cards allProductsData={adminProd} />
      ) : (
        [secMarker && <h1>You didn't add any product</h1>]
      )}
    </div>
  );
};

export default AdminProduct;
