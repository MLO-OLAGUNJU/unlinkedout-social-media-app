// Import necessary modules
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { SET_USER } from "./actionType";

export const setUser = (result) => ({
  type: SET_USER,
  user: result,
});

// Action creator using redux-thunk
export const signInAPI = () => async (dispatch) => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    // localStorage.setItem("token", result.user.accessToken);
    // localStorage.setItem("user", JSON.stringify(result.user));
    // Dispatch the success action or update the state as needed
    dispatch(setUser(result.user));
  } catch (error) {
    alert(error.message);
  }
  // Dispatch the failure action or update the state as needed
  //   dispatch({ type: "SIGN_IN_FAILURE", payload: error });
  // }
};

export const getUserAuth = () => {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
};
