import { ChecklistItemType, CategoryType } from "../types";

export const saveChecklistToLocalStorage = (checklist: ChecklistItemType[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("travelChecklist", JSON.stringify(checklist));
  }
};

export const getChecklistFromLocalStorage = (): ChecklistItemType[] => {
  if (typeof window !== "undefined") {
    const checklist = localStorage.getItem("travelChecklist");
    return checklist ? JSON.parse(checklist) : [];
  }
  return [];
};

export const saveCategoriesToLocalStorage = (categories: CategoryType[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("travelCategories", JSON.stringify(categories));
  }
};

export const getCategoriesFromLocalStorage = (): CategoryType[] => {
  if (typeof window !== "undefined") {
    const categories = localStorage.getItem("travelCategories");
    return categories ? JSON.parse(categories) : [
      { id: "clothing", name: "Clothing & Accessories" },
      { id: "documents", name: "Documents & Money" },
      { id: "electronics", name: "Electronics" },
      { id: "toiletries", name: "Toiletries & Health" }
    ];
  }
  return [
    { id: "clothing", name: "Clothing & Accessories" },
    { id: "documents", name: "Documents & Money" },
    { id: "electronics", name: "Electronics" },
    { id: "toiletries", name: "Toiletries & Health" }
  ];
};

export const removeChecklistFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("travelChecklist");
  }
};
