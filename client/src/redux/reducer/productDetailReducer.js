const initial_state = {
  singleProduct: null,
};

export const productDetail = (state = initial_state, { type, payload }) => {
  switch (type) {
    case "PRODUCT_DETAIL":
      return { ...state, singleProduct: { ...payload } };
    default:
      return state;
  }
};
