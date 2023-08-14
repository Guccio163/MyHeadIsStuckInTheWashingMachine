import { View, Text, FlatList, StyleSheet, ListRenderItemInfo } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import ListElement from "./ListElement";

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
      <Text style={{ alignSelf: "center" }}>EmployeeList</Text>
      <FlatList
        pagingEnabled
        contentContainerStyle={styles.flatListChildren}
        style={styles.flatListContainer}
        data={data}
        renderItem={(item) => <ListElement name={item.item.name} index={item.index} ></ListElement>}
      ></FlatList>
    </>
  );
}

const styles = StyleSheet.create({
  employeeListContainer: {
    backgroundColor: "turquoise",
    width: 400,
    height: 400,
    justifyContent: "center",
  },
  flatListContainer: {
    alignSelf: "center",
    minHeight: 200,
    maxHeight: 100,
    width: 200,
    backgroundColor: "yellow",
  },
  flatListChildren: {
    alignItems: "center",
  },
  flatListChild: {
    borderWidth: 1,
    borderBlockColor: 'gray',
    margin: 2,
  }
});
