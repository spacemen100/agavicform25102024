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

const InformationsDeContactPhone: React.FC = () => {
    const [phone, setPhone] = useState<string>('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { updateResponse, getResponse } = useUuid();

    // Fetch initial phone number from step26 when the component mounts
    useEffect(() => {
        const fetchInitialPhone = async () => {
            const response = await getResponse(26); // Get response from step 26
            if (response) {
                setPhone(response); // Set initial phone number if available
            }
        };
        fetchInitialPhone();
    }, [getResponse]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^\+?[0-9]{10,15}$/; // Accepts international format with optional "+" and 10-15 digits
        return phoneRegex.test(phone);
    };

    const handleNext = async () => {
        if (phone && validatePhone(phone)) {
            await updateResponse(26, phone); // Save to step 26
            navigate('/contact-permission'); // Replace with the next route
        } else {
            setIsPhoneValid(false);
            setIsAlertOpen(true);
        }
    };

    const onClose = () => {
        setIsAlertOpen(false);
        setIsPhoneValid(true);
    };

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={4} totalSubSteps={24} title="Vos Informations de Contact" />
            <Box p={5} maxW="1000px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Veuillez entrer votre numéro de téléphone
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Nous vous contacterons avec des informations importantes sur votre investissement.
                </Text>
                <HStack justifyContent="center" spacing="4" flexWrap="wrap">
                    <Input
                        placeholder="Numéro de téléphone"
                        value={phone}
                        onChange={handleInputChange}
                        size="lg"
                        borderColor={isPhoneValid ? 'gray.200' : 'red.400'}
                    />
                </HStack>
                {phone && (
                    <Box borderWidth="1px" borderRadius="md" p={4} mt={4} textAlign="center" borderColor="green.400">
                        <Text fontSize="2xl" color="green.500">{phone}</Text>
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
                            {isPhoneValid ? "Numéro requis" : "Numéro invalide"}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {isPhoneValid
                                ? "Veuillez entrer un numéro de téléphone avant de continuer. 😊"
                                : "Le numéro de téléphone entré n'est pas valide. Veuillez vérifier et réessayer. 😊"}
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

export default InformationsDeContactPhone;
