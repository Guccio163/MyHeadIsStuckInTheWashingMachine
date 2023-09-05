import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import AddTagForm, { Tag } from "./addTagPanel/AddTagForm";
import tagItem from "../functions/tagItem";
import Icon from "react-native-vector-icons/FontAwesome";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";
import { varibales as v } from "../assets/globalVariables";

interface Props {
  tag: Tag;
}

export default function TagElement({ tag }: Props) {
  const heightDynamic = useSharedValue(Dimensions.get("window").height * 0.13);
  const [isExtended, setExtended] = useState(false);

  const handlePress = () => {
    if (isExtended) {
      heightDynamic.value -= 200;
      setExtended(false);
    } else {
      heightDynamic.value += 200;
      setExtended(true);
    }
  };

  function shortName(name: string, precision: number) {
    if (name.length > precision) {
      let prefix = name.slice(0, precision);
      return `${prefix}(...)`;
    }
    return name;
  }

  function mapIcons(icons: string[], isExtended: boolean) {
    let newIcons = icons;
    let isShortened = false;
    if (icons.length > 4 && !isExtended) {
      newIcons = icons.splice(0, 4);
      isShortened = true;
    }
    return (
      <>
        {newIcons.map((icon, index) => (
          <View style={styles.singleIconWrapper} key={index}>
            <Image
              source={tagItem(icon)?.image}
              resizeMode="center"
              style={styles.washIcon}
            />
          </View>
        ))}
        {isShortened ? (
          <View style={styles.singleIconWrapper}>
            <Text>+12</Text>
          </View>
        ) : null}
      </>
    );
  }

  const animatedStyles = useAnimatedStyle(() => ({
    height: withSpring(heightDynamic.value, {
      mass: 10,
      damping: 1000,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
    }),
  }));

  const navi = useRouter();

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        key={tag.id}
        style={[
          styles.flatListChild,
          animatedStyles,
          { flexDirection: isExtended ? "column" : "row" },
          { paddingTop: isExtended ? 10 : 0 },
        ]}
      >
        <>
          <View style={styles.imageWrapper}>
            {tag.imageUri ? (
              <Image source={{ uri: tag.imageUri }} style={styles.image} />
            ) : (
              <Icon name="file-image-o" size={30} style={styles.icon} />
            )}
          </View>
          <View
            style={[
              styles.flatListChildInfo,
              { justifyContent: isExtended ? "flex-start" : "center" },
            ]}
          >
            <View
              style={[
                styles.firstRowInfo,
                isExtended
                  ? { flexDirection: "column" }
                  : { flexDirection: "row" },
              ]}
            >
              <View style={styles.nameView}>
                <Text style={styles.nameText}>
                  {isExtended ? tag.name : shortName(tag.name, 12)}
                </Text>
              </View>
              <View style={styles.brandView}>
                <Text style={styles.brandText}>
                  {isExtended ? tag.brand : shortName(tag.brand, 10)}
                </Text>
              </View>
            </View>
            <View style={styles.secondRowInfo}>
              <View style={styles.categoryView}>
                <Text style={styles.categoryText}>{tag.category}, </Text>
              </View>
              <View style={styles.colourView}>
                <Text style={styles.colourText}>{tag.colour}</Text>
              </View>
            </View>
            <View style={styles.iconsWrapper}>
              {isExtended
                ? mapIcons(tag.icons, true)
                : mapIcons(tag.icons, false)}
            </View>
            {isExtended ? (
              <>
                <View style={styles.materialsWrapper}>
                  {tag.materials.map((material) => (
                    <Text>
                      {"  "}
                      {material.percentage}% {material.name}
                      {"  "}
                    </Text>
                  ))}
                </View>
                <View style={styles.notesWrapper}>
                  {tag.notes.map((note) => (
                    <View style={styles.singleNoteWrapper}>
                      <Icon name="circle" size={6} style={styles.noteIcon} />
                      <Text style={styles.note}>{note}</Text>
                    </View>
                  ))}
                </View>
                <CustomButton
                  title="Edytuj"
                  onPress={() => {
                    navi.push({
                      pathname: "addTag",
                      params: { tagId: `${tag.id}` },
                    });
                  }}
                  style={styles.editButton}
                />
              </>
            ) : null}
          </View>
        </>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flatListChild: {
    // borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    width: "97%",
    backgroundColor: v.mainBackgroud,
    alignSelf: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
  },
  imageWrapper: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: 95,
    height: 95,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderRadius: 10,
    margin: 7,
  },
  flatListChildInfo: {
    alignItems: "center",
    width: "67%",
    backgroundColor: "transparent",
  },
  firstRowInfo: {
    flexDirection: "row",
  },
  nameView: {},
  nameText: {
    fontSize: 20,
  },
  brandView: {
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 5,
    marginVertical: 2,
    padding: 2,
    backgroundColor: "rgba(108, 108, 108, 0.35)",
    borderBlockColor: "rgba(108, 108, 108, 1)",
    borderLeftColor: "rgba(108, 108, 108, 1)",
    borderRightColor: "rgba(108, 108, 108, 1)",
  },
  brandText: {},
  secondRowInfo: {
    flexDirection: "row",
  },
  categoryView: {},
  categoryText: {},
  colourView: {},
  colourText: {},
  iconsWrapper: {
    flexDirection: "row",
  },
  singleIconWrapper: {
    margin: 4,
    backgroundColor: "rgba(255, 243, 61, 0.55)",
    borderWidth: 1,
    borderRadius: 10,
    borderBlockColor: "rgba(255, 243, 61, 0.9)",
    borderLeftColor: "rgba(255, 243, 61, 0.9)",
    borderRightColor: "rgba(255, 243, 61, 0.9)",
  },
  washIcon: {
    margin: 4,
    width: 20,
    height: 20,
    alignSelf: "center",
    transform: [{ scaleX: 4 }, { scaleY: 4 }, { translateY: 0.25 }],
  },
  icon: {
    alignSelf: "center",
    color: "black",
  },
  image: {
    width: 95,
    height: 95,
    borderRadius: 10,
    alignSelf: "center",
  },
  materialsWrapper: {
    flexDirection: "row",
  },
  notesWrapper: {
    flexDirection: "column",
  },
  singleNoteWrapper: {
    flexDirection: "row",
  },
  note: {
    marginHorizontal: 5,
    marginVertical: 2,
  },
  noteIcon: {
    transform: [{ translateY: 8.7 }],
    color: "black",
  },
  editButton: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 2,
  },
});
