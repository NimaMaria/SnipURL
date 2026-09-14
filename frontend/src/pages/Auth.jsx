import { useState } from 'react';
import logo from '../assets/logo.jpeg';

export default function Auth() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center pt-10 pb-20 px-4 overflow-y-auto relative">

      {/* ===== ONLY THIS IS NEW - SIDE GLOW LIKE PHOTO ===== */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#3b82ff]/20 via-[#8b5cf6]/20 to-[#ec4899]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#ec4899]/20 via-[#8b5cf6]/20 to-[#3b82ff]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#8b5cf6]/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      {/* ===== YOUR LOGO - SAME SIZE YOU SET - h-16 md:h-20 ===== */}
      <div className="flex justify-center mb-6 relative z-10">
        <img src={logo} alt="SnapURL" className="h-16 w-auto md:h-20" />
      </div>

      {/* Toggle - SAME AS YOURS */}
      <div className="w-full max-w-[400px] bg-[#151515] rounded-full p-1 flex mb-6 border border-white/10 relative z-10">
        <button onClick={()=>setIsFlipped(false)} className={`flex-1 py-3 rounded-full text-[14px] font-medium transition-all ${!isFlipped? 'bg-gradient-to-r from-[#3b82ff] via-[#8b5cf6] to-[#ec4899] text-white shadow' : 'text-white/60'}`}>Log in</button>
        <button onClick={()=>setIsFlipped(true)} className={`flex-1 py-3 rounded-full text-[14px] font-medium transition-all ${isFlipped? 'bg-gradient-to-r from-[#3b82ff] via-[#8b5cf6] to-[#ec4899] text-white shadow' : 'text-white/60'}`}>Sign up</button>
      </div>

      {/* BORDER BOX - SAME WIDTH 400px HEIGHT 560px */}
      <div className="relative w-full max-w-[400px] h-[560px] p-[1.5px] rounded-[24px] bg-gradient-to-br from-[#3b82ff] via-[#8b5cf6] to-[#ec4899] z-10">

        {/* INNER BOX - SAME WIDTH 400px HEIGHT 560px */}
          <div className="relative w-full h-full transition-transform duration-700" style={{ transformStyle: 'preserve-3d', transform: isFlipped? 'rotateY(180deg)' : 'rotateY(0deg)' }}>

            {/* LOGIN */}
            <div className="absolute inset-0 w-full h-full bg-[#0f0f0f] rounded-[22px] px-7 pt-7 pb-7 flex flex-col" style={{ backfaceVisibility: 'hidden' }}>
              <h2 className="text-white text-[24px] font-semibold">Welcome back</h2>
              <p className="text-[#888] text-[13px] mt-1 mb-6">Log in to manage your links</p>

              <div className="flex flex-col h-full">
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-[13px]">Email</label>
                    <input placeholder="snapurl@gmail.com" autocomplete="off" className="w-full mt-1.5 bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] outline-none focus:border-violet-500" />
                  </div>
                  <div>
                    <label className="text-white text-[13px]">Password</label>
                    <input type="password" placeholder="••••••••" autocomplete="off" className="w-full mt-1.5 bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] outline-none focus:border-violet-500" />
                    <div className="text-right mt-2">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82ff] to-[#ec4899] text-[12px] cursor-pointer font-semibold">Forgot password?</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-gradient-to-r from-[#3b82ff] via-[#8b5cf6] to-[#ec4899] text-white font-medium py-3.5 rounded-xl text-[14px]">Log in</button>

                  <div className="flex items-center gap-3 my-4">
                    <div className="h-[1px] flex-1 bg-white/10"></div>
                    <span className="text-[#666] text-[12px]">or continue with</span>
                    <div className="h-[1px] flex-1 bg-white/10"></div>
                  </div>

                  <button className="w-full bg-[#1c1c1f] border border-white/10 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-[14px] hover:bg-[#222]">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" /> Google
                  </button>
                </div>

                <div className="flex-1"></div>
              </div>
            </div>

            {/* SIGN UP */}
            <div className="absolute inset-0 w-full h-full bg-[#0f0f0f] rounded-[22px] p-7 flex flex-col" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <h2 className="text-white text-[24px] font-semibold">Create your account</h2>
              <p className="text-[#888] text-[13px] mt-1 mb-5">Start shortening links in seconds</p>

              <div className="flex flex-col h-full">
                <div className="space-y-3.5">
                  <div>
                    <label className="text-white text-[13px]">Name</label>
                    <input className="w-full mt-1.5 bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] outline-none" />
                  </div>
                  <div>
                    <label className="text-white text-[13px]">Email</label>
                    <input className="w-full mt-1.5 bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] outline-none" />
                  </div>
                  <div>
                    <label className="text-white text-[13px]">Password</label>
                    <input type="password" className="w-full mt-1.5 bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] outline-none" />
                  </div>
                </div>

                <div className="mt-auto">
                  <button className="w-full bg-gradient-to-r from-[#3b82ff] via-[#8b5cf6] to-[#ec4899] text-white font-medium py-3.5 rounded-xl text-[14px] mt-4">Create account</button>

                  <div className="flex items-center gap-3 my-4">
                    <div className="h-[1px] flex-1 bg-white/10"></div>
                    <span className="text-[#666] text-[12px]">or continue with</span>
                    <div className="h-[1px] flex-1 bg-white/10"></div>
                  </div>

                  <button className="w-full bg-[#1c1c1f] border border-white/10 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-[14px] hover:bg-[#222]">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" /> Google
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}