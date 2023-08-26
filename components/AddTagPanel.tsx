import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { SharedValue, withSpring } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
import { mainColor1 } from "./PageTitle";

interface Tag {
  name: string;
  category: string;
  colour: string;
  brand: string;
  icons: string[];
  materials: string[][];
  notes: string[];
}

interface Props {
  translateYValue: SharedValue<number>;
  rotateOnClose: ()=>void;
}

export default function AddTagPanel({ translateYValue, rotateOnClose }: Props) {

  const hidePanel = () => {
    translateYValue.value = withSpring(Dimensions.get("window").height);
  };

  return (
    
    <View style={styles.panelWrapper}>
      <Pressable style={styles.closePanelButton} onPress={()=>{hidePanel() ; rotateOnClose();}}>
        <Icon name="chevron-down" size={30} color="black" />
      </Pressable>
      <View style={styles.addTagForm}>
        <Text>AddTagPage</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panelWrapper: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: mainColor1,
    borderRadius: 40,
    position: "absolute",
  },
  closePanelButton: {
    height: 50,
    width: 50,
    transform: [{ translateX: 14 }, { translateY: 6 }],
    alignItems: "center",
    justifyContent: "center",
  },
  addTagForm: {
    alignItems: "center",
  },
});
