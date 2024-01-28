import { combineReducers } from "redux";
import { userReducer } from "./userReducer.js";
import { useReducer } from "react";

const rootReducer = combineReducers({
  userState: useReducer,
});
