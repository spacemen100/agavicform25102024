// src/pages/QuelEstVotreHorizonDInvestissement.tsx
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

// Options pour l'horizon d'investissement
const investmentHorizonOptions = [
    "Moins de 2 ans",
    "2 à 5 ans",
    "5 à 10 ans",
    "Plus de 10 ans",
];

const QuelEstVotreHorizonDInvestissement: React.FC = () => {
    const [selectedHorizon, setSelectedHorizon] = useState<string | undefined>(undefined);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { updateResponse, getResponse } = useUuid();

    // Récupération de la valeur initiale lors du chargement
    useEffect(() => {
        const fetchInitialHorizon = async () => {
            const response = await getResponse(16);
            if (response && investmentHorizonOptions.includes(response)) {
                setSelectedHorizon(response); // Définit la sélection initiale à partir de la base de données
            }
        };
        fetchInitialHorizon();
    }, [getResponse]);

    const handleSelect = (horizon: string) => {
        setSelectedHorizon(horizon);
    };

    const handleNext = async () => {
        if (selectedHorizon) {
            await updateResponse(16, selectedHorizon);
            navigate('/rapport-gains-pertes'); // Remplacez par la route suivante appropriée
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={16} totalSubSteps={24} title="Parlons de votre projet" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Dans combien de temps souhaitez-vous profiter de cet investissement ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Cette information nous permet de vous proposer une simulation en accord avec votre horizon d'investissement.
                </Text>
                <HStack justifyContent="center" spacing="4" flexWrap="wrap">
                    {investmentHorizonOptions.map((horizon) => (
                        <Button
                            key={horizon}
                            variant="outline"
                            size="lg"
                            colorScheme={selectedHorizon === horizon ? 'green' : 'blue'}
                            onClick={() => handleSelect(horizon)}
                            px={6}
                            py={6}
                            textAlign="left"
                            justifyContent="flex-start"
                            _hover={{ bg: 'gray.200' }}
                            borderColor={selectedHorizon === horizon ? 'green.400' : 'gray.200'}
                        >
                            {horizon}
                        </Button>
                    ))}
                </HStack>
                {selectedHorizon && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="green.400">
                        <Text fontSize="2xl" color="green.500">{selectedHorizon}</Text>
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
                            Veuillez sélectionner un horizon d'investissement avant de continuer. 😊
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

export default QuelEstVotreHorizonDInvestissement;
