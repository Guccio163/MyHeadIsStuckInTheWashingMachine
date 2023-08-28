import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import NavBarIcon from "./NavBarIcon";
import { mainColor1 } from "./PageTitle";

interface Props {
  children: JSX.Element[];
  navIcons: JSX.Element[];
}

export default function ScrollableHome({ children, navIcons }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<any>();

  const onPress = (targetIndex: number) => () => {
    scrollRef.current?.scrollTo({
      x: Dimensions.get("window").width * targetIndex,
    });
    setActiveIndex(targetIndex);
  };

  const onMomentumScrollEnd = (e: any) => {
    const { nativeEvent } = e;
    const index = Math.round(
      nativeEvent.contentOffset.x / Dimensions.get("window").width
    );
    if (index !== activeIndex) setActiveIndex(index);
  };

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });
     }, []);

  return (
    <>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        ref={scrollRef}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {children.map((child, index) => (
          <View key={index} style={styles.childDiv}>
            {child}
          </View>
        ))}
      </ScrollView>
      {!isKeyboardOpen ? <View style={{ backgroundColor: "#89A6FB", display: isKeyboardOpen ? 'none' : 'flex'  }}>
        <View style={styles.navBar}>
          {navIcons.map((icon, index) => (
            <>
              <NavBarIcon
                active={activeIndex === index}
                onPress={onPress(index)}
                icon={icon}
              ></NavBarIcon>
            </>
          ))}
        </View>
      </View> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  childDiv: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#89A6FB",
  },
  navBar: {
    height: 60,
    backgroundColor: mainColor1,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});
