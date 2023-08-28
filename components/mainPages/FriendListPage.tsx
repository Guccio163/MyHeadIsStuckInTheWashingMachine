import { View, StyleSheet, Text } from "react-native";
import React from "react";
import PageTitle from "../PageTitle";
import Icon from "react-native-vector-icons/FontAwesome";
import FormSample from "../addTagPanel/FormSample";

export default function FriendListPage() {
  return (
    <View style={styles.pageWrapper}>
      <PageTitle name="Friends List" />
      <View style={styles.friendList}>
        <Icon name="lock" size={60} color="black" />
        <Text style={styles.altText}>Soon !</Text>
      </View>
      {/* <FormSample/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    height: "100%",
    width: "100%",
    alignItems: "center",
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
