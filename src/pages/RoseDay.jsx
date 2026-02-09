import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import roseDayImg from '../assets/images/rose-day.png';

const RoseDay = () => {
    const { user } = useUser();
    const [showRose, setShowRose] = useState(false);

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 bg-gradient-to-b from-rose-100 to-rose-200 overflow-hidden relative">
            <Link to="/" className="absolute top-6 left-6 z-20">
                <Button variant="ghost" className="gap-2 flex items-center bg-white/50 backdrop-blur-sm">
                    <ChevronLeft size={20} /> Back
                </Button>
            </Link>

            {/* Floating Petals Background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl text-rose-500/30"
                        initial={{
                            top: -20,
                            left: `${Math.random() * 100}%`,
                            rotate: 0
                        }}
                        animate={{
                            top: '100%',
                            rotate: 360,
                            x: Math.random() * 50 - 25
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    >
                        🌹
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-handwriting text-rose-600 mb-6">
                        Happy Rose Day, {user.partnerName || 'Love'}!
                    </h1>
                    <p className="text-xl text-gray-700 font-medium mb-8">
                        A rose isn't just a flower, it's a symbol of my love for you. Pure, beautiful, and forever blooming.
                    </p>

                    <Button
                        onClick={() => setShowRose(true)}
                        className="text-lg px-8 py-3 shadow-xl bg-rose-500 hover:bg-rose-600 text-white"
                    >
                        Accept My Rose 🌹
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <Card className="p-2 bg-white/60 rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img
                            src={roseDayImg}
                            alt="Rose Day"
                            className="w-full h-auto rounded-xl shadow-inner"
                        />
                        {/* Overlay Animation for Giving Rose */}
                        {showRose && (
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl z-20 drop-shadow-2xl"
                                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            >
                                🌹
                            </motion.div>
                        )}
                    </Card>
                </motion.div>
            </div>

            {showRose && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-10 left-0 right-0 text-center"
                >
                    <p className="text-2xl font-handwriting text-rose-700">
                        "You are the most beautiful rose in the garden of my life."
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default RoseDay;
