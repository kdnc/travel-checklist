# Travel Checklist Next.js Application

## Overview
This project is a Next.js application designed to help users manage their travel checklist items. It is built using TypeScript and styled with Tailwind CSS, providing a modern and responsive user interface.

## Features
- Add, remove, and **edit** travel checklist items
- **Voice Commands**: Add items using speech recognition (click the microphone button)
- **Smart Category Detection**: Voice input automatically detects and selects the appropriate category
- **Dynamic Categories**: Add and delete custom categories on-the-fly
- **Inline Editing**: Double-click any item to edit its name, or use the edit button
- Organize items by customizable categories (Clothing, Documents, Electronics, Toiletries, and more)
- Double-click/tap category names to rename them
- **Visual Separation**: Clear visual boundaries and separators between different categories
- Progress tracking with completion badges
- Responsive design optimized for mobile and desktop
- Full-width layout on desktop with vertical sidebar navigation
- Mobile-optimized horizontal tabs layout
- Persistent data storage using localStorage
- User-friendly interface with smooth transitions

## Getting Started

### Prerequisites
- Node.js (version 20 or later)
- pnpm (recommended package manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd travel-checklist
   ```
3. Install pnpm if you haven't already:
   ```
   npm install -g pnpm
   ```
4. Install the dependencies:
   ```
   pnpm install
   ```

### Running the Application
To start the development server, run:
```
pnpm dev
```
Open your browser and go to `http://localhost:3000` to view the application.

## Voice Commands Usage

The app supports voice input for adding items:

1. **Click the microphone button** next to the input field
2. **Speak your item** (e.g., "passport", "blue shirt", "phone charger")
3. **The app will automatically**:
   - Transcribe your speech to text
   - Detect the appropriate category based on keywords
   - Fill in the item name and select the category

### Supported Voice Keywords by Category:
- **Clothing**: shirt, pants, dress, shoes, socks, underwear, jacket, coat, hat
- **Documents**: passport, visa, ticket, license, id, card, money, cash
- **Electronics**: phone, charger, laptop, camera, tablet, headphones, cable, battery, adapter
- **Toiletries**: toothbrush, shampoo, soap, medicine, cream, lotion, deodorant, razor, brush

*Note: Voice commands require a modern browser with speech recognition support (Chrome, Edge, Safari on iOS/macOS).*

## Editing Items

You can edit any added item in two ways:

1. **Double-click the item text** to enter edit mode
2. **Click the edit button** (pencil icon) next to the item

### Edit Mode Controls:
- **Save**: Click the green checkmark or press **Enter**
- **Cancel**: Click the X button or press **Escape**
- **Auto-save**: Changes are saved automatically when you click outside the input field

*Tip: You can edit both the item name and rename categories using the same double-click interaction!*

## Adding Custom Categories

You can create your own categories to organize items:

1. **Click "Add Category"** button (appears below existing categories)
2. **Enter category name** (e.g., "Medications", "Beach Items", "Work Essentials")
3. **Press Enter or click "Add"** to create the category
4. **The app automatically switches** to your new category

## Deleting Categories

You can remove categories you no longer need:

1. **Hover over a category tab** to reveal the delete button (X)
2. **Click the X button** to delete the category
3. **All items in that category will be removed** as well
4. **Note**: You cannot delete the last remaining category

### Category Features:
- **Custom Names**: Any category name you want
- **Auto-switching**: Automatically switches to new category after creation
- **Voice Detection**: Voice commands will try to detect your custom categories
- **Persistent Storage**: Custom categories are saved and restored
- **Rename & Edit**: Double-click to rename any category (including custom ones)
- **Safe Deletion**: Hover-to-reveal delete button prevents accidental deletion
- **Visual Separators**: Clear lines between categories for better organization

## Visual Design

- **Category Separation**: Each category has a colored left border and divider line
- **Larger Action Buttons**: Edit and delete buttons are bigger for easier interaction
- **Progress Indicators**: Visual badges show completion status for each category
- **Responsive Layout**: Adapts beautifully to any screen size

## Project Structure
```
travel-checklist
├── src
│   ├── app
│   ├── components
│   ├── types
│   └── utils
├── public
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.