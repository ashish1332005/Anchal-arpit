import React, { useState } from 'react';
import { X, Send, User, Users, Utensils, CheckCircle } from 'lucide-react';

export default function RsvpModal({ isOpen, onClose, lang, dict }) {
  const [formData, setFormData] = useState({
    name: '',
    guestsCount: '2',
    status: 'Attending',
    diet: 'Jain Food',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct WhatsApp formatted string
    const whatsappText = encodeURIComponent(
      `*ROYAL WEDDING RSVP - Anchal & Arpit*\n\n` +
      `👤 *Guest Name:* ${formData.name}\n` +
      `✅ *Attendance:* ${formData.status}\n` +
      `👥 *Number of Guests:* ${formData.guestsCount}\n` +
      `🍲 *Diet Preference:* ${formData.diet}\n` +
      (formData.message ? `💬 *Warm Note:* ${formData.message}\n` : '') +
      `\nSending our warmest congratulations and blessings!`
    );

    // Host WhatsApp number from RSVP list (9929462333)
    const hostNumber = '919929462333';
    window.open(`https://wa.me/${hostNumber}?text=${whatsappText}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A0E13]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 royal-card-shadow border-2 border-[#D4AF37] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#6A1B29]/10 text-[#6A1B29] hover:bg-[#6A1B29] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="flex justify-center mb-1.5">
            <img
              src="/assets/couple_logo.png"
              alt="A-अ Logo"
              className="w-10 h-10 object-contain drop-shadow-sm"
            />
          </div>
          <h3 className="font-allura text-3xl sm:text-4xl text-[#6A1B29] font-bold">
            {dict.rsvpTitle}
          </h3>
          <p className="font-cormorant text-sm text-[#3A332C]/80 mt-0.5">
            {dict.rsvpSubtitle}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-cinzel text-xs font-bold uppercase tracking-wider text-[#6A1B29] mb-1">
              Your Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-[#D4AF37]" />
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Sharma & Family"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white focus:outline-none focus:border-[#6A1B29] text-sm text-[#3A332C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-cinzel text-xs font-bold uppercase tracking-wider text-[#6A1B29] mb-1">
                Attendance Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white focus:outline-none focus:border-[#6A1B29] text-sm text-[#3A332C]"
              >
                <option value="Joyfully Attending">Joyfully Attending</option>
                <option value="Regretfully Decline">Regretfully Decline</option>
              </select>
            </div>

            <div>
              <label className="block font-cinzel text-xs font-bold uppercase tracking-wider text-[#6A1B29] mb-1">
                No. of Guests
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-4 h-4 text-[#D4AF37]" />
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.guestsCount}
                  onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white focus:outline-none focus:border-[#6A1B29] text-sm text-[#3A332C]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-cinzel text-xs font-bold uppercase tracking-wider text-[#6A1B29] mb-1">
              Food / Dietary Preference
            </label>
            <div className="relative">
              <Utensils className="absolute left-3 top-3 w-4 h-4 text-[#D4AF37]" />
              <select
                value={formData.diet}
                onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white focus:outline-none focus:border-[#6A1B29] text-sm text-[#3A332C]"
              >
                <option value="Jain Pure Vegetarian">Jain Pure Vegetarian (No Root Veggies)</option>
                <option value="Regular Pure Vegetarian">Regular Pure Vegetarian</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-cinzel text-xs font-bold uppercase tracking-wider text-[#6A1B29] mb-1">
              Personal Note / Wishes (Optional)
            </label>
            <textarea
              rows="2"
              placeholder="Write a warm note for the couple..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white focus:outline-none focus:border-[#6A1B29] text-sm text-[#3A332C]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl shimmer-button text-white font-cinzel text-xs tracking-widest font-bold uppercase shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
          >
            <Send className="w-4 h-4 text-[#D4AF37]" />
            <span>{dict.submitRsvp}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
