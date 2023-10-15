import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { variables } from "../../assets/globalVariables";
import {
  getImageUrlFromFirebaseSetState,
  addRequestInFirebase,
  addFriendInFirebase,
  deleteRequestInFirebase,
  
} from "../../functions/firebaseFunctions";
import { UserInfoContext } from "../../contexts/UserInfoContextProvider";
import { useRouter } from "expo-router";

interface Props {
  id: string;
  name: string;
  email: string;
  type: string;
}

export default function FriendElement({ id, name, email, type }: Props) {
  let buttons = null;
  const { userID, userName, userEmail } = useContext(UserInfoContext);
  const navi = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  if (type != "friends") {
    buttons =
      type == "requests" ? (
        <>
          <Pressable
            style={styles.buttonWrapper}
            onPress={() => {
              deleteRequestInFirebase(userID, id);
              console.log(userID, id, name, email);
            }}
          >
            <AntDesign name="close" size={45} color="red" />
          </Pressable>
          <Pressable
            style={styles.buttonWrapper}
            onPress={() => {
              addFriendInFirebase(userID, id, name, email);
              addFriendInFirebase(id, userID, userName, userEmail);
              deleteRequestInFirebase(userID, id);
              console.log(userID, id, name, email);
            }}
            //ZROBIĆ ŻEBY TEŻ ZNIKAŁO Z REQUESTÓW I DODAWAŁO SIĘ TEŻ U TEGO DRUGIEGO
          >
            <Feather name="check" size={45} color="green" />
          </Pressable>
        </>
      ) : (
        <Pressable
          style={styles.buttonWrapper}
          onPress={() => addRequestInFirebase(id, userID, userName, userEmail)}
        >
          <AntDesign
            name="plus"
            size={45}
            color={variables.mainColorDarkened}
          />
        </Pressable>
      );
  }

  useEffect(() => {
    getImageUrlFromFirebaseSetState(id, setImageUrl);
    console.log("Fetching url for the id:", id)
  }, []);

  return (
    <Pressable
      style={styles.mainConstainer}
      onPress={() => {
        console.log("you pressed", name);
        navi.push(`friendtags?friendID=${id}&friendName=${name}`)
      }}
      disabled={type != "friends"}
    >
      <View style={styles.imageWrapper}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }} // Podstaw URL pliku
            style={{ height: "100%", width: "100%", borderRadius: 20 }} // Ustaw dowolne style
          />
        ) : (
          <FontAwesome name="user" size={60} color={variables.mainColor} />
        )}
      </View>
      <View
        style={[
          styles.textWrapper,
          { width: type == "requests" ? "45%" : "60%" },
        ]}
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      {buttons}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainConstainer: {
    flexDirection: "row",
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    height: 80,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    backgroundColor: variables.mainBackgroud,
  },
  imageWrapper: {
    width: "18.5%",
    height: "90%",
    margin: 4,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonWrapper: {
    width: "15%",
    height: "73%",
    margin: "1%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 15,
  },
  textWrapper: {
    paddingTop: 5,
  },
  name: {
    fontSize: 30,
  },
  email: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "200",
  },
});
