import { View, Text, StyleSheet } from "react-native";
import React, {
  Children,
  PropsWithChildren,
  createContext,
  useState,
} from "react";
import { variables } from "../assets/globalVariables";

export default function UserInfoContextProvider({
  children,
}: PropsWithChildren) {
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userImage, setUserImage] = useState("");

  return (
    <UserInfoContext.Provider
      value={{
        userID: userID,
        setUserID: setUserID,
        userName: userName,
        setUserName: setUserName,
        userEmail: userEmail,
        setUserEmail: setUserEmail,
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
  userID: "userid",
  setUserID: (_arg0: string) => console.log("userid"),
  userName: "username",
  setUserName: (_arg0: string) => console.log("username"),
  userEmail: "email",
  setUserEmail: (_arg0: string) => console.log("email"),
  userPassword: "userpassword",
  setUserPassword: (_arg0: string) => console.log("userpassword"),
  userImage: "userimage",
  setUserImage: (_arg0: string) => console.log("userimage"),
});
