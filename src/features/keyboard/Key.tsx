import { Button, ButtonProps } from "@chakra-ui/react";
import { memo } from "react";
import { mapKeyToEvent } from "~/context/mathler.machine";
import { useMathlerService } from "~/context/MathlerContext";
import { useCharacterStatusProps } from "~/hooks/useCharacterStatusProps";
import { CharacterStatus } from "~/hooks/useGetCharacterStatus";

interface KeyProps extends Omit<ButtonProps, "children"> {
  status?: CharacterStatus;
  children: string;
}

export const Key = memo(
  ({ status, ...props }: KeyProps) => {
    const { send } = useMathlerService();
    const statusProps = useCharacterStatusProps(status);

    const onClick = () => {
      const event = mapKeyToEvent(props.children);
      send(event);
    };

    return (
      <Button
        {...props}
        {...statusProps}
        onClick={onClick}
        minW={{ md: 12 }}
        h={12}
        rounded="md"
        colorScheme="gray"
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.status === nextProps.status
);
