import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabaseClient';

interface UuidContextProps {
    uuid: string;
    updateResponse: (step: number, response: string) => Promise<void>;
    getResponse: (step: number) => Promise<string | null>;
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
            const { data, error } = await supabase
                .from('form_responses')
                .select('id')
                .eq('id', uuid);

            if (error) {
                console.error('Error checking for existing record:', error);
                return;
            }

            if (data.length === 0) {
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

    const updateResponse = async (step: number, response: string) => {
        const column = `step${step}`;
        const { error } = await supabase
            .from('form_responses')
            .update({ [column]: response })
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

        if (data && typeof data === 'object' && column in data) {
            return data[column] as string;
        }

        return null;
    };

    return (
        <UuidContext.Provider value={{ uuid, updateResponse, getResponse }}>
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
