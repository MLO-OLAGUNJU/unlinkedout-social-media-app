// Import necessary modules
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import "firebase/storage";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import { storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  snapshotEqual,
} from "firebase/firestore";

export const setUser = (result) => ({
  type: SET_USER,
  user: result,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getArticles = (result) => ({
  type: GET_ARTICLES,
  result: result,
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
  //   dispatch({ type: "SIGN_IN_FAILURE", result: error });
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

export const signOutAPI = () => {
  return async (dispatch) => {
    try {
      await auth.signOut();
      dispatch(setUser(null));
    } catch (error) {
      console.log(error.message);
    }
  };
};

// export const postArticleAPI = (result) => {
//   return (dispatch) => {
//     if (result.image != "") {
//       const upload = storage
//         .ref(`images/${result.image.name}`)
//         .put(result.image);
//       upload.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Progress: ${progress}%`);
//           if (snapshot.state === "RUNNING") {
//             console.log(`Progress: ${progress}%`);
//           }
//         },
//         (error) => console.log(error.code),
//         async () => {
//           const downloadURL = await upload.snapshot.ref.getDownloadURL();
//           db.collection("articles").add({
//             actor: {
//               description: result.user.email,
//               title: result.user.displayName,
//               date: result.timestamp,
//               image: result.user.photoURL,
//             },
//             video: result.video,
//             sharedimg: downloadURL,
//             comments: 0,
//             description: result.description,
//           });
//         }
//       );
//     }
//   };
// };

// export function postArticleAPI(result) {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoading(true));

//       if (result.image !== "") {
//         const upload = storage
//           .ref(`images/${result.image.name}`)
//           .put(result.image);

//         upload.on(
//           "state-changed",
//           (snapshot) => {
//             const progress =
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

//             console.log(`Progress: ${progress}%`);
//             if (snapshot.state === "RUNNING") {
//               console.log(`Progress: ${progress}%`);
//             }
//           },
//           (error) => {
//             console.error(error.code);
//             throw new Error("Image upload failed");
//           },
//           async () => {
//             try {
//               const downloadURL = await upload.snapshot.ref.getDownloadURL();
//               // await db.collection("articles").add({
//               //   actor: {
//               //     description: result.user.email,
//               //     title: result.user.displayName,
//               //     date: result.timestamp,
//               //     image: result.user.photoURL,
//               //   },
//               //   video: result.video,
//               //   sharedImg: downloadURL,
//               //   comments: 0,
//               //   description: result.description,
//               // });

//               await db["collection"]("articles").add({
//                 actor: {
//                   description: result.user.email,
//                   title: result.user.displayName,
//                   date: result.timestamp,
//                   image: result.user.photoURL,
//                 },
//                 video: result.video,
//                 sharedImg: "",
//                 comments: 0,
//                 description: result.description,
//               });
//               dispatch(setLoading(false));
//             } catch (error) {
//               console.error(error.message);
//               throw new Error("Error adding article to database");
//             }
//           }
//         );
//       } else if (result.video) {
//         // await db.collection("articles").add({
//         //   actor: {
//         //     description: result.user.email,
//         //     title: result.user.displayName,
//         //     date: result.timestamp,
//         //     image: result.user.photoURL,
//         //   },
//         //   video: result.video,
//         //   sharedImg: "",
//         //   comments: 0,
//         //   description: result.description,
//         // });

//         await db["collection"]("articles").add({
//           actor: {
//             description: result.user.email,
//             title: result.user.displayName,
//             date: result.timestamp,
//             image: result.user.photoURL,
//           },
//           video: result.video,
//           sharedImg: "",
//           comments: 0,
//           description: result.description,
//         });
//         dispatch(setLoading(false));
//       }
//     } catch (error) {
//       console.error(error.message);
//     } finally {
//       // Code to run regardless of success or failure
//     }
//   };
// }

export const postArticleAPI = (result) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(setLoading(true));
    }, 2000);
    try {
      // If there's an image, upload it to Firebase Storage
      let imageURL = "";
      if (result.image) {
        const storageRef = ref(storage, `images/${result.image.name}`);
        await uploadBytes(storageRef, result.image);
        imageURL = await getDownloadURL(storageRef);
      }

      // Save post details to Firestore
      const docRef = await addDoc(collection(db, "articles"), {
        actor: {
          description: result.user.email,
          title: result.user.displayName,
          date: serverTimestamp(),
          image: result.user.photoURL,
        },
        video: result.video || "",
        sharedimg: imageURL || "",
        comments: 0,
        description: result.description || "",
      });

      setTimeout(() => {
        dispatch(setLoading(false));
      }, 2000);

      console.log("Post added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };
};

// export const getArticleAPI = () => {
//   return (dispatch) => {
//     let result;

//     db.collection("artciles")
//       .orderBy("actor.date", "desc")
//       .onSnapShot((snapshot) => {
//         result = snapshot.docs.map((doc) => doc.data());
//         console.log(result);
//         dispatch(getArticles(result));
//       });
//   };
// };

export const getArticleAPI = () => {
  return async (dispatch) => {
    try {
      const snapshot = await db
        .collection("articles")
        .orderBy("actor.date", "desc")
        .get();

      const result = snapshot.docs.map((doc) => doc.data());
      console.log(result);
      dispatch(getArticles(result));
    } catch (error) {
      console.error(error.message);
    } finally {
      // Code to run regardless of success or failure
    }
  };
};
