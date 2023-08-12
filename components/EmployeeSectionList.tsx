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
        height: "100%",
        width: Dimensions.get("window").width,
        backgroundColor: "lightgreen",
      }}
    >
      <Text>EmployeeSectionList</Text>
      <SectionList
        sections={data}
        renderItem={({ item }) => <Text>{item}</Text>}
        renderSectionHeader={({ section }) => (
          <Text style={{ fontStyle: "italic", fontSize: 20 }}>
            {section.section}
          </Text>
        )}
        keyExtractor={(item) => `basicListEntry-${item}`}
        style={{ maxHeight: 150, backgroundColor: "magenta", maxWidth: 150 }}
      ></SectionList>
    </View>
  );
}
