import React from "react";
import TravelChecklist from "../components/TravelChecklist";

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 md:py-8 px-4 md:px-6">
      <div className="w-full max-w-none">
        <TravelChecklist />
      </div>
    </main>
  );
};

export default HomePage;
