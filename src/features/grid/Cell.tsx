import { Flex, FlexProps } from "@chakra-ui/react";
import { memo } from "react";

interface CellProps extends Omit<FlexProps, "children"> {
  children?: string;
  isActive?: boolean;
}

export const Cell = memo(
  ({ isActive = false, ...props }: CellProps) => {
    return (
      <Flex
        {...props}
        boxSize={16}
        borderColor={
          isActive ? "yellow.500" : props.children ? "teal.700" : "teal.500"
        }
        transform={isActive ? "scale(1.15)" : undefined}
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
    prevProps.isActive === nextProps.isActive
);

Cell.displayName = "Cell";
