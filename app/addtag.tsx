import {
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import FormSample from "../components/addTagPanel/AddTagForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { variables as v } from "../assets/globalVariables";

export default function AddTagPanel() {
  const navi = useRouter();

  const { tagId } = useLocalSearchParams<{ tagId: string }>();

  return (
    <View style={styles.panelWrapper}>
      <Pressable style={styles.closePanelButton} onPress={navi.back}>
        <Icon name="chevron-down" size={30} color="black" />
      </Pressable>
      <View style={styles.addTagFormWrapper}>
        <KeyboardAvoidingView enabled behavior="padding">
          <FormSample tagId={tagId}/>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panelWrapper: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: v.mainColor,
    position: "absolute",
  },
  closePanelButton: {
    height: 50,
    width: 50,
    transform: [{ translateX: 14 }, { translateY: 6 }],
    alignItems: "center",
    justifyContent: "center",
  },
  addTagFormWrapper: {
    alignItems: "center",
  },
});
