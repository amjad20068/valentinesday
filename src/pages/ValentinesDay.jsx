import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import valentinesDayImg from '../assets/images/valentines-day.png';
import Confetti from 'canvas-confetti';

const ValentinesDay = () => {
    const { user } = useUser();
    const [celebrating, setCelebrating] = useState(false);

    const handleCelebrate = () => {
        setCelebrating(true);
        // Fire confetti
        const end = Date.now() + 3 * 1000;
        const colors = ['#ff0000', '#ffffff', '#ff69b4'];

        (function frame() {
            Confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            Confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 bg-gradient-to-b from-red-50 to-pink-100 overflow-hidden relative">
            <Link to="/" className="absolute top-6 left-6 z-20">
                <Button variant="ghost" className="gap-2 flex items-center bg-white/50 backdrop-blur-sm">
                    <ChevronLeft size={20} /> Back
                </Button>
            </Link>

            {/* Glowing Heart Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-[20rem] text-red-500 blur-3xl"
                >
                    ❤️
                </motion.div>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col items-center z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-5xl md:text-7xl font-handwriting text-red-600 mb-4 drop-shadow-md">
                        Happy Valentine's Day!
                    </h1>
                    <p className="text-2xl text-red-500 font-medium">
                        {user.partnerName ? `To my one and only, ${user.partnerName}.` : "Celebrating Love, Today and Always."}
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-12 items-center w-full justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-md w-full"
                    >
                        <Card className="p-3 bg-white/80 rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                            <img
                                src={valentinesDayImg}
                                alt="Valentine's Day"
                                className="w-full h-auto rounded-xl shadow-sm"
                            />
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-md text-center md:text-left flex flex-col items-center md:items-start"
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            You are my everything.
                        </h2>
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            "Every moment we've spent leading up to this day has been magical. You are the reason my world is so colorful. I love you more than words can describe."
                        </p>

                        {!celebrating ? (
                            <Button
                                onClick={handleCelebrate}
                                className="bg-red-500 hover:bg-red-600 text-white px-12 py-4 text-xl rounded-full shadow-xl animate-bounce"
                            >
                                Celebrate Our Love! 🎆
                            </Button>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/80 p-6 rounded-2xl shadow-lg border-2 border-red-200"
                            >
                                <p className="text-xl text-red-600 font-handwriting font-bold">
                                    I Love You Forever! ❤️
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ValentinesDay;
