import { StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { Tabs } from "expo-router";
import { variables as v } from "../../assets/globalVariables";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { UserInfoContext } from "../../contexts/UserInfoContextProvider";
import { getUserInfoSetStateFromDB } from "../../functions/asyncStorage";
import HeaderRight from "../../components/HeaderRight";
import HeaderLeft from "../../components/HeaderLeft";

export default function _tabsLayout() {
  const {
    setUserID,
    setUserEmail,
    setUserName,
    setUserPassword,
    userImage,
    setUserImage,
  } = useContext(UserInfoContext);

  useEffect(() => {
    getUserInfoSetStateFromDB(
      setUserID,
      setUserName,
      setUserEmail,
      setUserPassword,
      setUserImage
    );
    console.log("[TabsLayout] ACTUALISING...");
  }, []);

  return (
    <Tabs
      sceneContainerStyle={styles.tabs}
      screenOptions={{
        tabBarActiveTintColor: v.mainColor,
        headerStyle: styles.headerStyle,
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
    backgroundColor: v.mainBackgroud,
  },
  headerStyle: {
    backgroundColor: v.mainColor,
  },
});
