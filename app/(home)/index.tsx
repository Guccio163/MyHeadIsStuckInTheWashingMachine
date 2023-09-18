import { View, FlatList, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TagElement from "../../components/TagElement";
import {
  getTagsSetState,
  getUserImageSetState,
  getUserInfoSetState,
} from "../../functions/asyncStorage";
import { Tag } from "../../components/addTagPanel/AddTagForm";
import FilterCategory from "../../components/FilterCategory";
import { filterArrayByCategory } from "../../functions/filterArray";
import { useNavigation } from "expo-router";
import AddTagButton from "../../components/AddTagButton";
import { UserInfoContext } from "../../contexts/UserInfoContextProvider";
import { setUserId } from "firebase/analytics";
// import UserInfoContextProvider, {
//   UserInfoContext,
// } from "../contexts/UserInfoContextProvider";

export default function TagListPage() {
  const [tagList, setTags] = useState<Tag[]>([]);
  const [filteredTagList, setFiltered] = useState<Tag[]>([]);
  const [filterCategory, setCategory] = useState("All");
  const navigation = useNavigation();

  const {
    userID,
    setUserID,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    userImage,
    setUserImage,
  } = useContext(UserInfoContext);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getTagsSetState(setTags);
      // getUserImageSetState(setUserImage);

      console.log("Ekran został zmieniony.");
    });
  }, [navigation]);

  useEffect(() => {
    setFiltered(filterArrayByCategory(tagList, filterCategory));
    console.log("odświeżono");
  }, [filterCategory, tagList]);

  function chooseList(filterCategory: string) {
    if (filterCategory == "All") {
      return tagList;
    }
    return filteredTagList;
  }

  // async function myFunction() {
  //   try {
  //     // getUserInfoSetState(
  //     //   setUserID,
  //     //   setUserName,
  //     //   setUserEmail,
  //     //   setUserPassword,
  //     //   setUserImage
  //     // );
  //     getUserImageSetState(setUserImage);
  //   } catch {
  //   } finally {
  //     console.log("[INDEX PAGE]: ", userName, userEmail, userPassword);

  //     // setLogged(true);

  //     console.log(
  //       "[INDEX PAGE]: nie udało się pobrać danych",
  //       userName,
  //       userEmail,
  //       userPassword
  //     );
  //   }
  // }

  // useEffect(() => {
  //   myFunction();
  //   console.log("ACTUALISING...");
  // }, [userName, userPassword, userImage]);

  return (
    // <UserInfoContext>
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
    // </UserInfoContext>
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
