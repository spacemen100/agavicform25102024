import React from 'react';
import { Box, Text, Button, Flex, Image, Spacer, extendTheme, ChakraProvider } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    navy: '#0A1128',
    white: '#FFFFFF',
  },
});

const Header: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="navy" paddingY="2" paddingX="4">
        <Flex align="center">
          {/* Logo Section */}
          <Image src="/agaviclogo.png" alt="Logo" height="30px" />
          
          {/* Text Section */}
          <Text color="white" fontSize="lg" ml="4">
            AGAVIC
          </Text>

          <Spacer />

          {/* Button Section */}
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
      </Box>
    </ChakraProvider>
  );
};

export default Header;
