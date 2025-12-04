import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Mail, MapPin, Shield, Building2, Trees, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const backgroundRef = useRef(null);
    const titleRef = useRef(null);
    const taglineRef = useRef(null);
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    useEffect(() => {
        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // Parallax background - lightweight version
            if (backgroundRef.current) {
                gsap.to(backgroundRef.current, {
                    scrollTrigger: {
                        trigger: backgroundRef.current,
                        start: 'top top',
                        end: 'bottom center',
                        scrub: 1,
                    },
                    y: 100,
                    ease: 'none'
                });
            }

            // Hero title animation - immediate
            if (titleRef.current) {
                titleRef.current.style.opacity = '1';
                titleRef.current.style.transform = 'translateY(0)';
                gsap.from(titleRef.current, {
                    y: 40,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'power3.out'
                });
            }

            // Tagline staggered fade-in
            if (taglineRef.current) {
                const words = taglineRef.current.querySelectorAll('span');
                words.forEach(word => {
                    word.style.opacity = '1';
                    word.style.transform = 'translateY(0)';
                });
                gsap.from(words, {
                    opacity: 0,
                    y: 15,
                    duration: 0.5,
                    stagger: 0.08,
                    delay: 0.3,
                    ease: 'power2.out'
                });
            }

            // Hero buttons - fade in
            if (heroRef.current) {
                const buttons = heroRef.current.querySelectorAll('.hero-button');
                buttons.forEach(btn => {
                    btn.style.opacity = '1';
                });
                gsap.from(buttons, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.1,
                    delay: 0.6,
                    ease: 'power3.out'
                });
            }

            // Features scroll animation - lightweight
            if (featuresRef.current) {
                gsap.from(featuresRef.current.children, {
                    scrollTrigger: {
                        trigger: featuresRef.current,
                        start: 'top 85%',
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.15
                });
            }
        });

        return () => ctx.revert();
    }, []);

    const features = [
        {
            title: "Modern Infrastructure",
            desc: "State-of-the-art facilities with high-speed elevators, modern security systems, and ample parking.",
            icon: Building2,
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "Enhanced Security",
            desc: "24/7 surveillance, controlled access, and professional security personnel for complete peace of mind.",
            icon: Shield,
            gradient: "from-purple-500 to-pink-500"
        },
        {
            title: "Green Spaces",
            desc: "Beautifully landscaped gardens, children's play areas, and eco-friendly sustainable design.",
            icon: Trees,
            gradient: "from-green-500 to-emerald-500"
        }
    ];

    const testimonials = [
        {
            name: "Mrs. Rajini Sharma",
            role: "Resident",
            text: "Living in Omkrishnapuram has been a wonderful experience. The community spirit and modern amenities make it truly special.",
            rating: 5
        },
        {
            name: "Mr. Vikram Patel",
            role: "Committee Member",
            text: "The redevelopment project shows our commitment to progress. We're building not just homes, but a thriving community.",
            rating: 5
        },
        {
            name: "Ms. Anjali Singh",
            role: "Resident",
            text: "From transparent governance to excellent facilities, Omkrishnapuram sets an example for modern society living.",
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
                {/* Parallax Background */}
                <div 
                    ref={backgroundRef}
                    className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80')] bg-cover bg-center will-change-transform" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 
                        ref={titleRef}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-emerald-300 leading-tight opacity-100"
                    >
                        Omkrishnapuram
                    </h1>
                    
                    <p 
                        ref={taglineRef}
                        className="text-lg md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed opacity-100"
                    >
                        <span className="inline-block opacity-100">Embracing</span> <span className="inline-block opacity-100">the</span> <span className="inline-block opacity-100">future</span> <span className="inline-block opacity-100">with</span> <span className="inline-block opacity-100">modern</span> <span className="inline-block opacity-100">living.</span> <br />
                        <span className="inline-block opacity-100">A</span> <span className="inline-block opacity-100">community</span> <span className="inline-block opacity-100">dedicated</span> <span className="inline-block opacity-100">to</span> <span className="inline-block opacity-100">progress,</span> <span className="inline-block opacity-100">harmony,</span> <span className="inline-block opacity-100">and</span> <span className="inline-block opacity-100">sustainable</span> <span className="inline-block opacity-100">development.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/redevelopment"
                            className="hero-button group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-400/50 overflow-hidden opacity-100"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                View Redevelopment Plan
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        </Link>

                        <Link
                            to="/committee"
                            className="hero-button group px-8 py-4 border-2 border-white/30 backdrop-blur-sm hover:border-white/60 hover:bg-white/10 text-white rounded-xl font-semibold transition-all duration-300 relative overflow-hidden opacity-100"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Meet the Committee
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </Link>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2">
                            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Redevelopment */}
            <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-50 -z-10" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                            Why Redevelopment?
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Transforming our society into a modern landmark with world-class amenities.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8" ref={featuresRef}>
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden"
                                >
                                    {/* Hover background effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />

                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-125 group-hover:shadow-lg transition-all duration-300`}>
                                        <Icon size={32} className="text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                        {feature.title}
                                    </h3>

                                    <p className="text-slate-600 leading-relaxed mb-4 group-hover:text-slate-700 transition-colors duration-300">
                                        {feature.desc}
                                    </p>

                                    {/* Hover line indicator */}
                                    <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-12 transition-all duration-500" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                            What Our Community Says
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Hear from the residents who call Omkrishnapuram home.
                        </p>
                    </div>

                    {/* Testimonial Slider */}
                    <div className="max-w-3xl mx-auto">
                        <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100">
                            {/* Testimonial Content */}
                            <div className="min-h-64 flex flex-col justify-between">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {Array(testimonials[testimonialIndex].rating).fill(0).map((_, i) => (
                                        <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-xl text-slate-700 mb-8 italic">
                                    "{testimonials[testimonialIndex].text}"
                                </p>

                                {/* Author */}
                                <div>
                                    <p className="font-semibold text-slate-800 text-lg">
                                        {testimonials[testimonialIndex].name}
                                    </p>
                                    <p className="text-slate-600">
                                        {testimonials[testimonialIndex].role}
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Dots */}
                            <div className="flex gap-3 justify-center mt-8">
                                {testimonials.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setTestimonialIndex(idx)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${
                                            idx === testimonialIndex 
                                                ? 'bg-blue-600 w-8' 
                                                : 'bg-slate-300 w-2.5 hover:bg-slate-400'
                                        }`}
                                        aria-label={`Go to testimonial ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Get in Touch
                            </h2>
                            <p className="text-xl text-slate-300">
                                Have questions? We're here to help.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Contact Info */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="p-3 bg-blue-500/20 rounded-lg">
                                        <MapPin size={24} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Address</h4>
                                        <p className="text-slate-300">123 Society Road, Mumbai, 400001</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="p-3 bg-purple-500/20 rounded-lg">
                                        <Phone size={24} className="text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Phone</h4>
                                        <p className="text-slate-300">+91 98765 43210</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="p-3 bg-green-500/20 rounded-lg">
                                        <Mail size={24} className="text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Email</h4>
                                        <p className="text-slate-300">contact@omkrishnapuram.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <form className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <textarea
                                    rows="4"
                                    placeholder="Your Message"
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                />
                                <button
                                    type="submit"
                                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
