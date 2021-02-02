import React, { useState } from 'react';
import { Box, TextField } from '@material-ui/core';
// @ts-ignore
import morse from 'morse';

const App: React.FC = () => {
  const [morseState, setMorseState] = useState({
    text: "SOS",
    morseText: morse.encode("SOS")
  });

  const encodeMorse = (newText: string) => {
    setMorseState({
      text: newText,
      morseText: morse.encode(newText)
    })
  }

  const decodeMorse = (newMorse: string) => {
    const decodeText: string = morse.decode(newMorse);
    setMorseState({
      text: decodeText === " " ? "" : decodeText,
      morseText: newMorse
    })
  }

  return (
    <Box m={2}>
      <TextField
        label="Text"
        variant="outlined"
        value={morseState.text}
        onChange={e => encodeMorse(e.target.value)}
      />
      <TextField
        label="Morse"
        variant="outlined"
        value={morseState.morseText}
        onChange={e => decodeMorse(e.target.value)}
      />
    </Box>
  );
}

export default App;
