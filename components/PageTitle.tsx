import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

interface Props {
  name: string;
}

export const mainColor = "#D74848";

export default function PageTitle({ name }: Props) {
  return (
    <>
      <View style={{height:80, backgroundColor:'transparent'}}></View>
      <View style={styles.titleView}>
        <Text style={styles.EmployeeListTitle}>{name}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  EmployeeListTitle: {
    fontSize: 20,
    alignSelf: "center",
  },
  titleView: {
    height: 80,
    // width: Dimensions.get("window").width,
    width: "100%",
    backgroundColor: mainColor,
    paddingTop: 40,
    // marginBottom: 10,
    position: "absolute",
    top: 0,
    left: 0,
    // zIndex: 999
  },
});
