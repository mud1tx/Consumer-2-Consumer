const initial_state = [];

export const addToCartReducer = (state = initial_state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      return [...state, [...payload]];
    default:
      return state;
  }
};
