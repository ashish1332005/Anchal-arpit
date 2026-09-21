import React, { useState, useRef, useEffect } from 'react';
import EnvelopeOpening from './components/EnvelopeOpening';
import FallingPetals from './components/FallingPetals';
import AudioPlayer from './components/AudioPlayer';
import RsvpModal from './components/RsvpModal';
import { WEDDING_DETAILS } from './data/weddingData';
import {
  ChevronDown,
  Calendar,
  Share2,
  Globe,
  MessageSquare,
  Navigation,
  Phone
} from 'lucide-react';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [lang, setLang] = useState('en');
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [dateRevealed, setDateRevealed] = useState(false);

  const containerRef = useRef(null);
  const dict = WEDDING_DETAILS.translations[lang];

  useEffect(() => {
    // Parse URL query parameter for guest name
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('guest') || params.get('to') || params.get('name');
    if (guestParam) {
      setGuestName(guestParam.replace(/\+/g, ' '));
    }
  }, []);

  const handleEnvelopeComplete = () => {
    setIsUnlocked(true);
    setAutoPlayAudio(true);
  };

  const scrollToSlide = (index) => {
    if (containerRef.current) {
      const slides = containerRef.current.querySelectorAll('.story-slide');
      if (slides[index]) {
        slides[index].scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Anchal & Arpit Royal Wedding Invitation',
          text: 'You are cordially invited to celebrate the auspicious wedding festivities of Anchal & Arpit!',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Invitation link copied to clipboard!');
    }
  };

  const generateGoogleCalendarUrl = (title, details, location, startTime, endTime) => {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
      location
    )}&dates=${startTime}/${endTime}`;
  };

  return (
    <div className="relative w-full h-[100dvh] bg-[#FAF7F2] flex items-center justify-center overflow-hidden">
      {/* Subtle Falling Cherry Blossom Petals Overlay */}
      <FallingPetals />

      {/* Floating Soundtrack Control */}
      <AudioPlayer autoPlayTrigger={autoPlayAudio} lang={lang} dict={dict} />

      {/* Interactive Envelope Opening Screen (Locks Scroll until clicked) */}
      {!isUnlocked && (
        <EnvelopeOpening
          onComplete={handleEnvelopeComplete}
          guestName={guestName}
          lang={lang}
        />
      )}

      {/* Sticky Action Header with Authentic A-अ Logo */}
      {isUnlocked && (
        <div className="fixed top-3 left-2 right-2 sm:left-4 sm:right-4 z-40 max-w-[460px] mx-auto flex items-center justify-between pointer-events-auto px-1">
          {/* Logo Badge */}
          <div className="flex items-center gap-1.5 bg-[#5A121E]/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37] shadow-xl text-[#F7D070]">
            <img
              src="/assets/couple_logo_gold.png"
              alt="A-अ Monogram"
              className="h-5 w-auto object-contain drop-shadow-sm"
            />
            <span className="font-cinzel text-[11px] font-bold tracking-wider">A & A</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Direct Google Calendar Button */}
            <a
              href={generateGoogleCalendarUrl(
                'Anchal & Arpit Royal Wedding - Gloria Inn, Bhilwara',
                'Wedding celebrations of Anchal Chechani and Arpit Kabra on 11 & 12 December 2026 at Gloria Inn, Bhilwara',
                'Gloria Inn, Bhilwara',
                '20261211T013000Z',
                '20261212T203000Z'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-[#5A121E]/90 backdrop-blur-md border border-[#D4AF37] text-[#F7D070] hover:bg-[#800020] transition-colors shadow-xl"
              title="Add Wedding to Calendar"
            >
              <Calendar className="w-3.5 h-3.5" />
            </a>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#5A121E]/90 backdrop-blur-md border border-[#D4AF37] text-[#F7D070] font-cinzel text-xs font-semibold hover:bg-[#800020] transition-colors shadow-xl"
            >
              <Globe className="w-3.5 h-3.5 text-[#F7D070]" />
              <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Share Link */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full bg-[#5A121E]/90 backdrop-blur-md border border-[#D4AF37] text-[#F7D070] hover:bg-[#800020] transition-colors shadow-xl"
              title="Share Card"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            {/* RSVP Modal Trigger */}
            <button
              onClick={() => setIsRsvpOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FBF5B7] to-[#AA771C] text-[#5A121E] font-cinzel text-xs uppercase tracking-wider font-bold shadow-xl hover:scale-105 transition-transform"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>RSVP</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN VERTICAL STORY DECK CONTAINER: FULL WIDTH AND FULLY RESPONSIVE */}
      <div
        ref={containerRef}
        className={`w-full h-[100dvh] relative bg-[#FAF7F2] no-scrollbar ${
          isUnlocked
            ? 'snap-y snap-mandatory overflow-y-scroll scroll-smooth'
            : 'overflow-hidden'
        }`}
      >
        {/* ======================================================== */}
        {/* SLIDE 1: MAIN INVITATION CARD (Page 2 — Wedding Invitation) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/welcomeslider.png')" }}
        >
          {/* Confined strictly to upper open sky so resort building, pool & procession below are completely UNCOVERED! */}
          <div className="relative z-10 pt-8 sm:pt-10 space-y-1 sm:space-y-1.5 overflow-y-auto max-h-[82vh] no-scrollbar max-w-sm mx-auto">
            {/* Religious Invocations */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[#5A121E]">
              <span className="font-cinzel text-[10px] sm:text-[11px] tracking-wider font-bold text-[#5A121E] bg-[#FAF7F2]/95 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-xs">
                || श्री गणेशाय नमः ||
              </span>
              <span className="font-cinzel text-[10px] sm:text-[11px] tracking-wider font-bold text-[#5A121E] bg-[#FAF7F2]/95 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-xs">
                || श्री रामचंद्राय नमः ||
              </span>
              <span className="font-cinzel text-[10px] sm:text-[11px] tracking-wider font-bold text-[#5A121E] bg-[#FAF7F2]/95 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-xs">
                || श्री सेठ माता री ||
              </span>
            </div>

            {/* A-अ Couple Monogram */}
            <div className="pt-0.5 flex justify-center">
              <img
                src="/assets/couple_logo.png"
                alt="A-अ Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-sm"
              />
            </div>

            <p className="font-cormorant italic text-xs sm:text-sm text-[#2C1518] font-bold leading-tight">
              With the divine blessings of Grandfather Kabra,
            </p>

            <p className="font-cormorant text-[11px] sm:text-xs font-bold text-[#2C1518] max-w-xs mx-auto leading-tight">
              we request the pleasure of your gracious presence at the wedding ceremony of
            </p>

            {/* BRIDE SECTION */}
            <div className="pt-0.5">
              <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.25em] text-[#8B6508] font-bold uppercase">
                BRIDE
              </span>
              <h2 className="font-playfair text-xl sm:text-2xl text-[#C2185B] font-bold tracking-wider drop-shadow-xs">
                ANCHAL CHECHANI
              </h2>
              <p className="font-cormorant text-[11px] sm:text-xs font-bold text-[#2C1518] leading-tight mt-0.5">
                G/D/o — Smt. Janki Devi Chechani & Shree Shivlal Ji Chechani
              </p>
              <p className="font-cormorant text-[11px] sm:text-xs font-bold text-[#2C1518] leading-tight">
                D/o — Dinesh Chechani & Leela Devi Chechani
              </p>
            </div>

            <p className="font-allura text-xl text-[#8B6508] font-bold my-0 leading-none">with</p>

            {/* GROOM SECTION */}
            <div>
              <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.25em] text-[#8B6508] font-bold uppercase">
                GROOM
              </span>
              <h2 className="font-playfair text-xl sm:text-2xl text-[#5A121E] font-bold tracking-wider drop-shadow-xs">
                ARPIT KABRA
              </h2>
              <p className="font-cormorant text-[11px] sm:text-xs font-bold text-[#2C1518] leading-tight mt-0.5">
                S/o — Shree Ram Rai Ji Kabra & Smt. Ratan Devi Kabra
              </p>
              <p className="font-cormorant text-[11px] sm:text-xs font-bold text-[#2C1518] leading-tight">
                S/o — Sanjay Kabra & Rinku Kabra
              </p>
            </div>

            {/* Date & Venue in a clean floating translucent badge */}
            <div className="pt-1">
              <div className="inline-block bg-[#FAF7F2]/95 backdrop-blur-xs px-3.5 py-1 rounded-full border border-[#D4AF37]/60 shadow-xs">
                <p className="font-cinzel text-[10px] sm:text-[11px] tracking-widest text-[#5A121E] font-bold uppercase">
                  11 & 12 DECEMBER 2026 • GLORIA INN, BHILWARA
                </p>
              </div>
            </div>
          </div>

          {/* Bottom SWIPE UP button */}
          <div className="relative z-10 pb-5 text-center">
            <button
              onClick={() => scrollToSlide(1)}
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-[#5A121E] border border-[#D4AF37] shadow-xl text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#F7D070]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 2: SAVE THE DATE / BRIDE WITH GROOM */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-cover bg-center text-center text-white select-none"
          style={{ backgroundImage: "url('/assets/datereveal-bg.png')" }}
        >
          <div className="relative z-10 pt-16 space-y-3 max-w-md mx-auto">
            {/* A-अ Couple Logo in Gold */}
            <div className="flex justify-center">
              <img
                src="/assets/couple_logo_gold.png"
                alt="A-अ Monogram"
                className="w-14 h-14 object-contain drop-shadow-lg"
              />
            </div>

            <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#F7D070] font-bold uppercase drop-shadow-md">
              BRIDE WITH GROOM
            </p>

            <h1 className="font-playfair text-4xl sm:text-5xl text-gold-gradient font-bold drop-shadow-lg tracking-wide">
              Anchal & Arpit
            </h1>

            {/* Tap to Reveal Date Button */}
            <div className="pt-2">
              <button
                onClick={() => setDateRevealed(!dateRevealed)}
                className="px-6 py-2.5 rounded-xl border border-[#D4AF37] bg-[#1A0E13]/90 backdrop-blur-md text-[#F7D070] font-cinzel text-xs sm:text-sm tracking-widest font-bold uppercase shadow-2xl hover:scale-105 transition-transform"
              >
                {dateRevealed ? '11 & 12 DECEMBER 2026' : '✦ TAP TO REVEAL DATE ✦'}
              </button>
            </div>

            <p className="font-cormorant text-base sm:text-lg text-[#F7D070] font-semibold pt-1">
              Gloria Inn, Bhilwara
            </p>
          </div>

          <div className="relative z-10 pb-8 space-y-2">
            <h3 className="font-cinzel text-xs sm:text-sm tracking-[0.2em] text-[#F7D070] font-bold uppercase drop-shadow-md">
              SAVE THE DATE
            </h3>
            <p className="font-playfair text-2xl sm:text-3xl text-white drop-shadow-lg font-bold">
              Wedding Festivities Await You
            </p>

            <button
              onClick={() => scrollToSlide(2)}
              className="inline-flex items-center gap-1.5 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase pt-1 animate-bounce"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 3: VINAYAK STHAPNA (11 December Morning) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center text-white select-none"
          style={{ backgroundImage: "url('/assets/vinayak-bg.png')" }}
        >
          {/* Confined to upper dark area so glowing Ganesha idol at bottom is 100% visible! */}
          <div className="relative z-10 pt-11 sm:pt-13 space-y-1 sm:space-y-1.5 max-w-sm mx-auto px-4">
            <div className="flex items-center justify-center">
              <img src="/assets/ganesh.png" alt="Lord Ganesha" className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-md" />
            </div>
            <p className="font-cinzel text-[11px] sm:text-xs tracking-widest text-[#F7D070] font-bold uppercase drop-shadow-md">
              || श्री गणेशाय नमः ||
            </p>

            <h2 className="font-playfair text-3xl sm:text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] font-bold tracking-wide leading-tight">
              Vinayak Sthapna
            </h2>

            <div className="space-y-0.5 font-cormorant text-white pt-0.5">
              <p className="font-bold text-sm sm:text-base text-[#FFF5C0] drop-shadow-sm">
                Friday, 11th December 2026 • 07:00 AM Onwards
              </p>
              <p className="text-xs sm:text-sm text-[#F7D070] font-bold drop-shadow-sm">
                (Breakfast : 09:00 AM Onwards)
              </p>
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-wider text-white/95 font-bold uppercase pt-0.5">
                Gloria Inn, Bhilwara
              </p>
            </div>
          </div>

          <div className="relative z-10 pb-7 text-center">
            <button
              onClick={() => scrollToSlide(3)}
              className="inline-flex items-center gap-1.5 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 4: THE WEDDING CARNIVAL (11 December Afternoon) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/carnival-bg.png')" }}
        >
          {/* Confined to upper sky so couple & carnival stalls are completely visible! */}
          <div className="relative z-10 pt-11 sm:pt-13 space-y-1 sm:space-y-1.5 max-w-sm mx-auto px-4">
            <div className="flex justify-center">
              <img
                src="/assets/couple_logo.png"
                alt="A-अ Monogram"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-sm"
              />
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl text-[#5A121E] font-bold drop-shadow-xs tracking-wide leading-tight">
              The Wedding Carnival
            </h2>

            <p className="font-cormorant italic text-xs sm:text-sm font-bold text-[#2C1518] max-w-xs mx-auto leading-snug">
              "A vibrant celebration of laughter, love, music and endless memories"
            </p>

            <div className="space-y-0.5 font-cormorant text-[#2C1518] pt-0.5">
              <p className="font-bold text-sm sm:text-base text-[#5A121E]">
                Friday, 11th December 2026 • 11:00 AM Onwards
              </p>
              <p className="text-xs sm:text-sm text-[#8B6508] font-bold">
                (Lunch — Carnival : 01:00 PM Onwards)
              </p>
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-wider text-[#5A121E] font-bold uppercase pt-0.5">
                Gloria Inn, Bhilwara
              </p>
            </div>
          </div>

          <div className="relative z-10 pb-5 text-center">
            <button
              onClick={() => scrollToSlide(4)}
              className="inline-flex items-center gap-1.5 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce bg-[#5A121E] px-5 py-2 rounded-full border border-[#D4AF37] shadow-lg"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#F7D070]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 5: SANGEET & RING CEREMONY (11 December Evening) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center text-white select-none"
          style={{ backgroundImage: "url('/assets/sangeet-bg.png')" }}
        >
          {/* Confined strictly to upper dark starry sky (top 10% to 35%) so dancing couple is 100% UNTOUCHED! */}
          <div className="relative z-10 pt-10 sm:pt-12 space-y-1 max-w-xs mx-auto px-2">
            <div className="flex justify-center">
              <img
                src="/assets/couple_logo_gold.png"
                alt="A-अ Monogram"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-md"
              />
            </div>

            <p className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.25em] text-[#F7D070] font-bold uppercase drop-shadow-sm">
              THE SANGEET NIGHT
            </p>

            <h2 className="font-playfair text-2xl sm:text-3xl text-gold-gradient font-bold drop-shadow-md tracking-wide leading-tight">
              Sangeet & Ring Ceremony
            </h2>

            <div className="space-y-0.5 font-cormorant text-white pt-0.5">
              <p className="font-bold text-xs sm:text-sm text-[#FFF5C0] drop-shadow-sm">
                Friday, 11th December 2026 • 07:00 PM Onwards
              </p>
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-wider text-white/90 font-bold uppercase">
                Gloria Inn, Bhilwara
              </p>
            </div>

            {/* Couplet — Compact quote tucked neatly in dark sky */}
            <p className="font-cormorant italic text-[11px] sm:text-xs text-[#FFF9D2] max-w-[260px] mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] pt-0.5 leading-snug">
              "Let's dance, let's sing, let our hearts take flight,
              As we celebrate this love under the stars tonight."
            </p>
          </div>

          <div className="relative z-10 pb-7 text-center">
            <button
              onClick={() => scrollToSlide(5)}
              className="inline-flex items-center gap-1.5 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 6: MANGAL KALASH (12 December Morning) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/kalash-bg.png')" }}
        >
          {/* Confined strictly inside upper temple arch (top 12% to 42%) so golden Kalash & ladies are completely visible! */}
          <div className="relative z-10 pt-11 sm:pt-13 space-y-1 sm:space-y-1.5 max-w-sm mx-auto px-4">
            <div className="flex items-center justify-center">
              <img src="/assets/shubharambh.png" alt="|| शुभारंभ ||" className="h-8 sm:h-9 w-auto object-contain drop-shadow-sm" />
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl text-[#5A121E] font-bold drop-shadow-md tracking-wide leading-tight">
              Mangal Kalash
            </h2>

            <div className="space-y-0.5 font-cormorant text-[#2C1518] pt-0.5">
              <p className="font-bold text-sm sm:text-base text-[#5A121E]">
                Saturday, 12th December 2026 • 09:00 AM Onwards
              </p>
              <p className="text-xs sm:text-sm text-[#8B6508] font-bold">
                (Breakfast : 09:00 AM Onwards)
              </p>
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-wider text-[#5A121E] font-bold uppercase pt-0.5">
                Gloria Inn, Bhilwara
              </p>
            </div>
          </div>

          <div className="relative z-10 pb-5 text-center">
            <button
              onClick={() => scrollToSlide(6)}
              className="inline-flex items-center gap-1.5 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce bg-[#5A121E] px-5 py-2 rounded-full border border-[#D4AF37] shadow-lg"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#F7D070]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 7: MAYRA (12 December Mid-day) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/bhaatbharai-bg.png')" }}
        >
          {/* Confined to upper palace sky so royal gift baskets & sweets are completely visible! */}
          <div className="relative z-10 pt-11 sm:pt-13 space-y-1 sm:space-y-1.5 max-w-sm mx-auto px-4">
            <div className="flex justify-center">
              <img src="/assets/couple_logo.png" alt="A-अ" className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-sm" />
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl text-[#5A121E] font-bold drop-shadow-md tracking-wide leading-tight">
              Mayra
            </h2>

            <p className="font-cormorant italic text-xs sm:text-sm font-bold text-[#2C1518] max-w-xs mx-auto leading-snug">
              "Where traditions are cherished and blessings are shared"
            </p>

            <div className="space-y-0.5 font-cormorant text-[#2C1518] pt-0.5">
              <p className="font-bold text-sm sm:text-base text-[#5A121E]">
                Saturday, 12th December 2026 • 11:00 AM Onwards
              </p>
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-wider text-[#8B6508] font-bold uppercase pt-0.5">
                Gloria Inn, Bhilwara
              </p>
            </div>
          </div>

          <div className="relative z-10 pb-5 text-center">
            <button
              onClick={() => scrollToSlide(7)}
              className="inline-flex items-center gap-1.5 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce bg-[#5A121E] px-5 py-2 rounded-full border border-[#D4AF37] shadow-lg"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#F7D070]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 8: MILNI, BADHAI & NIKASI (12 December Afternoon) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/welcomefeast-bg.png')" }}
        >
          {/* Confined to upper garden sky so royal banquet tables & guests are completely visible! */}
          <div className="relative z-10 pt-11 sm:pt-13 space-y-1 sm:space-y-1.5 max-w-sm mx-auto px-4">
            <div className="flex justify-center">
              <img src="/assets/couple_logo.png" alt="A-अ" className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-sm" />
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl text-[#5A121E] font-bold drop-shadow-md tracking-wide leading-tight">
              Milni, Badhai & Nikasi
            </h2>

            <p className="font-cormorant italic text-xs sm:text-sm font-bold text-[#2C1518] max-w-xs mx-auto leading-snug">
              "Welcoming our dear ones with open hearts and warm smiles"
            </p>

            <div className="space-y-1 font-cormorant text-[#2C1518] pt-0.5">
              <p className="font-bold text-sm sm:text-base text-[#5A121E]">
                Saturday, 12th December 2026 • Gloria Inn, Bhilwara
              </p>

              {/* Compact horizontal chip */}
              <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-[#FAF7F2]/95 backdrop-blur-sm px-3 py-1 rounded-lg border border-[#D4AF37]/50 shadow-xs text-xs font-bold font-cormorant">
                <span className="text-[#5A121E]">Milni 4:00 PM</span>
                <span className="text-[#D4AF37]">•</span>
                <span className="text-[#5A121E]">Badhai 4:00 PM</span>
                <span className="text-[#D4AF37]">•</span>
                <span className="text-[#5A121E]">Laddu Jalai 4:30 PM</span>
                <span className="text-[#D4AF37]">•</span>
                <span className="text-[#8B6508]">Nikasi 6:00 PM</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pb-5 text-center">
            <button
              onClick={() => scrollToSlide(8)}
              className="inline-flex items-center gap-1.5 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce bg-[#5A121E] px-5 py-2 rounded-full border border-[#D4AF37] shadow-lg"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#F7D070]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 9: RECEPTION & SACRED PHERAS (12 December Night) */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden text-center text-white select-none">
          <video
            src="/assets/reception-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/60" />

          {/* Confined strictly to upper fireworks sky so bride & groom below are 100% UNTOUCHED! */}
          <div className="relative z-10 pt-10 sm:pt-12 space-y-1 max-w-sm mx-auto px-3">
            <div className="flex justify-center">
              <img src="/assets/couple_logo_gold.png" alt="A-अ" className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-md" />
            </div>

            <h2 className="font-playfair text-2xl sm:text-3xl text-gold-gradient font-bold drop-shadow-md tracking-wide leading-tight">
              Reception & Sacred Pheras
            </h2>

            <div className="space-y-1 font-cormorant text-white">
              <p className="font-bold text-xs sm:text-sm text-[#FFF5C0]">
                Saturday, 12th December 2026 • Gloria Inn, Bhilwara
              </p>

              {/* Compact horizontal chip */}
              <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-[#D4AF37]/50 shadow-xs text-[11px] sm:text-xs font-bold font-cormorant">
                <span className="text-[#F7D070]">Reception & Dinner 7:00 PM</span>
                <span className="text-[#D4AF37]">•</span>
                <span className="text-white">Toran 8:30 PM</span>
                <span className="text-[#D4AF37]">•</span>
                <span className="text-[#FFF5C0]">Pheras 10:30 PM</span>
              </div>
            </div>

            {/* Couplet */}
            <p className="font-cormorant italic text-[11px] sm:text-xs text-[#FFF5C0] max-w-xs mx-auto drop-shadow-md leading-snug">
              "With loved ones near and promises true, we begin the journey of a lifetime, as one, not two."
            </p>
          </div>

          <div className="relative z-10 pb-7 text-center">
            <button
              onClick={() => scrollToSlide(9)}
              className="inline-flex items-center gap-1.5 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 10: VENUE & LOCATION */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative overflow-hidden select-none"
          style={{
            backgroundImage: "url('/assets/directions-bg.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Note: The authentic A-अ Monogram is now baked directly into the golden arch of directions-bg.png! */}

          {/* MAP PREVIEW CARD: FITS EXACTLY INSIDE THE GOLDEN ORNATE FRAME */}
          <div
            className="absolute rounded-lg overflow-hidden cursor-pointer shadow-md group border border-[#D4AF37]/50"
            style={{
              top: '34.6%',
              bottom: '35.8%',
              left: '11.5%',
              right: '11.5%'
            }}
            onClick={() => window.open(WEDDING_DETAILS.dates.googleMapsUrl, '_blank')}
          >
            <img
              src="/assets/gloria_map.png"
              alt="Gloria Inn, Bhilwara Map Location"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Map Interaction Hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-end justify-center pb-2 pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded-full bg-[#5A121E]/90 text-[#F7D070] font-cinzel text-[9px] font-bold shadow-md">
                ✦ Tap to Open Google Maps ✦
              </span>
            </div>
          </div>

          {/* VENUE NAME AND GET DIRECTIONS BUTTON: BELOW THE ORNATE DIVIDER */}
          <div
            className="absolute left-0 right-0 text-center pointer-events-auto px-4"
            style={{ top: '69.5%' }}
          >
            <h3 className="font-playfair font-bold text-2xl sm:text-3xl text-[#3D2518] tracking-wide drop-shadow-xs">
              Gloria Inn, Bhilwara
            </h3>

            <div className="pt-2">
              <a
                href={WEDDING_DETAILS.dates.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FBF5B7] to-[#AA771C] text-[#5A121E] font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-transform border border-[#D4AF37]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{dict.getDirections}</span>
              </a>
            </div>
          </div>

          {/* Bottom SWIPE UP button */}
          <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-auto">
            <button
              onClick={() => scrollToSlide(10)}
              className="inline-flex items-center gap-1.5 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce bg-[#5A121E]/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#D4AF37]"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 11: WITH LOVE & BLESSINGS */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center text-[#2C1518] select-none"
          style={{ backgroundImage: "url('/assets/rsvp-1-bg.png')" }}
        >
          {/* Centered content block filling the canvas elegantly between the lanterns */}
          <div className="relative z-10 my-auto py-8 space-y-4 sm:space-y-5 overflow-y-auto max-h-[85vh] no-scrollbar max-w-md mx-auto w-full">
            {/* A-अ Couple Monogram */}
            <div className="flex justify-center">
              <img
                src="/assets/couple_logo.png"
                alt="A-अ Logo"
                className="w-11 h-11 object-contain drop-shadow-sm"
              />
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl text-[#5A121E] font-bold drop-shadow-xs">
              With Love & Blessings
            </h2>

            {/* WARM REGARDS */}
            <div className="space-y-1">
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                WARM REGARDS
              </p>
              {WEDDING_DETAILS.family.warmRegards.map((item, idx) => (
                <p key={idx} className="font-cormorant font-bold text-base sm:text-lg text-[#2C1518] leading-snug">
                  {item}
                </p>
              ))}
            </div>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto" />

            {/* SPECIAL REQUEST 1 */}
            <div className="space-y-1">
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                SPECIAL REQUEST
              </p>
              {WEDDING_DETAILS.family.specialRequest1.map((item, idx) => (
                <p key={idx} className="font-cormorant font-bold text-base sm:text-lg text-[#2C1518] leading-snug">
                  {item}
                </p>
              ))}
            </div>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto" />

            {/* MITHI MANUHAR */}
            <div className="space-y-1">
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                MITHI MANUHAR
              </p>
              {WEDDING_DETAILS.family.mithiManuhar.map((item, idx) => (
                <p key={idx} className="font-cormorant font-bold text-base sm:text-lg text-[#2C1518] leading-snug">
                  {item}
                </p>
              ))}
            </div>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto" />

            {/* SPECIAL REQUEST 2 */}
            <div className="space-y-1">
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                SPECIAL REQUEST
              </p>
              {WEDDING_DETAILS.family.specialRequest2.map((item, idx) => (
                <p key={idx} className="font-cormorant font-bold text-base sm:text-lg text-[#2C1518] leading-snug">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Bottom SWIPE UP button */}
          <div className="relative z-10 pb-5 text-center">
            <button
              onClick={() => scrollToSlide(11)}
              className="inline-flex items-center gap-1.5 text-[#5A121E] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce bg-[#FAF7F2]/95 px-5 py-2 rounded-full border border-[#D4AF37] shadow-lg"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#5A121E]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 12: FAMILY & RSVP */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center text-[#2C1518] select-none"
          style={{ backgroundImage: "url('/assets/rsvp-2-bg.png')" }}
        >
          <div className="relative z-10 pt-10 sm:pt-12 space-y-3 overflow-y-auto max-h-[82vh] no-scrollbar max-w-md mx-auto w-full">
            {/* Top A-अ Logo */}
            <div className="flex justify-center">
              <img
                src="/assets/couple_logo.png"
                alt="A-अ Logo"
                className="w-11 h-11 object-contain drop-shadow-sm"
              />
            </div>

            {/* Top Inviting Quote */}
            <div className="max-w-sm mx-auto">
              <p className="font-cormorant italic text-sm sm:text-base text-[#2C1518] font-semibold leading-relaxed">
                "{WEDDING_DETAILS.translations[lang].familyInviteQuote}"
              </p>
              <p className="font-playfair text-xl sm:text-2xl text-[#5A121E] font-bold mt-1">— Kabra & Chechani Parivaar</p>
            </div>

            {/* RSVP SECTION CARD */}
            <div className="bg-[#FAF7F2]/95 backdrop-blur-md rounded-xl p-3.5 border border-[#D4AF37]/60 shadow-sm max-w-sm mx-auto space-y-1.5">
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase text-[#5A121E] font-bold">
                RSVP
              </p>
              <p className="font-cormorant font-bold text-sm sm:text-base text-[#2C1518]">
                {WEDDING_DETAILS.family.rsvp.names.join(' • ')}
              </p>
              <p className="font-cormorant text-xs sm:text-sm text-[#2C1518]">
                {WEDDING_DETAILS.family.rsvp.address}, {WEDDING_DETAILS.family.rsvp.city}
              </p>
              {/* Phone numbers with click to call */}
              <div className="pt-1 flex flex-wrap items-center justify-center gap-2">
                {WEDDING_DETAILS.family.rsvp.phones.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:+91${phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A121E] text-[#F7D070] font-cinzel text-[10px] sm:text-xs font-bold hover:scale-105 transition-transform"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* WITH BEST COMPLIMENTS */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#8B6508] font-bold">
                WITH BEST COMPLIMENTS
              </p>
              <p className="font-cormorant font-bold text-sm sm:text-base text-[#2C1518] max-w-sm mx-auto leading-tight">
                {WEDDING_DETAILS.family.withBestCompliments.members}
              </p>
              <p className="font-cormorant font-bold text-sm sm:text-base text-[#5A121E]">
                {WEDDING_DETAILS.family.withBestCompliments.familyTitle}
              </p>
            </div>

            {/* FIRMS */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#8B6508] font-bold">
                FIRMS
              </p>
              <p className="font-cormorant font-bold text-sm sm:text-base text-[#2C1518] max-w-sm mx-auto">
                {WEDDING_DETAILS.family.firms.join(' • ')}
              </p>
            </div>

            {/* NANIHAAL PAKSH */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#8B6508] font-bold">
                NANIHAAL PAKSH
              </p>
              <p className="font-cormorant font-bold text-sm sm:text-base text-[#2C1518]">
                {WEDDING_DETAILS.family.nanihaalPaksh.name}
              </p>
            </div>

            {/* SAMDHI PARIVAAR */}
            <div className="space-y-0.5 pb-1">
              <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#8B6508] font-bold">
                SAMDHI PARIVAAR
              </p>
              <p className="font-cormorant font-bold text-sm sm:text-base text-[#2C1518] max-w-sm mx-auto leading-tight">
                {WEDDING_DETAILS.family.samdhiParivaar.members.join(', ')}
              </p>
            </div>
          </div>

          {/* Bottom Card Footer with A-अ Monogram */}
          <div className="relative z-10 pb-4 text-center border-t border-[#6A1B29]/20 pt-2 flex flex-col items-center">
            <div className="flex items-center gap-2">
              <img
                src="/assets/couple_logo.png"
                alt="A-अ"
                className="w-6 h-6 object-contain"
              />
              <h3 className="font-playfair text-2xl sm:text-3xl text-[#5A121E] font-bold">Anchal & Arpit</h3>
            </div>
            <p className="font-cinzel text-[9px] sm:text-[10px] tracking-widest uppercase text-[#2C1518] font-bold mt-0.5">
              Gloria Inn, Bhilwara • 11 & 12 December 2026
            </p>
          </div>
        </section>
      </div>

      {/* RSVP MODAL DIALOG */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        lang={lang}
        dict={dict}
      />
    </div>
  );
}
