import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Cat from "./components/Cat";
import LoremScroll from "./components/LoremScrl";
import EmployeeList from "./components/EmployeeList";
import EmployeeSectionList from "./components/EmployeeSectionList";
import ScrollableHome from "./components/ScrollableHome";
import Icon from "react-native-vector-icons/FontAwesome";
import UserInfoPage from "./components/UserInfoPage";

export default function App() {

  const icons = [
    <Icon name="tags" size={30} color="black" />,
    <Icon name="group" size={30} color="black" />,
    <Icon name="support" size={30} color="black" />,
    <Icon name="user-circle" size={30} color="black" />,
  ];

  return (
    <>
      <ScrollableHome
        children={[
          <EmployeeList />,
          <EmployeeSectionList />,
          <LoremScroll />,
          <UserInfoPage/>
        ]}
        navIcons={icons}
      />
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
