import { StyleSheet } from "react-native";
import HelpPage from "./components/mainPages/HelpPage";
import TagsPage from "./components/mainPages/TagsPage";
import FriendsPage from "./components/mainPages/FriendsPage";
import ScrollableHome from "./components/ScrollableHome";
import Icon from "react-native-vector-icons/FontAwesome";
import UserPage from "./components/mainPages/UserPage";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const icons = [
    <Icon name="tags" size={30} color="black" />,
    <Icon name="group" size={30} color="black" />,
    <Icon name="support" size={30} color="black" />,
    <Icon name="user-circle" size={30} color="black" />,
  ];

  return (
      <NavigationContainer>
        <ScrollableHome
          children={[<TagsPage />, <FriendsPage />, <HelpPage />, <UserPage />]}
          navIcons={icons}
        />
      </NavigationContainer>
  );
}

//XDDDD jestem teraz na scrollView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
