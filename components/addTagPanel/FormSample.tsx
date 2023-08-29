import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import NotesInput from "./formComponents/NotesInput";
import MaterialsInput from "./formComponents/MaterialsInput";
import CustomButton from "./formComponents/CustomButton";
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

export default function FormSample() {
  const [name, onChangeName] = React.useState("");
  const [category, onChangeCategory] = React.useState("");
  const [colour, onChangeColour] = React.useState("");
  const [brand, onChangeBrand] = React.useState("");
  const [icons, onChangeIcons] = React.useState("");
  const [materials, onChangeMaterials] = React.useState<Material[]>([
    { percentage: "", name: "" },
  ]);
  const [notes, onChangeNotes] = React.useState([""]);

  return (
    <KeyboardAvoidingView enabled behavior="padding">
      <ScrollView
        style={{
          maxHeight: "90%",
          width: "100%",
          backgroundColor: "transparent",
          alignSelf: "center",
        }}
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
        {/* something to pass commit */}
        <IconsInput/>
        <MaterialsInput
          materials={materials}
          onChangeMaterials={onChangeMaterials}
        />
        <CustomButton
          onPress={() => {
            onChangeMaterials((materials) => [
              ...materials,
              { name: "", percentage: "" },
            ]);
          }}
          title="ADD MATERIAL"
          myStyle={myStyles.button}
        />

        <NotesInput notes={notes} onChangeNotes={onChangeNotes} />
        <CustomButton
          onPress={() => {
            onChangeNotes((notes) => [...notes, ""]);
          }}
          title="ADD NOTE"
          myStyle={myStyles.button}
        />
        <CustomButton
          title={"Console log notes"}
          onPress={() => {
            console.log(notes);
            console.log(name);
          }}
          myStyle={myStyles.button}
        />
        <CustomButton
          onPress={() => {
            onChangeNotes([""]);
            onChangeMaterials([{ name: "", percentage: "" }]);
          }}
          title="Reset"
          myStyle={myStyles.button}
        />
      </ScrollView>
    </KeyboardAvoidingView>
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

const myStyles = StyleSheet.create({
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
