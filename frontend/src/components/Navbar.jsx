// src/components/Navbar.jsx - GRADIENT VERSION
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

export default function Navbar({ onLoginClick, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <nav
      style={{ fontFamily: "'Cinzel', serif", letterSpacing: '1px' }}
      className="w-full bg-black px-4 md:px-8 py-4 sticky top-0 z-50 border-b border-white/10"
    >
      <div className="w-full flex items-center justify-between">

        <Link to="/" className="flex items-center">
          <img src={logo} alt="SnapURL" className="h-12 w-auto" />
        </Link>

        <div className="flex items-center gap-8 md:gap-12">

          <Link
            to="/"
            className="text-white font-extrabold text-[16px] tracking-[1px] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ec4899] hover:to-[#3b82f6] transition-all duration-300"
          >
            HOME
          </Link>

          <a
            href="#features"
            className="text-white font-bold text-[15px] tracking-[1px] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ec4899] hover:to-[#3b82f6] transition-all duration-300"
          >
            FEATURES
          </a>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-2.5 py-2 pr-4 text-white hover:bg-white/10 transition"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#ec4899] to-[#3b82f6] text-sm font-bold">
                  {firstLetter}
                </div>
                <span className="text-[13px] font-bold tracking-[1px]">{user.name || 'User'}</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-40 rounded-xl border border-white/10 bg-[#111111] p-2 shadow-lg shadow-black/40">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout?.();
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-[13px] font-medium text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onLoginClick}
              className="bg-gradient-to-r from-[#ec4899] to-[#3b82f6] text-white px-8 py-2.5 rounded-full font-extrabold text-[13px] tracking-[1px] hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/20"
            >
              LOGIN
            </button>
          )}

        </div>

      </div>
    </nav>
  )
}