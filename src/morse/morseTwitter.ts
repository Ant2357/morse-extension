
export const tweetMorse = (morseText: string): void => {
  const tweet: string = encodeURIComponent(`${morseText}`);
  window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank");
}
