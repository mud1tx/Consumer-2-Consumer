export const SearchBar = (data) => {
  console.log("action",data)
  return {
    type: "SEARCH_PRODUCT",
    payload: data.payload,
  };
};
