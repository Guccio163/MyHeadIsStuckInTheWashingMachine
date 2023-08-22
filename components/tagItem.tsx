import { View, Text } from "react-native";
import React from "react";

type tagIcon = {
  name: string;
  image: string;
};

export default function tagItem(name: string) {
  const imagesFolderPath: string = "../assets/washIcons/";

  const tagIcons = [
    {
      name: "wash_machine",
      image: require(imagesFolderPath + "wash_machine.png"),
      description: "pierz maszynowo",
    },
    {
      name: "wash_machine_press",
      image: require(imagesFolderPath + "wash_machine_press.png"),
      description: "pierz maszynowo z naciskiem",
    },
    {
      name: "wash_machine_delicate",
      image: require(imagesFolderPath + "wash_machine_delicate.png"),
      description: "pierz maszynowo delikatnie",
    },
    {
      name: "wash_hand",
      image: require(imagesFolderPath + "wash_hand.png"),
      description: "pierz ręcznie",
    },
    {
      name: "wash_not",
      image: require(imagesFolderPath + "wash_not.png"),
      description: "nie pierz",
    },
    {
      name: "bleach",
      image: require(imagesFolderPath + "bleach.png"),
      description: "wybielaj",
    },
    {
      name: "bleach_not",
      image: require(imagesFolderPath + "bleach_not.png"),
      description: "nie wybielaj",
    },
    {
      name: "bleach_non_cl",
      image: require(imagesFolderPath + "bleach_non_cl.png"),
      description: "nie wybielaj chlorem",
    },
    {
      name: "bleach_non_cl_2",
      image: require(imagesFolderPath + "bleach_non_cl_2.png"),
      description: "nie wybielaj chlorem",
    },
  ];

  const foundPath = tagIcons.find((e) => e.name === name);

  return foundPath ? foundPath : null;
}
