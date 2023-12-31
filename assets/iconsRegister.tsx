export type iconCategory = {
  index: number;
  sectionName: string;
  sectionHeaderImage: string;
  data: string[];
};

export const iconCategories:iconCategory[] = [
  {
    index: 0,
    sectionName: "Wash",
    sectionHeaderImage: "wash_30",
    data: [
      "wash_machine",
      "wash_machine_press",
      "wash_machine_delicate",
      "wash_hand",
      "wash_not",
      "wash_30",
      "wash_40",
      "wash_50",
      "wash_60",
      "wash_70",
      "wash_95",
      "wash_30*",
      "wash_40*",
      "wash_50*",
      "wash_60*",
      "wash_70*",
      "wash_95*",
    ],
  },
  {
    index: 1,
    sectionName: "Iron",
    sectionHeaderImage: "iron_medium",
    data: [
      "iron",
      "iron_not",
      "iron_non_steam",
      "iron_low",
      "iron_medium",
      "iron_high",
    ],
  },
  {
    index: 2,
    sectionName: "Dry",
    sectionHeaderImage: "dry_machine",
    data: [
      "dry",
      "dry_not",
      "dry_hang",
      "dry_drip",
      "dry_flat",
      "dry_shade",
      "dry_machine",
      "dry_machine_not",
      "dry_machine_low",
      "dry_machine_medium",
      "dry_machine_high",
      "dry_machine_non_heat",
      "dry_machine_press",
      "dry_machine_delicate",
    ],
  },
  {
    index: 3,
    sectionName: "Clean",
    sectionHeaderImage: "clean_dry_not",
    data: [
      "clean_dry",
      "clean_dry_not",
      "clean_wet",
      "clean_wet_not",
      "clean_any",
      "clean_petroleum",
      "clean_any_not_p",
    ],
  },
  {
    index: 4,
    sectionName: "Bleach",
    sectionHeaderImage: "bleach",
    data: [
      "bleach",
      "bleach_not",
      "bleach_not_2",
      "bleach_non_cl",
      "bleach_non_cl_2",
    ],
  },
  {
    index: 5,
    sectionName: "Others",
    sectionHeaderImage: "",
    data: [
      "heat_low",
      "reduced_moisture",
      "short_cycle",
      "steam_not",
      "wring_not",
    ],
  },
];

export const iconsInRows = [
  {
    index: 0,
    sectionName: "Wash",
    sectionHeaderImage: "wash_30",
    data: [
      [
        "wash_machine",
        "wash_machine_press",
        "wash_machine_delicate",
        "wash_hand",
        "wash_not",
      ],
      ["wash_30", "wash_40", "wash_50", "wash_60", "wash_70", "wash_95"],
      ["wash_30*", "wash_40*", "wash_50*", "wash_60*", "wash_70*", "wash_95*"],
    ],
  },
  {
    index: 1,
    sectionName: "Iron",
    sectionHeaderImage: "iron_medium",
    data: [
      [
        "iron",
        "iron_not",
        "iron_non_steam",
        "iron_low",
        "iron_medium",
        "iron_high",
      ],
    ],
  },
  {
    index: 2,
    sectionName: "Dry",
    sectionHeaderImage: "dry_machine",
    data: [
      ["dry", "dry_not", "dry_hang", "dry_drip", "dry_flat", "dry_shade"],
      [
        "dry_machine",
        "dry_machine_not",
        "dry_machine_low",
        "dry_machine_medium",
      ],
      [
        "dry_machine_high",
        "dry_machine_non_heat",
        "dry_machine_press",
        "dry_machine_delicate",
      ],
    ],
  },
  {
    index: 3,
    sectionName: "Clean",
    sectionHeaderImage: "clean_dry_not",
    data: [
      ["clean_dry", "clean_dry_not", "clean_wet_not"],
      ["clean_wet", "clean_any", "clean_petroleum", "clean_any_not_p"],
    ],
  },
  {
    index: 4,
    sectionName: "Bleach",
    sectionHeaderImage: "bleach",
    data: [
      [
        "bleach",
        "bleach_not",
        "bleach_not_2",
        "bleach_non_cl",
        "bleach_non_cl_2",
      ],
    ],
  },
  {
    index: 5,
    sectionName: "Others",
    sectionHeaderImage: "",
    data: [
      ["heat_low", "reduced_moisture", "short_cycle", "steam_not", "wring_not"],
    ],
  },
];
