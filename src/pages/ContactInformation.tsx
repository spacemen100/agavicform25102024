import React, { useState } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Input,
    Button,
    VStack,
    FormControl,
    FormLabel,
    FormHelperText,
} from '@chakra-ui/react';
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
        green: {
            400: '#38A169',
        },
        blue: {
            400: '#3182CE',
        },
    },
});

const ContactInformation: React.FC = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleNext = () => {
        // Logique pour sauvegarder les données ou valider les entrées
        navigate('/next-step'); // Remplacez par la route suivante appropriée
    };

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="500px" mx="auto" mt={10}>
                <Text fontSize="2xl" fontWeight="bold" mb={5} textAlign="center">
                    Informations de contact
                </Text>
                <VStack spacing={5}>
                    <FormControl id="email">
                        <FormLabel>Adresse e-mail :</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Entrez votre adresse e-mail"
                        />
                        <FormHelperText>Nous ne partagerons jamais votre adresse e-mail.</FormHelperText>
                    </FormControl>
                    <FormControl id="phone">
                        <FormLabel>Numéro de téléphone mobile :</FormLabel>
                        <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Entrez votre numéro de téléphone"
                        />
                    </FormControl>
                </VStack>
                <Box mt={8} display="flex" justifyContent="flex-end">
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
        </ChakraProvider>
    );
};

export default ContactInformation;
