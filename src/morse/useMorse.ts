import { useState } from 'react';
// @ts-ignore
import morse from 'morse-decoder';

export type MorseState = {
  text: string;
  morseText: string;
  isJpMorse: boolean;
  priority: number;
};

export interface MorseFuncs {
  encodeMorse: (newText: string) => void;
  decodeMorse: (newMorseText: string) => void;
  jpMode: (isJpMorse: boolean) => void;
  playMorseAudio: (text: string) => void;
  downloadMorseAudio: (text: string) => void;
  tweetMorse: (morseText: string) => void;
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

  const playMorseAudio = (text: string): void => {
    try {
      morse.audio(text).play();
    } catch (_) {
      alert("モールス信号の再生に失敗しました。");
    }
  };

  const downloadMorseAudio = (text: string): void => {
    try {
      morse.audio(text).exportWave();
    } catch (_) {
      alert("モールス信号のダウンロードに失敗しました。");
    }
  };

  const tweetMorse = (morseText: string): void => {
    const tweet: string = encodeURIComponent(`${morseText}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank");
  }

  return [morseState, { encodeMorse, decodeMorse, jpMode, playMorseAudio, downloadMorseAudio, tweetMorse }];
};
