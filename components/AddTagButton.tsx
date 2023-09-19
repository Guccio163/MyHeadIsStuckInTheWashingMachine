import { StyleSheet, Pressable } from "react-native";
import React from "react";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { variables as v } from "../assets/globalVariables";

export default function AddTagButton() {
  const buttonRotationValue = useSharedValue(0);
  const navi = useRouter();

  function startRotationAnBack() {
    buttonRotationValue.value = withSequence(
      withTiming(360, {
        duration: 500,
        easing: Easing.inOut(Easing.bezierFn(0.25, 0.1, 0.25, 1)),
      }),
      withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.bezierFn(0.25, 0.1, 0.25, 1)),
      })
    );
  }

  const rotation = useDerivedValue(() =>
    interpolate(buttonRotationValue.value, [0, 360], [0, 360])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.addTagButtonBox, animatedStyle]}>
      <Pressable
        onPress={() => {
          startRotationAnBack();
          navi.push({
            pathname: "addtag",
          });
        }}
        style={({ pressed }) => [
          styles.addTagButton,
          {
            backgroundColor: pressed
              ? v.mainColorDarkened
              : v.mainColor,
          },
        ]}
      >
        <Icon name="plus" size={30} color="black" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  addTagButtonBox: {
    alignSelf: "center",
    height: 65,
    width: 65,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 2,
  },
  addTagButton: {
    alignSelf: "center",
    height: 65,
    width: 65,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    position: "absolute",
    zIndex: 2,
  },
});
