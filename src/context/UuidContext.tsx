// src/context/UuidContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabaseClient';

interface UuidContextProps {
    uuid: string;
    updateResponse: (step: number, response: string) => Promise<void>;
}

const UuidContext = createContext<UuidContextProps | undefined>(undefined);

export const UuidProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // eslint-disable-next-line
    const [uuid, setUuid] = useState<string>(() => {
        const existingUuid = localStorage.getItem('uuid');
        if (existingUuid) {
            return existingUuid;
        }
        const newUuid = uuidv4();
        localStorage.setItem('uuid', newUuid);
        return newUuid;
    });

    useEffect(() => {
        const createInitialRecord = async () => {
            try {
                const { error } = await supabase
                    .from('form_responses')
                    .insert([{ id: uuid }]);
                if (error) throw error;
            } catch (error) {
                console.error('Error creating initial record:', error);
            }
        };

        createInitialRecord();
    }, [uuid]);

    const updateResponse = async (step: number, response: string) => {
        const column = `step${step}`;
        try {
            const { error } = await supabase
                .from('form_responses')
                .update({ [column]: response })
                .eq('id', uuid);
            if (error) throw error;
        } catch (error) {
            console.error('Error updating response:', error);
        }
    };

    return (
        <UuidContext.Provider value={{ uuid, updateResponse }}>
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
