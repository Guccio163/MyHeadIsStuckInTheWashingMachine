import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import PageTitle, { mainColor1 } from "../PageTitle";
import UserInfoButton from "../UserInfoButton";
import CustomButton from "../CustomButton";

export default function UserInfoPage() {
  return (
    <>
      <PageTitle name="UserInfo" />
      <Image
        source={require("../../assets/blank-profile-picture-973460_1280.webp")}
        style={styles.blankUserImage}
        resizeMode="center"
      />

      <Text>UserInfoPage</Text>
      <CustomButton
        title="Settings"
        onPress={() => console.log("miał")}
        style={styles.button}
      />
      <CustomButton
        title="Settings"
        onPress={() => console.log("miał")}
        style={styles.button}
      />
      <CustomButton
        title="Settings"
        onPress={() => console.log("miał")}
        style={styles.button}
      />

      <View style={{ maxHeight: "100%" }}></View>
    </>
  );
}

const styles = StyleSheet.create({
  blankUserImage: {
    borderWidth: 1,
    margin: 6,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "transparent",
    alignSelf: "center",
  },
  button: {
    height: '6%',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor1,
    marginVertical: 10,
    borderRadius: 10,
  }
});
