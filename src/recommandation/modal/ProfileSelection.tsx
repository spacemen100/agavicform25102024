// ProfileSelection.tsx
import React, { useState } from 'react';
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

const profiles = [
  { id: '1', label: 'Profil 2', recommended: true, color: 'blue.500', description: '' },
  { id: '2', label: 'Profil 3', recommended: false, color: 'gray.500', description: 'Vous souhaitez prendre peu de risques avec une espérance de gains peu élevée et/ou avez un horizon d\'investissement court terme (3-5 ans). Le Profil 3 est donc parfaitement adapté à votre projet.' },
  { id: '3', label: 'Profil 4', recommended: false, color: 'gray.500', description: '' },
  { id: '4', label: 'Profil 5', recommended: false, color: 'teal.400', description: '' },
  { id: '5', label: 'Profil 6', recommended: false, color: 'yellow.400', description: '' },
  { id: '6', label: 'Profil 7', recommended: false, color: 'yellow.600', description: '' },
  { id: '7', label: 'Profil 8', recommended: false, color: 'pink.400', description: '' },
];

const ProfileSelection: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState(profiles[0].id);
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
        <Switch ml={2} />
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
      </Box>
    </Box>
  );
};

export default ProfileSelection;
