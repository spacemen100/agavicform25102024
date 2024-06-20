import React from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Link,
    HStack,
    VStack,
} from '@chakra-ui/react';

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

const YourProject: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="600px" mx="auto" bg="white" borderRadius="md" boxShadow="sm">
                <HStack justify="space-between" align="center" mb={4}>
                    <Text fontSize="lg" fontWeight="bold" color="blue.700">
                        Votre projet
                    </Text>
                    <Link fontSize="sm" fontWeight="bold" color="blue.700" href="#">
                        Modifier
                    </Link>
                </HStack>
                <HStack spacing={10} justify="space-between">
                    <VStack align="flex-start">
                        <Text fontSize="sm" color="gray.700">
                            Versement initial
                        </Text>
                        <Text fontSize="lg" fontWeight="bold" color="blue.700">
                            30 000 €
                        </Text>
                    </VStack>
                    <VStack align="flex-start">
                        <Text fontSize="sm" color="gray.700">
                            Versement mensuel
                        </Text>
                        <Text fontSize="lg" fontWeight="bold" color="blue.700">
                            1 000 € <Box as="span" fontSize="md" color="gray.700">/ mois</Box>
                        </Text>
                    </VStack>
                    <VStack align="flex-start">
                        <Text fontSize="sm" color="gray.700">
                            Horizon de placement
                        </Text>
                        <Text fontSize="lg" fontWeight="bold" color="blue.700">
                            10 ans
                        </Text>
                    </VStack>
                </HStack>
            </Box>
        </ChakraProvider>
    );
};

export default YourProject;
