import {
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import React, { useState } from "react";
import NotesInput from "./formComponents/NotesInput";
import MaterialsInput from "./formComponents/MaterialsInput";
import CustomButton from "../CustomButton";
import IconsInput from "./formComponents/IconsInput";
import ImageInput from "./formComponents/ImageInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addItemToDB,
  addTagToDB,
  getAllKeys,
  getFromDB,
  removeItem,
  removeTag,
} from "../../functions/asyncStorage";

export type Tag = {
  id: string;
  imageUri: string;
  // name: string;
  category: string;
  colour: string;
  brand: string;
  icons: string[];
  materials: Material[];
  notes: string[];
};

export type Material = {
  percentage: string;
  name: string;
};

interface Props {
  refreshList: (arg0: string) => void;
}

export default function AddTagForm({ refreshList }: Props) {
  // const [name, onChangeName] = useState("");
  const [category, onChangeCategory] = useState("");
  const [colour, onChangeColour] = useState("");
  const [brand, onChangeBrand] = useState("");
  const [icons, onChangeIcons] = useState<string[]>([]);
  const [materials, onChangeMaterials] = useState<Material[]>([
    { percentage: "", name: "" },
  ]);
  const [image, setImage] = useState<string>("");
  const [notes, onChangeNotes] = useState([""]);

  function handleIconClick(name: string) {
    if (icons.includes(name)) {
      let tempIcons = icons.filter((e: string) => e !== name);
      onChangeIcons(tempIcons);
      console.log(icons);
    } else onChangeIcons((iconsActive) => [...iconsActive, name]);
  }

  function resetStates() {
    setImage("");
    // onChangeName("");
    onChangeCategory("");
    onChangeColour("");
    onChangeBrand("");
    onChangeIcons([]);
    onChangeMaterials([{ name: "", percentage: "" }]);
    onChangeNotes([""]);
  }

  return (
    <KeyboardAvoidingView enabled behavior="padding">
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator
        scrollEnabled
      >
        <ImageInput setImage={setImage} image={image} />

        {/* <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Name"
          keyboardType="default"
        /> */}
        <TextInput
          style={styles.input}
          onChangeText={onChangeCategory}
          value={category}
          placeholder="Category"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeColour}
          value={colour}
          placeholder="Colour"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeBrand}
          value={brand}
          placeholder="Brand"
          keyboardType="default"
        />
        <IconsInput
          onIconPress={(name: string) => handleIconClick(name)}
          icons={icons}
        />
        <MaterialsInput
          materials={materials}
          onChangeMaterials={onChangeMaterials}
        />
        <CustomButton
          title="ADD MATERIAL"
          style={propStyles.button}
          onPress={() => {
            onChangeMaterials((materials) => [
              ...materials,
              { name: "", percentage: "" },
            ]);
          }}
        />

        <NotesInput notes={notes} onChangeNotes={onChangeNotes} />
        <CustomButton
          title="ADD NOTE"
          style={propStyles.button}
          onPress={() => {
            onChangeNotes((notes) => [...notes, ""]);
          }}
        />
        {/* <CustomButton
          title={"Console log notes (for maintenance)"}
          onPress={() => {
            console.log({
              name,
              category,
              colour,
              brand,
              icons,
              materials,
              notes,
            });
          }}
          style={propStyles.button}
        /> */}
        <CustomButton
          title="RESET"
          style={propStyles.button}
          onPress={resetStates}
        />

        <CustomButton
          title="SAVE TAG"
          style={propStyles.button}
          onPress={() => {
            addTagToDB(
              {
                id: "",
                imageUri: image,
                category: category,
                colour: colour,
                brand: brand,
                materials: materials,
                icons: icons,
                notes: notes,
              },
              refreshList
            );
            resetStates();
          }}
        />

        <CustomButton
          title="set tagCount (for maintenance)"
          style={propStyles.button}
          onPress={() => addItemToDB("tagCount", "0")}
        />

        {/* <CustomButton
          title="custom button (for maintenance)"
          style={propStyles.button}
          onPress={() => removeTag('9')}
        /> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: "93%",
    width: "100%",
    backgroundColor: "transparent",
    alignSelf: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

const propStyles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderBlockColor: "black",
    borderWidth: 1,
    height: 30,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 3,
  },
});
