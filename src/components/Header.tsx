import React from 'react';
import { Box, Flex, Text, Button, Image } from '@chakra-ui/react';

const Header: React.FC = () => {
  return (
    <Box bg="#0a0c2a" color="white" px={4} py={2}>
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Flex align="center">
          <Image src="/path/to/logo.png" alt="Yomoni Logo" height="40px" mr={3} />
          <Text fontSize="xl" fontWeight="bold">Yomoni</Text>
        </Flex>
        <Button variant="outline" borderColor="white" color="white" _hover={{ bg: '#1a1c4a' }}>
          Une question ?
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
