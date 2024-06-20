// TwoColumnLayout.tsx
import React from 'react';
import { Box, SimpleGrid, Spacer } from '@chakra-ui/react';
import RiskProfile from './votrerecommandation/RiskProfile';
import AgavicRecommendation from './votrerecommandation/AgavicRecommendation';
import QuestionsBox from './votrerecommandation/QuestionsBox';
import RiskDisclaimer from './votrerecommandation/RiskDisclaimer';

const TwoColumnLayout: React.FC = () => {
    return (
        <SimpleGrid columns={2} spacing={10} p={5}>
            <Box>
                <AgavicRecommendation />
                <QuestionsBox />
                <Spacer p={5} />
                <RiskDisclaimer />
            </Box>
            <Box>
                <RiskProfile />
            </Box>
        </SimpleGrid>
    );
};

export default TwoColumnLayout;
