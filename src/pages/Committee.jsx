import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Committee = () => {
    const gridRef = useRef(null);

    const managing = [
        { name: 'Mrs. Ragini Singh', role: 'Chairperson' },
        { name: 'Mr. Sunil Parikh', role: 'Secretary' },
        { name: 'Mr. Nitin Pawar', role: 'Treasurer' },
        { name: 'Mr. Bapu Wagh', role: 'Committee Member' },
        { name: 'Mr. Manoj Mehta', role: 'Committee Member' },
        { name: 'Mr. Kishan Rawal', role: 'Committee Member' },
        { name: 'Mr. Rakesh Saini', role: 'Committee Member' },
        { name: 'Mr. Kishor', role: 'Committee Member' },
        { name: 'Mr. Vishwanath Malji', role: 'Committee Member' },
        { name: 'Mr. Ankush Harankal', role: 'Committee Member' }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (gridRef.current) {
                gsap.from(gridRef.current.querySelectorAll('.committee-card'), {
                    y: 30,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power3.out'
                });
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Managing Committee
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Meet the dedicated team working tirelessly to ensure the well-being and progress of our society.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Managing Committee Members */}
                    <section className="w-full px-2">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Managing Committee</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
                            {managing.map((member, idx) => (
                                <div key={`man-${idx}`} className="committee-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 p-6 text-center relative z-10 min-h-[220px]">
                                    <div>
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white mx-auto flex items-center justify-center text-xl font-semibold mb-4">
                                            {member.name.split(' ').slice(0,2).map(n=>n[0]).join('')}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-2">{member.name}</h3>
                                        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium rounded-full mb-4">
                                            {member.role}
                                        </span>
                                        <p className="text-slate-600 leading-relaxed min-h-[3rem]">&nbsp;</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Committee;
