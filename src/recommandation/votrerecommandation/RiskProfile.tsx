import React from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    VStack,
    HStack,
    Progress,
    Switch,
    Link,
    IconButton,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { FaAward, FaLeaf } from 'react-icons/fa';

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
    return (
        <ChakraProvider theme={theme}>
            <Box mt={5} p={5} maxW="400px" mx="auto" textAlign="left" borderRadius="md" boxShadow="md" bg="white">
                <HStack justifyContent="space-between" mb={4}>
                    <Text fontSize="lg" fontWeight="bold" color="blue.400">
                        <Box as="span" mr={2} p={2} bg="blue.400" color="white" borderRadius="md">
                            2
                        </Box>
                        Profil de risque : Prudent
                    </Text>
                    <Link color="blue.400" href="#">
                        Modifier
                    </Link>
                </HStack>
                <Text mb={4}>
                    Un profil de risque 2 chez Yomoni correspond à un profil de risque de 3 sur 7 sur l'échelle du SRI, l’indicateur européen de référence du risque.
                </Text>
                <Text fontWeight="bold" mb={2}>
                    Les investisseurs qui obtiennent cette recommandation présentent en moyenne ces caractéristiques :
                </Text>
                <VStack align="stretch" spacing={4} mb={4}>
                    <Box>
                        <Text>Horizon de placement</Text>
                        <Progress value={30} size="sm" colorScheme="blue" />
                        <HStack justifyContent="space-between">
                            <Text fontSize="sm">Court</Text>
                            <Text fontSize="sm">Long</Text>
                        </HStack>
                    </Box>
                    <Box>
                        <Text>Probabilité de retrait</Text>
                        <Progress value={40} size="sm" colorScheme="blue" />
                        <HStack justifyContent="space-between">
                            <Text fontSize="sm">Faible</Text>
                            <Text fontSize="sm">Forte</Text>
                        </HStack>
                    </Box>
                    <Box>
                        <Text>Attitude face au risque</Text>
                        <Progress value={20} size="sm" colorScheme="blue" />
                        <HStack justifyContent="space-between">
                            <Text fontSize="sm">Prudent</Text>
                            <Text fontSize="sm">Dynamique</Text>
                        </HStack>
                    </Box>
                    <Box>
                        <Text>Capacité financière</Text>
                        <Progress value={30} size="sm" colorScheme="blue" />
                        <HStack justifyContent="space-between">
                            <Text fontSize="sm">Réduite</Text>
                            <Text fontSize="sm">Élevée</Text>
                        </HStack>
                    </Box>
                </VStack>
                <HStack justifyContent="space-between" mb={4}>
                    <HStack>
                        <Box as={FaAward} color="orange.400" w={6} h={6} />
                        <Text>Assurance-vie</Text>
                    </HStack>
                    <Link color="blue.400" href="#">
                        Modifier
                    </Link>
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                    <HStack>
                        <Text>Investissement responsable</Text>
                        <FaLeaf color="green" />
                    </HStack>
                    <Switch colorScheme="blue" />
                </HStack>
            </Box>
        </ChakraProvider>
    );
};

export default RiskProfile;
