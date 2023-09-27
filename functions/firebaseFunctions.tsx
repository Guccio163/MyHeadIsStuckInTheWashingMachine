import { auth, firestore, storage } from "../firebase/config";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Tag } from "../components/addTagPanel/AddTagForm";
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  updateMetadata,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
// import RNFS from "react-native-fs";
import * as FileSystem from "expo-file-system";
import { friend } from "../app/(home)/friends";
// import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

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
      // console.log(userCredential.user.)
      console.log("UŻYTKOWNIK ZOSTAŁ ZALOGOWANY, ID:", userCredential.user.uid);
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
  // const recordName = tag.name ? tag.name : tag.category;
  await setDoc(doc(ref, `${tag.id}.`), tag);
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

export async function updateUserImageInFirebase(
  userID: string,
  imageUrl: string
) {
  const ref = doc(firestore, "userInfo", userID);
  await updateDoc(ref, {
    imageUrl: imageUrl,
  });
}

export async function updateUserNameInFirebase(
  userID: string,
  username: string
) {
  const ref = doc(firestore, "userInfo", userID);
  await updateDoc(ref, {
    username: username,
  });
}

export async function addFriendInFirebase(
  receiveUserID: string,
  userID: string,
  username: string,
  email: string
) {
  let usernameToUse = username;
  if(username == undefined){
     usernameToUse = "";
  }
  const newFriend = { userID: userID ,username: usernameToUse, email: email };
  console.log("ADDFRIENDINFIREBASE:", newFriend, userID)
  const ref = doc(firestore, "userInfo", receiveUserID);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    const friends = docSnap.data().friends;
    if (friends != null && friends != undefined) {
      friends.push(newFriend);
      await updateDoc(ref, {
        friends: friends,
      })
    } else {
      await updateDoc(ref, {
        friends: [newFriend],
      });
      // console.log("FRIENDS:",friends)
    }

    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}



export async function addRequestInFirebase(
  receiveUserID: string,
  userID: string,
  username: string,
  email: string
) {
  let usernameToUse = username;
  if (username == undefined) {
    usernameToUse = "";
  }
  const newRequest = { userID: userID, username: usernameToUse, email: email };
  const ref = doc(firestore, "userInfo", receiveUserID);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    const requests = docSnap.data().requests;
    if (requests) {
      requests.push(newRequest);
      await updateDoc(ref, {
        requests: requests,
      });
    } else {
      await updateDoc(ref, {
        requests: [newRequest],
      });
    }

    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function deleteRequestInFirebase(
  userDetetingID: string,
  userBeingDeletedID: string,
) {
  const ref = doc(firestore, "userInfo", userDetetingID);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    const requests = docSnap.data().requests;
    if (requests) {
      const newRequests = requests.filter((req:friend) => req.userID !== userBeingDeletedID);
      await updateDoc(ref, {
        requests: newRequests,
      });
    }

    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function updateTagInFirebase(userID: string, tag: Tag) {
  const ref = doc(firestore, "tags", userID, "userTags", `${tag.id}.`);
  await updateDoc(ref, tag);
}

// const requestStoragePermission = async () => {
//   try {
//     const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
//     if (result === RESULTS.GRANTED) {
//       // Użytkownik udzielił uprawnień - można odczytywać pliki
//       // Tutaj możesz umieścić kod do odczytywania plików
//     } else {
//       // Użytkownik nie udzielił uprawnień - można wyświetlić komunikat lub podjąć inne działania
//     }
//   } catch (error) {
//     console.error("Wystąpił błąd podczas prośby o uprawnienia:", error);
//   }
// };

export async function updateProfileImageInStorage(
  localPath: string,
  userId: string
) {
  // await requestStoragePermission();
  const storageRef = ref(storage, `profileImages/${userId}`);
  const response = await fetch(localPath);
  const blob = await response.blob();
  // const newFile = new File([blob], `dupa.jpeg`, {
  //   type: "image/jpeg",
  // });

  console.log("DUPA");
  console.log(localPath);
  console.log("USER ID:", userId);
  // console.log(blob);

  //  uploadBytesResumable(storageRef, blob)
  //    .then((snapshot) => {
  //      console.log("Plik został pomyślnie zapisany!", snapshot);
  //    })
  //    .catch((error: Error) => {
  //      console.error("Wystąpił błąd podczas zapisu pliku:", error);
  //    });

  getMetadata(storageRef)
    .then((metadata) => {
      // Plik istnieje, zaktualizuj jego metadane
      updateMetadata(storageRef, {
        cacheControl: "no-store, max-age=0", // Ustaw cacheControl na krótki czas
      })
        .then(() => {
          console.log(
            "Metadane zaktualizowane. Plik zostanie nadpisany przy kolejnym pobraniu."
          );

          // Teraz przekaż nowy blob pliku
          uploadBytesResumable(storageRef, blob)
            .then((snapshot) => {
              console.log("Plik został pomyślnie zapisany!", snapshot);
            })
            .catch((error: Error) => {
              console.error("Wystąpił błąd podczas zapisu pliku:", error);
            });
          console.log("uploaded (fake)");
        })
        .catch((error: Error) => {
          console.error(
            "Wystąpił błąd podczas aktualizowania metadanych:",
            error
          );
        });
    })
    .catch((error: Error) => {
      // Plik nie istnieje, zapisz nowy
      uploadBytesResumable(storageRef, blob)
        .then((snapshot) => {
          console.log("Plik został pomyślnie zapisany!", snapshot);
        })
        .catch((error: Error) => {
          console.error("Wystąpił błąd podczas zapisu pliku:", error);
        });

      console.log(error);
    });
}

export async function getImageUrlFromFirebaseSetState(
  userID: string,
  setState: (arg0: string) => void
) {
  const storageRef = ref(storage, `profileImages/${userID}`);
  let imageUrl = "";
  await getDownloadURL(storageRef)
    .then((url) => {
      // Uzyskano pomyślnie URL pliku
      console.log("URL pliku:", url);
      imageUrl = url;
    })
    .catch((error) => {
      // Wystąpił błąd podczas pobierania URL pliku
      console.error("Błąd podczas pobierania URL pliku:", error);
    })
    .finally(() => {
      console.log("URL pliku (finally):", imageUrl);
      setState(imageUrl);
    });
}

export async function getSearchedUsersFromFirebaseSetState( setState: (arg0:friend[])=>void, phrase: string) {
  const usersRef = collection(firestore, `userInfo`);
  const q = query(usersRef, where("username", "==", phrase));
  const querySnapshot = await getDocs(q);
  let userArray:friend[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const userId = doc.id;
    const userEmail = doc.data().email;
    const userName = doc.data().username;
    userArray.push({ userID: userId, email: userEmail, username:userName });
    console.log(userArray)
  });
  setState(userArray)
  return userArray;
}

export async function getFriendsFromFirebaseSetState(
  setState: (arg0: friend[]) => void,
  userID: string
) {
  const usersRef = doc(firestore, `userInfo`, userID);
  const docSnap = await getDoc(usersRef);
  let friendsArray: friend[] = [];
  if (docSnap.exists()) {
    friendsArray = docSnap.data().friends;
    console.log(friendsArray);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  setState(friendsArray);
  return friendsArray;
}

export async function getRequestsFromFirebaseSetState(
  setState: (arg0: friend[]) => void,
  userID: string
) {
  const usersRef = doc(firestore, `userInfo`, userID);
  const docSnap = await getDoc(usersRef);
  let friendsArray: friend[] = [];
  if (docSnap.exists()) {
    friendsArray = docSnap.data().requests;
    console.log(friendsArray);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  setState(friendsArray);
  return friendsArray;
}

export async function getUserUsernameSetStateFromFirebase(
  userID: string,
  setState: (arg0: string)=>void
) {
  const ref = doc(firestore, "userInfo", userID);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    const username = docSnap.data().username;
    setState(username)
    console.log("Document data:", docSnap.data());
    return username
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    setState("")
    return ""
  }
}

// POJAWIAJĄCY SIĘ PROBLEM: There was a problem sending log messages to your development environment [PrettyFormatPluginError: value.hasOwnProperty is not a function (it is undefined)]
