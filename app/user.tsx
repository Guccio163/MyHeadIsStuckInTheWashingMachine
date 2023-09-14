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

export default function UserInfoPage() {
  const [isLogged, setLogged] = useState(false);
  const [isChanging, setChanging] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isInputting, setInputting] = useState(false);

  const data = {
    setLogged: setLogged,
    setChanging: setChanging,
    setLoading: setLoading,
    styles: styles,
  };

  async function myFunction() {
    try {
      getUserInfoSetState(setUserName, setUserPassword, userName, userPassword);
    } catch {
    } finally {
      console.log("[UserInfoPage]: ", userName, userPassword);
      if (userName && userPassword) {
        setLogged(true);
      }
      // setLogged(true);

      console.log(
        "[UserInfoPage]: nie udało się pobrać danych",
        userName,
        userPassword
      );
    }
  }

  useEffect(() => {
    if (!isInputting) myFunction();
  }, [userName, userPassword]);

  return (
    <UserContext.Provider
      value={{
        setLogged: setLogged,
        setChanging: setChanging,
        isLoading: isLoading,
        setLoading: setLoading,
        userName: userName,
        setUserName: setUserName,
        // userEmail: userEmail,
        // setUserEmail:setUserEmail,
        userPassword: userPassword,
        setUserPassword: setUserPassword,
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
        <View style={styles.userImageWrapper}>
          <FontAwesome name="user" size={150} color={mainColor1} />
        </View>
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
  userName: "username",
  setUserName: (_arg0: string) => console.log("username"),
  // userEmail: "useremail",
  // setUserEmail: (arg0: string) => console.log("useremail"),
  userPassword: "userpassword",
  setUserPassword: (_arg0: string) => console.log("userpassword"),
  isInputting: false,
  setInputting: (_arg0: boolean) => console.log("inputting"),

  styles: styles,
});
