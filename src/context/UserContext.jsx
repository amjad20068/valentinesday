import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ to: '', from: '', answer: null });
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const answer = searchParams.get('answer');

        if (from || to || answer) {
            setUser({
                to: to || '', // Receiver (To)
                from: from || '', // Sender (From)
                answer: answer || null
            });
        }
    }, [searchParams]);

    const updateUser = (to, from, answer = null) => {
        setUser({ to, from, answer });
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
