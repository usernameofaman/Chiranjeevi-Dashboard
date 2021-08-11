import React from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close'
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
        marginLeft: 40,
        marginTop: 10,
    },
    buttonSubmit: {
        marginLeft: 40,
    },
    fabIcon: {
        position: 'absolute',
        top:"5%",
        right: "2%"

    }
}));


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
    const classes = useStyles();
    const [patient, setPatient] = React.useState()
    const handleinput = (e) => {
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

        <Container>
            <Form>
                <Fab onClick={() =>props.setTabValue(0)} className={classes.fabIcon} color="primary" aria-label="add">
                    <CloseIcon />
                </Fab>
                <OneField>
                    {/* <Typography variant="h6" component="h2">Hello</Typography> */}
                    <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="name" size="small" label="Name" variant="outlined" />
                    <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="fileNo" size="small" label="File No" variant="outlined" />
                    <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="advance" size="small" label="Advance Payment" variant="outlined" />
                    <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="room" size="small" label="Room No" variant="outlined" />
                    <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="room" size="small" label="Room No" variant="outlined" />
                    <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="room" size="small" label="Room No" variant="outlined" />
                    <TextField onChange={handleinput} className={classes.input} id="outlined-basic" name="room" size="small" label="Room No" variant="outlined" />
                </OneField>
                <OneField>
                    <Button onClick={saveData} className={classes.buttonSubmit} variant="contained" color="primary">Submit</Button>
                </OneField>
            </Form>
        </Container>
       
    )
}
