import React, { useState, useRef, useEffect } from 'react';
import EnvelopeOpening from './components/EnvelopeOpening';
import FallingPetals from './components/FallingPetals';
import AudioPlayer from './components/AudioPlayer';
import RsvpModal from './components/RsvpModal';
import ScratchDateReveal from './components/ScratchDateReveal';
import Countdown from './components/Countdown';
import { WEDDING_DETAILS } from './data/weddingData';
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Navigation,
  Utensils,
  Crown,
  Share2,
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
      <div className={`relative px-2 py-1.5 transition-all ${isDark ? 'text-white' : 'text-[#2C1518]'}`}>
        {children}
      </div>
    </div>
  );
}

// Royal Swipe Up Pill Button with Flourish Wings and Lotus Accent
function RoyalSwipeUp({ onClick, className = "", label = "SWIPE UP" }) {
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
            {label}
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
  const [showScratchFlowers, setShowScratchFlowers] = useState(false);

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
          title: `${WEDDING_DETAILS.couple.groom} & ${WEDDING_DETAILS.couple.bride} | Royal Wedding Invitation`,
          text: `You are cordially invited to celebrate the royal wedding festivities of ${WEDDING_DETAILS.couple.groom} & ${WEDDING_DETAILS.couple.bride}!`,
          url: window.location.href,
        })
        .catch(() => { });
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
                `${WEDDING_DETAILS.couple.bride} and ${WEDDING_DETAILS.couple.groom} wedding celebrations on ${WEDDING_DETAILS.dates.display} at ${WEDDING_DETAILS.dates.venueName}`,
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
        className={`w-full h-[100dvh] relative bg-[#FAF7F2] no-scrollbar ${isUnlocked
            ? 'snap-y snap-mandatory overflow-y-scroll scroll-smooth'
            : 'overflow-hidden'
          }`}
      >
        {/* ======================================================== */}
        {/* ======================================================== */}
        {/* SLIDE 1: MAIN INVITATION CARD (Page 2 — Wedding Invitation) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/Watercolor%20Botanical%20Wedding%20Border.png')", backgroundSize: '100% 100%' }}
        >
          {/* Restored family invitation details, balanced in the parchment space */}
          <div className="relative z-10 w-full max-w-md mx-auto px-6 pt-[8vh] pb-3 flex-1 flex flex-col items-center justify-start gap-6 sm:gap-7 text-[#2C1518]">
            <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1 font-cinzel font-bold leading-tight tracking-wide text-[#7B1124]">
              <p className="text-center text-[8px] sm:text-[10px]">{WEDDING_DETAILS.invocations[0].en}</p>
              <div className="flex flex-col items-center gap-1 text-center">
                <img src="/assets/ganesh.png" alt="Lord Ganesha" className="h-10 w-10 object-contain" />
                <p className="whitespace-nowrap text-[9px] sm:text-xs">{WEDDING_DETAILS.invocations[1].en}</p>
              </div>
              <p className="text-center text-[8px] sm:text-[10px]">{WEDDING_DETAILS.invocations[2].en}</p>
            </div>

            <img src="/assets/couple_logo.png" alt="Arpit and Anchal monogram" className="w-9 h-9 object-contain" />

            <p className="max-w-[340px] font-cormorant text-base sm:text-lg leading-snug font-medium">
              The Kabra family requests the pleasure of your company at the wedding celebration of Arpit and Anchal.
            </p>

            <div className="w-full space-y-0.5">
              <h1 className="font-allura text-5xl sm:text-6xl text-[#5A121E] font-bold leading-none">{WEDDING_DETAILS.couple.groom}</h1>
              <p className="font-cormorant text-sm sm:text-base leading-snug">Grandson of {WEDDING_DETAILS.couple.groomGrandParents}</p>
              <p className="font-cormorant text-sm sm:text-base leading-snug">Son of {WEDDING_DETAILS.couple.groomParents}</p>
            </div>

            <div className="flex items-center justify-center gap-3 w-full">
              <span className="w-10 h-px bg-[#8B6508]/50" />
              <span className="font-playfair text-sm text-[#8B6508] font-semibold">with</span>
              <span className="w-10 h-px bg-[#8B6508]/50" />
            </div>

            <div className="w-full space-y-0.5">
              <h2 className="font-allura text-5xl sm:text-6xl text-[#5A121E] font-bold leading-none">{WEDDING_DETAILS.couple.bride}</h2>
              <p className="font-cormorant text-sm sm:text-base leading-snug">Granddaughter of {WEDDING_DETAILS.couple.brideGrandParents}</p>
              <p className="font-cormorant text-sm sm:text-base leading-snug">Daughter of {WEDDING_DETAILS.couple.brideParents}</p>
            </div>
          </div>

          {/* Bottom Royal SWIPE UP button */}
          <div className="relative z-20 pb-4">
            <RoyalSwipeUp onClick={() => scrollToSlide(1)} label="SWIPE UP" />
          </div>
        </section>        {/* ======================================================== */}
        {/* SLIDE 2: SCRATCH-TO-REVEAL DATE & VENUE (COMPACT SPACE) */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-auto min-h-0 snap-start relative flex flex-col items-center justify-center px-4 py-5 sm:py-7 overflow-hidden text-center bg-[#F3E9D9] select-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#fffdf8_0%,_#f7f0e4_58%,_#eadcc8_100%)]" />

          {/* Scratch Bloom Animation */}
          {showScratchFlowers && (
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
              {Array.from({ length: 30 }, (_, index) => (
                <img
                  key={index}
                  src="/assets/Isolated%20Cream%20Daisy%20Flower.png"
                  alt=""
                  className="absolute left-1/2 top-1/2 animate-flower-burst object-contain"
                  style={{
                    width: `clamp(60px, ${8 + (index % 5) * 4}vw, 120px)`,
                    '--flower-x': `${(Math.random() * 100) - 50}vw`,
                    '--flower-y': `${(Math.random() * 100) - 50}vh`,
                    '--flower-rotation': `${Math.random() * 360}deg`,
                    animationDelay: `${Math.random() * 200}ms`,
                    animationDuration: `${600 + Math.random() * 200}ms`,
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center justify-center">
            {/* The Scratch Card: Compact square/box area only */}
            <div className="my-1">
              <ScratchDateReveal revealed={dateRevealed} onReveal={() => {
                setDateRevealed(true);
                setShowScratchFlowers(true);
                setTimeout(() => setShowScratchFlowers(false), 1200);
              }} />
            </div>

            {/* ONLY REVEALED AFTER SCRATCHING: Naturally expands space according to content */}
            {dateRevealed && (
              <div className="w-full mt-3 space-y-2 animate-fadeIn transition-all duration-700">
                <div className="w-full space-y-0.5">
                  <p className="font-cinzel text-[10px] uppercase tracking-[0.16em] text-[#8B6508] font-bold">Royal Wedding Date &amp; Venue</p>
                  <p className="font-cormorant text-base font-bold text-[#5A121E]">{WEDDING_DETAILS.dates.display}</p>
                  <p className="font-cormorant text-sm font-semibold text-[#2C1518]">{WEDDING_DETAILS.dates.venueName}</p>
                </div>

                {/* Countdown */}
                <div className="mx-auto w-full max-w-xs pt-1">
                  <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#8B6508] font-bold mb-1.5">
                    Countdown to the wedding
                  </p>
                  <Countdown targetDateIso={WEDDING_DETAILS.dates.startDateIso} />
                </div>

                {/* View Events Button */}
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => scrollToSlide(2)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4A0E18] via-[#631422] to-[#4A0E18] border border-[#D4AF37] shadow-lg text-[#F7D070] font-cinzel text-xs font-bold tracking-wider uppercase hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>View Wedding Events</span>
                    <ChevronDown className="h-3.5 w-3.5 text-[#F7D070]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 3: VINAYAK STHAPNA (11 December Morning) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center text-[#5A121E] select-none"
          style={{ backgroundImage: "url('/assets/74c1371d-2510-43ca-bfad-2e054f6048f7.png')", backgroundSize: '100% 100%' }}
        >
          {/* Top spacer so the sacred Ganesha artwork in the upper half remains 100% unobstructed */}
          <div className="flex-1 min-h-[48vh] sm:min-h-[50vh]" />

          {/* Text positioned strictly in the open blank parchment space */}
          <div className="relative z-10 space-y-1.5 max-w-sm mx-auto px-4 pb-1">
            <TitleFlourish color="#8B6508">
              <h2 className="font-allura whitespace-nowrap text-4xl sm:text-5xl text-[#5A121E] drop-shadow-sm font-bold leading-tight">
                Vinayak Sthapna
              </h2>
            </TitleFlourish>

            <LotusDivider color="#D4AF37" className="scale-75 my-0.5" />

            <div className="font-cormorant text-[#5A121E] space-y-0.5 leading-snug">
              <p className="font-bold text-base sm:text-lg text-[#5A121E]">
                Friday, 11 December 2026
              </p>
              <p className="font-semibold text-sm sm:text-base text-[#7B1124]">
                Auspicious Sthapna : 7:00 AM
              </p>
              <p className="text-[#8B6508] font-bold text-xs sm:text-sm">
                Breakfast : 9:00 AM
              </p>
            </div>
          </div>

          <RoyalSwipeUp onClick={() => scrollToSlide(3)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 4: CARNIVAL (11 December Afternoon) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/carnival-new-bg.jpg')" }}
        >
          {/* Positioned in the blank open sky area below the top canopy tassels */}
          <div className="relative z-10 pt-[27vh] sm:pt-[29vh] space-y-1.5 max-w-sm mx-auto px-4">
            <TitleFlourish color="#5A121E">
              <h2 className="font-allura text-5xl sm:text-6xl text-[#5A121E] font-bold drop-shadow-sm leading-tight">
                Carnival
              </h2>
            </TitleFlourish>

            <LotusDivider color="#D4AF37" className="scale-75 my-0.5" />

            <p className="font-cormorant italic text-xs sm:text-sm font-semibold text-[#2C1518] max-w-xs mx-auto leading-snug">
              "A vibrant celebration of laughter, love, music and endless memories"
            </p>

            <div className="pt-0.5">
              <OrnateCard isDark={false} maxWidth="max-w-xs">
                <div className="space-y-0.5 font-cormorant text-[#2C1518] text-center py-1">
                  <p className="font-bold text-sm sm:text-base text-[#5A121E]">
                    Friday, 11 December 2026 - 11:00 AM
                  </p>
                  <p className="text-xs sm:text-sm text-[#8B6508] font-bold">
                    Lunch: 1:00 PM
                  </p>
                </div>
              </OrnateCard>
            </div>

            <LotusDivider color="#D4AF37" className="scale-75 my-0.5" />
          </div>

          {/* Spacer to keep garden lounge & parasols visible below */}
          <div className="flex-1 min-h-[20vh]" />

          <RoyalSwipeUp onClick={() => scrollToSlide(4)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 5: SANGEET & RING CEREMONY (11 December Evening) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/Dreamy%20Floral%20Wedding%20Pavilion.png')" }}
        >
          {/* Keep all Sangeet text within the clear central space of the pavilion artwork. */}
          <div className="relative z-10 pt-[19vh] sm:pt-[21vh] space-y-1.5 max-w-sm mx-auto px-4">
            <TitleFlourish color="#F7D070">
              <h2 className="font-allura text-4xl sm:text-5xl text-[#5A121E] font-bold drop-shadow-sm leading-tight">
                <span className="block">Sangeet</span>
                <span className="block">&amp; Ring Ceremony</span>
              </h2>
            </TitleFlourish>

            <LotusDivider color="#D4AF37" />

            <div className="pt-1">
              <OrnateCard isDark={false} maxWidth="max-w-xs">
                <div className="font-cormorant text-center py-1">
                  <div className="font-bold text-sm sm:text-base text-[#5A121E] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                    <p>Friday, 11 December 2026</p>
                    <p>7:00 PM</p>
                  </div>
                </div>
              </OrnateCard>
            </div>

            {/* Couplet */}
            <p className="font-cormorant italic text-xs sm:text-sm font-semibold text-[#2C1518] max-w-xs mx-auto drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)] pt-1 leading-snug">
              <span className="block">"Let's dance, let's sing, let our hearts take flight,</span>
              <span className="block">As we celebrate this love under the stars tonight."</span>
            </p>

            <LotusDivider color="#D4AF37" />
          </div>

          <RoyalSwipeUp onClick={() => scrollToSlide(5)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 6: MANGAL KALASH (12 December Morning) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/Elegant%20Indian%20Wedding%20Kalash%20Invitation%20Frame.png')" }}
        >
          {/* Confined to the open center watercolor space with high-contrast royal maroon & gold */}
          <div className="relative z-10 pt-[20vh] sm:pt-[22vh] space-y-1.5 max-w-sm mx-auto px-4">
            {/* Auspicious Inscription */}
            <div className="flex items-center justify-center gap-2">
              <span className="w-6 h-[1px] bg-[#8B6508]/60" />
              <p className="font-cinzel text-xs sm:text-sm tracking-widest text-[#5A121E] font-bold">
                ॥ शुभारम्भ ॥
              </p>
              <span className="w-6 h-[1px] bg-[#8B6508]/60" />
            </div>

            <TitleFlourish color="#5A121E">
              <h2 className="font-allura text-5xl sm:text-6xl text-[#5A121E] font-bold drop-shadow-xs leading-tight">
                Mangal Kalash
              </h2>
            </TitleFlourish>

            <LotusDivider color="#8B6508" className="scale-75 my-0.5" />

            <div className="pt-0.5">
              <OrnateCard isDark={false} maxWidth="max-w-xs">
                <div className="space-y-0.5 font-cormorant text-center py-1">
                  <p className="font-bold text-base sm:text-lg text-[#5A121E]">
                    Saturday, 12 December 2026
                  </p>
                  <p className="font-bold text-sm sm:text-base text-[#8B6508]">
                    Mangal Kalash and breakfast: 9:00 AM
                  </p>
                </div>
              </OrnateCard>
            </div>

            <LotusDivider color="#8B6508" className="scale-75 my-0.5" />
          </div>

          {/* Spacer to keep kalash, haldi & diya artwork 100% visible */}
          <div className="flex-1 min-h-[30vh]" />

          {/* Bottom Swipe Up */}
          <div className="relative z-20 pb-2">
            <RoyalSwipeUp onClick={() => scrollToSlide(6)} />
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 7: MAYRA (12 December Mid-day) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/6164520a-341e-4297-8a9a-d5e5f0c9d5c8.png')" }}
        >
          {/* Placed in the upper open sky area above the traditional Mayra illustration */}
          <div className="relative z-10 pt-[18vh] sm:pt-[20vh] space-y-1.5 max-w-sm mx-auto px-4">
            <TitleFlourish color="#5A121E">
              <h2 className="font-allura text-5xl sm:text-6xl text-[#5A121E] font-bold drop-shadow-xs leading-tight">
                Mayra
              </h2>
            </TitleFlourish>

            <LotusDivider color="#D4AF37" className="scale-75 my-0.5" />

            <p className="font-cormorant italic text-xs sm:text-sm font-semibold text-[#2C1518] max-w-xs mx-auto leading-snug">
              "Where traditions are cherished and blessings are shared"
            </p>

            <div className="pt-0.5">
              <OrnateCard isDark={false} maxWidth="max-w-xs">
                <div className="space-y-0.5 font-cormorant text-[#5A121E] text-center py-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8B6508] shrink-0" />
                    <span className="font-bold text-sm sm:text-base">Saturday, 12 December 2026</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8B6508] shrink-0" />
                    <span className="font-bold text-sm sm:text-base">11:00 AM</span>
                  </div>
                </div>
              </OrnateCard>
            </div>

            <LotusDivider color="#D4AF37" className="scale-75 my-0.5" />
          </div>

          {/* Spacer to keep traditional Mayra gifting artwork & elephant pond 100% visible */}
          <div className="flex-1 min-h-[40vh]" />

          {/* Bottom Swipe Up */}
          <div className="relative z-20 pb-2">
            <RoyalSwipeUp onClick={() => scrollToSlide(7)} />
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 8: WEDDING CEREMONY (12 December Evening & Night) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/wedding-ceremony-new-bg.jpg')" }}
        >
          {/* Confined strictly to upper open sky area so mandap, hawan kund & pool below are 100% visible! */}
          <div className="relative z-10 pt-[13vh] sm:pt-[15vh] space-y-1 max-w-sm mx-auto px-3">
            <div className="flex justify-center">
              <img src="/assets/couple_logo.png" alt="A-अ" className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-sm" />
            </div>

            <TitleFlourish color="#5A121E">
              <h2 className="font-allura text-4xl sm:text-5xl text-[#5A121E] font-bold drop-shadow-xs leading-tight">
                Wedding Ceremony
              </h2>
            </TitleFlourish>

            <LotusDivider color="#D4AF37" className="scale-75 my-0.5" />

            <p className="font-cormorant italic text-xs sm:text-sm font-semibold text-[#2C1518] max-w-xs mx-auto leading-snug">
              "Welcoming our dear ones with open hearts and warm smiles"
            </p>

            <p className="font-cormorant font-bold text-sm sm:text-base text-[#5A121E] pt-0.5">
              Saturday, 12 December 2026
            </p>

            <div className="pt-0.5">
              <OrnateCard isDark={false} maxWidth="max-w-md">
                <div className="grid grid-cols-[1fr_1.5fr_1fr] items-center text-center divide-x divide-[#D4AF37]/50 font-cormorant text-[#5A121E] py-1">
                  {/* Nikasi */}
                  <div className="flex items-center justify-center gap-1 px-1">
                    <Crown className="w-3.5 h-3.5 text-[#8B6508] shrink-0" />
                    <div className="text-left leading-tight">
                      <span className="font-cinzel uppercase text-[9px] sm:text-[10px] tracking-wide font-semibold">Nikasi</span>
                      <span className="text-[11px] sm:text-xs block font-bold text-[#2C1518]">6:00 PM</span>
                    </div>
                  </div>

                  {/* Reception and dinner */}
                  <div className="flex flex-col items-center justify-center gap-0.5 px-0.5 leading-tight">
                    <Utensils className="w-3 h-3 text-[#8B6508] shrink-0" />
                    <span className="whitespace-nowrap font-cinzel uppercase text-[8px] sm:text-[9px] font-semibold">Reception &amp; Dinner</span>
                    <span className="text-[11px] sm:text-xs font-bold text-[#2C1518]">7:00 PM</span>
                  </div>

                  {/* Pheras */}
                  <div className="flex items-center justify-center gap-1 px-1">
                    <PherasIcon className="w-3.5 h-3.5 text-[#8B6508] shrink-0" />
                    <div className="text-left leading-tight">
                      <span className="font-cinzel uppercase text-[9px] sm:text-[10px] tracking-wide font-semibold">Pheras</span>
                      <span className="text-[11px] sm:text-xs block font-bold text-[#2C1518]">10:30 PM</span>
                    </div>
                  </div>
                </div>
              </OrnateCard>
            </div>

            <LotusDivider color="#D4AF37" className="scale-75 my-0.5" />
          </div>

          {/* Spacer to keep mandap, floral pillars & pool 100% visible */}
          <div className="flex-1 min-h-[30vh]" />

          {/* Bottom Swipe Up */}
          <div className="relative z-20 pb-2">
            <RoyalSwipeUp onClick={() => scrollToSlide(8)} />
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 10: VENUE & LOCATION */}
        <section
          className="story-slide w-full h-[78dvh] min-h-[540px] max-h-[700px] snap-start relative flex flex-col items-center justify-center px-3 bg-center text-center select-none overflow-hidden"
          style={{ backgroundImage: "url('/assets/bggg.png')", backgroundSize: 'auto 100%', backgroundRepeat: 'no-repeat' }}
        >
          <div className="absolute z-10 top-[54%] -translate-y-1/2 w-[min(88%,380px)] mx-auto text-center space-y-2.5">
            {/* Compact map panel placed in the clear center of the venue artwork */}
            <div className="relative p-2 bg-[#F3E9D9]/95 rounded-xl border border-[#D4AF37]/70 shadow-lg overflow-hidden group">
              <a
                href={WEDDING_DETAILS.dates.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-lg border border-[#D4AF37]/35 overflow-hidden h-32 sm:h-36 bg-[#f5ecdd]"
                aria-label={`Open ${WEDDING_DETAILS.dates.venueName} in Google Maps`}
              >
                <img
                  src="/assets/gloria_map.png"
                  alt={`${WEDDING_DETAILS.dates.venueName} map`}
                  className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-[#5A121E]/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-[#5A121E]">
                    <Navigation className="w-6 h-6" />
                  </div>
                </div>
              </a>
            </div>

            <div className="mx-auto w-fit max-w-full rounded-2xl border border-white/70 bg-[#FFFCF5]/85 px-5 py-2 shadow-md backdrop-blur-sm">
              <h3 className="font-allura font-bold text-3xl sm:text-4xl leading-none text-[#5A121E] drop-shadow-sm">
                {WEDDING_DETAILS.dates.venueName}
              </h3>
              <a
                href={WEDDING_DETAILS.dates.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FBF5B7] to-[#AA771C] text-[#5A121E] font-cinzel text-xs font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-transform border border-[#D4AF37]"
              >
                <Navigation className="w-4 h-4" />
                <span>{dict.getDirections}</span>
              </a>
            </div>
          </div>
        </section>

        {/* SLIDE 11: WITH LOVE & BLESSINGS (Family, Compliments, Nanihaal & Samdhi) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between items-center px-4 py-8 sm:py-12 overflow-hidden bg-cover bg-center text-center text-[#2C1518] select-none"
          style={{ backgroundImage: "url('/assets/rsvp-1-bg.png')", backgroundAttachment: 'fixed' }}
        >
          <div className="relative z-10 max-w-sm sm:max-w-md mx-auto w-full px-2 flex-1 flex flex-col justify-between py-2 sm:py-4">
            {/* Header */}
            <div className="space-y-0.5">
              <h2 className="font-cinzel text-2xl sm:text-3xl text-[#5A121E] font-bold tracking-wide drop-shadow-xs uppercase">
                With Love &amp; Blessings
              </h2>
              <LotusDivider color="#D4AF37" className="scale-75 my-1" />
            </div>

            {/* WARM REGARDS */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                WARM REGARDS
              </p>
              {WEDDING_DETAILS.family.warmRegards.map((item, idx) => (
                <p key={idx} className="font-cormorant font-semibold text-[13px] sm:text-[14px] text-[#2C1518] leading-tight">
                  {item}
                </p>
              ))}
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mt-1" />
            </div>

            {/* SPECIAL REQUEST 1 */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                SPECIAL REQUEST
              </p>
              {WEDDING_DETAILS.family.specialRequest1.map((item, idx) => (
                <p key={idx} className="font-cormorant font-semibold text-[13px] sm:text-[14px] text-[#2C1518] leading-tight">
                  {item}
                </p>
              ))}
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mt-1" />
            </div>

            {/* SPECIAL REQUEST 2 */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                SPECIAL REQUEST
              </p>
              <div className="font-cormorant font-semibold text-[13px] sm:text-[14px] text-[#2C1518] leading-tight space-y-0.5">
                <p>Ankit – Kavita Taparia</p>
                <p>Mayank – Surbhi Kabra</p>
                <p>Akanksha – Ronak Somani</p>
                <p>Priyansh • Priyanshi • Ananya Kabra</p>
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mt-1" />
            </div>

            {/* WITH BEST COMPLIMENTS */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                WITH BEST COMPLIMENTS
              </p>
              <p className="font-cormorant font-semibold text-[11.5px] sm:text-[12.5px] text-[#2C1518] max-w-xs sm:max-w-sm mx-auto leading-snug">
                {WEDDING_DETAILS.family.withBestCompliments.members}
              </p>
              <p className="font-playfair font-bold text-xs sm:text-sm text-[#5A121E] pt-0.5">
                {WEDDING_DETAILS.family.withBestCompliments.familyTitle}
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mt-1" />
            </div>

            {/* NANIHAAL PAKSH */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                NANIHAAL PAKSH
              </p>
              <p className="font-cormorant font-semibold text-[13px] sm:text-[14px] text-[#2C1518] leading-tight">
                Shree Shyam Sundar Ji Mandawara
              </p>
              <p className="font-cormorant font-semibold text-[13px] sm:text-[14px] text-[#2C1518] leading-tight">
                Deepak Ji Mandawara (Neemach)
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mt-1" />
            </div>

            {/* MITTHI MANUHAR */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                MITTHI MANUHAR
              </p>
              {WEDDING_DETAILS.family.mithiManuhar.map((item, idx) => (
                <p key={idx} className="font-cormorant font-bold text-sm sm:text-base text-[#5A121E] leading-tight">
                  {item}
                </p>
              ))}
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mt-1" />
            </div>

            {/* SAMDHI PARIVAAR */}
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6508] font-bold">
                SAMDHI PARIVAAR
              </p>
              <p className="font-cormorant font-semibold text-[11.5px] sm:text-[12.5px] text-[#2C1518] max-w-xs sm:max-w-sm mx-auto leading-snug">
                {WEDDING_DETAILS.family.samdhiParivaar.members.join(', ')}
              </p>
              <LotusDivider color="#D4AF37" className="scale-75 my-1" />
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 12: RSVP & FIRMS */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center text-[#2C1518] select-none"
          style={{ backgroundImage: "url('/assets/rsvp-1-bg.png')", backgroundAttachment: 'fixed' }}
        >
          {/* Content matching Screenshot */}
          <div className="relative z-10 my-auto max-w-sm sm:max-w-md mx-auto w-full px-4 space-y-4 py-4">
            {/* Inviting Quote */}
            <div className="max-w-xs sm:max-w-sm mx-auto space-y-1.5">
              <p className="font-cormorant italic text-sm sm:text-base text-[#2C1518] font-semibold leading-relaxed">
                "{WEDDING_DETAILS.translations[lang].familyInviteQuote}"
              </p>
              <p className="font-playfair text-base sm:text-lg text-[#5A121E] font-bold">— Kabra Parivaar</p>
            </div>

            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto" />

            {/* RSVP SECTION CARD */}
            <div className="bg-[#FAF7F2]/90 backdrop-blur-xs rounded-xl p-3 border border-[#D4AF37]/60 shadow-xs max-w-sm mx-auto space-y-1.5">
              <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#5A121E] font-bold">
                RSVP
              </p>
              <p className="font-cormorant font-bold text-base sm:text-lg text-[#2C1518]">
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
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#5A121E] text-[#F7D070] font-cinzel text-[10px] sm:text-xs font-bold hover:scale-105 transition-transform shadow-xs"
                  >
                    <Phone className="w-2.5 h-2.5" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* FIRMS (3 names on line 1, 3 names on line 2 for perfect hierarchy) */}
            <div className="space-y-1 pt-1">
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8B6508] font-bold">
                FIRMS
              </p>
              <div className="font-cormorant font-semibold text-xs sm:text-sm text-[#2C1518] max-w-sm mx-auto space-y-0.5">
                <p>SKM Finance • Arpit Spinners • Bhilwara Taxfab</p>
                <p>Akashdeep Motors • Mahadeep Autowheels • Satyam Silver</p>
              </div>
            </div>

            {/* Card Footer with BEE Creatives Logo & Contact */}
            <div className="pt-2 mt-1 border-t border-[#6A1B29]/20 flex flex-col items-center">
              <a
                href="tel:+919950501350"
                className="inline-block transition-transform hover:scale-105"
                title="BEE Creatives • +91 99 50 50 1350"
              >
                <img
                  src="/assets/bee_creatives_logo.png"
                  alt="BEE Creatives - +91 99 50 50 1350"
                  className="h-8 sm:h-9 w-auto object-contain drop-shadow-xs"
                />
              </a>
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
