import styled from 'styled-components'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import firebase from '../utils/firebase'
import 'date-fns';
import moment from 'moment';
import { useEffect } from 'react';
import Toast from '../Common/snackbar'


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
        width: 240,
        height: 80,
        margin: "30px 0px 10px 0px",
        background: "#0C6361",
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: "bolder",
        fontSize: "19px",
        color: "white",
        '&:hover': {
            backgroundColor: '#238887',
        },
    }
}));



const OneField = styled.div`
    padding:10px;
    display: flex;
    flex-wrap: wrap;
`



const Form = styled.div`
    width: 90%;
    position: relative;
    display:flex;
    align-items: center;
    justify-content: center;
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
const Select = styled.select`
    width:190px;
    border-radius: 5px;
    height: 36px;
    padding: 0px 10px 0px 10px;
`

export default function NewPatient(props) {
    const [date, setDate] = React.useState("")
    const [consultDoctors , setDoctors ] = React.useState([])
    useEffect(() => {
        if (date === "") {
            let date = Date.now();
            setDate(moment(date).format("YYYY-MM-DDTHH:mm"))
        }
        getDataForList();
    })

    const getDataForList = () => {
        const userRef = firebase.database().ref("Doctors");
        userRef.on("value", async (snapshot) => {
          const users = snapshot.val();
          const userArray = [];
          for (let id in users) {
              if(users[id].type==="consultant")
                  userArray.push(users[id])
          }
          await setDoctors(userArray)
        })
    }

    const classes = useStyles();
    const [patient, setPatient] = React.useState({ type: "OPD" })
    const handleinput = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value })
        console.log(patient)
    }


    const saveData = () => {
        console.log(patient)
        const patientRef = firebase.database().ref("ActivePatients");
        const patientData = {
            name: patient.name,
            age: patient.age,
            doctor: patient.doctor,
            amount: patient.amount,
            date: date,
            type: patient.type,
        };
        console.log(patientData)
        patientRef.push(patientData).then(() => {
            Toast.apiSuccessToast("Patient details Added")
        }).catch(() => {
            Toast.apiFailureToast("Server Error")
        });
    }


    return (
        <>


            <Form>
                <OneField>
                    <TextField onChange={handleinput} className={classes.input} name="name" size="small" label="Patient Name" variant="outlined" />
                    <TextField onChange={handleinput} className={classes.input} name="age" size="small" label="Age" variant="outlined" />
                    <Select onChange={handleinput} className={classes.input} name="Consultant" >
                        <option selected disabled>Consultant</option>
                        {consultDoctors.map((doctor) => (
                            <option value={doctor.name}>{doctor.name}</option>
                        ))}
                    </Select>
                    <TextField onChange={handleinput} className={classes.input} name="amount" size="small" label="Amount" type="number" variant="outlined" />
                </OneField>
                <OneField>
                    <TextField
                        id="datetime-local"
                        label="Date of admit"
                        type="datetime-local"
                        value={date}
                        className={classes.input}
                        onChange={handleinput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                </OneField>
                <OneField>
                    <Button onClick={saveData} className={classes.buttonSubmit} variant="contained" color="primary">Submit</Button>
                </OneField>
            </Form>
        </>
    )
}
