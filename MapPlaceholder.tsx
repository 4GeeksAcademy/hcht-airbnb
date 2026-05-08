"use client";

import { useState } from "react";

interface BookingCardProps {
  price: number;
  rating: number;
  reviewCount: number;
  maxGuests: number;
}

const BookingCard = ({ price, rating, reviewCount, maxGuests }: BookingCardProps) => {
  const [guests, setGuests] = useState(1);

  const decrease = () => setGuests((g) => Math.max(1, g - 1));
  const increase = () => setGuests((g) => Math.min(maxGuests, g + 1));

  return (
    <div className="border border-gray-200 rounded-2xl shadow-lg p-6 sticky top-24">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <span className="text-2xl font-bold text-gray-900">{price}€</span>
          <span className="text-gray-500 text-sm ml-1">noche</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 fill-current text-gray-800" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-semibold">{rating}</span>
          <span className="text-sm text-gray-500">({reviewCount})</span>
        </div>
      </div>

      {/* Guest counter */}
      <div className="border border-gray-200 rounded-xl p-4 mb-4">
        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2">Huéspedes</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-800">
            {guests} {guests === 1 ? "huésped" : "huéspedes"}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={decrease}
              disabled={guests === 1}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              −
            </button>
            <span className="text-sm font-medium w-4 text-center">{guests}</span>
            <button
              onClick={increase}
              disabled={guests === maxGuests}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              +
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Máximo {maxGuests} huéspedes</p>
      </div>

      <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl transition text-sm">
        Reservar ahora
      </button>

      <p className="text-center text-xs text-gray-400 mt-3">No se te cobrará todavía</p>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
        <span>{price}€ × 1 noche</span>
        <span>{price}€</span>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
        <span>Tarifa de servicio</span>
        <span>{Math.round(price * 0.14)}€</span>
      </div>
      <div className="flex items-center justify-between font-semibold text-gray-900 mt-4 pt-4 border-t border-gray-100">
        <span>Total</span>
        <span>{price + Math.round(price * 0.14)}€</span>
      </div>
    </div>
  );
};

export default BookingCard;
