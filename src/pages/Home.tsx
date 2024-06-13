import React from 'react';
import {  Button, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Flex align="center" justify="center" height="100vh" direction="column">
      <Heading mb={6}>Welcome to Yomoni</Heading>
      <Link to="/project">
        <Button colorScheme="teal" size="lg">Start Project</Button>
      </Link>
    </Flex>
  );
};

export default Home;
