export const SingleProduct = (prodId) => {
  return {
    type: "PRODUCT_DETAIL",
    payload: prodId,
  };
};
