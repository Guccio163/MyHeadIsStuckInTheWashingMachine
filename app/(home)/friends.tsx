import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "../../components/CustomButton";
import {
  getAllKeysSetState,
  getItemSetState,
  getTagsSetState,
} from "../../functions/asyncStorage";
import { FlatList } from "react-native-gesture-handler";
import { Tag } from "../../components/addTagPanel/AddTagForm";
import IconsPanel from "../../components/addTagPanel/formComponents/IconsPanel";

export default function FriendsPage() {
  // MAINTENANCE
  const [tagCount, setCount] = useState("?");
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [allKeys, setAllKeys] = useState<string[]>([]);

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.friendList}>
        <Icon name="lock" size={60} color="black" />
        <Text style={styles.altText}>Soon !</Text>

        {/* COMPONENTS FOR MAINTENANCE REASONS: */}
        <Text>current tag count: {tagCount}</Text>
        <CustomButton
          title="see tagCount"
          style={propStyles.button}
          onPress={() => getItemSetState("tagCount", setCount)}
        />
        {allTags ? (
          <FlatList
            data={allTags}
            nestedScrollEnabled
            horizontal
            style={{ maxHeight: 20 }}
            renderItem={({ item, index }) => (
              <Text key={index}>
                {item.id}
                {"  "}
              </Text>
            )}
          />
        ) : (
          <Text>?</Text>
        )}
        <CustomButton
          title="see all tags"
          style={propStyles.button}
          onPress={() => getTagsSetState(setAllTags)}
        />
        {allKeys.map((element, index) => (
          <Text key={index}>{element}</Text>
        ))}
        <CustomButton
          title="see all keys"
          style={propStyles.button}
          onPress={() => getAllKeysSetState(setAllKeys)}
        />
        {/* <IconsPanel/> */}
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
