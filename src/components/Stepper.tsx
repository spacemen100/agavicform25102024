import React from 'react';
import { Box, Flex, Text, Circle, HStack } from '@chakra-ui/react';

interface Step {
  number: number;
  label: string;
}

interface StepperProps {
  currentStep: number;
}

const steps: Step[] = [
  { number: 1, label: 'Projet' },
  { number: 2, label: 'Recommandation' },
  { number: 3, label: 'Souscription' },
  { number: 4, label: 'Justificatifs' },
  { number: 5, label: 'Signature' },
];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <Box bg="white" borderRadius="md" boxShadow="md" padding="4" width="100%">
      <HStack spacing="4" justify="center">
        {steps.map((step) => (
          <Flex key={step.number} align="center">
            <Circle
              size="30px"
              bg={currentStep === step.number ? 'navy' : 'white'}
              color={currentStep === step.number ? 'white' : 'navy'}
              border="2px solid"
              borderColor="navy"
            >
              {step.number}
            </Circle>
            <Text
              ml="2"
              color={currentStep === step.number ? 'navy' : 'gray.500'}
              fontWeight={currentStep === step.number ? 'bold' : 'normal'}
            >
              {step.label}
            </Text>
            {step.number < steps.length && (
              <Box
                w="50px"
                h="2px"
                bg={currentStep > step.number ? 'navy' : 'gray.200'}
                mx="2"
              />
            )}
          </Flex>
        ))}
      </HStack>
    </Box>
  );
};

export default Stepper;
