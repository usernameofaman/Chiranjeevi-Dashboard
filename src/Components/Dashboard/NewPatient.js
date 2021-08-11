import React from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import firebase from '../utils/firebase'



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    input: {
        marginLeft: 90,
    },
    buttonSubmit:{
        marginLeft: 90,
    }
}));

const Container = styled.div`
    padding:10px;
    /* display: flex; */
`
const OneField = styled.div`
    padding:10px;
    display: flex;
`

export default function NewPatient() {
    const classes = useStyles();
    const [patient,setPatient] = React.useState()
    const handleinput = (e) => {
        setPatient({...patient,[e.target.name]:e.target.value})
        console.log(patient)
    }

    const saveData = () => {
      const patientRef = firebase.database().ref("Patients");
      const patientData = {
          name: patient.name,
          fileNo: patient.fileNo,
          advance:patient.advance,
          room :patient.room,
      };

      patientRef.push(patientData);
    }


    return (
        <Container>
            <OneField>
                {/* <Typography variant="h6" component="h2">Hello</Typography> */}
                <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="name" size="small" label="Name" variant="outlined" />
                <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="fileNo" size="small" label="File No" variant="outlined" />
                <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="advance" size="small" label="Advance Payment" variant="outlined" />
                <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="room" size="small" label="Room No" variant="outlined" />
            </OneField>
            <OneField>
                <Button onClick={saveData} className={classes.buttonSubmit} variant="contained" color="primary">Login</Button>
            </OneField>
        </Container>
    )
}
