import { View, Text, ImageComponent, Pressable, StyleSheet } from 'react-native'
import React from 'react'

interface Props{
    icon: JSX.Element,
    onPress: ()=> void,
    active: boolean,
}

interface Props2{
  icon: JSX.Element,
  color: string
}

const ChangeColorIcon = ({ icon, color }: Props2) => {
  return React.cloneElement(icon, { color });
};

export default function NavBarIcons({icon, onPress, active}:Props) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={{ backgroundColor: "transparent" }}
    >
      {React.cloneElement(icon, {color: active ? 'white' : 'black'})}
    </Pressable>
  );
}
