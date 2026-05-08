"use client";

import { useState } from "react";

interface PhotoGalleryProps {
  listingId: string;
  title: string;
}

// Placeholder gradient colors per listing
const gradients: Record<string, string[]> = {
  "1": ["from-blue-400 to-cyan-300", "from-sky-400 to-blue-300", "from-cyan-400 to-teal-300"],
  "2": ["from-gray-400 to-slate-300", "from-slate-400 to-gray-300", "from-zinc-400 to-gray-300"],
  "3": ["from-orange-400 to-amber-300", "from-amber-400 to-yellow-300", "from-yellow-400 to-orange-300"],
  "4": ["from-green-400 to-emerald-300", "from-emerald-400 to-green-300", "from-teal-400 to-green-300"],
  "5": ["from-yellow-400 to-lime-300", "from-lime-400 to-yellow-300", "from-green-400 to-lime-300"],
  "6": ["from-red-400 to-rose-300", "from-rose-400 to-pink-300", "from-pink-400 to-rose-300"],
  "7": ["from-teal-400 to-cyan-300", "from-cyan-400 to-sky-300", "from-sky-400 to-teal-300"],
  "8": ["from-purple-400 to-indigo-300", "from-indigo-400 to-purple-300", "from-violet-400 to-indigo-300"],
};

const emojis = ["🏠", "🌅", "🛏️"];

const PhotoGallery = ({ listingId, title }: PhotoGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const grads = gradients[listingId] || ["from-gray-300 to-gray-200", "from-gray-400 to-gray-300", "from-gray-200 to-gray-100"];

  const prev = () => setCurrentIndex((i) => (i === 0 ? grads.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === grads.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full aspect-video sm:aspect-[16/7] rounded-2xl overflow-hidden">
      <div className={`w-full h-full bg-gradient-to-br ${grads[currentIndex]} flex items-center justify-center transition-all duration-500`}>
        <span className="text-8xl opacity-50">{emojis[currentIndex]}</span>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
      >
        <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
      >
        <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {grads.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-white w-4" : "bg-white/60"}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
        {currentIndex + 1} / {grads.length}
      </div>
    </div>
  );
};

export default PhotoGallery;
