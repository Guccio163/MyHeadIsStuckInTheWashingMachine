import { View, Text, FlatList, StyleSheet } from "react-native";
import React from 'react'
import { Dimensions } from "react-native";



export default function EmployeeList() {
const data = ['ania', 'antoni', 'tomek', 'basia', 'krzysiek', 'patrycja', 'marcin', 'piotrek'];

  return (
    <View
      style={styles.employeeListContainer}
    >
      <Text style={{ alignSelf: "center" }}>EmployeeList</Text>
      <FlatList
        pagingEnabled
        contentContainerStyle={styles.flatListChildren}
        style={styles.flatlistCont}
        data={data}
        renderItem={(item) => <Text key={item.index}>{item.item}</Text>}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  employeeListContainer: {
    backgroundColor: "turquoise",
    width: 200,
    height: 200,
    justifyContent: 'center',
  },
  flatlistCont: {
    alignSelf: "center",
    minHeight: 50,
    maxHeight: 100,
    width: 100,
    backgroundColor: "yellow",
  },
  flatListChildren: {
    alignItems: "center",
  },
});