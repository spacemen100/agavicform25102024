import React, { useContext } from 'react';
import { Box, Text, Button, Flex, Image, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header: React.FC = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const signOut = authContext?.signOut;

  return (
    <Box bg="navy" paddingY="2" paddingX="4">
      <Center>
        <Flex width="full" maxWidth="1200px" align="center" justify="space-between">
          <Flex align="center">
            {/* Logo Section */}
            <Image src="/agaviclogo.png" alt="Logo" height="30px" />
            
            {/* Text Section */}
            <Text color="white" fontSize="lg" ml="2">
              AGAVIC
            </Text>
          </Flex>

          {/* Button Section */}
          <Flex align="center">
            {user ? (
              <>
                <Button
                  variant="outline"
                  color="white"
                  borderColor="white"
                  _hover={{ bg: 'white', color: 'navy' }}
                  borderRadius="8px"
                  paddingX="6"
                  paddingY="4"
                  onClick={signOut}
                  mr={2}
                >
                  Se déconnecter
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button
                    variant="outline"
                    color="white"
                    borderColor="white"
                    _hover={{ bg: 'white', color: 'navy' }}
                    borderRadius="8px"
                    paddingX="6"
                    paddingY="4"
                    mr={2}
                  >
                    Se connecter
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="outline"
                    color="white"
                    borderColor="white"
                    _hover={{ bg: 'white', color: 'navy' }}
                    borderRadius="8px"
                    paddingX="6"
                    paddingY="4"
                    mr={2}
                  >
                    S'inscrire
                  </Button>
                </Link>
              </>
            )}
            {/* Bouton "Une question ?" */}
            <Button
              variant="outline"
              color="white"
              borderColor="white"
              _hover={{ bg: 'white', color: 'navy' }}
              borderRadius="8px"
              paddingX="6"
              paddingY="4"
            >
              Une question ?
            </Button>
          </Flex>
        </Flex>
      </Center>
    </Box>
  );
};

export default Header;
