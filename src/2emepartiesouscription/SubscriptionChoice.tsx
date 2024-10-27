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
import { CheckIcon, PhoneIcon } from '@chakra-ui/icons';

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

const SubscriptionChoice: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsAlertOpen(true); // Affiche l'alerte pour confirmer le choix
    };

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="600px" mx="auto" textAlign="center">
                <Text fontSize="xl" fontWeight="bold" mb={5}>
                    Choisissez une option pour continuer
                </Text>
                <VStack spacing={4}>
                    <Button
                        leftIcon={<CheckIcon />}
                        colorScheme="blue"
                        size="lg"
                        onClick={() => handleSelect('online')}
                        width="100%"
                    >
                        Je souhaite continuer en souscrivant directement en ligne
                    </Button>
                    <Button
                        leftIcon={<PhoneIcon />}
                        colorScheme="green"
                        size="lg"
                        onClick={() => handleSelect('callback')}
                        width="100%"
                    >
                        Je souhaite être rappelé par un conseiller
                    </Button>
                </VStack>

                {/* Alerte de confirmation du choix */}
                <AlertDialog
                    isOpen={isAlertOpen}
                    leastDestructiveRef={cancelRef} // Référence pour le bouton moins destructif
                    onClose={onClose}
                    isCentered
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                {selectedOption === 'online' ? 'Souscription en ligne' : 'Rappel par un conseiller'}
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                {selectedOption === 'online'
                                    ? 'Vous avez choisi de continuer la souscription en ligne.'
                                    : 'Un conseiller vous contactera sous peu pour répondre à vos questions.'}
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

export default SubscriptionChoice;
