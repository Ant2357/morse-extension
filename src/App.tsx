import React, { useEffect } from 'react';
import { useMorse } from 'morse/useMorse';
import { loadLocalStorageText, saveLocalStorageText } from 'browser/localStorage';
import MorseForm from 'components/MorseForm';

const App: React.FC = () => {
  const [morseState, morse] = useMorse(loadLocalStorageText());

  useEffect(() => {
    saveLocalStorageText(morseState.text);
  });

  return (
    <MorseForm
      morseState={morseState}
      morse={morse}
    />
  );
}

export default App;
