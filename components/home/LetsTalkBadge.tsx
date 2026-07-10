'use client';

import React from "react";

const LetsTalkBadge = () => {
  return (
    <button
      type="button"
      aria-label="Let's talk business"
      className="fixed right-0 top-1/3 z-50 -translate-y-1/3 rounded-full bg-brand-teal px-8 py-4 text-[13px] font-semibold tracking-wide text-white shadow-lg hidden md:block [writing-mode:vertical-rl] transition-colors hover:bg-brand-teal-dark"
    >
      Let&apos;s talk business
    </button>
  );
};

export default LetsTalkBadge;