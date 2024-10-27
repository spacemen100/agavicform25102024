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
import { WarningIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
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

const termsConditionsOptions = [
    { value: 'oui', label: 'Oui' },
    { value: 'non', label: 'Non' },
];

const TermsAndConditionsConfirmation: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(28); // Adjust the step number as needed
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
            await updateResponse(28, selectedOption); // Adjust the step number as needed
            navigate('/subscription-choice'); // Replace with the actual next route
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={28} totalSubSteps={24} title="Confirmation des Termes et Conditions" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Avez-vous lu et compris les termes et conditions liés aux investissements proposés par EPARGNE+ ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Cette confirmation est requise pour poursuivre.
                </Text>
                <VStack spacing={4} align="stretch">
                    {termsConditionsOptions.map((option) => (
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
                        >
                            {option.label}
                        </Button>
                    ))}
                </VStack>

                <HStack justifyContent="flex-end" mt="8" spacing="4">
                    <Button colorScheme="gray" variant="outline" onClick={() => navigate(-1)} px={6} py={6} size="lg">
                        Retour
                    </Button>
                    <Button colorScheme="green" onClick={handleNext} px={6} py={6} size="lg">
                        Suivant
                    </Button>
                </HStack>
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

export default TermsAndConditionsConfirmation;
