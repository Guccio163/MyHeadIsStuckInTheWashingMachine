import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../app/user";
import CustomButton from "../CustomButton";
import { variables } from "../../assets/globalVariables";
// import { generateCode } from "../../functions/login";
import { addUserInfoToDB, deleteItemFromDB } from "../../functions/asyncStorage";
import { usePathname } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { UserInfoContext } from "../../contexts/UserInfoContextProvider";
import { updateUserNameInFirebase } from "../../functions/firebaseFunctions";

export default function loginPanel() {
  const { setLogged, setChanging, isInputting, setInputting, styles } =
    useContext(UserContext);
  const {
    userID,
    setUserID,
    userName,
    setUserName,
    userPassword,
    setUserPassword,
    userEmail,
    setUserEmail,
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
          value={userName}
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
          value={userPassword}
        ></TextInput>
      </View> */}
      <View style={styles.userInfoContainer}>
        <View
          style={{
            width: "20%",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            left: 20,
          }}
        >
          <FontAwesome
            name="user"
            size={24}
            color={variables.mainColorDarkened}
          />
          <Text style={styles.userInfoText}> :</Text>
        </View>
        <TextInput
          value={userName}
          style={styles.userInfoText}
          placeholder="Username"
          onChangeText={(text) => {
            // console.log("CHUJCHUJCHUJCHUCJCHUJUCHUJCHUCJCHUJCHUJCHUJ");
            setInputting(true);
            // console.log(isInputting)
            setUserName(text);
          }}
        ></TextInput>
      </View>
      <View style={styles.userInfoContainer}>
        <View
          style={{
            width: "20%",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            left: 20,
          }}
        >
          <FontAwesome
            name="user"
            size={24}
            color={variables.mainColorDarkened}
          />
          <Text style={styles.userInfoText}> :</Text>
        </View>
        <TextInput
          style={styles.userInfoText}
          placeholder="Email"
          onChangeText={(text) => {
            setUserEmail(text);
            setInputting(true);
          }}
          value={userEmail}
        ></TextInput>
      </View>
      {/* <View style={styles.userInfoContainer}>
        <View
          style={{
            width: "20%",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            left: 20,
          }}
        >
          <MaterialIcons
            name="vpn-key"
            size={24}
            color={variables.mainColorDarkened}
            style={{ left: 0 }}
          />
          <Text style={styles.userInfoText}>:</Text>
        </View>
        <TextInput
          style={styles.userInfoText}
          placeholder="Password"
          onChangeText={(text) => {
            setUserPassword(text);
            setInputting(true);
          }}
          value={userPassword}
        />
      </View> */}

      <CustomButton
        title="SAVE"
        onPress={() => {
          try {
            // setBuffering(true);

            setUserName(userName);
            console.log("[Login button] username set:", userName);
            // setUserPassword(userPassword);
            // console.log("[Login button] userpassword set:", userPassword);
            addUserInfoToDB({
              userID: userID,
              username: userName,
              password: userPassword,
              email: userEmail,
            });
            updateUserNameInFirebase(userID, userName);
            setChanging(false);
            setInputting(false);
          } catch (e) {
            console.log(e);
          }

          // console.log(generateCode(5));
        }}
        style={styles.button}
      />

      <CustomButton
        title="Logout"
        onPress={() => {
          setLogged(false);
          setUserName("");
          setUserPassword("");
          deleteItemFromDB("userInfo");
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
