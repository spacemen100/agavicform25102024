import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import Routes from './routes/Routes';

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

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Banner />
        <Routes />
      </Router>
    </ChakraProvider>
  );
};

export default App;
