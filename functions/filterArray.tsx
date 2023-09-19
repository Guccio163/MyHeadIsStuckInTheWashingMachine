import { Tag } from "../components/addTagPanel/AddTagForm";

export function filterArrayByCategory(data: Tag[], filterCategory: string) {
  if (filterCategory == "All") return data;
  return data.filter(
    (e: Tag) => e.category == filterCategory
  );
}
