// src/components/SignUp.tsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { useUuid } from '../context/UuidContext'; // Utiliser le hook useUuid
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const SignUp: React.FC = () => {
  const { email: storedEmail, setEmail } = useUuid(); // Accéder au contexte
  const [emailLocal, setEmailLocal] = useState<string>(storedEmail || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ confirmPassword?: string }>({});
  const toast = useToast();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmailLocal(newEmail); // Mettre à jour l'état local
    setEmail(newEmail);      // Mettre à jour le contexte
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Les mots de passe ne correspondent pas.' }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Les mots de passe ne correspondent pas.' }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email: emailLocal, password });
    if (error) {
      toast({
        title: 'Erreur lors de l\'inscription',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else if (data.user) {
      toast({
        title: 'Inscription réussie',
        description: 'Veuillez vérifier votre e-mail pour confirmer votre inscription.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/signin');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Inscription
        </Text>

        {/* Alerte informative */}
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Inscription Obligatoire</AlertTitle>
            <AlertDescription>
              L'utilisation d'un compte est obligatoire pour souscrire afin de protéger vos données personnelles.
            </AlertDescription>
          </Box>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>

        <FormControl id="email" isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="email"
            placeholder="Votre e-mail"
            value={emailLocal}
            onChange={handleEmailChange}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Mot de passe</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Votre mot de passe"
              value={password}
              onChange={handlePasswordChange}
            />
            <InputRightElement h="full">
              <Button
                variant="ghost"
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="confirm-password" isRequired isInvalid={!!errors.confirmPassword}>
          <FormLabel>Confirmez le mot de passe</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirmez votre mot de passe"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <InputRightElement h="full">
              <Button
                variant="ghost"
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.confirmPassword && (
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          )}
        </FormControl>

        <Button colorScheme="blue" onClick={handleSignUp} width="full">
          S'inscrire
        </Button>
        <Text>
          Déjà un compte ? <Link to="/signin">Se connecter</Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default SignUp;
