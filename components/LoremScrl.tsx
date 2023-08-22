import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SectionList,
} from "react-native";
import React from "react";
import PageTitle from "./PageTitle";
import tagItem from "./tagItem";

// type tagHelp = {
//   name: string
//   description: string
// }

function getFilePath(suffix: string) {
  return "../assets/washIcons/" + suffix;
}

export default function LoremScroll() {
  const imagesFolderPath: string = "../assets/washIcons/";
  // const folder = require("../assets/washIcons")

  // const washArray = [{name: 'wash_not', description:'do not wash'}]
  const data = [
    {
      section: "Sposób prania",
      data: [
        "wash_machine",
        "wash_machine_press",
        "wash_machine_delicate",
        "wash_hand",
        "wash_not",
      ],
    },
    {
      section: "Sposób wybielania",
      data: [
        "bleach",
        "bleach_not",
        "bleach_non_cl",
        "bleach_non_cl_2",
      ],
    },
    // { section: "Dziewczyny", data: ["ania", "basia", "patrycja"] },
    // {
    //   section: "Zwierzęta",
    //   data: ["czołg tygrys", "azor", "t-rex"],
    // },
  ];



  return (
    <View style={{ width: "100%", height: "100%", flex: 1 }}>
      <PageTitle name="Pomoc" />
      <SectionList
      showsVerticalScrollIndicator={false}
        sections={data}
        renderItem={({ item, index }) => (
          <View style={styles.helpView} key={index}>
            <Image
              source={tagItem(item)?.image}
              style={styles.blankUserImage}
              resizeMode="center"
            />
            <Text
              style={{
                flexWrap: "wrap",
                maxWidth: "78%",
                alignSelf: 'center',
                // backgroundColor: "white",
              }}
            >
              {tagItem(item)?.description}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={{ fontStyle: "italic", fontSize: 20 }}>
            {section.section}
          </Text>
        )}
        style={{
          // maxHeight: "80%",
          minHeight: 150,
          // width: '100%',
          // marginTop: 80,
          marginLeft: 30,
          marginRight: 30,
          // borderColor: "black",
          // borderWidth: 2,
          flexWrap: "wrap",
          marginTop: 10,
          // alignSelf: "center",
        }}
      />
{/* 
      <ScrollView
        // pagingEnabled
        style={{
          // maxHeight: "80%",
          minHeight: 150,
          // width: '100%',
          // marginTop: 80,
          marginLeft: 30,
          marginRight: 30,
          borderColor: "black",
          borderWidth: 2,
          flexWrap: "wrap",
          marginTop: 10,
          // alignSelf: "center",
        }}
      > */}
        {/* <View style={styles.helpView}>
          <Image
            source={require(imagesFolderPath + "wash_machine.png")}
            style={styles.blankUserImage}
            resizeMode="center"
          />
          <Text
            style={{
              flexWrap: "wrap",
              maxWidth: "78%",
              // backgroundColor: "white",
            }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab tempora
            dolorum animi soluta mollitia. Repellendus magnam dolor, consequatur
            pariatur exercitationem maiores autem dolores assumenda veritatis,
            quis alias ex consectetur hic.
          </Text>
        </View>
        <View style={styles.helpView}>
          <Image
            source={require("../assets/washIcons/wash_machine_press.png")}
            style={styles.blankUserImage}
            resizeMode="center"
          />
          <Text style={{ display: "flex", flexWrap: "wrap", maxWidth: "78%" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab tempora
            dolorum animi soluta mollitia. Repellendus magnam dolor, consequatur
            pariatur exercitationem maiores autem dolores assumenda veritatis,
            quis alias ex consectetur hic.
          </Text>
        </View>
        <View style={styles.helpView}>
          <Image
            source={require("../assets/washIcons/wash_machine_delicate.png")}
            style={styles.blankUserImage}
            resizeMode="center"
          />
          <Text style={{ display: "flex", flexWrap: "wrap", maxWidth: "78%" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab tempora
            dolorum animi soluta mollitia. Repellendus magnam dolor, consequatur
            pariatur exercitationem maiores autem dolores assumenda veritatis,
            quis alias ex consectetur hic.
          </Text>
        </View>
        <View style={styles.helpView}>
          <Image
            source={require("../assets/washIcons/wash_hand.png")}
            style={styles.blankUserImage}
            resizeMode="center"
          />
          <Text style={{ display: "flex", flexWrap: "wrap", maxWidth: "78%" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab tempora
            dolorum animi soluta mollitia. Repellendus magnam dolor, consequatur
            pariatur exercitationem maiores autem dolores assumenda veritatis,
            quis alias ex consectetur hic.
          </Text>
        </View>
        <View style={styles.helpView}>
          <Image
            source={require("../assets/washIcons/wash_not.png")}
            style={styles.blankUserImage}
            resizeMode="center"
          />
          <Text style={{ display: "flex", flexWrap: "wrap", maxWidth: "78%" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab tempora
            dolorum animi soluta mollitia. Repellendus magnam dolor, consequatur
            pariatur exercitationem maiores autem dolores assumenda veritatis,
            quis alias ex consectetur hic.
          </Text>
        </View> */}
        {/* <View style={styles.helpView}>
          <Image
            source={require("../assets/washIcons/bleach.png")}
            style={styles.blankUserImage}
            resizeMode="center"
          />
          <Text style={{ display: "flex", flexWrap: "wrap", maxWidth: "78%" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab tempora
            dolorum animi soluta mollitia. Repellendus magnam dolor, consequatur
            pariatur exercitationem maiores autem dolores assumenda veritatis,
            quis alias ex consectetur hic.
          </Text>
        </View>
        <View style={styles.helpView}>
          <Image
            source={require("../assets/washIcons/bleach_not.png")}
            style={styles.blankUserImage}
            resizeMode="center"
          />
          <Text style={{ display: "flex", flexWrap: "wrap", maxWidth: "78%" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab tempora
            dolorum animi soluta mollitia. Repellendus magnam dolor, consequatur
            pariatur exercitationem maiores autem dolores assumenda veritatis,
            quis alias ex consectetur hic.
          </Text>
        </View>
        <View style={styles.helpView}>
          <Image
            source={require("../assets/washIcons/bleach_non_cl.png")}
            style={styles.blankUserImage}
            resizeMode="center"
          />
          <Text style={{ display: "flex", flexWrap: "wrap", maxWidth: "78%" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab tempora
            dolorum animi soluta mollitia. Repellendus magnam dolor, consequatur
            pariatur exercitationem maiores autem dolores assumenda veritatis,
            quis alias ex consectetur hic.
          </Text>
        </View>
        <View style={styles.helpView}>
          <Image
            source={require("../assets/washIcons/bleach_non_cl_2.png")}
            style={styles.blankUserImage}
            resizeMode="center"
          />
          <Text style={{ display: "flex", flexWrap: "wrap", maxWidth: "78%" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab tempora
            dolorum animi soluta mollitia. Repellendus magnam dolor, consequatur
            pariatur exercitationem maiores autem dolores assumenda veritatis,
            quis alias ex consectetur hic.
          </Text>
        </View>
      </ScrollView> */}
    </View>
  );
}
const styles = StyleSheet.create({
  blankUserImage: {
    borderWidth: 0,
    margin: 6,
    width: 50,
    height: 50,
    borderRadius: 100,
    // height: Dimensions.get('window').height * 0.15,
    backgroundColor: "transparent",
    alignSelf: "center",
    // fontSize: 50,
    transform: [{ scaleX: 3 }, { scaleY: 3 }, { translateY: 1 }],
  },
  helpView: {
    flexDirection: "row",
    margin: 10,
    // backgroundColor: 'white',
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
});
