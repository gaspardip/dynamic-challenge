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

const selectAnswer = (state: MathlerState) => state.context.answer;

export const useAnswer = () => {
  const service = useMathlerService();
  const answer = useSelector(service, selectAnswer);

  return answer;
};

export { MathlerContext };
