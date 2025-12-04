import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Omkrishnapuram CHS
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                            A peaceful community working towards a modern future through redevelopment.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/redevelopment" className="text-slate-400 hover:text-white transition-colors">
                                    Redevelopment Project
                                </Link>
                            </li>
                            <li>
                                <Link to="/committee" className="text-slate-400 hover:text-white transition-colors">
                                    Committee Members
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin" className="text-slate-400 hover:text-white transition-colors">
                                    Admin Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-slate-400">
                                <MapPin size={18} className="mt-1 flex-shrink-0" />
                                <span>123 Society Road, Mumbai, 400001</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Phone size={18} className="flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Mail size={18} className="flex-shrink-0" />
                                <span>contact@omkrishnapuram.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-700 text-center text-slate-400">
                    <p>&copy; {new Date().getFullYear()} Omkrishnapuram Co-op Housing Society Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
