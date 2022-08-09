import { useToast } from "@chakra-ui/react";
import { createContext } from "@chakra-ui/react-utils";
import { useActor, useInterpret, useSelector } from "@xstate/react";
import { ReactNode, useMemo } from "react";
import {
  MathlerInterpreter,
  mathlerMachine,
  MathlerState,
} from "./mathler.machine";

interface MathlerContextValue {
  mathlerService: MathlerInterpreter;
}

const [MathlerContextProvider, useMathlerContext, MathlerContext] =
  createContext<MathlerContextValue>();

interface MathlerProviderProps {
  children: ReactNode;
}

export const MathlerProvider = ({ children }: MathlerProviderProps) => {
  const toast = useToast();

  const mathlerService = useInterpret(mathlerMachine, {
    actions: {
      notifyGuessNotFull: () => {
        toast({
          title: "Guess not full",
          description: "Please fill in all the digits",
          status: "error",
          isClosable: true,
        });
      },
      notifyInvalidGuess: ({ answerNumber }) => {
        toast({
          title: "Guess not valid",
          description: (
            <p>
              Every guess must equal {answerNumber}.<br />
              Are you forgetting order of operations?
            </p>
          ),
          status: "error",
          isClosable: true,
        });
      },
      notifyPlayerWon: () => {
        toast({
          title: "You won!",
          description: "Congratulations!",
          status: "success",
          isClosable: true,
        });
      },
      notifyPlayerLost: ({ answer }) => {
        toast({
          title: "You lost!",
          description: (
            <p>
              You have no more guesses. <br />
              The answer was {answer}
            </p>
          ),
          status: "error",
          isClosable: true,
        });
      },
    },
  });

  const value = useMemo(() => ({ mathlerService }), [mathlerService]);

  return (
    <MathlerContextProvider value={value}>{children}</MathlerContextProvider>
  );
};

export const useMathlerService = () => {
  const { mathlerService } = useMathlerContext();

  return mathlerService;
};

export const useMathlerActor = () => {
  const mathlerService = useMathlerService();

  return useActor(mathlerService);
};

export const useIsPlaying = () => {
  const [state] = useMathlerActor();

  return ["won", "lost"].every((s) => !state.matches(s));
};

const selectAnswer = (state: MathlerState) => state.context.answer;
const selectGuess = (state: MathlerState) => state.context.guess;
const selectGuesses = (state: MathlerState) => state.context.guesses;
const selectTries = (state: MathlerState) => state.context.tries;

const createSelectorHook = <T,>(selector: (state: MathlerState) => T) => {
  return () => {
    const mathlerService = useMathlerService();
    return useSelector(mathlerService, selector);
  };
};

export const useAnswer = createSelectorHook(selectAnswer);
export const useGuess = createSelectorHook(selectGuess);
export const useGuesses = createSelectorHook(selectGuesses);
export const useTries = createSelectorHook(selectTries);

export { MathlerContext };
