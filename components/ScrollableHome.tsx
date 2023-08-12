import { View, Text, ScrollView } from "react-native";
import React from "react";
import EmployeeList from "./EmployeeList";
import EmployeeSectionList from "./EmployeeSectionList";

interface Props {
  children: JSX.Element[];
}

export default function ScrollableHome({ children }: Props) {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1, width: "100%" }}
    >
      {children.map((child, index) => (
        <View key={index}>{child}</View>
      ))}
    </ScrollView>
  );
}
