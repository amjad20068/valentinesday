import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: '', partnerName: '' });
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const from = searchParams.get('from');
        const to = searchParams.get('to');

        if (from || to) {
            setUser({
                name: to || '', // "To" is the current user viewing the page
                partnerName: from || '' // "From" is the one who sent it
            });
        }
    }, [searchParams]);

    const updateUser = (name, partnerName) => {
        setUser({ name, partnerName });
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
