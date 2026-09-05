import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, Shirt } from 'lucide-react';

export default function EventCard({ event, lang, dict }) {
  // Generate 1-Click Google Calendar URL
  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${event.title} - Shreyansh & Aditi Wedding`);
    const details = encodeURIComponent(`${event.description}\n\nVenue: ${event.venue}`);
    const location = encodeURIComponent(event.venue);

    // Default dates for July 21/22, 2026
    const startTime = event.id.includes('vinayak') ? '20260721T034500Z' : '20260721T134500Z';
    const endTime = '20260722T183000Z';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startTime}/${endTime}`;
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl glass-royal border border-[#D4AF37]/40 royal-card-shadow transition-all duration-500 hover:scale-[1.01] hover:border-[#D4AF37]">
      {/* Background Image / Video Container */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        {event.isVideo ? (
          <video
            src={event.bgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <img
            src={event.bgImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E13] via-[#1A0E13]/60 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3.5 py-1 rounded-full bg-[#1A0E13]/80 backdrop-blur-md border border-[#D4AF37]/50 font-cinzel text-[11px] tracking-wider text-[#D4AF37]">
            {lang === 'hi' ? event.dateHi : event.date}
          </span>
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#6A1B29]/90 backdrop-blur-md border border-[#D4AF37]/40 text-white font-sans-body text-[11px] font-medium">
            <Clock className="w-3 h-3 text-[#D4AF37]" />
            {lang === 'hi' ? event.timeHi : event.time}
          </span>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-4 left-6 right-6 z-10">
          <h3 className="font-allura text-4xl sm:text-5xl text-white drop-shadow-md">
            {lang === 'hi' ? event.titleHi : event.title}
          </h3>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-6 sm:p-8 space-y-4">
        {/* Venue Info */}
        <div className="flex items-start gap-2.5 text-[#6A1B29]">
          <MapPin className="w-5 h-5 shrink-0 text-[#D4AF37] mt-0.5" />
          <div>
            <span className="font-cinzel text-xs font-bold tracking-wider uppercase block text-[#D4AF37]">
              {dict.venueDirections}
            </span>
            <p className="font-cormorant text-lg font-semibold text-[#3A332C]">
              {event.venue}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="font-cormorant text-base text-[#3A332C]/90 leading-relaxed italic">
          "{event.description}"
        </p>

        {/* Jain Special Note */}
        {event.specialNote && (
          <div className="p-3 rounded-xl bg-[#6A1B29]/5 border border-[#6A1B29]/20 text-[#6A1B29] font-sans-body text-xs font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{event.specialNote}</span>
          </div>
        )}

        {/* Dress Code Recommendation */}
        {event.dressCode && (
          <div className="pt-2 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-sans-body text-[#3A332C]">
              <Shirt className="w-4 h-4 text-[#6A1B29]" />
              <span className="font-semibold">{dict.dressCode}:</span>
              <span className="italic text-[#6A1B29] font-medium">{event.dressCode}</span>
            </div>

            {/* Theme Swatch Tags */}
            <div className="flex items-center gap-1.5">
              {event.themeColors.map((color, i) => (
                <span
                  key={i}
                  style={{ backgroundColor: color }}
                  className="w-4 h-4 rounded-full border border-white shadow-sm inline-block"
                  title={`Color accent ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* 1-Click Add to Google Calendar */}
        <div className="pt-3">
          <a
            href={generateGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/60 bg-gradient-to-r from-[#FAF7F2] to-[#F3E6CE] text-[#6A1B29] font-cinzel text-xs uppercase tracking-wider font-bold hover:bg-[#6A1B29] hover:text-[#D4AF37] transition-colors duration-300 shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>{dict.addToCalendar}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
