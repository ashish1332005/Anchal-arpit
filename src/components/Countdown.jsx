import React, { useState, useEffect } from 'react';

export default function Countdown({ targetDateIso }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDateIso).getTime();
    const updateTimer = () => {
      const difference = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference % 86400000) / 3600000),
        minutes: Math.floor((difference % 3600000) / 60000),
        seconds: Math.floor((difference % 60000) / 1000),
      });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDateIso]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="mx-auto w-full py-1">
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {units.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center border-r border-[#D4AF37]/40 last:border-r-0">
            <span className="font-playfair text-2xl sm:text-3xl font-bold leading-none text-[#5A121E]">{String(value).padStart(2, '0')}</span>
            <span className="font-cinzel text-[8.5px] uppercase tracking-wider text-[#8B6508] font-bold mt-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
