import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { variables } from "../assets/globalVariables";

export default function settings() {
  

  return (
    <View style={styles.wrapper}>
      <CustomButton
        title="change color scheme"
        onPress={() => console.log('color setting')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: "7%",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: variables.mainColor,
    marginVertical: 10,
    borderRadius: 10,
  },
});
