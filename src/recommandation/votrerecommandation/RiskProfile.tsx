import React, { useState } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  VStack,
  HStack,
  Switch,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Icon,
} from '@chakra-ui/react';
import { FaAward, FaLeaf, FaQuestionCircle } from 'react-icons/fa';
import ProfileSelection from '../modal/ProfileSelection';

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

const RiskProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ChakraProvider theme={theme}>
      <Box mt={5} p={5} maxW="400px" mx="auto" textAlign="left" borderRadius="md" boxShadow="md" bg="white">
        {/* Section 1: Votre projet */}
        <HStack justifyContent="space-between" mb={4}>
          <Text fontSize="lg" fontWeight="bold" color="blue.400">
            Votre projet
          </Text>
          <Link color="blue.400" onClick={openModal}>
            Modifier
          </Link>
        </HStack>
        <VStack align="stretch" spacing={2} mb={4}>
          <HStack justifyContent="space-between">
            <Text>Versement initial</Text>
            <Text>30 000 €</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Versement mensuel</Text>
            <Text>1 000 € / mois</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Horizon de placement</Text>
            <Text>10 ans</Text>
          </HStack>
        </VStack>

        {/* Section 2: Votre enveloppe */}
        <HStack justifyContent="space-between" mb={4}>
          <Text fontSize="lg" fontWeight="bold" color="blue.400">
            Votre enveloppe
          </Text>
          <Link color="blue.400" onClick={openModal}>
            Modifier
          </Link>
        </HStack>
        <HStack justifyContent="space-between" mb={4}>
          <HStack>
            <Box as={FaAward} color="blue.400" w={6} h={6} />
            <VStack align="start" spacing={0}>
            <Text>Assurance-vie</Text>
              <Text fontSize="sm" color="gray.500">Mandat d'arbitrage</Text>
            </VStack>
            <HStack spacing={1} ml={2}>
              <Icon as={FaQuestionCircle} color="gray.500" />
            </HStack>
          </HStack>
        </HStack>

        {/* Section 3: Votre allocation */}
        <HStack justifyContent="space-between" mb={4}>
          <Text fontSize="lg" fontWeight="bold" color="blue.400">
            Votre allocation
          </Text>
          <Link color="blue.400" onClick={openModal}>
            Modifier
          </Link>
        </HStack>
        <Text mb={4}>
          <Box as="span" mr={2} p={2} bg="blue.400" color="white" borderRadius="md">
            2
          </Box>
          Profil de risque : Prudent
        </Text>
        <Text mb={4}>
          Un profil de risque 2 chez Yomoni correspond à un profil de risque de 3 sur 7 sur l'échelle du SRI, l’indicateur européen de référence du risque.
        </Text>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack>
            <Text>Investissement responsable</Text>
            <FaLeaf color="green" />
          </HStack>
          <Switch colorScheme="blue" />
        </HStack>
      </Box>

      <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent maxWidth="90%">
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProfileSelection />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default RiskProfile;
