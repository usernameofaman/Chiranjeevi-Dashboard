import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { logout } from '../../utils';
import { history } from "../utils/history";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const Logout = () => {
    logout()
    history.push("/")
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >


      <List>
        <Typography style={{
          fontFamily: "'Source Sans Pro', sans-serif",
          fontWeight: "bolder",
          fontSize: "38px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          Chiranjeevi
        </Typography>
        <Divider />
        <NavLink className="navlinkstyle" to="/OPD">
          <ListItem button>
            <ListItemIcon><LocalHospitalIcon /></ListItemIcon>
            <ListItemText primary={'OPD'} />
          </ListItem>
        </NavLink>
        <NavLink className="navlinkstyle" to="/IPD">
          <ListItem button>
            <ListItemIcon><LocalHospitalIcon /></ListItemIcon>
            <ListItemText primary={'IPD'} />
          </ListItem>
        </NavLink>
        <NavLink className="navlinkstyle" to="/Dashboard">
          <ListItem button>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
        </NavLink>
        <NavLink className="navlinkstyle" to="/Reports">
          <ListItem button>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary={'Reports'} />
          </ListItem>
        </NavLink>
      </List>
      <Divider />


    </div>
  );

  return (
    <>
      <div>
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            {/* <Button >{anchor}</Button> */}
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
      <div className={classes.root}>
        <AppBar style={{ background: '#0C6361',justifyContent:"space-between",flexDirection:"row" }} position="static">
          <Toolbar>
            <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <NavLink className="navlinkstyle" exact to="/Dashboard">
              <Button style={{ background: "transparent", color: "white" }}>
                <img style={{ width: "40px" }} src="./Images/logoN.png" alt="logo" />
                <Typography style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: "bolder", fontSize: "26px" }} variant="h6" className={classes.title}>
                  Cheeranjeevi
                </Typography>
              </Button>
            </NavLink>
          </Toolbar>
          <Button style={{marginRight:"10px"}} color="inherit" onClick={Logout}>Logout</Button>
        </AppBar>
        <Drawer />
      </div>
    </>
  );
}
