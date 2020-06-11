import React, {useState, Fragment} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import Link from '@material-ui/core/Link';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    minWidth: 340,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function RecommendationCard({toggleRecoDrawer, drawerState, recommendation, business, comments}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const upvote = (recoID) => {
    axios
    .put(`/api/recommendations/${recoID}`, {type: 'upvote'})
    .then(res => console.log(res))
    .catch(e => console.log(e))
  }

  const downvote = (recoID) => {
    axios
    .put(`/api/recommendations/${recoID}`, {type: 'downvote'})
    .then(res => console.log(res))
    .catch(e => console.log(e))
  }

  return (
    <List>
      {/* <ListItem dense={true}> */}
        <IconButton style={{display: 'flex'}}>
        <HighlightOffIcon button style={{color: '#FF7373'}} onClick={() => toggleRecoDrawer()}/>
        </IconButton>
        {/* </ListItem> */}
      <Card className={classes.root} square elevation={0}>
        <CardHeader
          title={business.name}
          subheader={<Link href={`${business.website}`} target="_blank" color='secondary'>{business.website}</Link>}
        />
        <CardMedia
          className={classes.media}
          image={business.image}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* ultimately, this should be randomized*/}
            {`"${comments[0].because}"`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="upvote" style={{color: '#27AE60'}} onClick={() => upvote(recommendation.id)}>
            <ArrowUpwardIcon/>
            <h4>{recommendation.upvotes}</h4>
          </IconButton>
          <IconButton aria-label="downvote" style={{color: '#FF7373'}} onClick={() => downvote(recommendation.id)}>
            <ArrowDownwardIcon/>
            <h4>{recommendation.downvotes}</h4>
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{backgroundColor: '#FFF3DD'}}>
          <Button variant='outlined' color="secondary" size='large' disableElevation fullWidth>
            boost this business
          </Button>
            <List>
              {comments.map((comment, index ) => 
                <ListItem>
                  <Typography key={comment.id} paragraph color='secondary'>{comment.because}</Typography>
                </ListItem>
              )}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </List>
  );
}