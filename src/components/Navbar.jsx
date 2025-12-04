import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Building, Users, Lock, LogOut } from 'lucide-react';

const Navbar = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/redevelopment', label: 'Redevelopment', icon: Building },
        { path: '/committee', label: 'Committee', icon: Users },
        { path: '/admin', label: 'Admin', icon: Lock },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200 h-16' 
            : 'bg-transparent h-20'
            }`}>
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <Link to="/" className={`font-bold transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl'}`}>
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-cyan-500 transition-all duration-300">
                        Omkrishnapuram
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative font-medium transition-colors ${location.pathname === link.path ? 'text-blue-600' : scrolled ? 'text-slate-700 hover:text-blue-600' : 'text-white hover:text-cyan-300'
                                } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-cyan-600 after:transition-all after:duration-300 ${location.pathname === link.path ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {onLogout && (
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <LogOut size={20} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="absolute top-20 left-0 right-0 bg-white shadow-lg border-b border-slate-200 md:hidden">
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname === link.path
                                                ? 'bg-slate-100 text-secondary'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                            {onLogout && (
                                <button
                                    onClick={() => {
                                        onLogout();
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors bg-red-50 text-red-600 hover:bg-red-100 mt-2"
                                >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
