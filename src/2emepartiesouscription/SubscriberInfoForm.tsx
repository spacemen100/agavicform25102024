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
    Switch,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Stack,
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
    propertyRegime: 55,
    otherPropertyRegime: 57,
    hasProtectionRegime: 58,
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
        propertyRegime: '',
        otherPropertyRegime: '',
        hasProtectionRegime: false,
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
                if (field === 'hasProtectionRegime') {
                    initialData[field as keyof typeof formData] = response === 'oui';
                } else {
                    initialData[field as keyof typeof formData] = response;
                }
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

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleRadioChange = (name: string, value: string) => {
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
            country: 'France',
        }));
        setSuggestions([]);
    };

    const handleSave = async () => {
        for (const [field, step] of Object.entries(fieldStepMapping)) {
            if (field === 'hasProtectionRegime') {
                await updateResponse(step, formData[field] ? 'oui' : 'non');
            } else {
                await updateResponse(step, formData[field as keyof typeof formData]);
            }
        }
        await updateResponse(6, isTaxResidenceFrance ? 'oui' : formData.taxResidence);
        alert('Informations sauvegardées avec succès');
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
                            onChange={() =>
                                setFormData((prev) => ({
                                    ...prev,
                                    clientType: 'Nouveau client',
                                    contractNumber: '',
                                }))
                            }
                        >
                            Nouveau client
                        </Checkbox>
                        <Checkbox
                            isChecked={formData.clientType === 'Client existant'}
                            onChange={() =>
                                setFormData((prev) => ({
                                    ...prev,
                                    clientType: 'Client existant',
                                }))
                            }
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
                        <Input name="country" value="France" isReadOnly bg="gray.50" />
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
                                    country: 'France',
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
                                    country: '',
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
                        <option value="Carte de séjour ou de résident">
                            Carte de séjour ou de résident
                        </option>
                    </Select>

                    {/* Situation familiale */}
                    <Text fontWeight="bold">Situation familiale</Text>
                    <RadioGroup
                        name="familySituation"
                        value={formData.familySituation}
                        onChange={(value) => handleRadioChange('familySituation', value)}
                    >
                        <Stack direction="column">
                            <Radio value="Célibataire">Célibataire</Radio>
                            <Radio value="Veuf(ve)">Veuf(ve)</Radio>
                            <Radio value="Divorcé(e)">Divorcé(e)</Radio>
                            <Radio value="Union libre">Union libre</Radio>
                            <Radio value="Pacsé(e)">Pacsé(e)</Radio>
                            <Radio value="Marié(e)">Marié(e) sous le régime de la :</Radio>
                        </Stack>
                    </RadioGroup>

                    {/* Régime matrimonial pour les mariés */}
                    {formData.familySituation === 'Marié(e)' && (
                        <VStack align="start" spacing={2}>
                            <RadioGroup
                                name="propertyRegime"
                                value={formData.propertyRegime}
                                onChange={(value) => handleRadioChange('propertyRegime', value)}
                            >
                                <Stack direction="column">
                                    <Radio value="Communauté légale réduite aux acquêts">
                                        Communauté légale réduite aux acquêts
                                    </Radio>
                                    <Radio value="Communauté universelle">Communauté universelle</Radio>
                                    <Radio value="Séparation de biens">Séparation de biens</Radio>
                                    <Radio value="Participation aux acquêts">Participation aux acquêts</Radio>
                                    <Radio value="Communauté de meubles et acquêts">
                                        Communauté de meubles et acquêts
                                    </Radio>
                                    <Radio value="Autre">Autre, préciser</Radio>
                                </Stack>
                            </RadioGroup>
                            {formData.propertyRegime === 'Autre' && (
                                <Input
                                    name="otherPropertyRegime"
                                    placeholder="Précisez le régime matrimonial"
                                    value={formData.otherPropertyRegime}
                                    onChange={handleInputChange}
                                />
                            )}
                        </VStack>
                    )}

                    {/* Régime de protection */}
                    <FormControl display="flex" alignItems="center" mt={4}>
                        <FormLabel htmlFor="hasProtectionRegime" mb="0">
                            Régime de protection
                        </FormLabel>
                        <Switch
                            id="hasProtectionRegime"
                            name="hasProtectionRegime"
                            isChecked={formData.hasProtectionRegime}
                            onChange={handleSwitchChange}
                        />
                    </FormControl>

                    {/* Afficher les options si le régime de protection est activé */}
                    {formData.hasProtectionRegime && (
                        <>
                            {/* Majeur protégé sous */}
                            <Text>Majeur protégé sous :</Text>
                            <RadioGroup
                                name="protectionStatus"
                                value={formData.protectionStatus}
                                onChange={(value) => handleRadioChange('protectionStatus', value)}
                            >
                                <Stack direction="column">
                                    <Radio value="Curatelle simple">Curatelle simple</Radio>
                                    <Radio value="Sauvegarde de justice">Sauvegarde de justice</Radio>
                                    <Radio value="Curatelle renforcée">Curatelle renforcée</Radio>
                                    <Radio value="Habilitation familiale">Habilitation familiale</Radio>
                                    <Radio value="Tutelle">Tutelle</Radio>
                                    <Radio value="Mandat de protection future">
                                        Mandat de protection future
                                    </Radio>
                                </Stack>
                            </RadioGroup>

                            {/* Mineur */}
                            <Text>Mineur :</Text>
                            <RadioGroup
                                name="minorStatus"
                                value={formData.minorStatus}
                                onChange={(value) => handleRadioChange('minorStatus', value)}
                            >
                                <Stack direction="column">
                                    <Radio value="Émancipé">Émancipé</Radio>
                                    <Radio value="Sous administration légale">
                                        Sous administration légale
                                    </Radio>
                                    <Radio value="Sous tutelle">Sous tutelle</Radio>
                                </Stack>
                            </RadioGroup>
                        </>
                    )}

                    {/* Bouton de sauvegarde */}
                    <Button colorScheme="green" size="lg" onClick={handleSave} mt={4}>
                        Enregistrer
                    </Button>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default SubscriberInfoForm;
