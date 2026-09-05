import React from 'react';
import { Crown, Heart, Building2, Sparkles } from 'lucide-react';

export default function FamilyTree({ family, lang, dict }) {
  return (
    <div className="w-full max-w-5xl mx-auto my-12 p-6 sm:p-10 rounded-3xl glass-royal border border-[#D4AF37]/50 royal-card-shadow space-y-12">
      {/* Section Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#6A1B29]/10 text-[#6A1B29] mb-2">
          <Crown className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <h2 className="font-allura text-4xl sm:text-5xl text-[#6A1B29]">
          {dict.familyTitle}
        </h2>
        <p className="font-cormorant italic text-base text-[#3A332C]/80 mt-1">
          "Where traditions are cherished and blessings are shared"
        </p>
      </div>

      {/* Grid: Special Thanks & Warm Regards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Warm Regards */}
        <div className="p-6 rounded-2xl bg-white/80 border border-[#D4AF37]/30 royal-card-shadow text-center space-y-4">
          <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#6A1B29] border-b border-[#D4AF37]/30 pb-2">
            Warm Regards & Welcoming
          </h3>
          <div className="space-y-1 font-cormorant text-lg font-medium text-[#3A332C]">
            {family.warmRegards.map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </div>

        {/* Maternal Family */}
        <div className="p-6 rounded-2xl bg-white/80 border border-[#D4AF37]/30 royal-card-shadow text-center space-y-4">
          <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#6A1B29] border-b border-[#D4AF37]/30 pb-2">
            {family.maternalFamily.title}
          </h3>
          <div className="space-y-1 font-cormorant text-base text-[#3A332C]">
            <p className="font-bold text-[#6A1B29]">{family.maternalFamily.elders}</p>
            <p>{family.maternalFamily.parents}</p>
            <p className="text-sm italic text-[#D4AF37] font-semibold">{family.maternalFamily.members}</p>
          </div>
        </div>
      </div>

      {/* Special Thanks Family List */}
      <div className="p-6 rounded-2xl bg-white/80 border border-[#D4AF37]/30 royal-card-shadow text-center">
        <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#6A1B29] mb-4">
          Special Thanks & Blessings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-cormorant text-base text-[#3A332C]/90 font-medium">
          {family.specialThanks.map((person, idx) => (
            <div key={idx} className="p-2 rounded-lg bg-[#FAF7F2] border border-[#D4AF37]/20">
              {person}
            </div>
          ))}
        </div>
      </div>

      {/* Samdhi Parivar & Tiny Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-white/80 border border-[#D4AF37]/30 text-center space-y-2">
          <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#6A1B29] pb-2 border-b border-[#D4AF37]/30">
            Samdhi Parivar (Mehta Family)
          </h3>
          <p className="font-cormorant text-base text-[#3A332C] leading-relaxed">
            {family.samdhiParivar.join(', ')}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#6A1B29]/5 border border-[#6A1B29]/20 text-center space-y-2 flex flex-col justify-center">
          <div className="flex items-center justify-center gap-1 text-[#6A1B29]">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold">
              Tiny Request From Kids
            </h3>
          </div>
          <p className="font-cormorant italic text-lg font-bold text-[#6A1B29]">
            "{family.tinyRequest}"
          </p>
        </div>
      </div>

      {/* Family Ventures Showcase */}
      <div className="pt-6 border-t border-[#D4AF37]/30 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#6A1B29]">
            {dict.familyVentures}
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {family.ventures.map((v, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#F3E6CE] border border-[#D4AF37]/40 royal-card-shadow text-center"
            >
              <h4 className="font-cinzel text-sm font-bold text-[#6A1B29]">{v.name}</h4>
              <span className="font-sans-body text-[10px] uppercase text-[#3A332C]/70 tracking-wider font-semibold">
                {v.location}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
