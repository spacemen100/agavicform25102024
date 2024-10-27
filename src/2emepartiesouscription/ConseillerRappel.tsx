// src/pages/ConseillerRappel.tsx
import React from 'react';
import { Box, Button, Text, ChakraProvider, extendTheme, VStack, HStack } from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
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

const ConseillerRappel: React.FC = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/next-step'); // Remplacez par la route de l’étape suivante
    };

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="600px" mx="auto" textAlign="center">
                <VStack spacing={6} align="center">
                    <PhoneIcon boxSize={12} color="green.400" />
                    <Text fontSize="2xl" fontWeight="bold" color="navy">
                        Un conseiller va vous rappeler sous peu
                    </Text>
                    <Text fontSize="md" color="gray.500">
                        Merci pour votre intérêt. Un de nos conseillers vous contactera dans les plus brefs délais pour répondre à vos questions.
                    </Text>

                    <HStack justifyContent="flex-end" mt="8" spacing="4" width="100%">
                        <Button colorScheme="gray" variant="outline" onClick={() => navigate(-1)} px={6} py={6} size="lg">
                            Retour
                        </Button>
                        <Button colorScheme="green" onClick={handleNext} px={6} py={6} size="lg">
                            Suivant
                        </Button>
                    </HStack>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default ConseillerRappel;
