import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import CustomButton from "../../CustomButton";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  notes: string[];
  onChangeNotes: Dispatch<SetStateAction<string[]>>;
}

export default function NotesInput({ notes, onChangeNotes }: Props) {
  const changeNote = (value: string, index: number) => {
    let tmp = [...notes];
    tmp[index] = value;
    onChangeNotes(tmp);
  };
  return (
    <View>
      {notes.map((elem, index) => (
        <View style={styles.noteRow} key={index}>
          <Icon name="circle" size={10} color="black" />
          <TextInput
            style={styles.input}
            onChangeText={(text) => changeNote(text, index)}
            value={elem}
            placeholder="Add note"
            keyboardType="default"
          />
          <CustomButton
            onPress={() => {
              let prefix = notes.splice(0, index);
              let suffix = notes.slice(1);
              onChangeNotes(prefix.concat(suffix));
            }}
            title="-"
            style={myStyles.button}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get("window").width - 153,
    borderRadius: 10,
  },
  noteRow: {
    flexDirection: "row",
    width: Dimensions.get("window").width - 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

const myStyles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderBlockColor: "black",
    borderWidth: 1,
    height: 42,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 3,
    marginTop: 10.5,
    marginBottom: 10.5,
  },
});
