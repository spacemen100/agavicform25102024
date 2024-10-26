// src/pages/PerteValeurInvestissement.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Button,
    VStack,
    HStack,
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

// Options pour la réaction face à une perte de valeur
const lossResponseOptions = [
    { value: 'sellImmediately', label: 'Vendre immédiatement pour limiter les pertes' },
    { value: 'reduceAndWait', label: 'Réduire l’investissement mais attendre une reprise' },
    { value: 'doNothing', label: 'Ne rien faire et attendre' },
    { value: 'investMore', label: 'Investir davantage pour profiter des opportunités' },
];

const PerteValeurInvestissement: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { updateResponse, getResponse } = useUuid();

    // Récupération de la valeur initiale
    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(24);
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
            await updateResponse(24, selectedOption);
            navigate('/creation-compte'); // Remplacez par la route suivante appropriée
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter
                currentStep={1}
                currentSubStep={24}
                totalSubSteps={24}
                title="Si votre investissement perd 10 % de sa valeur en 3 mois, que faites-vous ?"
            />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Si votre investissement perd 10 % de sa valeur en 3 mois, que faites-vous ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Un dernier effort, votre comportement pendant une crise nous permet de définir votre profil.
                </Text>
                <VStack spacing={4} align="stretch">
                    {lossResponseOptions.map((option) => (
                        <Button
                            key={option.value}
                            variant="outline"
                            size="lg"
                            colorScheme={selectedOption === option.value ? 'green' : 'gray'}
                            onClick={() => handleSelect(option.value)}
                            px={10}
                            py={{ base: 8, md: 6 }}
                            textAlign="center"
                            _hover={{ bg: 'gray.200' }}
                            borderColor={selectedOption === option.value ? 'green.400' : 'gray.200'}
                            whiteSpace={{ base: 'normal', md: 'nowrap' }}
                            overflowWrap="break-word"
                            lineHeight={{ base: '1.5', md: 'normal' }}
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

export default PerteValeurInvestissement;
