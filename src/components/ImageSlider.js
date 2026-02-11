import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, TrendingUp, HandCoins, Headset, Users } from 'lucide-react';
const slides = [
    {
        id: 1,
        title: "Bank-Grade Security",
        desc: "\"Your piece of mind is priceless. We use advanced encryption to safeguard your financial future, 24/7.\"",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1920&q=80",
        icon: ShieldCheck,
        color: "text-emerald-400"
    },
    {
        id: 2,
        title: "Smart Compounding",
        desc: "\"Compound interest is the eighth wonder of the world. Let our AI help you harness it effectively.\"",
        image: "https://img.freepik.com/premium-photo/illuminating-ideas-open-book-sparking-innovation-learning_1249787-37645.jpg",
        icon: TrendingUp,
        color: "text-blue-400"
    },
    {
        id: 3,
        title: "Total Transparency",
        desc: "\"Trust is built on honesty. Transparency is the best way to ensure trust ,fairness and financial well-being for all.\"",
        image: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
        icon: HandCoins,
        color: "text-yellow-400"
    },
    {
        id: 4,
        title: "24/7 Expert Support",
        desc: "\"Questions don't follow office hours. Our AI support is always awake to assist you with any query.\"",
        image: "https://www.uptek.com.tr/en/gallery/7-24_hizmet_ic.jpg",
        icon: Headset,
        color: "text-purple-400"
    },
    {
        id: 5,
        title: "Community Driven",
        desc: "\"Join a community of millions moving towards financial literacy and independence together.\"",
        image: "https://img.freepik.com/premium-photo/financial-literacy-books-coins-represent-knowledge-wealth-accumulation_892776-37093.jpg",
        icon: Users,
        color: "text-pink-400"
    },
];
const ImageSlider = () => {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    useEffect(() => {
        let timer;
        if (isAutoPlaying) {
            timer = setInterval(() => {
                setCurrent((prev) => (prev + 1) % slides.length);
            }, 6000);
        }
        return () => clearInterval(timer);
    }, [isAutoPlaying]);
    const prevSlide = () => {
        setIsAutoPlaying(false);
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };
    const nextSlide = () => {
        setIsAutoPlaying(false);
        setCurrent((current + 1) % slides.length);
    };
    return (_jsxs("div", { className: "relative w-full h-[400px] md:h-[500px] overflow-hidden group bg-gray-900", children: [slides.map((slide, index) => (_jsxs("div", { className: `absolute inset-0 transition-all duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`, children: [_jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [_jsx("img", { src: slide.image, alt: slide.title, className: `w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${index === current ? 'scale-110' : 'scale-100'}` }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent" })] }), _jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full", children: _jsxs("div", { className: `max-w-2xl transform transition-all duration-1000 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`, children: [_jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [_jsx(slide.icon, { className: `w-8 h-8 ${slide.color}` }), _jsx("span", { className: `text-sm font-bold tracking-wider uppercase ${slide.color}`, children: "Featured Capability" })] }), _jsx("h2", { className: "text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight", children: slide.title }), _jsx("p", { className: "text-lg md:text-xl text-gray-200 leading-relaxed border-l-4 border-brand-blue pl-6 bg-black/20 backdrop-blur-sm py-4 rounded-r-lg", children: slide.desc }), _jsx("a", { href: "#features", className: "inline-block mt-8 px-8 py-3 bg-white text-brand-dark font-semibold rounded-lg hover:bg-brand-light-blue transition-colors duration-300 shadow-lg", children: "Explore Feature" })] }) }) })] }, slide.id))), _jsx("button", { onClick: prevSlide, className: "absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0", children: _jsx(ChevronLeft, { className: "w-6 h-6" }) }), _jsx("button", { onClick: nextSlide, className: "absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0", children: _jsx(ChevronRight, { className: "w-6 h-6" }) }), _jsx("div", { className: "absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3", children: slides.map((_, idx) => (_jsx("button", { onClick: () => {
                        setIsAutoPlaying(false);
                        setCurrent(idx);
                    }, className: `transition-all duration-300 rounded-full h-1.5 ${idx === current ? 'w-12 bg-brand-blue' : 'w-6 bg-white/40 hover:bg-white/60'}`, "aria-label": `Go to slide ${idx + 1}` }, idx))) })] }));
};
export default ImageSlider;
