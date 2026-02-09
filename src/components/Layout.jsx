import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';
import { AnimatePresence } from 'framer-motion';

const Layout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-ivory text-rose-900 font-sans overflow-hidden relative">
            <AudioPlayer />

            {/* Background Elements (Optional: Floating hearts, etc.) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-rose-50/50 to-pink-50/50" />
            </div>

            {/* Main Content Area */}
            <main className="relative z-10 w-full h-full">
                <AnimatePresence mode="wait">
                    {/* We use location.pathname to trigger animation on route change */}
                    {/* The actual page component will be rendered by Outlet, but we need to wrap it for AnimatePresence 
               However, AnimatePresence works best when direct children are motion components with keys.
               Since Outlet renders the component, the component itself should refer to the motion wrapper.
           */}
                    <Outlet />
                </AnimatePresence>
            </main>

            {/* Navigation could go here or be inside pages */}
        </div>
    );
};

export default Layout;
