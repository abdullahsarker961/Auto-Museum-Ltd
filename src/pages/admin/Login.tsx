import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate('/admin/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-pure-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-red opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary-red opacity-5 blur-[100px] rounded-full"></div>
        <div className="grain-overlay opacity-30"></div>
      </div>

      <div className="w-full max-w-[440px] relative z-10">
        <div className="bg-[#111] border border-[#222] p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-[60px] h-[2px] bg-primary-red mb-6"></div>
            <h1 className="font-display text-[32px] text-white tracking-[2px] uppercase">Admin Login</h1>
            <p className="font-body text-[12px] text-muted-text mt-2 uppercase tracking-[1px]">Auto Museum Ltd Management</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-body text-[10px] text-[rgba(255,255,255,0.5)] uppercase tracking-[2px]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.3)]" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#181818] border border-[#333] py-4 pl-12 pr-4 text-white font-body text-[14px] outline-none focus:border-primary-red transition-colors"
                  placeholder="admin@automuseum.com"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-body text-[10px] text-[rgba(255,255,255,0.5)] uppercase tracking-[2px]">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.3)]" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#181818] border border-[#333] py-4 pl-12 pr-4 text-white font-body text-[14px] outline-none focus:border-primary-red transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-[rgba(200,16,46,0.1)] border border-[rgba(200,16,46,0.3)] p-4 text-primary-red text-[13px] font-body text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-primary-red hover:bg-deep-red transition-all py-4 font-body font-bold text-[12px] text-white uppercase tracking-[2px] flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center font-body text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-[1px]">
          Secure Access Portal &copy; {new Date().getFullYear()} Auto Museum Ltd.
        </p>
      </div>
    </div>
  );
}
