import React from 'react';
import DrawerItem from './DrawerItem'

// Material UI Components and Styling
import {makeStyles} from "@material-ui/core/styles";

import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  drawer: {
    zIndex: 900
  },
  drawerPaper: {
    zIndex: 900
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ListDrawer({description, businesses, recommendations}) {

  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor='left'
      open={true}>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {businesses.map((business, index) => (
            <DrawerItem 
            business={business}
            upvotes={recommendations[index].upvotes}
            downvotes={recommendations[index].downvotes}
            />
          ))}
        </List>  
      </div>
    </Drawer>
  )
}