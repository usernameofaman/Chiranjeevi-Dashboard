import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';
import PatientList from './PatientList';
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    Button: {
        '& > *': {
            margin: theme.spacing(1),
            display: 'flex',
            width: 300,
        },
    },
    MainButton: {
        width: 250,
        height: 100,
        margin: "10px 0px 10px 0px",
        background: "#0C6361",
        fontFamily:"'Source Sans Pro', sans-serif", 
        fontWeight:600,
        fontSize:"24px",
        color:"white",
        '&:hover': {
            backgroundColor: '#238887',
        },
    }
}));

const Container = styled.div`
    display: flex;
`
const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width:100vw;
    padding: 30px;
    justify-content: space-evenly;
`
const StethoIcon = styled.div`
    width:100px;
`

export default function Dashboard() {
    const classes = useStyles();

    return (
        <>
            <Container>
                <ButtonContainer>
                    <NavLink className="navlinkstyle" to="/OPD">
                        <Button className={classes.MainButton} variant="contained">
                            OPD
                        </Button>
                    </NavLink>
                    <NavLink className="navlinkstyle" to="/IPD">
                        <Button className={classes.MainButton} variant="contained" >
                            IPD
                        </Button>
                    </NavLink>
                    <NavLink className="navlinkstyle" to="/Discharge">
                        <Button className={classes.MainButton} variant="contained" >
                            Discharge
                        </Button>
                    </NavLink>
                    <NavLink className="navlinkstyle" to="/PatientsList">
                        <Button className={classes.MainButton} variant="contained" >
                            Patient List
                        </Button>
                    </NavLink>
                    <NavLink className="navlinkstyle" to="/Lab">
                        <Button className={classes.MainButton} variant="contained" >
                            Lab
                        </Button>
                    </NavLink>
                </ButtonContainer>
            </Container>
            <PatientList/>
        </>
    );
}
