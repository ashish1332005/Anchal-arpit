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
  Navigation,
  Utensils,
  Crown,
  Phone
} from 'lucide-react';

const confettiRandom = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

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
  return children;
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

// Time like "7:00 PM" — Dihjau numerals with Dihjau meridiem (matches date numerals)
function EventTime({ value, size = "md", className = "" }) {
  const match = value.match(/^(.*?)\s*(AM|PM)$/i);
  const hour = match?.[1] ?? value;
  const meridiem = match?.[2];
  const hourSize = size === "sm" ? "text-lg sm:text-xl" : "text-[26px] sm:text-[30px]";
  const meridiemSize = size === "sm" ? "text-[10px] sm:text-[11px]" : "text-xs sm:text-sm";

  return (
    <span className={`inline-flex items-baseline justify-center gap-1 whitespace-nowrap text-[#7B1124] ${className}`}>
      <span className={`font-dihjau ${hourSize} font-bold leading-none`}>{hour}</span>
      {meridiem && <span className={`font-dihjau ${meridiemSize} font-bold tracking-wide leading-none`}>{meridiem}</span>}
    </span>
  );
}

// Secondary timing row, e.g. "Breakfast • 9:00 AM"
function EventSubTime({ label, time }) {
  return (
    <div className="flex items-baseline justify-center gap-2">
      <span className="font-cormorant font-bold text-lg sm:text-xl leading-none text-[#8B6508]">{label}</span>
      <span className="text-[#B78B34] text-sm leading-none">•</span>
      <EventTime value={time} size="sm" />
    </div>
  );
}

// FRI ——— 11 ——— DEC  with year beneath (labels sit on symmetric gold rules)
function EventDate({ weekday, day, month, year = "2026" }) {
  return (
    <div className="mx-auto w-full max-w-[250px] text-center">
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
        <div className="flex flex-col items-center gap-1.5 pb-2">
          <span className="font-dihjau text-[11px] sm:text-xs tracking-[0.25em] pl-[0.25em] font-bold text-[#5A121E]/85 uppercase leading-none">{weekday}</span>
          <span className="block h-px w-full bg-gradient-to-l from-[#B78B34] to-[#B78B34]/10" />
        </div>
        <span className="font-dihjau text-[48px] sm:text-[56px] font-bold leading-[0.9] text-[#7B1124]">{day}</span>
        <div className="flex flex-col items-center gap-1.5 pb-2">
          <span className="font-dihjau text-[11px] sm:text-xs tracking-[0.25em] pl-[0.25em] font-bold text-[#5A121E]/85 uppercase leading-none">{month}</span>
          <span className="block h-px w-full bg-gradient-to-r from-[#B78B34] to-[#B78B34]/10" />
        </div>
      </div>
      <p className="mt-1.5 font-dihjau text-[11px] sm:text-[12px] tracking-[0.45em] pl-[0.45em] text-[#5A121E]/80 font-bold leading-none">{year}</p>
    </div>
  );
}

// Divider that follows the timings in every event (same everywhere)
function EventRule() {
  return <LotusDivider color="#B78B34" className="scale-90" />;
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
  const [showScratchConfetti, setShowScratchConfetti] = useState(false);

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

  return (
    <div className="relative w-full h-[100dvh] bg-[#FAF7F2] flex items-center justify-center overflow-hidden">
      {/* Subtle Falling Cherry Blossom Petals Overlay */}
      <FallingPetals active={!isUnlocked} />

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
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between overflow-hidden bg-cover bg-center text-center select-none pt-4 sm:pt-6 pb-2 sm:pb-3 px-3 sm:px-4"
          style={{ backgroundImage: "url('/assets/Watercolor%20Botanical%20Wedding%20Border.png')", backgroundSize: '110% 100%' }}
        >
          {/* Top Invocations Section */}
          <div className="relative z-10 w-full max-w-md mx-auto px-2 flex flex-col items-center">
            <div className="flex w-full flex-col items-center gap-1 text-[#7B1124]">
              <img src="/assets/ganesh.png" alt="Lord Ganesha" className="h-10 w-10 min-[375px]:h-11 min-[375px]:w-11 sm:h-12 sm:w-12 object-contain mb-0.5 drop-shadow-xs" />
              {/* All three invocations on a single line with identical font, size, and weight */}
              <div className="w-full flex items-center justify-center px-1">
                <div className="inline-flex items-center justify-center gap-1 min-[360px]:gap-1.5 px-2.5 sm:px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-[#D4AF37]/40 shadow-xs text-[#5A121E] font-cinzel font-bold text-[6.5px] min-[360px]:text-[7.2px] min-[380px]:text-[7.8px] sm:text-[9px] tracking-tight min-[375px]:tracking-normal whitespace-nowrap select-none">
                  <span>॥ Shri Ramcharanay Namah ॥</span>
                  <span className="text-[#B78B34] text-[7px] sm:text-[8px] font-normal">•</span>
                  <span>॥ Shri Ganeshay Namah ॥</span>
                  <span className="text-[#B78B34] text-[7px] sm:text-[8px] font-normal">•</span>
                  <span>॥ Shri Pitra Devay Namah ॥</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Unified Invitation Body: Proportional & Balanced Spacing */}
          <div className="relative z-10 flex-1 min-h-0 w-full max-w-md mx-auto px-4 flex flex-col justify-evenly items-center py-1">
            {/* Logo + Invitation Sentence */}
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 text-[#2C1518]">
              <img
                src="/assets/couple_logo.png"
                alt="Arpit and Anchal monogram"
                className="w-14 h-14 min-[375px]:w-16 min-[375px]:h-16 sm:w-18 sm:h-18 object-contain drop-shadow-xs"
              />
              <p className="max-w-[280px] min-[375px]:max-w-[310px] font-cormorant text-[16px] min-[375px]:text-[17px] sm:text-[18px] leading-snug font-semibold text-[#2C1518]">
                The Kabra family requests the pleasure of your company at the wedding celebration
              </p>
            </div>

            {/* Groom Details */}
            <div className="w-full text-center">
              <h1 className="font-alex-brush text-5xl min-[375px]:text-[56px] sm:text-[64px] text-[#5A121E] font-medium leading-[1.05] mb-1">
                {WEDDING_DETAILS.couple.groom}
              </h1>
              <p className="font-cormorant text-[14.5px] min-[375px]:text-[15.5px] sm:text-[16.5px] font-semibold text-[#2C1518] leading-tight">
                G/S Ratan Devi &amp; Ram Rai Ji Kabra
              </p>
              <p className="font-cormorant text-[14.5px] min-[375px]:text-[15.5px] sm:text-[16.5px] font-semibold text-[#2C1518] leading-tight mt-0.5">
                S/O Rinku &amp; Sanjay Kabra
              </p>
            </div>

            {/* With text styled in elegant cursive script matching reference invite */}
            <div className="flex items-center justify-center gap-3 py-0.5 select-none">
              <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#B78B34]" />
              <span className="font-alex-brush text-3xl sm:text-4xl text-[#9c7a28] leading-none">
                with
              </span>
              <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#B78B34]" />
            </div>

            {/* Bride Details */}
            <div className="w-full text-center">
              <h2 className="font-alex-brush text-5xl min-[375px]:text-[56px] sm:text-[64px] text-[#5A121E] font-medium leading-[1.05] mb-1">
                {WEDDING_DETAILS.couple.bride}
              </h2>
              <p className="font-cormorant text-[14.5px] min-[375px]:text-[15.5px] sm:text-[16.5px] font-semibold text-[#2C1518] leading-tight">
                G/D Late Janki Devi &amp; Late Shivlal Ji Chechani
              </p>
              <p className="font-cormorant text-[14.5px] min-[375px]:text-[15.5px] sm:text-[16.5px] font-semibold text-[#2C1518] leading-tight mt-0.5">
                D/O Leela Devi &amp; Dinesh Ji Chechani
              </p>
            </div>
          </div>

          {/* Bottom Royal SWIPE UP button */}
          <div className="relative z-20 pb-1">
            <RoyalSwipeUp onClick={() => scrollToSlide(1)} label="SWIPE UP" />
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 2: SCRATCH-TO-REVEAL DATE & VENUE (FULL SCREEN) */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col items-center justify-center px-4 py-6 overflow-hidden text-center bg-[#F3E9D9] select-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#fffdf8_0%,_#f7f0e4_58%,_#eadcc8_100%)]" />

          {/* Confetti spreads from the scratch card and stays behind all text. */}
          {showScratchConfetti && (
            <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden" aria-hidden="true">
              {Array.from({ length: 96 }, (_, index) => {
                const horizontal = (confettiRandom(index + 1) - 0.5) * 110;
                const vertical = (confettiRandom(index + 100) - 0.42) * 95;
                const colors = ['#D4AF37', '#7B1124', '#D9879F', '#8C9B72', '#F2C477'];
                return (
                  <span
                    key={index}
                    className="scratch-confetti absolute left-1/2 top-1/2"
                    style={{
                      '--confetti-x': `${horizontal}vw`,
                      '--confetti-y': `${vertical}vh`,
                      '--confetti-rotation': `${confettiRandom(index + 200) * 900 - 450}deg`,
                      backgroundColor: colors[index % colors.length],
                      width: `${5 + confettiRandom(index + 500) * 4}px`,
                      height: `${9 + confettiRandom(index + 600) * 7}px`,
                      borderRadius: index % 4 === 0 ? '50%' : '1px',
                      animationDelay: `${confettiRandom(index + 300) * 180}ms`,
                      animationDuration: `${1300 + confettiRandom(index + 400) * 500}ms`,
                    }}
                  />
                );
              })}
            </div>
          )}

          <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center justify-center">
            {/* Scratch directly over the transparent floral heart image. */}
            <div className="my-1">
              <ScratchDateReveal revealed={dateRevealed} onReveal={() => {
                setDateRevealed(true);
                setShowScratchConfetti(true);
                setTimeout(() => setShowScratchConfetti(false), 1900);
              }} />
            </div>

            {/* ONLY REVEALED AFTER SCRATCHING: Naturally expands space according to content */}
            {dateRevealed && (
              <div className="w-full mt-2 space-y-2 animate-fadeIn transition-all duration-700">
                {/* Countdown */}
                <div className="mx-auto w-full max-w-xs pt-1">
                  <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#8B6508] font-bold mb-1">
                    Countdown to the wedding
                  </p>
                  <Countdown targetDateIso={WEDDING_DETAILS.dates.weddingDateIso || WEDDING_DETAILS.dates.startDateIso} />
                </div>

                {/* View Events Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToSlide(2)}
                    className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-gradient-to-r from-[#4A0E18] via-[#631422] to-[#4A0E18] border border-[#D4AF37] shadow-lg text-[#F7D070] font-cinzel text-xs font-bold tracking-wider uppercase hover:scale-105 active:scale-95 transition-all"
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
        {/* ======================================================== */}
        {/* SLIDE 3: VINAYAK STHAPNA (11 December Morning) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center text-[#5A121E] select-none"
          style={{ backgroundImage: "url('/assets/74c1371d-2510-43ca-bfad-2e054f6048f7.png')", backgroundSize: '100% 100%' }}
        >
          {/* Top spacer positioned comfortably BELOW Lord Ganesha's pedestal */}
          <div className="pt-[47vh] min-[375px]:pt-[48vh] sm:pt-[49vh]" />

          {/* Content block in the clean parchment below Lord Ganesha */}
          <div className="relative z-10 space-y-1.5 max-w-sm mx-auto px-4">
            <h2 className="font-alex-brush whitespace-nowrap text-4xl min-[375px]:text-[44px] sm:text-[48px] text-[#5A121E] leading-tight select-none">
              Vinayak Sthapna
            </h2>
            <EventDate weekday="FRI" day="11" month="DEC" />
            <div className="pt-1">
              <EventTime value="7:00 AM" />
            </div>
            {/* Lotus divider AFTER time */}
            <LotusDivider color="#8B6508" className="scale-75 my-1" />
            <p className="font-cormorant italic text-[13px] sm:text-[14px] font-semibold text-[#2C1518] max-w-[250px] mx-auto leading-snug drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]">
              "Auspicious beginnings invoke Lord Ganesha's blessings for a lifetime of joy"
            </p>
          </div>

          <div className="flex-1" />
          <RoyalSwipeUp onClick={() => scrollToSlide(3)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 4: CARNIVAL (11 December Afternoon) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/carnival-new-bg.jpg')" }}
        >
          {/* Content in the blank sky area */}
          <div className="relative z-10 pt-[18vh] sm:pt-[20vh] space-y-1.5 max-w-sm mx-auto px-4">
            <h2 className="font-alex-brush text-4xl min-[375px]:text-[44px] sm:text-[48px] text-[#5A121E] leading-tight select-none">
              Carnival
            </h2>
            <EventDate weekday="FRI" day="11" month="DEC" />
            <div className="pt-1.5">
              <EventTime value="11:00 AM" />
            </div>
            {/* Lotus divider AFTER time */}
            <LotusDivider color="#5A121E" className="scale-75 my-1" />
            <p className="font-cormorant italic text-[13px] sm:text-[14px] font-semibold text-[#2C1518] max-w-[250px] mx-auto leading-snug drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]">
              "A vibrant celebration of laughter, love, music and endless memories"
            </p>
          </div>

          <div className="flex-1" />
          <RoyalSwipeUp onClick={() => scrollToSlide(4)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 5: SANGEET & RING CEREMONY (11 December Evening) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col p-5 sm:p-7 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/Dreamy%20Floral%20Wedding%20Pavilion.png')" }}
        >
          <div className="relative z-10 pt-[15vh] sm:pt-[17vh] space-y-1.5 max-w-sm mx-auto px-4">
            <h2 className="font-alex-brush text-[32px] min-[375px]:text-[36px] sm:text-[40px] text-[#5A121E] leading-[1.05] select-none">
              <span className="block">Sangeet</span>
              <span className="block">&amp; Ring Ceremony</span>
            </h2>
            <EventDate weekday="FRI" day="11" month="DEC" />
            <div className="pt-1">
              <EventTime value="7:00 PM" />
            </div>
            {/* Lotus divider AFTER time */}
            <LotusDivider color="#5A121E" className="scale-75 my-1" />
            <p className="font-cormorant italic text-[13px] sm:text-[14px] font-semibold text-[#2C1518] max-w-[250px] mx-auto drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)] leading-snug">
              "Let's dance, let's sing, let our hearts take flight, as we celebrate this love under the stars tonight."
            </p>
          </div>

          <div className="flex-1" />
          <RoyalSwipeUp onClick={() => scrollToSlide(5)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 6: MANGAL KALASH (12 December Morning) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/Elegant%20Indian%20Wedding%20Kalash%20Invitation%20Frame.png')" }}
        >
          {/* Top image removed as requested, content balanced centered */}
          <div className="relative z-10 pt-[15vh] sm:pt-[17vh] space-y-1.5 max-w-sm mx-auto px-4">
            <h2 className="font-alex-brush text-4xl min-[375px]:text-[44px] sm:text-[48px] text-[#5A121E] leading-tight select-none">
              Mangal Kalash
            </h2>
            <EventDate weekday="SAT" day="12" month="DEC" />
            <div className="pt-1">
              <EventTime value="9:00 AM" />
            </div>
            {/* Lotus divider AFTER time */}
            <LotusDivider color="#5A121E" className="scale-75 my-1" />
            <p className="font-cormorant italic text-[13px] sm:text-[14px] font-semibold text-[#2C1518] max-w-[250px] mx-auto leading-snug drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]">
              "As sacred waters fill the kalash, may your home fill with peace, prosperity and divine grace"
            </p>
          </div>

          <div className="flex-1" />
          <RoyalSwipeUp onClick={() => scrollToSlide(6)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 7: MAYRA (12 December Mid-day) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/6164520a-341e-4297-8a9a-d5e5f0c9d5c8.png')" }}
        >
          <div className="relative z-10 pt-[15vh] sm:pt-[17vh] space-y-1.5 max-w-sm mx-auto px-4">
            <h2 className="font-alex-brush text-4xl min-[375px]:text-[44px] sm:text-[48px] text-[#5A121E] leading-tight select-none">
              Mayra
            </h2>
            <EventDate weekday="SAT" day="12" month="DEC" />
            <div className="pt-1">
              <EventTime value="11:00 AM" />
            </div>
            {/* Lotus divider AFTER time */}
            <LotusDivider color="#5A121E" className="scale-75 my-1" />
            <p className="font-cormorant italic text-[13px] sm:text-[14px] font-semibold text-[#2C1518] max-w-[250px] mx-auto leading-snug drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]">
              "Where traditions are cherished and blessings flow from mama's heart to bride's new life"
            </p>
          </div>

          <div className="flex-1" />
          <RoyalSwipeUp onClick={() => scrollToSlide(7)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 8: WEDDING CEREMONY (12 December Evening & Night) */}
        {/* ======================================================== */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col p-4 sm:p-6 overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/wedding-ceremony-new-bg.jpg')" }}
        >
          <div className="relative z-10 pt-[9vh] sm:pt-[11vh] space-y-1.5 max-w-sm mx-auto px-3">
            {/* Standardized heading */}
            <h2 className="font-alex-brush text-4xl min-[375px]:text-[44px] sm:text-[48px] text-[#5A121E] leading-tight select-none">
              Wedding Ceremony
            </h2>
            <EventDate weekday="SAT" day="12" month="DEC" />
            {/* Time grid — three columns */}
            <div className="pt-1">
              <OrnateCard isDark={false} maxWidth="max-w-xs">
                <div className="grid grid-cols-3 items-stretch text-center divide-x divide-[#D4AF37]/50 py-1.5">
                  {/* Nikasi */}
                  <div className="flex flex-col items-center justify-center gap-1 px-1">
                    <Crown className="w-3.5 h-3.5 text-[#8B6508] shrink-0" />
                    <span className="font-cinzel uppercase text-[9px] sm:text-[10px] tracking-wide font-bold text-[#5A121E]">Nikasi</span>
                    <EventTime value="6:00 PM" size="sm" />
                  </div>
                  {/* Reception */}
                  <div className="flex flex-col items-center justify-center gap-1 px-1">
                    <Utensils className="w-3.5 h-3.5 text-[#8B6508] shrink-0" />
                    <span className="font-cinzel uppercase text-[9px] sm:text-[10px] tracking-wide font-bold text-[#5A121E]">Reception</span>
                    <EventTime value="7:00 PM" size="sm" />
                  </div>
                  {/* Pheras */}
                  <div className="flex flex-col items-center justify-center gap-1 px-1">
                    <PherasIcon className="w-3.5 h-3.5 text-[#8B6508] shrink-0" />
                    <span className="font-cinzel uppercase text-[9px] sm:text-[10px] tracking-wide font-bold text-[#5A121E]">Pheras</span>
                    <EventTime value="10:30 PM" size="sm" />
                  </div>
                </div>
              </OrnateCard>
            </div>
            {/* Lotus divider AFTER time */}
            <LotusDivider color="#5A121E" className="scale-75 my-1" />
            {/* Quote after times */}
            <p className="font-cormorant italic text-[13px] sm:text-[14px] font-semibold text-[#2C1518] max-w-[250px] mx-auto leading-snug drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]">
              "Welcoming our dear ones with open hearts and warm smiles"
            </p>
          </div>

          <div className="flex-1" />
          <RoyalSwipeUp onClick={() => scrollToSlide(8)} />
        </section>

        {/* ======================================================== */}
        {/* SLIDE 10: VENUE & LOCATION */}
        <section
          className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between overflow-hidden bg-cover bg-center text-center select-none"
          style={{ backgroundImage: "url('/assets/bggg.png')" }}
        >
          <div className="pt-[35vh] sm:pt-[37vh]" />
          <div className="relative z-10 w-[min(88%,360px)] mx-auto text-center space-y-2 px-2">
            {/* Heading styled like other event slides */}
            <div className="space-y-0.5">
              <h2 className="font-alex-brush text-4xl min-[375px]:text-[44px] sm:text-[48px] text-[#5A121E] leading-tight drop-shadow-sm select-none">
                Venue &amp; Location
              </h2>
              <LotusDivider color="#8B6508" className="scale-75 my-0.5" />
            </div>

            {/* Map panel */}
            <div className="relative p-1.5 bg-[#F3E9D9]/95 rounded-xl border border-[#D4AF37]/70 shadow-lg overflow-hidden group">
              <a
                href={WEDDING_DETAILS.dates.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-lg border border-[#D4AF37]/35 overflow-hidden h-28 sm:h-32 bg-[#f5ecdd]"
                aria-label={`Open ${WEDDING_DETAILS.dates.venueName} in Google Maps`}
              >
                <img
                  src="/assets/gloria_map.png"
                  alt={`${WEDDING_DETAILS.dates.venueName} map`}
                  className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-[#5A121E]/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg text-[#5A121E]">
                    <Navigation className="w-5 h-5" />
                  </div>
                </div>
              </a>
            </div>

            <div className="mx-auto w-fit max-w-full rounded-2xl border border-white/70 bg-[#FFFCF5]/90 px-4 py-1.5 shadow-md backdrop-blur-sm">
              <p className="font-cormorant font-semibold text-base sm:text-lg leading-tight text-[#5A121E]">
                {WEDDING_DETAILS.dates.venueName}
              </p>
              <a
                href={WEDDING_DETAILS.dates.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FBF5B7] to-[#AA771C] text-[#5A121E] font-cinzel text-xs font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-transform border border-[#D4AF37]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{dict.getDirections}</span>
              </a>
            </div>
          </div>
          <div className="flex-1" />
          <RoyalSwipeUp onClick={() => scrollToSlide(9)} />
        </section>

        {/* ======================================================== */}
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
                <p>Kavita – Ankit Taparia</p>
                <p>Surbhi – Mayank Kabra</p>
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
              <p className="font-cormorant font-semibold text-[13px] sm:text-[14px] text-[#2C1518] max-w-xs sm:max-w-sm mx-auto leading-snug">
                {WEDDING_DETAILS.family.withBestCompliments.members}
              </p>
              {WEDDING_DETAILS.family.withBestCompliments.familyTitle && (
                <p className="font-playfair font-bold text-xs sm:text-sm text-[#5A121E] pt-0.5">
                  {WEDDING_DETAILS.family.withBestCompliments.familyTitle}
                </p>
              )}
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
                <p key={idx} className="font-cormorant font-semibold text-[13px] sm:text-[14px] text-[#2C1518] leading-tight">
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
              <p className="font-cormorant font-semibold text-[13px] sm:text-[14px] text-[#2C1518] max-w-xs sm:max-w-sm mx-auto leading-snug">
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
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A121E] text-[#F7D070] font-dihjau text-[11px] sm:text-xs font-bold tracking-wide hover:scale-105 transition-transform shadow-xs"
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
