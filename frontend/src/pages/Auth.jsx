import { useState } from 'react';
import api from '../api/api';
import logo from '../assets/logo.jpeg';

export default function Auth({ onClose, onAuthSuccess }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const isPopup = typeof onClose === 'function';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data?.token || response.data?.data?.token;
      const user = response.data?.data?.user || response.data?.user || {
        name: formData.name || 'User',
        email: formData.email,
      };

      if (token) {
        localStorage.setItem('token', token);
      }

      if (onAuthSuccess) {
        onAuthSuccess(user);
      }

      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const token = response.data?.token || response.data?.data?.token;
      const user = response.data?.data?.user || response.data?.user || {
        name: formData.name || 'User',
        email: formData.email,
      };

      if (token) {
        localStorage.setItem('token', token);
      }

      if (onAuthSuccess) {
        onAuthSuccess(user);
      }

      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={isPopup ? 'relative w-full' : 'min-h-screen bg-[#050505] flex flex-col items-center pt-10 pb-20 px-4 overflow-y-auto relative'}>
      {!isPopup && (
        <>
          <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#3b82ff]/20 via-[#8b5cf6]/20 to-[#ec4899]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#ec4899]/20 via-[#8b5cf6]/20 to-[#3b82ff]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="fixed top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#8b5cf6]/10 to-transparent rounded-full blur-[150px] pointer-events-none" />
        </>
      )}

      {isPopup && (
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#121212] text-xl text-white hover:bg-[#1a1a1a]"
        >
          ×
        </button>
      )}

      {!isPopup && (
        <div className="flex justify-center mb-6 relative z-10">
          <img src={logo} alt="SnapURL" className="h-16 w-auto md:h-20" />
        </div>
      )}

      <div className="w-full max-w-[400px] bg-[#151515] rounded-full p-1 flex mb-6 border border-white/10 relative z-10 mx-auto">
        <button type="button" onClick={() => setIsFlipped(false)} className={`flex-1 py-3 rounded-full text-[14px] font-medium transition-all ${!isFlipped ? 'bg-gradient-to-r from-[#3b82ff] via-[#8b5cf6] to-[#ec4899] text-white shadow' : 'text-white/60'}`}>Log in</button>
        <button type="button" onClick={() => setIsFlipped(true)} className={`flex-1 py-3 rounded-full text-[14px] font-medium transition-all ${isFlipped ? 'bg-gradient-to-r from-[#3b82ff] via-[#8b5cf6] to-[#ec4899] text-white shadow' : 'text-white/60'}`}>Sign up</button>
      </div>

      <div className="relative w-full max-w-[400px] h-[560px] p-[1.5px] rounded-[24px] bg-gradient-to-br from-[#3b82ff] via-[#8b5cf6] to-[#ec4899] z-10 mx-auto">
        <div className="relative w-full h-full transition-transform duration-700" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>

          <form onSubmit={handleLogin} className="absolute inset-0 w-full h-full bg-[#0f0f0f] rounded-[22px] px-7 pt-7 pb-7 flex flex-col" style={{ backfaceVisibility: 'hidden' }}>
            <h2 className="text-white text-[24px] font-semibold">Welcome back</h2>
            <p className="text-[#888] text-[13px] mt-1 mb-6">Log in to manage your links</p>

            <div className="flex flex-col h-full">
              <div className="space-y-4">
                <div>
                  <label className="text-white text-[13px]">Email</label>
                  <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="snapurl@gmail.com" autoComplete="off" className="w-full mt-1.5 bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] outline-none focus:border-violet-500" style={{ fontFamily: 'Segoe UI, Arial, sans-serif', letterSpacing: '0px', textTransform: 'none' }} />
                </div>
                <div>
                  <label className="text-white text-[13px]">Password</label>
                  <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" autoComplete="off" className="w-full mt-1.5 bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] outline-none focus:border-violet-500" style={{ fontFamily: 'Segoe UI, Arial, sans-serif', letterSpacing: '0px', textTransform: 'none' }} />
                  <div className="text-right mt-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82ff] to-[#ec4899] text-[12px] cursor-pointer font-semibold">Forgot password?</span>
                  </div>
                </div>
              </div>

              {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

              <div className="mt-6">
                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#3b82ff] via-[#8b5cf6] to-[#ec4899] text-white font-medium py-3.5 rounded-xl text-[14px] disabled:opacity-60">
                  {loading ? 'Logging in...' : 'Log in'}
                </button>

                <div className="flex items-center gap-3 my-4">
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                  <span className="text-[#666] text-[12px]">or continue with</span>
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                </div>

                <button type="button" className="w-full bg-[#1c1c1f] border border-white/10 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-[14px] hover:bg-[#222]">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" /> Google
                </button>
              </div>

              <div className="flex-1"></div>
            </div>
          </form>

          <form onSubmit={handleSignup} className="absolute inset-0 w-full h-full bg-[#0f0f0f] rounded-[22px] p-7 flex flex-col" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <h2 className="text-white text-[24px] font-semibold">Create your account</h2>
            <p className="text-[#888] text-[13px] mt-1 mb-5">Start shortening links in seconds</p>

            <div className="flex flex-col h-full">
              <div className="space-y-3.5">
                <div>
                  <label className="text-white text-[13px]">Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} className="w-full mt-1.5 bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] outline-none" style={{ fontFamily: 'Segoe UI, Arial, sans-serif', letterSpacing: '0px', textTransform: 'none' }} />
                </div>
                <div>
                  <label className="text-white text-[13px]">Email</label>
                  <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full mt-1.5 bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] outline-none" style={{ fontFamily: 'Segoe UI, Arial, sans-serif', letterSpacing: '0px', textTransform: 'none' }} />
                </div>
                <div>
                  <label className="text-white text-[13px]">Password</label>
                  <input name="password" value={formData.password} onChange={handleChange} type="password" className="w-full mt-1.5 bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] outline-none" style={{ fontFamily: 'Segoe UI, Arial, sans-serif', letterSpacing: '0px', textTransform: 'none' }} />
                </div>
              </div>

              {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

              <div className="mt-auto">
                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#3b82ff] via-[#8b5cf6] to-[#ec4899] text-white font-medium py-3.5 rounded-xl text-[14px] mt-4 disabled:opacity-60">
                  {loading ? 'Creating account...' : 'Create account'}
                </button>

                <div className="flex items-center gap-3 my-4">
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                  <span className="text-[#666] text-[12px]">or continue with</span>
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                </div>

                <button type="button" className="w-full bg-[#1c1c1f] border border-white/10 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-[14px] hover:bg-[#222]">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" /> Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}