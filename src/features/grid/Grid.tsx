import { StackProps, VStack } from "@chakra-ui/react";
import { useGuesses, useTries } from "~/context/MathlerContext";
import { ActiveRow, EmptyRow, Row } from "./Row";

export const Grid = (props: StackProps) => {
  const tries = useTries();
  const guesses = useGuesses();

  const emptyRows = Array.from({
    length: tries - guesses.length - 1,
  });

  return (
    <VStack {...props} spacing={2}>
      {guesses.map((guess, index) => (
        <Row guess={guess} key={index} />
      ))}
      {guesses.length < tries && <ActiveRow />}
      {emptyRows.map((_, index) => (
        <EmptyRow key={index} />
      ))}
    </VStack>
  );
};

Grid.displayName = "Grid";
