import React, { useState, useEffect, useRef } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Checkbox,
    Button,
    VStack,
    Image,
    HStack,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
import { MdDiscount } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import Stepper from '../components/Stepper';
import { useUuid } from '../context/UuidContext';
import { supabase } from '../supabaseClient';

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
    fonts: {
        body: 'Arial, sans-serif',
        heading: 'Arial, sans-serif',
    },
});

interface FormResponse {
    step25: string | null;
}

const NotificationPreferences: React.FC = () => {
    const [isNewsChecked, setIsNewsChecked] = useState<boolean>(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const { uuid, updateResponse, getResponse } = useUuid();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResponse = async () => {
            const response: FormResponse | null = await getResponse(25);
            console.log("Fetched response:", response);
            if (response && response.step25 !== null) {
                setIsNewsChecked(response.step25 === 'oui');
            }
        };

        fetchResponse();
    }, [getResponse]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsNewsChecked(event.target.checked);
    };

    const handleNext = async () => {
        try {
            const response = await supabase
                .from('form_responses')
                .update({ step25: isNewsChecked ? 'oui' : 'non' })
                .eq('uuid', uuid);

            if (response.error) {
                throw response.error;
            }

            navigate('/next-step');
        } catch (error) {
            console.error("Error updating response:", error);
            setIsAlertOpen(true);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Stepper currentStep={25} />
            <Box mt={5} p={5} pt={10} maxW="1000px" mx="auto" textAlign="center" borderRadius="md" boxShadow="md" bg="white">
                <Text fontSize="2xl" fontWeight="bold" mb={5}>
                    Bravo, vous allez découvrir la simulation de votre projet d’épargne.
                </Text>
                <HStack justifyContent="space-between" alignItems="flex-start" spacing={10}>
                    <Image src="/newsletter.png" alt="Illustration" boxSize="300px" borderRadius="md" />
                    <VStack align="flex-start" spacing={4} maxW="600px">
                        <Text fontSize="lg" fontWeight="bold">Avant cela, dites-nous si vous souhaitez rester en contact.</Text>
                        <Text fontSize="md">Cochez les cases si vous souhaitez recevoir :</Text>
                        <Box
                            p={4}
                            border="1px"
                            borderColor={isNewsChecked ? "green.400" : "gray.200"}
                            borderRadius="md"
                            boxShadow="sm"
                            w="100%"
                            bg={isNewsChecked ? "green.50" : "white"}
                        >
                            <Checkbox
                                isChecked={isNewsChecked}
                                onChange={handleCheckboxChange}
                            >
                                <HStack spacing={3} align="flex-start">
                                    <BiNews size="24px" />
                                    <Box>
                                        <Text fontWeight="bold" color={isNewsChecked ? "green.500" : "black"}>
                                            Les actualités et nos conseils
                                        </Text>
                                        <Text fontSize="sm">Une newsletter mensuelle de nos experts pour décrypter l'actualité financière et mieux gérer votre épargne.</Text>
                                    </Box>
                                </HStack>
                            </Checkbox>
                        </Box>
                    </VStack>
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
            </Box>
        </ChakraProvider>
    );
};

export default NotificationPreferences;
