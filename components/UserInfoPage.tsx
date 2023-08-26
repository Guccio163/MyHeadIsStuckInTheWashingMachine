import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import PageTitle from "./PageTitle";
import UserInfoButton from "./UserInfoButton";

export default function UserInfoPage() {
  return (
    <>
      <PageTitle name="UserInfo" />
      <Image
        // source={require("../assets/blank-profile-picture-973460_1280.webp")}
        source={require("../assets/blank-profile-picture-973460_1280.webp")}
        style={styles.blankUserImage}
        resizeMode="center"
      />

      <Text>UserInfoPage</Text>
      <UserInfoButton name="Settings" />
      <UserInfoButton name="Settings" />
      <UserInfoButton name="Settings" />

      {/* <Cat name="kitty" /> */}
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
    // height: Dimensions.get('window').height * 0.15,
    backgroundColor: "transparent",
    alignSelf: "center",
    // transform: [{ scaleX: 4 }, { scaleY: 4 }, {translateX: 2.5}]
  },
});
