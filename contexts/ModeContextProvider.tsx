import { View, Text, StyleSheet } from "react-native";
import React, {
  Children,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { variables } from "../assets/globalVariables";
import NetInfo from "@react-native-community/netinfo";
import {
  getSystemModeFromDB,
  getSystemModeSetStateFromDB,
} from "../functions/asyncStorage";

export default function ModeContextProvider({ children }: PropsWithChildren) {
  const [isDark, setDark] = useState(false);

  useEffect(() => {
   getSystemModeSetStateFromDB(setDark);
  }, []);

  return (
    <ModeContext.Provider
      value={{
        isDark: isDark,
        setDark: setDark,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
} 
export const ModeContext = createContext({
  isDark: false,
  setDark: (value: React.SetStateAction<boolean>) => console.log("darkmode"),
});
