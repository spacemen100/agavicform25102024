import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Link,
} from '@chakra-ui/react';

const ProjectModification: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [initialPayment, setInitialPayment] = useState('30 000 €');
  const [monthlyPayment, setMonthlyPayment] = useState('1 000 €');
  const [investmentHorizon, setInvestmentHorizon] = useState('10 ans');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
          <Button colorScheme="blue" mt={6} w="full" onClick={onClose}>
            Valider
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModification;
