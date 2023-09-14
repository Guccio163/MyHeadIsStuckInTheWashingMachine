import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import CustomButton from "../CustomButton";
import { variables } from "../../assets/globalVariables";
import { UserContext } from "../../app/user";
import {
  getUserInfo,
  getUserInfoSetState,
  removeItem,
} from "../../functions/asyncStorage";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function LoggedPanel() {
  const {
    setLogged,
    setChanging,
    styles,
    userName,
    setUserName,
    userPassword,
    setUserPassword,
  } = useContext(UserContext);

  

  return (
    <>
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
        <Text style={styles.userInfoText}>{userName}</Text>
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
          <MaterialIcons
            name="vpn-key"
            size={24}
            color={variables.mainColorDarkened}
            style={{ left: 0 }}
          />
          <Text style={styles.userInfoText}>:</Text>
        </View>
        <Text style={styles.userInfoText}>{userPassword}</Text>
      </View>

      <CustomButton
        title="change user information"
        onPress={() => {
          setChanging(true);
        }}
        style={styles.button}
      />

      <CustomButton
        title="Logout"
        onPress={() => {
          setLogged(false);
          setUserName("");
          setUserPassword("");
          removeItem("userInfo");
        }}
        style={styles.button}
      />
    </>
  );
}

// const styles = StyleSheet.create({
//   userImageWrapper: {
//     width: 200,
//     height: 200,
//     borderWidth: 1,
//     alignSelf: "center",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 100,
//     overflow: "hidden",
//     margin: 20,
//   },
//   blankUserImage: {
//     // borderWidth: 1,
//     // margin: 6,
//     width: 100,
//     height: 100,
//     borderRadius: 100,
//     backgroundColor: "transparent",
//     alignSelf: "center",
//     transform: [{ scaleX: 1 }, { scaleY: 1 }, { translateY: 2 }],
//     overflow: "hidden",
//   },
//   button: {
//     height: "7%",
//     width: "70%",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: variables.mainColor,
//     marginVertical: 10,
//     borderRadius: 10,
//   },
//   userInfoContainer: {
//     height: 40,
//     backgroundColor: variables.mainColorHalfTransparent,
//     width: "70%",
//     marginVertical: 5,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   userInfoText: {
//     color: variables.mainColorDarkened,
//     fontWeight: "bold",
//   },
// });
