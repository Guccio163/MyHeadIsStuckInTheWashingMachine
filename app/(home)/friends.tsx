import { View, StyleSheet, Text, Pressable, RefreshControl } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "../../components/CustomButton";
import {
  getAllKeysSetStateFromDB,
  getItemSetStateFromDB,
  getTagsSetStateFromDB,
} from "../../functions/asyncStorage";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { Tag } from "../../components/addTagPanel/AddTagForm";
import IconsPanel from "../../components/addTagPanel/formComponents/IconsPanel";
import { ModeContext } from "../../contexts/ModeContextProvider";
import { variables as v } from "../../assets/globalVariables";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import FriendElement from "../../components/listElements/FriendElement";
import FriendsList from "../../components/UsersList";
import UsersList from "../../components/UsersList";
import FriendsSearch from "../../components/FriendsSearch";
import {
  getFriendsFromFirebaseSetState,
  getRequestsFromFirebaseSetState,
} from "../../functions/firebaseFunctions";
import { UserInfoContext } from "../../contexts/UserInfoContextProvider";
import { useNavigation } from "expo-router";

export type friend = {
  userID: string;
  username: string;
  email: string;
};

export default function FriendsPage() {
  const { isDark } = useContext(ModeContext);
  const { userID } = useContext(UserInfoContext);

  const [friendList, setFriendList] = useState<friend[]>([]);
  const [requestList, setRequestList] = useState<friend[]>([]);
  const [foundList, setFoundList] = useState<friend[]>([]);
  const [phrase, setPhrase] = useState<string>("");
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getFriendsFromFirebaseSetState(setFriendList, userID);
      getRequestsFromFirebaseSetState(setRequestList, userID);
      console.log("Ekran został zmieniony. UserID:", userID);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

  // useEffect(() => {
  //   // download userInfo and extract friend and request lists
  //   getFriendsFromFirebaseSetState(setFriendList, userID)
  //   getRequestsFromFirebaseSetState(setRequestList, userID);

  //   console.log("mounting");
  // }, []);

  useEffect(() => {
    getFriendsFromFirebaseSetState(setFriendList, userID);
    getRequestsFromFirebaseSetState(setRequestList, userID);
    console.log("Ekran został zmieniony. UserID:", userID);
  }, [userID, navigation]);

  // useEffect(() => {
  //   navigation.addListener("focus", () => {
  //     getFriendsFromFirebaseSetState(setFriendList, userID);
  //     getRequestsFromFirebaseSetState(setRequestList, userID);
  //     console.log("Ekran został zmieniony. UserID:", userID);
  //   });
  // }, [navigation]);

  // NAPRAWIĆ BŁĄD ŻE JAK DODAJE KOGOŚ DO ZNAJOMYCH TO WYPISUJE SIĘ NAZWA TEGO CO GO DODAJE A NIE MOJA

  return (
    <ScrollView style={styles.pageWrapper} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      
      {/* <Pressable
        onPress={() => {
          getFriendsFromFirebaseSetState(setFriendList, userID);
          getRequestsFromFirebaseSetState(setRequestList, userID);
          console.log("Ekran został zmieniony. UserID:", userID);
        }}
      >
        <Text>Press to reload</Text>
      </Pressable> */}

      <FriendsSearch
        setFound={setFoundList}
        phrase={phrase}
        setPhrase={setPhrase}
      />

      <UsersList type="found" friendsList={foundList} />

      <UsersList type="requests" friendsList={requestList} />

      <UsersList type="friends" friendsList={friendList} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    maxHeight: "100%",
    width: "100%",
    alignSelf: "center",
    borderBlockColor: "black",
    // paddingTop: 10,
  },
});

// const propStyles = StyleSheet.create({
//   button: {
//     backgroundColor: "rgba(255, 255, 255, 0.4)",
//     borderBlockColor: "black",
//     borderWidth: 1,
//     height: 30,
//     width: "auto",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 10,
//     margin: 3,
//   },
// });
