// src/components/Navbar.jsx - GRADIENT VERSION
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

export default function Navbar() {
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

          {/* HOME - hover pink-blue */}
          <Link
            to="/"
            className="text-white font-extrabold text-[16px] tracking-[1px] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ec4899] hover:to-[#3b82f6] transition-all duration-300"
          >
            HOME
          </Link>

          {/* FEATURES - hover pink-blue */}
          <a
            href="#features"
            className="text-white/60 font-bold text-[15px] tracking-[1px] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ec4899] hover:to-[#3b82f6] transition-all duration-300"
          >
            FEATURES
          </a>

          {/* LOGIN - gradient button */}
          <Link
            to="/login"
            className="bg-gradient-to-r from-[#ec4899] to-[#3b82f6] text-white px-8 py-2.5 rounded-full font-extrabold text-[13px] tracking-[1px] hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/20"
          >
            LOGIN
          </Link>

        </div>

      </div>
    </nav>
  )
}