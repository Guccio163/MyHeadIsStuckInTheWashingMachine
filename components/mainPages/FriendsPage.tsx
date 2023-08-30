import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import PageTitle from "../PageTitle";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "../CustomButton";
import { getAllKeysAndSetState, getFromDB, getFromDBandSetState } from "../../functions/asyncStorage";

export default function FriendListPage() {
  const [tagCount, setCount] = useState("?");
  const [allTags, setAllTags] = useState("?");
  const [allKeys, setAllKeys] = useState<string[]>([]);


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
        <Text>{allTags}</Text>
        <CustomButton
          title="set all tags"
          style={propStyles.button}
          onPress={() => getFromDBandSetState("tags", setAllTags)}
        />
        {allKeys.map((element)=>(
          <Text>{element}</Text>
        ))}
        <CustomButton
          title="see all tags"
          style={propStyles.button}
          onPress={() => getAllKeysAndSetState(setAllKeys)}
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
