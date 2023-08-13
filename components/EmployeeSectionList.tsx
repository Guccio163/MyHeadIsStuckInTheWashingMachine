import { View, Text, SectionList } from "react-native";
import React from "react";
import { Dimensions } from "react-native";



export default function EmployeeSectionList() {
  const data = [
    {
      section: "Chłopaki",
      data: ["antoni", "tomek", "krzysiek", "marcin", "piotrek"],
    },
    { section: "Dziewczyny", data: ["ania", "basia", "patrycja"] },
    {
      section: "Zwierzęta",
      data: ["czołg tygrys", "azor", "t-rex"],
    },
  ];

  return (
    <View
      style={{
        height: 200,
        width: 200,
        backgroundColor: "lightgreen",
        alignItems: 'center',
      }}
    >
      <Text>EmployeeSectionList</Text>
      <SectionList
        sections={data}
        renderItem={({ item, index }) => <Text key={index}>{item}</Text>}
        renderSectionHeader={({ section }) => (
          <Text style={{ fontStyle: "italic", fontSize: 20 }}>
            {section.section}
          </Text>
        )}
        keyExtractor={(item) => `basicListEntry-${item}`}
        style={{ width: '60%', backgroundColor: "magenta" }}
      ></SectionList>
    </View>
  );
}
