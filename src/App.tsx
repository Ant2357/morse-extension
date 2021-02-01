import React, { useState } from 'react';
import { Box, TextField } from '@material-ui/core';
// @ts-ignore
import morse from 'morse';

const App: React.FC = () => {
  const [text, setText] = useState("SOS");
  const morseText: string = morse.encode(text);
  return (
    <Box m={2}>
      <TextField
        label="Text"
        variant="outlined"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <TextField
        label="Morse"
        value={morseText}
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
  );
}

export default App;
