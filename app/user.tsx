import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import PageTitle, { mainColor1 } from "../components/PageTitle";
import CustomButton from "../components/CustomButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function UserInfoPage() {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', height: '100%', display: 'none'}}>
      <View style={styles.userImageWrapper}>
        <FontAwesome name="user" size={150} color={mainColor1} />
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  userImageWrapper: {
    width: 200,
    height: 200,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    margin: 20
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
});
