import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import React from "react";
import NotesInput from "./addTagPanel/formComponents/NotesInput";

interface Tag {
  name: string;
  category: string;
  colour: string;
  brand: string;
  icons: string[];
  materials: string[][];
  notes: string[];
}

export default function FormSample() {
  const [name, onChangeName] = React.useState("");
  const [category, onChangeCategory] = React.useState("");
  const [colour, onChangeColour] = React.useState("");
  const [brand, onChangeBrand] = React.useState("");
  const [icons, onChangeIcons] = React.useState("");
  const [materials, onChangeMaterials] = React.useState("");
  const [notes, onChangeNotes] = React.useState([""]);

  return (
    <SafeAreaView>
      <ScrollView
        style={{ maxHeight: "83%", minHeight: "70%", backgroundColor: "white" }}
        showsVerticalScrollIndicator
        scrollEnabled
      >
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="name placeholder"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeCategory}
          value={category}
          placeholder="category placeholder"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeColour}
          value={colour}
          placeholder="colour placeholder"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeBrand}
          value={brand}
          placeholder="brand placeholder"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeIcons}
          value={icons}
          placeholder="ICON BUTTONS placeholder"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeMaterials}
          value={materials}
          placeholder="materials (ARRAY) ADDING itselfs"
          keyboardType="default"
        />

        <NotesInput notes={notes} onChangeNotes={onChangeNotes} />

        <Button
          onPress={() => {
            console.log(notes);
            console.log(name);
          }}
          title="console log notes"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
