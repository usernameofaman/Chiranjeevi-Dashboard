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
    padding:10px 10px 10px 10px;
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
    const [date, setDate] = React.useState("")
    useEffect(() =>{
if (date === ""){
    
    let date = Date.now();
        
    setDate( moment(date).format("YYYY-MM-DDThh:mm"))
}
    })
    // defaultValue="2017-05-24T10:30"
    console.log(date)
    console.log("2017-05-24T10:30")

    const classes = useStyles();
    const [patient, setPatient] = React.useState()
    const handleinput = (e) => {
        if (e.target.name === "date-admit"){
            setDate(e.target.value)
            console.log(e.target.value)
        }
        setPatient({ ...patient, [e.target.name]: e.target.value })
        console.log(patient)
    }

    const saveData = () => {
        const patientRef = firebase.database().ref("Patients");
        const patientData = {
            name: patient.name,
            fileNo: patient.fileNo,
            advance: patient.advance,
            room: patient.room,
        };

        patientRef.push(patientData);
    }


    return (
        <>
            <ButtonContainer>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained">
                        Add New Patient
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        View Patient Details
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Modify Patient Details
                    </Button>
                </NavLink>
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
            <Container>

                <Form>
                    <OneField>
                        {/* <Typography variant="h6" component="h2">Hello</Typography> */}
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="Name" size="small" label="Name" variant="outlined" />
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="Age" size="small" label="Age" variant="outlined" />
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="Sex" size="small" label="Sex" variant="outlined" />
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="Address" size="small" label="Address" variant="outlined" />
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="Refund by" size="small" label="Refund by" variant="outlined" />
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="Consultant" size="small" label="Consultant" variant="outlined" />
                    </OneField>
                    <Typography style={{ fontFamily: "Josefin Sans, sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        WARD
                    </Typography>
                    <OneField>
                        {/* <Typography variant="h6" component="h2">Hello</Typography> */}
                        <TextField
                            id="datetime-local"
                            label="Date of admit"
                            type="datetime-local"
                            name="date-admit"
                            value={date}
                            className={classes.input}
                            onChange={handleinput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="datetime-local"
                            label="Date of Discharge"
                            type="datetime-local"
                            onChange={handleinput}
                            value={date}
                            className={classes.input}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="Mobile Number" type="number" size="small" label="Mobile Number" variant="outlined" />
                        <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="Register Number" type="number" size="small" label="Register Number" variant="outlined" />
                    </OneField>
                    <OneField>
                        <Button onClick={saveData} className={classes.buttonSubmit} variant="contained" color="primary">Submit</Button>
                    </OneField>
                </Form>
            </Container>
        </>

    )
}
