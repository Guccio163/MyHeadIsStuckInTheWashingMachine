import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Cat from "./components/Cat";
import LoremScroll from "./components/LoremScrl";
import EmployeeList from "./components/EmployeeList";
import EmployeeSectionList from "./components/EmployeeSectionList";
import ScrollableHome from "./components/ScrollableHome";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function App() {

  const icons = [
    <Icon name="home" size={30} color="black" />,
    <Icon name="list" size={30} color="black" />,
    <Icon name="school" size={30} color="black" />,
    <Icon name="cat" size={30} color="black" />,
  ];

  return (
    <>
      <ScrollableHome
        children={[
          <EmployeeList />,
          <EmployeeSectionList />,
          <LoremScroll />,
          <Cat name="puszek" />,
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
