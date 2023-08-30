import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { Tag } from "./addTagPanel/AddTagForm";
import tagItem from "../functions/tagItem";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  name: string;
  index: number;
}

export default function TagElement({
  id,
  imageUri,
  // name,
  category,
  colour,
  brand,
  icons,
  materials,
  notes,
}: Tag) {
  return (
    <View key={id} style={[styles.flatListChild, { flexDirection: "row" }]}>
      <View style={styles.imageWrapper}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Icon name="file-image-o" size={30} style={styles.icon} />
        )}
      </View>
      <View style={styles.flatListChildInfo}>
        <Text>
          {/* {name} */}
          {category}
          {colour}
          {brand}
        </Text>
        <View style={styles.iconsWrapper}>
          {icons.map((iconName) => (
            <View style={styles.singleIconWrapper}>
              <Image
                source={tagItem(iconName)?.image}
                resizeMode="center"
                style={styles.washIcon}
              />
            </View>
          ))}
        </View>
        {materials.map((material) => (
          <Text>
            {material.percentage}
            {material.name}
          </Text>
        ))}
        <Text>{notes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatListChild: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    width: "97%",
    height: Dimensions.get("window").height * 0.13,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    alignSelf: "center",
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
  flatListChildInfo: {},
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
});
