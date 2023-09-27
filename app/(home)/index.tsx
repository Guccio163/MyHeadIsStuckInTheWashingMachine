import { View, FlatList, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TagElement from "../../components/listElements/TagElement";
import {
  getTagsSetStateFromDB,
  getUserIDSetStateFromDB,
} from "../../functions/asyncStorage";
import { Tag } from "../../components/addTagPanel/AddTagForm";
import FilterCategory from "../../components/FilterCategory";
import { filterArrayByCategory } from "../../functions/filterArray";
import { useNavigation } from "expo-router";
import AddTagButton from "../../components/AddTagButton";
import NetInfo from "@react-native-community/netinfo";
import { UserInfoContext } from "../../contexts/UserInfoContextProvider";
import { getImageUrlFromFirebaseSetState } from "../../functions/firebaseFunctions";

export default function TagListPage() {
  const [tagList, setTags] = useState<Tag[]>([]);
  const [filteredTagList, setFiltered] = useState<Tag[]>([]);
  const [filterCategory, setCategory] = useState("All");
  const navigation = useNavigation();
  const { userImage, setUserID, userID, setUserImage } =
    useContext(UserInfoContext);

  // const { isConnected, setConnected } = useContext(UserInfoContext);

  // const subscribeToNetinfo = NetInfo.addEventListener((state) => {
  //   console.log("Is connected?", state.isConnected);
  //   if (state.isConnected) setConnected(state.isConnected);
  // });

  // useEffect(() => {
  //   subscribeToNetinfo();
  // }, []);

  // async function myFunction() {
  //   try {
  //     await getUserIDSetStateFromDB(setUserID);
  //     await getImageUrlFromFirebaseSetState(userID, setUserImage);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    navigation.addListener("focus", () => {
      getTagsSetStateFromDB(setTags);
      console.log("Ekran został zmieniony.");
    });
  }, [navigation]);

  useEffect(() => {
    setFiltered(filterArrayByCategory(tagList, filterCategory));
    console.log("odświeżono");
  }, [filterCategory, tagList]);

  // useEffect(() => {
  //   myFunction();
  // }, []);
  function chooseList(filterCategory: string) {
    if (filterCategory == "All") {
      return tagList;
    }
    return filteredTagList;
  }

  return (
    <View style={styles.pageWrapper}>
      <AddTagButton />

      <FilterCategory
        chosenCategory={filterCategory}
        setCategory={setCategory}
      />

      <FlatList
        style={styles.categoriesList}
        data={chooseList(filterCategory)}
        nestedScrollEnabled
        renderItem={({ item, index }) => <TagElement tag={item} key={index} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    height: "100%",
    width: "100%",
  },
  categoriesList: {
    alignSelf: "center",
    minHeight: 200,
    maxHeight: "93%",
    width: "90%",
  },
});
