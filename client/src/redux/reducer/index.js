import { combineReducers } from "redux";
import { authenticateUser } from "./authUserReducer";
import { productDetail } from "./productDetailReducer";

const reducers = combineReducers({
  authenticateUser,
  productDetail,
});

export default reducers;
