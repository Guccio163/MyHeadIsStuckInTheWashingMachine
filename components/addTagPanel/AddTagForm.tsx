import {
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import NotesInput from "./formComponents/NotesInput";
import MaterialsInput from "./formComponents/MaterialsInput";
import CustomButton from "../CustomButton";
import IconsInput from "./formComponents/IconsInput";

interface Tag {
  name: string;
  category: string;
  colour: string;
  brand: string;
  icons: string[];
  materials: Material[];
  notes: string[];
}

export type Material = {
  percentage: string;
  name: string;
};

export default function AddTagForm() {
  const [name, onChangeName] = React.useState("");
  const [category, onChangeCategory] = React.useState("");
  const [colour, onChangeColour] = React.useState("");
  const [brand, onChangeBrand] = React.useState("");
  const [icons, onChangeIcons] = React.useState<string[]>([]);
  const [materials, onChangeMaterials] = React.useState<Material[]>([
    { percentage: "", name: "" },
  ]);
  const [notes, onChangeNotes] = React.useState([""]);

  function handleIconClick(name: string) {
    if (icons.includes(name)) {
      let tempIcons = icons.filter((e: string) => e !== name);
      onChangeIcons(tempIcons);
      console.log(icons);
    } else onChangeIcons((iconsActive) => [...iconsActive, name]);
  }

  return (
    <KeyboardAvoidingView enabled behavior="padding">
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator
        scrollEnabled
      >
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Name"
          keyboardType="default"
        />
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
        <CustomButton
          title={"Console log notes (save)"}
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
        />
        <CustomButton
          title="RESET"
          style={propStyles.button}
          onPress={() => {
            onChangeName("");
            onChangeCategory("");
            onChangeColour("");
            onChangeBrand("");
            onChangeIcons([]);
            onChangeMaterials([{ name: "", percentage: "" }]);
            onChangeNotes([""]);
          }}
        />
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
