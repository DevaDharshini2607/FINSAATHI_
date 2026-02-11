import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react';
import FeatureModal from './FeatureModal';

interface ScamCheckModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ScamCheckModal: React.FC<ScamCheckModalProps> = ({ isOpen, onClose }) => {
    const [message, setMessage] = useState('');
    const [result, setResult] = useState<'safe' | 'scam' | null>(null);

    const checkScam = () => {
        if (!message.trim()) return;

        const scamKeywords = ["lottery", "winner", "free money", "otp", "urgent", "bank link", "click here", "prize", "account blocked"];
        const lowerMsg = message.toLowerCase();

        const isScam = scamKeywords.some(keyword => lowerMsg.includes(keyword));
        setResult(isScam ? 'scam' : 'safe');
    };

    const reset = () => {
        setMessage('');
        setResult(null);
    };

    return (
        <FeatureModal
            isOpen={isOpen}
            onClose={onClose}
            title="Scam Detector"
            icon={ShieldAlert}
            color="bg-red-500"
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Check Message Safety</label>
                    <textarea
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            if (result) setResult(null); // Reset result on edit
                        }}
                        placeholder="Paste the suspicious message here (e.g. You won a lottery, click this link...)"
                        className="w-full h-32 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none resize-none text-sm transition-all"
                    />
                </div>

                {!result && (
                    <button
                        onClick={checkScam}
                        disabled={!message.trim()}
                        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-md active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Analyze Message
                    </button>
                )}

                {result === 'scam' && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-2">
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-red-700">⚠️ Possible Scam!</h4>
                        <p className="text-sm text-red-600 mt-1">This message contains keywords often used in financial fraud.</p>
                        <button onClick={reset} className="mt-4 text-sm font-semibold text-red-600 underline">Check another</button>
                    </div>
                )}

                {result === 'safe' && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-2">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-emerald-700">Likely Safe</h4>
                        <p className="text-sm text-emerald-600 mt-1">No common scam triggers were found, but always stay vigilant.</p>
                        <button onClick={reset} className="mt-4 text-sm font-semibold text-emerald-600 underline">Check another</button>
                    </div>
                )}
            </div>
        </FeatureModal>
    );
};

export default ScamCheckModal;
