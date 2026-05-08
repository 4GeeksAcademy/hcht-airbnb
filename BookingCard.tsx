"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CategoryFilter from "@/components/CategoryFilter";
import ListingCard from "@/components/ListingCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { listings } from "@/types/data";
import { Category, Listing } from "@/types";

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setAllListings(listings);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredListings = allListings.filter((listing) => {
    const matchesSearch =
      search === "" ||
      listing.title.toLowerCase().includes(search.toLowerCase()) ||
      listing.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "Todos" || listing.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        searchValue={search}
        onSearchChange={setSearch}
        showSearch={true}
      />
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {filteredListings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-5xl mb-4">🔍</span>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  No encontramos resultados
                </h2>
                <p className="text-gray-500 text-sm max-w-xs">
                  Prueba con otra búsqueda o selecciona una categoría diferente.
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-6">
                  {filteredListings.length} alojamiento
                  {filteredListings.length !== 1 ? "s" : ""} disponible
                  {filteredListings.length !== 1 ? "s" : ""}
                  {activeCategory !== "Todos" ? ` en ${activeCategory}` : ""}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
