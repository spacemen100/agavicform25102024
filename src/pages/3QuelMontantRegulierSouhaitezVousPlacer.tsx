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
    AlertDialogOverlay
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

// Les nouvelles options de sélection selon les instructions fournies
const monthlyInvestmentOptions = [
    "Moins de 250 €",
    "250 € à 500 €",
    "500 € à 1 000 €",
    "1 000 € à 2 500 €",
    "Plus de 2 500 €"
];

const QuelMontantRegulierSouhaitezVousPlacer: React.FC = () => {
    const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(3);
            if (response && monthlyInvestmentOptions.includes(response)) {
                setSelectedAmount(response);
            }
        };

        fetchResponse();
    }, [getResponse]);

    const handleSelect = (amount: string) => {
        setSelectedAmount(amount);
    };

    const handleNext = async () => {
        if (selectedAmount) {
            await updateResponse(3, selectedAmount);
            navigate('/quel-est-votre-horizon-d-investissement');
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={3} totalSubSteps={24} title="Parlons de votre projet" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Combien pouvez-vous épargner chaque mois ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Placer de l'argent régulièrement peut faire une grande différence dans le temps.
                </Text>
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
                            {amount}
                        </Button>
                    ))}
                </HStack>
                {selectedAmount && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="green.400">
                        <Text fontSize="2xl" color="green.500">{selectedAmount}</Text>
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
                            Veuillez sélectionner un montant avant de continuer. 😊
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

export default QuelMontantRegulierSouhaitezVousPlacer;
