import { Button, StyleSheet } from "react-native";
import HelpPage from "./components/mainPages/HelpPage";
import TagsPage from "./components/mainPages/TagsPage";
import FriendsPage from "./components/mainPages/FriendsPage";
import ScrollableHome from "./components/ScrollableHome";
import Icon from "react-native-vector-icons/FontAwesome";
import UserPage from "./components/mainPages/UserPage";
import React from "react";
import "expo-router/entry";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();

  const icons = [
    <Icon name="tags" size={30} color="black" />,
    <Icon name="group" size={30} color="black" />,
    <Icon name="support" size={30} color="black" />,
    <Icon name="user-circle" size={30} color="black" />,
  ];

  return (
    <ScrollableHome
      children={[<TagsPage />, <FriendsPage />, <HelpPage />, <UserPage />]}
      navIcons={icons}
      key={0}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
