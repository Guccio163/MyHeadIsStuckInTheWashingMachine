import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import PageTitle, { mainColor1 } from "../components/PageTitle";
import CustomButton from "../components/CustomButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { variables } from "../assets/globalVariables";
import { TextInput } from "react-native-gesture-handler";
import LoggedPanel from "../components/userPanels/LoggedPanel";
import LoginPanel from "../components/userPanels/LoginPanel";
import EditPanel from "../components/userPanels/EditPanel";
import RegisterPanel from "../components/userPanels/RegisterPanel";
import { getUserInfo, getUserInfoSetState } from "../functions/asyncStorage";
import UserInfoContextProvider, {
  UserInfoContext,
} from "../contexts/UserInfoContextProvider";
import ProfilePicInput from "../components/ProfilePicInput";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export default function UserInfoPage() {
  const [isLogged, setLogged] = useState(false);
  const [isChanging, setChanging] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isVerified, setVerified] = useState(false);
  // const [userName, setUserName] = useState("");
  // const [userPassword, setUserPassword] = useState("");
  const [isInputting, setInputting] = useState(false);
  const [user, setUser] = useState(auth.currentUser)

  const {
    userID,
    setUserID,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    userImage,
    setUserImage,
  } = useContext(UserInfoContext);

  const data = {
    setLogged: setLogged,
    setChanging: setChanging,
    setLoading: setLoading,
    styles: styles,
  };

  // useEffect(() => {
  //   if (user !== null) {
  //     // The user object has basic properties such as display name, email, etc.
  //     setUserName(user.displayName);
  //     setUserEmail(user.email);
  //     setUserImage(user.photoURL);
  //     setVerified(user.emailVerified);

  //     // The user's ID, unique to the Firebase project. Do NOT use
  //     // this value to authenticate with your backend server, if
  //     // you have one. Use User.getToken() instead.
  //     const uid = user.uid;
  //   }
  // }, [user]);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });

  async function myFunction() {
    try {
      getUserInfoSetState(setUserID, setUserName, setUserEmail, setUserPassword, setUserImage);
    } catch {
    } finally {
      console.log("[UserInfoPage]: ", userName, userEmail, userPassword);
      if (userEmail && userPassword) {
        setLogged(true);
        console.log('LOGGED IN')
      }
      // setLogged(true);

      console.log(
        "[UserInfoPage]: nie udało się pobrać danych",
        userName,
        userEmail,
        userPassword
      );
    }
  }

  useEffect(() => {
    if (!isInputting) myFunction();
    console.log("ACTUALISING...");
  }, [userID, userName, userPassword, userImage]);

  return (
    <UserContext.Provider
      value={{
        setLogged: setLogged,
        setChanging: setChanging,
        isLoading: isLoading,
        setLoading: setLoading,
        isInputting: isInputting,
        setInputting: setInputting,
        styles: styles,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {/* <View style={styles.userImageWrapper}>
          <FontAwesome name="user" size={150} color={mainColor1} />
        </View> */}
        <ProfilePicInput image={userImage} setImage={setUserImage} />
        {isLogged ? (
          <>{isChanging ? <EditPanel /> : <LoggedPanel />}</>
        ) : (
          <>{isChanging ? <RegisterPanel /> : <LoginPanel />}</>
        )}

        <View style={{ maxHeight: "100%" }}></View>
      </View>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  userImageWrapper: {
    width: 200,
    height: 200,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    overflow: "hidden",
    margin: 20,
  },
  blankUserImage: {
    // borderWidth: 1,
    // margin: 6,
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "transparent",
    alignSelf: "center",
    transform: [{ scaleX: 1 }, { scaleY: 1 }, { translateY: 2 }],
    overflow: "hidden",
  },
  button: {
    height: "7%",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: mainColor1,
    marginVertical: 10,
    borderRadius: 10,
  },
  userInfoContainer: {
    height: 40,
    backgroundColor: variables.mainColorHalfTransparent,
    width: "70%",
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
  },
  userInfoText: {
    color: variables.mainColorDarkened,
    fontWeight: "bold",
    textAlign: "center",
    // backgroundColor: 'yellow',
  },
  disabledButton: {
    backgroundColor: "grey",
  },
});

export const UserContext = createContext({
  setLogged: (_arg0: boolean) => console.log("log"),
  setChanging: (_arg0: boolean) => console.log("edit"),
  isLoading: false,
  setLoading: (_arg0: boolean) => console.log("load"),
  // userName: "username",
  // setUserName: (_arg0: string) => console.log("username"),
  // userEmail: "useremail",
  // setUserEmail: (arg0: string) => console.log("useremail"),
  // userPassword: "userpassword",
  // setUserPassword: (_arg0: string) => console.log("userpassword"),
  isInputting: false,
  setInputting: (_arg0: boolean) => console.log("inputting"),
  styles: styles,
});
