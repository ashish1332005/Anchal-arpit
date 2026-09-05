import React from 'react';
import { MapPin, Navigation, Compass, PhoneCall } from 'lucide-react';

export default function VenueMap({ venue, lang, dict }) {
  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 sm:p-10 rounded-3xl glass-royal border border-[#D4AF37]/50 royal-card-shadow">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#6A1B29]/10 text-[#6A1B29] mb-2">
          <Compass className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <h2 className="font-allura text-4xl sm:text-5xl text-[#6A1B29]">
          {dict.venueDirections}
        </h2>
        <p className="font-cormorant text-base text-[#3A332C]/80 mt-1">
          {venue.venueAddress}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Map Preview Graphic */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 royal-card-shadow group h-64">
          <img
            src="/assets/map.png"
            alt="Venue Map Location"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E13]/80 via-transparent to-transparent flex items-end p-4">
            <span className="font-cinzel text-xs text-white font-semibold flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              {venue.venueName}
            </span>
          </div>
        </div>

        {/* Venue Information & Directions CTA */}
        <div className="space-y-4 text-center md:text-left">
          <div className="p-4 rounded-xl bg-white/70 border border-[#D4AF37]/30">
            <h4 className="font-cinzel text-xs font-bold text-[#6A1B29] uppercase tracking-wider">
              Resort & Venue Details
            </h4>
            <p className="font-cormorant text-lg text-[#3A332C] mt-1 font-semibold">
              {venue.venueName}
            </p>
            <p className="font-sans-body text-xs text-gray-600 mt-1">
              Bhilwara, Rajasthan • Full Valet Parking & Accommodations Available
            </p>
          </div>

          <a
            href={venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl shimmer-button text-white font-cinzel text-xs uppercase tracking-widest font-bold shadow-lg hover:scale-[1.02] transition-transform"
          >
            <Navigation className="w-4 h-4 text-[#D4AF37]" />
            <span>{dict.getDirections}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
