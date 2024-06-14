import React, { useState } from 'react';
import { ChakraProvider, extendTheme, Box, Text, Button, HStack, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import StepperWithSubStepCounter from '../components/StepperWithSubStepCounter';
import {
    FcApproval, FcDisapprove, FcProcess, FcBusinessContact, FcReadingEbook, FcManager, FcParallelTasks
} from 'react-icons/fc';

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

const investmentOptions = [5000, 10000, 30000, 50000, 150000];

const QuelMontantSouhaitezVousPlacer: React.FC = () => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleSelect = (amount: number) => {
        setSelectedAmount(amount);
    };

    const handleNext = () => {
        // Ajouter ici la logique pour naviguer vers la prochaine étape si nécessaire
    };

    return (
        <ChakraProvider theme={theme}>
            <Box bg="gray.50" minH="100vh" p={5} maxWidth="1000px" mx="auto">
                <StepperWithSubStepCounter currentStep={1} currentSubStep={10} totalSubSteps={24} title="Parlons de votre projet" />
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">Quel montant souhaitez-vous placer chez AGAVIC ?</Text>
                <Text fontSize="md" textAlign="center" mb={6}>Sélectionnez parmi les choix suivants :</Text>
                <HStack justifyContent="center" spacing="4" flexWrap="wrap">
                    {investmentOptions.map((amount) => (
                        <Button
                            key={amount}
                            variant="outline"
                            size="xxl"
                            colorScheme={selectedAmount === amount ? 'green' : 'blue'}
                            onClick={() => handleSelect(amount)}
                            px={6}
                            py={6}
                            size="xxl"
                            textAlign="left"
                            justifyContent="flex-start"
                            _hover={{ bg: 'gray.200' }}
                        >
                            {amount.toLocaleString('fr-FR')} €
                        </Button>
                    ))}
                </HStack>
                {selectedAmount !== null && (
                    <Box textAlign="center" mt="4">
                        <Text fontSize="2xl" color="green.500">
                            {selectedAmount.toLocaleString('fr-FR')} €
                        </Text>
                    </Box>
                )}
                <Box textAlign="center" mt="8">
                    <HStack spacing="4">
                        <Image
                            borderRadius="full"
                            boxSize="40px"
                            src="https://bit.ly/dan-abramov"
                            alt="Dan Abramov"
                        />
                        <Text>
                            Avec AGAVIC, votre épargne n'est pas bloquée : vous pouvez continuer d'investir dès votre compte ouvert et retirer à tout moment.
                        </Text>
                    </HStack>
                </Box>
                <HStack justifyContent="flex-end" mt="8" spacing="4">
                    <Button
                        colorScheme="gray"
                        variant="outline"
                        onClick={() => navigate(-1)}
                        px={6}
                        py={6}
                        size="xxl">
                        Retour
                    </Button>
                    <Button
                        colorScheme="green"
                        onClick={handleNext}
                        px={6}
                        py={6}
                        size="xxl">
                        Suivant
                    </Button>
                </HStack>
            </Box>
        </ChakraProvider>
    );
};

export default QuelMontantSouhaitezVousPlacer;
