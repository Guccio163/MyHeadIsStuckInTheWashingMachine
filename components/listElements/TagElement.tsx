import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  Button,
} from "react-native";
import React, { Component, RefObject, useState } from "react";
import { Tag } from "../addTagPanel/AddTagForm";
import tagItem from "../../functions/tagItem";
import Icon from "react-native-vector-icons/FontAwesome";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import CustomButton from "../CustomButton";
import { useRouter } from "expo-router";
import { variables as v } from "../../assets/globalVariables";
import { Swipeable } from "react-native-gesture-handler";
import { deleteTagFromDB } from "../../functions/asyncStorage";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props {
  tag: Tag;
}

export default function TagElement({ tag }: Props) {
  const heightDynamic = useSharedValue(Dimensions.get("window").height * 0.13);
  const [isExtended, setExtended] = useState(false);
  const marginDynamic = useSharedValue(10);
  const opacityDynamic = useSharedValue(1);

  const handlePress = () => {
    let changeValue =
      150 +
      Math.floor((tag.icons.length - 1) / 6) * 40 +
      tag.materials.length * 40 +
      tag.notes.length * 40;
    if (isExtended) {
      heightDynamic.value -= changeValue;
      setExtended(false);
      console.log(changeValue);
    } else {
      heightDynamic.value += changeValue;
      setExtended(true);
      console.log(changeValue);
    }
  };

  const handleDelete = (tagId: string) => {
    translateX.value = withTiming(-Dimensions.get("window").width);
    opacityDynamic.value = withTiming(0, undefined, () => {
      heightDynamic.value = 0;
      marginDynamic.value = 0;
    });
    deleteTagFromDB(tagId);
  };

  const renderRightActions = (tagId: string) => {
    return (
      <Animated.View
        style={[
          {
            margin: 0,
            alignContent: "center",
            justifyContent: "center",
            width: "30%",
          },
          animatedOpacity,
        ]}
      >
        <Pressable
          style={{ alignContent: "center", alignSelf: "center" }}
          onPress={() => {
            handleDelete(tagId);
          }}
        >
          <FontAwesome5 name={"trash-alt"} size={25} color={"red"} />
        </Pressable>
      </Animated.View>
    );
  };

  function shortName(name: string, precision: number) {
    if (name.length > precision) {
      let prefix = name.slice(0, precision);
      return `${prefix}(...)`;
    }
    return name;
  }

  // splice cuts out part of the array!
  function mapIcons(icons: string[], isExtended: boolean) {
    let newIcons = [...icons];
    let isShortened = false;
    if (icons.length > 4 && !isExtended) {
      newIcons = newIcons.splice(0, 4);
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
          <View style={[styles.singleIconWrapper]}>
            <Text
              style={{
                textAlign: "center",
                transform: [{ translateY: 5.5 }],
              }}
            >
              +{icons.length - 4}
              {"  "}
            </Text>
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

  const animatedMargin = useAnimatedStyle(() => ({
    marginVertical: withSpring(marginDynamic.value, {
      mass: 10,
      damping: 1000,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
    }),
  }));

  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: opacityDynamic.value,
  }));

  const navi = useRouter();
  const translateX = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      style={[animatedStyles, animatedMargin, styles.animatedWrapper]}
    >
      <Swipeable renderRightActions={() => renderRightActions(tag.id)}>
        <Pressable onPress={handlePress}>
          <Animated.View
            key={tag.id}
            style={[
              styles.flatListChild,
              animatedStyles,
              rStyle,
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
                      {tag.name
                        ? isExtended
                          ? tag.name
                          : shortName(tag.name, 12)
                        : tag.category}
                    </Text>
                  </View>
                  {tag.brand ? (
                    <View style={styles.brandView}>
                      <Text style={styles.brandText}>
                        {isExtended ? tag.brand : shortName(tag.brand, 10)}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View style={styles.secondRowInfo}>
                  {tag.name ? (
                    <View style={styles.categoryView}>
                      <Text style={styles.categoryText}>
                        {tag.category}
                        {tag.colour ? ", " : null}
                      </Text>
                    </View>
                  ) : null}
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
                      {tag.materials.map((material, index) => (
                        <Text key={index}>
                          {material.percentage
                            ? `    ${material.percentage}% ${material.name}    `
                            : ""}
                        </Text>
                      ))}
                    </View>
                    <View style={styles.notesWrapper}>
                      {tag.notes.map((note, index) => (
                        <View style={styles.singleNoteWrapper} key={index}>
                          {note ? (
                            <>
                              <Icon
                                name="circle"
                                size={6}
                                style={styles.noteIcon}
                              />
                              <Text style={styles.note}>{note}</Text>
                            </>
                          ) : null}
                        </View>
                      ))}
                    </View>
                    <CustomButton
                      title="Edytuj"
                      onPress={() => {
                        navi.push({
                          pathname: "addtag",
                          params: { tagId: `${tag.id}` },
                        });
                        handlePress();
                      }}
                      style={styles.editButton}
                    />
                  </>
                ) : null}
              </View>
            </>
          </Animated.View>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedWrapper: {
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
  },
  flatListChild: {
    // borderWidth: 1,
    borderRadius: 10,
    // marginVertical: 10,
    width: "97%",
    backgroundColor: v.mainBackgroud,
    alignSelf: "center",
    alignItems: "center",
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
    maxWidth: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  singleIconWrapper: {
    margin: 4,
    backgroundColor: v.mainColorHalfTransparent,
    borderWidth: 1.5,
    borderRadius: 10,
    borderBlockColor: v.mainColor,
    borderLeftColor: v.mainColor,
    borderRightColor: v.mainColor,
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
