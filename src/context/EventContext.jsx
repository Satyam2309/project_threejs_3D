import React, { createContext, useContext, useMemo, useState } from 'react';
import sampleEvent from '../data/sampleEvent.json';

const EventContext = createContext(null);

const getStored = (key, fallback) => localStorage.getItem(key) ?? fallback;
const createToken = () => `RSVP-${Math.floor(100000 + Math.random() * 900000)}`;

export const EventProvider = ({ children }) => {
  const [theme, setTheme] = useState(getStored('theme', 'light'));
  const [role, setRole] = useState(getStored('role', 'Guest'));
  const [eventData, setEventData] = useState(sampleEvent);
  const [toast, setToast] = useState(null);

  const notify = (message, variant = 'success') => {
    setToast({ message, variant, id: Date.now() });
  };

  const clearToast = () => setToast(null);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  const switchRole = (nextRole) => {
    localStorage.setItem('role', nextRole);
    setRole(nextRole);
    notify(`Role switched to ${nextRole}`, 'info');
  };

  const addOrUpdateRsvp = (formData) => {
    let generatedToken = formData.token || createToken();

    setEventData((prev) => {
      while (prev.guests.some((g) => g.token === generatedToken && g.email !== formData.email)) {
        generatedToken = createToken();
      }

      const existing = prev.guests.find((g) => g.token === generatedToken || g.email === formData.email);
      const nextGuest = {
        id: existing?.id ?? prev.guests.length + 1,
        name: formData.name,
        email: formData.email,
        status: formData.attendance,
        plusOne: formData.plusOne,
        mealChoice: formData.mealChoice,
        dietaryRestrictions: formData.dietaryRestrictions,
        accessibilityNeeds: formData.accessibilityNeeds,
        songRequest: formData.songRequest,
        group: existing?.group ?? 'Friends',
        seat: existing?.seat ?? null,
        token: generatedToken
      };

      const guests = existing
        ? prev.guests.map((g) => (g.id === existing.id ? nextGuest : g))
        : [...prev.guests, nextGuest];

      return { ...prev, guests };
    });

    notify('RSVP saved successfully.');
    return generatedToken;
  };

  const assignSeat = (guestId, seat) => {
    setEventData((prev) => ({
      ...prev,
      guests: prev.guests.map((g) => (g.id === guestId ? { ...g, seat } : g))
    }));
  };

  const markGiftPurchased = (giftId) => {
    setEventData((prev) => ({
      ...prev,
      registry: prev.registry.map((item) => (item.id === giftId ? { ...item, purchased: !item.purchased } : item))
    }));
    notify('Registry item status updated.', 'info');
  };

  const addVendorNote = (vendorId, notes) => {
    setEventData((prev) => ({
      ...prev,
      vendors: prev.vendors.map((v) => (v.id === vendorId ? { ...v, notes } : v))
    }));
    notify('Vendor note saved.', 'info');
  };

  const value = useMemo(() => ({
    theme,
    role,
    eventData,
    toast,
    toggleTheme,
    switchRole,
    addOrUpdateRsvp,
    assignSeat,
    markGiftPurchased,
    addVendorNote,
    setEventData,
    notify,
    clearToast
  }), [theme, role, eventData, toast]);

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEvent = () => useContext(EventContext);
