import React, { useState, useRef } from 'react';
import { ChakraProvider, extendTheme, Box, Text, Button, HStack, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
import StepperWithSubStepCounter from '../components/StepperWithSubStepCounter';

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

const investmentHorizonOptions = [1, 3, 5, 10, 15, 20];

const QuelEstVotreHorizonDInvestissement: React.FC = () => {
    const [selectedHorizon, setSelectedHorizon] = useState<number | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    const handleSelect = (horizon: number) => {
        setSelectedHorizon(horizon);
    };

    const handleNext = () => {
        if (selectedHorizon !== null) {
            // Ajouter ici la logique pour naviguer vers la prochaine étape si nécessaire
            navigate('/prochaine-etape'); // Remplacez '/prochaine-etape' par la route suivante appropriée
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={4} totalSubSteps={24} title="Parlons de votre projet" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">Dans combien de temps souhaitez-vous profiter de cet investissement ?</Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Cette information nous permet de vous proposer une simulation en accord avec votre horizon d'investissement. Votre argent pourra être débloqué avant sans difficulté et sans frais.
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
                            {horizon} ans
                        </Button>
                    ))}
                </HStack>
                {selectedHorizon !== null && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="green.400">
                        <Text fontSize="2xl" color="green.500">
                            {selectedHorizon} ans
                        </Text>
                    </Box>
                )}
                <HStack justifyContent="flex-end" mt="8" spacing="4">
                    <Button
                        colorScheme="gray"
                        variant="outline"
                        onClick={() => navigate(-1)}
                        px={6}
                        py={6}
                        size="lg">
                        Retour
                    </Button>
                    <Button
                        colorScheme="green"
                        onClick={handleNext}
                        px={6}
                        py={6}
                        size="lg">
                        Suivant
                    </Button>
                </HStack>
            </Box>

            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
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
