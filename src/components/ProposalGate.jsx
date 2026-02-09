import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import shyCatMsg from '../assets/images/shy-cat.png'; // Assuming these are in this path
import kissingCats from '../assets/images/kissing-cats.png';
import confettiImg from '../assets/images/confetti.png';

const ProposalGate = ({ onYes }) => {
    const { user } = useUser();
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
    const [accepted, setAccepted] = useState(false);

    const handleNoHover = () => {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        setNoBtnPos({ x, y });
    };

    const handleYes = () => {
        setAccepted(true);
        setTimeout(() => {
            onYes();
        }, 4000); // Wait for animation
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-valentine-gradient p-4">
            <AnimatePresence mode="wait">
                {!accepted ? (
                    <motion.div
                        key="question"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center max-w-md w-full border border-white"
                    >
                        <motion.img
                            src={shyCatMsg}
                            alt="Shy Cat"
                            className="w-48 h-48 mx-auto mb-6 object-contain drop-shadow-lg"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <h1 className="text-3xl font-bold text-gray-800 mb-2 font-sans">
                            {user.to ? `${user.to}, ` : ''}will you be my valentine?
                        </h1>

                        <div className="flex gap-4 justify-center mt-8 relative h-16">
                            <Button
                                onClick={handleYes}
                                className="bg-hotpink text-white px-8 py-2 rounded-full font-bold shadow-lg hover:bg-rose-600 hover:scale-105 transition-transform"
                            >
                                Yes
                            </Button>

                            <motion.div
                                animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                                onMouseEnter={handleNoHover}
                                className="absolute left-1/2 ml-10" // Initial position offset
                            >
                                <Button
                                    className="bg-gray-200 text-gray-600 px-8 py-2 rounded-full font-bold hover:bg-gray-300"
                                >
                                    No
                                </Button>
                            </motion.div>
                        </div>
                        <p className="text-xs text-gray-400 mt-8 italic">"No" seems a bit shy 😈</p>
                        <div className="mt-4 text-center text-xs text-gray-400">
                            Created by <a href="#" className="font-bold text-hotpink hover:underline">Amjad</a>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center max-w-md w-full border border-white relative overflow-hidden"
                    >
                        {/* Confetti Overlay */}
                        <motion.img
                            src={confettiImg}
                            className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
                            animate={{ y: [0, 100], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        <motion.img
                            src={kissingCats}
                            alt="Kissing Cats"
                            className="w-64 h-64 mx-auto mb-4 object-contain"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
                        />

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-4xl font-bold text-hotpink mb-2 font-handwriting"
                        >
                            Yay! 💖
                        </motion.h2>
                        <p className="text-gray-600 font-medium">
                            {user.from || 'Someone'} will be so happy!
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProposalGate;
