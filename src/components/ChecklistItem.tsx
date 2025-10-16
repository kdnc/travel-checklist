import React from "react";
import { ChecklistItemType } from "../types";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Trash2 } from "lucide-react";

interface ChecklistItemProps {
  item: ChecklistItemType;
  onRemove: (id: string) => void;
  onToggle?: (id: string) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  item,
  onRemove,
  onToggle,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-center space-x-3 flex-1">
        <Checkbox
          checked={item.completed}
          onCheckedChange={() => onToggle?.(item.id)}
        />
        <span
          className={`flex-1 ${
            item.completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {item.title}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(item.id)}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChecklistItem;
