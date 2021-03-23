import React from 'react';
import { useMorse } from 'morse/useMorse';
import MorseForm from 'components/MorseForm';

const App: React.FC = () => {
  const [morseState, morse] = useMorse();
  return (
    <MorseForm
      morseState={morseState}
      morse={morse}
    />
  );
}

export default App;
