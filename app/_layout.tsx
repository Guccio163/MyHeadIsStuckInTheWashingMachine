import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import UserInfoContextProvider from '../contexts/UserInfoContextProvider'

export default function _layout() {
  return (
    <UserInfoContextProvider>
      <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen
          name="addTagPanel"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack>
    </UserInfoContextProvider>
  );
}