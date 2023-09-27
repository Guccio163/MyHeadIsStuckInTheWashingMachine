import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { friend } from "../app/(home)/friends";
import { variables as v } from "../assets/globalVariables";
import { ModeContext } from "../contexts/ModeContextProvider";
import { AntDesign } from "@expo/vector-icons";
import { getSearchedUsersFromFirebaseSetState } from "../functions/firebaseFunctions";

interface Props {
  setFound: (value: React.SetStateAction<friend[]>) => void;
  phrase: string;
  setPhrase: (value: React.SetStateAction<string>) => void;
}

export default function FriendsSearch({ setFound, phrase, setPhrase }: Props) {
  //   function addRecord() {
  //     setFound((found) => [
  //       ...found,
  //       { name: "kij", userID: "kij", email: "kij" },
  //     ]);
  //     console.log("pressed");
  //   }
  const { isDark } = useContext(ModeContext);

  let textColor = { color: isDark ? v.mainColor : "black" };

  function findSearched() {
    getSearchedUsersFromFirebaseSetState(setFound, phrase);
  }

  return (
    <View style={styles.componentWrapper}>
      <View
        style={[
          styles.searchInput,
          {
            backgroundColor: isDark
              ? v.mainColor
              : v.mainColorQuarterTransparent,
          },
        ]}
      >
        <TextInput
          placeholder="search friends"
          style={{ fontSize: 25 }}
          onChangeText={(text) => {
            setPhrase(text);
            if(!text){
                setFound([])
            }
          }}
        />
      </View>
      <Pressable style={styles.searchButton} onPress={findSearched}>
        <AntDesign name="search1" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  componentWrapper: {
    height: 50,
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 7,
    marginBottom: 4,
  },
  searchInput: {
    width: "84%",
    justifyContent: "center",
    paddingLeft: 8,
    borderRadius: 9,
    marginRight: "1%",
  },
  searchButton: {
    backgroundColor: v.mainColor,
    flexDirection: "row",
    width: "14%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    marginLeft: "1%",
  },
});
