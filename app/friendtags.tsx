import { View, FlatList, StyleSheet } from "react-native";
import React, { useContext, useEffect, useReducer, useState } from "react";
// import TagElement from "../../components/listElements/TagElement";
// import {
//   getAllKeysSetStateFromDB,
//   getTagsSetStateFromDB,
//   getUserIDSetStateFromDB,
// } from "../../functions/asyncStorage";
// import { Tag } from "../../components/addTagPanel/AddTagForm";
// import FilterCategory from "../../components/FilterCategory";
// import { filterArrayByCategory } from "../../functions/filterArray";
import { useLocalSearchParams, useNavigation, useRouter, useSearchParams } from "expo-router";
// import AddTagButton from "../../components/AddTagButton";
import NetInfo from "@react-native-community/netinfo";
// import { UserInfoContext } from "../../contexts/UserInfoContextProvider";
// import { getImageUrlFromFirebaseSetState } from "../../functions/firebaseFunctions";
import { friend } from "./(home)/friends";
import { useRoute } from "@react-navigation/native";
import { Tag } from "../components/addTagPanel/AddTagForm";
import { getAllKeysSetStateFromDB, getTagsSetStateFromDB } from "../functions/asyncStorage";
import { filterArrayByCategory } from "../functions/filterArray";
import FilterCategory from "../components/FilterCategory";
import TagElement from "../components/listElements/TagElement";
import { getTagsSetStateFromFirebase } from "../functions/firebaseFunctions";

// interface Props{
//     friend: friend
// }

export default function FriendTags() {
  const [tagList, setTags] = useState<Tag[]>([]);
  const [filteredTagList, setFiltered] = useState<Tag[]>([]);
  const [filterCategory, setCategory] = useState("All");
  const navigation = useNavigation();
  const [keys, setKeys] = useState<string[]>([]);
  const navi = useNavigation();
  const {friendID, friendName}= useLocalSearchParams();
  const friendsId = `${friendID}`

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
      getTagsSetStateFromFirebase(setTags, friendsId);
    
  }, []);

//   useEffect(() => {
//     getAllKeysSetStateFromDB(setKeys);
//     console.log(keys);
//   }, [keys]);

  useEffect(() => {
    setFiltered(filterArrayByCategory(tagList, filterCategory));
    console.log("odświeżono");
  }, [filterCategory, tagList]);

  useEffect(() => {
      navi.setOptions({ title: `${friendName}'s tags`});
}, []);

  function chooseList(filterCategory: string) {
    if (filterCategory == "All") {
      return tagList;
    }
    return filteredTagList;
  }

  return (
    <View style={styles.pageWrapper}>

      <FilterCategory
        chosenCategory={filterCategory}
        setCategory={setCategory}
      />

      <FlatList
        style={styles.categoriesList}
        data={chooseList(filterCategory)}
        nestedScrollEnabled
        renderItem={({ item }) => <TagElement tag={item} />}
        keyExtractor={(item) => item.id}
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
