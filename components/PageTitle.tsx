import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

interface Props {
  name: string;
}

export const mainColor1 = "#78C3FB";

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
    width: "100%",
    backgroundColor: mainColor1,
    paddingTop: 40,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
