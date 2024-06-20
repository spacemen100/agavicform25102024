import React from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  HStack,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { FaChartPie } from 'react-icons/fa';

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

const AssetAllocationCircularProgress: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box
        mt={5}
        p={5}
        maxW="300px"
        mx="auto"
        textAlign="left"
        borderRadius="md"
        boxShadow="md"
        bg="white"
      >
        <HStack spacing={3} alignItems="center" mb={3}>
          <Box
            as="span"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.100"
            borderRadius="full"
            p={2}
          >
            <Icon as={FaChartPie} color="blue.500" />
          </Box>
          <Text fontSize="md" fontWeight="bold" color="gray.600">
            Répartition par type d'actifs
          </Text>
        </HStack>
        <Box display="flex" justifyContent="space-between">
          <CircularProgress value={15} size="80px" color="blue.300" thickness="12px">
            <CircularProgressLabel>15.0%</CircularProgressLabel>
          </CircularProgress>
          <CircularProgress value={15} size="80px" color="blue.300" thickness="12px">
            <CircularProgressLabel>15.0%</CircularProgressLabel>
          </CircularProgress>
          <CircularProgress value={70} size="80px" color="gray.300" thickness="12px">
            <CircularProgressLabel>70.0%</CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default AssetAllocationCircularProgress;
