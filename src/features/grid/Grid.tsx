import { StackProps, VStack } from "@chakra-ui/react";
import { useMathlerActor } from "~/context/MathlerContext";
import { Row } from "./Row";

export const Grid = (props: StackProps) => {
  const [state] = useMathlerActor();

  const { tries, guess, guesses } = state.context;

  const emptyRows = Array.from({
    length: Math.max(tries - guesses.length - 1, 0),
  });

  return (
    <VStack {...props} spacing={4}>
      {guesses.map((guess) => (
        <Row guess={guess} key={guess} />
      ))}
      <Row guess={guess} isActive />
      {emptyRows.map((_, index) => (
        <Row key={index} />
      ))}
    </VStack>
  );
};

Grid.displayName = "Grid";
