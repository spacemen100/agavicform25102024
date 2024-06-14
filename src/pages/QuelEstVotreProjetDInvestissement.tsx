import React from 'react';
import { Box, Button, SimpleGrid, Icon, Text } from "@chakra-ui/react";
import {
  FcApproval, FcDisapprove, FcProcess, FcBusinessContact, FcReadingEbook, FcManager, FcParallelTasks
} from "react-icons/fc";

const QuelEstVotreProjetDInvestissement = () => {
  return (
    <Box p={5} maxW="600px" mx="auto">
      <Text fontSize="xl" fontWeight="bold" mb={5}>Quel est votre projet d’investissement ?</Text>
      <SimpleGrid columns={[1, 2]} spacing={5}>
        <Button leftIcon={<Icon as={FcApproval} />} variant="outline" colorScheme="blue">
          Faire fructifier mon épargne
        </Button>
        <Button leftIcon={<Icon as={FcDisapprove} />} variant="outline" colorScheme="blue">
          Épargner en cas de coup dur
        </Button>
        <Button leftIcon={<Icon as={FcProcess} />} variant="outline" colorScheme="blue">
          Préparer un achat important
        </Button>
        <Button leftIcon={<Icon as={FcBusinessContact} />} variant="outline" colorScheme="blue">
          Prévoir ma retraite
        </Button>
        <Button leftIcon={<Icon as={FcReadingEbook} />} variant="outline" colorScheme="blue">
          Transmettre mon patrimoine
        </Button>
        <Button leftIcon={<Icon as={FcManager} />} variant="outline" colorScheme="blue">
          Ouvrir un compte enfant
        </Button>
        <Button leftIcon={<Icon as={FcParallelTasks} />} variant="outline" colorScheme="green">
          Organiser ma trésorerie pro
        </Button>
      </SimpleGrid>
      <Button colorScheme="orange" mt={5}>Suivant</Button>
    </Box>
  );
};

export default QuelEstVotreProjetDInvestissement;
