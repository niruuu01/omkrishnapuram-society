import React, { useState } from 'react';
import { Lock, LogIn } from 'lucide-react';

const MembersLogin = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Single member credential (all 60 members use the same username/password)
    const MEMBER_USERNAME = 'omkrishnapuram';
    const MEMBER_PASSWORD = 'member@2024';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API delay for security perception
        setTimeout(() => {
            if (username === MEMBER_USERNAME && password === MEMBER_PASSWORD) {
                // Store session token
                const token = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                localStorage.setItem('memberToken', token);
                localStorage.setItem('memberLoginTime', new Date().toISOString());
                
                setLoading(false);
                onLoginSuccess();
            } else {
                setError('Invalid username or password');
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Background image overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

            {/* Login Form */}
            <div className="relative z-10 w-full max-w-md px-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Member Portal</h1>
                        <p className="text-slate-300">Omkrishnapuram Society</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                            <p className="text-red-200 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-200 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-200 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Login
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-xs text-slate-300 mb-2">Demo Credentials:</p>
                        <p className="text-xs text-slate-400">Username: <span className="text-blue-300">omkrishnapuram</span></p>
                        <p className="text-xs text-slate-400">Password: <span className="text-blue-300">member@2024</span></p>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-center mt-6 text-slate-400 text-sm">
                    <p>For members only • Secure access</p>
                </div>
            </div>
        </div>
    );
};

export default MembersLogin;
