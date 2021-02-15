import React, { useState } from 'react';
import { makeStyles, Box, Grid, FormControlLabel, Switch, TextField, Button } from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GetAppIcon from '@material-ui/icons/GetApp';
import TwitterIcon from '@material-ui/icons/Twitter';

// @ts-ignore
import morse from 'morse-decoder';

import { playMorseAudio, downloadMorseAudio } from 'morse/morseAudio';

type MorseState = {
  text: string;
  morseText: string;
  isJpMorse: boolean;
  priority: number;
};

const useStyles = makeStyles((theme) => ({
  morseForm: {},
  morseForm__actionButtons: {
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const [morseState, setMorseState] = useState<MorseState>({
    text: "SOS",
    morseText: morse.encode("SOS"),
    isJpMorse: false,
    priority: 1
  });

  const encodeMorse = (mState: MorseState, newText: string): void => {
    setMorseState({
      text: newText,
      morseText: morse.encode(newText, { priority: mState.priority }),
      isJpMorse: mState.isJpMorse,
      priority: mState.priority
    });
  }

  const decodeMorse = (mState: MorseState, newMorseText: string): void => {
    setMorseState({
      text: morse.decode(newMorseText, { priority: mState.priority }),
      morseText: newMorseText,
      isJpMorse: mState.isJpMorse,
      priority: mState.priority
    });
  }

  const updateMorseLanguage = (mState: MorseState, isJpMorse: boolean) => {
    const newPriority: number = isJpMorse ? 10 : 1;
    setMorseState({
      text: morse.decode(mState.morseText, { priority: newPriority }),
      morseText: morse.encode(mState.text, { priority: newPriority }),
      isJpMorse: isJpMorse,
      priority: newPriority
    })
  }

  const tweetMorse = (morseText: string): void => {
    const tweet: string = encodeURIComponent(`${morseText}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank");
  }

  return (
    <Box m={2} className={classes.morseForm}>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={morseState.isJpMorse}
                onChange={() => updateMorseLanguage(morseState, !morseState.isJpMorse)}
                color="primary"
              />
            }
            label="Japanese mode"
          />
        </Grid>

        <Grid item xs={12}>
          <Box mt={1}>
            <TextField
              label="Text"
              variant="outlined"
              value={morseState.text}
              onChange={e => encodeMorse(morseState, e.target.value)}
            />
            <TextField
              label="Morse"
              variant="outlined"
              value={morseState.morseText}
              onChange={e => decodeMorse(morseState, e.target.value)}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box mt={1} className={classes.morseForm__actionButtons}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<PlayArrowIcon />}
              onClick={() => playMorseAudio(morseState.text)}
            >
              Play the Audio
            </Button>

            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<GetAppIcon />}
              onClick={() => downloadMorseAudio(morseState.text)}
            >
              Download
            </Button>

            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<TwitterIcon />}
              onClick={() => tweetMorse(morseState.morseText)}
            >
              Tweet
            </Button>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}

export default App;
