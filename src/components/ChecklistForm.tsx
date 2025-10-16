"use client";

import React, { useState, useEffect } from "react";
import { ChecklistItemType, CategoryType } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus } from "lucide-react";
import VoiceInput from "./VoiceInput";

const ChecklistForm: React.FC<{
  onAddItem: (item: ChecklistItemType) => void;
  currentCategory: string;
  categories: CategoryType[];
  onCategoryChange: (categoryId: string) => void;
}> = ({ onAddItem, currentCategory, categories, onCategoryChange }) => {
  const [itemTitle, setItemTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  // Sync selectedCategory with currentCategory when tab changes
  useEffect(() => {
    setSelectedCategory(currentCategory);
  }, [currentCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  const handleVoiceResult = (transcript: string) => {
    // Clean up the transcript and set it as the item title
    const cleanedText = transcript.charAt(0).toUpperCase() + transcript.slice(1).toLowerCase();
    setItemTitle(cleanedText);

    // Smart category detection based on keywords
    const lowerText = transcript.toLowerCase();
    let detectedCategory = selectedCategory; // Default to current category

    // Check each category for keyword matches
    categories.forEach(category => {
      const categoryLower = category.name.toLowerCase();
      const categoryKeywords = categoryLower.split(' ');
      
      // Check if any category keyword appears in the transcript
      if (categoryKeywords.some(keyword => lowerText.includes(keyword))) {
        detectedCategory = category.id;
        return;
      }
    });

    // Fallback to predefined keyword detection for common items
    if (detectedCategory === selectedCategory) {
      // Clothing keywords
      if (lowerText.includes('shirt') || lowerText.includes('pants') || lowerText.includes('dress') || 
          lowerText.includes('shoes') || lowerText.includes('socks') || lowerText.includes('underwear') ||
          lowerText.includes('jacket') || lowerText.includes('coat') || lowerText.includes('hat') ||
          lowerText.includes('clothes') || lowerText.includes('clothing')) {
        const clothingCategory = categories.find(cat => cat.name.toLowerCase().includes('clothing') || cat.name.toLowerCase().includes('clothes'));
        if (clothingCategory) detectedCategory = clothingCategory.id;
      }
      // Documents keywords
      else if (lowerText.includes('passport') || lowerText.includes('visa') || lowerText.includes('ticket') ||
               lowerText.includes('license') || lowerText.includes('id') || lowerText.includes('card') ||
               lowerText.includes('money') || lowerText.includes('cash') || lowerText.includes('document')) {
        const documentsCategory = categories.find(cat => cat.name.toLowerCase().includes('document') || cat.name.toLowerCase().includes('money'));
        if (documentsCategory) detectedCategory = documentsCategory.id;
      }
      // Electronics keywords
      else if (lowerText.includes('phone') || lowerText.includes('charger') || lowerText.includes('laptop') ||
               lowerText.includes('camera') || lowerText.includes('tablet') || lowerText.includes('headphones') ||
               lowerText.includes('cable') || lowerText.includes('battery') || lowerText.includes('adapter')) {
        const electronicsCategory = categories.find(cat => cat.name.toLowerCase().includes('electronic'));
        if (electronicsCategory) detectedCategory = electronicsCategory.id;
      }
      // Toiletries keywords
      else if (lowerText.includes('toothbrush') || lowerText.includes('shampoo') || lowerText.includes('soap') ||
               lowerText.includes('medicine') || lowerText.includes('cream') || lowerText.includes('lotion') ||
               lowerText.includes('deodorant') || lowerText.includes('razor') || lowerText.includes('brush')) {
        const toiletriesCategory = categories.find(cat => cat.name.toLowerCase().includes('toiletri') || cat.name.toLowerCase().includes('health'));
        if (toiletriesCategory) detectedCategory = toiletriesCategory.id;
      }
    }

    // Update category if detected
    if (detectedCategory !== selectedCategory) {
      setSelectedCategory(detectedCategory);
      onCategoryChange(detectedCategory);
    }
  };

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
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex gap-2 flex-1">
          <Input
            type="text"
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
            placeholder="Add a new travel item..."
            className="flex-1"
          />
          <VoiceInput onVoiceResult={handleVoiceResult} />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-48">
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
          <Button type="submit" size="default" className="whitespace-nowrap">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Add</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChecklistForm;
