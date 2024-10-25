import React, { useState, useRef, useEffect } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Text,
    Button,
    SimpleGrid,
    Icon,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';
import {
    FcMoneyTransfer, FcPlanner, FcHome, FcBullish, FcReading
} from 'react-icons/fc';
import StepperWithSubStepCounter from '../components/StepperWithSubStepCounter';
import { useUuid } from '../context/UuidContext';

const theme = extendTheme({
    colors: {
        navy: '#0A1128',
        gray: {
            200: '#e2e8f0',
            500: '#718096',
        },
        white: '#FFFFFF',
        orange: '#FF8C00',
    },
});

const QuelEstVotreProjetDInvestissement: React.FC = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const [otherOption, setOtherOption] = useState<string>('');
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { uuid, updateResponse, getResponse } = useUuid();

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await getResponse(1);
            if (response !== null) {
                setSelected(response);
            }
        };

        fetchResponse();
    }, [getResponse]);

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onClose = () => setIsAlertOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);

    const handleSelect = (option: string) => {
        setSelected(option);
        if (option !== 'autre') setOtherOption('');
    };

    const handleNext = async () => {
        if (selected) {
            await updateResponse(1, selected === 'autre' ? otherOption : selected);
            navigate('/quel-montant-souhaitez-vous-placer');
        } else {
            setIsAlertOpen(true);
        }
    };

    const buttons = [
        { label: 'Constituer un capital', icon: FcMoneyTransfer, key: 'capital' },
        { label: 'Préparer la retraite', icon: FcPlanner, key: 'retraite' },
        { label: 'Acheter un bien immobilier', icon: FcHome, key: 'immobilier' },
        { label: 'Optimiser la fiscalité', icon: FcBullish, key: 'fiscalite' },
        { label: 'Autre (préciser)', icon: FcReading, key: 'autre' },
    ];

    return (
        <ChakraProvider theme={theme}>
            <StepperWithSubStepCounter currentStep={1} currentSubStep={1} totalSubSteps={24} title="Parlons de votre projet" />
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
                            px={6}
                            py={6}
                            size="xxl"
                            textAlign="left"
                        >
                            <Box flex="1" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                                {button.label}
                            </Box>
                        </Button>
                    ))}
                </SimpleGrid>
                {selected === 'autre' && (
                    <Box mt={5}>
                        <Input
                            placeholder="Précisez votre projet"
                            value={otherOption}
                            onChange={(e) => setOtherOption(e.target.value)}
                            size="md"
                        />
                    </Box>
                )}
                <Box textAlign="right">
                    <Button colorScheme="green" size="xxl" mt={5} px={6} py={6} onClick={handleNext}>Suivant</Button>
                </Box>
            </Box>

            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            <WarningIcon color="orange" mr={2} />
                            Sélection requise
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Veuillez sélectionner une option avant de continuer. 😊
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </ChakraProvider>
    );
};

export default QuelEstVotreProjetDInvestissement;
