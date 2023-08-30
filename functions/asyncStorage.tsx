import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tag } from "../components/addTagPanel/AddTagForm";

export const addItemToDB = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }

  console.log("adding item done.");
};

export const addTagToDB = async (object: Tag, refreshList: (arg0: string)=>void) => {
  try {
    const key = await getFromDB("tagCount");
    const tagArray = await getFromDB("tags");

    if (key != null && tagArray != null) {
      console.log(tagArray);
      object.id = key;
      let tagArrayParsed = JSON.parse(tagArray);
      tagArrayParsed.push(object);
      console.log(tagArrayParsed);
      const value = JSON.stringify(tagArrayParsed);
      await addItemToDB("tags", value);
      let newTagCount = parseInt(key) + 1;
      await addItemToDB("tagCount", `${newTagCount}`);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("adding tag done.");
  refreshList(object.id)
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

export const getTagSetState = async (
  key: string,
  setState: (arg0: Tag[]) => void
) => {
  try {
    const result = await AsyncStorage.getItem(key);
    if (result != null) {
      let resultParsed = JSON.parse(result)
      setState(resultParsed);
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

export const getAllKeysAndSetState = async (
  setState: (arg0: string[]) => void
) => {
  try {
    const result = await AsyncStorage.getAllKeys();
    if (result != null) {
      let temp = [...result];
      setState(temp);
    }
  } catch (e) {
    console.log(e);
  }

  console.log("getting all keys done.");
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
  console.log("Removing done.");
};

export const removeTag = async (key: string) => {
  try {
    const tagArray = await getFromDB("tags");

    if (tagArray != null) {
      console.log(tagArray);
      let tagArrayParsed = JSON.parse(tagArray);
      let newTagArray = tagArrayParsed.filter(
        (e: { id: string }) => e.id !== key
      );
      console.log(newTagArray);
      const value = JSON.stringify(newTagArray);
      addItemToDB("tags", value);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("adding tag done.");
};
