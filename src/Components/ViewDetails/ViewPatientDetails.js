import React, { useEffect } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close'
import { Button } from '@material-ui/core';
import firebase from '../utils/firebase'
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { useFormik } from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IPD from '../Dashboard/IPD'
import IPDNav from '../Dashboard/IPDNav'




const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    input: {
        marginLeft: 40,
        marginTop: 10,

    },
    buttonSubmit: {
        marginLeft: 40,
        background: "#0C6361",
        '&:hover': {
            backgroundColor: '#0C6361',
            boxShadow: 'none',
        },
    },
    fabIcon: {
        position: 'absolute',
        top: "5%",
        right: "2%"

    },
    MainButton: {
        width: 140,
        height: 40,
        margin: "30px 0px 10px 0px",
        background: "#0C6361",
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: "bolder",
        fontSize: "11px",
        color: "white"
    }
}));

const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    justify-content: space-evenly;
`
const Container = styled.div`
    justify-content: center;
    align-items: center;
    width: 100%;
    // padding: 30px 30px 30px 30px;
    display: flex;
    flex-direction: column;
`
const OneField = styled.div`
    padding:10px;
    display: flex;
    flex-wrap: wrap;
`

const Form = styled.div`
    width: 90%;
    position: relative;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    border-radius: 5px;
    padding: 0 8% 0 0;
    margin-top: 10px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -ms-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -o-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`
export default function NewPatient(props) {
    const classes = useStyles();
    const handleinput = (e) => {
    }
    return (
        <>
            <IPDNav />
            <Container>
                <Form>
                    <Typography className={classes.input} style={{ fontFamily: "'Source Sans Pro', sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        Enter File Number
                    </Typography>
                    <OneField >
                        <TextField
                            onChange={handleinput}
                            className={classes.input}
                            id="input-with-icon-textfield"
                            type="number"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </OneField>


                    <OneField>
                        <NavLink className="navlinkstyle" to="/PatientDeatils">
                            <Button className={classes.buttonSubmit} variant="contained" color="primary">View Patient Details</Button>
                        </NavLink >
                    </OneField>
                </Form>
            </Container>
        </>

    )
}
