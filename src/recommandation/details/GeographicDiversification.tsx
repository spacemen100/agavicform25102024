import React from 'react';
import { ChakraProvider, extendTheme, Box, Text, VStack, HStack, Image } from '@chakra-ui/react';

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

const GeographicDiversification: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <Box mt={5} p={5} maxW="1000px" mx="auto" textAlign="left" borderRadius="md" boxShadow="md" bg="white">
                <Text fontSize="lg" fontWeight="bold" mb={5} color="gray.500">
                    Diversification géographique (hors Fonds Euro)
                </Text>
                <HStack spacing={10} alignItems="flex-start">
                    <Image src="/path-to-your-map-image.png" alt="Geographical Diversification Map" boxSize="300px" />
                    <VStack align="flex-start" spacing={4} maxW="600px">
                        <Text fontWeight="bold" color="blue.700">
                            <Text as="span" fontSize="xl" color="blue.700">87,8%</Text> Europe
                        </Text>
                        <Text fontWeight="bold" color="blue.700">
                            <Text as="span" fontSize="xl" color="blue.700">9,7%</Text> Amérique nord
                        </Text>
                        <Text fontWeight="bold" color="blue.700">
                            <Text as="span" fontSize="xl" color="blue.700">1,6%</Text> Asie pacifique
                        </Text>
                        <Text fontWeight="bold" color="blue.700">
                            <Text as="span" fontSize="xl" color="blue.700">0,7%</Text> Japon
                        </Text>
                        <Text fontWeight="bold" color="blue.700">
                            <Text as="span" fontSize="xl" color="blue.700">0,2%</Text> Amérique latine
                        </Text>
                    </VStack>
                </HStack>
            </Box>
        </ChakraProvider>
    );
};

export default GeographicDiversification;
