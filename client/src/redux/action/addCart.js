export const AddToCart = (products) => {
  console.log("prod hai yaar", products);
  return {
    type: "ADD_TO_CART",
    payload: products,
  };
};
