import React from 'react';
import { Box, Button, Stack, Heading } from '@chakra-ui/react';

const Project: React.FC = () => {
  return (
    <Box maxW="600px" mx="auto" py={10}>
      <Heading mb={6}>Quel est votre projet d'investissement ?</Heading>
      <Stack spacing={4}>
        <Button variant="outline">Faire fructifier mon épargne</Button>
        <Button variant="outline">Epargner en cas de coup dur</Button>
        <Button variant="outline">Préparer un achat important</Button>
        <Button variant="outline">Prévoir ma retraite</Button>
        <Button variant="outline">Transmettre mon patrimoine</Button>
        <Button variant="outline">Ouvrir un compte enfant</Button>
        <Button variant="outline">Organiser ma trésorerie pro</Button>
      </Stack>
      <Button mt={6} colorScheme="teal">Suivant</Button>
    </Box>
  );
};

export default Project;
