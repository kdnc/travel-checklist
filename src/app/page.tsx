import React from "react";
import TravelChecklist from "../components/TravelChecklist";

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Travel Checklist App
          </h1>
          <p className="text-lg text-gray-600">
            Keep track of your travel essentials with style
          </p>
        </div>
        <TravelChecklist />
      </div>
    </main>
  );
};

export default HomePage;
