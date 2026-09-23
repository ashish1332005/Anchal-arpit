import React, { useState, useRef, useEffect } from 'react';
import EnvelopeOpening from './components/EnvelopeOpening';
import FallingPetals from './components/FallingPetals';
import AudioPlayer from './components/AudioPlayer';
import RsvpModal from './components/RsvpModal';
import { WEDDING_DETAILS } from './data/weddingData';
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Sparkles,
  Flame,
  Crown,
  Share2,
  Globe,
  MessageSquare,
  Navigation,
  Phone
} from 'lucide-react';

/* ======================================================== */
/* ROYAL DESIGN SYSTEM HELPERS (MATCHING SCREENSHOTS)      */
/* ======================================================== */

// Delicate Gold Lotus Blossom Divider with Tapered Lines
function LotusDivider({ color = "#D4AF37", className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-2 my-1 select-none pointer-events-none ${className}`}>
      <div
        className="w-10 sm:w-16 h-[1px] opacity-70"
        style={{
          background: `linear-gradient(to right, transparent, ${color})`
        }}
      />
      <svg className="w-5 h-3.5 shrink-0" viewBox="0 0 24 16" fill="none">
        <circle cx="12" cy="14" r="1" fill={color} />
        <path d="M12 1 C10.5 5, 10.5 10.5, 12 13.5 C13.5 10.5, 13.5 5, 12 1 Z" fill={color} />
        <path d="M12 13.5 C9.5 10, 6.5 7, 5 9 C4.5 11, 7.5 12.5, 12 13.5 Z" fill={color} />
        <path d="M12 13.5 C14.5 10, 17.5 7, 19 9 C19.5 11, 16.5 12.5, 12 13.5 Z" fill={color} />
        <path d="M11 14 C8 12.5, 4 12, 1.5 13 C3 14.5, 7 14.5, 11 14 Z" fill={color} />
        <path d="M13 14 C16 12.5, 20 12, 22.5 13 C21 14.5, 17 14.5, 13 14 Z" fill={color} />
      </svg>
      <div
        className="w-10 sm:w-16 h-[1px] opacity-70"
        style={{
          background: `linear-gradient(to left, transparent, ${color})`
        }}
      />
    </div>
  );
}

// Left & Right Royal Side Flourish Wings
function FlourishWing({ color = "#D4AF37", flip = false, className = "" }) {
  return (
    <svg
      className={`w-7 sm:w-9 h-3 shrink-0 select-none pointer-events-none ${flip ? '-scale-x-100' : ''} ${className}`}
      viewBox="0 0 36 14"
      fill="none"
    >
      <path d="M0 7 H14" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="14" cy="7" r="1.3" fill={color} />
      <path d="M14 7 C17 3, 24 2, 28 5 C25 6, 19 7, 14 7 Z" fill={color} />
      <path d="M14 7 C17 11, 24 12, 28 9 C25 8, 19 7, 14 7 Z" fill={color} />
      <path d="M27 7 Q 31 7, 33 5" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <circle cx="34" cy="4.5" r="1" fill={color} />
    </svg>
  );
}

// Title Flanked by Royal Flourishes
function TitleFlourish({ children, color = "#D4AF37", className = "" }) {
  return (
    <div className={`inline-flex items-center justify-center gap-2 sm:gap-2.5 ${className}`}>
      <FlourishWing color={color} flip={false} />
      {children}
      <FlourishWing color={color} flip={true} />
    </div>
  );
}

// Cloche Icon for Reception / Milni Feasts
function ClocheIcon({ className = "w-4 h-4 text-[#F7D070]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4V2" />
      <path d="M4 14h16" />
      <path d="M4 14a8 8 0 0 1 16 0" fill="currentColor" fillOpacity="0.15" />
      <path d="M2 17h20v2H2z" fill="currentColor" fillOpacity="0.85" />
    </svg>
  );
}

// Pheras Sacred Fire / Mandap Icon
function PherasIcon({ className = "w-4 h-4 text-[#F7D070]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5c1.5 2 2 3.5 1 5.5s-1.5 2.5 0 4.5c-3 0-4.5-2.5-4-5 0.5-2 1.5-3 3-5z" fill="currentColor" fillOpacity="0.75" />
      <path d="M5 14h14l-2 6H7l-2-6z" />
      <path d="M2 20h20" strokeWidth="2" />
    </svg>
  );
}

// Royal Scalloped / Bracketed Timings Card
function OrnateCard({ children, isDark = false, className = "", maxWidth = "max-w-md" }) {
  return (
    <div className={`relative mx-auto w-full ${maxWidth} ${className}`}>
      <div
        className={`relative rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 transition-all ${
          isDark
            ? 'bg-black/60 text-white shadow-[0_8px_32px_rgba(0,0,0,0.7)]'
            : 'bg-[#FFFDF9]/92 text-[#2C1518] shadow-[0_6px_24px_rgba(90,18,30,0.08)]'
        } backdrop-blur-md`}
      >
        {/* SVG Ornate Royal Bracket Frame with vectorEffect for crisp lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            d="M 12 0 L 88 0 C 94 0, 100 6, 96 14 L 96 38 C 98 44, 100 47, 100 50 C 100 53, 98 56, 96 62 L 96 86 C 100 94, 94 100, 88 100 L 12 100 C 6 100, 0 94, 4 86 L 4 62 C 2 56, 0 53, 0 50 C 0 47, 2 44, 4 38 L 4 14 C 0 6, 6 0, 12 0 Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
            opacity="0.9"
          />
          <path
            d="M 14 3 L 86 3 C 91 3, 96 8, 93 15 L 93 39 C 95 44, 97 47, 97 50 C 97 53, 95 56, 93 61 L 93 85 C 96 92, 91 97, 86 97 L 14 97 C 9 97, 4 92, 7 85 L 7 61 C 5 56, 3 53, 3 50 C 3 47, 5 44, 7 39 L 7 15 C 4 8, 9 3, 14 3 Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.8"
            strokeDasharray="2.5 2"
            vectorEffect="non-scaling-stroke"
            opacity="0.4"
          />
        </svg>

        {/* Inner Card Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

// Royal Swipe Up Pill Button with Flourish Wings and Lotus Accent
function RoyalSwipeUp({ onClick, className = "" }) {
  return (
    <div className={`relative z-20 pb-4 text-center flex flex-col items-center select-none pointer-events-auto ${className}`}>
      {/* Centered button flanked by flourish wings */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2">
        <FlourishWing color="#D4AF37" flip={false} className="w-5 sm:w-6 h-2.5 opacity-85" />
        
        <button
          onClick={onClick}
          className="group inline-flex items-center gap-1.5 px-5 sm:px-6 py-1.5 rounded-full bg-gradient-to-r from-[#4A0E18] via-[#631422] to-[#4A0E18] border border-[#D4AF37] shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.2em] font-bold text-[#F7D070] uppercase">
            SWIPE UP
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-[#F7D070] stroke-[2.5] animate-pulse" />
        </button>

        <FlourishWing color="#D4AF37" flip={true} className="w-5 sm:w-6 h-2.5 opacity-85" />
      </div>

      {/* Lotus blossom accent directly underneath */}
      <div className="mt-0.5">
        <LotusDivider color="#D4AF37" className="scale-75 origin-center my-0" />
      </div>
    </div>
  );
}

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
          title: `${WEDDING_DETAILS.couple.bride} & ${WEDDING_DETAILS.couple.groom} Royal Wedding Invitation`,
          text: `You are cordially invited to celebrate the auspicious wedding festivities of ${WEDDING_DETAILS.couple.bride} & ${WEDDING_DETAILS.couple.groom}!`,
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
                `${WEDDING_DETAILS.couple.bride} & ${WEDDING_DETAILS.couple.groom} Royal Wedding - ${WEDDING_DETAILS.dates.venueName}`,
                `${WEDDING_DETAILS.couple.brideFull} and ${WEDDING_DETAILS.couple.groomFull} wedding celebrations on ${WEDDING_DETAILS.dates.display} at ${WEDDING_DETAILS.dates.venueName}`,
                WEDDING_DETAILS.dates.venueName,
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

            {/* Share Link */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full bg-[#5A121E]/90 backdrop-blur-md border border-[#D4AF37] text-[#F7D070] hover:bg-[#800020] transition-colors shadow-xl"
              title="Share Card"
            >
              <Share2 className="w-3.5 h-3.5" />
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
          style={{ backgroundImage: "url('/assets/invitation-main-bg.jpg')" }}
        >
          {/* Confined strictly to upper open sky so resort fountain & arches below are completely UNCOVERED! */}
          <div className="relative z-10 pt-6 sm:pt-8 space-y-1 max-w-sm mx-auto px-3">
            {/* Religious Invocations */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[#5A121E]">
              {WEDDING_DETAILS.invocations.map((invocation, index) => (
                <span
                  key={index}
                  className="font-cinzel text-[10px] sm:text-[11px] tracking-wider font-bold text-[#5A121E] bg-[#FAF7F2]/95 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-xs"
                >
                  {invocation.hi}
                </span>
              ))}
            </div>

            {/* A-अ Couple Monogram */}
            <div className="pt-0.5 flex justify-center">
              <img
                src="/assets/couple_logo.png"
                alt="A-अ Logo"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-sm"
              />
            </div>

            <p className="font-cormorant italic text-xs sm:text-[13px] text-[#2C1518] font-semibold leading-tight pt-0.5">
              With the divine blessings of {WEDDING_DETAILS.couple.groomGrandParents}
            </p>

            <p className="font-cormorant text-[11px] sm:text-xs font-semibold text-[#2C1518] max-w-xs mx-auto leading-tight">
              Kabra Family, requests the pleasure of your gracious presence at the wedding ceremony of their beloved son
            </p>

            {/* GROOM SECTION (FIRST) */}
            <div className="pt-1 space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-[#8B6508] text-[9px] sm:text-[10px] tracking-[0.25em] font-bold uppercase">
                <span className="w-5 h-[1px] bg-[#8B6508]/40" />
                <span>GROOM</span>
                <span className="w-5 h-[1px] bg-[#8B6508]/40" />
              </div>
              <h2 className="font-allura text-3xl sm:text-4xl text-[#5A121E] font-bold drop-shadow-xs leading-none">`n                {WEDDING_DETAILS.couple.groomFull}
              </h2>
              <p className="font-cormorant text-[11px] sm:text-xs font-semibold text-[#2C1518] leading-tight">
                S/o — {WEDDING_DETAILS.couple.groomParents}
              </p>
              <p className="font-cormorant text-[11px] sm:text-xs font-semibold text-[#2C1518] leading-tight">
                G/S/o — {WEDDING_DETAILS.couple.groomGrandParents}
              </p>
            </div>

            {/* with and Lotus divider */}
            <div className="py-0.5 space-y-0.5">
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-[1px] bg-[#8B6508]/40" />
                <span className="font-allura text-2xl text-[#8B6508] font-bold leading-none">with</span>
                <span className="w-8 h-[1px] bg-[#8B6508]/40" />
              </div>
              <LotusDivider color="#D4AF37" className="scale-75 origin-center my-0" />
            </div>

            {/* BRIDE SECTION (SECOND) */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-[#8B6508] text-[9px] sm:text-[10px] tracking-[0.25em] font-bold uppercase">
                <span className="w-5 h-[1px] bg-[#8B6508]/40" />
                <span>BRIDE</span>
                <span className="w-5 h-[1px] bg-[#8B6508]/40" />
              </div>
              <h2 className="font-allura text-3xl sm:text-4xl text-[#5A121E] font-bold drop-shadow-xs leading-none">`n                {WEDDING_DETAILS.couple.brideFull}
              </h2>
              <p className="font-cormorant text-[11px] sm:text-xs font-semibold text-[#2C1518] leading-tight">
                D/o — {WEDDING_DETAILS.couple.brideParents}
              </p>
              <p className="font-cormorant text-[11px] sm:text-xs font-semibold text-[#2C1518] leading-tight">
                G/D/o — {WEDDING_DETAILS.couple.brideGrandParents}
              </p>
            </div>

            {/* Date & Venue in Ornate Card */}
            <div className="pt-1.5">
              <OrnateCard isDark={false} maxWidth="max-w-xs sm:max-w-sm">
                <div className="flex items-center justify-center gap-2 text-center py-0.5 text-[#5A121E] font-cinzel font-bold text-[10px] sm:text-xs tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-[#8B6508] shrink-0" />
                  <span>{WEDDING_DETAILS.dates.display.toUpperCase()}</span>
                  <span className="text-[#D4AF37] mx-0.5">|</span>
                  <Navigation className="w-3.5 h-3.5 text-[#8B6508] shrink-0" />
                  <span>{WEDDING_DETAILS.dates.venueName.toUpperCase()}</span>
                </div>
              </OrnateCard>
              <LotusDivider color="#D4AF37" className="scale-75 origin-center mt-1" />
            </div>
          </div>

          {/* Bottom Royal SWIPE UP button */}
          <RoyalSwipeUp onClick={() => scrollToSlide(1)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 2: SAVE THE DATE / GROOM WITH BRIDE */}
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
              GROOM WITH BRIDE
            </p>

            <h1 className="font-allura text-5xl sm:text-6xl text-gold-gradient font-bold drop-shadow-lg leading-none">
              {WEDDING_DETAILS.couple.groom} &amp; {WEDDING_DETAILS.couple.bride}
            </h1>

            {/* Tap to Reveal Date Button */}
            <div className="pt-2">
              <button
                onClick={() => setDateRevealed(!dateRevealed)}
                className="px-6 py-2.5 rounded-xl border border-[#D4AF37] bg-[#1A0E13]/90 backdrop-blur-md text-[#F7D070] font-cinzel text-xs sm:text-sm tracking-widest font-bold uppercase shadow-2xl hover:scale-105 transition-transform"
              >
                {dateRevealed ? WEDDING_DETAILS.dates.display.toUpperCase() : '✦ TAP TO REVEAL DATE ✦'}
              </button>
            </div>

            <p className="font-cormorant text-base sm:text-lg text-[#F7D070] font-semibold pt-1">
              {WEDDING_DETAILS.dates.venueName}
            </p>
          </div>

          <div className="relative z-10 pb-2 space-y-1">
            <h3 className="font-cinzel text-xs sm:text-sm tracking-[0.2em] text-[#F7D070] font-bold uppercase drop-shadow-md">
              SAVE THE DATE
            </h3>
            <p className="font-playfair text-2xl sm:text-3xl text-white drop-shadow-lg font-bold pb-1">
              Wedding Festivities Await You
            </p>

            <RoyalSwipeUp onClick={() => scrollToSlide(2)} />
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
          <div className="relative z-10 pt-12 sm:pt-14 space-y-1.5 max-w-sm mx-auto px-4">
            <div className="flex items-center justify-center">
              <img src="/assets/ganesh.png" alt="Lord Ganesha" className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-md" />
            </div>
            <p className="font-cinzel text-xs sm:text-sm tracking-widest text-[#F7D070] font-bold uppercase drop-shadow-md">
              || श्री गणेशाय नमः ||
            </p>

            <TitleFlourish color="#F7D070">
              <h2 className="font-playfair text-3xl sm:text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] font-bold tracking-wide leading-tight">
                Vinayak Sthapna
              </h2>
            </TitleFlourish>

            <LotusDivider color="#D4AF37" />

            <div className="pt-1">
              <OrnateCard isDark={true} maxWidth="max-w-xs">
                <div className="space-y-1 font-cormorant text-white text-center py-1">
                  <p className="font-bold text-base sm:text-lg text-[#FFF5C0] drop-shadow-sm">
                    Friday, 11th December 2026 • 07:00 AM
                  </p>
                  <p className="text-sm sm:text-base text-[#F7D070] font-bold drop-shadow-sm">
                    (Breakfast : 09:00 AM)
                  </p>
                </div>
              </OrnateCard>
            </div>

            <LotusDivider color="#D4AF37" />
          </div>

          <RoyalSwipeUp onClick={() => scrollToSlide(3)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 4: CARNIVAL (11 December Afternoon) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/carnival-bg.png')" }}
        >
          {/* Confined to upper sky so floral arch, fountain & pavilions below are completely visible! */}
          <div className="relative z-10 pt-8 sm:pt-10 space-y-1.5 max-w-sm mx-auto px-4">
            <TitleFlourish color="#5A121E">
              <h2 className="font-playfair text-3xl sm:text-4xl text-[#5A121E] font-bold drop-shadow-sm tracking-wide leading-tight">
                Carnival
              </h2>
            </TitleFlourish>

            <LotusDivider color="#D4AF37" />

            <p className="font-cormorant italic text-xs sm:text-sm font-semibold text-[#2C1518] max-w-xs mx-auto leading-snug">
              "A vibrant celebration of laughter, love, music and endless memories"
            </p>

            <div className="pt-1">
              <OrnateCard isDark={false} maxWidth="max-w-xs">
                <div className="space-y-1 font-cormorant text-[#2C1518] text-center py-1">
                  <p className="font-bold text-sm sm:text-base text-[#5A121E]">
                    Friday, 11th December 2026 • 11:00 AM
                  </p>
                  <p className="text-xs sm:text-sm text-[#8B6508] font-bold">
                    (Lunch — Carnival : 01:00 PM)
                  </p>
                </div>
              </OrnateCard>
            </div>

            <LotusDivider color="#D4AF37" />
          </div>

          <RoyalSwipeUp onClick={() => scrollToSlide(4)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 5: SANGEET & RING CEREMONY (11 December Evening) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center text-white select-none"
          style={{ backgroundImage: "url('/assets/sangeet-bg.png')" }}
        >
          {/* Confined strictly to upper dark starry sky so dancing couple is 100% UNTOUCHED! */}
          <div className="relative z-10 pt-8 sm:pt-10 space-y-1.5 max-w-sm mx-auto px-4">
            <TitleFlourish color="#F7D070">
              <h2 className="font-playfair text-2xl sm:text-3xl text-gold-gradient font-bold drop-shadow-md tracking-wide leading-tight">
                Sangeet &amp; Ring Ceremony
              </h2>
            </TitleFlourish>

            <LotusDivider color="#D4AF37" />

            <div className="pt-1">
              <OrnateCard isDark={true} maxWidth="max-w-xs">
                <div className="font-cormorant text-center py-1">
                  <p className="font-bold text-sm sm:text-base text-[#FFF5C0] drop-shadow-sm">
                    Friday, 11th December 2026 • 07:00 PM
                  </p>
                </div>
              </OrnateCard>
            </div>

            {/* Couplet */}
            <p className="font-cormorant italic text-xs sm:text-sm text-[#FFF9D2] max-w-xs mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] pt-1 leading-snug">
              "Let's dance, let's sing, let our hearts take flight,
              As we celebrate this love under the stars tonight."
            </p>

            <LotusDivider color="#D4AF37" />
          </div>

          <RoyalSwipeUp onClick={() => scrollToSlide(5)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 6: MANGAL KALASH (12 December Morning) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/kalash-bg.png')" }}
        >
          {/* Confined strictly inside upper temple arch so golden Kalash & ladies are completely visible! */}
          <div className="relative z-10 pt-13 sm:pt-15 space-y-1.5 max-w-sm mx-auto px-4">
            {/* Auspicious Inscription */}
            <div className="flex items-center justify-center gap-2">
              <span className="w-6 h-[1px] bg-[#8B6508]/40" />
              <p className="font-cinzel text-xs sm:text-sm tracking-widest text-[#5A121E] font-bold">
                ॥ शुभारम्भ ॥
              </p>
              <span className="w-6 h-[1px] bg-[#8B6508]/40" />
            </div>

            <TitleFlourish color="#5A121E">
              <h2 className="font-playfair text-4xl sm:text-5xl text-[#5A121E] font-bold drop-shadow-sm tracking-wide leading-tight">
                Mangal Kalash
              </h2>
            </TitleFlourish>

            <LotusDivider color="#D4AF37" />

            <div className="space-y-1 font-cormorant text-[#2C1518]">
              <p className="font-bold text-lg sm:text-xl text-[#5A121E]">
                Saturday, 12th December 2026 • 09:00 AM
              </p>
            </div>

            <LotusDivider color="#D4AF37" />

            <p className="font-cormorant font-bold text-sm sm:text-base text-[#8B6508]">
              (Breakfast : 09:00 AM)
            </p>
          </div>

          <RoyalSwipeUp onClick={() => scrollToSlide(6)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 7: MAYRA (12 December Mid-day) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/bhaatbharai-bg.png')" }}
        >
          {/* Confined to upper palace sky so royal gift baskets & sweets are completely visible! */}
          <div className="relative z-10 pt-13 sm:pt-15 space-y-2 max-w-sm mx-auto px-4">
            <div className="flex justify-center">
              <img src="/assets/couple_logo.png" alt="A-अ" className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-sm" />
            </div>

            <LotusDivider color="#D4AF37" />

            <TitleFlourish color="#5A121E">
              <h2 className="font-playfair text-4xl sm:text-5xl text-[#5A121E] font-bold drop-shadow-sm tracking-wide leading-tight">
                Mayra
              </h2>
            </TitleFlourish>

            <p className="font-cormorant italic text-sm sm:text-base font-semibold text-[#2C1518] max-w-xs mx-auto leading-snug">
              "Where traditions are cherished and blessings are shared"
            </p>

            <div className="pt-1">
              <OrnateCard isDark={false} maxWidth="max-w-xs">
                <div className="space-y-1.5 font-cormorant text-[#5A121E] text-center py-1">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4.5 h-4.5 text-[#8B6508] shrink-0" />
                    <span className="font-bold text-base sm:text-lg">Saturday, 12th December 2026</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4.5 h-4.5 text-[#8B6508] shrink-0" />
                    <span className="font-bold text-base sm:text-lg">11:00 AM</span>
                  </div>
                </div>
              </OrnateCard>
            </div>

            <LotusDivider color="#D4AF37" />
          </div>

          <RoyalSwipeUp onClick={() => scrollToSlide(7)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 8: MILNI, BADHAI & NIKASI (12 December Afternoon) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/welcomefeast-bg.png')" }}
        >
          {/* Confined to upper garden sky so royal banquet tables & guests are completely visible! */}
          <div className="relative z-10 pt-12 sm:pt-14 space-y-1.5 max-w-sm mx-auto px-4">
            <div className="flex justify-center">
              <img src="/assets/couple_logo.png" alt="A-अ" className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-sm" />
            </div>

            <LotusDivider color="#D4AF37" />

            <TitleFlourish color="#5A121E">
              <h2 className="font-playfair text-3xl sm:text-4xl text-[#5A121E] font-bold drop-shadow-sm tracking-wide leading-tight">
                Wedding Ceremony
              </h2>
            </TitleFlourish>

            <p className="font-cormorant italic text-sm sm:text-base font-semibold text-[#2C1518] max-w-xs mx-auto leading-snug">
              "Welcoming our dear ones with open hearts and warm smiles"
            </p>

            <p className="font-cormorant font-bold text-base sm:text-lg text-[#5A121E] pt-0.5">
              Saturday, 12th December 2026
            </p>

            <div className="pt-1">
              <OrnateCard isDark={false} maxWidth="max-w-md">
                <div className="grid grid-cols-3 items-center text-center divide-x divide-[#D4AF37]/50 font-cormorant text-[#5A121E] py-1.5">
                  <div className="flex items-center justify-center gap-1.5 px-1">
                    <ClocheIcon className="w-4 h-4 text-[#8B6508] shrink-0" />
                    <div className="text-left leading-tight">
                      <span className="font-bold text-sm sm:text-base">Milni</span>
                      <span className="text-xs sm:text-sm block text-[#2C1518]">4:00 PM</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 px-1">
                    <Sparkles className="w-4 h-4 text-[#8B6508] shrink-0" />
                    <div className="text-left leading-tight">
                      <span className="font-bold text-sm sm:text-base">Badhai</span>
                      <span className="text-xs sm:text-sm block text-[#2C1518]">4:00 PM</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 px-1">
                    <Crown className="w-4 h-4 text-[#8B6508] shrink-0" />
                    <div className="text-left leading-tight">
                      <span className="font-bold text-sm sm:text-base">Nikasi</span>
                      <span className="text-xs sm:text-sm block text-[#2C1518]">6:00 PM</span>
                    </div>
                  </div>
                </div>
              </OrnateCard>
            </div>

            <LotusDivider color="#D4AF37" />
          </div>

          <RoyalSwipeUp onClick={() => scrollToSlide(8)} />
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/65 pointer-events-none" />

          {/* Confined strictly to upper fireworks sky so bride & groom below are 100% UNTOUCHED! */}
          <div className="relative z-10 pt-10 sm:pt-12 space-y-1.5 max-w-sm sm:max-w-md mx-auto px-2">
            <div className="flex justify-center">
              <img src="/assets/couple_logo_gold.png" alt="A-अ" className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-md" />
            </div>

            <LotusDivider color="#D4AF37" />

            <div className="space-y-0.5">
              <h2 className="font-playfair text-2xl sm:text-3xl text-gold-gradient font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] tracking-wide leading-tight">
                Reception &amp;
              </h2>
              <TitleFlourish color="#D4AF37">
                <h2 className="font-playfair text-2xl sm:text-3xl text-gold-gradient font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] tracking-wide leading-tight">
                  Sacred Pheras
                </h2>
              </TitleFlourish>
            </div>

            <LotusDivider color="#D4AF37" />

            <p className="font-cormorant italic font-bold text-sm sm:text-base text-[#FFF5C0] tracking-wide drop-shadow-md">
              Saturday, 12th December 2026
            </p>

            {/* Highlighted 3-Column Ornate Timings Card matching Screenshot 1 */}
            <div className="pt-1">
              <OrnateCard isDark={true} maxWidth="max-w-md">
                <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center text-center py-1 px-1">
                  {/* Reception & Dinner */}
                  <div className="flex flex-col items-center">
                    <ClocheIcon className="w-4 h-4 text-[#F7D070] mb-0.5" />
                    <p className="font-playfair text-[11px] sm:text-xs font-bold text-[#F7D070] leading-tight">
                      Reception &amp; Dinner
                    </p>
                    <p className="font-cormorant text-[10px] sm:text-xs text-white/90 font-medium">
                      7:00 PM
                    </p>
                  </div>

                  {/* Bullet separator */}
                  <div className="px-1 text-[#D4AF37] font-bold text-xs sm:text-sm">•</div>

                  {/* Toran */}
                  <div className="flex flex-col items-center">
                    <Flame className="w-4 h-4 text-[#F7D070] mb-0.5" />
                    <p className="font-playfair text-[11px] sm:text-xs font-bold text-[#F7D070] leading-tight">
                      Toran
                    </p>
                    <p className="font-cormorant text-[10px] sm:text-xs text-white/90 font-medium">
                      8:30 PM
                    </p>
                  </div>

                  {/* Vertical bar separator */}
                  <div className="h-7 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent mx-1" />

                  {/* Pheras */}
                  <div className="flex flex-col items-center">
                    <PherasIcon className="w-4 h-4 text-[#F7D070] mb-0.5" />
                    <p className="font-playfair text-[11px] sm:text-xs font-bold text-[#F7D070] leading-tight">
                      Pheras
                    </p>
                    <p className="font-cormorant text-[10px] sm:text-xs text-white/90 font-medium">
                      10:30 PM
                    </p>
                  </div>
                </div>
              </OrnateCard>
            </div>

            {/* Couplet */}
            <p className="font-cormorant italic text-[11px] sm:text-xs text-[#FFF5C0] max-w-xs sm:max-w-sm mx-auto drop-shadow-md leading-relaxed pt-1">
              "With loved ones near and promises true, we begin the journey of a lifetime, as one, not two."
            </p>

            <LotusDivider color="#D4AF37" />
          </div>

          <RoyalSwipeUp onClick={() => scrollToSlide(9)} />
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
              alt={`${WEDDING_DETAILS.dates.venueName} map location`}
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
              {WEDDING_DETAILS.dates.venueName}
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
          <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-auto">
            <RoyalSwipeUp onClick={() => scrollToSlide(10)} />
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 11: WITH LOVE & BLESSINGS — PART 1 */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-center items-center p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center text-[#2C1518] select-none"
          style={{ backgroundImage: "url('/assets/rsvp-1-bg.png')", backgroundAttachment: 'fixed' }}
        >
          {/* Content matching Screenshot 1 */}
          <div className="relative z-10 max-w-sm sm:max-w-md mx-auto w-full px-4 space-y-4 sm:space-y-5 py-4">
            {/* Header */}
            <div className="space-y-1">
              <h2 className="font-allura text-4xl sm:text-5xl text-[#5A121E] font-normal tracking-wide drop-shadow-xs">
                With Love &amp; Blessings
              </h2>
              <div className="w-28 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
            </div>

            {/* WARM REGARDS */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                WARM REGARDS
              </p>
              {WEDDING_DETAILS.family.warmRegards.map((item, idx) => (
                <p key={idx} className="font-cormorant font-semibold text-sm sm:text-base text-[#2C1518] leading-tight">
                  {item}
                </p>
              ))}
            </div>

            {/* SPECIAL REQUEST 1 */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                SPECIAL REQUEST
              </p>
              {WEDDING_DETAILS.family.specialRequest1.map((item, idx) => (
                <p key={idx} className="font-cormorant font-semibold text-sm sm:text-base text-[#2C1518] leading-tight">
                  {item}
                </p>
              ))}
            </div>

            {/* SPECIAL REQUEST 2 */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                SPECIAL REQUEST
              </p>
              {WEDDING_DETAILS.family.specialRequest2.map((item, idx) => (
                <p key={idx} className="font-cormorant font-semibold text-sm sm:text-base text-[#2C1518] leading-tight">
                  {item}
                </p>
              ))}
            </div>

            {/* MITHI MANUHAR */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                MITHI MANUHAR
              </p>
              {WEDDING_DETAILS.family.mithiManuhar.map((item, idx) => (
                <p key={idx} className="font-cormorant font-semibold text-sm sm:text-base text-[#2C1518] leading-tight">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 12: WITH LOVE & BLESSINGS — PART 2 (Continuation) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center text-[#2C1518] select-none"
          style={{ backgroundImage: "url('/assets/rsvp-1-bg.png')", backgroundAttachment: 'fixed' }}
        >
          {/* Content matching Screenshot 2 */}
          <div className="relative z-10 my-auto max-w-sm sm:max-w-md mx-auto w-full px-4 space-y-3 sm:space-y-3.5 py-4">
            {/* Inviting Quote */}
            <div className="max-w-xs sm:max-w-sm mx-auto space-y-1">
              <p className="font-cormorant italic text-sm sm:text-base text-[#2C1518] font-semibold leading-relaxed">
                "{WEDDING_DETAILS.translations[lang].familyInviteQuote}"
              </p>
              <p className="font-playfair text-base sm:text-lg text-[#5A121E] font-bold">— Kabra &amp; Chechani Parivaar</p>
            </div>

            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto" />

            {/* RSVP SECTION CARD */}
            <div className="bg-[#FAF7F2]/90 backdrop-blur-xs rounded-xl p-2.5 border border-[#D4AF37]/60 shadow-xs max-w-sm mx-auto space-y-1">
              <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#5A121E] font-bold">
                RSVP
              </p>
              <p className="font-cormorant font-bold text-sm sm:text-base text-[#2C1518]">
                {WEDDING_DETAILS.family.rsvp.names.join(' • ')}
              </p>
              <p className="font-cormorant text-xs sm:text-sm text-[#2C1518]">
                {WEDDING_DETAILS.family.rsvp.address}, {WEDDING_DETAILS.family.rsvp.city}
              </p>
              {/* Phone numbers with click to call */}
              <div className="pt-0.5 flex flex-wrap items-center justify-center gap-1.5">
                {WEDDING_DETAILS.family.rsvp.phones.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:+91${phone}`}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#5A121E] text-[#F7D070] font-cinzel text-[10px] sm:text-xs font-bold hover:scale-105 transition-transform"
                  >
                    <Phone className="w-2.5 h-2.5" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* WITH BEST COMPLIMENTS */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8B6508] font-bold">
                WITH BEST COMPLIMENTS
              </p>
              <p className="font-cormorant font-semibold text-xs sm:text-sm text-[#2C1518] max-w-sm mx-auto leading-tight">
                {WEDDING_DETAILS.family.withBestCompliments.members}
              </p>
              <p className="font-cormorant font-bold text-xs sm:text-sm text-[#5A121E]">
                {WEDDING_DETAILS.family.withBestCompliments.familyTitle}
              </p>
            </div>

            {/* FIRMS */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8B6508] font-bold">
                FIRMS
              </p>
              <p className="font-cormorant font-semibold text-xs sm:text-sm text-[#2C1518] max-w-sm mx-auto">
                {WEDDING_DETAILS.family.firms.join(' • ')}
              </p>
            </div>

            {/* NANIHAAL PAKSH */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8B6508] font-bold">
                NANIHAAL PAKSH
              </p>
              <p className="font-cormorant font-semibold text-xs sm:text-sm text-[#2C1518]">
                {WEDDING_DETAILS.family.nanihaalPaksh.name}
              </p>
            </div>

            {/* SAMDHI PARIVAAR */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8B6508] font-bold">
                SAMDHI PARIVAAR
              </p>
              <p className="font-cormorant font-semibold text-xs sm:text-sm text-[#2C1518] max-w-sm mx-auto leading-tight">
                {WEDDING_DETAILS.family.samdhiParivaar.members.join(', ')}
              </p>
            </div>

            {/* Card Footer with A-अ Monogram */}
            <div className="pt-2 border-t border-[#6A1B29]/20 flex flex-col items-center">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/couple_logo.png"
                  alt="A-अ"
                  className="w-5 h-5 object-contain"
                />
                <h3 className="font-allura text-3xl sm:text-4xl text-[#5A121E] font-bold leading-none">{WEDDING_DETAILS.couple.groom} &amp; {WEDDING_DETAILS.couple.bride}</h3>
              </div>
              <p className="font-cinzel text-[9px] sm:text-[10px] tracking-widest uppercase text-[#2C1518] font-bold mt-0.5">
                {WEDDING_DETAILS.dates.venueName} • {WEDDING_DETAILS.dates.display}
              </p>
            </div>
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
