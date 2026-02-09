import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-2 rounded-full font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border";

    const variants = {
        primary: "bg-rose-500 text-white border-rose-500 hover:bg-rose-600 hover:shadow-lg shadow-rose-200/50",
        secondary: "bg-white/50 text-rose-700 border-rose-200 hover:bg-white/80 backdrop-blur-sm hover:border-rose-300",
        outline: "bg-transparent text-rose-600 border-rose-400 hover:bg-rose-50",
        ghost: "bg-transparent text-rose-500 border-transparent hover:bg-rose-50/50",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
