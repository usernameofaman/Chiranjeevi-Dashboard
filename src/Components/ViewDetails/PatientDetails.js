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
        fontFamily: "Josefin Sans, sans-serif",
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
    justify-content:"center"
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

    const [admitdate, setAdmitdate] = React.useState("")
    const [dischargedate, setDischargedate] = React.useState("")
    useEffect(() => {
        if (admitdate === "") {

            let admitdate = Date.now();

            setAdmitdate(moment(admitdate).format("YYYY-MM-DDThh:mm"))
        }
        if (dischargedate === "") {

            let dischargedate = Date.now();

            setDischargedate(moment(dischargedate).format("YYYY-MM-DDThh:mm"))
        }
    })


    // defaultValue="2017-05-24T10:30"
    console.log(admitdate)
    console.log(dischargedate)

    const classes = useStyles();
    const [patient, setPatient] = React.useState()
    const handleinput = (e) => {
        if (e.target.name === "date-admit") {
            setAdmitdate(e.target.value)
            console.log(e.target.value)
        }
        if (e.target.name === "date-discharge") {
            setDischargedate(e.target.value)
            console.log(e.target.value, 'dischargedate')
        }
        setPatient({ ...patient, [e.target.name]: e.target.value })
        // console.log(patient)
    }

    


    return (
        <>
        <IPDNav/>
            <Container>

                <Form>

                <Typography className={classes.input} style={{ fontFamily: "Josefin Sans, sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        FILE NO. 140
                    </Typography>
                    <OneField >
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" defaultValue="Sarthak Garg" size="small" label="Name" variant="outlined" disabled  />
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" defaultValue="19" size="small" label="Age" type="number" variant="outlined" disabled />
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" defaultValue="M" size="small" label="Sex" variant="outlined" disabled/>
                    </OneField>
                    <Typography style={{ fontFamily: "Josefin Sans, sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        WARD
                    </Typography>
                    <OneField>
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" defaultValue="Address" size="small" label="Address" variant="outlined" disabled/>
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" defaultValue="Refund by" size="small" label="Refund by" variant="outlined" disabled/>
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" defaultValue="Consultant" size="small" label="Consultant" variant="outlined" disabled/>

                    </OneField>
                    
                    <OneField>
                        {/* <Typography variant="h6" component="h2">Hello</Typography> */}
                        <TextField
                            disabled
                            id="datetime-local"
                            label="Date of admit"
                            type="datetime-local"
                            name="date-admit"
                            value={admitdate}
                            className={classes.input}
                            onChange={handleinput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            disabled
                            id="datetime-local"
                            label="Date of Discharge"
                            name="date-discharge"
                            type="datetime-local"
                            onChange={handleinput}
                            value={dischargedate}
                            className={classes.input}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </OneField>
                        <OneField>
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" disabled name="Mobile Number" type="number" size="small" label="Mobile Number" variant="outlined" />
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" disabled name="Register Number" type="number" size="small" label="Register Number" variant="outlined" />

                        </OneField>
                    <OneField>
                    <NavLink className="navlinkstyle" to="/IPDForm">
                        <Button  className={classes.buttonSubmit}  variant="contained" color="primary">Edit </Button>
                    </NavLink>
                    </OneField>
                </Form>
            </Container>
        </>

    )
}
