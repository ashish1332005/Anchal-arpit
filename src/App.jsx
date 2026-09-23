import React, { useState, useRef, useEffect } from 'react';
import EnvelopeOpening from './components/EnvelopeOpening';
import FallingPetals from './components/FallingPetals';
import AudioPlayer from './components/AudioPlayer';
import RsvpModal from './components/RsvpModal';
import { WEDDING_DETAILS } from './data/weddingData';

import {
  ChevronUp,
  Calendar,
  Clock,
  Sparkles,
  Flame,
  Crown,
  Share2,
  Navigation,
  Phone,
  MessageSquare,
} from 'lucide-react';

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function LotusDivider({ className = '' }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 opacity-80 ${className}`}
    >
      <span className="h-px w-12 bg-[#B58A52]/50" />
      <span className="text-[#B58A52] text-lg">❦</span>
      <span className="h-px w-12 bg-[#B58A52]/50" />
    </div>
  );
}

function FlourishWing({ side = 'left' }) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 text-[#B58A52]/60 text-3xl ${
        side === 'left' ? 'left-3' : 'right-3 rotate-180'
      }`}
    >
      ❧
    </div>
  );
}

function TitleFlourish({ children, eyebrow }) {
  return (
    <div className="relative z-10 text-center px-5">
      {eyebrow && (
        <div className="mb-2 text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#A9793D] font-medium">
          {eyebrow}
        </div>
      )}

      <h2
        className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A2224]"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        {children}
      </h2>

      <LotusDivider className="mt-3" />
    </div>
  );
}

function OrnateCard({ children, className = '' }) {
  return (
    <div
      className={`
        relative
        rounded-[24px]
        border border-[#B58A52]/30
        bg-[#FFFDF8]/75
        backdrop-blur-[3px]
        shadow-[0_15px_50px_rgba(80,35,25,0.08)]
        ${className}
      `}
    >
      <div className="absolute inset-[5px] rounded-[20px] border border-[#B58A52]/10 pointer-events-none" />
      {children}
    </div>
  );
}

function ClocheIcon() {
  return (
    <div className="flex justify-center">
      <div className="relative w-16 h-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-[#A9793D]" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-8 rounded-t-[28px] border border-[#A9793D]" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-[#A9793D]/60" />
      </div>
    </div>
  );
}

function PherasIcon() {
  return (
    <div className="text-4xl text-[#A9793D]">
      🔥
    </div>
  );
}

/* =========================================================
   SWIPE BUTTON
========================================================= */

function RoyalSwipeUp({
  onClick,
  label = 'Scroll to continue',
  dark = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        absolute
        bottom-5
        left-1/2
        -translate-x-1/2
        z-50
        flex
        flex-col
        items-center
        gap-1
        cursor-pointer
        transition-all
        duration-300
        hover:scale-105
        ${dark ? 'text-white' : 'text-[#4A2224]'}
      `}
    >
      <span className="text-[9px] uppercase tracking-[0.28em] opacity-70">
        {label}
      </span>

      <span
        className={`
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          ${dark ? 'border-white/50' : 'border-[#A9793D]/50'}
        `}
      >
        <ChevronUp className="w-4 h-4 animate-bounce" />
      </span>
    </button>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [lang, setLang] = useState('en');
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [dateRevealed, setDateRevealed] = useState(false);

  const containerRef = useRef(null);

  const dict =
    WEDDING_DETAILS?.translations?.[lang] ||
    WEDDING_DETAILS?.translations?.en ||
    {};

  /* =======================================================
     GUEST NAME
  ======================================================= */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const guest =
      params.get('guest') ||
      params.get('to') ||
      params.get('name') ||
      '';

    if (guest) {
      setGuestName(guest);
    }
  }, []);

  /* =======================================================
     UNLOCK
  ======================================================= */

  const handleUnlock = () => {
    setIsUnlocked(true);
    setAutoPlayAudio(true);

    setTimeout(() => {
      containerRef.current?.focus?.();
    }, 100);
  };

  /* =======================================================
     IMPORTANT:
     12 STORY SLIDES = INDEX 0 TO 11
  ======================================================= */

  const scrollToSlide = (index) => {
    const container = containerRef.current;

    if (!container) return;

    const slides = container.querySelectorAll('.story-slide');

    if (!slides[index]) return;

    slides[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  /* =======================================================
     SHARE
  ======================================================= */

  const handleShare = async () => {
    const shareData = {
      title: 'Anchal & Arpit Wedding Invitation',
      text: 'You are warmly invited to celebrate the wedding of Anchal & Arpit.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Invitation link copied!');
      }
    } catch (error) {
      console.log('Share cancelled');
    }
  };

  /* =======================================================
     GOOGLE CALENDAR
  ======================================================= */

  const calendarUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' +
    encodeURIComponent(
      'Anchal & Arpit Royal Wedding - Gloria Inn, Bhilwara'
    ) +
    '&details=' +
    encodeURIComponent(
      'Wedding celebrations of Anchal Chechani and Arpit Kabra on 11 & 12 December 2026 at Gloria Inn, Bhilwara'
    ) +
    '&location=' +
    encodeURIComponent('Gloria Inn, Bhilwara') +
    '&dates=20261211T013000Z/20261212T203000Z';

  /* =======================================================
     COMMON DATA
  ======================================================= */

  const warmRegards = WEDDING_DETAILS?.family?.warmRegards || '';
  const specialRequest1 =
    WEDDING_DETAILS?.family?.specialRequest1 || '';
  const mithiManuhar =
    WEDDING_DETAILS?.family?.mithiManuhar || '';
  const specialRequest2 =
    WEDDING_DETAILS?.family?.specialRequest2 || '';

  const rsvpNames =
    WEDDING_DETAILS?.family?.rsvp?.names?.join(' • ') || '';

  const rsvpAddress =
    WEDDING_DETAILS?.family?.rsvp?.address ||
    WEDDING_DETAILS?.family?.rsvp?.city ||
    '';

  const rsvpPhones =
    WEDDING_DETAILS?.family?.rsvp?.phones || [];

  const bestCompliments =
    WEDDING_DETAILS?.family?.bestCompliments || {};

  const firms =
    WEDDING_DETAILS?.family?.firms?.join(' • ') || '';

  const nanihaalPaksh =
    WEDDING_DETAILS?.family?.nanihaalPaksh || {};

  const samdhiParivaar =
    WEDDING_DETAILS?.family?.samdhiParivaar || {};

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <div className="relative w-full h-[100dvh] bg-[#FAF7F2] flex items-center justify-center overflow-hidden">
      {/* Falling petals */}
      <FallingPetals />

      {/* Audio */}
      <AudioPlayer
        autoPlay={autoPlayAudio}
        isUnlocked={isUnlocked}
      />

      {/* Envelope */}
      {!isUnlocked && (
        <EnvelopeOpening
          onComplete={handleUnlock}
          guestName={guestName}
        />
      )}

      {/* ===================================================
          FIXED HEADER
      =================================================== */}

      {isUnlocked && (
        <div className="fixed top-0 left-0 right-0 z-[80] pointer-events-none">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="pointer-events-auto">
              <button
                type="button"
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-white/70 backdrop-blur-md border border-[#A9793D]/20 flex items-center justify-center text-[#4A2224] shadow-sm"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <div className="pointer-events-auto">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="h-9 rounded-full px-3 text-xs bg-white/75 backdrop-blur-md border border-[#A9793D]/20 text-[#4A2224] outline-none"
              >
                <option value="en">EN</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================
          MAIN SCROLL CONTAINER
      =================================================== */}

      <div
        ref={containerRef}
        className={`
          w-full
          h-[100dvh]
          relative
          bg-[#FAF7F2]
          no-scrollbar
          ${
            isUnlocked
              ? 'snap-y snap-mandatory overflow-y-scroll scroll-smooth'
              : 'overflow-hidden'
          }
        `}
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >

        {/* =================================================
            01 — MAIN INVITATION
        ================================================= */}

        <section
          className="story-slide relative w-full h-[100dvh] snap-start overflow-hidden"
          style={{
            backgroundImage:
              "url('/assets/invitation-main-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="mb-3 text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#6E4828]">
              Together with their families
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-8xl text-[#4A2224]"
              style={{
                fontFamily: 'Great Vibes, cursive',
              }}
            >
              Anchal
            </h1>

            <div
              className="text-3xl sm:text-4xl text-[#A9793D] my-2"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
              }}
            >
              &
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-8xl text-[#4A2224]"
              style={{
                fontFamily: 'Great Vibes, cursive',
              }}
            >
              Arpit
            </h1>

            <LotusDivider className="my-6" />

            <p
              className="text-sm sm:text-base tracking-[0.16em] uppercase text-[#593738]"
            >
              11 & 12 December 2026
            </p>

            <p className="mt-2 text-xs sm:text-sm text-[#6B5050]">
              Gloria Inn • Bhilwara
            </p>
          </div>

          <RoyalSwipeUp
            onClick={() => scrollToSlide(1)}
            label="Scroll to begin"
          />
        </section>

        {/* =================================================
            02 — SAVE THE DATE
        ================================================= */}

        <section
          className="story-slide relative w-full h-[100dvh] snap-start overflow-hidden"
          style={{
            backgroundImage:
              "url('/assets/datereveal-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-[#FAF7F2]/15" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
            <TitleFlourish eyebrow="Mark Your Calendar">
              Save The Date
            </TitleFlourish>

            <div className="mt-8">
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#85603C]">
                December
              </div>

              <div
                className="text-7xl sm:text-8xl text-[#5A292C]"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                }}
              >
                11 <span className="text-3xl">&</span> 12
              </div>

              <div className="text-xs uppercase tracking-[0.28em] text-[#85603C]">
                2026
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDateRevealed((v) => !v)}
              className="mt-8 px-6 py-3 rounded-full border border-[#A9793D]/50 bg-white/60 backdrop-blur-sm text-xs tracking-[0.18em] uppercase text-[#4A2224]"
            >
              <Calendar className="inline-block w-4 h-4 mr-2 -mt-0.5" />
              {dateRevealed ? 'Our Wedding Days' : 'Reveal Dates'}
            </button>

            {dateRevealed && (
              <div className="mt-5 text-sm text-[#5C4242]">
                Gloria Inn, Bhilwara
              </div>
            )}
          </div>

          <RoyalSwipeUp
            onClick={() => scrollToSlide(2)}
            label="Continue"
          />
        </section>

        {/* =================================================
            03 — VINAYAK STHAPNA
        ================================================= */}

        <section
          className="story-slide relative w-full h-[100dvh] snap-start overflow-hidden"
          style={{
            backgroundImage:
              "url('/assets/vinayak-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-[#FFF9F0]/10" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="text-5xl mb-5">ॐ</div>

            <TitleFlourish eyebrow="11 December 2026">
              Vinayak Sthapna
            </TitleFlourish>

            <div className="mt-8 flex flex-col items-center gap-3 text-[#513334]">
              <Clock className="w-5 h-5 text-[#A9793D]" />

              <p className="text-sm tracking-wide">
                Auspicious beginnings
              </p>

              <p className="text-xs opacity-70 max-w-sm">
                With divine blessings, we begin the celebrations
                with the sacred installation of Lord Ganesha.
              </p>
            </div>
          </div>

          <RoyalSwipeUp
            onClick={() => scrollToSlide(3)}
            label="Next celebration"
          />
        </section>

        {/* =================================================
            04 — CARNIVAL
        ================================================= */}

        <section
          className="story-slide relative w-full h-[100dvh] snap-start overflow-hidden"
          style={{
            backgroundImage:
              "url('/assets/carnival-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/5" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <Sparkles className="w-7 h-7 text-[#A9793D] mb-4" />

            <TitleFlourish eyebrow="Celebration">
              Carnival
            </TitleFlourish>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#593B3D]">
              A joyful evening filled with colours, laughter,
              music and beautiful memories.
            </p>
          </div>

          <RoyalSwipeUp
            onClick={() => scrollToSlide(4)}
            label="Continue"
          />
        </section>

        {/* =================================================
            05 — SANGEET & RING CEREMONY
        ================================================= */}

        <section
          className="story-slide relative w-full h-[100dvh] snap-start overflow-hidden"
          style={{
            backgroundImage:
              "url('/assets/sangeet-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-[#2B1116]/10" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <FlourishWing side="left" />
            <FlourishWing side="right" />

            <Sparkles className="w-6 h-6 text-[#B58A52] mb-4" />

            <TitleFlourish eyebrow="11 December">
              Sangeet & Ring Ceremony
            </TitleFlourish>

            <div className="mt-8 flex items-center gap-3 text-[#5A3939]">
              <Clock className="w-4 h-4 text-[#A9793D]" />
              <span className="text-sm">
                Music • Dance • Celebration
              </span>
            </div>
          </div>

          <RoyalSwipeUp
            onClick={() => scrollToSlide(5)}
            label="Continue"
          />
        </section>

        {/* =================================================
            06 — MANGAL KALASH
        ================================================= */}

        <section
          className="story-slide relative w-full h-[100dvh] snap-start overflow-hidden"
          style={{
            backgroundImage:
              "url('/assets/kalash-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="text-5xl mb-5">🪷</div>

            <TitleFlourish eyebrow="12 December 2026">
              Mangal Kalash
            </TitleFlourish>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#593B3D]">
              An auspicious celebration filled with blessings,
              traditions and the warmth of family.
            </p>
          </div>

          <RoyalSwipeUp
            onClick={() => scrollToSlide(6)}
            label="Continue"
          />
        </section>

        {/* =================================================
            07 — MAYRA
        ================================================= */}

        <section
          className="story-slide relative w-full h-[100dvh] snap-start overflow-hidden"
          style={{
            backgroundImage:
              "url('/assets/bhaatbharai-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <Crown className="w-7 h-7 text-[#A9793D] mb-4" />

            <TitleFlourish eyebrow="Family Celebration">
              Mayra
            </TitleFlourish>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#593B3D]">
              A heartfelt family tradition celebrating love,
              blessings and togetherness.
            </p>
          </div>

          <RoyalSwipeUp
            onClick={() => scrollToSlide(7)}
            label="Continue"
          />
        </section>

        {/* =================================================
            08 — WEDDING CEREMONY
        ================================================= */}

        <section
          className="story-slide relative w-full h-[100dvh] snap-start overflow-hidden"
          style={{
            backgroundImage:
              "url('/assets/welcomefeast-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-[#FFF8EF]/10" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <ClocheIcon />

            <div className="mt-6">
              <TitleFlourish eyebrow="The Celebration">
                Wedding Ceremony
              </TitleFlourish>
            </div>

            <div className="mt-7 flex flex-col items-center gap-3 text-[#583C3D]">
              <Calendar className="w-5 h-5 text-[#A9793D]" />

              <p className="text-sm">
                12 December 2026
              </p>

              <p className="text-xs opacity-75">
                Gloria Inn, Bhilwara
              </p>
            </div>
          </div>

          <RoyalSwipeUp
            onClick={() => scrollToSlide(8)}
            label="Continue"
          />
        </section>

        {/* =================================================
            09 — RECEPTION & PHERAS
        ================================================= */}

        <section
          className="story-slide relative w-full h-[100dvh] snap-start overflow-hidden bg-black"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/reception-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
            <PherasIcon />

            <div className="mt-5">
              <div className="text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-80">
                Sacred vows
              </div>

              <h2
                className="mt-2 text-4xl sm:text-5xl md:text-6xl"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                }}
              >
                Reception & Sacred Pheras
              </h2>

              <div className="mt-4 mx-auto h-px w-20 bg-white/50" />

              <p className="mt-4 text-sm opacity-90">
                Two hearts • One promise • Forever
              </p>
            </div>
          </div>

          <RoyalSwipeUp
            onClick={() => scrollToSlide(9)}
            label="Continue"
            dark
          />
        </section>

        {/* =================================================
            10 — VENUE
        ================================================= */}

        <section
          className="story-slide relative w-full h-[100dvh] snap-start overflow-hidden"
          style={{
            backgroundImage:
              "url('/assets/directions-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-[#FAF7F2]/20" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-5">
            <TitleFlourish eyebrow="Join Us">
              Venue & Location
            </TitleFlourish>

            <OrnateCard className="mt-8 w-full max-w-md p-5 sm:p-7">
              <div className="text-center">
                <Navigation className="w-6 h-6 mx-auto text-[#A9793D]" />

                <h3
                  className="mt-3 text-2xl text-[#4A2224]"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                  }}
                >
                  Gloria Inn
                </h3>

                <p className="mt-1 text-sm text-[#705859]">
                  Bhilwara, Rajasthan
                </p>

                <div className="mt-5 overflow-hidden rounded-xl border border-[#A9793D]/20">
                  <img
                    src="/assets/gloria_map.png"
                    alt="Gloria Inn map"
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                </div>

                <div className="mt-5 flex gap-3">
                  <a
                    href={
                      WEDDING_DETAILS?.dates?.googleMapsUrl ||
                      'https://maps.google.com'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-full bg-[#5A292C] text-white text-xs uppercase tracking-[0.16em]"
                  >
                    <Navigation className="inline w-4 h-4 mr-1" />
                    Directions
                  </a>

                  <a
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-full border border-[#A9793D]/40 text-[#4A2224] text-xs uppercase tracking-[0.16em] bg-white/60"
                  >
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Calendar
                  </a>
                </div>
              </div>
            </OrnateCard>
          </div>

          {/* IMPORTANT:
              Venue goes to slide 10 = With Love screen
          */}
          <RoyalSwipeUp
            onClick={() => scrollToSlide(10)}
            label="With Love & Blessings"
          />
        </section>

        {/* =================================================
            FINAL WRAPPER
            SAME BACKGROUND FOR SCREEN 11 + SCREEN 12
        ================================================= */}

        <div
          id="with-love-blessings"
          className="relative w-full"
        >
          {/* =================================================
              SHARED CONTINUOUS BACKGROUND
          ================================================= */}

          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{
              backgroundImage:
                "url('/assets/rsvp-1-bg.png')",
            }}
          />

          <div className="absolute inset-0 z-0 bg-[#FAF7F2]/10 pointer-events-none" />

          {/* =================================================
              11 — WITH LOVE & BLESSINGS
          ================================================= */}

          <section
            id="with-love-blessings-1"
            className="story-slide relative z-10 w-full h-[100dvh] snap-start overflow-hidden text-center text-[#2C1518] select-none"
          >
            <div className="h-full w-full flex flex-col items-center justify-center px-5 py-12 overflow-y-auto">
              <TitleFlourish eyebrow="With Love & Blessings">
                With Love & Blessings
              </TitleFlourish>

              <div className="mt-7 w-full max-w-xl space-y-4">
                {warmRegards && (
                  <OrnateCard className="p-5">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#A9793D] mb-2">
                      Warm Regards
                    </div>

                    <p className="text-sm leading-6 text-[#583C3D] whitespace-pre-line">
                      {warmRegards}
                    </p>
                  </OrnateCard>
                )}

                {specialRequest1 && (
                  <OrnateCard className="p-5">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#A9793D] mb-2">
                      Special Request
                    </div>

                    <p className="text-sm leading-6 text-[#583C3D] whitespace-pre-line">
                      {specialRequest1}
                    </p>
                  </OrnateCard>
                )}

                {mithiManuhar && (
                  <OrnateCard className="p-5">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#A9793D] mb-2">
                      Mithi Manuhar
                    </div>

                    <p className="text-sm leading-6 text-[#583C3D] whitespace-pre-line">
                      {mithiManuhar}
                    </p>
                  </OrnateCard>
                )}

                {specialRequest2 && (
                  <OrnateCard className="p-5">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#A9793D] mb-2">
                      Special Request
                    </div>

                    <p className="text-sm leading-6 text-[#583C3D] whitespace-pre-line">
                      {specialRequest2}
                    </p>
                  </OrnateCard>
                )}
              </div>
            </div>

            {/* 11 -> 12 */}
            <RoyalSwipeUp
              onClick={() => scrollToSlide(11)}
              label="Continue"
            />
          </section>

          {/* =================================================
              12 — FAMILY / RSVP
          ================================================= */}

          <section
            id="with-love-blessings-2"
            className="story-slide relative z-10 w-full h-[100dvh] snap-start overflow-hidden text-center text-[#2C1518] select-none"
          >
            <div className="h-full w-full overflow-y-auto px-5 py-12 pb-20">
              <div className="min-h-full flex flex-col items-center justify-center">
                {/* FAMILY QUOTE */}

                {dict?.familyInviteQuote && (
                  <div className="max-w-2xl mx-auto">
                    <div
                      className="text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#4A2224]"
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                      }}
                    >
                      “{dict.familyInviteQuote}”
                    </div>

                    <div className="mt-3 text-xs tracking-[0.2em] uppercase text-[#A9793D]">
                      — Kabra & Chechani Parivaar
                    </div>
                  </div>
                )}

                <LotusDivider className="my-7" />

                {/* RSVP */}

                <OrnateCard className="w-full max-w-lg p-6">
                  <div className="flex justify-center">
                    <MessageSquare className="w-6 h-6 text-[#A9793D]" />
                  </div>

                  <div className="mt-3">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-[#A9793D]">
                      Kindly Confirm
                    </div>

                    <h3
                      className="mt-2 text-3xl text-[#4A2224]"
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                      }}
                    >
                      RSVP
                    </h3>
                  </div>

                  {rsvpNames && (
                    <p className="mt-4 text-sm font-medium text-[#57393B]">
                      {rsvpNames}
                    </p>
                  )}

                  {rsvpAddress && (
                    <p className="mt-2 text-xs leading-5 text-[#765E5E]">
                      {rsvpAddress}
                    </p>
                  )}

                  {rsvpPhones.length > 0 && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {rsvpPhones.map((phone, index) => {
                        const cleanPhone = String(phone).replace(
                          /\D/g,
                          ''
                        );

                        return (
                          <a
                            key={`${phone}-${index}`}
                            href={`tel:+91${cleanPhone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#A9793D]/30 bg-white/50 text-xs text-[#57393B]"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#A9793D]" />
                            {phone}
                          </a>
                        );
                      })}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsRsvpOpen(true)}
                    className="mt-5 w-full py-3.5 rounded-full bg-[#5A292C] text-white text-xs uppercase tracking-[0.2em] shadow-md hover:bg-[#4A2224] transition-colors"
                  >
                    Confirm RSVP
                  </button>
                </OrnateCard>

                {/* BEST COMPLIMENTS */}

                {(bestCompliments?.members?.length > 0 ||
                  bestCompliments?.familyTitle) && (
                  <div className="mt-7 w-full max-w-lg">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-[#A9793D]">
                      With Best Compliments
                    </div>

                    {bestCompliments?.familyTitle && (
                      <h3
                        className="mt-2 text-2xl text-[#4A2224]"
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                        }}
                      >
                        {bestCompliments.familyTitle}
                      </h3>
                    )}

                    {bestCompliments?.members?.length > 0 && (
                      <p className="mt-2 text-xs leading-6 text-[#674F50]">
                        {bestCompliments.members.join(' • ')}
                      </p>
                    )}
                  </div>
                )}

                {/* FIRMS */}

                {firms && (
                  <div className="mt-6">
                    <div className="text-[9px] uppercase tracking-[0.25em] text-[#A9793D]">
                      Firms
                    </div>

                    <p className="mt-2 text-xs text-[#674F50] max-w-lg">
                      {firms}
                    </p>
                  </div>
                )}

                {/* NANIHAAL */}

                {nanihaalPaksh?.name && (
                  <div className="mt-6">
                    <div className="text-[9px] uppercase tracking-[0.25em] text-[#A9793D]">
                      Nanihaal Paksh
                    </div>

                    <p className="mt-2 text-sm text-[#4A2224]">
                      {nanihaalPaksh.name}
                    </p>
                  </div>
                )}

                {/* SAMDHI */}

                {samdhiParivaar?.members?.length > 0 && (
                  <div className="mt-6">
                    <div className="text-[9px] uppercase tracking-[0.25em] text-[#A9793D]">
                      Samdhi Parivaar
                    </div>

                    <p className="mt-2 text-xs leading-6 text-[#674F50] max-w-lg">
                      {samdhiParivaar.members.join(', ')}
                    </p>
                  </div>
                )}

                {/* FOOTER */}

                <div className="mt-8 pb-4">
                  <div
                    className="text-3xl text-[#4A2224]"
                    style={{
                      fontFamily: 'Great Vibes, cursive',
                    }}
                  >
                    Arpit & Anchal
                  </div>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-[#765E5E]">
                    Gloria Inn • Bhilwara
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-[#765E5E]">
                    11 & 12 December 2026
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ===================================================
          RSVP MODAL
      =================================================== */}

      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        guestName={guestName}
        weddingDetails={WEDDING_DETAILS}
      />
    </div>
  );
}
