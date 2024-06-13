import React from 'react';
import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react';
import Stepper from './components/Stepper';
import Header from './components/Header';

const theme = extendTheme({
  colors: {
    navy: '#0A1128',
    gray: {
      200: '#e2e8f0',
      500: '#718096',
    },
    white: '#FFFFFF',
  },
});

const steps = [
  { number: 1, label: 'Projet' },
  { number: 2, label: 'Recommandation' },
  { number: 3, label: 'Souscription' },
  { number: 4, label: 'Justificatifs' },
  { number: 5, label: 'Signature' },
];

const App: React.FC = () => {
  const currentStep = 1; // Example: the current step is "Projet"

  return (
    <ChakraProvider theme={theme}>
      <Header/>
      <Box padding="8" bg="gray.50" minH="100vh">
        <Stepper currentStep={currentStep} steps={steps} />
        {/* Other components */}
      </Box>
    </ChakraProvider>
  );
};

export default App;
