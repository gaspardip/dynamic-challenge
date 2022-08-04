import { HStack } from "@chakra-ui/react";
import { memo } from "react";
import { useAnswer } from "~/context/MathlerContext";
import { Cell } from "./Cell";

interface RowProps {
  isActive?: boolean;
  guess?: string;
}

export const Row = memo(
  ({ guess = "", isActive = false }: RowProps) => {
    const answer = useAnswer();

    const cells = guess.split("");
    const emptyCells = Array.from({ length: answer.length - cells.length });

    return (
      <HStack spacing={4}>
        {cells.map((cell, index) => (
          <Cell key={index} isActive={isActive && index === cells.length - 1}>
            {cell}
          </Cell>
        ))}
        {emptyCells.map((_, index) => (
          <Cell key={index} />
        ))}
      </HStack>
    );
  },
  (prevProps, nextProps) => prevProps.guess === nextProps.guess
);

Row.displayName = "Row";
