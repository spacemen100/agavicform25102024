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
import StepperWithSubStepCounter from '../components/StepperWithSubStepCounter';
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
});

const NotificationPreferences = () => {
    const [isNewsChecked, setIsNewsChecked] = useState(false);
    const [isPromoChecked, setIsPromoChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const { uuid } = useUuid();
    const navigate = useNavigate();

    const handleCheckboxChange = (setter) => (event) => {
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
            <StepperWithSubStepCounter currentStep={1} currentSubStep={1} totalSubSteps={24} title="Préférences de notification" />
            <Box p={5} maxW="1000px" mx="auto" textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" mb={5}>
                    Bravo, vous allez découvrir la simulation de votre projet d’épargne.
                </Text>
                <HStack justifyContent="center" spacing="4" flexWrap="wrap">
                    <Image src="path/to/your/image.png" alt="Illustration" />
                    <VStack align="flex-start" spacing={4}>
                        <Text fontSize="lg" fontWeight="bold">Avant cela, dites-nous si vous souhaitez rester en contact.</Text>
                        <Text fontSize="md">Cochez les cases si vous souhaitez recevoir :</Text>
                        <Checkbox
                            isChecked={isNewsChecked}
                            onChange={handleCheckboxChange(setIsNewsChecked)}
                        >
                            <Box>
                                <Text fontWeight="bold">Les actualités et nos conseils</Text>
                                <Text fontSize="sm">Une newsletter mensuelle de nos experts pour décrypter l'actualité financière et mieux gérer votre épargne.</Text>
                            </Box>
                        </Checkbox>
                        <Checkbox
                            isChecked={isPromoChecked}
                            onChange={handleCheckboxChange(setIsPromoChecked)}
                        >
                            <Box>
                                <Text fontWeight="bold">Nos offres promotionnelles</Text>
                                <Text fontSize="sm">Les bons plans Yomoni adaptés à votre projet d’épargne une à deux fois par mois.</Text>
                            </Box>
                        </Checkbox>
                    </VStack>
                </HStack>
                <Button colorScheme="orange" mt={6} onClick={handleNext}>
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
