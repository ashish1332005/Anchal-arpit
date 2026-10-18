import React, { useState } from 'react';
import { Heart, Send, Sparkles, MessageCircle } from 'lucide-react';

export default function WishesWall({ lang, dict }) {
  const [wishes, setWishes] = useState([
    {
      name: 'Ranka Family',
      message: 'Wishing Shreyansh and Aditi a lifetime of joy, harmony, and togetherness!',
      likes: 12,
      time: '2 hours ago'
    },
    {
      name: 'Pramod & Family',
      message: 'May your new journey be blessed with infinite love and prosperity. Hearty congratulations!',
      likes: 8,
      time: '5 hours ago'
    },
    {
      name: 'Mehta Relatives',
      message: 'Super excited to celebrate the Sangeet night and wedding ceremonies with you both!',
      likes: 15,
      time: '1 day ago'
    }
  ]);

  const [newWish, setNewWish] = useState({ name: '', message: '' });

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim()) return;

    setWishes([
      {
        name: newWish.name,
        message: newWish.message,
        likes: 1,
        time: 'Just now'
      },
      ...wishes
    ]);
    setNewWish({ name: '', message: '' });
  };

  const handleLike = (index) => {
    const updated = [...wishes];
    updated[index].likes += 1;
    setWishes(updated);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 sm:p-10 rounded-3xl glass-royal border border-[#D4AF37]/50 royal-card-shadow">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#6A1B29]/10 text-[#6A1B29] mb-2">
          <MessageCircle className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <h2 className="font-allura text-4xl sm:text-5xl text-[#6A1B29]">
          {dict.wishesTitle}
        </h2>
        <p className="font-cormorant text-base text-[#3A332C]/80 mt-1">
          {dict.wishesSubtitle}
        </p>
      </div>

      {/* Input Wish Form */}
      <form onSubmit={handleAddWish} className="mb-8 p-4 sm:p-6 rounded-2xl bg-white/70 border border-[#D4AF37]/30 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            required
            placeholder="Your Name"
            value={newWish.name}
            onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
            className="px-4 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white text-sm focus:outline-none focus:border-[#6A1B29]"
          />
          <input
            type="text"
            required
            placeholder="Your Heartfelt Blessings for Shreyansh & Aditi..."
            value={newWish.message}
            onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
            className="sm:col-span-2 px-4 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white text-sm focus:outline-none focus:border-[#6A1B29]"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl shimmer-button text-white font-cinzel text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Post Blessing</span>
          </button>
        </div>
      </form>

      {/* Wishes Display Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishes.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-white/90 border border-[#D4AF37]/30 royal-card-shadow flex flex-col justify-between space-y-3 transition-transform hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-xs font-bold text-[#6A1B29] tracking-wider">
                  {item.name}
                </span>
                <span className="font-sans-body text-[10px] text-gray-400">
                  {item.time}
                </span>
              </div>
              <p className="font-cormorant italic text-base text-[#3A332C] mt-2">
                "{item.message}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#D4AF37]/20">
              <span className="text-[11px] font-sans-body text-gray-500">Shreyansh ❤️ Aditi</span>
              <button
                onClick={() => handleLike(index)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6A1B29]/10 text-[#6A1B29] text-xs font-semibold hover:bg-[#6A1B29] hover:text-white transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                <span>{item.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
