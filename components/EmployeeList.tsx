import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Dimensions } from "react-native";



export default function EmployeeList() {
const data = ['ania', 'antoni', 'tomek', 'basia', 'krzysiek', 'patrycja', 'marcin', 'piotrek'];

  return (
    <View
      style={{
        height: "100%",
        width: Dimensions.get("window").width,
        backgroundColor: "turquoise",
      }}
    >
      <Text>EmployeeList</Text>
      <FlatList
        pagingEnabled
        style={{
          minHeight: 50,
          maxHeight: 60,
          width: 100,
          backgroundColor: "yellow",
        }}
        data={data}
        renderItem={(item) => <Text key={item.index}>{item.item}</Text>}
      ></FlatList>
    </View>
  );
}