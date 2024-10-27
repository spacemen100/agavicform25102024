// src/pages/SouscrireEnLigne.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    VStack,
    Text,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    HStack,
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useUuid } from '../context/UuidContext';

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

const productOptions = [
    { value: 'e-vie', label: 'e-vie Generali' },
    { value: 'e-per', label: 'e-per Generali' },
];

const SouscrireEnLigne: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { updateResponse, getResponse } = useUuid();

    // Charger la sélection existante depuis la base de données
    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(30);
            if (response !== null) {
                setSelectedProduct(response);
            }
        };
        fetchResponse();
    }, [getResponse]);

    const onClose = () => setIsAlertOpen(false);

    const handleSelect = (value: string) => {
        setSelectedProduct(value);
    };

    const handleNext = async () => {
        if (selectedProduct) {
            // Enregistrer le choix dans step30
            await updateResponse(30, selectedProduct);
            
            // Rediriger en fonction du produit choisi
            if (selectedProduct === 'e-vie') {
                navigate('/subscriber-info');
            } else if (selectedProduct === 'e-per') {
                navigate('/subscriber-info');
            }
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="600px" mx="auto" textAlign="center">
                <VStack spacing={6} align="center">
                    <CheckIcon boxSize={12} color="green.400" />
                    <Text fontSize="2xl" fontWeight="bold" color="navy">
                        Vous pouvez maintenant souscrire en ligne
                    </Text>
                    <Text fontSize="md" color="gray.500" mb={6}>
                        Merci de votre intérêt. Choisissez un produit Generali pour continuer avec votre souscription en ligne.
                    </Text>

                    <VStack spacing={4} align="stretch" width="100%">
                        {productOptions.map((option) => (
                            <Button
                                key={option.value}
                                variant="outline"
                                size="lg"
                                colorScheme={selectedProduct === option.value ? 'green' : 'gray'}
                                onClick={() => handleSelect(option.value)}
                                px={10}
                                py={6}
                                textAlign="center"
                                _hover={{ bg: 'gray.200' }}
                                borderColor={selectedProduct === option.value ? 'green.400' : 'gray.200'}
                            >
                                {option.label}
                            </Button>
                        ))}
                    </VStack>

                    <HStack justifyContent="flex-end" mt="8" spacing="4" width="100%">
                        <Button colorScheme="gray" variant="outline" onClick={() => navigate(-1)} px={6} py={6} size="lg">
                            Retour
                        </Button>
                        <Button colorScheme="green" onClick={handleNext} px={6} py={6} size="lg">
                            Suivant
                        </Button>
                    </HStack>
                </VStack>

                <AlertDialog isOpen={isAlertOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                <WarningIcon color="orange" mr={2} />
                                Sélection requise
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                Veuillez sélectionner un produit pour continuer. 😊
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    OK
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Box>
        </ChakraProvider>
    );
};

export default SouscrireEnLigne;
