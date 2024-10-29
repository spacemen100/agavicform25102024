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
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { useUuid } from '../context/UuidContext';
import { ViewIcon, ViewOffIcon, InfoIcon, CheckIcon } from '@chakra-ui/icons';

const SignUp = () => {
  const { uuid, getResponse } = useUuid();
  const [emailLocal, setEmailLocal] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStoredEmail = async () => {
      try {
        const storedEmail = await getResponse(25);
        console.log('Email récupéré depuis getResponse:', storedEmail);
        if (storedEmail) {
          setEmailLocal(storedEmail);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'email stocké:', error);
      }
    };
    fetchStoredEmail();
  }, [getResponse]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'L\'email est requis';
    if (!emailRegex.test(email)) return 'Format d\'email invalide';
    return '';
  };

  const validatePassword = (pass: string) => {
    if (!pass) return 'Le mot de passe est requis';
    if (pass.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
    if (!/[A-Z]/.test(pass)) return 'Le mot de passe doit contenir au moins une majuscule';
    if (!/[a-z]/.test(pass)) return 'Le mot de passe doit contenir au moins une minuscule';
    if (!/[0-9]/.test(pass)) return 'Le mot de passe doit contenir au moins un chiffre';
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmailLocal(email);
    const emailError = validateEmail(email);
    setErrors(prev => ({ ...prev, email: emailError, general: undefined }));
    console.log('Email changé:', email, 'Erreur email:', emailError);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value;
    setPassword(pass);
    const passwordError = validatePassword(pass);
    setErrors(prev => ({
      ...prev,
      password: passwordError,
      confirmPassword: pass !== confirmPassword ? 'Les mots de passe ne correspondent pas' : undefined,
    }));
    console.log('Mot de passe changé:', pass, 'Erreur mot de passe:', passwordError);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPass = e.target.value;
    setConfirmPassword(confirmPass);
    setErrors(prev => ({
      ...prev,
      confirmPassword: password !== confirmPass ? 'Les mots de passe ne correspondent pas' : undefined,
    }));
    console.log('Confirmation mot de passe changée:', confirmPass);
  };

  const handleSignUp = async () => {
    try {
      const emailError = validateEmail(emailLocal);
      const passwordError = validatePassword(password);
      const confirmError = password !== confirmPassword ? 'Les mots de passe ne correspondent pas' : '';

      if (emailError || passwordError || confirmError) {
        setErrors({
          email: emailError,
          password: passwordError,
          confirmPassword: confirmError,
        });
        console.log('Erreur de validation:', { emailError, passwordError, confirmError });
        return;
      }

      setIsLoading(true);
      console.log('Tentative d\'inscription avec email:', emailLocal, 'password:', password);

      const { data, error } = await supabase.auth.signUp({
        email: emailLocal,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      
    

      console.log('Données de Supabase reçues après inscription:', data);

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
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription';
      console.error('Erreur lors de l\'inscription:', errorMessage);

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

        <FormControl isRequired isInvalid={!!errors.email}>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="email"
            placeholder="Votre e-mail"
            value={emailLocal}
            onChange={handleEmailChange}
            isDisabled={isLoading}
          />
          {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.password}>
          <FormLabel>
            Mot de passe
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowRequirements(!showRequirements)}
              ml={2}
            >
              <InfoIcon />
            </Button>
          </FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Votre mot de passe"
              value={password}
              onChange={handlePasswordChange}
              isDisabled={isLoading}
              onFocus={() => setShowRequirements(true)}
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
          {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
          {showRequirements && (
            <Box mt={2} p={3} bg="gray.50" borderRadius="md">
              <List spacing={2} fontSize="sm">
                <ListItem>
                  <ListIcon as={password.length >= 8 ? CheckIcon : InfoIcon} color={password.length >= 8 ? 'green.500' : 'gray.500'} />
                  Au moins 8 caractères
                </ListItem>
                <ListItem>
                  <ListIcon as={/[A-Z]/.test(password) ? CheckIcon : InfoIcon} color={/[A-Z]/.test(password) ? 'green.500' : 'gray.500'} />
                  Au moins une majuscule
                </ListItem>
                <ListItem>
                  <ListIcon as={/[a-z]/.test(password) ? CheckIcon : InfoIcon} color={/[a-z]/.test(password) ? 'green.500' : 'gray.500'} />
                  Au moins une minuscule
                </ListItem>
                <ListItem>
                  <ListIcon as={/[0-9]/.test(password) ? CheckIcon : InfoIcon} color={/[0-9]/.test(password) ? 'green.500' : 'gray.500'} />
                  Au moins un chiffre
                </ListItem>
              </List>
            </Box>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.confirmPassword}>
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
          isDisabled={Object.keys(errors).some(key => !!errors[key as keyof typeof errors])}
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
