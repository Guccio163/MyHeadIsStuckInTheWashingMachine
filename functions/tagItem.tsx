import { View, Text } from "react-native";
import React from "react";

type tagIcon = {
  name: string;
  image: string;
};

export default function tagItem(name: string) {
  const imagesFolderPath: string = "../assets/tagIcons/";
  const washIconsFolderPath = imagesFolderPath + "wash/";
  const bleachIconsFolderPath = imagesFolderPath + "bleach/";
  const ironIconsFolderPath = imagesFolderPath + "iron/";
  const dryIconsFolderPath = imagesFolderPath + "dry/";
  const cleanIconsFolderPath = imagesFolderPath + "clean/";
  const otherIconsFolderPath = imagesFolderPath + "other/";

  const tagIcons = [
    //////////////// WASH ////////////////

    {
      name: "wash_machine",
      image: require(washIconsFolderPath + "wash_machine.png"),
      description: "pierz maszynowo",
    },
    {
      name: "wash_machine_press",
      image: require(washIconsFolderPath + "wash_machine_press.png"),
      description: "pierz maszynowo z naciskiem",
    },
    {
      name: "wash_machine_delicate",
      image: require(washIconsFolderPath + "wash_machine_delicate.png"),
      description: "pierz maszynowo delikatnie",
    },
    {
      name: "wash_hand",
      image: require(washIconsFolderPath + "wash_hand.png"),
      description: "pierz ręcznie",
    },
    {
      name: "wash_not",
      image: require(washIconsFolderPath + "wash_not.png"),
      description: "nie pierz",
    },
    {
      name: "wash_30",
      image: require(washIconsFolderPath + "wash_30.png"),
      description: "pierz maszynowo",
    },
    {
      name: "wash_30*",
      image: require(washIconsFolderPath + "wash_30*.png"),
      description: "pierz maszynowo z naciskiem",
    },
    {
      name: "wash_40",
      image: require(washIconsFolderPath + "wash_40.png"),
      description: "pierz maszynowo",
    },
    {
      name: "wash_40*",
      image: require(washIconsFolderPath + "wash_40*.png"),
      description: "pierz maszynowo z naciskiem",
    },
    {
      name: "wash_50",
      image: require(washIconsFolderPath + "wash_50.png"),
      description: "pierz maszynowo",
    },
    {
      name: "wash_50*",
      image: require(washIconsFolderPath + "wash_50*.png"),
      description: "pierz maszynowo z naciskiem",
    },
    {
      name: "wash_60",
      image: require(washIconsFolderPath + "wash_60.png"),
      description: "pierz maszynowo",
    },
    {
      name: "wash_60*",
      image: require(washIconsFolderPath + "wash_60*.png"),
      description: "pierz maszynowo z naciskiem",
    },
    {
      name: "wash_70",
      image: require(washIconsFolderPath + "wash_70.png"),
      description: "pierz maszynowo",
    },
    {
      name: "wash_70*",
      image: require(washIconsFolderPath + "wash_70*.png"),
      description: "pierz maszynowo z naciskiem",
    },
    {
      name: "wash_95",
      image: require(washIconsFolderPath + "wash_95.png"),
      description: "pierz maszynowo",
    },
    {
      name: "wash_95*",
      image: require(washIconsFolderPath + "wash_95*.png"),
      description: "pierz maszynowo z naciskiem",
    },

    //////////////// BLEACH ////////////////

    {
      name: "bleach",
      image: require(bleachIconsFolderPath + "bleach.png"),
      description: "wybielaj",
    },
    {
      name: "bleach_not",
      image: require(bleachIconsFolderPath + "bleach_not.png"),
      description: "nie wybielaj",
    },
    {
      name: "bleach_not_2",
      image: require(bleachIconsFolderPath + "bleach_not_2.png"),
      description: "nie wybielaj",
    },
    {
      name: "bleach_non_cl",
      image: require(bleachIconsFolderPath + "bleach_non_cl.png"),
      description: "nie wybielaj chlorem",
    },
    {
      name: "bleach_non_cl_2",
      image: require(bleachIconsFolderPath + "bleach_non_cl_2.png"),
      description:
        "nie wybielaj chlorem nuichfwuihueiw chewuicdhweuoqeh uwiq uiqhuo dxuiwdq udhxuqwo duwiqgdxyiqwgdiqd xuwqigxuiqwudxoqw duwqigx quwdixgqidx",
    },

    //////////////// IRON ////////////////

    {
      name: "iron",
      image: require(ironIconsFolderPath + "iron.png"),
      description: "wybielaj",
    },
    {
      name: "iron_not",
      image: require(ironIconsFolderPath + "iron_not.png"),
      description: "nie wybielaj",
    },
    {
      name: "iron_non_steam",
      image: require(ironIconsFolderPath + "iron_non_steam.png"),
      description: "nie wybielaj",
    },
    {
      name: "iron_low",
      image: require(ironIconsFolderPath + "iron_low.png"),
      description: "nie wybielaj chlorem",
    },
    {
      name: "iron_medium",
      image: require(ironIconsFolderPath + "iron_medium.png"),
      description:
        "nie wybielaj chlorem nuichfwuihueiw chewuicdhweuoqeh uwiq uiqhuo dxuiwdq udhxuqwo duwiqgdxyiqwgdiqd xuwqigxuiqwudxoqw duwqigx quwdixgqidx",
    },
    {
      name: "iron_high",
      image: require(ironIconsFolderPath + "iron_high.png"),
      description:
        "nie wybielaj chlorem nuichfwuihueiw chewuicdhweuoqeh uwiq uiqhuo dxuiwdq udhxuqwo duwiqgdxyiqwgdiqd xuwqigxuiqwudxoqw duwqigx quwdixgqidx",
    },

    //////////////// DRY ////////////////

    {
      name: "dry",
      image: require(dryIconsFolderPath + "dry.png"),
      description: "wybielaj",
    },
    {
      name: "dry_not",
      image: require(dryIconsFolderPath + "dry_not.png"),
      description: "nie wybielaj",
    },
    {
      name: "dry_drip",
      image: require(dryIconsFolderPath + "dry_drip.png"),
      description: "nie wybielaj",
    },
    {
      name: "dry_shade",
      image: require(dryIconsFolderPath + "dry_shade.png"),
      description: "nie wybielaj chlorem",
    },
    {
      name: "dry_flat",
      image: require(dryIconsFolderPath + "dry_flat.png"),
      description:
        "nie wybielaj chlorem nuichfwuihueiw chewuicdhweuoqeh uwiq uiqhuo dxuiwdq udhxuqwo duwiqgdxyiqwgdiqd xuwqigxuiqwudxoqw duwqigx quwdixgqidx",
    },
    {
      name: "dry_hang",
      image: require(dryIconsFolderPath + "dry_hang.png"),
      description: "nie wybielaj",
    },
    {
      name: "dry_machine",
      image: require(dryIconsFolderPath + "dry_machine.png"),
      description:
        "nie wybielaj chlorem nuichfwuihueiw chewuicdhweuoqeh uwiq uiqhuo dxuiwdq udhxuqwo duwiqgdxyiqwgdiqd xuwqigxuiqwudxoqw duwqigx quwdixgqidx",
    },
    {
      name: "dry_machine_not",
      image: require(dryIconsFolderPath + "dry_machine_not.png"),
      description: "wybielaj",
    },
    {
      name: "dry_machine_low",
      image: require(dryIconsFolderPath + "dry_machine_low.png"),
      description: "nie wybielaj",
    },
    {
      name: "dry_machine_medium",
      image: require(dryIconsFolderPath + "dry_machine_medium.png"),
      description: "nie wybielaj",
    },
    {
      name: "dry_machine_high",
      image: require(dryIconsFolderPath + "dry_machine_high.png"),
      description: "nie wybielaj chlorem",
    },
    {
      name: "dry_machine_non_heat",
      image: require(dryIconsFolderPath + "dry_machine_non_heat.png"),
      description:
        "nie wybielaj chlorem nuichfwuihueiw chewuicdhweuoqeh uwiq uiqhuo dxuiwdq udhxuqwo duwiqgdxyiqwgdiqd xuwqigxuiqwudxoqw duwqigx quwdixgqidx",
    },
    {
      name: "dry_machine_press",
      image: require(dryIconsFolderPath + "dry_machine_press.png"),
      description:
        "nie wybielaj chlorem nuichfwuihueiw chewuicdhweuoqeh uwiq uiqhuo dxuiwdq udhxuqwo duwiqgdxyiqwgdiqd xuwqigxuiqwudxoqw duwqigx quwdixgqidx",
    },
    {
      name: "dry_machine_delicate",
      image: require(dryIconsFolderPath + "dry_machine_delicate.png"),
      description: "wybielaj",
    },

    //////////////// CLEAN ////////////////

    {
      name: "clean_dry",
      image: require(cleanIconsFolderPath + "clean_dry.png"),
      description: "wybielaj",
    },
    {
      name: "clean_dry_not",
      image: require(cleanIconsFolderPath + "clean_dry_not.png"),
      description: "nie wybielaj",
    },
    {
      name: "clean_wet",
      image: require(cleanIconsFolderPath + "clean_wet.png"),
      description: "nie wybielaj",
    },
    {
      name: "clean_wet_not",
      image: require(cleanIconsFolderPath + "clean_wet_not.png"),
      description: "nie wybielaj chlorem",
    },
    {
      name: "clean_any",
      image: require(cleanIconsFolderPath + "clean_any.png"),
      description:
        "nie wybielaj chlorem nuichfwuihueiw chewuicdhweuoqeh uwiq uiqhuo dxuiwdq udhxuqwo duwiqgdxyiqwgdiqd xuwqigxuiqwudxoqw duwqigx quwdixgqidx",
    },
    {
      name: "clean_any_not_p",
      image: require(cleanIconsFolderPath + "clean_any_not_p.png"),
      description:
        "nie wybielaj chlorem nuichfwuihueiw chewuicdhweuoqeh uwiq uiqhuo dxuiwdq udhxuqwo duwiqgdxyiqwgdiqd xuwqigxuiqwudxoqw duwqigx quwdixgqidx",
    },
    {
      name: "clean_petroleum",
      image: require(cleanIconsFolderPath + "clean_petroleum.png"),
      description:
        "nie wybielaj chlorem nuichfwuihueiw chewuicdhweuoqeh uwiq uiqhuo dxuiwdq udhxuqwo duwiqgdxyiqwgdiqd xuwqigxuiqwudxoqw duwqigx quwdixgqidx",
    },

    //////////////// OTHER ////////////////

    {
      name: "heat_low",
      image: require(otherIconsFolderPath + "heat_low.png"),
      description: "wybielaj",
    },
    {
      name: "reduced_moisture",
      image: require(otherIconsFolderPath + "reduced_moisture.png"),
      description: "nie wybielaj",
    },
    {
      name: "short_cycle",
      image: require(otherIconsFolderPath + "short_cycle.png"),
      description: "nie wybielaj",
    },
    {
      name: "steam_not",
      image: require(otherIconsFolderPath + "steam_not.png"),
      description: "nie wybielaj chlorem",
    },
    {
      name: "wring_not",
      image: require(otherIconsFolderPath + "wring_not.png"),
      description:
        "nie wybielaj chlorem nuichfwuihueiw chewuicdhweuoqeh uwiq uiqhuo dxuiwdq udhxuqwo duwiqgdxyiqwgdiqd xuwqigxuiqwudxoqw duwqigx quwdixgqidx",
    },
  ];

  const other = {
    name: "other",
    image: require(imagesFolderPath + "other.png"),
    description: 'icon for other'  };

  const foundPath = tagIcons.find((e) => e.name === name);

  return foundPath ? foundPath : other;
}
