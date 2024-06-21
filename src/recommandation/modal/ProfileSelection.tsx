import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Switch,
  Text,
  useRadio,
  useRadioGroup,
  VStack,
  HStack,
  Circle,
  Tooltip,
  Icon,
  Center,
} from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';
import { RiLeafLine } from "react-icons/ri";
import { supabase } from './../../supabaseClient'; // Import your Supabase client
import { useUuid } from './../../context/UuidContext';

const profiles = [
  { id: '1', label: 'Profil 2', recommended: true, color: 'blue.500', description: 'Profil 2 description here.' },
  { id: '2', label: 'Profil 3', recommended: false, color: 'gray.500', description: 'Vous souhaitez prendre peu de risques avec une espérance de gains peu élevée et/ou avez un horizon d\'investissement court terme (3-5 ans). Le Profil 3 est donc parfaitement adapté à votre projet.' },
  { id: '3', label: 'Profil 4', recommended: false, color: 'gray.500', description: 'Vous avez indiqué à la question 1 vouloir "Épargner en cas de coup dur", ainsi seuls les profils prudents (inférieur à 4) peuvent vous être accessibles. Vous pouvez toujours revoir votre projet en étape 1. Vous souhaitez prendre un minimum de risques avec une espérance de gains limitée et/ou avez un horizon d\'investissement moyen terme (5-8 ans). Le Profil 4 est donc parfaitement adapté à votre projet.' },
  { id: '4', label: 'Profil 5', recommended: false, color: 'teal.400', description: 'Vous avez indiqué à la question 1 vouloir "Épargner en cas de coup dur", ainsi seuls les profils prudents (inférieur à 4) peuvent vous être accessibles. Vous pouvez toujours revoir votre projet en étape 1. Vous souhaitez prendre un risque mesuré avec une espérance de gains modérée et/ou avez un horizon d\'investissement moyen terme (5-8 ans). Le Profil 5 est donc parfaitement adapté à votre projet.' },
  { id: '5', label: 'Profil 6', recommended: false, color: 'yellow.400', description: 'Vous avez indiqué à la question 1 vouloir "Épargner en cas de coup dur", ainsi seuls les profils prudents (inférieur à 4) peuvent vous être accessibles. Vous pouvez toujours revoir votre projet en étape 1. Vous souhaitez prendre un risque moyen avec une espérance de gains moyenne et/ou avez un horizon d\'investissement moyen terme (5-8 ans). Le Profil 6 est donc parfaitement adapté à votre projet.' },
  { id: '6', label: 'Profil 7', recommended: false, color: 'yellow.600', description: 'Vous avez indiqué à la question 1 vouloir "Épargner en cas de coup dur", ainsi seuls les profils prudents (inférieur à 4) peuvent vous être accessibles. Vous pouvez toujours revoir votre projet en étape 1. Vous souhaitez prendre un risque important avec une espérance de gains supérieure et avez un horizon d\'investissement long terme (>8 ans). Le Profil 7 est donc parfaitement adapté à votre projet.' },
  { id: '7', label: 'Profil 8', recommended: false, color: 'pink.400', description: 'Vous avez indiqué à la question 1 vouloir "Épargner en cas de coup dur", ainsi seuls les profils prudents (inférieur à 4) peuvent vous être accessibles. Vous pouvez toujours revoir votre projet en étape 1. Vous souhaitez prendre un risque assez important avec une espérance de gains conséquente et vous avez un horizon d\'investissement long terme (>8 ans). Le Profil 8 est donc parfaitement adapté à votre projet.' },
  { id: '8', label: 'Profil 9', recommended: false, color: 'pink.500', description: 'Vous avez indiqué à la question 1 vouloir "Épargner en cas de coup dur", ainsi seuls les profils prudents (inférieur à 4) peuvent vous être accessibles. Vous pouvez toujours revoir votre projet en étape 1. Vous souhaitez prendre beaucoup de risques avec une espérance de gains élevée et vous avez un horizon d\'investissement long terme (>8 ans). Le Profil 9 est donc parfaitement adapté à votre projet.' },
  { id: '9', label: 'Profil 10', recommended: false, color: 'pink.600', description: 'Vous avez indiqué à la question 1 vouloir "Épargner en cas de coup dur", ainsi seuls les profils prudents (inférieur à 4) peuvent vous être accessibles. Vous pouvez toujours revoir votre projet en étape 1. Vous souhaitez prendre un maximum de risques avec une espérance de gains très élevée et vous avez un horizon d\'investissement long terme (>8 ans). Le Profil 10 est donc parfaitement adapté à votre projet.' },
];

const ProfileSelection: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState(profiles[0].id);
  const [esgPreference, setEsgPreference] = useState(false);
  const { uuid } = useUuid();
  
  useEffect(() => {
    const fetchESGPreference = async () => {
      const { data, error } = await supabase
        .from('form_responses')
        .select('step7')
        .eq('id', uuid)
        .single();

      if (error) {
        console.error('Error fetching ESG preference:', error);
      } else {
        setEsgPreference(data?.step7 === 'ESG');
      }
    };

    fetchESGPreference();
  }, [uuid]);

  const handleESGToggle = async () => {
    const newPreference = !esgPreference;
    setEsgPreference(newPreference);

    const { error } = await supabase
      .from('form_responses')
      .update({ step7: newPreference ? 'ESG' : 'Non-ESG' })
      .eq('id', uuid);

    if (error) {
      console.error('Error updating ESG preference:', error);
    }
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'profiles',
    defaultValue: profiles[0].id,
    onChange: (value) => setSelectedProfile(value),
  });

  const group = getRootProps();

  return (
    <Box p={5}>
      <Center>
        <Heading as="h2" size="lg" mb={2}>
          Choisir un nouveau profil
        </Heading>
      </Center>
      <Center>
        <Text mb={4}>
          Votre profil sera modifiable à tout moment depuis votre espace investisseur.
        </Text>
      </Center>
      <Flex align="center" justify="center" mb={4}>
        <Text mr={2}>Investissement responsable</Text>
        <Switch ml={2} isChecked={esgPreference} onChange={handleESGToggle} />
        <Tooltip label="Choisissez un profil construit autour des critères ESG, pour soutenir des entreprises qui oeuvrent dans une logique Environnementale, Sociale, et à travers une Gouvernance plus juste." fontSize="md">
          <span>
            <Icon as={FaInfoCircle} color="gray.500" ml={2} />
          </span>
        </Tooltip>
        <Icon as={RiLeafLine} color="green.400" ml={2} />
      </Flex>
      <Box bg="gray.100" p={3} mb={4} borderRadius="md" borderWidth="1px">
        <Text>
          Profil de risque sélectionné : <Text as="span" fontWeight="bold">Profil {selectedProfile}</Text>
        </Text>
      </Box>
      <VStack {...group} align="stretch" spacing={3}>
        {profiles.map((profile, index) => {
          const radio = getRadioProps({ value: profile.id });
          return (
            <ProfileOption key={profile.id} {...radio} color={profile.color} description={profile.description} isSelected={selectedProfile === profile.id}>
              <HStack justify="space-between">
                <HStack>
                  <Circle size="32px" bg={profile.color} color="white" mr={3}>
                    {index + 2}
                  </Circle>
                  <Text>{profile.label}</Text>
                </HStack>
                {profile.recommended && (
                  <Text color="green.500" fontWeight="bold">
                    Notre recommandation
                  </Text>
                )}
              </HStack>
              {selectedProfile === profile.id && profile.description && (
                <Text mt={2} color="gray.600">
                  {profile.description}
                </Text>
              )}
            </ProfileOption>
          );
        })}
      </VStack>
      <Button mt={4} colorScheme="green" w="100%">
        Valider
      </Button>
    </Box>
  );
};

const ProfileOption: React.FC<any> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w="100%">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        p={5}
      >
        {props.children}
        {props.isSelected && props.description && (
          <Text mt={2} color="gray.600">
            {props.description}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ProfileSelection;
