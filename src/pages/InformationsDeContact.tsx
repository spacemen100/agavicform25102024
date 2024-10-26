import React, { useState, useRef } from 'react';
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
    AlertDialogOverlay
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

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

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleNext = () => {
        if (email && validateEmail(email)) {
            // Ici, vous pouvez enregistrer l'e-mail ou passer à la prochaine étape
            navigate('/prochaine-etape');
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
            <Box p={5} maxW="600px" mx="auto">
                <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">
                    Informations de contact
                </Text>
                <Text fontSize="md" textAlign="center" mb={6}>
                    Veuillez entrer votre adresse e-mail pour rester informé.
                </Text>
                <HStack justifyContent="center" spacing="4" flexWrap="wrap">
                    <Input
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="lg"
                        borderColor={isEmailValid ? 'gray.200' : 'red.400'}
                    />
                </HStack>
                <HStack justifyContent="flex-end" mt="8" spacing="4">
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
                </HStack>

                <AlertDialog
                    isOpen={isAlertOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
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
            </Box>
        </ChakraProvider>
    );
};

export default InformationsDeContact;
