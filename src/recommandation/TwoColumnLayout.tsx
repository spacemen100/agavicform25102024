// TwoColumnLayout.tsx
import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import RiskProfile from './votrerecommandation/RiskProfile';
import AgavicRecommendation from './votrerecommandation/AgavicRecommendation';
import YourProject from './votrerecommandation/YourProject';
import QuestionsBox from './votrerecommandation/QuestionsBox';
import RiskDisclaimer from './votrerecommandation/RiskDisclaimer';

const TwoColumnLayout: React.FC = () => {
    return (
        <SimpleGrid columns={2} spacing={10} p={5}>
            <Box>
                <AgavicRecommendation />
                <QuestionsBox />
                <RiskDisclaimer />
            </Box>
            <Box>
                <RiskProfile />
            </Box>
        </SimpleGrid>
    );
};

export default TwoColumnLayout;
