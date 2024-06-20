import React, { useState, useEffect } from 'react';
import {
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
import { supabase } from './../../supabaseClient'; // Importez votre client Supabase

const alertMessages: { [key: string]: string } = {
  epargner: "Vous ne pouvez pas sélectionner un PEA (qui présente un profil de risque 10) car vous avez indiqué à la question 1 vouloir 'Épargner en cas de coup dur', ainsi seuls les profils prudents (inférieur à 4) peuvent vous être accessibles. Vous pouvez toujours revoir votre projet en étape 1.",
  achat: "Vous ne pouvez pas sélectionner un PEA (qui présente un profil de risque 10) car vous avez indiqué à la question 1 vouloir 'Préparer un achat important', ainsi seuls les profils prudents (inférieur à 4) peuvent vous être accessibles. Vous pouvez toujours revoir votre projet en étape 1.",
  retraite: "Vous ne pouvez pas sélectionner un PEA (qui présente un profil de risque 10) car vous avez indiqué à la question 1 vouloir 'Prévoir ma retraite', ainsi seuls les profils prudents (inférieur à 4) peuvent vous être accessibles. Vous pouvez toujours revoir votre projet en étape 1.",
};

interface EnvelopeSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProject: string | null;
}

const EnvelopeSelection: React.FC<EnvelopeSelectionProps> = ({ isOpen, onClose, selectedProject }) => {
  const [selectedEnvelope, setSelectedEnvelope] = useState<string>('AV');
  const [step1Response, setStep1Response] = useState<string | null>(null);

  useEffect(() => {
    const fetchStep1Response = async () => {
      const { data, error } = await supabase
        .from('form_responses')
        .select('step1')
        .eq('id', 'some-unique-identifier') // Remplacez par l'ID de l'utilisateur ou autre critère
        .single();

      if (error) {
        console.error('Error fetching step1 response:', error);
      } else {
        setStep1Response(data?.step1 || null);
      }
    };

    if (isOpen) {
      fetchStep1Response();
    }
  }, [isOpen]);

  const isPEADisabled = step1Response && alertMessages[step1Response];

  useEffect(() => {
    if (isPEADisabled) {
      setSelectedEnvelope('AV');
    }
  }, [isPEADisabled]);

  const handleEnvelopeSelection = (envelope: string) => {
    if (envelope !== 'PEA' || !isPEADisabled) {
      setSelectedEnvelope(envelope);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choisir une nouvelle enveloppe</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isPEADisabled && (
            <Box p={4} bg="red.50" borderRadius="md" mb={4}>
              <Text color="red.500" fontSize="sm">
                {alertMessages[step1Response!]} <Link color="blue.400">revoir votre projet en étape 1</Link>.
              </Text>
            </Box>
          )}
          <HStack spacing={4} alignItems="stretch">
            <VStack
              p={4}
              borderRadius="md"
              boxShadow="md"
              bg={selectedEnvelope === 'AV' ? 'orange.100' : 'white'}
              border="1px solid"
              borderColor={selectedEnvelope === 'AV' ? 'orange.400' : 'gray.200'}
              flex="1"
              align="start"
              spacing={3}
              onClick={() => handleEnvelopeSelection('AV')}
              cursor="pointer"
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
              bg={selectedEnvelope === 'PEA' ? 'pink.100' : 'white'}
              border="1px solid"
              borderColor={selectedEnvelope === 'PEA' ? 'pink.400' : 'gray.200'}
              flex="1"
              align="start"
              spacing={3}
              onClick={() => handleEnvelopeSelection('PEA')}
              cursor={isPEADisabled ? 'not-allowed' : 'pointer'}
              opacity={isPEADisabled ? 0.5 : 1}
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
              bg={selectedEnvelope === 'CTO' ? 'blue.100' : 'white'}
              border="1px solid"
              borderColor={selectedEnvelope === 'CTO' ? 'blue.400' : 'gray.200'}
              flex="1"
              align="start"
              spacing={3}
              onClick={() => handleEnvelopeSelection('CTO')}
              cursor="pointer"
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
          <Button colorScheme="orange" mt={4} w="full" onClick={onClose}>
            Valider
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EnvelopeSelection;
