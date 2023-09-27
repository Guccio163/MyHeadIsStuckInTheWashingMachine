import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tag } from "../components/addTagPanel/AddTagForm";

/////////////////////////////
///////// ADD
/////////////////////////////

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
    const userInfo = await getItemFromDB("userInfo");
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
  console.log("[addUserInfoToDB DONE] userID:", object.userID);
}

export async function addUserImageToDB(imageUri: string) {
  try {
    const userInfoStringified = await getItemFromDB("userInfo");
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

export async function addSystemModeToDB(mode: boolean) {
  try {
    const systemSettings = await getItemFromDB("systemSettings");
    if (systemSettings == null) {
      await addItemToDB("systemSettings", "{}");
      console.log("w basie nie było wcześniej danych");
      addSystemModeToDB(mode);
      console.log("trying to add systemSettings after preparing env");
    } else {
      let systemSettingsParsed = JSON.parse(systemSettings);
      systemSettingsParsed.mode = mode;
      const updatedSystemSettingsStringified = JSON.stringify(systemSettingsParsed);
      await addItemToDB("systemSettings", updatedSystemSettingsStringified);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("[addSystemModeSetStateToDB DONE]");
}

// export async function addSystemModeToDB(mode: boolean) {
//   try {
//     const systemSettings = await getItemFromDB("systemSettings");
//     if (systemSettings != null) {
//       const systemSettingsParsed = JSON.parse(systemSettings);
//       systemSettingsParsed.mode = mode;
//       const systemSettingsStringified = JSON.stringify(systemSettingsParsed);
//       await addItemToDB("systemSettings", systemSettingsStringified);
//       console.log(systemSettingsStringified)
//     }
//   } catch (e) {
//     console.log(e);
//   }
//   console.log("[addSystemMode DONE]");

// }

export async function addTagToDB(tag: Tag) {
  let tagCount;
  try {
    tagCount = await getItemFromDB("tagCount");
    const tagArray = await getItemFromDB("tags");

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
  } finally {
    console.log("[addTagToDB DONE]");
    return tagCount;
  }
}

/////////////////////////////
///////// EDIT
/////////////////////////////

export async function editTagInDB(tag: Tag) {
  try {
    const tagArray = await getItemFromDB("tags");

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

/////////////////////////////
///////// GET
/////////////////////////////

export const getItemFromDB = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
  console.log("[getItemFromDB DONE]");
};

export const getItemSetStateFromDB = async (
  key: string,
  setState: (arg0: string) => void
) => {
  try {
    const result = await getItemFromDB(key);
    if (result != null) {
      setState(result);
    }
  } catch (e) {
    console.log(e);
  }

  console.log("[getItemSetState DONE]");
};

export const getTagsSetStateFromDB = async (
  setState: (arg0: Tag[]) => void
) => {
  try {
    const result = await getItemFromDB("tags");
    if (result != null) {
      let resultParsed = JSON.parse(result);
      setState(resultParsed);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("[getTagsSetStateFromDB DONE]");
};

export const getTagSetStateFromDB = async (
  setState: (arg0: Tag) => void,
  tagId: string
) => {
  try {
    const result = await getItemFromDB("tags");
    if (result != null) {
      let resultParsed = JSON.parse(result);
      let resultTag = resultParsed.filter((e: Tag) => e.id == tagId)[0];
      setState(resultTag);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("[getTagSetStateFromDB DONE]");
};

export const getUserInfoFromDB = async () => {
  try {
    const result = await getItemFromDB("userInfo");
    if (result != null) {
      let resultParsed = JSON.parse(result);
      console.log(resultParsed);
      return resultParsed;
    }
  } catch (e) {
    console.log(e);
  }
  console.log("[getUserInfoFromDB DONE]");
};

export async function getUserInfoSetStateFromDB(
  setIDState: (arg0: string) => void,
  setNameState: (arg0: string) => void,
  setEmailState: (arg0: string) => void,
  setPasswordState: (arg0: string) => void,
  // setImageState: (arg0: string) => void
) {
  let result = null;
  try {
    result = await getItemFromDB("userInfo");
  } catch (e) {
    console.log(e);
  } finally {
    if (result != null) {
      let resultParsed = JSON.parse(result);
      setIDState(resultParsed.userID);
      setNameState(resultParsed.username);
      setEmailState(resultParsed.email);
      setPasswordState(resultParsed.password);
      // setImageState(resultParsed.image);
    }
  }
  console.log("[getUserInfoSetStateFromDB DONE]");
}

export async function getUserInfoWithoutIDSetStateFromDB(
  setNameState: (arg0: string) => void,
  setEmailState: (arg0: string) => void,
  setPasswordState: (arg0: string) => void
  // setImageState: (arg0: string) => void
) {
  let result = null;
  try {
    result = await getItemFromDB("userInfo");
  } catch (e) {
    console.log(e);
  } finally {
    if (result != null) {
      let resultParsed = JSON.parse(result);
      setNameState(resultParsed.username);
      setEmailState(resultParsed.email);
      setPasswordState(resultParsed.password);
      // setImageState(resultParsed.image);
    }
  }
  console.log("[getUserInfoSetStateFromDB DONE]");
}

export async function getUserIDSetStateFromDB(
  setIDState: (arg0: string) => void,
) {
  let result = null;
  try {
    result = await getItemFromDB("userInfo");
  } catch (e) {
    console.log(e);
  } finally {
    if (result != null) {
      let resultParsed = JSON.parse(result);
      setIDState(resultParsed.userID);
    }
  }
  console.log("[getUserIDSetStateFromDB DONE]");
}

export async function getUserImageSetStateFromDB(
  setImageState: (arg0: string) => void
) {
  let result = null;
  try {
    result = await getItemFromDB("userInfo");
  } catch (e) {
    console.log(e);
  } finally {
    if (result != null) {
      let resultParsed = JSON.parse(result);
      setImageState(resultParsed.image);
    }
  }
  console.log("[getUserInfoSetState DONE]");
}

export async function getSystemModeFromDB() {
  let result = null;
  try {
    result = await getItemFromDB("systemSettings");
  } catch (e) {
    console.log(e);
  } finally {
    if (result != null) {
      let resultParsed:{mode:boolean} = JSON.parse(result);
      return resultParsed.mode
    }
  }
  console.log("[getSystemModeSetStateFromDB DONE]");
}

export async function getSystemModeSetStateFromDB(
  setModeState: (arg0: boolean) => void
) {
  let result = null;
  try {
    result = await getItemFromDB("systemSettings");
  } catch (e) {
    console.log(e);
  } finally {
    if (result != null) {
      let resultParsed = JSON.parse(result);
      setModeState(resultParsed.mode);
    }
  }
  console.log("[getSystemModeSetStateFromDB DONE]");
}

export const getAllKeysFromDB = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log(e);
  }
  console.log("[getAllKeysFromDB DONE]");
};

export const getAllKeysSetStateFromDB = async (
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
  console.log("[getAllKeysSetStateFromDB DONE]");
};

/////////////////////////////
///////// DELETE
/////////////////////////////

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
    const tagArray = await getItemFromDB("tags");
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
