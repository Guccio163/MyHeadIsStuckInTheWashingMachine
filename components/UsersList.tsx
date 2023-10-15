import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import { friend } from "../app/(home)/friends";
import FriendElement from "./listElements/FriendElement";
import { variables as v } from "../assets/globalVariables";
import { ModeContext } from "../contexts/ModeContextProvider";
import { useRouter } from "expo-router";

interface Props {
  type: string;
  friendsList: friend[];
}

export default function UsersList({ type, friendsList }: Props) {
  const { isDark } = useContext(ModeContext);

  let textColor = { color: isDark ? v.mainColorHeavyDarkened : "black" };
  const navi = useRouter();

  return (
    <Pressable style={{ width: "90%", alignSelf: "center" }}>
      <View style={styles.header}>
        {type == "friends" ? (
          <Text style={[styles.altText, textColor]}>Friends</Text>
        ) : type == "requests" ? (
          <Text style={[styles.altText, textColor]}>Requests</Text>
        ) : null}
      </View>
      <FlatList
        data={friendsList}
        nestedScrollEnabled
        renderItem={({ item, index }) => (
          <FriendElement
          id={item.userID}
            name={item.username}
            email={item.email}
            type={type}
            key={index}
          />
        )}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  altText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: v.mainColor,
    flexDirection: "row",
    borderRadius: 8,
    paddingLeft: 4,
  },
});
