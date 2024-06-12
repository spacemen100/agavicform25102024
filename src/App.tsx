import React from 'react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Stack, IStackTokens } from '@fluentui/react';
import Routes from './routes/Routes';
import Header from './components/Header';

initializeIcons();

const stackTokens: IStackTokens = { childrenGap: 20 };

const App: React.FC = () => {
  return (
    <Stack tokens={stackTokens} styles={{ root: { width: '100%', margin: '0 auto', textAlign: 'center' } }}>
      <Header />
      <Routes />
    </Stack>
  );
};

export default App;
