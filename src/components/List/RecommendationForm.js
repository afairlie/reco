import React, { useState } from 'react';
import { MuiThemeProvider } from "@material-ui/core/styles";
import Circle from '../Circle';
import { Box, TextField, Typography } from '@material-ui/core';
import { formTheme, useFormStyle } from './../../constants/FormThemes'
import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { API_ROOT, HEADERS } from '../../constants/index.js';

export default function New({ state, dispatch, list, transition, getList }) {
  const classes = useFormStyle();
  const [businessName, setBusinessName] = useState("");
  const [businessUrl, setBusinessUrl] = useState("");
  const [businessImg, setBusinessImg] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  function recommendBusiness(state, listId, businessName, businessUrl, businessImg, comment) {

    let businessObj = {};
    let recommendationObj = {};
    let commentObj = {};

//recommendation response empty string and we need reconfigure posting a comment

      axios.post(`/api/businesses/`, { name: businessName, website: businessUrl, image: businessImg })
      .then(res => {
        return (fetch(`${API_ROOT}/recommendations`, {
          method: 'POST',
          headers: HEADERS,
          body: JSON.stringify({ list_id: listId, business_id: res.data.id })
        }))
      })
      
      .then(res => {
        console.log("json", res)
      //   return (axios.post(`/api/recommendations/`, { list_id: listId, business_id: businessObj.id }))
      })
      // .then(res => {
      //   recommendationObj = res; console.log("HERE", res); return res
      // })
      // .then(res => {
      //   return axios.post(`/api/recommendations/${state.activeRecoRoom.id}/comments`, { because: comment, recommendation_id: state.activeRecoRoom.id })
      // })
      // .then(() => axios.post(`/api/recommendations/${state.activeRecoRoom.id}/comments`, { because: comment, recommendation_id: state.activeRecoRoom.id }))
      // .then(res => {
      //   commentObj = res.data; console.log("c", res); return res.data
      // })
      .then(() => getList(listId))
      .then(() => transition('BUBBLE'))
      .catch(error => console.log(error));
      // .catch(error => setError("A server error occured."));
  }

  function validateData(name, url, img, comment) {
    if (name && url && comment && img) {
      recommendBusiness(state, list.id, businessName, businessUrl, businessImg, comment)
    } else {
      setError("An error occured. Please fill out all the fields.")
    }
  }


  return (
    <>
      <MuiThemeProvider theme={formTheme}>
        <Box mt={25} position="relative" align="center">
          <Circle cx={400} cy={335} r={320} fill="#B1D6EB"></Circle>
        </Box>
        <Box className={classes.root} mt={-62} position="relative" display="flex" justifyContent="center" alignItems="center">
          <FormControl>
            <Typography align='center' variant='h5' style={{ color: '#007065' }}>
              Recommending
            </Typography>
            <TextField className={classes.textField} style={{ width: '28em', margin: '10px' }} id="business-name" label="Business name" variant="outlined"
              value={businessName} onChange={event => setBusinessName(event.target.value)} />
            <TextField className={classes.textField} style={{ width: '28em', margin: '10px' }} id="business-url" label="Business URL" variant="outlined"
              value={businessUrl} onChange={event => setBusinessUrl(event.target.value)} />
            <TextField className={classes.textField} style={{ width: '28em', margin: '10px' }} id="business-img" label="Post an image!" variant="outlined"
              value={businessImg} onChange={event => setBusinessImg(event.target.value)} />
            <Typography align='center' variant='h5' style={{ color: '#007065', marginBottom: '1em' }}>
              for '{<span style={{ color: 'black', fontStyle: 'italic' }}>{list.name}</span>}' because...
            </Typography>
            <TextField className={classes.textField} style={{ width: '28em', margin: '10px', marginTop: '-10px' }} id="business-comment" label="Write the first comment!" variant="outlined"
              value={comment} onChange={event => setComment(event.target.value)} />
          </FormControl>
        </Box>
        <Box position="relative" mt={26}>
          <Button onClick={() => { validateData(businessName, businessUrl, businessImg, comment) }}
            position="relative" variant="contained" size="large" color="primary" className={classes.margin}>
            Submit
        </Button>
          <span style={{ color: '#007065', margin: '0 1em' }}>or</span> <Button variant='outlined' style={{ opacity: .60 }} onClick={() => transition('BUBBLE')}>cancel</Button>
          <div style={{ color: '#FF0000', marginTop: "120px" }}>{error}</div>
        </Box>
      </MuiThemeProvider>
    </>
  )
};