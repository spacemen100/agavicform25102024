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
                <StepperWithSubStepCounter currentStep={1} currentSubStep={2} totalSubSteps={24} title="Parlons de votre projet" />
                <Box p={5} maxW="1000px" mx="auto">
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
                            textAlign="left"
                            justifyContent="flex-start"
                            _hover={{ bg: 'gray.200' }}
                            borderColor={selectedAmount === amount ? 'green.400' : 'gray.200'} // Modifier la couleur de la bordure ici
                        >
                            {amount.toLocaleString('fr-FR')} €
                        </Button>
                    ))}
                </HStack>
                {selectedAmount !== null && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="green.400">
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
