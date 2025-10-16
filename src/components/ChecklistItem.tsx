import React, { useState } from "react";
import { ChecklistItemType } from "../types";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Trash2, Edit2, Check, X } from "lucide-react";

interface ChecklistItemProps {
  item: ChecklistItemType;
  onRemove: (id: string) => void;
  onToggle?: (id: string) => void;
  onEdit?: (id: string, newTitle: string) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  item,
  onRemove,
  onToggle,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== item.title) {
      onEdit?.(item.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(item.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  return (
    <div className="flex items-center justify-between p-3 md:p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <Checkbox
          checked={item.completed}
          onCheckedChange={() => onToggle?.(item.id)}
          className="flex-shrink-0"
        />
        {isEditing ? (
          <Input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyPress}
            className="flex-1 text-sm md:text-base"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span
            className={`flex-1 text-sm md:text-base break-words cursor-pointer ${
              item.completed
                ? "line-through text-muted-foreground"
                : "text-foreground"
            }`}
            onDoubleClick={handleDoubleClick}
            title="Double-click to edit"
          >
            {item.title}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
        {isEditing ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveEdit}
              className="text-green-600 hover:text-green-700 hover:bg-green-50 h-10 w-10"
              title="Save changes"
            >
              <Check className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancelEdit}
              className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 h-10 w-10"
              title="Cancel editing"
            >
              <X className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-10 w-10"
              title="Edit item"
            >
              <Edit2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-10 w-10"
              title="Delete item"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChecklistItem;
