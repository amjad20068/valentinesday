import React from 'react';
import { useAudio } from '../context/AudioContext';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const AudioPlayer = () => {
    const { isPlaying, toggleAudio } = useAudio();

    return (
        <motion.button
            onClick={toggleAudio}
            className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all border border-pink-200 text-rose-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
    );
};

export default AudioPlayer;
