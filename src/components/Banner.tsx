import React from 'react';
import { Alert, AlertTitle, AlertDescription, CloseButton, Box, Link } from '@chakra-ui/react';

const Banner: React.FC = () => {
  return (
    <Alert status="warning" bg="#FFFAE5" color="#D69E2E" borderRadius="md" padding="4">
      <Box flex="1">
        <AlertTitle>Vous avez déjà réalisé une simulation ou initié une ouverture de compte ?</AlertTitle>
        <AlertDescription>
          <Link href="#" color="#D69E2E" fontWeight="bold">Reprenez votre parcours ici</Link>
          <br />
          Déjà client Yomoni ? <Link href="#" color="#D69E2E" fontWeight="bold">Connectez-vous en cliquant ici</Link>
        </AlertDescription>
      </Box>
      <CloseButton position="absolute" right="8px" top="8px" color="#D69E2E" />
    </Alert>
  );
};

export default Banner;
