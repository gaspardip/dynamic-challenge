import { Flex, FlexProps } from "@chakra-ui/react";
import { memo } from "react";
import { useCharacterStatusProps } from "~/hooks/useCharacterStatusProps";
import { CharacterStatus } from "~/hooks/useGetCharacterStatus";

interface CellProps extends Omit<FlexProps, "children"> {
  status?: CharacterStatus;
  children?: string;
}

export const Cell = memo(
  ({ status, ...props }: CellProps) => {
    const statusProps = useCharacterStatusProps(status);

    return (
      <Flex
        borderColor={props.children ? "teal.700" : "teal.500"}
        {...props}
        {...statusProps}
        boxSize={{ base: 12, md: 16 }}
        borderWidth={2}
        align="center"
        justify="center"
        rounded="lg"
        fontWeight="bold"
        fontSize="lg"
        transitionProperty="border-color, transform"
        transitionDuration="200ms"
        transitionTimingFunction="ease"
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.status === nextProps.status
);

Cell.displayName = "Cell";

export const ActiveCell = (props: CellProps) => {
  return <Cell {...props} borderColor="yellow.500" transform="scale(1.10)" />;
};
