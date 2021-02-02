import React, { useState } from 'react';
import { Box, TextField } from '@material-ui/core';
// @ts-ignore
import morse from 'morse-decoder';

const App: React.FC = () => {
  const [morseState, setMorseState] = useState({
    text: "SOS",
    morseText: morse.encode("SOS")
  });

  return (
    <Box m={2}>
      <TextField
        label="Text"
        variant="outlined"
        value={morseState.text}
        onChange={e => setMorseState({
          text: e.target.value,
          morseText: morse.encode(e.target.value)
        })}
      />
      <TextField
        label="Morse"
        variant="outlined"
        value={morseState.morseText}
        onChange={e => setMorseState({
          text: morse.decode(e.target.value),
          morseText: e.target.value
        })}
      />
    </Box>
  );
}

export default App;
