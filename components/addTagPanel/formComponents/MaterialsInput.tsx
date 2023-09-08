import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Material } from "../AddTagForm";
import CustomButton from "../../CustomButton";

interface Props {
  materials: Material[];
  onChangeMaterials: Dispatch<SetStateAction<Material[]>>;
}

export default function MaterialsInput({
  materials,
  onChangeMaterials,
}: Props) {
  const changeMaterial = (value: string, index: number) => {
    let tmp = [...materials];
    tmp[index].name = value;
    onChangeMaterials(tmp);
  };

  const changeMaterialPercentage = (value: string, index: number) => {
    let tmp = [...materials];
    tmp[index].percentage = value;
    onChangeMaterials(tmp);
  };

  return (
    <View style={{alignSelf: 'center'}}>
      {materials.map((elem, index) => (
        <View key={index}>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={[styles.input, styles.percentageInput]}
              onChangeText={(text) => changeMaterialPercentage(text, index)}
              value={elem.percentage}
              placeholder="0"
              keyboardType="numeric"
            />
            <Text style={{ fontSize: 20, lineHeight: 60, marginRight: 12}}>%</Text>
            <TextInput
              style={[styles.input, styles.materialInput]}
              onChangeText={(text) => changeMaterial(text, index)}
              value={elem.name}
              placeholder="Material name"
              keyboardType="default"
            />

            <CustomButton
              onPress={() => {
                let newMaterials = materials.filter((e) => e !== elem);
                onChangeMaterials(newMaterials);
              }}
              title="-"
              style={propStyles.button}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginRight: 12,
    marginVertical: 12,
    // marginLeft: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  percentageInput: {
    width: 46,
  },
  materialInput: {
    width: Dimensions.get("window").width - 220,
  },
});

const propStyles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderBlockColor: "black",
    borderWidth: 1,
    height: "auto",
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    // margin: 3,
    marginTop: 10.5,
    marginBottom: 10.5,
  },
});
