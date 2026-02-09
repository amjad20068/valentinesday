import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Confetti from 'canvas-confetti';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import proposeDayImg from '../assets/images/propose-day.png';

const ProposeDay = () => {
    const { user } = useUser();
    const [accepted, setAccepted] = useState(false);
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

    const handleAccept = () => {
        setAccepted(true);
        // Fire confetti
        const end = Date.now() + 3 * 1000;
        const colors = ['#ec4899', '#f43f5e', '#ffffff'];

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

    const handleNoHover = () => {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        setNoBtnPos({ x, y });
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 bg-gradient-to-b from-blue-50 to-pink-50 overflow-hidden relative">
            <Link to="/" className="absolute top-6 left-6 z-20">
                <Button variant="ghost" className="gap-2 flex items-center bg-white/50 backdrop-blur-sm">
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
                    <h1 className="text-4xl md:text-6xl font-handwriting text-rose-600 mb-4">
                        Happy Propose Day!
                    </h1>
                    <p className="text-xl text-gray-700 font-medium whitespace-pre-line">
                        {user.name ? `${user.name} asks:` : "The big question:"}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Card className="p-2 bg-white/60 -rotate-1 hover:rotate-0 transition-transform duration-500">
                            <img
                                src={proposeDayImg}
                                alt="Propose Day"
                                className="w-full h-auto rounded-xl shadow-sm"
                            />
                            {accepted && (
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-white text-6xl font-bold font-handwriting drop-shadow-lg"
                                    >
                                        She Said Yes! 💍
                                    </motion.div>
                                </motion.div>
                            )}
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center justify-center"
                    >
                        {!accepted ? (
                            <>
                                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                                    {user.partnerName ? `${user.partnerName}, will you be mine forever?` : "Will you be mine forever?"}
                                </h2>
                                <div className="flex gap-6 relative w-full justify-center h-20">
                                    <Button
                                        onClick={handleAccept}
                                        className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-3 text-xl shadow-xl z-10"
                                    >
                                        Yes, I Will! 💖
                                    </Button>

                                    <motion.div
                                        animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                                        onMouseEnter={handleNoHover}
                                        className="absolute left-1/2 ml-20" // Offset from center
                                    >
                                        <Button className="bg-gray-300 text-gray-600 px-8 py-3 dark:bg-gray-200">
                                            No
                                        </Button>
                                    </motion.div>
                                </div>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-md"
                            >
                                <h3 className="text-4xl font-handwriting text-rose-600 mb-4">
                                    Forever & Always!
                                </h3>
                                <p className="text-gray-600 text-lg">
                                    This is the start of our beautiful journey together.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Typewriter = ({ text, delay }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    React.useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    return <span>{currentText}</span>;
};

export default ProposeDay;
