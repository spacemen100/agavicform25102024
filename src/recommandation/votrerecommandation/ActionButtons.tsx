import React from 'react';
import { ChakraProvider, extendTheme, Box, HStack, Button, Icon, Text } from '@chakra-ui/react';
import { FaPhone } from 'react-icons/fa';

const theme = extendTheme({
  colors: {
    navy: '#0A1128',
    gray: {
      200: '#e2e8f0',
      500: '#718096',
    },
    white: '#FFFFFF',
    orange: '#FF8C00',
    green: {
      400: '#38A169',
    },
    blue: {
      400: '#3182CE',
    },
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Arial, sans-serif',
  },
});

const ActionButtons: React.FC = () => {
  const handleNext = () => {
    // Add your next button handler logic here
  };

  const navigate = (value: number) => {
    // Add your navigate logic here
  };

  return (
    <ChakraProvider theme={theme}>
      <Box py={4} px={8} textAlign="left" borderRadius="md" maxW="1000px" mx="auto" mt={8}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            colorScheme="gray"
            variant="outline"
            onClick={() => navigate(-1)}
            px={6}
            py={6}
            size="lg"
          >
            Retour
          </Button>
          <HStack spacing={4}>
            <Icon as={FaPhone} color="navy" />
            <Text fontSize="lg" color="navy">04 78 34 26 23</Text>
          </HStack>
          <Button
            colorScheme="green"
            onClick={handleNext}
            px={6}
            py={6}
            size="lg"
          >
            Valider ce projet
          </Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default ActionButtons;
