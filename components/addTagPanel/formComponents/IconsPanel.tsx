import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { iconCategories } from "../../../assets/iconsRegister";
import tagItem from "../../../functions/tagItem";
import { variables as v } from "../../../assets/globalVariables";

interface Props {
  onIconPress: (arg0: string) => void;
  icons: string[];
}

export default function IconsPanel({ onIconPress, icons }: Props) {
  const specs = [
    {
      wrapperPosition: styles.imagesWrapper,
      headerOpacity: 1,
      keyComponent: (icon: string) => (
        <Image
          source={tagItem(icon)?.image}
          style={[styles.iconImage, styles.iconElement]}
          resizeMode="contain"
        />
      ),
    },
    {
      wrapperPosition: styles.pressablesWrapper,
      headerOpacity: 0,
      keyComponent: (icon: string, onIconPress: (arg0: string) => void) => (
        <Pressable
          style={[styles.iconElement]}
          onPress={() => {
            console.log(icon);
            onIconPress(icon);
          }}
        />
      ),
    },
  ];

  return (
    <View style={styles.wrapper}>
      {specs.map((spec, index) => (
        <View style={spec.wrapperPosition} key={index}>
          {iconCategories.map((iconCategory, index) => (
            <View key={index}>
              <View
                style={[
                  {
                    flexDirection: "row",
                    margin: 15,
                    padding: 5,
                    opacity: spec.headerOpacity,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  styles.headerWrapper,
                ]}
              >
                {spec.headerOpacity ? (
                  <Image
                    source={tagItem(iconCategory.sectionHeaderImage)?.image}
                    style={[styles.categoryImage, styles.iconImage]}
                  />
                ) : (
                  <View style={[styles.categoryImage, { margin: 1 }]} />
                )}
                <Text>{iconCategory.sectionName}</Text>
              </View>
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {iconCategory.data.map((icon, index) => (
                  <View
                    style={[
                      styles.iconWrapper,
                      styles.iconElement,
                      spec.headerOpacity
                        ? icons.includes(icon)
                          ? styles.washIconClicked
                          : styles.washIconUnclicked
                        : null,
                    ]}
                    key={index}
                  >
                    {spec.keyComponent(icon, onIconPress)}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: "green",
    borderWidth: 1,
    width: Dimensions.get("window").width * 0.83,
    paddingBottom: 20,
    alignSelf: "center",
    borderRadius: 10,
  },
  categoryImage: {
    width: 30,
    height: 30,
    // backgroundColor: "yellow",
    // overflow: "hidden",
  },
  headerWrapper: {
    width: "90%",
    // borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  iconWrapper: {
    margin: 5,
    borderRadius: 10,
  },
  iconElement: {
    width: 40,
    height: 40,
  },
  iconImage: {
    borderWidth: 0,
    margin: 1,
    alignSelf: "center",
    // backgroundColor: "yellow",
    transform: [{ scaleX: 4 }, { scaleY: 4 }],
  },
  iconImageWrapper: {
    width: 20,
    height: 20,
    margin: 1,
    backgroundColor: "transparent",
  },
  imagesWrapper: {
    position: "relative",
  },
  pressablesWrapper: {
    position: "absolute",
  },
  washIconClicked: {
    borderWidth: 2,
    backgroundColor: v.mainColorHalfTransparent1,
    borderBlockColor: v.mainColor1,
    borderLeftColor: v.mainColor1,
    borderRightColor: v.mainColor1,
  },
  washIconUnclicked: {
    borderWidth: 1,
    backgroundColor: v.halfTransparent,
    borderBlockColor: "black",
    borderLeftColor: "black",
    borderRightColor: "black",
  },
});
