import {
  View,
  Text,
  ListRenderItemInfo,
  ListRenderItem,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { CodeSandboxCircleFilled } from "@ant-design/icons";

interface Props {
  name: string;
  index: number;
}

export default function ListElement({ name, index }: Props) {
//   console.log(name);
  return (
    <View key={index} style={styles.flatListChild}>
      <Text>item index: {index} </Text>
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flatListChild: {
    borderWidth: 1,
    borderBlockColor: "gray",
    margin: 6,
    width: '95%',
    height: Dimensions.get('window').height * 0.15,
    backgroundColor: "white",
    alignSelf: 'center',
  },

});
