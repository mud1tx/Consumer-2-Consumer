const initial_state = "";

export const searchInputReducer = (state = initial_state, { type, payload }) => {
  switch (type) {
    case "SEARCH_PRODUCT":
      return payload;
    default:
      return state;
  }
};
