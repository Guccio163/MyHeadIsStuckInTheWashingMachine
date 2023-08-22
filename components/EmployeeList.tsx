import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import ListElement from "./ListElement";
import PageTitle from "./PageTitle";

type listItem = {
  index: number;
  item: string;
};

export default function EmployeeList() {
  const data = [
    { index: 0, name: "ania" },
    { index: 1, name: "antoni" },
    { index: 2, name: "tomek" },
    { index: 3, name: "basia" },
    { index: 4, name: "krzysiek" },
    { index: 5, name: "patrycja" },
    { index: 6, name: "marcin" },
    { index: 7, name: "piotrek" },
    { index: 8, name: "stasiek" },
    { index: 9, name: "weronika" },
    { index: 10, name: "zuzia" },
    { index: 11, name: "mikołaj" },
  ];

  return (
    <>
      <PageTitle name="Employee List"/>
      <FlatList
        style={styles.flatListContainer}
        data={data}
        renderItem={(item) => (
          <ListElement name={item.item.name} index={item.index}></ListElement>
        )}
      ></FlatList>
    </>
  );
}

const styles = StyleSheet.create({
  EmployeeListTitle: {
    fontSize: 20,
    alignSelf: "center",
  },
  // titleView: {
  //   height: 80,
  //   width: "100%",
  //   backgroundColor: "#D74848",
  //   paddingTop: 40,
  //   marginBottom: 10,
  //   position: "absolute",
  //   top: 0,
  // },
  employeeListContainer: {
    backgroundColor: "turquoise",
    width: "90%",
    height: 400,
    justifyContent: "center",
  },
  flatListContainer: {
    alignSelf: "center",
    minHeight: 200,
    maxHeight: "90%",
    width: "90%",
    backgroundColor: "transparent",
  },
});
