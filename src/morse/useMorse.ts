import { useState } from 'react';
// @ts-ignore
import morse from 'morse-decoder';

type MorseState = {
  text: string;
  morseText: string;
  isJpMorse: boolean;
  priority: number;
};

interface MorseFuncs {
  encodeMorse: (newText: string) => void;
  decodeMorse: (newMorseText: string) => void;
  jpMode: (isJpMorse: boolean) => void;
};

export const useMorse = (): [MorseState, MorseFuncs] => {
  const [morseState, setMorseState] = useState<MorseState>({
    text: "SOS",
    morseText: morse.encode("SOS"),
    isJpMorse: false,
    priority: 1
  });

  const encodeMorse = (newText: string): void => {
    setMorseState({
      text: newText,
      morseText: morse.encode(newText, { priority: morseState.priority }),
      isJpMorse: morseState.isJpMorse,
      priority: morseState.priority
    });
  }

  const decodeMorse = (newMorseText: string): void => {
    setMorseState({
      text: morse.decode(newMorseText, { priority: morseState.priority }),
      morseText: newMorseText,
      isJpMorse: morseState.isJpMorse,
      priority: morseState.priority
    });
  }

  const jpMode = (isJpMorse: boolean) => {
    const newPriority: number = isJpMorse ? 10 : 1;
    setMorseState({
      text: morse.decode(morseState.morseText, { priority: newPriority }),
      morseText: morse.encode(morseState.text, { priority: newPriority }),
      isJpMorse: isJpMorse,
      priority: newPriority
    })
  }

  return [morseState, { encodeMorse, decodeMorse, jpMode }];
};
