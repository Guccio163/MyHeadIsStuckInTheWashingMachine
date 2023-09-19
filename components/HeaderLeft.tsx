import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { variables as v } from "../assets/globalVariables";
import { useRouter } from "expo-router";

export default function HeaderLeft() {
  const navi = useRouter();
  return (
    <View style={styles.userImageWrapper}>
      <Pressable
        style={styles.userImagePressable}
        onPress={() => navi.push("settings")}
      >
        <Ionicons name="settings-sharp" size={24} color={v.mainBackgroud} />
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
