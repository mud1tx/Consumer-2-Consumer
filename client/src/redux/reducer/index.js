import { combineReducers } from "redux";

import { authenticateUser } from "./authUserReducer";

const reducers = combineReducers({
  authenticateUser,
});

export default reducers;
