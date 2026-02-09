import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import Confetti from 'canvas-confetti';
import teddyDayImg from '../assets/images/teddy-day.png'; // Re-using image as background or fallback

const TeddyDay = () => {
    const { user } = useUser();
    const [hugStrength, setHugStrength] = useState(0);
    const [isHugging, setIsHugging] = useState(false);
    const controls = useAnimation();
    const intervalRef = useRef(null);

    const startHug = () => {
        setIsHugging(true);
        intervalRef.current = setInterval(() => {
            setHugStrength(prev => {
                if (prev >= 100) return 100;
                return prev + 2;
            });
        }, 50);
    };

    const stopHug = () => {
        setIsHugging(false);
        clearInterval(intervalRef.current);

        if (hugStrength > 80) {
            // Big Hug Release
            Confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#E040FB', '#EA80FC', '#F8BBD0'],
                shapes: ['heart']
            });
            controls.start({
                scale: [1.2, 0.9, 1.1, 1],
                transition: { type: 'spring', duration: 0.8 }
            });
        } else {
            controls.start({
                scale: 1,
                transition: { type: 'spring', duration: 0.5 }
            });
        }
        setHugStrength(0);
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 bg-gradient-to-b from-purple-100 to-pink-100 overflow-hidden relative select-none">
            <Link to="/" className="absolute top-6 left-6 z-20">
                <Button variant="ghost" className="gap-2 flex items-center bg-white/50 backdrop-blur-sm shadow-sm">
                    <ChevronLeft size={20} /> Back
                </Button>
            </Link>

            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-5xl md:text-7xl font-handwriting text-purple-600 mb-4 drop-shadow-md">
                        Happy Teddy Day!
                    </h1>
                    <p className="text-xl text-purple-700 font-medium">
                        {user.partnerName ? `Sending a bear-y big hug to ${user.partnerName}!` : "A fluffy hug just for you!"}
                    </p>
                </motion.div>

                <div className="relative w-full max-w-sm aspect-square flex items-center justify-center mb-12">
                    {/* Hug Power Aura */}
                    <motion.div
                        className="absolute rounded-full bg-purple-400/30 blur-2xl"
                        animate={{
                            width: `${250 + hugStrength * 3}px`,
                            height: `${250 + hugStrength * 3}px`,
                            opacity: isHugging ? 0.6 : 0.2
                        }}
                    />

                    {/* The Teddy Being Hugged */}
                    <motion.div
                        className="text-[10rem] md:text-[15rem] relative z-10 cursor-grab active:cursor-grabbing"
                        animate={controls}
                        style={{ scale: 1 + (hugStrength / 500) }} // Subtle growth while hugging
                        onMouseDown={startHug}
                        onMouseUp={stopHug}
                        onMouseLeave={stopHug}
                        onTouchStart={startHug}
                        onTouchEnd={stopHug}
                        whileHover={{ rotate: [0, -5, 5, 0], transition: { repeat: Infinity, duration: 2 } }}
                    >
                        🧸
                        {/* Arms overlay to simulate hugging */}
                        {isHugging && (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center text-[8rem] md:text-[12rem] opacity-80"
                                initial={{ scale: 2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                🤗
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Floating hearts based on strength */}
                    {isHugging && (
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute text-4xl text-purple-500"
                                    initial={{ opacity: 0, y: 0, x: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        y: -200,
                                        x: (Math.random() - 0.5) * 100
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.3
                                    }}
                                >
                                    ❤️
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="text-center space-y-4">
                    <p className="text-purple-800 font-bold uppercase tracking-widest text-sm">
                        {isHugging ? "Charging Hug..." : "Press & Hold Bear to Hug!"}
                    </p>

                    {/* Hug Meter */}
                    <div className="w-64 h-4 bg-white rounded-full overflow-hidden shadow-inner mx-auto border border-purple-200">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-300 to-purple-600"
                            style={{ width: `${hugStrength}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeddyDay;
