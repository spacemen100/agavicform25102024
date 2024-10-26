// src/pages/RapportGainsPertes.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    HStack,
    Text,
    Button,
    VStack,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
import StepperWithSubStepCounter from '../components/StepperWithSubStepCounter';
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

// Options pour le rapport gains / pertes
const gainLossOptions = [
    { value: 'gain20_loss5', label: 'Gains potentiels de 20 % / Pertes de 5 %' },
    { value: 'gain50_loss20', label: 'Gains potentiels de 50 % / Pertes de 20 %' },
    { value: 'gain100_loss50', label: 'Gains potentiels de 100 % / Pertes de 50 %' },
    { value: 'no_loss', label: 'Aucun risque de perte' },
];

const RapportGainsPertes: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { updateResponse, getResponse } = useUuid();

    // Récupération de la valeur initiale
    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(22);
            if (response !== null) {
                setSelectedOption(response);
            }
        };
        fetchResponse();
    }, [getResponse]);

    const handleSelect = (value: string) => {
        setSelectedOption(value);
    };

    const handleNext = async () => {
        if (selectedOption !== undefined) {
            await updateResponse(22, selectedOption);
            navigate('/rapport-gains-pertes-10-ans');
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={22} totalSubSteps={24} title="Quel rapport gains / pertes êtes-vous prêt à accepter en investissant 10 000 € sur 5 ans ?" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Quel rapport gains / pertes êtes-vous prêt à accepter en investissant 10 000 € sur 5 ans ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Il n'y a pas de bonne ou de mauvaise réponse. Les montants proposés nous permettent de mieux comprendre votre attitude face au risque.
                </Text>

                <VStack spacing={4} align="stretch">
                    {gainLossOptions.map((option) => (
                        <Button
                            key={option.value}
                            variant="outline"
                            size="lg"
                            colorScheme={selectedOption === option.value ? 'green' : 'gray'}
                            onClick={() => handleSelect(option.value)}
                            px={10}
                            py={6}
                            textAlign="center"
                            _hover={{ bg: 'gray.200' }}
                            borderColor={selectedOption === option.value ? 'green.400' : 'gray.200'}
                            whiteSpace={{ base: 'normal', md: 'nowrap' }}
                            overflowWrap="break-word"
                            lineHeight={{ base: '1.5', md: 'normal' }} // Adjust line-height for small screens
                        >
                            {option.label}
                        </Button>
                    ))}
                </VStack>
                <Box mt={8} display="flex" justifyContent="flex-end">
                    <HStack spacing="4">
                        <Button
                            colorScheme="gray"
                            variant="outline"
                            onClick={() => navigate(-1)}
                            px={6}
                            py={6}
                            size="lg"
                        >
                            Retour
                        </Button>
                        <Button
                            colorScheme="green"
                            onClick={handleNext}
                            px={6}
                            py={6}
                            size="lg"
                        >
                            Suivant
                        </Button>
                    </HStack>
                </Box>
            </Box>

            <AlertDialog isOpen={isAlertOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            <WarningIcon color="orange" mr={2} />
                            Sélection requise
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Veuillez sélectionner une option avant de continuer. 😊
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </ChakraProvider>
    );
};

export default RapportGainsPertes;
