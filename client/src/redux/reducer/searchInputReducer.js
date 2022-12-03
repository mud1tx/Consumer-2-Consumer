const initial_state = "";

export const searchInputReducer = (state = initial_state, { type, payload }) => {
  switch (type) {
    case "SEARCH_PRODUCT":
      // console.log("reducer hai",payload)
      return payload;
    default:
      return state;
  }
};
