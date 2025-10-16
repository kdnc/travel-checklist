"use client";

import React, { useState } from "react";
import { ChecklistItemType } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus } from "lucide-react";

const ChecklistForm: React.FC<{
  onAddItem: (item: ChecklistItemType) => void;
  currentCategory: string;
}> = ({ onAddItem, currentCategory }) => {
  const [itemTitle, setItemTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  const categories = [
    { id: "clothing", name: "Clothing & Accessories" },
    { id: "documents", name: "Documents & Money" },
    { id: "electronics", name: "Electronics" },
    { id: "toiletries", name: "Toiletries & Health" },
    { id: "other", name: "Other Items" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemTitle.trim()) {
      const newItem: ChecklistItemType = {
        id: Date.now().toString(),
        title: itemTitle.trim(),
        completed: false,
        category: selectedCategory,
      };
      onAddItem(newItem);
      setItemTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
          placeholder="Add a new travel item..."
          className="flex-1"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" size="default">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
    </form>
  );
};

export default ChecklistForm;
