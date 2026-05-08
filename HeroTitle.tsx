"use client";

import { Category } from "@/types";

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { label: Category; icon: string }[] = [
  { label: "Todos", icon: "🌍" },
  { label: "Playa", icon: "🏖️" },
  { label: "Mansiones", icon: "🏰" },
  { label: "Tendencias", icon: "🔥" },
  { label: "Montaña", icon: "🏔️" },
  { label: "Ciudad", icon: "🏙️" },
  { label: "Rural", icon: "🌾" },
];

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-3">
          {categories.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => onCategoryChange(label)}
              className={`flex flex-col items-center gap-1 pb-2 flex-shrink-0 border-b-2 transition-all ${
                activeCategory === label
                  ? "border-gray-800 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-80 hover:border-gray-300"
              }`}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
