import React from 'react';
import { X, PhoneCall } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TollFreeModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <PhoneCall className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                    {t('tollfree_modal.title')}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                    {t('tollfree_modal.desc')}
                </p>

                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl px-6 py-4 border border-gray-200 dark:border-gray-700 w-full text-center">
                    <p className="text-sm text-gray-500 uppercase font-semibold mb-1">{t('tollfree_modal.call_us')}</p>
                    <p className="text-2xl font-mono font-bold text-brand-blue tracking-wider">
                        xxxxx xxxxx
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-brand-blue text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    {t('tollfree_modal.close')}
                </button>
            </div>
        </div>
    );
};

export default TollFreeModal;
