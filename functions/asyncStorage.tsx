import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tag } from "../components/addTagPanel/AddTagForm";
import React, { useContext } from "react";

///////// ADD

export async function addItem(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
  console.log("adding item done (usually tagArray).");
}

export async function addUserInfo(
  object: {
    username: string;
    password: string;
  },
  // setBuffering: (arg0: boolean) => void
) {
  try {
    const userInfoArray = await getItem("userInfo");

    if (userInfoArray == null) {
      await addItem("userInfo", "{}");
      console.log("w basie nie było wcześniej danych");
      addUserInfo(object);
      console.log("trying to add userInfo after preparing env");
    } else {
      const userInfoStringified = JSON.stringify(object);
      await addItem("userInfo", userInfoStringified);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("adding userInfo done.");
  // setBuffering(false);
}

export async function addTag(object: Tag) {
  try {
    const tagCount = await getItem("tagCount");
    const tagArray = await getItem("tags");

    if (tagCount == null || tagArray == null) {
      if (tagCount == null) {
        await addItem("tagCount", "0");
        console.log("tagCount nie było sprecyzowane, zdefiniowano");
      }
      if (tagArray == null) {
        await addItem("tags", "[]");
        console.log("baza nie była założona, założono");
      }
      addTag(object);
      console.log("trying to add tag after preparing env");
    } else {
      object.id = tagCount;
      let newTagCount = parseInt(tagCount) + 1;
      await addItem("tagCount", `${newTagCount}`);

      let tagArrayParsed = JSON.parse(tagArray);
      tagArrayParsed.push(object);
      const tagArrayStringified = JSON.stringify(tagArrayParsed);
      await addItem("tags", tagArrayStringified);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("adding tag done.");
}

///////// EDIT

export async function editTagInDB(object: Tag) {
  try {
    const tagArray = await getItem("tags");

    if (tagArray != null) {
      let tagArrayParsed = JSON.parse(tagArray);
      let newTagArrayParsed = tagArrayParsed.map((item: Tag) => {
        if (item.id == object.id) {
          return object;
        }
        return item;
      });
      const tagArrayStringified = JSON.stringify(newTagArrayParsed);
      await addItem("tags", tagArrayStringified);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("editing tag done.");
}

///////// GET

export const getItem = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
  console.log("getting item done.");
};

export const getItemSetState = async (
  key: string,
  setState: (arg0: string) => void
) => {
  try {
    const result = await getItem(key);
    if (result != null) {
      setState(result);
    }
  } catch (e) {
    console.log(e);
  }

  console.log("getting from db and setting state done.");
};

export const getTagsSetState = async (setState: (arg0: Tag[]) => void) => {
  try {
    const result = await getItem("tags");
    if (result != null) {
      let resultParsed = JSON.parse(result);
      setState(resultParsed);
    }
  } catch (e) {
    console.log(e);
  }

  console.log("getting tags from db done.");
};

export const getTagSetState = async (
  setState: (arg0: Tag) => void,
  tagId: string
) => {
  try {
    const result = await getItem("tags");
    if (result != null) {
      let resultParsed = JSON.parse(result);
      let resultTag = resultParsed.filter(
        (e: { id: string }) => e.id == tagId
      )[0];
      setState(resultTag);
    }
  } catch (e) {
    console.log(e);
  }

  console.log("getting tag from db done.");
};

export const getUserInfo = async () => {
  try {
    const result = await getItem("userInfo");
    if (result != null) {
      let resultParsed = JSON.parse(result);
      console.log(resultParsed);
      return resultParsed;
    }
  } catch (e) {
    console.log(e);
  }

  console.log("getting userInfo from db done.");
};

export async function getUserInfoSetState(
  setNameState: (arg0: string) => void,
  setPasswordState: (arg0: string) => void,
  usrnm:string, psswrd:string
) {
  let result = null;
  try {
    result = await getItem("userInfo");
    console.log("[getUserInfoSetState]: ", result);
  } catch (e) {
    console.log(e);
  } finally {
    if (result != null) {
      console.log(result);
      let resultParsed = JSON.parse(result);
      setNameState(resultParsed.username);
      console.log('[getUserInfoSetState]: ', usrnm);
      setPasswordState(resultParsed.password);
      console.log("[getUserInfoSetState]: ", psswrd);
      console.log("[getUserInfoSetState]: ", resultParsed);
    }
  }

  console.log("[getUserInfoSetState]: getting userInfo from db done.");
}

export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log(e);
  }

  console.log("getting all keys done.");
};

export const getAllKeysSetState = async (
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

  console.log("getting all keys and setting state done.");
};

///////// REMOVE

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
  console.log("Removing item done.");
};

export const removeTag = async (key: string) => {
  try {
    const tagArray = await getItem("tags");

    if (tagArray != null) {
      // console.log(tagArray);
      let tagArrayParsed = JSON.parse(tagArray);
      let newTagArray = tagArrayParsed.filter(
        (e: { id: string }) => e.id != key
      );
      // console.log(newTagArray);
      const value = JSON.stringify(newTagArray);
      addItem("tags", value);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("removing tag done.");
};
