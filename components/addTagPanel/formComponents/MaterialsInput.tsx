import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Material } from "../FormSample";
import { Slider } from "@react-native-assets/slider";
import CustomButton from "./CustomButton";

interface Props {
  materials: Material[];
  onChangeMaterials: Dispatch<SetStateAction<Material[]>>;
}

export default function MaterialsInput({
  materials,
  onChangeMaterials,
}: Props) {
  //   const [notes, onChangeMaterials] = React.useState(["x"]);
  //   const [isSliderInteracting, setIsSliderInteracting] = useState(false);

  const [sliderValue, setSliderValue] = React.useState(0);

  const addInput = () => {
    onChangeMaterials((materials) => [
      ...materials,
      { percentage: "", name: "" },
    ]);
    console.log(materials);
  };

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

  //   const handleSliderValueComplete = (number: React.SetStateAction<number>) => {
  //     console.log("chuj");
  //     setSliderValue(number);
  //   };

  const xd = materials.map((elem, index) => (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={[myStyles.percentage, styles.input]}
          onChangeText={(text) => changeMaterialPercentage(text, index)}
          value={elem.percentage}
          placeholder="0"
          keyboardType="numeric"
        />
        <Text style={{ fontSize: 20, textAlignVertical: "center" }}>%</Text>
        <TextInput
          style={[styles.input, myStyles.material]}
          onChangeText={(text) => changeMaterial(text, index)}
          value={elem.name}
          placeholder="Material name"
          keyboardType="default"
        />
        {/* <Slider
        value={sliderValue}
        minimumValue={0}
        maximumValue={100}
        style={{ width: 200, height: 40 }}
        step={1}
        onSlidingComplete={handleSliderValueComplete}
      ></Slider> */}
        {/* <Text>{sliderValue}</Text> */}

        <CustomButton
          onPress={() => {
            let temp = materials.length;
            let temp2 = [];
            for (let i = 0; i < temp; i++) {
              if (i != index) temp2.push(materials[i]);
            }
            onChangeMaterials(temp2);
          }}
          title="-"
          myStyle={myStyles.button}
        />
      </View>
    </View>
  ));

  return <View>{xd}</View>;
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
    height: "auto",
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 3,
    marginTop: 10.5,
    marginBottom: 10.5,
  },
  percentage: {
    width: 40,
  },
  material: {
    width: Dimensions.get("window").width - 210,
  },
});
