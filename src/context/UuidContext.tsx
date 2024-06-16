// src/context/UuidContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabaseClient';

interface UuidContextProps {
    uuid: string;
    updateResponse: (step: number, value: string) => Promise<void>;
    getResponse: (step: number) => Promise<string | null>;
}

const UuidContext = createContext<UuidContextProps | undefined>(undefined);

export const UuidProvider = ({ children }: { children: ReactNode }) => {
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
            const { data, error } = await supabase
                .from('form_responses')
                .select('id')
                .eq('id', uuid)
                .single();

            if (error && error.code !== 'PGRST116') { // 'PGRST116' means no row found
                console.error('Error fetching initial record:', error);
            } else if (!data) {
                const { error: insertError } = await supabase
                    .from('form_responses')
                    .insert([{ id: uuid }]);
                if (insertError) {
                    console.error('Error creating initial record:', insertError);
                }
            }
        };

        createInitialRecord();
    }, [uuid]);

    const updateResponse = async (step: number, value: string) => {
        const column = `step${step}`;
        const { error } = await supabase
            .from('form_responses')
            .update({ [column]: value })
            .eq('id', uuid);

        if (error) {
            console.error('Error updating response:', error);
        }
    };

    const getResponse = async (step: number): Promise<string | null> => {
        const column = `step${step}`;
        const { data, error } = await supabase
            .from('form_responses')
            .select(column)
            .eq('id', uuid)
            .single();

        if (error) {
            console.error('Error fetching response:', error);
            return null;
        }

        // Type assertion to tell TypeScript the expected structure of the data
        const responseData = data as unknown as { [key: string]: string };
        return responseData[column] || null;
    };

    return (
        <UuidContext.Provider value={{ uuid, updateResponse, getResponse }}>
            {children}
        </UuidContext.Provider>
    );
};

export const useUuid = (): UuidContextProps => {
    const context = useContext(UuidContext);
    if (context === undefined) {
        throw new Error('useUuid must be used within a UuidProvider');
    }
    return context;
};
