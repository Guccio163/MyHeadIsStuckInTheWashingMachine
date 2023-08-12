import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Cat from "./components/Cat";
import LoremScroll from "./components/LoremScrl";
import EmployeeList from "./components/EmployeeList";
import EmployeeSectionList from "./components/EmployeeSectionList";
import ScrollableHome from "./components/ScrollableHome";

export default function App() {
  return (
    <>
      {/* <View style={styles.container}> */}
        {/* <Text>Open up App.tsx to start working on your app!</Text> */}
        {/* <Cat name={"Puszek"} />
        <Cat name={"Okruszek"} />
        <Cat name={"Debil"} /> */}
        {/* <loremScroll/> */}
        {/* <StatusBar style="auto" />
        <LoremScroll />
        <View>
          <EmployeeList />
          <EmployeeSectionList/>
        </View>
      </View> */}
      <ScrollableHome children={[<EmployeeList/>,<EmployeeSectionList/>]} />
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
