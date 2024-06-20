import React from 'react';
import { ChakraProvider, extendTheme, Box, Text, VStack, HStack, Input, Button, InputGroup, InputLeftElement } from '@chakra-ui/react';

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

const AccompagnementSurMesure: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <Box
                mt={5}
                p={5}
                pt={10}
                maxW="600px"
                mx="auto"
                textAlign="center"
                borderRadius="md"
                boxShadow="md"
                bg="white"
                border="1px"
                borderColor="gray.200"
            >
                <Text fontSize="2xl" fontWeight="bold" mb={5} color="blue.800">
                    Bénéficiez d’un accompagnement sur mesure !
                </Text>
                <Text fontSize="md" mb={5} color="gray.500">
                    Échangez avec un conseiller privé à propos de vos projets et de nos solutions d'investissement.
                </Text>
                <VStack spacing={4}>
                    <HStack spacing={4} width="100%">
                        <Input placeholder="Camille" variant="filled" size="lg" />
                        <Input placeholder="Dupont" variant="filled" size="lg" />
                    </HStack>
                    <HStack spacing={4} width="100%">
                        <InputGroup size="lg">
                            <InputLeftElement pointerEvents="none" children={<Box as="span" pl={2} color="gray.500">🇫🇷</Box>} />
                            <Input placeholder="06 XX XX XX XX" variant="filled" />
                        </InputGroup>
                    </HStack>
                    <HStack spacing={4} width="100%" justify="center">
                        <Button variant="outline" size="lg" colorScheme="blue" flex="1">
                            Continuer en autonomie
                        </Button>
                        <Button size="lg" colorScheme="blue" flex="1">
                            Être accompagné par un conseiller privé
                        </Button>
                    </HStack>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default AccompagnementSurMesure;
