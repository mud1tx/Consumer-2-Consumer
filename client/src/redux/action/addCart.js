export const AddToCart = (products) => {
  return {
    type: "ADD_TO_CART",
    payload: products,
  };
};
