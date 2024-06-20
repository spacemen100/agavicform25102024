import React, { useState } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

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

const ProjectModification: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [initialPayment, setInitialPayment] = useState('30 000 €');
  const [monthlyPayment, setMonthlyPayment] = useState('1 000 €');
  const [investmentHorizon, setInvestmentHorizon] = useState('10 ans');

  const closeModal = () => setIsModalOpen(false);

  return (
    <ChakraProvider theme={theme}>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modification de votre projet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold">Versement initial</Text>
                <Text color="gray.500" mb={2}>Il s'agit du 1er versement réalisé sur votre contrat Yomoni.</Text>
                <Input
                  value={initialPayment}
                  onChange={(e) => setInitialPayment(e.target.value)}
                  size="md"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Versement mensuel</Text>
                <Text color="gray.500" mb={2}>55% de nos clients placent en moyenne 200 € / mois.</Text>
                <Input
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  size="md"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Horizon de placement</Text>
                <Text color="gray.500" mb={2}>Votre investissement reste disponible à tout moment.</Text>
                <Input
                  value={investmentHorizon}
                  onChange={(e) => setInvestmentHorizon(e.target.value)}
                  size="md"
                />
              </Box>
            </VStack>
            <Button colorScheme="blue" mt={6} w="full" onClick={closeModal}>
              Valider
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default ProjectModification;
