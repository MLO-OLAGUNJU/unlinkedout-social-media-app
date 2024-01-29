import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers/userReducer"; // Replace with your actual rootReducer

// Create the store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// import { createStore } from "redux";
// import rootReducer from "../reducers"; // Import your combined reducers

// const store = createStore(rootReducer); // Make sure 'user' is present in your initial state

// export default store;
