export interface ChecklistItemType {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

export interface CategoryType {
  id: string;
  name: string;
  icon?: string;
}

export interface ChecklistContextType {
  items: ChecklistItemType[];
  addItem: (item: ChecklistItemType) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
}