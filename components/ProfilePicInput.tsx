import { StyleSheet, Pressable, Image, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";
import { variables } from "../assets/globalVariables";
import { addUserImageToDB } from "../functions/asyncStorage";

interface Props {
  setImage: (arg0: string) => void;
  image: string;
}

export default function ImageInput({ setImage, image }: Props) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      
    });

    if (!result.canceled) {
      let imageUri = result.assets[0].uri;
      setImage(imageUri);
      addUserImageToDB(imageUri);
    }
  };

  return (
    <Pressable onPress={pickImage} style={styles.pressable}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <FontAwesome name="user" size={150} color={variables.mainColor} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    // height: 100,
    // width: 100,
    // borderRadius: 10,
    // alignSelf: "center",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "transparent",
    alignSelf: "center",
    // transform: [{ scaleX: 1 }, { scaleY: 1 }, { translateY: 2 }],
    overflow: "hidden",
  },
  pressable: {
    // height: 101,
    // width: 101,
    // borderRadius: 10,
    // alignSelf: "center",
    // margin: 10,
    // borderWidth: 1,
    // justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: 200,
    height: 200,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    overflow: "hidden",
    margin: 20,
  },
  icon: {
    alignSelf: "center",
    color: "black",
  },
});
