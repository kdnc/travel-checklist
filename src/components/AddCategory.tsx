"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, X } from "lucide-react";

interface AddCategoryProps {
  onAddCategory: (categoryName: string) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onAddCategory }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onAddCategory(categoryName.trim());
      setCategoryName("");
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setCategoryName("");
    setIsAdding(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isAdding) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsAdding(true)}
        className="w-full h-12 border-dashed border-2 text-muted-foreground hover:text-foreground hover:border-primary/50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Category
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Category name..."
        className="w-full"
        autoFocus
      />
      <div className="flex gap-2">
        <Button type="submit" size="sm" className="flex-1">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default AddCategory;