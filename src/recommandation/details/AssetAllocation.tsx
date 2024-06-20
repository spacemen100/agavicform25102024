import React from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  VStack,
  HStack,
  Collapse,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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

const data = {
  labels: ['Obligations', 'Actions', 'Autres'],
  datasets: [
    {
      data: [15, 15, 70],
      backgroundColor: ['#3182CE', '#3182CE', '#CBD5E0'],
      hoverBackgroundColor: ['#63B3ED', '#63B3ED', '#E2E8F0'],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutoutPercentage: 70,
  legend: {
    display: false,
  },
};

const AssetAllocation: React.FC = () => {
  const [isObligationsOpen, setIsObligationsOpen] = React.useState(true);
  const [isActionsOpen, setIsActionsOpen] = React.useState(true);

  const toggleObligations = () => setIsObligationsOpen(!isObligationsOpen);
  const toggleActions = () => setIsActionsOpen(!isActionsOpen);

  return (
    <ChakraProvider theme={theme}>
      <Box mt={5} p={5}  mx="auto" textAlign="left" borderRadius="md" boxShadow="md" bg="white">
        <HStack mb={4}>
          <Box as="span" mr={2} p={2} bg="blue.400" color="white" borderRadius="md">
            <Icon as={FaChevronDown} />
          </Box>
          <Text fontSize="lg" fontWeight="bold" color="blue.400">
            Répartition par type d'actifs
          </Text>
        </HStack>
        <HStack alignItems="start">
          <Box w="40%">
            <Doughnut data={data} options={options} width={150} height={150} />
          </Box>
          <VStack w="60%" align="stretch">
            <HStack justifyContent="space-between">
              <Text fontWeight="bold" color="blue.400">15,0% Obligations</Text>
              <IconButton
                icon={isObligationsOpen ? <FaChevronUp /> : <FaChevronDown />}
                onClick={toggleObligations}
                variant="ghost"
                aria-label="Toggle Obligations"
              />
            </HStack>
            <Collapse in={isObligationsOpen}>
              <VStack align="start" pl={4}>
                <Text>7,5% Obligations zone Euro diversifiées</Text>
                <Text>4,9% Bons du Trésor zone Euro</Text>
                <Text>2,6% Obligations d'entreprises zone Euro</Text>
              </VStack>
            </Collapse>
            <HStack justifyContent="space-between">
              <Text fontWeight="bold" color="blue.400">15,0% Actions</Text>
              <IconButton
                icon={isActionsOpen ? <FaChevronUp /> : <FaChevronDown />}
                onClick={toggleActions}
                variant="ghost"
                aria-label="Toggle Actions"
              />
            </HStack>
            <Collapse in={isActionsOpen}>
              <VStack align="start" pl={4}>
                <Text>3,5% Actions États-Unis</Text>
                <Text>3,4% Actions Monde couvertes</Text>
                <Text>2,5% Actions États-Unis couvertes</Text>
                <Text>2,0% Actions Monde</Text>
                <Text>1,9% Actions Pays Émergents</Text>
                <Text>0,6% Actions Europe</Text>
                <Text>0,6% Actions Europe couvertes</Text>
                <Text>0,3% Actions Japon</Text>
                <Text>0,2% Actions Japon couvertes</Text>
              </VStack>
            </Collapse>
            <Text fontWeight="bold" color="gray.500">70,0% Autres</Text>
            <VStack align="start" pl={4}>
              <Text>70,0% Fonds Euro</Text>
            </VStack>
          </VStack>
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default AssetAllocation;
