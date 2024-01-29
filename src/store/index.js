import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers/userReducer"; // Replace with your actual rootReducer

// Create the store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
