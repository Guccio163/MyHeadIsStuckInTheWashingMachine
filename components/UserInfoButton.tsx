import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { mainColor1 } from "./PageTitle";

interface Props{
    name: string,
}

export default function UserInfoButton({name}: Props) {
  return (
    <View>
      <Pressable
        onPress={() => Alert.alert("Button with adjusted color pressed")}
        style={styles.button}
        accessibilityLabel="Learn more about this purple button"
      >
        <Text style={styles.buttonText}> {name}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: mainColor1,
    width: 300,
    height: 50,
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 25,
  }
});
