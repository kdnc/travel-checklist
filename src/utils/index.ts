import { ChecklistItemType } from "../types";

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

export const removeChecklistFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("travelChecklist");
  }
};
