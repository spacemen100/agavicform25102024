import React, { useState, useEffect } from 'react';
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
import { useUuid } from '../context/UuidContext';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const SignUp: React.FC = () => {
  const { uuid, getResponse } = useUuid();
  const [emailLocal, setEmailLocal] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ confirmPassword?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStoredEmail = async () => {
      try {
        const storedEmail = await getResponse(25);
        if (storedEmail) {
          setEmailLocal(storedEmail);
        }
      } catch (error) {
        console.error('Error fetching stored email:', error);
      }
    };
    fetchStoredEmail();
  }, [getResponse]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailLocal(e.target.value);
    setErrors(prev => ({ ...prev, general: undefined }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Les mots de passe ne correspondent pas.',
      }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Les mots de passe ne correspondent pas.',
      }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const validateInputs = () => {
    const newErrors: { confirmPassword?: string; general?: string } = {};
    
    if (!emailLocal) {
      newErrors.general = 'L\'email est requis';
      return false;
    }
    
    if (!password) {
      newErrors.general = 'Le mot de passe est requis';
      return false;
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      return false;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    try {
      if (!validateInputs()) {
        return;
      }

      setIsLoading(true);
      setErrors({});

      // Test connection to Supabase
      const { error: pingError } = await supabase.auth.getSession();
      if (pingError) {
        throw new Error('Unable to connect to authentication service');
      }

      const { data, error } = await supabase.auth.signUp({
        email: emailLocal,
        password,
        options: {
          emailRedirectTo: window.location.origin + '/auth/callback',
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        toast({
          title: 'Inscription réussie',
          description: 'Veuillez vérifier votre e-mail pour confirmer votre inscription.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/signin');
      }
    } catch (error) {
      console.error('SignUp error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription';
      
      toast({
        title: 'Erreur lors de l\'inscription',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      
      setErrors(prev => ({
        ...prev,
        general: errorMessage,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Inscription
        </Text>

        {errors.general && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <AlertDescription>{errors.general}</AlertDescription>
          </Alert>
        )}

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
            isDisabled={isLoading}
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
              isDisabled={isLoading}
            />
            <InputRightElement h="full">
              <Button
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                isDisabled={isLoading}
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
              isDisabled={isLoading}
            />
            <InputRightElement h="full">
              <Button
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                isDisabled={isLoading}
              >
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.confirmPassword && (
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          )}
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={handleSignUp}
          width="full"
          isLoading={isLoading}
          loadingText="Inscription en cours..."
        >
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