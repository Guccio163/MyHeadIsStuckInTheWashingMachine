import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import NavBarIcon from "../../components/NavBarIcon";
import { variables as v } from "../../assets/globalVariables";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native";
import { UserInfoContext } from "../../contexts/UserInfoContextProvider";
import UserInfoPage from "../user";
import { getUserInfoSetState } from "../../functions/asyncStorage";

export default function chuj() {
  const navi = useRouter();
  const {
    setUserID,
    setUserEmail,
    userName,
    setUserName,
    userPassword,
    setUserPassword,
    userImage,
    setUserImage,
  } = useContext(UserInfoContext);

  useEffect(() => {
    getUserInfoSetState(setUserID, setUserName, setUserEmail, setUserPassword, setUserImage);
    console.log("ACTUALISING...");
  }, []);

  return (
    <Tabs
      sceneContainerStyle={styles.tabs}
      screenOptions={{
        tabBarActiveTintColor: v.mainColor,
        headerStyle: styles.headerStyle,
        headerRight: () => (
          <View style={{ height: 45, width: 45, paddingRight: 8 }}>
            <Pressable
              style={[
                styles.userImageWrapper,
                {
                  borderWidth: 0.5,
                  borderBlockColor: v.mainBackgroud,
                  borderLeftColor: v.mainBackgroud,
                  borderRightColor: v.mainBackgroud,
                  backgroundColor: "rgba(180,180,180,1)",
                },
              ]}
              onPress={() => navi.push("user")}
            >
              {userImage ? (
                <Image source={{ uri: userImage }} style={styles.image} />
              ) : (
                <FontAwesome
                  name="user"
                  size={30}
                  color={"rgba(120,120,120,1)"}
                />
              )}
            </Pressable>
          </View>
        ),
        headerLeft: () => (
          <View style={{ height: 45, width: 45, paddingLeft: 8 }}>
            <Pressable
              style={styles.userImageWrapper}
              onPress={() => navi.push("settings")}
            >
              <Ionicons
                name="settings-sharp"
                size={24}
                color={v.mainBackgroud}
              />
            </Pressable>
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
  image: {
    // height: 100,
    // width: 100,
    // borderRadius: 10,
    // alignSelf: "center",
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "transparent",
    alignSelf: "center",
    // transform: [{ scaleX: 1 }, { scaleY: 1 }, { translateY: 2 }],
    overflow: "hidden",
  },
});
