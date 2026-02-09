import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import hugDayImg from '../assets/images/hug-day.png';

const HugDay = () => {
    const { user } = useUser();
    const [hugging, setHugging] = useState(false);

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 bg-gradient-to-b from-green-50 to-teal-50 overflow-hidden relative">
            <Link to="/" className="absolute top-6 left-6 z-20">
                <Button variant="ghost" className="gap-2 flex items-center bg-white/50 backdrop-blur-sm">
                    <ChevronLeft size={20} /> Back
                </Button>
            </Link>

            {/* Floating Leaves/Hearts Background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-green-600/20 text-2xl"
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
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    >
                        🍃
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
                    <h1 className="text-4xl md:text-6xl font-handwriting text-teal-800 mb-4">
                        Happy Hug Day!
                    </h1>
                    <p className="text-xl text-teal-700 font-medium">
                        {user.partnerName ? `Just want to hold ${user.partnerName} tight.` : "A hug is the perfect gift; one size fits all."}
                    </p>
                </motion.div>

                <div className="relative">
                    <Card className="p-2 bg-white/60 rotate-1 hover:rotate-0 transition-transform duration-500 max-w-lg">
                        <img
                            src={hugDayImg}
                            alt="Hug Day"
                            className="w-full h-auto rounded-xl shadow-sm"
                        />
                        <motion.div
                            className="absolute bottom-6 left-0 right-0 text-center"
                        >
                            <Button
                                onMouseDown={() => setHugging(true)}
                                onMouseUp={() => setHugging(false)}
                                onTouchStart={() => setHugging(true)}
                                onTouchEnd={() => setHugging(false)}
                                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-full shadow-lg active:scale-95 transition-transform"
                            >
                                {hugging ? "Hugging... 🫂" : "Hold for a Hug 🫂"}
                            </Button>
                        </motion.div>
                    </Card>

                    {/* Hug Effect Overlay */}
                    {hugging && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <div className="text-9xl drop-shadow-2xl">❤️</div>
                        </motion.div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 bg-white/70 p-6 rounded-2xl shadow-lg border border-teal-100 max-w-lg text-center backdrop-blur-sm"
                >
                    <p className="text-lg text-teal-800 italic">
                        "There is a warm hug where you are. Sending it your way!"
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default HugDay;
