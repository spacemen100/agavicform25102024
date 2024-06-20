// src/pages/Recommandation.tsx
import React from 'react';
import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react';
import GeographicDiversification from './details/GeographicDiversification';
import TwoColumnLayout from './TwoColumnLayout';
import Stepper from '../components/Stepper';

const theme = extendTheme({
    colors: {
        navy: '#0A1128',
        gray: {
            200: '#e2e8f0',
            500: '#718096',
        },
        white: '#FFFFFF',
        orange: '#FF8C00',
        green: {
            400: '#38A169',
        },
        blue: {
            400: '#3182CE',
        },
    },
    fonts: {
        body: 'Arial, sans-serif',
        heading: 'Arial, sans-serif',
    },
});

const Recommandation: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <Stepper currentStep={1} />
            <Box mt={5} p={5} pt={10} maxW="1000px" mx="auto" textAlign="center" borderRadius="md" boxShadow="md" bg="white">
                <TwoColumnLayout />
                <GeographicDiversification />
            </Box>
        </ChakraProvider>
    );
};

export default Recommandation;
