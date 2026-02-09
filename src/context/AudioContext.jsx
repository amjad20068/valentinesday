import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio('/bgm.mp3')); // Assuming bgm.mp3 is in public folder or imported

    useEffect(() => {
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        // Attempt auto-play (might be blocked by browser policy)
        const playAudio = async () => {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (err) {
                console.log("Audio autoplay blocked by browser policy");
                setIsPlaying(false);
            }
        };

        // Cleanup
        return () => {
            audioRef.current.pause();
        };
    }, []);

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Playback failed", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
            {children}
        </AudioContext.Provider>
    );
};
