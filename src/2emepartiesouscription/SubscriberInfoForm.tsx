// src/pages/SubscriberInfoForm.tsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    VStack,
    HStack,
    Input,
    Select,
    Checkbox,
    Button,
    Text,
    ChakraProvider,
    extendTheme,
} from '@chakra-ui/react';
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

const SubscriberInfoForm: React.FC = () => {
    const [formData, setFormData] = useState({
        birthDate: '',
        clientType: '',
        contractNumber: '', // Nouveau champ pour le numéro de contrat
        title: '',
        lastName: '',
        firstName: '',
        birthLastName: '',
        address: '',
        postalCode: '',
        city: '',
        country: '',
        birthPostalCode: '',
        birthCity: '',
        birthCountry: '',
        nir: '',
        nationality: '',
        taxResidence: 'France',
        taxResidenceAddress: '',
        phone: '',
        email: '',
        presentedDocument: '',
        familySituation: '',
        protectionStatus: '',
        minorStatus: '',
    });
    const [isTaxResidenceFrance, setIsTaxResidenceFrance] = useState(true); // État pour gérer la résidence fiscale

    const { updateResponse, getResponse } = useUuid();

    // Charger les données depuis la base de données
    useEffect(() => {
        const fetchData = async () => {
            const keys = Object.keys(formData);
            const updatedData = { ...formData };

            for (let i = 0; i < keys.length; i++) {
                const response = await getResponse(31 + i);
                if (response !== null) {
                    updatedData[keys[i] as keyof typeof formData] = response;
                }
            }

            // Charger la résidence fiscale depuis step6 et définir le pays si c'est "oui"
            const taxResidenceResponse = await getResponse(6);
            if (taxResidenceResponse === 'oui') {
                setIsTaxResidenceFrance(true);
                updatedData.taxResidence = 'France';
            } else if (taxResidenceResponse !== null) {
                setIsTaxResidenceFrance(false);
                updatedData.taxResidence = taxResidenceResponse;
            }

            setFormData(updatedData);
        };
        fetchData();
    }, [getResponse]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        // Sauvegarder toutes les informations dans step31 et suivants
        const keys = Object.keys(formData);
        for (let i = 0; i < keys.length; i++) {
            await updateResponse(31 + i, formData[keys[i] as keyof typeof formData]);
        }
        alert('Information saved successfully');
    };

    return (
        <ChakraProvider theme={theme}>
            <Box p={5} maxW="800px" mx="auto" textAlign="left">
                <Text fontSize="2xl" fontWeight="bold" mb={5}>
                    Vous connaître
                </Text>

                <VStack spacing={4} align="stretch">
                    {/* Client Type */}
                    <HStack spacing={4}>
                        <Checkbox
                            isChecked={formData.clientType === 'Nouveau client'}
                            onChange={() => setFormData((prev) => ({
                                ...prev, clientType: 'Nouveau client', contractNumber: '' // Efface le numéro de contrat si "Nouveau client"
                            }))}
                        >
                            Nouveau client
                        </Checkbox>
                        <Checkbox
                            isChecked={formData.clientType === 'Client existant'}
                            onChange={() => setFormData((prev) => ({ ...prev, clientType: 'Client existant' }))}
                        >
                            Si Client existant N° contrat
                        </Checkbox>
                    </HStack>

                    {/* Champ pour le numéro de contrat si "Client existant" est sélectionné */}
                    {formData.clientType === 'Client existant' && (
                        <Input
                            name="contractNumber"
                            placeholder="Numéro de contrat"
                            value={formData.contractNumber}
                            onChange={handleInputChange}
                        />
                    )}

                    {/* Title */}
                    <HStack spacing={4}>
                        <Checkbox
                            isChecked={formData.title === 'Monsieur'}
                            onChange={() => setFormData((prev) => ({ ...prev, title: 'Monsieur' }))}
                        >
                            Monsieur
                        </Checkbox>
                        <Checkbox
                            isChecked={formData.title === 'Madame'}
                            onChange={() => setFormData((prev) => ({ ...prev, title: 'Madame' }))}
                        >
                            Madame
                        </Checkbox>
                    </HStack>

                    {/* Name and Address Information */}
                    <Input name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleInputChange} />
                    <Input name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleInputChange} />
                    <Input name="birthLastName" placeholder="Nom de naissance" value={formData.birthLastName} onChange={handleInputChange} />
                    <Input name="address" placeholder="Adresse postale" value={formData.address} onChange={handleInputChange} />
                    <HStack spacing={4}>
                        <Input name="postalCode" placeholder="Code postal" value={formData.postalCode} onChange={handleInputChange} />
                        <Input name="city" placeholder="Ville" value={formData.city} onChange={handleInputChange} />
                    </HStack>
                    <Input name="country" placeholder="Pays" value={formData.country} onChange={handleInputChange} />

                    {/* Birth Information */}
                    <Input name="birthDate" placeholder="Date de naissance" type="date" value={formData.birthDate} onChange={handleInputChange} />
                    <HStack spacing={4}>
                        <Input name="birthPostalCode" placeholder="Code postal de naissance" value={formData.birthPostalCode} onChange={handleInputChange} />
                        <Input name="birthCity" placeholder="Ville de naissance" value={formData.birthCity} onChange={handleInputChange} />
                    </HStack>
                    <Input name="birthCountry" placeholder="Pays de naissance" value={formData.birthCountry} onChange={handleInputChange} />

                    {/* Identification Numbers */}
                    <Input name="nir" placeholder="NIR ou Numéro de sécurité sociale" value={formData.nir} onChange={handleInputChange} />

                    {/* Nationality and Tax Residence */}
                    <HStack spacing={4}>
                        <Checkbox
                            isChecked={isTaxResidenceFrance}
                            onChange={() => {
                                setIsTaxResidenceFrance(true);
                                setFormData((prev) => ({ ...prev, taxResidence: 'France' }));
                            }}
                        >
                            Résidence fiscale en France
                        </Checkbox>
                        <Checkbox
                            isChecked={!isTaxResidenceFrance}
                            onChange={() => {
                                setIsTaxResidenceFrance(false);
                                setFormData((prev) => ({ ...prev, taxResidence: '' })); // Efface la résidence fiscale pour entrer un pays personnalisé
                            }}
                        >
                            Autre résidence fiscale
                        </Checkbox>
                    </HStack>
                    {!isTaxResidenceFrance && (
                        <Input
                            name="taxResidence"
                            placeholder="Précisez le pays de résidence fiscale"
                            value={formData.taxResidence}
                            onChange={handleInputChange}
                        />
                    )}

                    {/* Contact Information */}
                    <Input name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleInputChange} />
                    <Input name="email" placeholder="E-mail" type="email" value={formData.email} onChange={handleInputChange} />

                    {/* Document Presented */}
                    <Select name="presentedDocument" placeholder="Document présenté" value={formData.presentedDocument} onChange={handleInputChange}>
                        <option value="CNI">CNI</option>
                        <option value="Passeport">Passeport</option>
                        <option value="Permis de conduire">Permis de conduire</option>
                        <option value="Carte de séjour ou de résident">Carte de séjour ou de résident</option>
                    </Select>

                    {/* Family Situation */}
                    <Select name="familySituation" placeholder="Situation familiale" value={formData.familySituation} onChange={handleInputChange}>
                        <option value="Célibataire">Célibataire</option>
                        <option value="Veuf(ve)">Veuf(ve)</option>
                        <option value="Divorcé(e)">Divorcé(e)</option>
                        <option value="Union libre">Union libre</option>
                        <option value="Pacsé(e)">Pacsé(e)</option>
                        <option value="Marié(e)">Marié(e)</option>
                    </Select>

                    {/* Protection Status */}
                    <Select name="protectionStatus" placeholder="Régime de protection" value={formData.protectionStatus} onChange={handleInputChange}>
                        <option value="Sauvegarde de justice">Sauvegarde de justice</option>
                        <option value="Curatelle renforcée">Curatelle renforcée</option>
                        <option value="Curatelle simple">Curatelle simple</option>
                        <option value="Habilitation familiale">Habilitation familiale</option>
                        <option value="Mandat de protection future">Mandat de protection future</option>
                    </Select>

                    {/* Minor Status */}
                    <Select name="minorStatus" placeholder="Mineur" value={formData.minorStatus} onChange={handleInputChange}>
                        <option value="Emancipé">Emancipé</option>
                        <option value="Sous tutelle">Sous tutelle</option>
                        <option value="Sous administration légale">Sous administration légale</option>
                    </Select>

                    <Button colorScheme="green" size="lg" onClick={handleSave}>
                        Enregistrer
                    </Button>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default SubscriberInfoForm;
