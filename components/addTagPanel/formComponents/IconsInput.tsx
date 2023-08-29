import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import PageTitle from "../../PageTitle";
import tagItem from "../../../functions/tagItem";

const data = [
  {
    index: 0,
    section: "Wash",
    sectionHeaderImage: "wash_30",
    data: [
      [
        "wash_machine",
        "wash_machine_press",
        "wash_machine_delicate",
        "wash_hand",
        "wash_not",
      ],
      ["wash_30", "wash_40", "wash_50", "wash_60", "wash_70", "wash_95"],
      ["wash_30*", "wash_40*", "wash_50*", "wash_60*", "wash_70*", "wash_95*"],
    ],
  },
  {
    index: 1,
    section: "Iron",
    sectionHeaderImage: "iron_medium",
    data: [
      [
        "iron",
        "iron_not",
        "iron_non_steam",
        "iron_low",
        "iron_medium",
        "iron_high",
      ],
    ],
  },
  {
    index: 2,
    section: "Dry",
    sectionHeaderImage: "dry_machine",
    data: [
      ["dry", "dry_not", "dry_hang", "dry_drip", "dry_flat", "dry_shade"],
      [
        "dry_machine",
        "dry_machine_not",
        "dry_machine_low",
        "dry_machine_medium",
      ],
      [
        "dry_machine_high",
        "dry_machine_non_heat",
        "dry_machine_press",
        "dry_machine_delicate",
      ],
    ],
  },
  {
    index: 3,
    section: "Clean",
    sectionHeaderImage: "clean_dry_not",
    data: [
      ["clean_dry", "clean_dry_not", "clean_wet_not"],
      ["clean_wet", "clean_any", "clean_petroleum", "clean_any_not_p"],
    ],
  },
  {
    index: 4,
    section: "Bleach",
    sectionHeaderImage: "bleach",
    data: [
      [
        "bleach",
        "bleach_not",
        "bleach_not_2",
        "bleach_non_cl",
        "bleach_non_cl_2",
      ],
    ],
  },
  {
    index: 5,
    section: "Others",
    sectionHeaderImage: "",
    data: [
      ["heat_low", "reduced_moisture", "short_cycle", "steam_not", "wring_not"],
    ],
  },
];

interface Props {
  onIconPress: (arg0: string) => void;
  icons: string[]
}

export default function IconsInput({ onIconPress, icons }: Props) {
  let sectionsArray = Array.from({ length: data.length }, () => false);
  const [isExpanded, setExpanded] = useState(sectionsArray);

  function handleClick(index: number) {
    let newArray = isExpanded;

    if (isExpanded[index]) {
      newArray[index] = false;
    } else {
      newArray[index] = true;
    }
    setExpanded([...newArray]);
  }

  return (
    <View style={{ width: "100%" }}>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={data}
        extraData={isExpanded}
        style={styles.sectionList}
        keyExtractor={(data, index) => data[0] + index}
        renderItem={({ section: { index }, item }) => {
          if (!isExpanded[index]) return null;

          return (
            <View style={{ flexDirection: "row" }}>
              {item.map((element, index) => {
                return (
                  <Pressable
                    style={[
                      styles.sectionItem,
                      {
                        backgroundColor: icons.includes(element)
                          ? "yellow"
                          : "rgba(255, 255, 255, 0.4)",
                      },
                    ]}
                    onPress={() => {
                      onIconPress(element);
                    }}
                  >
                    <Image
                      source={tagItem(element)?.image}
                      style={styles.sectionItemImage}
                      resizeMode="center"
                    />
                  </Pressable>
                );
              })}
            </View>
          );
        }}
        renderSectionHeader={({
          section: { index, section, sectionHeaderImage },
        }) => (
          <Pressable
            onPress={() => handleClick(index)}
            style={[
              styles.sectionHeader,
              {
                borderBottomColor: isExpanded[index] ? "#00000001" : "black",
              },
            ]}
          >
            <Image
              source={tagItem(sectionHeaderImage)?.image}
              style={styles.sectionItemImage}
            />
            <Text style={styles.sectionHeaderText}>{section}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  sectionList: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 0.5,
    marginTop: 10,
    width: "93.5%",
    alignSelf: "center",
    marginBottom: 5,
  },
  sectionHeader: {
    backgroundColor: "transparent",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    height: 40,
    maxWidth: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  sectionHeaderText: {
    fontSize: 14,
    maxWidth: "100%",
    alignSelf: "center",
  },
  sectionItem: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    maxWidth: "100%",
    borderWidth: 1,
    borderRadius: 10,
  },
  sectionItemImage: {
    borderWidth: 0,
    margin: 4,
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: "transparent",
    alignSelf: "center",
    transform: [{ scaleX: 4 }, { scaleY: 4 }, { translateY: 0.25 }],
  },
  sectionItemText: {
    flexWrap: "wrap",
    maxWidth: "85%",
    alignSelf: "center",
    // backgroundColor: "white",
  },
});
