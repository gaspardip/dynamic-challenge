import { keyframes } from "@chakra-ui/react";
import { CharacterStatus } from "./useGetCharacterStatus";

export const useCharacterStatusProps = (
  status: CharacterStatus = "unplayed"
) => {
  switch (status) {
    case "correct": {
      return {
        ...baseProps,
        bg: "green.500",
        _hover: {
          bg: "green.700",
        },
      };
    }
    case "incorrect": {
      return {
        ...baseProps,
        bg: "gray.500",
        _hover: {
          bg: "gray.700",
        },
      };
    }
    case "almost": {
      return {
        ...baseProps,
        bg: "yellow.500",
        _hover: {
          bg: "yellow.700",
        },
      };
    }
    case "unplayed":
      return {};
  }
};

const scaleUp = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.10); }
`;

const animation = `${scaleUp} 0.2s ease-in-out`;

const baseProps = { animation, borderColor: "transparent" };
