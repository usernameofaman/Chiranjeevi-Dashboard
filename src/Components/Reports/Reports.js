import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    btn: {
          background: "#0C6361",
          '&:hover': {
              backgroundColor: '#0C6361',
              boxShadow: 'none',
          },
     
        
      }
   
});

function Reports() {
    const classes = useStyles();
    return (
        <>
            Reports

            <NavLink style={{ textDecoration:"none"}} to="/">
                <Button className={classes.btn} variant="contained" color="primary">
                    Back to Home
                </Button>
            </NavLink>

        </>

    )
}

export default Reports;
