import React, { useState } from 'react';
import { makeStyles, Box, Grid, FormControlLabel, Switch, TextField, Button } from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GetAppIcon from '@material-ui/icons/GetApp';
import TwitterIcon from '@material-ui/icons/Twitter';

// @ts-ignore
import morse from 'morse-decoder';

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
  const [morseState, setMorseState] = useState<{
    text: string;
    morseText: string;
    isJpMorse: boolean;
    priority: number;
  }>({
    text: "SOS",
    morseText: morse.encode("SOS"),
    isJpMorse: false,
    priority: 1
  });

  const playMorseAudio = (text: string): void => {
    try {
      morse.audio(text).play();
    } catch (_) {
      alert("モールス信号の再生に失敗しました。");
    }
  };

  const downloadMorseAudio = (text: string): void => {
    try {
      morse.audio(morseState.text).exportWave();
    } catch (_) {
      alert("モールス信号のダウンロードに失敗しました。");
    }
  };

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
                onChange={() => {
                  const updateIsJpMorse = !morseState.isJpMorse;
                  const updatePriority: number = updateIsJpMorse ? 10 : 1;
                  setMorseState({
                    text: morse.decode(morseState.morseText, { priority: updatePriority }),
                    morseText: morse.encode(morseState.text, { priority: updatePriority }),
                    isJpMorse: updateIsJpMorse,
                    priority: updatePriority
                  })
                }}
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
              onChange={e => setMorseState({
                text: e.target.value,
                morseText: morse.encode(e.target.value, { priority: morseState.priority }),
                isJpMorse: morseState.isJpMorse,
                priority: morseState.priority
              })}
            />
            <TextField
              label="Morse"
              variant="outlined"
              value={morseState.morseText}
              onChange={e => setMorseState({
                text: morse.decode(e.target.value, { priority: morseState.priority }),
                morseText: e.target.value,
                isJpMorse: morseState.isJpMorse,
                priority: morseState.priority
              })}
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
