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

interface Props{
  tag: Tag
}

export default function TagElement({
  tag
}: Props) {
  const heightDynamic = useSharedValue(Dimensions.get("window").height * 0.13);
  const [isExtended, setExtended] = useState(false);
  const [isEditView, setEditView] = useState(false);

  const handlePress = () => {
    if (isExtended) {
      heightDynamic.value -= 200;
      setExtended(false);
    } else {
      heightDynamic.value += 200;
      setExtended(true);
    }
  };

  function pressEdit() {
    if (isEditView) {
      heightDynamic.value -= 300;
      setEditView(false);
      console.log("zamknięto editView");
    } else {
      heightDynamic.value += 300;
      setEditView(true);
      console.log("otwarto editView");
    }
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

  return (
    <Pressable onPress={handlePress} disabled={isEditView}>
      <Animated.View
        key={tag.id}
        style={[
          styles.flatListChild,
          animatedStyles,
          { flexDirection: isExtended ? "column" : "row" },
          { paddingTop: isExtended ? 10 : 0 },
        ]}
      >
        {!isEditView ? (
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
              <View style={styles.firstRowInfo}>
                <View style={styles.nameView}>
                  <Text style={styles.nameText}>{tag.name}</Text>
                </View>
                <View style={styles.brandView}>
                  <Text style={styles.brandText}>{tag.brand}</Text>
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
                {tag.icons.map((iconName, index) => (
                  <View style={styles.singleIconWrapper} key={index}>
                    <Image
                      source={tagItem(iconName)?.image}
                      resizeMode="center"
                      style={styles.washIcon}
                    />
                  </View>
                ))}
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
                    onPress={pressEdit}
                    style={styles.editButton}
                  />
                </>
              ) : null}
            </View>
          </>
        ) : (
          <View>
            <Text>editView</Text>
            <CustomButton
              title="Edytuj"
              onPress={pressEdit}
              style={styles.editButton}
            />
            <AddTagForm tag={tag}/>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flatListChild: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    width: "97%",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
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
