import React from 'react';
import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react';
import Stepper from './components/Stepper';
import SubStepCounter from './components/SubStepCounter';
import Header from './components/Header';
import Banner from './components/Banner';
import InvestmentComponent from './pages/InvestmentComponent';

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

const App: React.FC = () => {
  const currentStep = 1; // Example: the current step is "Projet"
  const currentSubStep = 1; // Example: current sub-step
  const totalSubSteps = 24; // Example: total number of sub-steps

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Banner />
      <Box padding="8" bg="gray.50" minH="100vh">
        <Stepper currentStep={currentStep} />
        <SubStepCounter currentSubStep={currentSubStep} totalSubSteps={totalSubSteps} />
      </Box>
      <InvestmentComponent/>
    </ChakraProvider>
  );
};

export default App;
