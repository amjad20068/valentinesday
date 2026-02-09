import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Heart, Wand2 } from 'lucide-react';
import Card from '../components/ui/Card';
import { valentinesDays } from '../utils/days';
import { useUser } from '../context/UserContext';
import Button from '../components/ui/Button';
import ProposalGate from '../components/ProposalGate';

const Home = () => {
    const { user } = useUser();
    const [currentDate, setCurrentDate] = useState(new Date());

    // New state: If personalized, only unlock after "Yes"
    const [proposalAccepted, setProposalAccepted] = useState(false);

    // If personalized link is used, unlock all days ONLY after acceptance
    const isPersonalized = !!user.name && !!user.partnerName;

    // For debugging/demo purposes, we can uncomment this to simulate a specific date
    // useEffect(() => {
    //   setCurrentDate(new Date('2026-02-14'));
    // }, []);

    const isUnlocked = (dateString, id) => {
        if (isPersonalized) return proposalAccepted; // Must accept proposal first

        const targetDate = new Date(dateString);
        const today = new Date(currentDate);

        // Reset hours to compare just dates
        targetDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return today >= targetDate;
    };

    if (isPersonalized && !proposalAccepted) {
        return <ProposalGate onYes={() => setProposalAccepted(true)} />;
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            <header className="relative z-10 text-center mb-16 pt-8">
                <div className="flex justify-center mb-4">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md pb-1"
                    >
                        <span className="text-4xl filter drop-shadow-sm">😻</span>
                    </motion.div>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-handwriting text-hotpink mb-4 drop-shadow-sm"
                >
                    {user.name ? `Happy Valentine's Week, ${user.name}!` : "Valentine Link Generator"}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-sans font-medium mb-8"
                >
                    {user.partnerName ? `A special surprise from ${user.partnerName}` : "Create a personalized cute surprise for your valentine!"}
                </motion.p>

                {!isPersonalized && (
                    <Link to="/customize">
                        <Button className="gap-2 flex items-center mx-auto bg-hotpink hover:bg-rose-600 text-white shadow-lg shadow-rose-200">
                            <Wand2 size={18} /> Create Your Own
                        </Button>
                    </Link>
                )}
            </header>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {valentinesDays.map((day) => {
                    const unlocked = isUnlocked(day.date, day.id);

                    return (
                        <motion.div key={day.id} variants={item}>
                            <Link to={unlocked ? day.path : '#'} className={!unlocked ? 'pointer-events-none' : ''}>
                                <Card
                                    className={`h-full flex flex-col justify-between transition-all duration-300 ${unlocked ? 'hover:scale-105 cursor-pointer bg-white/60' : 'opacity-70 grayscale bg-gray-100/50'}`}
                                    hoverEffect={unlocked}
                                >
                                    <div className={`text-4xl mb-4 ${unlocked ? 'animate-pulse' : ''}`}>
                                        {day.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-rose-900 mb-1">{day.title}</h3>
                                        <p className="text-sm text-rose-700/70 mb-2 font-medium">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                        <p className="text-sm text-gray-600 leading-relaxed font-light">
                                            {unlocked ? day.description : "Wait for the day to arrive..."}
                                        </p>
                                    </div>

                                    {!unlocked && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200/20 backdrop-blur-[1px] rounded-2xl">
                                            <Lock className="text-gray-400 w-8 h-8" />
                                        </div>
                                    )}

                                    {unlocked && (
                                        <div className="mt-4 flex justify-end">
                                            <Heart className="w-5 h-5 text-rose-400 fill-rose-100" />
                                        </div>
                                    )}
                                </Card>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>

            <footer className="mt-20 text-center text-rose-300 text-sm">
                <p>Made with ❤️ for You</p>
            </footer>
        </div>
    );
};

export default Home;
