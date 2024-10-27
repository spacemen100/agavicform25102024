import React, { useState, useEffect, useCallback } from 'react';
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
    List,
    ListItem,
} from '@chakra-ui/react';
import { useUuid } from '../context/UuidContext';
import countries from './countries.json';

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

// Correspondance stricte entre les champs et les étapes
const fieldStepMapping = {
    birthDate: 31,
    clientType: 32,
    title: 33,
    lastName: 34,
    firstName: 35,
    birthLastName: 36,
    address: 37,
    postalCode: 38,
    city: 39,
    country: 40,
    birthPostalCode: 41,
    birthCity: 42,
    birthCountry: 43,
    nir: 44,
    nationality: 45,
    taxResidence: 46,
    taxResidenceAddress: 47,
    phone: 26,
    email: 25,
    presentedDocument: 50,
    familySituation: 51,
    protectionStatus: 52,
    minorStatus: 53,
    contractNumber: 54,
};

interface AddressFeature {
    properties: {
        label: string;
        postcode: string;
        city: string;
        name: string;
    };
}

const SubscriberInfoForm: React.FC = () => {
    const [formData, setFormData] = useState({
        birthDate: '',
        clientType: '',
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
        contractNumber: '',
    });

    const [isTaxResidenceFrance, setIsTaxResidenceFrance] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [suggestions, setSuggestions] = useState<AddressFeature[]>([]);

    const { updateResponse, getResponse } = useUuid();

    // Fonction pour charger les données sauvegardées
    const fetchData = useCallback(async () => {
        if (!isInitialLoad) return;

        const initialData = { ...formData };

        // Récupération des valeurs pour chaque champ en fonction de son étape
        for (const [field, step] of Object.entries(fieldStepMapping)) {
            const response = await getResponse(step);
            if (response !== null) {
                initialData[field as keyof typeof formData] = response;
            }
        }

        const taxResidenceResponse = await getResponse(6);
        if (taxResidenceResponse === 'oui') {
            setIsTaxResidenceFrance(true);
            initialData.taxResidence = 'France';
        } else if (taxResidenceResponse !== null) {
            setIsTaxResidenceFrance(false);
            initialData.taxResidence = taxResidenceResponse;
        }

        setFormData(initialData);
        setIsInitialLoad(false);
    }, [getResponse, formData, isInitialLoad]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, address: value }));

        if (isTaxResidenceFrance && value.length > 3) {
            try {
                const response = await fetch(
                    `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(value)}&limit=5`
                );
                const data = await response.json();
                setSuggestions(data.features);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'adresse:", error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (feature: AddressFeature) => {
        setFormData((prev) => ({
            ...prev,
            address: feature.properties.label,
            postalCode: feature.properties.postcode,
            city: feature.properties.city,
            country: 'France'
        }));
        setSuggestions([]);
    };

    const handleSave = async () => {
        for (const [field, step] of Object.entries(fieldStepMapping)) {
            await updateResponse(step, formData[field as keyof typeof formData]);
        }
        await updateResponse(6, isTaxResidenceFrance ? 'oui' : formData.taxResidence);
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
                                ...prev,
                                clientType: 'Nouveau client',
                                contractNumber: ''
                            }))}
                        >
                            Nouveau client
                        </Checkbox>
                        <Checkbox
                            isChecked={formData.clientType === 'Client existant'}
                            onChange={() => setFormData((prev) => ({
                                ...prev,
                                clientType: 'Client existant'
                            }))}
                        >
                            Si Client existant N° contrat
                        </Checkbox>
                    </HStack>

                    {/* Numéro de contrat */}
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

                    {/* Informations personnelles */}
                    <Input
                        name="lastName"
                        placeholder="Nom"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="firstName"
                        placeholder="Prénom"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="birthLastName"
                        placeholder="Nom de naissance"
                        value={formData.birthLastName}
                        onChange={handleInputChange}
                    />

                    {/* Adresse avec autocomplétion */}
                    <Input
                        name="address"
                        placeholder="Adresse postale"
                        value={formData.address}
                        onChange={handleAddressChange}
                    />

                    {/* Liste des suggestions d'adresse */}
                    {suggestions.length > 0 && (
                        <List
                            bg="white"
                            border="1px solid"
                            borderColor="gray.200"
                            borderRadius="md"
                            mt={1}
                            position="relative"
                            zIndex="dropdown"
                            boxShadow="md"
                        >
                            {suggestions.map((suggestion, index) => (
                                <ListItem
                                    key={index}
                                    p={2}
                                    cursor="pointer"
                                    _hover={{ backgroundColor: 'gray.100' }}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion.properties.label}
                                </ListItem>
                            ))}
                        </List>
                    )}

                    {/* Champs d'adresse - maintenant conditionnellement affichés */}
                    {!isTaxResidenceFrance && (
                        <>
                            <Input
                                name="postalCode"
                                placeholder="Code postal"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="city"
                                placeholder="Ville"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                            <Select
                                name="country"
                                placeholder="Pays"
                                value={formData.country}
                                onChange={handleInputChange}
                            >
                                {countries.map((country, index) => (
                                    <option key={index} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </Select>
                        </>
                    )}

                    {/* Le pays en lecture seule pour la France */}
                    {isTaxResidenceFrance && (
                        <Input
                            name="country"
                            value="France"
                            isReadOnly
                            bg="gray.50"
                        />
                    )}

                    {/* Informations de naissance */}
                    <Input
                        name="birthDate"
                        placeholder="Date de naissance"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                    />
                    <HStack spacing={4}>
                        <Input
                            name="birthPostalCode"
                            placeholder="Code postal de naissance"
                            value={formData.birthPostalCode}
                            onChange={handleInputChange}
                        />
                        <Input
                            name="birthCity"
                            placeholder="Ville de naissance"
                            value={formData.birthCity}
                            onChange={handleInputChange}
                        />
                    </HStack>
                    <Select
                        name="birthCountry"
                        placeholder="Pays de naissance"
                        value={formData.birthCountry}
                        onChange={handleInputChange}
                    >
                        {countries.map((country, index) => (
                            <option key={index} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </Select>

                    {/* NIR */}
                    <Input
                        name="nir"
                        placeholder="NIR ou Numéro de sécurité sociale"
                        value={formData.nir}
                        onChange={handleInputChange}
                    />

                    {/* Résidence fiscale */}
                    <HStack spacing={4}>
                        <Checkbox
                            isChecked={isTaxResidenceFrance}
                            onChange={() => {
                                setIsTaxResidenceFrance(true);
                                setFormData((prev) => ({
                                    ...prev,
                                    taxResidence: 'France',
                                    country: 'France'
                                }));
                            }}
                        >
                            Résidence fiscale en France
                        </Checkbox>
                        <Checkbox
                            isChecked={!isTaxResidenceFrance}
                            onChange={() => {
                                setIsTaxResidenceFrance(false);
                                setFormData((prev) => ({
                                    ...prev,
                                    taxResidence: '',
                                    country: ''
                                }));
                            }}
                        >
                            Autre résidence fiscale
                        </Checkbox>
                    </HStack>

                    {!isTaxResidenceFrance && (
                        <Select
                            name="taxResidence"
                            placeholder="Pays de résidence fiscale"
                            value={formData.taxResidence}
                            onChange={handleInputChange}
                        >
                            {countries.map((country, index) => (
                                <option key={index} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </Select>
                    )}

                    {/* Contact */}
                    <Input
                        name="phone"
                        placeholder="Téléphone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="email"
                        placeholder="E-mail"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />

                    {/* Document d'identité */}
                    <Select
                        name="presentedDocument"
                        placeholder="Document présenté"
                        value={formData.presentedDocument}
                        onChange={handleInputChange}
                    >
                        <option value="CNI">CNI</option>
                        <option value="Passeport">Passeport</option>
                        <option value="Permis de conduire">Permis de conduire</option>
                        <option value="Carte de séjour ou de résident">Carte de séjour ou de résident</option>
                    </Select>

                    {/* Situation familiale */}
                    <Select
                        name="familySituation"
                        placeholder="Situation familiale"
                        value={formData.familySituation}
                        onChange={handleInputChange}
                    >
                        <option value="Célibataire">Célibataire</option>
                        <option value="Veuf(ve)">Veuf(ve)</option>
                        <option value="Divorcé(e)">Divorcé(e)</option>
                        <option value="Union libre">Union libre</option>
                        <option value="Pacsé(e)">Pacsé(e)</option>
                        <option value="Marié(e)">Marié(e)</option>
                    </Select>

                    {/* Protection Status */}
                    <Select
                        name="protectionStatus"
                        placeholder="Régime de protection"
                        value={formData.protectionStatus}
                        onChange={handleInputChange}
                    >
                        <option value="Sauvegarde de justice">Sauvegarde de justice</option>
                        <option value="Curatelle renforcée">Curatelle renforcée</option>
                        <option value="Curatelle simple">Curatelle simple</option>
                        <option value="Habilitation familiale">Habilitation familiale</option>
                        <option value="Mandat de protection future">Mandat de protection future</option>
                    </Select>

                    {/* Minor Status */}
                    <Select
                        name="minorStatus"
                        placeholder="Mineur"
                        value={formData.minorStatus}
                        onChange={handleInputChange}
                    >
                        <option value="Emancipé">Emancipé</option>
                        <option value="Sous tutelle">Sous tutelle</option>
                        <option value="Sous administration légale">Sous administration légale</option>
                    </Select>

                    {/* Bouton de sauvegarde */}
                    <Button
                        colorScheme="green"
                        size="lg"
                        onClick={handleSave}
                        mt={4}
                    >
                        Enregistrer
                    </Button>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default SubscriberInfoForm;