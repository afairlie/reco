import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Card, CardHeader, CardContent, CardActions, Button, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 380,
    minWidth: 300
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

export default function ListCard({list, transitionToCreateRecommendation}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} square>
      <CardHeader
        title={list.name}
        subheader={list.location}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* ultimately, this should be randomized*/}
          {list.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="outlined" color="secondary" size='large' disableElevation fullWidth onClick={() => transitionToCreateRecommendation()}>
          recommend a new business
        </Button>
      </CardActions>
    </Card>
  );
}