import { assign, createMachine, InterpreterFrom, StateFrom } from "xstate";
import { answer, answerNumber } from "~/constants/answers";
import { CONFIG } from "~/constants/config";

const initialContext = {
  tries: CONFIG.tries,
  answer,
  answerNumber,
  guesses: [] as string[],
  guess: "",
};

type MathlerContext = typeof initialContext;

type AddCharacterEvent = { type: "ADD_CHARACTER"; key: string };

const addCharacter = assign<MathlerContext, AddCharacterEvent>({
  guess: (context, event) => `${context.guess}${event.key}`,
});

type RemoveCharacterEvent = { type: "REMOVE_CHARACTER" };

const removeCharacter = assign<MathlerContext, RemoveCharacterEvent>({
  guess: (context) => context.guess.slice(0, -1),
});

type SubmitGuessEvent = { type: "SUBMIT_GUESS" };

const submitGuess = assign<MathlerContext, SubmitGuessEvent>({
  guesses: (context) => [...context.guesses, context.guess],
});

type MathlerEvent = AddCharacterEvent | RemoveCharacterEvent | SubmitGuessEvent;

export const mathlerMachine = createMachine<MathlerContext, MathlerEvent>(
  {
    id: "mathler",
    context: initialContext,
    initial: "guessing",
    invoke: {
      src: "keydownListener",
    },
    states: {
      guessing: {
        entry: "clearGuess",
        on: {
          ADD_CHARACTER: {
            cond: "canAddCharacter",
            actions: "addCharacter",
          },
          REMOVE_CHARACTER: {
            cond: "canRemoveCharacter",
            actions: "removeCharacter",
          },
          SUBMIT_GUESS: [
            { cond: "isGuessNotFull", actions: "notifyGuessNotFull" },
            { cond: "isGuessInvalid", actions: "notifyInvalidGuess" },
            {
              actions: "submitGuess",
              target: "revealing",
            },
          ],
        },
      },
      revealing: {
        after: {
          500: [
            { target: "#won", cond: "didPlayerWin" },
            { target: "#lost", cond: "didPlayerLose" },
            { target: "guessing" },
          ],
        },
      },
      won: { id: "won", type: "final" },
      lost: { id: "lost", type: "final" },
    },
  },
  {
    actions: {
      addCharacter,
      removeCharacter,
      submitGuess,
      clearGuess: assign({ guess: "" }),
    } as any,
    guards: {
      didPlayerWin: (ctx) => ctx.guess === ctx.answer,
      didPlayerLose: (ctx) => ctx.guesses.length === ctx.tries,
      canAddCharacter: (ctx, e) =>
        ctx.guess.length < ctx.answer.length &&
        /^[0-9\+\-\*\/]$/.test((e as AddCharacterEvent).key),
      canRemoveCharacter: (ctx) => ctx.guess.length > 0,
      isGuessInvalid: (ctx) => {
        try {
          return eval(ctx.guess) !== ctx.answerNumber;
        } catch (e) {
          return true;
        }
      },
      isGuessNotFull: (ctx) => ctx.guess.length < ctx.answer.length,
    },
    services: {
      keydownListener: () => (send) => {
        const listener = ({ key }: KeyboardEvent) => {
          const event = mapKeyToEvent(key);
          send(event);
        };

        window.addEventListener("keydown", listener);

        return () => {
          window.removeEventListener("keydown", listener);
        };
      },
    },
  }
);

export type MathlerInterpreter = InterpreterFrom<typeof mathlerMachine>;
export type MathlerState = StateFrom<typeof mathlerMachine>;

export const mapKeyToEvent = (key: string): MathlerEvent => {
  if (key === "Backspace") {
    return { type: "REMOVE_CHARACTER" };
  }

  if (key === "Enter") {
    return { type: "SUBMIT_GUESS" };
  }

  return { type: "ADD_CHARACTER", key };
};
