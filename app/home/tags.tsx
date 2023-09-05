import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import TagElement from "../../components/TagElement";
import PageTitle from "../../components/PageTitle";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AddTagPage from "../../components/addTagPanel/AddTagPanel";
import Icon from "react-native-vector-icons/FontAwesome";
import { getItemSetState, getTagsSetState } from "../../functions/asyncStorage";
import { Tag, categories } from "../../components/addTagPanel/AddTagForm";
import FilterCategory from "../../components/FilterCategory";
import { filterArrayByCategory } from "../../functions/filterArray";
import { useNavigation, useRouter } from "expo-router";
import addTag from "../../app/addTag";

export const UpToDateContext = createContext({
  arg0: true,
  arg1: (arg0: boolean) => {
    console.log(arg0);
  },
});

export default function TagListPage() {
  const [tagList, setTags] = useState<Tag[]>([]);
  const [filteredTagList, setFiltered] = useState<Tag[]>([]);
  const [isUpToDate, setUpToDate] = useState(true);
  const [filterCategory, setCategory] = useState("All");

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

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTagsSetState(setTags);

      console.log("Ekran został zmieniony.");
    });

    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   getTagsSetState(setTags);
  //   console.log("odświeżono");
  // }, [isUpToDate]);

  useEffect(() => {
    if (filterCategory == "All") {
      getTagsSetState(setFiltered);
    } else {
      setFiltered(filterArrayByCategory(tagList, filterCategory));
    }
    console.log("odświeżono");
  }, [filterCategory, tagList]);

  const translateYValue = useSharedValue(Dimensions.get("window").height);
  const buttonRotationValue = useSharedValue(0);

  const transformAddPanel = () => {
    translateYValue.value = withSpring(10, {
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
  // console.log(tagList);

  const navi = useRouter();
  return (
      <View style={styles.pageWrapper}>
        {/* <PageTitle name="Tags List" /> */}

        <Animated.View style={[styles.addTagButtonBox, animatedStyle]}>
          <Pressable
            onPress={() => {
              // transformAddPanel();
              startRotation(360);
              navi.push({
                pathname: "addTag",
              });
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

        <View>
          <FilterCategory
            chosenCategory={filterCategory}
            setCategory={setCategory}
          />
          <FlatList
            style={styles.flatListContainer}
            data={filteredTagList}
            nestedScrollEnabled
            renderItem={({ item, index }) => (
              <TagElement tag={item}></TagElement>
            )}
          ></FlatList>
        </View>
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
    justifyContent: "center",
  },
  flatListContainer: {
    alignSelf: "center",
    minHeight: 200,
    maxHeight: "93%",
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
