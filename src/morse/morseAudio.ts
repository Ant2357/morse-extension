// @ts-ignore
import morse from 'morse-decoder';

export const playMorseAudio = (text: string): void => {
  try {
    morse.audio(text).play();
  } catch (_) {
    alert("モールス信号の再生に失敗しました。");
  }
};

export const downloadMorseAudio = (text: string): void => {
  try {
    morse.audio(text).exportWave();
  } catch (_) {
    alert("モールス信号のダウンロードに失敗しました。");
  }
};
