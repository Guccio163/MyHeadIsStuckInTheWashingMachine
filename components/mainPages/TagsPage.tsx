import { View, FlatList, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import TagListElement from "../Tag";
import PageTitle from "../PageTitle";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AddTagPage from "../addTagPanel/AddTagPanel";
import Icon from "react-native-vector-icons/FontAwesome";


export default function TagListPage() {
  const data = [
    { index: 0, name: "ania" },
    { index: 1, name: "antoni" },
    { index: 2, name: "tomek" },
    { index: 3, name: "basia" },
    { index: 4, name: "krzysiek" },
    { index: 5, name: "patrycja" },
    { index: 6, name: "marcin" },
    { index: 7, name: "piotrek" },
    { index: 8, name: "stasiek" },
    { index: 9, name: "weronika" },
    { index: 10, name: "zuzia" },
    { index: 11, name: "mikołaj" },
  ];

  const tags ='chuj'

  const translateYValue = useSharedValue(Dimensions.get("window").height);
  const buttonRotationValue = useSharedValue(0);

  const transformAddPanel = () => {
    translateYValue.value = withSpring(100, {
      mass: 1,
      stiffness: 80,
      damping: 100,
    });
  };

  const startRotation = (degrees: number) => {
    buttonRotationValue.value = withTiming(degrees, {
      duration: 1000,
      easing: Easing.bounce,
    });
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(translateYValue.value) }],
  }));

  const rotation = useDerivedValue(() => {
    return interpolate(buttonRotationValue.value, [0, 360], [0, 360]);
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.pageWrapper}>
      <PageTitle name="Tags List" />

      <Animated.View style={[styles.addTagButtonBox, animatedStyle]}>
        <Pressable
          onPress={() => {
            transformAddPanel();
            startRotation(360);
          }}
          style={styles.addTagButton}
        >
          <Icon name="plus" size={30} color="black" />
        </Pressable>
      </Animated.View>
      <Animated.View style={[styles.addTagRollout, animatedStyles]}>
        <AddTagPage
          translateYValue={translateYValue}
          rotateOnClose={() => startRotation(0)}
        />
      </Animated.View>
      <FlatList
        style={styles.flatListContainer}
        data={data}
        renderItem={(item) => (
          <TagListElement name={item.item.name} index={item.index}></TagListElement>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    height: "100%",
    width: "100%",
  },
  EmployeeListTitle: {
    fontSize: 20,
    alignSelf: "center",
  },
  employeeListContainer: {
    backgroundColor: "turquoise",
    width: "90%",
    height: 400,
    justifyContent: "center",
  },
  flatListContainer: {
    alignSelf: "center",
    minHeight: 200,
    maxHeight: "90%",
    width: "90%",
    backgroundColor: "transparent",
  },
  addTagRollout: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#98838F",
    borderRadius: 40,
    position: "absolute",
    zIndex: 2,
  },
  addTagButtonBox: {
    alignSelf: "center",
    height: 65,
    backgroundColor: "#78C3FB",
    width: 65,
    borderRadius: 30,
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
    backgroundColor: "#78C3FB",
    width: 65,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    position: "absolute",
    zIndex: 2,
  },
});
