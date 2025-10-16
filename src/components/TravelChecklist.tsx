"use client";

import React, { useState, useEffect } from "react";
import ChecklistItem from "./ChecklistItem";
import ChecklistForm from "./ChecklistForm";
import { ChecklistItemType, CategoryType } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import {
  saveChecklistToLocalStorage,
  getChecklistFromLocalStorage,
} from "../utils";
import { 
  CheckCircle, 
  Circle, 
  MapPin, 
  Shirt, 
  FileText, 
  Smartphone, 
  Heart, 
  Package 
} from "lucide-react";

const TravelChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItemType[]>([]);
  const [activeTab, setActiveTab] = useState("clothing");

  const categories: CategoryType[] = [
    { id: "clothing", name: "Clothing & Accessories" },
    { id: "documents", name: "Documents & Money" },
    { id: "electronics", name: "Electronics" },
    { id: "toiletries", name: "Toiletries & Health" },
    { id: "other", name: "Other Items" }
  ];

  const getCategoryIcon = (categoryId: string) => {
    const iconMap = {
      clothing: <Shirt className="h-4 w-4" />,
      documents: <FileText className="h-4 w-4" />,
      electronics: <Smartphone className="h-4 w-4" />,
      toiletries: <Heart className="h-4 w-4" />,
      other: <Package className="h-4 w-4" />
    };
    return iconMap[categoryId as keyof typeof iconMap] || <Package className="h-4 w-4" />;
  };

  // Load items from localStorage on component mount
  useEffect(() => {
    const savedItems = getChecklistFromLocalStorage();
    // Migrate old items without category
    const migratedItems = savedItems.map((item: ChecklistItemType) => ({
      ...item,
      category: item.category || "other"
    }));
    setItems(migratedItems);
  }, []);

  // Save items to localStorage whenever items change
  useEffect(() => {
    saveChecklistToLocalStorage(items);
  }, [items]);

  const addItem = (item: ChecklistItemType) => {
    setItems([...items, item]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getItemsByCategory = (categoryId: string) => {
    return items.filter(item => item.category === categoryId);
  };

  const getCategoryStats = (categoryId: string) => {
    const categoryItems = getItemsByCategory(categoryId);
    const completed = categoryItems.filter(item => item.completed).length;
    const total = categoryItems.length;
    return { completed, total, isComplete: total > 0 && completed === total };
  };

  const totalCompleted = items.filter((item) => item.completed).length;
  const totalItems = items.length;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Travel Checklist</CardTitle>
        </div>
        {totalItems > 0 && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{totalCompleted} completed</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Circle className="h-4 w-4 text-gray-400" />
              <span>{totalItems - totalCompleted} remaining</span>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <ChecklistForm onAddItem={addItem} currentCategory={activeTab} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => {
              const stats = getCategoryStats(category.id);
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-1 text-xs relative"
                >
                  {getCategoryIcon(category.id)}
                  <span className="hidden sm:inline">{category.name.split(' ')[0]}</span>
                  {stats.isComplete && stats.total > 0 && (
                    <Badge variant="success" className="absolute -top-1 -right-1 h-2 w-2 p-0 rounded-full">
                      <span className="sr-only">Complete</span>
                    </Badge>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => {
            const categoryItems = getItemsByCategory(category.id);
            const stats = getCategoryStats(category.id);
            
            return (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category.id)}
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                    </div>
                    {stats.total > 0 && (
                      <div className="flex items-center gap-2">
                        <Badge variant={stats.isComplete ? "success" : "secondary"}>
                          {stats.completed}/{stats.total} completed
                        </Badge>
                        {stats.isComplete && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {categoryItems.length > 0 ? (
                    <div className="space-y-2">
                      {categoryItems.map((item) => (
                        <ChecklistItem
                          key={item.id}
                          item={item}
                          onRemove={removeItem}
                          onToggle={toggleItem}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                      {getCategoryIcon(category.id)}
                      <p className="text-muted-foreground mt-2">No items in {category.name.toLowerCase()} yet.</p>
                      <p className="text-sm text-muted-foreground">Add items using the form above!</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TravelChecklist;
