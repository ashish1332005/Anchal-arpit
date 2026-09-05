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
  Send,
  MessageSquare,
  Navigation,
  Crown
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
          title: 'Shreyansh & Aditi Royal Wedding Invitation',
          text: 'You are cordially invited to celebrate the wedding festivities of Shreyansh & Aditi!',
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
    <div className="relative w-full h-[100dvh] bg-[#120B0E] flex items-center justify-center overflow-hidden">
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

      {/* Sticky Action Header */}
      {isUnlocked && (
        <div className="fixed top-4 left-4 right-4 z-40 max-w-md mx-auto flex items-center justify-between pointer-events-auto px-2">
          <div className="flex items-center gap-2 bg-[#5A121E]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37] shadow-xl text-[#F7D070] font-cinzel text-xs font-bold">
            <span>S&A</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5A121E]/90 backdrop-blur-md border border-[#D4AF37] text-[#F7D070] font-cinzel text-xs font-semibold hover:bg-[#800020] transition-colors shadow-xl"
            >
              <Globe className="w-3.5 h-3.5 text-[#F7D070]" />
              <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Share Link */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-[#5A121E]/90 backdrop-blur-md border border-[#D4AF37] text-[#F7D070] hover:bg-[#800020] transition-colors shadow-xl"
              title="Share Card"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* RSVP Modal Trigger */}
            <button
              onClick={() => setIsRsvpOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FBF5B7] to-[#AA771C] text-[#5A121E] font-cinzel text-xs uppercase tracking-wider font-bold shadow-xl hover:scale-105 transition-transform"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>RSVP</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN VERTICAL STORY DECK CONTAINER */}
      <div
        ref={containerRef}
        className={`w-full max-w-[480px] h-[100dvh] relative shadow-2xl border-x border-[#D4AF37]/30 bg-[#FAF7F2] no-scrollbar ${
          isUnlocked
            ? 'snap-y snap-mandatory overflow-y-scroll scroll-smooth'
            : 'overflow-hidden'
        }`}
      >
        {/* ======================================================== */}
        {/* SLIDE 1: MAIN INVITATION CARD (Light BG - High Contrast Dark Text) */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-cover bg-center text-center select-none" style={{ backgroundImage: "url('/assets/welcomeslider.png')" }}>
          <div className="relative z-10 pt-12 space-y-2">
            {/* Religious Outline Icons */}
            <div className="flex items-center justify-center gap-6 text-[#5A121E]">
              <div className="flex flex-col items-center">
                <img src="/assets/ganesh.png" alt="Lord Ganesha" className="w-7 h-7 object-contain drop-shadow-sm" />
                <span className="font-cinzel text-[10px] tracking-wider font-bold mt-1 text-[#2C1518]">
                  || Shree Ganeshaya Namah ||
                </span>
              </div>
              <div className="flex flex-col items-center">
                <img src="/assets/mahaveer.png" alt="Lord Mahavir" className="w-7 h-7 object-contain drop-shadow-sm" />
                <span className="font-cinzel text-[10px] tracking-wider font-bold mt-1 text-[#2C1518]">
                  || Shree Mahaviray Namah ||
                </span>
              </div>
            </div>

            <p className="font-cormorant italic text-xs text-[#2C1518] font-bold pt-1">
              With the blessings of God
            </p>

            <h3 className="font-cormorant font-bold text-xl text-[#5A121E] drop-shadow-xs">
              Smt. Padma & Sh. Sanjay Babel
            </h3>

            <p className="font-cormorant text-xs font-bold text-[#2C1518] max-w-xs mx-auto leading-tight">
              solicits your gracious presence & blessings on the auspicious occasion of the wedding ceremony of their beloved son
            </p>

            {/* Groom Name */}
            <div className="pt-1">
              <h2 className="font-allura text-5xl sm:text-6xl text-[#C2185B] font-bold drop-shadow-xs">
                Shreyansh <span className="font-cormorant text-sm text-[#2C1518] font-bold">(Riyansh)</span>
              </h2>
              <p className="font-cormorant text-[11px] font-bold text-[#2C1518] leading-tight">
                (G.S/o Lt. Smt. Raj Devi & Lt. Sh. Jaswant Singh Ji Babel)
              </p>
              <p className="font-cormorant text-[11px] font-bold text-[#2C1518]">
                (S/o Smt. Padma & Sh. Sanjay Babel)
              </p>
            </div>

            <p className="font-allura text-lg text-[#C2185B] font-bold my-0">with</p>

            {/* Bride Name */}
            <div>
              <h2 className="font-allura text-5xl sm:text-6xl text-[#C2185B] font-bold drop-shadow-xs">
                Aditi <span className="font-cormorant text-sm text-[#2C1518] font-bold">(Megha)</span>
              </h2>
              <p className="font-cormorant text-[11px] font-bold text-[#2C1518] leading-tight">
                (G.D/o Lt. Smt. Jatan Kawar & Lt. Sh. Sajjan Singh Ji Mehta)
              </p>
              <p className="font-cormorant text-[11px] font-bold text-[#2C1518]">
                (D/o Smt. Babita & Sh. Mahavir Ji Mehta)
              </p>
            </div>

            <h4 className="font-cormorant font-bold text-xl text-[#5A121E] pt-1 drop-shadow-xs">
              The Aaureum Resort, Bhilwara
            </h4>
          </div>

          {/* Bottom SWIPE UP button */}
          <div className="relative z-10 pb-6 text-center">
            <button
              onClick={() => scrollToSlide(1)}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#5A121E] border border-[#D4AF37] shadow-xl text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#F7D070]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 2: SAVE THE DATE / COUPLE (Dark BG - Light Text) */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-cover bg-center text-center text-white select-none" style={{ backgroundImage: "url('/assets/datereveal-bg.png')" }}>
          <div className="relative z-10 pt-16 space-y-3">
            <p className="font-cinzel text-xs tracking-[0.25em] text-[#F7D070] font-bold uppercase drop-shadow-md">
              TOGETHER WITH THEIR FAMILIES
            </p>

            <h1 className="font-allura text-5xl sm:text-6xl text-gold-gradient font-bold drop-shadow-lg">
              Shreyansh & Aditi
            </h1>

            {/* Tap to Reveal Date Button */}
            <div className="pt-2">
              <button
                onClick={() => setDateRevealed(!dateRevealed)}
                className="px-6 py-2.5 rounded-xl border border-[#D4AF37] bg-[#1A0E13]/90 backdrop-blur-md text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase shadow-2xl hover:scale-105 transition-transform"
              >
                {dateRevealed ? '21 & 22 JULY, 2026' : '* TAP TO REVEAL DATE *'}
              </button>
            </div>
          </div>

          <div className="relative z-10 pb-8 space-y-2">
            <h3 className="font-cinzel text-xs tracking-[0.2em] text-[#F7D070] font-bold uppercase drop-shadow-md">
              SAVE THE DATE
            </h3>
            <p className="font-allura text-3xl sm:text-4xl text-white drop-shadow-lg">
              Wedding Festivities Await You
            </p>

            <button
              onClick={() => scrollToSlide(2)}
              className="inline-flex items-center gap-1 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase pt-2 animate-bounce"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 3: VINAYAK STHAPANA (Dark Bronze BG - Light Text) */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-cover bg-center text-center text-white select-none" style={{ backgroundImage: "url('/assets/vinayak-bg.png')" }}>
          <div className="relative z-10 pt-16 space-y-3">
            <span className="font-cinzel text-xs tracking-widest text-[#F7D070] font-bold uppercase drop-shadow-md">
              || श्री गणेशाय नमः ||
            </span>

            <h2 className="font-allura text-5xl sm:text-6xl text-white drop-shadow-lg font-bold">
              Vinayak Sthapana
            </h2>

            <div className="space-y-1 font-cormorant text-lg text-white">
              <p className="font-bold text-xl text-[#FFF5C0] drop-shadow-sm">Tuesday, 21st July 2026</p>
              <p className="text-base text-[#F7D070] font-semibold">Time : <span className="font-bold">09:15 AM Onwards</span></p>
              <p className="text-xs tracking-wider uppercase text-white/90 pt-2 font-bold">VENUE</p>
              <p className="font-bold text-lg text-white drop-shadow-sm">The Aaureum Resort</p>
            </div>

            {/* Add to Calendar Button */}
            <div className="pt-2">
              <a
                href={generateGoogleCalendarUrl(
                  'Vinayak Sthapana - Shreyansh & Aditi Wedding',
                  'Vinayak Sthapana Ceremony',
                  'The Aaureum Resort, Bhilwara',
                  '20260721T034500Z',
                  '20260721T050000Z'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E13]/90 border border-[#D4AF37] text-[#F7D070] font-cinzel text-[11px] uppercase tracking-wider font-bold hover:bg-[#D4AF37] hover:text-[#5A121E] transition-colors shadow-lg"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add to Calendar</span>
              </a>
            </div>
          </div>

          <div className="relative z-10 pb-8 text-center">
            <button
              onClick={() => scrollToSlide(3)}
              className="inline-flex items-center gap-1 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 4: THE WEDDING CARNIVAL (Light BG - High Contrast Dark Text) */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-cover bg-center text-center select-none" style={{ backgroundImage: "url('/assets/carnival-bg.png')" }}>
          <div className="relative z-10 pt-14 space-y-2">
            <h2 className="font-allura text-5xl sm:text-6xl text-[#5A121E] font-bold drop-shadow-xs">
              The Wedding Carnival
            </h2>

            <p className="font-cormorant italic text-xs font-bold text-[#2C1518] max-w-xs mx-auto">
              "A vibrant celebration of laughter, love, music and endless memories"
            </p>

            <div className="space-y-1 font-cormorant text-base text-[#2C1518]">
              <p className="font-bold text-xl text-[#5A121E]">Tuesday, 21st July 2026</p>
              <p className="text-base font-bold text-[#2C1518]">Time : <span className="text-[#5A121E]">11:15 AM Onwards</span></p>
              <p className="text-xs tracking-wider uppercase text-[#5A121E] pt-1 font-bold">VENUE</p>
              <p className="font-bold text-lg text-[#5A121E]">The Aaureum Lawn</p>
            </div>
          </div>

          <div className="relative z-10 pb-6 text-center">
            <button
              onClick={() => scrollToSlide(4)}
              className="inline-flex items-center gap-1 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce bg-[#5A121E] px-5 py-2 rounded-full border border-[#D4AF37] shadow-lg"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#F7D070]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 5: THE SANGEET NIGHT (Dark Purple BG - Light Text) */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-cover bg-center text-center text-white select-none" style={{ backgroundImage: "url('/assets/sangeet-bg.png')" }}>
          <div className="relative z-10 pt-16 space-y-3">
            <h2 className="font-allura text-5xl sm:text-6xl text-gold-gradient font-bold drop-shadow-md">
              The Sangeet Night
            </h2>

            <p className="font-cormorant italic text-sm text-white/90 max-w-xs mx-auto font-semibold">
              "An evening of rhythm, dance and dazzling celebrations"
            </p>

            <div className="space-y-1 font-cormorant text-lg text-white">
              <p className="font-bold text-xl text-[#FFF5C0]">Tuesday, 21st July 2026</p>
              <p className="text-base text-[#F7D070] font-semibold">Time : <span className="font-bold">07:15 PM Onwards</span></p>
              <p className="text-xs tracking-wider uppercase text-white/80 pt-1 font-bold">VENUE</p>
              <p className="font-bold text-lg text-white">The Aaureum Grand Ballroom</p>
            </div>

            <p className="font-cormorant text-xs italic text-[#FFF5C0] bg-black/60 p-2 rounded-xl border border-[#D4AF37]/40 max-w-xs mx-auto font-bold">
              (Pre-sunset dinner arrangements are also available for all guests.)
            </p>
          </div>

          <div className="relative z-10 pb-8 text-center">
            <button
              onClick={() => scrollToSlide(5)}
              className="inline-flex items-center gap-1 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 6: KALASH CEREMONY */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-cover bg-center text-center select-none" style={{ backgroundImage: "url('/assets/kalash-bg.png')" }}>
          <div className="relative z-10 pt-14 space-y-3">
            <h2 className="font-allura text-5xl sm:text-6xl text-[#5A121E] font-bold drop-shadow-md">
              Kalash Ceremony
            </h2>

            <div className="space-y-1 font-cormorant text-[#2C1518]">
              <p className="font-bold text-xl text-[#5A121E]">Tuesday, 21st July 2026</p>
              <p className="text-base font-bold text-[#2C1518]">Time : <span className="text-[#5A121E]">10:15 AM Onwards</span></p>
              <p className="text-xs tracking-wider uppercase text-[#5A121E] pt-2 font-bold">VENUE</p>
              <p className="font-bold text-xl text-[#5A121E]">The Aaureum Lawn</p>
            </div>
          </div>

          <div className="relative z-10 pb-6 text-center">
            <button
              onClick={() => scrollToSlide(6)}
              className="inline-flex items-center gap-1 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce bg-[#5A121E] px-5 py-2 rounded-full border border-[#D4AF37] shadow-lg"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#F7D070]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 7: MAYRA & BHAAT BHARAI */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-cover bg-center text-center select-none" style={{ backgroundImage: "url('/assets/bhaatbharai-bg.png')" }}>
          <div className="relative z-10 pt-14 space-y-3">
            <h2 className="font-allura text-5xl sm:text-6xl text-[#5A121E] font-bold drop-shadow-md">
              Mayra & Bhaat Bharai
            </h2>

            <div className="space-y-1 font-cormorant text-[#2C1518]">
              <p className="font-bold text-xl text-[#5A121E]">Wednesday, 22nd July 2026</p>
              <p className="text-base font-bold text-[#2C1518]">Time : <span className="text-[#5A121E]">09:30 AM Onwards</span></p>
              <p className="text-xs tracking-wider uppercase text-[#5A121E] pt-2 font-bold">VENUE</p>
              <p className="font-bold text-xl text-[#5A121E]">The Aaureum Banquet</p>
            </div>

            <p className="font-cormorant text-xs italic text-[#5A121E] font-bold pt-1">
              Presented with love by Maternal Family (Ranka Parivar)
            </p>
          </div>

          <div className="relative z-10 pb-6 text-center">
            <button
              onClick={() => scrollToSlide(7)}
              className="inline-flex items-center gap-1 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce bg-[#5A121E] px-5 py-2 rounded-full border border-[#D4AF37] shadow-lg"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#F7D070]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 8: SAJJAN GOTH */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-cover bg-center text-center select-none" style={{ backgroundImage: "url('/assets/welcomefeast-bg.png')" }}>
          <div className="relative z-10 pt-14 space-y-3">
            <h2 className="font-allura text-5xl sm:text-6xl text-[#5A121E] font-bold drop-shadow-md">
              Sajjan Goth
            </h2>

            <div className="space-y-1 font-cormorant text-[#2C1518]">
              <p className="font-bold text-xl text-[#5A121E]">Wednesday, 22nd July 2026</p>
              <p className="text-base font-bold text-[#2C1518]">Time : <span className="text-[#5A121E]">12:15 PM Onwards</span></p>
              <p className="text-xs tracking-wider uppercase text-[#5A121E] pt-2 font-bold">VENUE</p>
              <p className="font-bold text-xl text-[#5A121E]">The Aaureum Dining Hall</p>
            </div>
          </div>

          <div className="relative z-10 pb-6 text-center">
            <button
              onClick={() => scrollToSlide(8)}
              className="inline-flex items-center gap-1 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce bg-[#5A121E] px-5 py-2 rounded-full border border-[#D4AF37] shadow-lg"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#F7D070]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 9: JAIMALA & RECEPTION (Dark Video BG) */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden text-center text-white select-none">
          <video
            src="/assets/reception-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />

          <div className="relative z-10 pt-16 space-y-3">
            <h2 className="font-allura text-5xl sm:text-6xl text-gold-gradient font-bold drop-shadow-md">
              Jaimala & Reception
            </h2>

            <div className="space-y-1 font-cormorant text-lg text-white">
              <p className="font-bold text-xl text-[#FFF5C0]">Wednesday, 22nd July 2026</p>
              <p className="text-base text-[#F7D070] font-semibold">Time : <span className="font-bold">07:30 PM Onwards</span></p>
              <p className="text-xs tracking-wider uppercase text-white/80 pt-1 font-bold">VENUE</p>
              <p className="font-bold text-lg text-white">The Aaureum Royal Courtyard</p>
            </div>
          </div>

          <div className="relative z-10 pb-8 text-center">
            <button
              onClick={() => scrollToSlide(9)}
              className="inline-flex items-center gap-1 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 10: VENUE DIRECTIONS & MAP */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-cover bg-center text-center text-white select-none" style={{ backgroundImage: "url('/assets/directions-bg.png')" }}>
          <div className="relative z-10 pt-16 space-y-4">
            <h2 className="font-allura text-5xl sm:text-6xl text-[#5A121E] font-bold drop-shadow-sm">
              Venue & Location
            </h2>

            <div className="bg-[#5A121E] backdrop-blur-md p-5 rounded-2xl border border-[#D4AF37] max-w-xs mx-auto space-y-2 shadow-2xl">
              <h3 className="font-cinzel text-sm font-bold text-[#F7D070] uppercase">
                The Aaureum Resort
              </h3>
              <p className="font-cormorant text-xs text-white font-semibold">
                Bhilwara, Rajasthan
              </p>

              <a
                href={WEDDING_DETAILS.dates.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FBF5B7] to-[#AA771C] text-[#5A121E] font-cinzel text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          <div className="relative z-10 pb-8 text-center">
            <button
              onClick={() => scrollToSlide(10)}
              className="inline-flex items-center gap-1 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce bg-[#5A121E] px-5 py-2 rounded-full border border-[#D4AF37] shadow-lg"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#F7D070]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 11: RSVP & FAMILY BLESSINGS */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-cover bg-center text-center text-white select-none" style={{ backgroundImage: "url('/assets/rsvp-1-bg.png')" }}>
          <div className="relative z-10 pt-16 space-y-4">
            <h2 className="font-allura text-5xl sm:text-6xl text-[#5A121E] font-bold drop-shadow-sm">
              RSVP & Greetings
            </h2>

            <div className="bg-[#5A121E] backdrop-blur-md p-5 rounded-2xl border border-[#D4AF37] max-w-xs mx-auto space-y-3 shadow-2xl">
              <p className="font-cormorant italic text-xs text-white font-semibold">
                Please confirm your gracious presence to help us prepare royal hospitality.
              </p>

              <button
                onClick={() => setIsRsvpOpen(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FBF5B7] to-[#AA771C] text-[#5A121E] font-cinzel text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              >
                <Send className="w-4 h-4" />
                <span>Send RSVP via WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="relative z-10 pb-8 text-center">
            <button
              onClick={() => scrollToSlide(11)}
              className="inline-flex items-center gap-1 text-[#F7D070] font-cinzel text-xs tracking-widest font-bold uppercase animate-bounce bg-[#5A121E] px-5 py-2 rounded-full border border-[#D4AF37] shadow-lg"
            >
              <span>SWIPE UP</span>
              <ChevronDown className="w-4 h-4 text-[#F7D070]" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 12: FAMILY TREE & ENDING CARD (Fixed Top Padding so text sits BELOW Peacock/Elephant artwork!) */}
        {/* ======================================================== */}
        <section className="story-slide w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-cover bg-center text-center text-[#2C1518] select-none" style={{ backgroundImage: "url('/assets/footer-bg.png')" }}>
          <div className="relative z-10 pt-48 sm:pt-52 space-y-3 overflow-y-auto max-h-[82vh] no-scrollbar">
            <h2 className="font-allura text-4xl text-[#5A121E] font-bold drop-shadow-xs">
              With Love & Blessings
            </h2>

            <div className="space-y-2 text-xs font-cormorant text-[#2C1518]">
              <p className="font-bold text-sm text-[#5A121E]">Smt. Padma & Sh. Sanjay Babel</p>
              <p className="font-bold text-sm text-[#5A121E]">Smt. Babita & Sh. Mahavir Ji Mehta</p>

              <div className="pt-2 border-t border-[#6A1B29]/30">
                <p className="font-cinzel text-[10px] tracking-wider uppercase text-[#5A121E] font-bold mb-1">
                  Maternal Family (Ranka Parivar)
                </p>
                <p className="font-bold">{WEDDING_DETAILS.family.maternalFamily.elders}</p>
                <p className="font-bold">{WEDDING_DETAILS.family.maternalFamily.parents}</p>
              </div>

              <div className="pt-2 border-t border-[#6A1B29]/30">
                <p className="font-cinzel text-[10px] tracking-wider uppercase text-[#5A121E] font-bold mb-1">
                  Family Ventures
                </p>
                <p className="font-bold">Fine Diamonds (Japan) • Fuji Global Finance</p>
                <p className="font-bold">Paras Estate • S. P Multitrade</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 pb-6 text-center border-t border-[#6A1B29]/30 pt-2">
            <h3 className="font-allura text-3xl text-[#5A121E] font-bold">Shreyansh & Aditi</h3>
            <p className="font-cinzel text-[10px] tracking-widest uppercase text-[#2C1518] font-bold">
              Royal Wedding • 2026
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
