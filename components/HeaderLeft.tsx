import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { variables as v } from "../assets/globalVariables";
import { useRouter } from "expo-router";
import { ModeContext } from "../contexts/ModeContextProvider";

export default function HeaderLeft() {
  const navi = useRouter();
    const { isDark, setDark } = useContext(ModeContext);

  return (
    <View style={styles.userImageWrapper}>
      <Pressable
        style={styles.userImagePressable}
        onPress={() => isDark ? navi.push("settingsDark") : navi.push("settings")}
      >
        <Ionicons name="settings-sharp" size={24} color={isDark ? v.mainColor : v.mainBackgroud} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  userImageWrapper: {
    height: 45,
    width: 45,
    paddingLeft: 8,
  },
  userImagePressable: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    overflow: "hidden",
  },
});
