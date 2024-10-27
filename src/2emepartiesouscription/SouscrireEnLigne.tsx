// src/pages/SouscrireEnLigne.tsx
import React from 'react';
import { Box, Button, Text, ChakraProvider, extendTheme, VStack } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

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
});

const SouscrireEnLigne: React.FC = () => {
    const navigate = useNavigate();

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="600px" mx="auto" textAlign="center">
                <VStack spacing={6} align="center">
                    <CheckIcon boxSize={12} color="green.400" />
                    <Text fontSize="2xl" fontWeight="bold" color="navy">
                        Vous pouvez maintenant souscrire en ligne
                    </Text>
                    <Text fontSize="md" color="gray.500">
                        Merci de votre intérêt. Vous pouvez procéder à la souscription directement en ligne en suivant les étapes fournies.
                    </Text>
                    <Button
                        colorScheme="green"
                        size="lg"
                        onClick={() => navigate('/next-step')} // Remplacez '/next-step' par la route suivante appropriée
                        px={8}
                        py={6}
                    >
                        Commencer la souscription
                    </Button>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default SouscrireEnLigne;
