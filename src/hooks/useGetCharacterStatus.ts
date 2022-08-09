import { useCallback } from "react";
import { useAnswer, useGuesses } from "~/context/MathlerContext";

export const useGetCharacterStatus = () => {
  const answer = useAnswer();
  const guesses = useGuesses();

  return useCallback(
    (character: string, index?: number) => {
      if (!guesses.some((guess) => guess.includes(character))) {
        return "unplayed";
      }

      if (answer.includes(character)) {
        if (
          guesses.some(
            (guess) => answer[index ?? guess.indexOf(character)] === character
          )
        ) {
          return "correct";
        }

        if (guesses.some((guess) => guess.includes(character))) {
          return "almost";
        }
      }

      return "incorrect";
    },
    [answer, guesses]
  );
};

export type CharacterStatus = ReturnType<
  ReturnType<typeof useGetCharacterStatus>
>;
