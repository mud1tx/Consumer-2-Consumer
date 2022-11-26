import React from "react";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const prodDetail = useSelector((state) => state.productDetail);
  return (
    <div>
      <h1>{prodDetail.singleProduct.title}</h1>
      <h1>{prodDetail.singleProduct.description}</h1>
      <p>{prodDetail.singleProduct.price}</p>
    </div>
  );
};

export default ProductDetail;
