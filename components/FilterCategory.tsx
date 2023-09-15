import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { categories } from "./addTagPanel/AddTagForm";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { variables as v } from "../assets/globalVariables";

interface Props {
  chosenCategory: string;
  setCategory: (arg0: string) => void;
}

export default function FilterCategory({ chosenCategory, setCategory }: Props) {
  const filterCategories = ["All"].concat(categories);
  const [isExtended, setExtended] = useState(false);
  //   const [chosenCategory, setCategory] = useState('');

  function toggleFilters(arg0: string) {
    setExtended(false);
    setCategory(arg0);
  }

  const filterWidth = useSharedValue(50);

  const openFilter = () => {
    filterWidth.value = withSpring(200, {
      mass: 1,
      stiffness: 80,
      damping: 100,
    });
  };

  const closeFilter = () => {
    filterWidth.value = withSpring(50, {
      mass: 1,
      stiffness: 80,
      damping: 100,
    });
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: filterWidth.value,
    };
  });

  return (
    <View style={styles.filterWrapper}>
      <Text style={styles.filterText}>Filter categories:</Text>
      <View style={styles.viewBack}>
        <Animated.View style={[styles.filterView, animatedStyles]}>
          {isExtended ? (
            <FlatList
              data={filterCategories}
              nestedScrollEnabled
              style={{ height: 200 }}
              renderItem={({ item, index }) => (
                <Pressable
                  key={index}
                  style={styles.filterItem}
                  onPress={() => {
                    toggleFilters(item);
                    closeFilter();
                  }}
                >
                  <Text>{item}</Text>
                </Pressable>
              )}
            />
          ) : (
            <Pressable
              onPress={() => {
                setExtended(true);
                openFilter();
              }}
              style={{
                height: 50,
                width: "100%",
                alignSelf: "center",
                alignItems: 'center',
                justifyContent: "center",
              }}
            >
              <Text>{chosenCategory}</Text>
            </Pressable>
          )}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    overflow: "visible",
    margin: 5,
  },
  filterText: {
    fontSize: 17,
  },
  filterView: {
    position: "absolute",
    backgroundColor: v.mainColor,
    borderRadius: 10,
    width: 200,
    margin: 10,
    zIndex: 3,
    overflow: "visible",
    transform: [{ translateY: -10 }],
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
  },
  filterItem: {
    height: 50,
    // alignSelf: "center",
    alignItems: 'center',
    justifyContent: "center",
    // backgroundColor: "yellow",
    width: '100%',
  },
  viewBack: {
    height: 50,
    width: 200,
    alignItems: "center",
    marginLeft: 10,
  },
});
