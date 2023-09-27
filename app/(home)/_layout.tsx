import { StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { Tabs } from "expo-router";
import { variables as v } from "../../assets/globalVariables";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { UserInfoContext } from "../../contexts/UserInfoContextProvider";
import {
  getSystemModeSetStateFromDB,
  getUserIDSetStateFromDB,
  getUserInfoSetStateFromDB,
} from "../../functions/asyncStorage";
import HeaderRight from "../../components/HeaderRight";
import HeaderLeft from "../../components/HeaderLeft";
import { ModeContext } from "../../contexts/ModeContextProvider";
import { getImageUrlFromFirebaseSetState } from "../../functions/firebaseFunctions";

export default function _tabsLayout() {
  const {
    setUserID,
    setUserEmail,
    setUserName,
    setUserPassword,
    userImage,
    setUserImage,
    userID,
  } = useContext(UserInfoContext);

  const { isDark, setDark } = useContext(ModeContext);

  // async function myFunction() {
  //   try {
  //     await getImageUrlFromFirebaseSetState(userID, setUserImage);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    getUserInfoSetStateFromDB(
      setUserID,
      setUserName,
      setUserEmail,
      setUserPassword
      // setUserImage
    );
    getImageUrlFromFirebaseSetState(userID, setUserImage);

    getSystemModeSetStateFromDB(setDark);
    console.log("[TabsLayout] ACTUALISING...");
  }, []);

  return (
    <Tabs
      sceneContainerStyle={[
        styles.tabs,
        {
          backgroundColor: isDark ? v.mainColorHeavyDarkened : v.mainBackgroud,
        },
      ]}
      screenOptions={{
        tabBarActiveTintColor: v.mainColor,
        headerTintColor: isDark ? v.mainColor : "black",
        headerStyle: [
          styles.headerStyle,
          { backgroundColor: isDark ? v.mainColorHeavyDarkened : v.mainColor },
        ],
        tabBarStyle: [
          {
            backgroundColor: isDark
              ? v.mainColorHeavyDarkened
              : v.mainBackgroud,
          },
        ],

        headerRight: () => <HeaderRight userImage={userImage} />,
        headerLeft: () => <HeaderLeft />,
      }}
    >
      <Tabs.Screen
        name="friends"
        options={{
          title: "FRIENDS",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-friends" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "YOUR TAGS",
          tabBarIcon: ({ color }) => (
            <AntDesign name="tags" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: "HELP",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-help-buoy" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabs: {
    // backgroundColor: v.mainBackgroud,
  },
  headerStyle: {
    // backgroundColor: isDark ? v.mainColor : v.mainColorDarkened,
  },
});
