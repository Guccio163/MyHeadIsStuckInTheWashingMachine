import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import tagItem from "../../../functions/tagItem";
import { iconsInRows } from "../../../assets/iconsRegister";


interface Props {
  onIconPress: (arg0: string) => void;
  icons: string[]
}

export default function IconsInput({ onIconPress, icons }: Props) {
  let sectionsArray = Array.from({ length: iconsInRows.length }, () => true);
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
        sections={iconsInRows}
        extraData={isExpanded}
        style={styles.sectionList}
        keyExtractor={(data, index) => data[0] + index}
        renderItem={({ section: { index }, item }) => {
          if (!isExpanded[index]) return null;

          return (
            <View style={{ flexDirection: "row" }}>
              {item.map((element) => {
                return (
                  <Pressable
                    style={[
                      styles.washIcon,
                      {
                        backgroundColor: icons.includes(element)
                          ? "rgba(255, 243, 61, 0.55)"
                          : "rgba(255, 255, 255, 0.4)",
                        borderBlockColor: icons.includes(element)
                          ? "rgba(255, 243, 61, 0.9)"
                          : "black",
                        borderLeftColor: icons.includes(element)
                          ? "rgba(255, 243, 61, 0.9)"
                          : "black",
                        borderRightColor: icons.includes(element)
                          ? "rgba(255, 243, 61, 0.9)"
                          : "black",
                      },
                    ]}
                    onPress={() => {
                      onIconPress(element);
                    }}
                  >
                    <Image
                      source={tagItem(element)?.image}
                      style={styles.washIconImage}
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
              style={styles.washIconImage}
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
    borderRadius: 10,
  },
  sectionHeader: {
    backgroundColor: "transparent",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    height: 40,
    maxWidth: "100%",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  sectionHeaderText: {
    fontSize: 14,
    maxWidth: "100%",
    alignSelf: "center",
  },
  washIcon: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    maxWidth: "100%",
    borderWidth: 1,
    borderRadius: 10,
  },
  washIconImage: {
    borderWidth: 0,
    margin: 4,
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: "transparent",
    alignSelf: "center",
    transform: [{ scaleX: 4 }, { scaleY: 4 }, { translateY: 0.25 }],
  },
});
