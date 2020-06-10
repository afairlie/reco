import React, {useState, Fragment} from 'react';

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
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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

export default function RecommendationCard({recommendation, business, comments}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} square>
      <CardHeader
        title={business.name}
        subheader={business.website}
      />
      <CardMedia
        className={classes.media}
        image={business.image}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* ultimately, this should be randomized*/}
          {`"${comments[0].because}"`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="upvote">
          <ArrowUpwardIcon/>
          <h4>{recommendation.upvotes}</h4>
        </IconButton>
        <IconButton aria-label="downvote">
          <ArrowDownwardIcon/>
          <h4>{recommendation.downvotes}</h4>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List>
            {comments.map((comment, index ) => 
              <ListItem>
                <Typography key={comment.id} paragraph>{comment.because}</Typography>
              </ListItem>
            )}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}