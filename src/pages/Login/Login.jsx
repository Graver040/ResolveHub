import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";
import api from "../../services/api";
import logoImg from "../../assets/images/logo.png";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            if (res.data.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (res.data.role === 'officer') {
                navigate('/officer/complaints');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Glows */}
            <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-[440px] bg-[#0f1115]/80 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl relative z-10" style={{ padding: '40px' }}>
                
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 cursor-pointer" onClick={() => navigate('/')} style={{ marginBottom: '32px' }}>
                    <img src={logoImg} alt="ResolveHub Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                    <span className="text-2xl font-black text-white tracking-tight">ResolveHub</span>
                </div>

                {/* Headings */}
                <div className="text-center" style={{ marginBottom: '40px' }}>
                    <h2 className="text-3xl font-black text-white" style={{ marginBottom: '8px' }}>Welcome Back</h2>
                    <p className="text-white/40 text-sm font-medium">Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col" style={{ gap: '24px' }}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-bold text-center" style={{ padding: '16px' }}>
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div className="flex flex-col" style={{ gap: '8px' }}>
                        <label className="block text-sm font-bold text-white/70">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-pink-500 transition-colors" />
                            <input 
                                type="email" 
                                required
                                className="w-full bg-white/5 border border-white/10 focus:border-pink-500/50 rounded-xl text-white outline-none transition-all placeholder:text-white/20 font-medium" 
                                style={{ padding: '16px', paddingLeft: '48px', paddingRight: '16px' }}
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col" style={{ gap: '8px' }}>
                        <label className="block text-sm font-bold text-white/70">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-pink-500 transition-colors" />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                required
                                className="w-full bg-white/5 border border-white/10 focus:border-pink-500/50 rounded-xl text-white outline-none transition-all placeholder:text-white/20 font-medium" 
                                style={{ padding: '16px', paddingLeft: '48px', paddingRight: '48px' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${rememberMe ? 'bg-pink-500 border-pink-500' : 'border-white/20 bg-transparent'}`}>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                {rememberMe && (
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-white/50 text-sm font-medium group-hover:text-white/80 transition-colors">Remember me</span>
                        </label>
                        <button type="button" className="text-pink-500 text-sm font-bold hover:text-pink-400 transition-colors">Forgot password?</button>
                    </div>

                    {/* Submit */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                        style={{ padding: '16px 0', marginTop: '16px' }}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Sign In <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center" style={{ marginTop: '32px' }}>
                    <p className="text-white/40 text-sm font-medium">
                        Don't have an account? 
                        <button 
                            onClick={() => navigate('/register')}
                            className="ml-2 text-pink-500 font-bold hover:text-pink-400 transition-colors"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
                
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center justify-center gap-2 text-white/30 hover:text-white transition-colors text-sm font-semibold group mx-auto"
                    style={{ marginTop: '32px' }}
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to home
                </button>
            </div>
        </div>
    );
};

export default Login;