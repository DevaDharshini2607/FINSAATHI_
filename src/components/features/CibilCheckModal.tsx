import React, { useState } from 'react';
import { Smartphone, RotateCcw } from 'lucide-react';
import FeatureModal from './FeatureModal';
import { clsx } from 'clsx';

interface CibilCheckModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CibilCheckModal: React.FC<CibilCheckModalProps> = ({ isOpen, onClose }) => {
    const [score, setScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const checkScore = () => {
        setLoading(true);
        setScore(null);

        // Simulate API delay
        setTimeout(() => {
            // Random score between 600 and 850
            const randomScore = Math.floor(Math.random() * (850 - 600 + 1)) + 600;
            setScore(randomScore);
            setLoading(false);
        }, 1500);
    };

    const getRating = (s: number) => {
        if (s >= 750) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' };
        if (s >= 700) return { label: 'Good', color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' };
        if (s >= 650) return { label: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' };
        return { label: 'Poor', color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' };
    };

    return (
        <FeatureModal
            isOpen={isOpen}
            onClose={onClose}
            title="CIBIL Score Check"
            icon={Smartphone}
            color="bg-purple-500"
        >
            <div className="space-y-6 text-center">

                {!score && !loading && (
                    <div className="py-8">
                        <p className="text-gray-600 mb-6">Check your credit score instantly without any paperwork.</p>
                        <button
                            onClick={checkScore}
                            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold shadow-lg shadow-purple-200 active:scale-95 transition-all text-lg"
                        >
                            Check My Score
                        </button>
                    </div>
                )}

                {loading && (
                    <div className="py-10 flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                        <p className="text-gray-500 font-medium animate-pulse">Analyzing credit history...</p>
                    </div>
                )}

                {score && (
                    <div className="animate-in zoom-in-50 duration-300">
                        <div className="relative inline-flex items-center justify-center">
                            {/* Gauge Background */}
                            <div className="w-48 h-24 overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-gray-100"></div>
                                <div
                                    className={clsx("absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-l-transparent border-b-transparent transition-all duration-1000 ease-out", getRating(score).color.replace('text', 'border'))}
                                    style={{ transform: `rotate(${((score - 300) / 600) * 180 - 45}deg)` }} // Rough approximations for visual gauge
                                ></div>
                            </div>
                        </div>

                        <div className={clsx("mt-4 p-4 rounded-2xl border", getRating(score).bg, getRating(score).border)}>
                            <div className="text-5xl font-black mb-1 text-gray-800">{score}</div>
                            <div className={clsx("text-xl font-bold uppercase tracking-widest", getRating(score).color)}>
                                {getRating(score).label}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={checkScore}
                                className="flex items-center space-x-2 text-sm text-gray-500 hover:text-purple-600 transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span>Check Again</span>
                            </button>
                        </div>
                    </div>
                )}

                <div className="text-xs text-gray-400 mt-4 border-t pt-4">
                    * This is a simulated score for demonstration purposes only.
                </div>
            </div>
        </FeatureModal>
    );
};

export default CibilCheckModal;
