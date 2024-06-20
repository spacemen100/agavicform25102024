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
} from '@chakra-ui/react';

const profiles = [
  { id: '1', label: 'Profil 2', recommended: true },
  { id: '2', label: 'Profil 3', recommended: false },
  { id: '3', label: 'Profil 4', recommended: false },
  { id: '4', label: 'Profil 5', recommended: false },
  { id: '5', label: 'Profil 6', recommended: false },
  { id: '6', label: 'Profil 7', recommended: false },
  { id: '7', label: 'Profil 8', recommended: false },
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
    <Box p={5} borderWidth={1} borderRadius="lg">
      <Heading as="h2" size="lg" mb={4}>
        Choisir un nouveau profil
      </Heading>
      <Text mb={2}>
        Votre profil sera modifiable à tout moment depuis votre espace investisseur.
      </Text>
      <Flex align="center" mb={4}>
        <Text>Investissement responsable</Text>
        <Switch ml={2} />
      </Flex>
      <VStack {...group}>
        {profiles.map((profile) => {
          const radio = getRadioProps({ value: profile.id });
          return (
            <ProfileOption key={profile.id} {...radio}>
              {profile.label}
              {profile.recommended && <Text color="green.500">Notre recommandation</Text>}
            </ProfileOption>
          );
        })}
      </VStack>
      <Button mt={4} colorScheme="blue">
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
