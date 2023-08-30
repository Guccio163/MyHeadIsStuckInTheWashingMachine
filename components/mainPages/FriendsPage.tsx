import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import PageTitle from "../PageTitle";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "../CustomButton";
import { getFromDB, getFromDBandSetState } from "../../functions/asyncStorage";

export default function FriendListPage() {
  const [tagCount, setCount] = useState("?");
  const [firstTag, setFirstTag] = useState("?");

  return (
    <View style={styles.pageWrapper}>
      <PageTitle name="Friends List" />
      <View style={styles.friendList}>
        <Icon name="lock" size={60} color="black" />
        <Text style={styles.altText}>Soon !</Text>
        <Text>current tag count: {tagCount}</Text>
        <CustomButton
          title="see tagCount"
          style={propStyles.button}
          onPress={() => getFromDBandSetState("tagCount", setCount)}
        />
        <Text>{firstTag}</Text>
        <CustomButton
          title="set first tag"
          style={propStyles.button}
          onPress={() => getFromDBandSetState("0", setFirstTag)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  friendList: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  altText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

const propStyles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderBlockColor: "black",
    borderWidth: 1,
    height: 30,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 3,
  },
});
