import { StyleSheet, Pressable, Image, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

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
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Pressable onPress={pickImage} style={styles.pressable}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
          <Icon name="file-image-o" size={30} style={styles.icon}/>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    alignSelf: 'center',
  },
  pressable: {
    height: 101,
    width: 101,
    borderRadius: 10,
    alignSelf: "center",
    margin: 10,
    borderWidth: 1,
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  icon: {
    alignSelf: "center",
    color: "black",
  },
});
