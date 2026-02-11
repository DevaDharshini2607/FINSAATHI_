import React, { useState, useEffect } from 'react';
import { Bot, ShieldAlert, PiggyBank, Landmark, Smartphone, Calculator, ArrowRight, PhoneCall } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation, Trans } from 'react-i18next';
import ScamCheckModal from './features/ScamCheckModal';
import BudgetPlannerModal from './features/BudgetPlannerModal';
import EMICalculatorModal from './features/EMICalculatorModal';
import LoanCalculatorModal from './features/LoanCalculatorModal';
import CibilCheckModal from './features/CibilCheckModal';
import TollFreeModal from './features/TollFreeModal';

interface HeroProps {
    onOpenChat?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
    const [activeFeature, setActiveFeature] = useState<string | null>(null);
    const { t } = useTranslation();

    const features = [
        { id: 'scam', name: t('features.scam'), icon: ShieldAlert, color: 'bg-red-500', href: '#scam' },
        { id: 'budget', name: t('features.budget'), icon: PiggyBank, color: 'bg-emerald-500', href: '#budget' },
        { id: 'loan', name: t('features.loan'), icon: Landmark, color: 'bg-orange-500', href: '#loan' },
        { id: 'cibil', name: t('features.cibil'), icon: Smartphone, color: 'bg-purple-500', href: '#cibil' },
        { id: 'emi', name: t('features.emi'), icon: Calculator, color: 'bg-blue-500', href: '#emi' },
        { id: 'call', name: t('features.tollfree'), icon: PhoneCall, color: 'bg-green-500', href: '#call' },
    ];

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            const validIds = features.map(f => f.id);
            if (validIds.includes(hash)) {
                setActiveFeature(hash);
            } else {
                setActiveFeature(null);
            }
        };

        // Check on mount
        handleHashChange();

        // Listen for changes
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [features]);

    const handleClose = () => {
        setActiveFeature(null);
        // Remove hash without jumping
        history.pushState("", document.title, window.location.pathname + window.location.search);
    };

    return (
        <section id="features" className="relative w-full overflow-hidden bg-transparent py-12 lg:py-20 flex flex-col items-center justify-center min-h-[600px]">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-light-blue rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mb-12">
                <h1 className="text-4xl md:text-6xl font-extrabold text-text-main dark:text-white tracking-tight mb-4">
                    <Trans i18nKey="hero.title" components={{ 1: <span className="text-brand-blue" /> }} />
                </h1>
                <p className="text-lg md:text-xl text-text-muted dark:text-gray-300 mb-8">
                    {t('hero.subtitle')}
                </p>
            </div>

            {/* Orbital Dashboard */}
            <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
                {/* Central AI Core */}
                <div
                    onClick={onOpenChat}
                    className="absolute z-20 w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-slate-800 rounded-full shadow-[0_0_40px_rgba(0,86,210,0.3)] flex items-center justify-center animate-pulse-slow transition-colors cursor-pointer hover:scale-105 active:scale-95 duration-300"
                >
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-brand-blue rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute w-full h-full bg-gradient-to-tr from-brand-blue to-soft-green opacity-80"></div>
                        <Bot className="text-white w-12 h-12 md:w-16 md:h-16 relative z-10" />
                    </div>
                    {/* Ripples */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border border-brand-blue/30 animate-ping opacity-20"></div>
                </div>

                {/* Orbit Path (Visible on Desktop) */}
                <div className="hidden md:block absolute w-[350px] h-[350px] border border-gray-200 dark:border-gray-700 rounded-full opacity-50 transition-colors"></div>

                {/* Static Circular Items (Desktop) */}
                <div className="hidden md:block absolute w-full h-full pointer-events-none">
                    {features.map((feature, index) => {
                        // Calculate position based on index (5 items)
                        const angle = (index * (360 / features.length)) * (Math.PI / 180);
                        const radius = 175; // Half of 350px width

                        // Adjust angle to start from top (-90deg)
                        const adjustedAngle = angle - (Math.PI / 2);

                        const x = Math.cos(adjustedAngle) * radius;
                        const y = Math.sin(adjustedAngle) * radius;

                        return (
                            <div
                                key={feature.name}
                                className="absolute top-1/2 left-1/2"
                                style={{
                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                                }}
                            >
                                <a
                                    href={feature.href}
                                    className="pointer-events-auto group flex flex-col items-center justify-center w-28 h-28 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-110 hover:shadow-xl transition-all duration-300 p-2"
                                >
                                    <div className={clsx("p-3 rounded-full mb-2 text-white", feature.color)}>
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 text-center leading-tight">{feature.name}</span>
                                </a>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Stack Layout */}
                <div className="md:hidden grid grid-cols-2 gap-4 w-full px-4">
                    {features.map((feature) => (
                        <a
                            key={feature.name}
                            href={feature.href}
                            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 active:scale-95 transition-transform"
                        >
                            <div className={clsx("p-3 rounded-full mb-2 text-white", feature.color)}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">{feature.name}</span>
                        </a>
                    ))}
                </div>
            </div>

            <div className="mt-12 md:mt-16">
                <button
                    onClick={onOpenChat}
                    className="bg-brand-blue text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all flex items-center space-x-2"
                >
                    <span>{t('hero.cta')}</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* Modals */}
            <ScamCheckModal isOpen={activeFeature === 'scam'} onClose={handleClose} />
            <BudgetPlannerModal isOpen={activeFeature === 'budget'} onClose={handleClose} />
            <LoanCalculatorModal isOpen={activeFeature === 'loan'} onClose={handleClose} />
            <CibilCheckModal isOpen={activeFeature === 'cibil'} onClose={handleClose} />
            <EMICalculatorModal isOpen={activeFeature === 'emi'} onClose={handleClose} />
            <TollFreeModal isOpen={activeFeature === 'call'} onClose={handleClose} />
        </section>
    );
};

export default Hero;
