import { QuestionOutlineIcon, SettingsIcon, StarIcon } from "@chakra-ui/icons";
import { Container, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { answerNumber } from "~/constants/answers";
import { Grid } from "../grid/Grid";
import { Keyboard } from "../keyboard/Keyboard";

export const App = () => {
  return (
    <Container px={0} py={16} maxW="md" centerContent>
      <Flex w="full">
        <IconButton aria-label="How to play?" icon={<QuestionOutlineIcon />} />
        <Heading size="xl" mx="auto">
          MATHLER
        </Heading>
        <IconButton mr={4} aria-label="Statistics" icon={<SettingsIcon />} />
        <IconButton aria-label="Settings" icon={<StarIcon />} />
      </Flex>
      <Text p={8} fontSize="lg">
        Find the hidden calculation that equals <strong>{answerNumber}</strong>
      </Text>
      <Grid pb={4} />
      <Keyboard />
    </Container>
  );
};
