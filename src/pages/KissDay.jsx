import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import kissDayImg from '../assets/images/kiss-day.png';

const KissDay = () => {
    const { user } = useUser();
    const [kissed, setKissed] = useState(false);

    const handleKiss = () => {
        setKissed(true);
        setTimeout(() => setKissed(false), 2000); // Reset after 2 seconds
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 bg-gradient-to-b from-pink-100 to-rose-100 overflow-hidden relative">
            <Link to="/" className="absolute top-6 left-6 z-20">
                <Button variant="ghost" className="gap-2 flex items-center bg-white/50 backdrop-blur-sm">
                    <ChevronLeft size={20} /> Back
                </Button>
            </Link>

            {/* Floating Lips Background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-rose-500/30 text-2xl"
                        initial={{
                            top: -20,
                            left: `${Math.random() * 100}%`,
                            rotate: 0
                        }}
                        animate={{
                            top: '100%',
                            rotate: 360,
                            x: Math.random() * 50 - 25,
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    >
                        💋
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
                    <h1 className="text-4xl md:text-6xl font-handwriting text-rose-600 mb-4">
                        Happy Kiss Day!
                    </h1>
                    <p className="text-xl text-rose-500 font-medium">
                        {user.partnerName ? `Sealed with a kiss for ${user.partnerName}.` : "A kiss is a secret told to the mouth instead of the ear."}
                    </p>
                </motion.div>

                <div className="relative">
                    <Card className="p-2 bg-white/60 -rotate-1 hover:rotate-0 transition-transform duration-500 max-w-lg">
                        <img
                            src={kissDayImg}
                            alt="Kiss Day"
                            className="w-full h-auto rounded-xl shadow-sm"
                        />
                        <motion.div
                            className="absolute bottom-6 left-0 right-0 text-center"
                        >
                            <Button
                                onClick={handleKiss}
                                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-full shadow-lg"
                            >
                                Send a Kiss 💋
                            </Button>
                        </motion.div>
                    </Card>

                    {/* Kiss Animation Overlay */}
                    {kissed && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                        >
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-9xl filter drop-shadow-2xl"
                            >
                                💋
                            </motion.div>

                            {/* Small floating hearts/kisses */}
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute text-4xl"
                                    initial={{ x: 0, y: 0, opacity: 0 }}
                                    animate={{
                                        x: (Math.random() - 0.5) * 200,
                                        y: (Math.random() - 0.5) * 200,
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{ duration: 1 }}
                                >
                                    ❤️
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 bg-white/70 p-6 rounded-2xl shadow-lg border border-rose-100 max-w-lg text-center backdrop-blur-sm"
                >
                    <p className="text-lg text-rose-800 italic">
                        "Your lips are the sweetest thing I've ever tasted."
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default KissDay;
