import React from 'react'
import { Stack } from 'expo-router'
import UserInfoContextProvider from '../contexts/UserInfoContextProvider'

export default function _layout() {
  return (
    <UserInfoContextProvider>
      <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen
          name="addtag"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack>
    </UserInfoContextProvider>
  );
}