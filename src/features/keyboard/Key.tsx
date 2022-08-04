import { Button, ButtonProps } from "@chakra-ui/react";
import { mapKeyToEvent } from "~/context/mathler.machine";
import { useMathlerService } from "~/context/MathlerContext";

interface KeyProps extends Omit<ButtonProps, "children"> {
  children: string;
}

export const Key = (props: KeyProps) => {
  const { send } = useMathlerService();

  const onClick = () => {
    const event = mapKeyToEvent(props.children);
    send(event);
  };

  return (
    <Button
      {...props}
      onClick={onClick}
      minW={12}
      h={12}
      rounded="md"
      colorScheme="gray"
    />
  );
};
