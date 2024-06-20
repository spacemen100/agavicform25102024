import React, { useState } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Link,
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
    pink: {
      400: '#DD6B20',
    },
    yellow: {
      400: '#ECC94B',
    },
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Arial, sans-serif',
  },
});

const EnvelopeSelection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <ChakraProvider theme={theme}>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choisir une nouvelle enveloppe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p={4} bg="red.50" borderRadius="md" mb={4}>
              <Text color="red.500" fontSize="sm">
                Vous ne pouvez pas sélectionner un PEA (qui présente un profil de risque 10) car vous avez indiqué à la question 1 vouloir "Épargner en cas de coup dur", ainsi seuls les profils prudents (inférieur à 4) peuvent vous être accessibles. Vous pouvez toujours revoir votre projet en étape 1.
              </Text>
            </Box>
            <HStack spacing={4} alignItems="stretch">
              <VStack
                p={4}
                borderRadius="md"
                boxShadow="md"
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                flex="1"
                align="start"
                spacing={3}
              >
                <HStack spacing={2}>
                  <Box as="span" bg="orange.400" p={2} borderRadius="md" color="white" fontWeight="bold">AV</Box>
                  <Text fontSize="lg" fontWeight="bold">Assurance-vie</Text>
                </HStack>
                <Text color="green.400">Notre recommandation au vu de votre profil</Text>
                <VStack align="start" spacing={1}>
                  <Text>✓ Argent disponible à tout moment (sans clôture du contrat)</Text>
                  <Text>✓ Fiscalité réduite à partir de la 8ème année en cas de rachat</Text>
                  <Text>✓ Investissement en fonds euros (capital garanti), obligations et actions selon le profil de risque</Text>
                  <Text>✓ Pas de plafond de versement</Text>
                </VStack>
              </VStack>
              <VStack
                p={4}
                borderRadius="md"
                boxShadow="md"
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                flex="1"
                align="start"
                spacing={3}
              >
                <HStack spacing={2}>
                  <Box as="span" bg="pink.400" p={2} borderRadius="md" color="white" fontWeight="bold">PEA</Box>
                  <Text fontSize="lg" fontWeight="bold">Plan d'épargne en actions</Text>
                </HStack>
                <Text color="red.400">Vous allez passer automatiquement à un profil de risque 10</Text>
                <VStack align="start" spacing={1}>
                  <Text>✓ Argent disponible à tout moment (retraits partiels sans clôture du contrat après 5 ans)</Text>
                  <Text>✓ Fiscalité réduite à partir de la 5ème année en cas de retrait</Text>
                  <Text>✓ Investissement 100% en actions</Text>
                  <Text>✓ Plafond de versement à 150 000 euros (hors gains et plus-values)</Text>
                  <Text>✓ Possibilité de transférer un contrat PEA existant</Text>
                </VStack>
              </VStack>
              <VStack
                p={4}
                borderRadius="md"
                boxShadow="md"
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                flex="1"
                align="start"
                spacing={3}
              >
                <HStack spacing={2}>
                  <Box as="span" bg="blue.400" p={2} borderRadius="md" color="white" fontWeight="bold">CTO</Box>
                  <Text fontSize="lg" fontWeight="bold">Compte-titres</Text>
                </HStack>
                <Text color="red.400">Vous allez passer automatiquement d'un profil de risque 2 à un profil de risque 3</Text>
                <VStack align="start" spacing={1}>
                  <Text>✓ Argent disponible à tout moment (sans clôture du contrat)</Text>
                  <Text>✓ Fiscalité standard incluse dans la déclaration des revenus en cours</Text>
                  <Text>✓ Investissement en obligations et actions</Text>
                  <Text>✓ Pas de plafond de versement</Text>
                </VStack>
              </VStack>
            </HStack>
            <Text textAlign="center" mt={4}>
              <Link color="blue.400">Ouvrir ou transférer un Plan d'épargne retraite (PER)</Link>
            </Text>
            <Button colorScheme="orange" mt={4} w="full" onClick={closeModal}>
              Valider
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default EnvelopeSelection;
