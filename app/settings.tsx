import { View, Text, StyleSheet, Switch } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { variables as v } from "../assets/globalVariables";
import { ModeContext } from "../contexts/ModeContextProvider";
import { addSystemModeToDB } from "../functions/asyncStorage";
import { useRouter } from "expo-router";

export default function settings() {
  const { isDark, setDark } = useContext(ModeContext);
    const navi = useRouter();

  const changeMode = async () => {
    setDark((previousState) => !previousState);
    console.log("zmieniłeś mode")
    navi.back();
  };

  useEffect(() => {
    console.log(isDark ? "DARK" : "LIGHT");
    addSystemModeToDB(isDark);
  }, [isDark]);

  return (
    <View style={styles.wrapper}>
      <Text>change color scheme</Text>
      {/* <CustomButton
        title="change color scheme"
        onPress={() => {
          console.log("color setting");
          setDark(true);
        }}
        style={styles.button}
      /> */}
      <Switch
        onValueChange={changeMode}
        value={isDark}
        trackColor={{ false: v.halfTransparent, true: v.mainColorDarkened }}
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
    backgroundColor: v.mainColor,
    marginVertical: 10,
    borderRadius: 10,
  },
});
