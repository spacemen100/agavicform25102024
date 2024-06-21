import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Progress, VStack } from '@chakra-ui/react';
import { useUuid } from './../context/UuidContext';
import { supabase } from './../supabaseClient';

interface Response {
  step1: string;
  step4: number;
  step9: string;
  step10: string;
  step13: number;
  step14: number;
  step15: string;
  step16: string;
  step17: string;
  step18: string;
  step19: string;
  step20: string;
  step21: string;
  step22: string;
  step23: string;
  step24: string;
}

const weights = {
  step1: 0.1,
  step4: 0.1,
  step9: 0.1,
  step10: 0.05,
  step13: 0.1,
  step14: 0.1,
  step15: 0.1,
  step16: 0.1,
  step17: 0.05,
  step18: 0.05,
  step19: 0.05,
  step20: 0.05,
  step21: 0.05,
  step22: 0.05,
  step23: 0.05,
  step24: 0.05,
};

const calculateRiskScore = (response: Response): number => {
  let score = 0;

  const step1Scores: { [key: string]: number } = {
    fructifier: 8,
    epargner: 2,
    achat: 5,
    retraite: 3,
    patrimoine: 4,
    compte: 6,
    tresorerie: 7,
  };
  score += step1Scores[response.step1] * weights.step1;

  score += response.step4 * weights.step4;

  const step9Scores: { [key: string]: number } = {
    lessThan30000: 2,
    '30000to45000': 3,
    '45000to60000': 4,
    '60000to100000': 5,
    '100000to150000': 6,
    moreThan150000: 7,
  };
  score += step9Scores[response.step9] * weights.step9;

  const step10Scores: { [key: string]: number } = {
    oui: 5,
    non: 3,
  };
  score += step10Scores[response.step10] * weights.step10;

  score += response.step13 * weights.step13;

  score += response.step14 * weights.step14;

  const step15And16Scores: { [key: string]: number } = {
    certainementPas: 1,
    probablementPas: 2,
    probablement: 3,
    tresProbablement: 4,
  };
  score += step15And16Scores[response.step15] * weights.step15;
  score += step15And16Scores[response.step16] * weights.step16;

  const step17Scores: { [key: string]: number } = {
    oui: 4,
    non: 2,
  };
  score += step17Scores[response.step17] * weights.step17;

  const perceptionScores: { [key: string]: number } = {
    vrai: 4,
    faux: 2,
    jeNeSaisPas: 1,
  };
  score += perceptionScores[response.step18] * weights.step18;
  score += perceptionScores[response.step19] * weights.step19;
  score += perceptionScores[response.step20] * weights.step20;

  const step21Scores: { [key: string]: number } = {
    noLoss: 1,
    max10: 2,
    max20: 3,
    moreThan20: 4,
  };
  score += step21Scores[response.step21] * weights.step21;

  const gainLossScores: { [key: string]: number } = {
    gain5000loss2000: 4,
    gain2000loss1000: 3,
    gain1000loss400: 2,
    gain500noloss: 1,
    gain20loss5: 1,
    gain30loss10: 2,
    gain50loss15: 3,
    gain70lossMore15: 4,
  };
  score += gainLossScores[response.step22] * weights.step22;
  score += gainLossScores[response.step23] * weights.step23;

  const investmentActionScores: { [key: string]: number } = {
    reinvest: 4,
    wait: 3,
    sellPart: 2,
    sellAll: 1,
    dontKnow: 1,
  };
  score += investmentActionScores[response.step24] * weights.step24;

  const maxScore = 10 * (Object.keys(weights).length);
  const normalizedScore = (score / maxScore) * 10;

  return Math.round(normalizedScore);
};

const CombinedRiskScoreComponent: React.FC = () => {
  // eslint-disable-next-line
  const { uuid, getResponse } = useUuid();
  const [response, setResponse] = useState<Response | null>(null);

  useEffect(() => {
    const fetchResponses = async () => {
      const { data, error } = await supabase
        .from('form_responses')
        .select(
          'step1, step4, step9, step10, step13, step14, step15, step16, step17, step18, step19, step20, step21, step22, step23, step24'
        )
        .eq('id', uuid)
        .single();

      if (error) {
        console.error('Error fetching responses:', error);
        return;
      }

      if (data) {
        setResponse(data as Response);
      }
    };

    fetchResponses();
  }, [uuid]);

  if (!response) {
    return <Text>Loading...</Text>;
  }

  const riskScore = calculateRiskScore(response);

  const getColor = (score: number) => {
    if (score <= 2) return 'green.400';
    if (score <= 4) return 'yellow.400';
    if (score <= 6) return 'orange.400';
    if (score <= 8) return 'red.400';
    return 'red.600';
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="md" boxShadow="md" maxW="400px" mx="auto">
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          Votre Score de Risque
        </Text>
        <Flex align="center" justify="center">
          <Text fontSize="2xl" fontWeight="bold" color={getColor(riskScore)}>
            {riskScore}
          </Text>
          <Text fontSize="lg" ml={2}>/ 10</Text>
        </Flex>
        <Progress colorScheme="green" value={(riskScore / 10) * 100} size="lg" w="100%" />
      </VStack>
    </Box>
  );
};

export default CombinedRiskScoreComponent;
