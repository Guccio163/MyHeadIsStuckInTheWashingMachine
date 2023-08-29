import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import PageTitle from "../PageTitle";
import tagItem from "../../functions/tagItem";
import { icons } from "../../assets/iconsRegister";

export default function LoremScroll() {
  let sectionsArray = Array.from({ length: icons.length }, () => 0);
  const [isExpanded, setExpanded] = useState(sectionsArray);

  function handleClick(index: number) {
    let newArray = isExpanded;

    if (isExpanded[index]) {
      newArray[index] = 0;
    } else {
      newArray[index] = 1;
    }
    setExpanded([...newArray]);
  }

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <PageTitle name="Pomoc" />
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={icons}
        extraData={isExpanded}
        style={styles.sectionList}
        keyExtractor={(item, index) => item + index}
        renderItem={({ section: { index }, item }) => {
          if (!isExpanded[index]) return null;

          return (
            <View style={styles.sectionItem}>
              <Image
                source={tagItem(item)?.image}
                style={styles.sectionItemImage}
                resizeMode="center"
              />
              <Text style={styles.sectionItemText}>{tagItem(item)?.name}</Text>
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
    borderWidth: 1,
    borderBottomWidth: 0,
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
  },
  sectionHeader: {
    backgroundColor: "transparent",
    borderSideWidth: 0.5,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    height: 70,
    maxWidth: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  sectionHeaderText: {
    fontSize: 20,
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
    margin: 6,
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "transparent",
    alignSelf: "center",
    transform: [{ scaleX: 3 }, { scaleY: 3 }, { translateY: 1 }],
  },
  sectionItemText: {
    flexWrap: "wrap",
    maxWidth: "85%",
    alignSelf: "center",
  },
});
