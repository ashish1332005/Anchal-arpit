import React, { useState, useEffect } from 'react';

export default function Countdown({ targetDateIso, lang }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(targetDateIso).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDateIso]);

  const units = [
    { label: lang === 'hi' ? 'दिन' : 'Days', value: timeLeft.days },
    { label: lang === 'hi' ? 'घंटे' : 'Hours', value: timeLeft.hours },
    { label: lang === 'hi' ? 'मिनट' : 'Minutes', value: timeLeft.minutes },
    { label: lang === 'hi' ? 'सेकंड' : 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-6 rounded-2xl glass-royal border border-[#D4AF37]/50 royal-card-shadow text-center">
      <h3 className="font-cinzel text-xs sm:text-sm tracking-widest text-[#6A1B29] font-bold uppercase mb-4">
        {lang === 'hi' ? 'शुभ विवाह में शेष समय' : 'Counting Down To The Royal Wedding'}
      </h3>

      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {units.map((unit, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#FAF7F2] to-[#F3E6CE] border border-[#D4AF37]/40 shadow-inner"
          >
            <span className="font-cinzel-decorative text-2xl sm:text-4xl font-bold text-[#6A1B29]">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="font-sans-body text-[10px] sm:text-xs uppercase tracking-wider text-[#3A332C]/80 font-medium mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
