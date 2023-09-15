import { auth } from "../firebase/config";
import {
  doc,
  collection,
  setDoc,
  getCountFromServer,
  
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  
} from "firebase/auth";
import { API_KEY, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from "@env";


export function register(
  username: string,
  email: string,
  password: string
  //   imageUri: string
) {
  const auth2 = getAuth();
  createUserWithEmailAndPassword(auth2, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("[register function: ]", user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
}

export function signIn(email: string, password: string,setLocally: ()=>void ) {
  // const auth2 = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("[singIn function: ]", user);
      setLocally();
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      console.log(API_KEY, APP_ID, MEASUREMENT_ID, MESSAGING_SENDER_ID);

    });
}

// export function consoleLogUser(uid: string){
//   getAuth()
//     .getUserByEmail('wiktorgut@op.pl')3
//     .then((userRecord: { toJSON: () => any }) => {
//       // See the UserRecord reference doc for the contents of userRecord.
//       console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//     })
//     .catch((error: Error) => {
//       console.log("Error fetching user data:", error);
//     });
// }
