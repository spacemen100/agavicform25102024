import React, { useState } from 'react';
import { ChakraProvider, extendTheme, Box, Text, Button, HStack, Image } from '@chakra-ui/react';
import StepperWithSubStepCounter from '../components/StepperWithSubStepCounter'; // Adjust the import path as necessary

const theme = extendTheme({
  colors: {
    navy: '#0A1128',
    gray: {
      200: '#e2e8f0',
      500: '#718096',
    },
    white: '#FFFFFF',
    orange: '#FF8C00',
  },
});

const investmentOptions = [5000, 10000, 30000, 50000, 150000];

const InvestmentComponent = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const currentSubStep = 10;
  const totalSubSteps = 24;
  const title = "Parlons de votre projet";

  return (
    <ChakraProvider theme={theme}>
      <Box padding="8" bg="gray.50" minH="100vh">
        <StepperWithSubStepCounter
          currentStep={1}
          currentSubStep={currentSubStep}
          totalSubSteps={totalSubSteps}
          title={title}
        />
        <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="4">
          Quel montant souhaitez-vous placer chez Yomoni ?
        </Text>
        <Text fontSize="md" textAlign="center" mb="6">
          Sélectionnez parmi les choix suivants :
        </Text>
        <HStack justifyContent="center" spacing="4" wrap="wrap">
          {investmentOptions.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="lg"
              colorScheme={selectedAmount === amount ? 'green' : 'gray'}
              borderColor={selectedAmount === amount ? 'green.400' : 'gray.200'}
              onClick={() => setSelectedAmount(amount)}
            >
              {amount.toLocaleString('fr-FR')} €
            </Button>
          ))}
        </HStack>
        {selectedAmount !== null && (
          <Box textAlign="center" mt="4">
            <Text fontSize="2xl" color="green.500">
              {selectedAmount.toLocaleString('fr-FR')} €
            </Text>
          </Box>
        )}
        <Box textAlign="center" mt="8">
          <HStack justifyContent="center" spacing="4">
            <Image
              borderRadius="full"
              boxSize="40px"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />
            <Text>
              Avec Yomoni, votre épargne n'est pas bloquée : vous pouvez continuer d'investir dès votre compte ouvert et retirer à tout moment.
            </Text>
          </HStack>
        </Box>
        <HStack justifyContent="center" mt="8" spacing="4">
          <Button colorScheme="gray" variant="outline">
            Retour
          </Button>
          <Button colorScheme="green">
            Suivant
          </Button>
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default InvestmentComponent;
