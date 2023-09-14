import { View, Text, TextInput, Pressable } from "react-native";
import React, { Children, useContext, useEffect, useState } from "react";
import { UserContext } from "../../app/user";
import CustomButton from "../CustomButton";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import CountDown from "react-native-countdown-component";
import { variables } from "../../assets/globalVariables";
import Clock from "../useClock";
import useClock from "../useClock";
import {
  generateCode,
  generateCodeSetState,
  sendAuthCode,
} from "../../functions/login";

export default function registerPanel() {
  const { setLogged, setChanging, isLoading, setLoading, styles } =
    useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");



  function arePasswordsIdentic() {
    return password == passwordRepeat && password != "";
  }

  return (
    <>
      <View style={styles.userInfoContainer}>
        <TextInput
          style={styles.userInfoText}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        ></TextInput>
      </View>
      <View
        style={[
          styles.userInfoContainer,
          arePasswordsIdentic()
            ? null
            : {
                borderBlockColor: "rgba(200, 0, 0, 1)",
                borderRightColor: "rgba(200, 0, 0, 1)",
                borderLeftColor: "rgba(200, 0, 0, 1)",
                backgroundColor: "rgba(255, 0, 0, 0.3)",
                borderWidth: 2,
              },
        ]}
      >
        <TextInput
          style={styles.userInfoText}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
      </View>
      <View
        style={[
          styles.userInfoContainer,
          arePasswordsIdentic()
            ? null
            : {
                borderBlockColor: "rgba(200, 0, 0, 1)",
                borderRightColor: "rgba(200, 0, 0, 1)",
                borderLeftColor: "rgba(200, 0, 0, 1)",
                backgroundColor: "rgba(255, 0, 0, 0.3)",
                borderWidth: 2,
              },
        ]}
      >
        <TextInput
          style={styles.userInfoText}
          placeholder="Repeat password"
          onChangeText={(text) => setPasswordRepeat(text)}
        ></TextInput>
      </View>
      <CustomButton
        title="REGISTER"
        disabled={isLoading}
        onPress={async () => {
          console.log("miał😼");
          if (arePasswordsIdentic()) setLoading(true);
          console.log("add to database");
        }}
        style={[
          styles.button,
          isLoading ? { backgroundColor: "rgba(200,200,200,1)" } : null,
        ]}
      />
      {isLoading ? <Text>LOADING...</Text> : null}
    </>
  );
}
