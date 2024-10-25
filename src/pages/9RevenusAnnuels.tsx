// src/pages/RevenusAnnuels.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Button,
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
    },
});

// Options de revenus avec libellés adaptés
const incomeOptions = [
    { value: 'lessThan30000', label: 'Moins de 30 000 €' },
    { value: '30000to45000', label: '30 000 € à 45 000 €' },
    { value: '45001to60000', label: '45 001 € à 60 000 €' },
    { value: '60001to100000', label: '60 001 € à 100 000 €' },
    { value: '100001to150000', label: '100 001 € à 150 000 €' },
    { value: 'moreThan150000', label: 'Plus de 150 000 €' },
];

const RevenusAnnuels: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    // Récupération de la sélection initiale de la base de données
    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(5);
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
            await updateResponse(5, selectedOption);
            navigate('/residence-principale');
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={5} totalSubSteps={24} title="Quels sont les revenus annuels bruts de votre foyer ?" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Quels sont les revenus annuels bruts de votre foyer ?
                </Text>
                <HStack justifyContent="center" spacing="4" flexWrap="wrap">
                    {incomeOptions.map((option) => (
                        <Button
                            key={option.value}
                            variant="outline"
                            size="xxl"
                            colorScheme={selectedOption === option.value ? 'green' : 'blue'}
                            onClick={() => handleSelect(option.value)}
                            px={6}
                            py={6}
                            textAlign="left"
                            justifyContent="flex-start"
                            _hover={{ bg: 'gray.200' }}
                            borderColor={selectedOption === option.value ? 'green.400' : 'gray.200'}
                        >
                            {option.label}
                        </Button>
                    ))}
                </HStack>
                {selectedOption !== undefined && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="green.400">
                        <Text fontSize="2xl" color="green.500">
                            {incomeOptions.find(option => option.value === selectedOption)?.label}
                        </Text>
                    </Box>
                )}
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

export default RevenusAnnuels;
