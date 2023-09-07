export const SearchBar = (data) => {
  return {
    type: "SEARCH_PRODUCT",
    payload: data.payload,
  };
};
