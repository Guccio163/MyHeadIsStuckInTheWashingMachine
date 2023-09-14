import { View, Text, StyleSheet } from "react-native";
import React, { Children, PropsWithChildren, createContext, useState } from "react";
import { variables } from "../assets/globalVariables";

export default function UserInfoContextProvider({ children }: PropsWithChildren) {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userImage, setUserImage] = useState("");

  return (
    <UserInfoContext.Provider
      value={{
        userName: userName,
        setUserName: setUserName,
        userPassword: userPassword,
        setUserPassword: setUserPassword,
        userImage: userImage,
        setUserImage: setUserImage,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

export const UserInfoContext = createContext({
  userName: "username",
  setUserName: (_arg0: string) => console.log("username"),
  userPassword: "userpassword",
  setUserPassword: (_arg0: string) => console.log("userpassword"),
  userImage: "userimage",
  setUserImage: (_arg0: string) => console.log("userimage"),
});
