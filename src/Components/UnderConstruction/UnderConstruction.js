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

function UnderConstruction() {
    const classes = useStyles();
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="page">
                <img
                    src="https://freedesignfile.com/upload/2019/07/Under-construction-cartoon-illustration-vector.jpg" alt="" />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="btn">

            <NavLink style={{ textDecoration:"none"}} to="/">
                <Button className={classes.btn} variant="contained" color="primary">
                    Back to Home
                </Button>
            </NavLink>
            </div>

        </>

    )
}

export default UnderConstruction;
