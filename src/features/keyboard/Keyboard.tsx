import { Flex, VStack } from "@chakra-ui/react";
import { keys } from "~/constants/keys";
import { useGetCharacterStatus } from "~/hooks/useGetCharacterStatus";
import { Key } from "./Key";

export const Keyboard = () => {
  const getCharacterStatus = useGetCharacterStatus();

  return (
    <VStack spacing={2} w="full">
      {keys.map((row, i) => (
        <Flex key={i} wrap="wrap" justify="center" gap={2}>
          {row.map((key) => (
            <Key key={key} status={getCharacterStatus(key)}>
              {key}
            </Key>
          ))}
        </Flex>
      ))}
    </VStack>
  );
};
