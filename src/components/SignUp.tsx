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
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast({
        title: 'Erreur lors de l\'inscription',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else if (user) {
      toast({
        title: 'Inscription réussie',
        description: 'Veuillez vérifier votre e-mail pour confirmer votre inscription.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/signin'); // Rediriger vers la page de connexion
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Inscription
        </Text>
        <FormControl id="email" isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="email"
            placeholder="Votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Mot de passe</FormLabel>
          <Input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
