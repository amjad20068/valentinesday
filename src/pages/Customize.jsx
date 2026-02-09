import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { Copy, Check, Heart, Sparkles, Wand2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import Card from '../components/ui/Card';
import kissingCats from '../assets/images/kissing-cats.png';

const Customize = () => {
    const { updateUser, user } = useUser();
    const [name, setName] = useState('');
    const [partnerName, setPartnerName] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [messageType, setMessageType] = useState('question'); // 'question', 'yes', 'no'

    // Pre-fill if replying
    React.useEffect(() => {
        if (user?.to && user?.from) {
            setName(user.to); // Receiver becomes Sender
            setPartnerName(user.from); // Sender becomes Receiver
            setMessageType('yes'); // Default to Yes reply
        }
    }, [user]);

    const generateLink = () => {
        if (!partnerName) return;

        // Create URL with query params
        const baseUrl = window.location.origin;
        const params = new URLSearchParams();
        params.append('from', name);
        params.append('to', partnerName);

        if (messageType === 'yes' || messageType === 'no') {
            params.append('answer', messageType);
        }

        // Fix: Ensure backticks are correctly used and string interpolation is valid
        const link = `${baseUrl}/?${params.toString()}`;
        setGeneratedLink(link);
        updateUser(partnerName, name, messageType === 'question' ? null : messageType); // Update context for preview
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setShowSuccess(true);
        setTimeout(() => {
            setCopied(false);
            setShowSuccess(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen flex overflow-hidden bg-valentine-gradient">
            {/* Success Overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                        onClick={() => setShowSuccess(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full mx-auto relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                                className="absolute top-4 right-4 text-2xl"
                            >
                                ✨
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
                                className="absolute top-10 left-6 text-2xl"
                            >
                                💖
                            </motion.div>

                            <img
                                src={kissingCats}
                                alt="Kissing Cats"
                                className="w-48 h-48 mx-auto mb-4 object-contain"
                            />

                            <h2 className="text-3xl font-bold text-hotpink mb-2 font-handwriting">Yay! 💖</h2>
                            <p className="text-gray-600 font-medium">Link Copied Successfully!</p>
                            <p className="text-sm text-gray-500 mt-2">Share it with your valentine!</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Left Panel - Form */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-[480px] bg-white/90 backdrop-blur-xl border-r border-white/50 shadow-2xl z-10 flex flex-col justify-center p-8 md:p-12 relative overflow-y-auto"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Heart size={200} />
                </div>

                <div className="max-w-xs mx-auto w-full relative z-10">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-peach-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow shadow-lg shadow-peach-200/50">
                            <span className="text-4xl filter drop-shadow-sm">
                                💌
                            </span>
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
                                className="w-full px-5 py-3 rounded-xl border-2 border-peach-200 focus:outline-none focus:border-hotpink focus:ring-4 focus:ring-peach-200/50 bg-white transition-all font-medium text-gray-700 placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Valentine's Name:</label>
                            <input
                                type="text"
                                value={partnerName}
                                onChange={(e) => setPartnerName(e.target.value)}
                                placeholder="e.g. Juliet"
                                className="w-full px-5 py-3 rounded-xl border-2 border-peach-200 focus:outline-none focus:border-hotpink focus:ring-4 focus:ring-peach-200/50 bg-white transition-all font-medium text-gray-700 placeholder-gray-400"
                            />
                        </div>

                        <Button
                            onClick={generateLink}
                            disabled={!partnerName}
                            className="w-full py-4 flex items-center justify-center gap-2 bg-hotpink hover:bg-rose-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all rounded-2xl active:scale-95"
                        >
                            <Sparkles size={20} /> Generate Link
                        </Button>

                        {generatedLink && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                className="bg-peach-50 border-2 border-peach-200 rounded-2xl p-5 mt-6 relative overflow-hidden shadow-inner"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-20 text-4xl transform rotate-12">🎉</div>
                                <p className="text-hotpink mb-3 font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                                    Your Link is Ready!
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={copyToClipboard}
                                        className="w-full py-3 bg-hotpink text-white rounded-xl font-bold hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95"
                                    >
                                        {copied ? <Check size={18} /> : <Copy size={18} />}
                                        {copied ? 'Copied!' : 'Copy Link'}
                                    </button>

                                    <button
                                        onClick={() => {
                                            setGeneratedLink('');
                                            setName('');
                                            setPartnerName('');
                                            setMessageType('question');
                                        }}
                                        className="w-full py-3 bg-white text-hotpink border-2 border-hotpink rounded-xl font-bold hover:bg-hotpink hover:text-white transition-colors active:scale-95 text-sm"
                                    >
                                        Create Another Link
                                    </button>
                                </div>

                                <div className="mt-4 p-3 bg-white rounded-xl border border-peach-100 text-xs text-gray-500 break-all font-mono select-all">
                                    {generatedLink}
                                </div>
                            </motion.div>
                        )}

                        <div className="mt-8 text-center text-sm text-gray-400">
                            Created by <a href="#" className="font-bold text-hotpink hover:underline">Amjad</a>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right Panel - Visuals */}
            <div className="hidden md:flex flex-1 relative items-center justify-center overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute text-[30rem] opacity-20 blur-sm select-none"
                    style={{ filter: 'drop-shadow(0 0 50px rgba(255, 105, 180, 0.5))' }}
                >
                    💖
                </motion.div>

                {/* Floating Elements */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-6xl opacity-40 select-none"
                        initial={{
                            x: Math.random() * window.innerWidth / 2,
                            y: Math.random() * window.innerHeight
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            x: [null, Math.random() * 50 - 25],
                            opacity: [0.4, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    >
                        {['❤️', '✨', '💐', '💌', '💕'][i % 5]}
                    </motion.div>
                ))}


            </div>
        </div>
    );
};

export default Customize;
