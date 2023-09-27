import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../app/user";
import CustomButton from "../CustomButton";
import { variables } from "../../assets/globalVariables";
// import { generateCode } from "../../functions/login";
import { addUserInfoToDB } from "../../functions/asyncStorage";
import { usePathname } from "expo-router";
import { UserInfoContext } from "../../contexts/UserInfoContextProvider";
import { getUserUsernameSetStateFromFirebase, loginToFirebase } from "../../functions/firebaseFunctions";

export default function loginPanel() {
  const { setLogged, setChanging, isInputting, setInputting, styles } =
    useContext(UserContext);
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
  const [isBuffering, setBuffering] = useState(false);

  // useEffect(() => {
  //   if (!isBuffering && userName && userPassword) {
  //     setLogged(true);
  //   }
  //   console.log(!isBuffering, userName, userPassword);
  // }, [isBuffering]);

  return (
    <>
      {/* <View style={styles.userInfoContainer}>
        <TextInput
          style={styles.userInfoText}
          placeholder="Username"
          onChangeText={(text) => {
            setUserName(text);
            setInputting(true);
          }}
        ></TextInput>
      </View> */}
      <View style={styles.userInfoContainer}>
        <TextInput
          style={styles.userInfoText}
          placeholder="Email"
          onChangeText={(text) => {
            setUserEmail(text);
            setInputting(true);
          }}
        ></TextInput>
      </View>
      <View style={styles.userInfoContainer}>
        <TextInput
          style={styles.userInfoText}
          placeholder="Password"
          onChangeText={(text) => {
            setUserPassword(text);
            setInputting(true);
          }}
        ></TextInput>
      </View>

      <CustomButton
        title="Login"
        onPress={() => {
          try {
            // setBuffering(true);

            // setUserName(userName);
            // console.log("[Login button] username set:", userName);
            // setUserPassword(userPassword);
            // console.log("[Login button] userpassword set:", userPassword);
            loginToFirebase(userEmail, userPassword, async (userIDreceived: string) => {
              const nameReceived = await getUserUsernameSetStateFromFirebase(userIDreceived, setUserName);
              addUserInfoToDB({
                userID: userIDreceived,
                username: nameReceived,
                password: userPassword,
                email: userEmail,
              });
              console.log("ID received:",userIDreceived)
              setUserID(userIDreceived)
              setLogged(true);
            });
            // addUserInfo({
            //   username: userName,
            //   password: userPassword,
            // });
            // setLogged(true);
          } catch (e) {
            console.log(e);
          }

          // console.log(generateCode(5));
        }}
        style={styles.button}
      />
      <View style={privateStyles.verticalLine}></View>
      <Text>Don't have an account yet?</Text>

      <CustomButton
        title="Register"
        onPress={() => {
          // console.log("miał😼");
          setChanging(true);
        }}
        style={styles.button}
      />
    </>
  );
}

const privateStyles = StyleSheet.create({
  verticalLine: {
    borderTopWidth: 1,
    borderTopColor: variables.mainColorDarkened,
    width: "80%",
    height: 0.5,
    marginVertical: 10,
  },
});
