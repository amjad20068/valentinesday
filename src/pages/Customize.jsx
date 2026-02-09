import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Copy, Check, Heart, Sparkles } from 'lucide-react';
import { useUser } from '../context/UserContext';
import Card from '../components/ui/Card';

const Customize = () => {
    const { updateUser } = useUser();
    const [name, setName] = useState('');
    const [partnerName, setPartnerName] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);

    const generateLink = () => {
        if (!name || !partnerName) return;

        // Create URL with query params
        const baseUrl = window.location.origin;
        const params = new URLSearchParams();
        params.append('from', name);
        params.append('to', partnerName);

        // Fix: Ensure backticks are correctly used and string interpolation is valid
        const link = `${baseUrl}/?${params.toString()}`;
        setGeneratedLink(link);
        updateUser(partnerName, name); // Update context for preview
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 flex items-center justify-center bg-valentine-gradient">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Card className="bg-white/90 backdrop-blur-xl border-white shadow-2xl rounded-3xl">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-peach-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                            <span className="text-4xl">💝</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 font-handwriting">Valentine Link Generator</h1>
                        <p className="text-gray-500 font-medium">Create personalized Valentine's Day proposals!</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Your Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Romeo"
                                className="w-full px-5 py-3 rounded-xl border-2 border-peach-200 focus:outline-none focus:border-hotpink focus:ring-4 focus:ring-peach-200/50 bg-white transition-all font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Valentine Name:</label>
                            <input
                                type="text"
                                value={partnerName}
                                onChange={(e) => setPartnerName(e.target.value)}
                                placeholder="e.g. Juliet"
                                className="w-full px-5 py-3 rounded-xl border-2 border-peach-200 focus:outline-none focus:border-hotpink focus:ring-4 focus:ring-peach-200/50 bg-white transition-all font-medium"
                            />
                        </div>

                        <Button
                            onClick={generateLink}
                            disabled={!name || !partnerName}
                            className="w-full py-4 flex items-center justify-center gap-2 bg-hotpink hover:bg-rose-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all rounded-2xl"
                        >
                            <Sparkles size={20} /> Generate Link
                        </Button>

                        {generatedLink && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                className="bg-peach-50 border-2 border-peach-200 rounded-2xl p-5 mt-6 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-20 text-4xl">🎉</div>
                                <p className="text-hotpink mb-3 font-bold flex items-center gap-2">
                                    Your Link is Ready!
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={copyToClipboard}
                                        className="w-full py-3 bg-hotpink text-white rounded-xl font-bold hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        {copied ? <Check size={18} /> : <Copy size={18} />}
                                        {copied ? 'Copied!' : 'Copy Link'}
                                    </button>

                                    <button
                                        onClick={() => {
                                            setGeneratedLink('');
                                            setName('');
                                            setPartnerName('');
                                        }}
                                        className="w-full py-3 bg-white text-hotpink border-2 border-hotpink rounded-xl font-bold hover:bg-hotpink hover:text-white transition-colors"
                                    >
                                        Create Another Link
                                    </button>
                                </div>

                                <div className="mt-4 p-3 bg-white rounded-xl border border-peach-100 text-xs text-gray-500 break-all">
                                    {generatedLink}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default Customize;
