import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import Navbar from './Navbar';
import ImageSlider from './ImageSlider';
import Hero from './Hero';
import Tutorials from './Tutorials';
import FAQ from './FAQ';
import IVRSupport from './IVRSupport';
import Footer from './Footer';
import Chatbot from './Chatbot';
const Home = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const toggleChat = () => setIsChatOpen(!isChatOpen);
    const openChat = () => setIsChatOpen(true);
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-light-blue/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 flex flex-col font-sans text-text-main dark:text-gray-100 transition-colors duration-300", children: [_jsx(Navbar, {}), _jsx(ImageSlider, {}), _jsxs("main", { className: "flex-grow", children: [_jsx(Hero, { onOpenChat: openChat }), _jsx(Tutorials, {}), _jsx(IVRSupport, {}), _jsx(FAQ, {})] }), _jsx(Footer, {}), _jsx(Chatbot, { isOpen: isChatOpen, onToggle: toggleChat, position: "right" })] }));
};
export default Home;
