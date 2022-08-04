import { HStack, VStack } from "@chakra-ui/react";
import { keys } from "~/constants/keys";
import { Key } from "./Key";

export const Keyboard = () => {
  return (
    <VStack spacing={2}>
      {keys.map((row, i) => (
        <HStack key={i} align="center" spacing={2}>
          {row.map((key) => (
            <Key key={key}>{key}</Key>
          ))}
        </HStack>
      ))}
    </VStack>
  );
};
