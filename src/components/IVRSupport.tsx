import React, { useEffect, useRef, useState } from 'react';
import { PhoneCall, Headphones } from 'lucide-react';

const IVRSupport: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full py-12 px-4 flex justify-center items-center"
        >
            <div
                className={`
                    w-full max-w-4xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/50 
                    border border-purple-100 dark:border-slate-700
                    rounded-3xl shadow-xl shadow-purple-500/5 p-8 md:p-12 text-center 
                    transform transition-all duration-1000 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                `}
            >
                <div className="flex justify-center mb-6">
                    <div className="bg-white dark:bg-slate-700 p-4 rounded-full shadow-md animate-bounce-slow">
                        <Headphones className="w-10 h-10 text-brand-blue" />
                    </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 mb-6 drop-shadow-sm">
                    IVR Financial Voice Support
                </h2>

                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                    Call our financial awareness helpline to learn about savings, government schemes, loans, and fraud protection.
                    Works on both smartphones and keypad phones. Available in multiple languages.
                </p>

                <div className="flex justify-center">
                    <a
                        href="tel:1800-123-4567"
                        className="
                            group flex items-center space-x-3 
                            bg-brand-blue hover:bg-indigo-600 text-white 
                            px-8 py-4 rounded-full font-bold text-lg 
                            shadow-lg shadow-blue-500/30 hover:shadow-indigo-500/40
                            transition-all duration-300 transform hover:scale-105
                        "
                    >
                        <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span>Call Now</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default IVRSupport;
