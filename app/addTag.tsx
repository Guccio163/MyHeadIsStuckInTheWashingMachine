import {
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { SharedValue, withSpring } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
import { mainColor1 } from "../components/PageTitle";
import FormSample, { Tag } from "./../components/addTagPanel/AddTagForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getTagSetState } from "../functions/asyncStorage";

export default function AddTagPanel() {
  const navi = useRouter();

  const { tagId } = useLocalSearchParams<{ tagId: string }>();


  return (
    <View style={styles.panelWrapper}>
      <Pressable
        style={styles.closePanelButton}
        onPress={() => {
          //   rotateOnClose();
          navi.back();
        }}
      >
        <Icon name="chevron-down" size={30} color="black" />
      </Pressable>
      <View style={styles.addTagForm}>
        <KeyboardAvoidingView enabled behavior="padding">
          <FormSample tagId={tagId} />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panelWrapper: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: mainColor1,
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
