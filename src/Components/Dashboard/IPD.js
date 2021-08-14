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
import IPDForm from '../Forms/IPDForm'
import ViewPatientDetails from "../ViewDetails/ViewPatientDetails"


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
        height: 80,
        margin: "30px 0px 10px 0px",
        background: "#0C6361",
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: "bolder",
        fontSize: "11px",
        color: "white",
        '&:hover': {
            backgroundColor: '#238887',
        },
    }
}));

const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    justify-content: space-evenly;
`

export default function IPD() {
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


// console.log(admitdate)
// console.log(dischargedate)

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
}

    // Tabs Management
    const [tabs, setTabs] = React.useState(0)
    const changeTabs = (value) => {
        if(tabs===1){
            
        }
        setTabs(value)
    }

    return (
        <>
        
        <ButtonContainer>
                    <Button onClick={()=> changeTabs(1)} className={classes.MainButton} variant="contained" >
                        View Patient Details
                    </Button>
                
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Discharge
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        View Discharge
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Edit Discharge
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        New Reciept
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        View Reciept
                    </Button>
                </NavLink>

                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Add Particulars
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Modify Particulars
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Add Doctors
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Modify Doctors
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Add Consultant
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Modify Consultant
                    </Button>
                </NavLink>
            </ButtonContainer>

            {/* Here is the code for Tabs */}
            {tabs===0 && 
            <IPDForm/> }
            {tabs===1 && 
            <ViewPatientDetails/> }
        </>
    )
}
