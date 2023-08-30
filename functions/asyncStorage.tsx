import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tag } from "../components/addTagPanel/AddTagForm";

export const addToDB = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }

  console.log("adding done.");
};

export const addTagToDB = async (object: Tag) => {
  try {
    const key = await getFromDB("tagCount");
    if (key != null) {
      object.id = key;
      const value = JSON.stringify(object);
      addToDB(key, value);
      let newTagCount = parseInt(key) + 1;
      addToDB("tagCount", `${newTagCount}`);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("adding done.");
};

export const getFromDB = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }

  console.log("getting done.");
};

export const getFromDBandSetState = async (
  key: string,
  setState: (arg0: string) => void
) => {
  try {
    const result = await AsyncStorage.getItem(key);
    if (result != null) {
      setState(result);
    }
  } catch (e) {
    console.log(e);
  }

  console.log("getting done.");
};

export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log(e);
  }

  console.log("getting all keys done.");
};
