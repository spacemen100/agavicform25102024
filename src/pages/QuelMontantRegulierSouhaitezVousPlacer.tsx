import React, { useState } from 'react';
import { ChakraProvider, extendTheme, Box, Text, Button, HStack, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
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

const monthlyInvestmentOptions = [50, 100, 200, 500, 1000];

const QuelMontantRegulierSouhaitezVousPlacer: React.FC = () => {
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
                <StepperWithSubStepCounter currentStep={1} currentSubStep={11} totalSubSteps={24} title="Parlons de votre projet" />
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">Quel montant régulier souhaitez-vous placer chaque mois ?</Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Placer de l'argent tous les mois pourrait faire une grande différence dans quelques années. 55 % de nos clients ont fait ce choix et placent en moyenne 200 € par mois.
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>Sélectionnez parmi les choix suivants :</Text>
                <HStack justifyContent="center" spacing="4" flexWrap="wrap">
                    {monthlyInvestmentOptions.map((amount) => (
                        <Button
                            key={amount}
                            variant="outline"
                            size="lg"
                            colorScheme={selectedAmount === amount ? 'green' : 'blue'}
                            onClick={() => handleSelect(amount)}
                            px={6}
                            py={6}
                            textAlign="left"
                            justifyContent="flex-start"
                            _hover={{ bg: 'gray.200' }}
                            borderColor={selectedAmount === amount ? 'green.400' : 'gray.200'}
                        >
                            {amount.toLocaleString('fr-FR')} € / mois
                        </Button>
                    ))}
                </HStack>
                {selectedAmount !== null && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="green.400">
                        <Text fontSize="2xl" color="green.500">
                            {selectedAmount.toLocaleString('fr-FR')} € / mois
                        </Text>
                    </Box>
                )}
                <Text textAlign="center" mt="8">
                    Les versements sont modulables : placez le montant que vous souhaitez, à la fréquence que vous souhaitez. Ils sont modifiables à tout moment, et toujours sans frais !
                </Text>
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
        </ChakraProvider>
    );
};

export default QuelMontantRegulierSouhaitezVousPlacer;
