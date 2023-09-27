import React, { useContext, useEffect, useState } from "react";
import { Stack } from "expo-router";
import UserInfoContextProvider from "../contexts/UserInfoContextProvider";
import NetInfo from "@react-native-community/netinfo";
import ModeContextProvider, { ModeContext } from "../contexts/ModeContextProvider";
import { variables as v } from "../assets/globalVariables";

export default function _layout() {

  // const [isConnected, setConnected] = useState(true);
  const { isDark } = useContext(ModeContext);

  useEffect(()=>{
    console.log('tryb ciemny:', isDark)
  },[isDark])


  return (
    <ModeContextProvider>
      <UserInfoContextProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: isDark ? v.mainColorDarkened : v.mainColor,
            },
            headerTintColor: isDark ? v.mainColor : v.mainColorDarkened,
          }}
        >
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen
            name="addtag"
            options={{ headerShown: false, presentation: "formSheet" }}
          />
          <Stack.Screen
            name="settings"
            options={{
              headerShown: true,
              presentation: "card",
              headerStyle: {
                backgroundColor: isDark ? v.mainColorDarkened : v.mainColor,
              },
              headerTintColor: isDark ? v.mainColor : 'black',
            }}
          />
          <Stack.Screen
            name="user"
            options={{
              headerShown: true,
              presentation: "card",
              headerStyle: {
                backgroundColor: isDark ? v.mainColorDarkened : v.mainColor,
              },
              headerTintColor: isDark ? v.mainColor : v.mainColorDarkened,
            }}
          />
          <Stack.Screen
            name="settingsDark"
            options={{
              headerShown: true,
              presentation: "card",
              headerStyle: {
                backgroundColor: v.mainColorHeavyDarkened,
              },
              headerTintColor: v.mainColor,
            }}
          />
          <Stack.Screen
            name="userDark"
            options={{
              headerShown: true,
              presentation: "card",
              headerStyle: {
                backgroundColor: v.mainColorHeavyDarkened,
              },
              headerTintColor: v.mainColor,
            }}
          />
        </Stack>
      </UserInfoContextProvider>
    </ModeContextProvider>
  );
}
