import React, { useState } from 'react';
import { Box, Button, SimpleGrid, Icon, Text, ChakraProvider } from '@chakra-ui/react';
import {
  FcApproval, FcDisapprove, FcProcess, FcBusinessContact, FcReadingEbook, FcManager, FcParallelTasks
} from 'react-icons/fc';
import StepperWithSubStepCounter from '../components/StepperWithSubStepCounter'; // Vérifiez le chemin d'importation

const QuelEstVotreProjetDInvestissement: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const buttons = [
    { label: 'Faire fructifier mon épargne', icon: FcApproval, key: 'fructifier' },
    { label: 'Épargner en cas de coup dur', icon: FcDisapprove, key: 'epargner' },
    { label: 'Préparer un achat important', icon: FcProcess, key: 'achat' },
    { label: 'Prévoir ma retraite', icon: FcBusinessContact, key: 'retraite' },
    { label: 'Transmettre mon patrimoine', icon: FcReadingEbook, key: 'patrimoine' },
    { label: 'Ouvrir un compte enfant', icon: FcManager, key: 'compte' },
    { label: 'Organiser ma trésorerie pro', icon: FcParallelTasks, key: 'tresorerie' },
  ];

  return (
    <ChakraProvider> {/* Enveloppez votre composant principal avec ChakraProvider */}
      <StepperWithSubStepCounter currentStep={1} currentSubStep={10} totalSubSteps={24} title="Parlons de votre projet" />
      <Box p={5} maxW="600px" mx="auto">
        <Text fontSize="xl" fontWeight="bold" mb={5} textAlign="center">Quel est votre projet d’investissement ?</Text>
        <SimpleGrid columns={[1, 2]} spacing={5}>
          {buttons.map(button => (
            <Button
              key={button.key}
              leftIcon={<Icon as={button.icon} boxSize={5} />}
              variant={selected === button.key ? 'solid' : 'outline'}
              colorScheme={selected === button.key ? 'green' : 'blue'}
              onClick={() => handleSelect(button.key)}
              justifyContent="flex-start"
              px={4}
              py={6}
            >
              <Box flex="1" textAlign="left">{button.label}</Box>
            </Button>
          ))}
        </SimpleGrid>
        <Button colorScheme="orange" mt={5} width="100%">Suivant</Button>
      </Box>
    </ChakraProvider>
  );
};

export default QuelEstVotreProjetDInvestissement;
