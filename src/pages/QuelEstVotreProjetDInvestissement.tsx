import React, { useState } from 'react';
import { Box, Button, SimpleGrid, Icon, Text, ChakraProvider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate depuis react-router-dom
import {
    FcApproval, FcDisapprove, FcProcess, FcBusinessContact, FcReadingEbook, FcManager, FcParallelTasks
} from 'react-icons/fc';
import StepperWithSubStepCounter from '../components/StepperWithSubStepCounter'; // Vérifiez le chemin d'importation

const QuelEstVotreProjetDInvestissement: React.FC = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const navigate = useNavigate(); // Initialiser useNavigate

    const handleSelect = (option: string) => {
        setSelected(option);
        // Rediriger vers la nouvelle route si l'option sélectionnée n'est pas "Organiser ma trésorerie pro"
        if (option !== 'tresorerie') {
            navigate('/quel-montant-souhaitez-vous-placer');
        }
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
            <Box p={5} maxW="1000px" mx="auto">
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
                            px={6} // Augmenter le padding horizontal
                            py={6} // Augmenter le padding vertical
                            size="xxl" // Ajuster la taille du bouton
                            textAlign="left" // Aligner le texte à gauche
                        >
                            <Box flex="1" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                                {button.label}
                            </Box>
                        </Button>
                    ))}
                </SimpleGrid>
                <Box textAlign="right">
                    <Button colorScheme="orange" size="xxl" mt={5} px={6} py={6}>Suivant</Button> {/* Ajouter du padding au bouton Suivant */}
                </Box>
            </Box>
        </ChakraProvider>
    );
};

export default QuelEstVotreProjetDInvestissement;
