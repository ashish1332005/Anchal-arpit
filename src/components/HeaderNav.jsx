import React from 'react';
import { Globe, Share2, Heart, MessageSquare } from 'lucide-react';

export default function HeaderNav({ lang, setLang, onOpenRsvp, dict }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${WEDDING_DETAILS.couple.groom} & ${WEDDING_DETAILS.couple.bride} Royal Wedding Invitation`,
          text: `You are cordially invited to celebrate the wedding festivities of ${WEDDING_DETAILS.couple.groom} & ${WEDDING_DETAILS.couple.bride}!`,
          url: window.location.href,
        })
        .catch((err) => console.log('Share error:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Invitation link copied to clipboard!');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-royal border-b border-[#D4AF37]/30 royal-card-shadow px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#D4AF37]/40 text-[#6A1B29] font-cinzel text-xs font-semibold hover:bg-[#6A1B29] hover:text-white transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#D4AF37]/40 text-[#6A1B29] font-cinzel text-xs font-semibold hover:bg-[#6A1B29] hover:text-white transition-colors"
            title={dict.shareCard}
          >
            <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">{dict.shareCard}</span>
          </button>

          {/* RSVP Modal Trigger Button */}
          <button
            onClick={onOpenRsvp}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full shimmer-button text-white font-cinzel text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>RSVP</span>
          </button>
        </div>
      </div>
    </header>
  );
}
