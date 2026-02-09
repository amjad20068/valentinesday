import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import Confetti from 'canvas-confetti';

const chocolates = [
    { id: 1, type: 'dark', color: '#3E2723', flavor: 'Dark Delight' },
    { id: 2, type: 'milk', color: '#795548', flavor: 'Milky Way' },
    { id: 3, type: 'white', color: '#D7CCC8', flavor: 'White Wonder' },
    { id: 4, type: 'dark', color: '#3E2723', flavor: 'Bittersweet' },
    { id: 5, type: 'milk', color: '#795548', flavor: 'Creamy Dream' },
    { id: 6, type: 'white', color: '#D7CCC8', flavor: 'Vanilla Bliss' },
];

const ChocolateDay = () => {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [eatenChocolates, setEatenChocolates] = useState([]);

    const handleOpen = () => {
        setIsOpen(true);
        Confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3E2723', '#795548', '#D7CCC8']
        });
    };

    const handleEat = (id) => {
        if (!eatenChocolates.includes(id)) {
            setEatenChocolates([...eatenChocolates, id]);
            Confetti({
                particleCount: 20,
                spread: 30,
                origin: { y: 0.8 },
                colors: ['#FFC0CB', '#FF69B4'] // Pink crumbs/hearts
            });
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 bg-[#2A1B18] text-[#D7CCC8] overflow-hidden relative font-sans">
            <Link to="/" className="absolute top-6 left-6 z-20">
                <Button variant="ghost" className="gap-2 flex items-center text-[#D7CCC8] hover:bg-[#3E2723]/50">
                    <ChevronLeft size={20} /> Back
                </Button>
            </Link>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #795548 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-handwriting text-[#FFAB91] mb-4 drop-shadow-lg">
                        Happy Chocolate Day!
                    </h1>
                    <p className="text-xl text-[#BCAAA4] font-medium">
                        {user.partnerName ? `Sharing sweetness with ${user.partnerName}` : "Life is short, eat the chocolate!"}
                    </p>
                </motion.div>

                <div className="relative w-full max-w-md aspect-[4/3] perspective-1000">
                    {/* The Box Container */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <AnimatePresence>
                            {!isOpen ? (
                                <motion.div
                                    key="closed-box"
                                    className="absolute w-64 h-64 bg-gradient-to-br from-[#8D6E63] to-[#5D4037] rounded-3xl shadow-2xl flex items-center justify-center cursor-pointer border-4 border-[#3E2723]"
                                    whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                                    onClick={handleOpen}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 1.5, opacity: 0, rotateX: -90 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                >
                                    <div className="absolute inset-0 border-t-[40px] border-r-[40px] border-l-[40px] border-b-[40px] border-t-[#795548] border-r-[#6D4C41] border-l-[#6D4C41] border-b-[#5D4037] rounded-3xl pointer-events-none opacity-50"></div>
                                    <div className="text-center z-10">
                                        <span className="text-6xl block mb-2">🎁</span>
                                        <p className="font-bold text-[#D7CCC8] text-lg uppercase tracking-wider">Tap to Unwrap</p>
                                    </div>
                                    {/* Ribbon */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-4 h-full bg-[#FFAB91] shadow-md"></div>
                                        <div className="h-4 w-full bg-[#FFAB91] absolute shadow-md"></div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="open-box"
                                    className="w-full bg-[#3E2723] p-8 rounded-xl shadow-inner grid grid-cols-3 gap-6 relative border-8 border-[#5D4037]"
                                    initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
                                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                    transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                                >
                                    {/* Box Lid (Visual only, animating away) */}
                                    <motion.div
                                        className="absolute -top-32 left-0 right-0 h-32 bg-[#5D4037] origin-bottom transform-gpu opacity-50 rounded-t-xl"
                                        initial={{ rotateX: 0 }}
                                        animate={{ rotateX: 180, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    />

                                    {chocolates.map((choco) => (
                                        <motion.div
                                            key={choco.id}
                                            className="aspect-square rounded-full shadow-lg flex items-center justify-center cursor-pointer relative"
                                            style={{ backgroundColor: choco.color }}
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            onClick={() => handleEat(choco.id)}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + choco.id * 0.1 }}
                                        >
                                            {eatenChocolates.includes(choco.id) ? (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="text-2xl"
                                                >
                                                    😋
                                                </motion.span>
                                            ) : (
                                                <div className="w-3/4 h-3/4 rounded-full border-2 border-white/20"></div>
                                            )}
                                        </motion.div>
                                    ))}

                                    <div className="absolute -bottom-16 w-full text-center">
                                        <p className="text-[#BCAAA4] italic text-sm">Tap a chocolate to eat it! 🍫</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {isOpen && eatenChocolates.length === chocolates.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-20 bg-[#3E2723] p-6 rounded-2xl shadow-xl border border-[#795548] max-w-lg text-center"
                    >
                        <h3 className="text-2xl font-handwriting text-[#FFAB91] mb-2">You ate them all! 😮</h3>
                        <p className="text-[#D7CCC8]">
                            "Hope your day is as sweet as these chocolates... and as sweet as YOU!"
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ChocolateDay;
