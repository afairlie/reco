import React, { useState } from 'react';
import { navTheme, useNavStyle } from '../constants/navThemes'
import { MuiThemeProvider } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AccountCircle, AddCircle } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import Search from './Search/Search'


export default function Nav({ name, location, transitionToCreate, transitionToShow, transitionToMain, getList }) {
  const [resultId, setResultId] = useState(null);

  const classes = useNavStyle();
  return (
    <>
      <MuiThemeProvider theme={navTheme}>
        <AppBar position='fixed'>
          <Toolbar>
            <img src='reco-logo.png' alt="reco logo" className={classes.logo} onClick={() => transitionToMain()}/>
            <Box className={classes.title}></Box>
            <Typography align='center' variant='h6' noWrap>
              Any recommendations for
            </Typography>
            <Search placeholder={name} queryKey='list' setResultId={setResultId} />
            <Typography align='center' variant='h6' noWrap>
              near
            </Typography>
            <Search placeholder={location + ' (optional)'} queryKey='location' setResultId={setResultId} />
            <Typography align='center' variant='h6' noWrap>
              ?&nbsp;&nbsp;
            </Typography>
            <Button onClick={() => { getList(resultId); transitionToShow() }} className={classes.button} variant='contained' size='small' color='secondary'>
              Search
            </Button>
            <Box className={classes.title}></Box>
            <Button color='inherit'>About</Button>
            <Button color='inherit'>Login</Button>
            <Button color='inherit'>Sign Up</Button>
            <Tooltip disableFocusListener disableTouchListener title="Ask for a recommendation!">
              <Button onClick={() => transitionToCreate()} color='inherit'>
                <AddCircle fontSize='large' color='inherit' />
              </Button>
            </Tooltip>
          </Toolbar>
        </AppBar>
        {/* <TextField
          placeholder='Placeholder'
          label='TextBox' /> */}
      </MuiThemeProvider>
    </>
  )
}
