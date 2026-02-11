import React from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface FeatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    icon?: React.ElementType;
    color?: string; // Expects a detailed color string like 'bg-red-500'
}

const FeatureModal: React.FC<FeatureModalProps> = ({ isOpen, onClose, title, children, icon: Icon, color }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">

                {/* Header */}
                <div className={clsx("p-4 flex items-center justify-between text-white shadow-md", color || 'bg-brand-blue')}>
                    <div className="flex items-center space-x-3">
                        {Icon && <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md"><Icon className="w-5 h-5" /></div>}
                        <h3 className="text-xl font-bold tracking-wide">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-white/20 rounded-full transition-colors active:scale-95"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[80vh] overflow-y-auto dark:text-gray-200">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FeatureModal;
