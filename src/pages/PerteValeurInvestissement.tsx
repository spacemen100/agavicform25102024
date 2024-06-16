import React, { useState, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
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
        green: {
            400: '#38A169',
        },
        blue: {
            400: '#3182CE',
        },
    },
});

const investmentActions = [
    { value: 'reinvest', label: 'Je réinvestis pour profiter de cette opportunité' },
    { value: 'wait', label: 'Je patiente sans paniquer' },
    { value: 'sellPart', label: 'Je vends une partie pour limiter mes pertes potentielles' },
    { value: 'sellAll', label: 'Je vends tout' },
    { value: 'dontKnow', label: 'Je ne sais pas' },
];

const PerteValeurInvestissement: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    const handleSelect = (value: string) => {
        setSelectedOption(value);
    };

    const handleNext = () => {
        if (selectedOption !== undefined) {
            navigate('/creation-compte'); // Remplacez '/prochaine-etape' par la route suivante appropriée
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={24} totalSubSteps={24} title="Si votre investissement perd 10% de sa valeur en 3 mois. Que faites-vous ?" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Si votre investissement perd 10% de sa valeur en 3 mois. Que faites-vous ?
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Un dernier effort, votre comportement pendant une crise nous permet de définir votre profil.
                </Text>
                <VStack spacing={4} align="stretch">
                    {investmentActions.map((option) => (
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

                <Box mt={8} display="flex" justifyContent="space-between">
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
