import { View, Text, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'



interface Props {
  title: string;
  onPress: () => void;
  myStyle: StyleProp<ViewStyle>;
}

export default function CustomButton({title, onPress, myStyle}:Props) {
  return (
    <Pressable style={myStyle} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderBlockColor: "black",
    borderWidth: 1,
    height: 30,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 3,
  },
  buttonText: {
    fontWeight: '800',
  },
});