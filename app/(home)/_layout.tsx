import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import NavBarIcon from "../../components/NavBarIcon";
import { variables as v } from "../../assets/globalVariables";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function chuj() {
  return (
    <Tabs
      sceneContainerStyle={styles.tabs}
      screenOptions={{
        tabBarActiveTintColor: v.mainColor,
        headerStyle: styles.headerStyle,
        headerRight: () => (
          <View style={{ height: 45, width: 45, paddingRight: 8 }}>
            <View style={(styles.userImageWrapper)}>
              <FontAwesome name="user" size={30} color={v.mainBackgroud} />
            </View>
          </View>
        ),
        headerLeft: () => (
          <View style={{ height: 45, width: 45, paddingLeft: 8 }}>
            <View style={styles.userImageWrapper}>
              <Ionicons
                name="settings-sharp"
                size={24}
                color={v.mainBackgroud}
              />
            </View>
          </View>
        ),
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
      {/* <Tabs.Screen
        name="user"
        options={{
          title: "USER PROFILE",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
          
        }}
      /> */}
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
  userImageWrapper: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    overflow: "hidden",
  },
  settingsPressable: {},
});
