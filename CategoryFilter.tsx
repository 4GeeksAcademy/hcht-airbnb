"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PhotoGallery from "@/components/PhotoGallery";
import BookingCard from "@/components/BookingCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { listings } from "@/types/data";
import { Listing } from "@/types";

export default function RoomDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = listings.find((l) => l.id === id) || null;
      setListing(found);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar showSearch={false} />
        <LoadingSpinner />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar showSearch={false} />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-6xl mb-4">😕</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Alojamiento no encontrado</h1>
          <Link href="/catalog" className="mt-4 text-rose-500 hover:underline text-sm font-medium">
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar showSearch={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-800 transition">Inicio</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-gray-800 transition">Catálogo</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium line-clamp-1">{listing.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{listing.title}</h1>

        {/* Rating + location header */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 flex-wrap">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 fill-current text-gray-800" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold text-gray-900">{listing.rating}</span>
          </div>
          <span className="underline cursor-pointer hover:text-gray-900">
            {listing.reviewCount} reseñas
          </span>
          <span>·</span>
          <span>{listing.location}</span>
        </div>

        {/* Photo Gallery */}
        <PhotoGallery listingId={listing.id} title={listing.title} />

        {/* Main content + booking */}
        <div className="flex flex-col lg:flex-row gap-12 mt-10">
          {/* Left: Details */}
          <div className="flex-1 space-y-8">
            {/* Header info */}
            <div className="pb-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {listing.category} en {listing.location}
              </h2>
              <p className="text-gray-500 text-sm">
                {listing.bedrooms} habitación{listing.bedrooms !== 1 ? "es" : ""} ·{" "}
                {listing.bathrooms} baño{listing.bathrooms !== 1 ? "s" : ""} ·{" "}
                {listing.maxGuests} huéspedes máximo
              </p>
            </div>

            {/* Host */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">{listing.host.name[0]}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Anfitrión: {listing.host.name}</p>
                <p className="text-sm text-gray-500">
                  {listing.host.yearsHosting} año{listing.host.yearsHosting !== 1 ? "s" : ""} como anfitrión
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Sobre este alojamiento</h3>
              <p className="text-gray-600 leading-relaxed">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lo que ofrece este lugar</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {listing.amenities.map((amenity) => (
                  <div key={amenity.label} className="flex items-center gap-3 py-2">
                    <span className="text-2xl">{amenity.icon}</span>
                    <span className="text-sm text-gray-700">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews summary */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 fill-current text-gray-900" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">
                  {listing.rating} · {listing.reviewCount} reseñas
                </h3>
              </div>
              <p className="text-sm text-gray-500 italic">
                Las reseñas de los huéspedes aparecerían aquí.
              </p>
            </div>

            {/* Back button */}
            <div className="pt-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-rose-500 transition border border-gray-200 rounded-xl px-4 py-2 hover:border-rose-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver al catálogo
              </Link>
            </div>
          </div>

          {/* Right: Booking card */}
          <div className="w-full lg:w-80 xl:w-96">
            <BookingCard
              price={listing.price}
              rating={listing.rating}
              reviewCount={listing.reviewCount}
              maxGuests={listing.maxGuests}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
