import React, { useState } from 'react';
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
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUuid } from '../context/UuidContext';
import { supabase } from '../supabaseClient';
import { MdDiscount } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import Stepper from '../components/Stepper';

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

const NotificationPreferences: React.FC = () => {
    const [isNewsChecked, setIsNewsChecked] = useState(false);
    const [isPromoChecked, setIsPromoChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { uuid } = useUuid();
    const navigate = useNavigate();

    const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<boolean>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.checked);
    };

    const handleNext = async () => {
        try {
            const response = await supabase
                .from('notification_preferences')
                .insert([{ uuid, isNewsChecked, isPromoChecked }]);

            if (response.error) {
                throw response.error;
            }

            setSuccessMessage('Préférences enregistrées avec succès !');
            setTimeout(() => {
                navigate('/next-step');
            }, 2000);
        } catch (error) {
            setErrorMessage('Erreur lors de l\'enregistrement des préférences.');
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Stepper currentStep={1} />
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
                                onChange={handleCheckboxChange(setIsNewsChecked)}
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
                        <Box
                            p={4}
                            border="1px"
                            borderColor={isPromoChecked ? "green.400" : "gray.200"}
                            borderRadius="md"
                            boxShadow="sm"
                            w="100%"
                            bg={isPromoChecked ? "green.50" : "white"}
                        >
                            <Checkbox
                                isChecked={isPromoChecked}
                                onChange={handleCheckboxChange(setIsPromoChecked)}
                            >
                                <HStack spacing={3} align="flex-start">
                                    <MdDiscount size="24px" />
                                    <Box>
                                        <Text fontWeight="bold" color={isPromoChecked ? "green.500" : "black"}>
                                            Nos offres promotionnelles
                                        </Text>
                                        <Text fontSize="sm">Les bons plans Yomoni adaptés à votre projet d’épargne une à deux fois par mois.</Text>
                                    </Box>
                                </HStack>
                            </Checkbox>
                        </Box>
                    </VStack>
                </HStack>
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
                <Button
                    colorScheme="orange"
                    mt={6}
                    onClick={handleNext}
                    size="lg"
                    px={10}
                    py={6}
                    textAlign="center"
                    _hover={{ bg: 'orange.600' }}
                    borderRadius="md"
                >
                    Découvrir
                </Button>
                {errorMessage && (
                    <Alert status="error" mt={4} borderRadius="md">
                        <AlertIcon />
                        <Box flex="1">
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Box>
                        <CloseButton position="absolute" right="8px" top="8px" onClick={() => setErrorMessage(null)} />
                    </Alert>
                )}
                {successMessage && (
                    <Alert status="success" mt={4} borderRadius="md">
                        <AlertIcon />
                        <Box flex="1">
                            <AlertTitle>Succès</AlertTitle>
                            <AlertDescription>{successMessage}</AlertDescription>
                        </Box>
                        <CloseButton position="absolute" right="8px" top="8px" onClick={() => setSuccessMessage(null)} />
                    </Alert>
                )}
            </Box>
        </ChakraProvider>
    );
};

export default NotificationPreferences;
