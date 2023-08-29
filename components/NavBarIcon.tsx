import { Pressable } from 'react-native'
import React from 'react'

interface Props{
    icon: JSX.Element,
    onPress: ()=> void,
    active: boolean,
}


export default function NavBarIcon({icon, onPress, active}:Props) {
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
