"use client";

import React, { useState, useEffect } from "react";
import ChecklistItem from "./ChecklistItem";
import ChecklistForm from "./ChecklistForm";
import AddCategory from "./AddCategory";
import { ChecklistItemType, CategoryType } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  saveChecklistToLocalStorage,
  getChecklistFromLocalStorage,
  saveCategoriesToLocalStorage,
  getCategoriesFromLocalStorage,
} from "../utils";
import { 
  CheckCircle, 
  Circle, 
  MapPin, 
  Shirt, 
  FileText, 
  Smartphone, 
  Heart, 
  Package,
  X
} from "lucide-react";

const TravelChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItemType[]>([]);
  const [activeTab, setActiveTab] = useState("clothing");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

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
    setItems(savedItems);
    
    const savedCategories = getCategoriesFromLocalStorage();
    setCategories(savedCategories);
  }, []);

  // Save items to localStorage whenever items change
  useEffect(() => {
    saveChecklistToLocalStorage(items);
  }, [items]);

  // Save categories to localStorage whenever categories change
  useEffect(() => {
    if (categories.length > 0) {
      saveCategoriesToLocalStorage(categories);
    }
  }, [categories]);

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

  const editItem = (id: string, newTitle: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
  };

  const startEditingCategory = (categoryId: string, currentName: string) => {
    setEditingCategory(categoryId);
    setEditingName(currentName);
  };

  const saveEditingCategory = () => {
    if (editingCategory && editingName.trim()) {
      setCategories(
        categories.map((category) =>
          category.id === editingCategory 
            ? { ...category, name: editingName.trim() }
            : category
        )
      );
    }
    setEditingCategory(null);
    setEditingName("");
  };

  const cancelEditingCategory = () => {
    setEditingCategory(null);
    setEditingName("");
  };

  const handleCategoryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEditingCategory();
    } else if (e.key === 'Escape') {
      cancelEditingCategory();
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveTab(categoryId);
  };

  const addNewCategory = (categoryName: string) => {
    const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
    const newCategory: CategoryType = {
      id: categoryId,
      name: categoryName
    };
    
    // Check if category already exists
    if (!categories.find(cat => cat.id === categoryId)) {
      setCategories([...categories, newCategory]);
      setActiveTab(categoryId); // Switch to the new category
    }
  };

  const deleteCategory = (categoryId: string) => {
    // Don't allow deleting if it's the last category
    if (categories.length <= 1) {
      return;
    }

    // Remove all items in this category
    setItems(items.filter(item => item.category !== categoryId));
    
    // Remove the category
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    setCategories(updatedCategories);
    
    // Switch to first available category if current category is being deleted
    if (activeTab === categoryId) {
      setActiveTab(updatedCategories[0].id);
    }
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
    <Card className="w-full">
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile layout - horizontal tabs */}
          <div className="md:hidden space-y-4">
            <div className="grid gap-2">
              <TabsList className="grid w-full grid-cols-2 h-auto p-1 gap-1">
                {categories.map((category, index) => {
                  const stats = getCategoryStats(category.id);
                  return (
                    <div key={category.id} className="relative">
                      <TabsTrigger 
                        value={category.id}
                        className="flex flex-col items-center gap-1 text-xs relative h-14 px-2 w-full group"
                        onDoubleClick={() => startEditingCategory(category.id, category.name)}
                      >
                        {editingCategory === category.id ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onBlur={saveEditingCategory}
                            onKeyDown={handleCategoryKeyPress}
                            className="w-full text-center bg-transparent border-none outline-none focus:ring-1 focus:ring-primary rounded px-1 text-xs"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <span 
                            className="text-center cursor-pointer text-xs leading-tight" 
                            title="Double-tap to rename"
                          >
                            {category.name.split(' ')[0]}
                          </span>
                        )}
                        {stats.total > 0 && (
                          <Badge variant={stats.isComplete ? "success" : "secondary"} className="text-xs absolute -top-1 -right-1 h-4 w-4 p-0 rounded-full flex items-center justify-center">
                            {stats.completed}
                          </Badge>
                        )}
                        {categories.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              deleteCategory(category.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-1 -left-1 h-5 w-5 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            title="Delete category"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </TabsTrigger>
                      {/* Vertical separator for mobile grid */}
                      {index % 2 === 0 && index < categories.length - 1 && (
                        <div className="absolute top-2 -right-1 w-px h-10 bg-border/30" />
                      )}
                    </div>
                  );
                })}
              </TabsList>
              
              {/* Horizontal separators between rows */}
              {categories.length > 2 && (
                <div className="w-full h-px bg-border/30" />
              )}
            </div>
            
            <div className="px-1">
              <AddCategory onAddCategory={addNewCategory} />
            </div>
          </div>

          {/* Desktop layout - vertical tabs */}
          <div className="hidden md:flex gap-6">
            <div className="w-64 space-y-4">
              <TabsList className="flex flex-col h-fit w-full p-1 space-y-1">
                {categories.map((category, index) => {
                  const stats = getCategoryStats(category.id);
                  return (
                    <div key={category.id} className="w-full">
                      <TabsTrigger 
                        value={category.id}
                        className="w-full justify-start gap-3 text-sm relative h-12 px-4 group"
                        onDoubleClick={() => startEditingCategory(category.id, category.name)}
                      >
                        {editingCategory === category.id ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onBlur={saveEditingCategory}
                            onKeyDown={handleCategoryKeyPress}
                            className="flex-1 text-left bg-transparent border-none outline-none focus:ring-1 focus:ring-primary rounded px-1"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <span 
                            className="flex-1 text-left cursor-pointer" 
                            title="Double-click to rename"
                          >
                            {category.name}
                          </span>
                        )}
                        {stats.total > 0 && (
                          <Badge variant={stats.isComplete ? "success" : "secondary"} className="text-xs">
                            {stats.completed}/{stats.total}
                          </Badge>
                        )}
                        {stats.isComplete && stats.total > 0 && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {categories.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              deleteCategory(category.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            title="Delete category"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </TabsTrigger>
                      {index < categories.length - 1 && (
                        <div className="w-full h-px bg-border/30 my-1" />
                      )}
                    </div>
                  );
                })}
              </TabsList>
              
              <div className="px-1">
                <AddCategory onAddCategory={addNewCategory} />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <ChecklistForm 
                onAddItem={addItem} 
                currentCategory={activeTab} 
                categories={categories}
                onCategoryChange={handleCategoryChange}
              />
              {categories.map((category) => {
                const categoryItems = getItemsByCategory(category.id);
                const stats = getCategoryStats(category.id);
                
                return (
                  <TabsContent key={category.id} value={category.id} className="mt-0">
                    <div className="space-y-4 border-l-4 border-primary/20 pl-4">
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-border/50">
                        <div className="flex items-center gap-2">
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
                              onEdit={editItem}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                          <p className="text-muted-foreground mt-2">No items in {category.name.toLowerCase()} yet.</p>
                          <p className="text-sm text-muted-foreground">Add items using the form above!</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                );
              })}
            </div>
          </div>

          {/* Mobile content area */}
          <div className="md:hidden space-y-3">
            <ChecklistForm 
              onAddItem={addItem} 
              currentCategory={activeTab} 
              categories={categories}
              onCategoryChange={handleCategoryChange}
            />
            {categories.map((category) => {
              const categoryItems = getItemsByCategory(category.id);
              const stats = getCategoryStats(category.id);
              
              return (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <div className="space-y-3 border-l-4 border-primary/20 pl-3">
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-border/50">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                      </div>
                      {stats.total > 0 && (
                        <div className="flex items-center gap-2">
                          <Badge variant={stats.isComplete ? "success" : "secondary"}>
                            {stats.completed}/{stats.total}
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
                            onEdit={editItem}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                        <p className="text-muted-foreground mt-2 text-sm">No {category.name.toLowerCase()} yet.</p>
                        <p className="text-xs text-muted-foreground">Add items using the form above!</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TravelChecklist;
