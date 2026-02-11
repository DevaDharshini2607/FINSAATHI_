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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-light-blue/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 flex flex-col font-sans text-text-main dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <ImageSlider />

            <main className="flex-grow">
                <Hero onOpenChat={openChat} />
                <Tutorials />
                <IVRSupport />
                <FAQ />
            </main>

            <Footer />
            <Chatbot isOpen={isChatOpen} onToggle={toggleChat} position="right" />
        </div>
    );
};

export default Home;
