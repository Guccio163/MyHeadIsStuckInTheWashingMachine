import { auth, firestore } from "../firebase/config";
import { doc, collection, setDoc, updateDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Tag } from "../components/addTagPanel/AddTagForm";


// REGISTER AND LOGIN

export function registerToFirebase(
  username: string,
  email: string,
  password: string
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      addUserInfoToFirebase(userCredential.user.uid, username, email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}


export function loginToFirebase(
  email: string,
  password: string,
  setLocally: (userIDreceived: string) => void
) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setLocally(`${userCredential.user.uid}`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}


// ADD RECORDS

export async function addTagToFirebase(tag: Tag, userID: string) {
  const ref = collection(firestore, "tags", userID, "userTags");
  const recordName = tag.name ? tag.name : tag.category
  await setDoc(doc(ref, `${tag.id}. ${recordName}`), {
    id: tag.id,
    name: tag.name,
    imageUri: tag.imageUri,
    brand: tag.brand,
    colour: tag.colour,
    category: tag.category,
    icons: tag.icons,
    materials: tag.materials,
    notes: tag.notes,
  });
}


export async function addUserInfoToFirebase(
  userID: string,
  username: string,
  email: string
) {
  const ref = doc(firestore, "userInfo", userID);
  await setDoc(ref, {
    username: username,
    email: email,
  });
}


// UPDATE RECORDS


export async function updateUserImageInFirebase(userID: string, imageUrl: string) {
  const ref = doc(firestore, "userInfo", userID);
  await updateDoc(ref, {
    imageUrl: imageUrl,
  });
}


export async function updateUserNameInFirebase(userID: string, username: string) {
  const ref = doc(firestore, "userInfo", userID);
  await updateDoc(ref, {
    username: username,
  });
}
