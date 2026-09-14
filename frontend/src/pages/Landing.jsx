// src/pages/Landing.jsx
import React from 'react';
import Navbar from '../components/Navbar';

export default function Landing() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory bg-[#070D23] text-white selection:bg-[#ec4899]/30">
      <Navbar />

      {/* HERO - FIXED DOWN */}
      <section className="snap-start min-h-[calc(100vh-72px)] relative flex flex-col bg-[#070D23] overflow-hidden">

        {/* Top - More space above the hero content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-36 lg:pt-40 pb-10 grid lg:grid-cols-2 gap-10 items-center w-full flex-1">
          <div className="flex flex-col justify-center h-full space-y-6 lg:space-y-8">
            <span className="inline-block w-fit text-[10px] tracking-[0.2em] font-bold text-[#8b9eff] bg-[#1a2650] px-3 py-1 rounded-full">URL SHORTENER</span>
            <h1 className="text-5xl lg:text-[56px] font-black leading-[0.95] tracking-tight">
              Long URL?<br />
              <span className="bg-gradient-to-r from-[#ff8abf] to-[#6ea8ff] bg-clip-text text-transparent">Snap It Short</span>
            </h1>
            <p className="text-white/60 max-w-md text-[15px] leading-relaxed">
              Turn long, messy URLs into clean and short links. Share them anywhere, anytime.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-to-r from-[#ec4899]/20 to-[#3b82f6]/20 blur-[80px] rounded-full"></div>
            <div className="relative space-y-3">
              <div className="bg-[#0f1a3a] border border-[#ec4899]/30 rounded-2xl px-5 py-4 flex gap-3 items-center max-w-[360px] ml-auto rotate-2">
                <span className="text-[#ec4899]">🔗</span>
                <span className="text-[11px] text-white/70 break-all">https://www.forms.com/gdjsigedmdjwgqdlhwnzgssy</span>
              </div>
              <div className="flex justify-center mr-[40px] -my-2">
  <svg width="40" height="70" viewBox="0 0 40 70" fill="none">
    <path d="M 50 2 C 20 18, 32 42, 24 56" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    {/* Arrow head at bottom */}
    <path d="M 18 45 L 24 62 L 34 46" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
</div>
              <div className="bg-[#0f1a3a] border border-[#6366f1]/50 rounded-2xl px-5 py-4 flex gap-3 items-center justify-between max-w-[320px] ml-[80px] -rotate-1">
                <div className="flex gap-3 items-center">
                  <span className="text-[#8b9eff]">🔗</span>
                  <span className="text-sm font-bold">snapurl.com/a8K2x</span>
                </div>
                <span className="text-white/30 text-sm">⎙</span>
              </div>
            </div>
          </div>
        </div>

        {/* WAVE - PUSHED TO VERY BOTTOM */}
        <div className="relative w-full h-[280px] mt-auto shrink-0">
          {/* Wave SVG - Very Low */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 1440 280" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0 60 Q 250 140, 500 70 T 900 80 T 1440 130" fill="none" stroke="url(#waveGrad)" strokeWidth="1.5" opacity="1"/>
              <path d="M0 90 Q 250 170, 500 100 T 900 110 T 1440 160 L 1440 280 L 0 280 Z" fill="url(#waveFill)"/>
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8"/>
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="waveFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0f1a3a" stopOpacity="0"/>
                  <stop offset="40%" stopColor="#0f1a3a" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#0d1f4a" stopOpacity="0.6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* 4 FEATURES */}
          <div className="absolute bottom-0 left-0 w-full z-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-3">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">

                <div className="text-center px-4 py-3">
                  <div className="mx-auto w-6 h-6 flex items-center justify-center text-[#f59e0b]">⚡</div>
                  <h4 className="mt-4 font-bold text-[10px] tracking-[0.15em]">FAST & SIMPLE</h4>
                  <p className="mt-1.5 text-[9px] text-white/40 leading-relaxed uppercase tracking-wide">Create short links<br/>in seconds.</p>
                </div>

                <div className="text-center px-4 py-3">
                  <div className="mx-auto w-6 h-6 flex items-center justify-center text-[#38bdf8]">💧</div>
                  <h4 className="mt-4 font-bold text-[10px] tracking-[0.15em]">SAFE & RELIABLE</h4>
                  <p className="mt-1.5 text-[9px] text-white/40 leading-relaxed uppercase tracking-wide">Your links are secure<br/>and always accessible.</p>
                </div>

                <div className="text-center px-4 py-3">
                  <div className="mx-auto w-6 h-6 flex items-center justify-center text-[#c4b5fd]">📊</div>
                  <h4 className="mt-4 font-bold text-[10px] tracking-[0.15em]">TRACK PERFORMANCE</h4>
                  <p className="mt-1.5 text-[9px] text-white/40 leading-relaxed uppercase tracking-wide">See clicks and understand<br/>your audience.</p>
                </div>

                <div className="text-center px-4 py-3">
                  <div className="mx-auto w-6 h-6 flex items-center justify-center text-white/80">🔗</div>
                  <h4 className="mt-4 font-bold text-[10px] tracking-[0.15em]">SHARE ANYWHERE</h4>
                  <p className="mt-1.5 text-[9px] text-white/40 leading-relaxed uppercase tracking-wide">On any device,<br/>anytime.</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="snap-start min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 w-full">
          <div className="text-center">
            <span className="text-[10px] tracking-[0.2em] font-bold text-[#ff8abf]">FEATURES</span>
            <h2 className="mt-2 text-3xl font-black">Everything you need, in one place</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { t: 'Custom Aliases', d: 'Create memorable links with your own custom alias.', i: '🔗' },
              { t: 'Link Analytics', d: 'Track total clicks and monitor performance.', i: '📊' },
              { t: 'Lightning Fast', d: 'Shorten any long URL in seconds.', i: '⚡' },
              { t: 'Secure & Reliable', d: 'Your links are safe and always up.', i: '🛡️' },
            ].map((f, idx) => (
              <div key={idx} className="bg-[#0f1a3a]/70 border border-[#ec4899]/20 rounded-2xl p-6 flex gap-4 hover:border-[#ec4899]/40 transition">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ec4899] to-[#3b82f6] flex items-center justify-center text-xl shrink-0">{f.i}</div>
                <div>
                  <h3 className="font-bold text-sm">{f.t}</h3>
                  <p className="mt-1 text-[12px] text-white/60 leading-relaxed">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-start min-h-screen bg-[#0d1a3a]/50 border-y border-white/5 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 w-full">
          <div className="text-center">
            <span className="text-[10px] tracking-[0.2em] font-bold text-[#8b9eff]">HOW IT WORKS</span>
            <h2 className="mt-2 text-2xl font-black">Get your short link in 3 easy steps</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-8 h-8 rounded-full bg-[#1a3a9a] border border-[#3b82f6] flex items-center justify-center text-xs font-bold">1</div>
              <h4 className="mt-3 font-bold text-sm">Paste your URL</h4>
              <p className="mt-1 text-[12px] text-white/50">Enter the long URL you want to shorten.</p>
              <div className="mt-4 bg-[#070D23] border border-white/10 rounded-xl px-3 py-3 text-[11px] text-white/60">🔗 https://example.com/very/long...</div>
            </div>
            <div>
              <div className="w-8 h-8 rounded-full bg-[#1a3a9a] border border-[#3b82f6] flex items-center justify-center text-xs font-bold">2</div>
              <h4 className="mt-3 font-bold text-sm">Customize (Optional)</h4>
              <p className="mt-1 text-[12px] text-white/50">Choose a custom alias if you want.</p>
              <div className="mt-4 bg-[#070D23] border border-white/10 rounded-xl px-3 py-3 text-[11px] flex justify-between">
                <span>snapurl.com/</span>
                <span className="bg-white/10 px-2 rounded">my-link ✨</span>
              </div>
            </div>
            <div>
              <div className="w-8 h-8 rounded-full bg-[#1a3a9a] border border-[#3b82f6] flex items-center justify-center text-xs font-bold">3</div>
              <h4 className="mt-3 font-bold text-sm">Share</h4>
              <p className="mt-1 text-[12px] text-white/50">Get your short SnapURL and share it anywhere.</p>
              <div className="mt-4 bg-[#070D23] border border-white/10 rounded-xl px-3 py-3 text-[11px]">🔗 snapurl.com/my-link</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="snap-start border-t border-white/5 py-6 min-h-[25vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-center items-center text-[11px] text-white/40">
          <span>© 2025 SnapURL. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}