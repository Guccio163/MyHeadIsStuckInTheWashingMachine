import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { variables as v } from "../assets/globalVariables";
import { ModeContext } from "../contexts/ModeContextProvider";

interface Props{
    userImage: string
}

export default function HeaderRight({userImage}:Props) {
  const navi = useRouter();
      const { isDark, setDark } = useContext(ModeContext);

  return (
    <View style={styles.userImageWrapper}>
      <Pressable
        style={styles.userImagePressable}
        onPress={() => isDark ? navi.push("userDark") :
            navi.push("user")}
      >
        {userImage ? (
          <Image source={{ uri: userImage }} style={styles.image} />
        ) : (
          <FontAwesome name="user" size={30} color={"rgba(120,120,120,1)"} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  userImageWrapper: { height: 45, width: 45, paddingRight: 8 },
  userImagePressable: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 0.5,
    borderBlockColor: v.mainBackgroud,
    borderLeftColor: v.mainBackgroud,
    borderRightColor: v.mainBackgroud,
    backgroundColor: "rgba(180,180,180,1)",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "transparent",
    alignSelf: "center",
    overflow: "hidden",
  },
});
