// src/components/SignIn.tsx
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
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { useUuid } from '../context/UuidContext'; // Utiliser le hook useUuid
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const SignIn: React.FC = () => {
  const { email: storedEmail, setEmail } = useUuid(); // Accéder au contexte
  const [emailLocal, setEmailLocal] = useState<string>(storedEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmailLocal(newEmail); // Mettre à jour l'état local
    setEmail(newEmail);      // Mettre à jour le contexte
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email: emailLocal, password });
    if (error) {
      toast({
        title: 'Erreur lors de la connexion',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else if (data.user) {
      toast({
        title: 'Connexion réussie',
        description: `Bienvenue ${data.user.email}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/'); // Rediriger vers la page souhaitée
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Connexion
        </Text>

        {/* Alerte informative */}
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Connexion Obligatoire</AlertTitle>
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
              onChange={(e) => setPassword(e.target.value)}
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

        <Button colorScheme="blue" onClick={handleSignIn} width="full">
          Se connecter
        </Button>
        <Text>
          Pas de compte ? <Link to="/signup">S'inscrire</Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default SignIn;
