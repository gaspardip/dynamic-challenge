import { HStack, StackProps } from "@chakra-ui/react";
import { memo } from "react";
import { useAnswer, useGuess } from "~/context/MathlerContext";
import { useGetCharacterStatus } from "~/hooks/useGetCharacterStatus";
import { ActiveCell, Cell } from "./Cell";

export const BaseRow = (props: StackProps) => {
  return <HStack {...props} spacing={2} />;
};

interface RowProps {
  guess?: string;
}

export const Row = memo(
  ({ guess }: RowProps) => {
    const { cells } = useCells(guess);
    const getCharacterStatus = useGetCharacterStatus();

    return (
      <BaseRow>
        {cells.map((cell, index) => (
          <Cell key={index} status={getCharacterStatus(cell, index)}>
            {cell}
          </Cell>
        ))}
      </BaseRow>
    );
  },
  (prevProps, nextProps) => prevProps.guess === nextProps.guess
);

Row.displayName = "Row";

export const ActiveRow = () => {
  const guess = useGuess();
  const { cells, empties } = useCells(guess);

  return (
    <BaseRow>
      {cells.map((cell, index) => {
        const CellComponent = index === cells.length - 1 ? ActiveCell : Cell;

        return <CellComponent key={index}>{cell}</CellComponent>;
      })}
      {empties.map((_, index) => (
        <Cell key={index} />
      ))}
    </BaseRow>
  );
};

export const EmptyRow = memo(() => {
  const { empties } = useCells();

  return (
    <BaseRow>
      {empties.map((_, index) => (
        <Cell key={index} />
      ))}
    </BaseRow>
  );
});

EmptyRow.displayName = "EmptyRow";

const useCells = (guess = "") => {
  const answer = useAnswer();

  const cells = guess.split("");
  const empties = Array.from({ length: answer.length - cells.length });

  return { cells, empties };
};
