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
    FormErrorMessage,
    FormHelperText,
    useToast, // Import du hook useToast
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

// Définition de l'interface pour formData
interface FormData {
    birthDate: string;
    clientType: string;
    title: string;
    lastName: string;
    firstName: string;
    birthLastName: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    birthPostalCode: string;
    birthCity: string;
    birthCountry: string;
    nir: string;
    nationality: string;
    taxResidence: string;
    taxResidenceAddress: string;
    phone: string;
    email: string;
    presentedDocument: string;
    familySituation: string;
    propertyRegime: string;
    otherPropertyRegime: string;
    hasProtectionRegime: boolean;
    protectionStatus: string;
    minorStatus: string;
    contractNumber: string;
    identityDocumentFront: File | null;
    identityDocumentBack: File | null;
}

interface FormErrors {
    nir?: string;
}

// Correspondance stricte entre les champs et les étapes
const fieldStepMapping: Partial<Record<keyof FormData, number>> = {
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
    identityDocumentFront: 60,
    identityDocumentBack: 61,
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
    const [formData, setFormData] = useState<FormData>({
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
        identityDocumentFront: null,
        identityDocumentBack: null,
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const [isTaxResidenceFrance, setIsTaxResidenceFrance] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [suggestions, setSuggestions] = useState<AddressFeature[]>([]);

    const { updateResponse, getResponse } = useUuid();

    const toast = useToast(); // Initialisation du hook useToast

    // Mapping des documents aux nombres de fichiers requis
    const documentFileRequirements: Record<string, number> = {
        'CNI': 2,
        'Passeport': 1,
        'Permis de conduire': 2,
        'Carte de séjour ou de résident': 2,
    };

    // Fonction pour charger les données sauvegardées
    const fetchData = useCallback(async () => {
        if (!isInitialLoad) return;

        const initialData: FormData = { ...formData };

        // Récupération des valeurs pour chaque champ en fonction de son étape
        for (const [field, step] of Object.entries(fieldStepMapping) as [keyof FormData, number][]) {
            const response = await getResponse(step);
            if (response !== null) {
                if (field === 'hasProtectionRegime') {
                    initialData.hasProtectionRegime = response === 'oui';
                } else {
                    initialData[field] = response;
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

    // Fonction de validation du NIR
    const validateNIR = (nir: string): boolean => {
        // Retirer les espaces éventuels
        nir = nir.replace(/\s/g, '');

        // Vérifier que le NIR contient exactement 15 caractères numériques
        if (!/^\d{15}$/.test(nir)) {
            return false;
        }

        // Extraire les 13 premiers chiffres et les 2 chiffres de la clé
        const nirNumberPart = nir.substr(0, 13);
        const nirKey = parseInt(nir.substr(13, 2), 10);

        // Remplacer les codes particuliers (si nécessaire)
        let nirNumber = nirNumberPart;

        // Convertir en nombre entier
        const nirNum = parseInt(nirNumber, 10);

        // Calculer la clé attendue
        const expectedKey = 97 - (nirNum % 97);

        // Vérifier que la clé calculée correspond à la clé fournie
        return expectedKey === nirKey;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validation spécifique pour le NIR
        if (name === 'nir') {
            if (value === '' || validateNIR(value)) {
                setFormErrors((prev) => ({ ...prev, nir: undefined }));
            } else {
                setFormErrors((prev) => ({ ...prev, nir: 'Numéro de sécurité sociale invalide' }));
            }
        }
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

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        name: 'identityDocumentFront' | 'identityDocumentBack'
    ) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData((prev) => ({ ...prev, [name]: file }));
        }
    };

    // Fonction pour uploader un fichier
    const uploadFile = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('File upload failed');
        }

        const data = await response.json();

        return data.fileUrl; // Ajustez selon la réponse de votre API
    };

    const handleSave = async () => {
        // Vérifier si le NIR est valide avant de sauvegarder
        if (formData.nir && !validateNIR(formData.nir)) {
            setFormErrors((prev) => ({ ...prev, nir: 'Numéro de sécurité sociale invalide' }));
            toast({
                title: 'Erreur',
                description: 'Veuillez corriger les erreurs avant de sauvegarder.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        // Vérifier que les documents d'identité requis sont téléchargés
        const requiredFiles = documentFileRequirements[formData.presentedDocument];

        if (requiredFiles === 1 && !formData.identityDocumentFront) {
            toast({
                title: 'Erreur',
                description: 'Veuillez télécharger le document d\'identité requis.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        if (requiredFiles === 2 && (!formData.identityDocumentFront || !formData.identityDocumentBack)) {
            toast({
                title: 'Erreur',
                description: 'Veuillez télécharger les documents d\'identité requis (recto et verso).',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        // Enregistrer les réponses du formulaire
        for (const [field, step] of Object.entries(fieldStepMapping) as [keyof FormData, number][]) {
            const value = formData[field];
            if (field === 'hasProtectionRegime') {
                await updateResponse(step, value ? 'oui' : 'non');
            } else if (field !== 'identityDocumentFront' && field !== 'identityDocumentBack') {
                await updateResponse(step, String(value));
            }
        }
        await updateResponse(6, isTaxResidenceFrance ? 'oui' : formData.taxResidence);

        // Upload des fichiers
        try {
            if (formData.identityDocumentFront) {
                const frontFileUrl = await uploadFile(formData.identityDocumentFront);
                await updateResponse(fieldStepMapping.identityDocumentFront!, frontFileUrl);
            }
            if (formData.identityDocumentBack) {
                const backFileUrl = await uploadFile(formData.identityDocumentBack);
                await updateResponse(fieldStepMapping.identityDocumentBack!, backFileUrl);
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement des fichiers:', error);
            toast({
                title: 'Erreur',
                description: 'Échec du téléchargement des fichiers.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: 'Succès',
            description: 'Informations sauvegardées avec succès',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
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
                    <FormControl isInvalid={!!formErrors.nir}>
                        <Input
                            name="nir"
                            placeholder="NIR ou Numéro de sécurité sociale"
                            value={formData.nir}
                            onChange={handleInputChange}
                        />
                        {formErrors.nir ? (
                            <FormErrorMessage>{formErrors.nir}</FormErrorMessage>
                        ) : (
                            <FormHelperText>Entrez votre numéro de sécurité sociale</FormHelperText>
                        )}
                    </FormControl>

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

                    {/* Upload des documents d'identité */}
                    {formData.presentedDocument && (
                        <VStack align="start" spacing={2}>
                            <FormControl>
                                <FormLabel>Pièce d'identité - Recto</FormLabel>
                                <Input
                                    type="file"
                                    accept="image/*,application/pdf"
                                    onChange={(e) => handleFileChange(e, 'identityDocumentFront')}
                                />
                            </FormControl>
                            {documentFileRequirements[formData.presentedDocument] === 2 && (
                                <FormControl>
                                    <FormLabel>Pièce d'identité - Verso</FormLabel>
                                    <Input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        onChange={(e) => handleFileChange(e, 'identityDocumentBack')}
                                    />
                                </FormControl>
                            )}
                        </VStack>
                    )}

                    {/* ... le reste du formulaire ... */}

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
                    <Button colorScheme="green" size="lg" onClick={handleSave} mt={4}>
                        Enregistrer
                    </Button>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default SubscriberInfoForm;
