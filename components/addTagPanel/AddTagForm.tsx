import {
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import NotesInput from "./formComponents/NotesInput";
import MaterialsInput from "./formComponents/MaterialsInput";
import CustomButton from "../CustomButton";
import IconsInput from "./formComponents/IconsInput";
import ImageInput from "./formComponents/ImageInput";
import {
  addTag,
  editTagInDB,
  getTagSetState,
  removeTag,
} from "../../functions/asyncStorage";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";

export type Tag = {
  id: string;
  imageUri: string;
  name: string;
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

export const categories = [
  "Bluzka",
  "Spodnie",
  "Bielizna",
  "Sukienka",
  "Spódnica",
  "Eleganckie",
  "Sweter/Bluza",
  "Odzież wierzchnia",
  "Akcesoria",
  "Inne",
];

interface Props {
  tagId?: string;
}

export default function AddTagForm({ tagId }: Props) {
  const [id, setId] = useState("");
  const [name, onChangeName] = useState("");
  const [category, onChangeCategory] = useState("Bluzka");
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
    } else {
      onChangeIcons((iconsActive) => [...iconsActive, name]);
    }
    console.log(icons);
  }

  function resetStates() {
    setImage("");
    onChangeName("");
    onChangeCategory("Bluzka");
    onChangeColour("");
    onChangeBrand("");
    onChangeIcons([]);
    onChangeMaterials([{ name: "", percentage: "" }]);
    onChangeNotes([""]);
  }

  function setStates(tag: Tag) {
    setId(tag.id);
    setImage(tag.imageUri);
    onChangeName(tag.name);
    onChangeCategory(tag.category);
    onChangeColour(tag.colour);
    onChangeBrand(tag.brand);
    onChangeIcons(tag.icons);
    onChangeMaterials(tag.materials);
    onChangeNotes(tag.notes);
  }
  const [tagDetails, setDetails] = useState<Tag>();

  useEffect(() => {
    if (tagId && !id) {
      getTagSetState(setDetails, tagId);
      console.log("tagId isnt null");
    }
    if (tagDetails) {
      setStates(tagDetails);
      console.log("załadowano dane z taga (jeśli edytujesz)");
    }
  }, [tagDetails]);

  const navi = useRouter();

  return (
    <KeyboardAvoidingView enabled behavior="padding">
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator
        scrollEnabled
        nestedScrollEnabled
      >
        <ImageInput setImage={setImage} image={image} />

        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Name"
          keyboardType="default"
        />
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => onChangeCategory(itemValue)}
        >
          {categories.map((c, index) => (
            <Picker.Item label={c} value={c} key={index} />
          ))}
        </Picker>
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
          onPress={
            tagId
              ? () => {
                  editTagInDB({
                    id: id,
                    imageUri: image,
                    name: name,
                    category: category,
                    colour: colour,
                    brand: brand,
                    materials: materials,
                    icons: icons,
                    notes: notes,
                  });

                  navi.back();
                }
              : async () => {
                  await addTag({
                    id: id,
                    imageUri: image,
                    name: name,
                    category: category,
                    colour: colour,
                    brand: brand,
                    materials: materials,
                    icons: icons,
                    notes: notes,
                  });
                  resetStates();
                  navi.back();
                }
          }
        />

        {/* <CustomButton
          title="set tagCount (for maintenance)"
          style={propStyles.button}
          onPress={() => addItemToDB("tagCount", "0")}
        /> */}

        <CustomButton
          title="custom button (for maintenance)"
          style={propStyles.button}
          onPress={() => removeTag("7")}
        />
        {/* <View style={{ height: 5 }} ></View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: "95%",
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
