import { View, Text, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'



interface Props {
  title: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
  disabled?: boolean
}

export default function CustomButton({title, onPress, style, disabled}:Props) {
  return (
    <Pressable style={style} onPress={onPress} disabled={disabled}>
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