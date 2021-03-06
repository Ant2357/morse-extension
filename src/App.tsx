import React from 'react';
import { makeStyles, Box, Grid, FormControlLabel, Switch, TextField, Button } from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GetAppIcon from '@material-ui/icons/GetApp';
import TwitterIcon from '@material-ui/icons/Twitter';

import { playMorseAudio, downloadMorseAudio } from 'morse/morseAudio';
import { tweetMorse } from 'morse/morseTwitter';
import { useMorse } from 'morse/useMorse';

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
  const [morseState, morse] = useMorse();

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
                onChange={() => morse.jpMode(!morseState.isJpMorse)}
                color="primary"
              />
            }
            label="Japanese mode"
          />
        </Grid>

        <Grid item xs={12}>
          <Box mt={1}>
            <TextField
              multiline={true}
              fullWidth={true}
              label="Text"
              variant="outlined"
              value={morseState.text}
              onChange={e => morse.encodeMorse(e.target.value)}
            />
          </Box>
          <Box mt={1}>
            <TextField
              multiline={true}
              fullWidth={true}
              label="Morse"
              variant="outlined"
              value={morseState.morseText}
              onChange={e => morse.decodeMorse(e.target.value)}
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
