import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import NavBarIcon from '../../components/NavBarIcon';
import { varibales as v} from '../../assets/globalVariables';

export default function chuj() {
  return (
    <Tabs sceneContainerStyle={styles.tabs}>
      <Tabs.Screen name="tags" options={{ headerStyle: styles.headerStyle }} />
      <Tabs.Screen
        name="friends"
        options={{ headerStyle: styles.headerStyle }}
      />
      <Tabs.Screen name="help" options={{ headerStyle: styles.headerStyle }} />
      <Tabs.Screen name="user" options={{ headerStyle: styles.headerStyle }} />
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