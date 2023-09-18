import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tag } from "../components/addTagPanel/AddTagForm";

///////// ADD

export async function addItemToDB(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
  console.log("[addItemToDB DONE]");
}

export async function addUserInfoToDB(object: {
  userID: string;
  username: string;
  password: string;
  email: string;
}) {
  try {
    const userInfo = await getItem("userInfo");
    if (userInfo == null) {
      await addItemToDB("userInfo", "{}");
      console.log("w basie nie było wcześniej danych");
      addUserInfoToDB(object);
      console.log("trying to add userInfo after preparing env");
    } else {
      let userInfoParsed = JSON.parse(userInfo);
      userInfoParsed.userID = object.userID;
      userInfoParsed.username = object.username;
      userInfoParsed.password = object.password;
      userInfoParsed.email = object.email;
      const updatedInfoStringified = JSON.stringify(userInfoParsed);
      await addItemToDB("userInfo", updatedInfoStringified);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("[addUserInfoToDB DONE]");
}

export async function addUserImageToDB(imageUri: string) {
  try {
    const userInfoStringified = await getItem("userInfo");
    if (userInfoStringified != null) {
      const userInfoParsed = JSON.parse(userInfoStringified);
      userInfoParsed.image = imageUri;
      const updatedInfoStringified = JSON.stringify(userInfoParsed);
      await addItemToDB("userInfo", updatedInfoStringified);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("[addUserImageToDB DONE]");
}

export async function addTagToDB(tag: Tag) {
  try {
    const tagCount = await getItem("tagCount");
    const tagArray = await getItem("tags");

    if (tagCount == null || tagArray == null) {
      if (tagCount == null) {
        await addItemToDB("tagCount", "0");
        console.log("tagCount wasn't declared, fixed");
      }
      if (tagArray == null) {
        await addItemToDB("tags", "[]");
        console.log("tagArray wasn't declared, fixed");
      }
      addTagToDB(tag);
      console.log("adding tag after preparing db");
    } else {
      tag.id = tagCount;
      let newTagCount = parseInt(tagCount) + 1;
      await addItemToDB("tagCount", `${newTagCount}`);

      let tagArrayParsed = JSON.parse(tagArray);
      tagArrayParsed.push(tag);
      const tagArrayStringified = JSON.stringify(tagArrayParsed);
      await addItemToDB("tags", tagArrayStringified);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("[addTagToDB DONE]");
}

///////// EDIT

export async function editTagInDB(tag: Tag) {
  try {
    const tagArray = await getItem("tags");

    if (tagArray != null) {
      let tagArrayParsed = JSON.parse(tagArray);
      let newTagArrayParsed = tagArrayParsed.map((item: Tag) => {
        if (item.id == tag.id) {
          return tag;
        }
        return item;
      });
      const tagArrayStringified = JSON.stringify(newTagArrayParsed);
      await addItemToDB("tags", tagArrayStringified);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("[editTagInDB DONE]");
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
  setIDState: (arg0: string) => void,
  setNameState: (arg0: string) => void,
  setEmailState: (arg0: string) => void,
  setPasswordState: (arg0: string) => void,
  setImageState: (arg0: string) => void
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
      setIDState(resultParsed.userID);
      setNameState(resultParsed.username);
      // console.log("[getUserInfoSetState]: ", usrnm);
      setEmailState(resultParsed.email);
      // console.log("[getUserInfoSetState]: ", usrnm);
      setPasswordState(resultParsed.password);
      // console.log("[getUserInfoSetState]: ", psswrd);
      setImageState(resultParsed.image);
      console.log("[getUserInfoSetState]: ", resultParsed);
    }
  }

  console.log("[getUserInfoSetState]: getting userInfo from db done.");
}

export async function getUserImageSetState(
  setImageState: (arg0: string) => void
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
      // console.log("[getUserInfoSetState]: ", psswrd);
      setImageState(resultParsed.image);
      console.log("[getUserInfoSetState]: ", resultParsed);
    }
  }
  console.log("[getUserInfoSetState]: getting userInfo from db done.");
}

export async function addUserInfoTemplate(setID: (arg0: string) => void) {
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
      // console.log("[getUserInfoSetState]: ", psswrd);
      setID(resultParsed.id);
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

///////// DELETE

export const deleteItemFromDB = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
  console.log("[deleteItemFromDB DONE]");
};

export const deleteTagFromDB = async (key: string) => {
  try {
    const tagArray = await getItem("tags");

    if (tagArray != null) {
      let tagArrayParsed = JSON.parse(tagArray);
      let newTagArray = tagArrayParsed.filter((e: Tag) => e.id != key);
      const value = JSON.stringify(newTagArray);
      addItemToDB("tags", value);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("[deleteTagFromDB DONE]");
};
