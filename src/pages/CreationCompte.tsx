import React, { useState } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    InputGroup,
    Input,
    InputRightElement,
    Button,
    VStack,
    Link,
    Checkbox,
} from '@chakra-ui/react';
import { EmailIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
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

const CreationCompte: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const { uuid } = useUuid();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setIsEmailValid(event.target.value.includes('@'));
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setIsPasswordValid(event.target.value.length >= 6);
    };

    const handleShowClick = () => setShowPassword(!showPassword);

    const handleCreateAccount = async () => {
        if (isEmailValid && email !== '' && isPasswordValid && password !== '' && isTermsAccepted) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                console.error('Error creating account:', error);
                return;
            }

            const user = data?.user;

            if (user) {
                // Link the user's UUID with their Supabase user ID
                const { error: insertError } = await supabase
                    .from('responses')
                    .update({ user_id: user.id })
                    .eq('uuid', uuid);

                if (insertError) {
                    console.error('Error linking UUID with user:', insertError);
                } else {
                    // Redirect to a confirmation page or dashboard
                    window.location.href = '/dashboard'; // Adjust the redirection as needed
                }
            }
        } else {
            if (!isEmailValid || email === '') {
                setIsEmailValid(false);
            }
            if (!isPasswordValid || password === '') {
                setIsPasswordValid(false);
            }
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="400px" mx="auto" textAlign="center">
                <Text fontSize="xl" fontWeight="bold" mb={5}>
                    Créez votre compte
                </Text>
                <VStack spacing={4}>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type="email"
                            placeholder="Votre e-mail"
                            value={email}
                            onChange={handleEmailChange}
                            isInvalid={!isEmailValid}
                        />
                        <InputRightElement width="3rem">
                            <EmailIcon color="gray.500" />
                        </InputRightElement>
                    </InputGroup>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Votre mot de passe"
                            value={password}
                            onChange={handlePasswordChange}
                            isInvalid={!isPasswordValid}
                        />
                        <InputRightElement width="3rem">
                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Checkbox
                        isChecked={isTermsAccepted}
                        onChange={(e) => setIsTermsAccepted(e.target.checked)}
                    >
                        J'accepte les{' '}
                        <Link color="blue.500" href="https://www.yomoni.fr/politique-de-confidentialite">
                            conditions d'utilisation et la politique de confidentialité
                        </Link>
                    </Checkbox>
                    <Button
                        colorScheme="blue"
                        width="100%"
                        onClick={handleCreateAccount}
                        isDisabled={!isEmailValid || email === '' || !isPasswordValid || password === '' || !isTermsAccepted}
                    >
                        Créer un compte
                    </Button>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default CreationCompte;
