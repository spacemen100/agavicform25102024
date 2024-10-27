// src/pages/VersementRegulier.tsx
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
    },
});

// Options pour le versement régulier
const regularPaymentOptions = [
    "50 €",
    "100 €",
    "200 €",
    "500 €",
    "1 000 €",
    "Non, je préfère ajuster plus tard.",
];

const VersementRegulier: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { updateResponse, getResponse } = useUuid();

    // Récupération de la valeur initiale lors du chargement
    useEffect(() => {
        const fetchInitialOption = async () => {
            const response = await getResponse(4); // Changez '4' pour l'ID approprié de l'étape dans la base de données
            if (response && regularPaymentOptions.includes(response)) {
                setSelectedOption(response); // Définit la sélection initiale à partir de la base de données
            }
        };
        fetchInitialOption();
    }, [getResponse]);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleNext = async () => {
        if (selectedOption) {
            await updateResponse(4, selectedOption); // Changez '4' pour l'ID approprié de l'étape dans la base de données
            navigate('/revenus-annuels'); // Remplacez par la route suivante appropriée
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={4} totalSubSteps={24} title="Souhaitez-vous mettre en place un versement régulier ?" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Souhaitez-vous mettre en place un versement régulier ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Choisissez un montant de versement régulier ou sélectionnez l'option pour ajuster plus tard.
                </Text>
                <HStack justifyContent="center" spacing="4" flexWrap="wrap">
                    {regularPaymentOptions.map((option) => (
                        <Button
                            key={option}
                            variant="outline"
                            size="lg"
                            colorScheme={selectedOption === option ? 'green' : 'blue'}
                            onClick={() => handleSelect(option)}
                            px={6}
                            py={6}
                            textAlign="left"
                            justifyContent="flex-start"
                            _hover={{ bg: 'gray.200' }}
                            borderColor={selectedOption === option ? 'green.400' : 'gray.200'}
                        >
                            {option}
                        </Button>
                    ))}
                </HStack>
                {selectedOption && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="green.400">
                        <Text fontSize="2xl" color="green.500">{selectedOption}</Text>
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
                            Veuillez sélectionner un montant de versement régulier avant de continuer. 😊
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

export default VersementRegulier;
