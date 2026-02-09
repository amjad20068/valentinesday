import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import promiseDayImg from '../assets/images/promise-day.png';

const PromiseDay = () => {
    const { user } = useUser();
    const [promised, setPromised] = useState(false);

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 bg-gradient-to-b from-blue-50 to-indigo-50 overflow-hidden relative">
            <Link to="/" className="absolute top-6 left-6 z-20">
                <Button variant="ghost" className="gap-2 flex items-center bg-white/50 backdrop-blur-sm">
                    <ChevronLeft size={20} /> Back
                </Button>
            </Link>

            {/* Floating Stars/Sparkles Background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-yellow-400 opacity-50"
                        initial={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            scale: 0
                        }}
                        animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 2 + 1,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    >
                        ✨
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-6xl font-handwriting text-blue-800 mb-4">
                        Happy Promise Day!
                    </h1>
                    <p className="text-xl text-blue-700 font-medium">
                        {user.partnerName ? `A promise to ${user.partnerName} to never let go.` : "Promises are meant to be kept."}
                    </p>
                </motion.div>

                <div className="relative">
                    <Card className="p-2 bg-white/60 rotate-1 hover:rotate-0 transition-transform duration-500 max-w-lg">
                        <img
                            src={promiseDayImg}
                            alt="Promise Day"
                            className="w-full h-auto rounded-xl shadow-sm"
                        />
                        <motion.div
                            className="absolute bottom-6 left-0 right-0 text-center"
                        >
                            <Button
                                onClick={() => setPromised((prev) => !prev)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full shadow-lg"
                            >
                                {promised ? "Promise Made! 🤞" : "Make a Promise 🤝"}
                            </Button>
                        </motion.div>
                    </Card>

                    {/* Pinky Promise Overlay */}
                    {promised && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="text-9xl drop-shadow-2xl">✨</div>
                        </motion.div>
                    )}
                </div>

                {promised && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 bg-white/70 p-6 rounded-2xl shadow-lg border border-blue-100 max-w-lg text-center backdrop-blur-sm"
                    >
                        <h3 className="text-xl font-bold text-blue-900 mb-2">I Promise You...</h3>
                        <p className="text-lg text-blue-800 italic">
                            "To walk with you, hold your hand, and never let you feel alone. Forever and always."
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PromiseDay;
