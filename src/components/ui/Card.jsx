import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverEffect = true, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={hoverEffect ? { y: -5, boxShadow: "0 20px 25px -5px rgba(244, 63, 94, 0.15), 0 10px 10px -5px rgba(244, 63, 94, 0.1)" } : {}}
            className={`bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-lg shadow-rose-100/20 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
