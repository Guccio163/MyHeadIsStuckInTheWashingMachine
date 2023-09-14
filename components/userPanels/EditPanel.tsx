import { View, Text } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../app/user";
import CustomButton from "../CustomButton";

export default function EditPanel() {
  const { setLoading, setChanging, styles } = useContext(UserContext);

  return (
    <CustomButton
      title="EDIT"
      onPress={() => {
        console.log("miał😼");
        setChanging(false);
      }}
      style={styles.button}
    />
  );
}
