import { View, Text, ScrollView, Pressable, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { categories } from "./addTagPanel/AddTagForm";
import { Picker } from "@react-native-picker/picker";

interface Props{
    chosenCategory: string,
    setCategory: (arg0:string)=>void
}

export default function FilterCategory({chosenCategory, setCategory}:Props) {
  const filterCategories = ["All"].concat(categories);
//   const [chosenCategory, setCategory] = useState('');

  return (
    <View style={styles.filterWrapper}>
      <Text style={styles.filterText}>Filter categories:</Text>
      <Picker
        selectedValue={chosenCategory}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.categoryPicker}
      >
        {filterCategories.map((c) => (
          <Picker.Item label={c} value={c} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  filterWrapper: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryPicker: {
    borderWidth: 1,
    margin: 2,
    width: "60%",
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 10,
  },
  filterText: {
    fontSize: 17,
  },
});