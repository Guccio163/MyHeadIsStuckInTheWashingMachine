import { StyleSheet} from "react-native";
import LoremScroll from "./components/LoremScrl";
import TagListPage from "./components/mainPages/TagListPage";
import FriendListPage from "./components/mainPages/FriendListPage";
import ScrollableHome from "./components/ScrollableHome";
import Icon from "react-native-vector-icons/FontAwesome";
import UserInfoPage from "./components/UserInfoPage";
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
    <>
      <NavigationContainer>
        <ScrollableHome
          children={[
            <TagListPage />,
            <FriendListPage />,
            <LoremScroll />,
            <UserInfoPage />,
          ]}
          navIcons={icons}
        />
      </NavigationContainer>
    </>
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
