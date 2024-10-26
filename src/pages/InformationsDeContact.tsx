import React, { useState, useEffect, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Button,
    Input,
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

const InformationsDeContact: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { updateResponse, getResponse } = useUuid();

    // Fetch initial email from step25 when the component mounts
    useEffect(() => {
        const fetchInitialEmail = async () => {
            const response = await getResponse(25); // Get response from step 25
            if (response) {
                setEmail(response); // Set initial email if available
            }
        };
        fetchInitialEmail();
    }, [getResponse]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleNext = async () => {
        if (email && validateEmail(email)) {
            await updateResponse(25, email); // Save to step 25
            navigate('/prochaine-etape'); // Replace with the next route
        } else {
            setIsEmailValid(false);
            setIsAlertOpen(true);
        }
    };

    const onClose = () => {
        setIsAlertOpen(false);
        setIsEmailValid(true);
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={3} totalSubSteps={24} title="Vos Informations de Contact" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Veuillez entrer votre adresse e-mail
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Nous vous contacterons avec des informations importantes sur votre investissement.
                </Text>
                <HStack justifyContent="center" spacing="4" flexWrap="wrap">
                    <Input
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={handleInputChange}
                        size="lg"
                        borderColor={isEmailValid ? 'gray.200' : 'red.400'}
                    />
                </HStack>
                {email && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="green.400">
                        <Text fontSize="2xl" color="green.500">{email}</Text>
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
                            {isEmailValid ? "E-mail requis" : "E-mail invalide"}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {isEmailValid
                                ? "Veuillez entrer une adresse e-mail avant de continuer. 😊"
                                : "L'adresse e-mail entrée n'est pas valide. Veuillez vérifier et réessayer. 😊"}
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

export default InformationsDeContact;
