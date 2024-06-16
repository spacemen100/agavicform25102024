// src/context/UuidContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface UuidContextProps {
    uuid: string;
}

const UuidContext = createContext<UuidContextProps | undefined>(undefined);

export const UuidProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // eslint-disable-next-line
    const [uuid, setUuid] = useState<string>(() => {
        // Check if UUID already exists in localStorage
        const existingUuid = localStorage.getItem('uuid');
        if (existingUuid) {
            return existingUuid;
        }
        // Generate a new UUID and store it in localStorage
        const newUuid = uuidv4();
        localStorage.setItem('uuid', newUuid);
        return newUuid;
    });

    return (
        <UuidContext.Provider value={{ uuid }}>
            {children}
        </UuidContext.Provider>
    );
};

export const useUuid = (): UuidContextProps => {
    const context = useContext(UuidContext);
    if (!context) {
        throw new Error('useUuid must be used within a UuidProvider');
    }
    return context;
};
