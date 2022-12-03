import { combineReducers } from "redux";
import { authenticateUser } from "./authUserReducer";
import { productDetail } from "./productDetailReducer";
import { addToCartReducer } from "./addToCartReducer";
import { searchInputReducer } from "./searchInputReducer";

const reducers = combineReducers({
  authenticateUser,
  productDetail,
  addToCartReducer,
  searchInputReducer,
});

export default reducers;
