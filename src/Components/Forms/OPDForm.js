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
import Typography from '@material-ui/core/Typography';



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
    const [tab, setTab] = React.useState(0)
    const [consultDoctors , setDoctors ] = React.useState([])
    const [patient, setPatient] = React.useState({ type: "OPD" ,amount:0, date:moment(Date.now()).format("YYYY-MM-DDTHH:mm")})
    useEffect(() => {
        getDataForList();
    },[])

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
    const handleinput = (e) => {
        console.log(e.target.value.length)
        if(e.target.name==="age" && e.target.value.length>3){
        return;
        }else
        setPatient({ ...patient, [e.target.name]: e.target.value })
        console.log(patient)
    }


    const saveData = () => {
        console.log(patient)
        if(!patient.name) Toast.apiFailureToast("Enter Valid Patient Name")
        if(!patient.age) Toast.apiFailureToast("Enter Valid Patient Name")
        const patientRef = firebase.database().ref("ActivePatients");
        const patientData = {
            name: patient.name,
            age: patient.age,
            doctor: patient.consultant,
            amount: patient.amount,
            date: patient.date,
            type: patient.type,
        };
        console.log(patientData)
        patientRef.push(patientData).then(() => {
            Toast.apiSuccessToast("Patient details Added")
        }).catch(() => {
            Toast.apiFailureToast("Server Error")
        });
        setTab(1)
    }


    return (
        <>

{tab === 0 &&
            <Form>
                <OneField>
                    <TextField onChange={handleinput} className={classes.input} name="name" size="small" label="Patient Name" variant="outlined" />
                    <TextField onChange={handleinput} className={classes.input} name="age" type="number" size="small" label="Age" variant="outlined" value={patient.age}/>
                    <Select onChange={handleinput} className={classes.input} name="consultant" >
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
                        name="date"
                        value={patient.date}
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
            </Form>}
            {tab === 1 &&
                <Container>
                    <Typography style={{ margin: "30px 0px 30px 0px", fontFamily: "'Source Sans Pro', sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        Patient has been added successfully
                    </Typography>
                    <OneField>
                        <Button onClick={() => setTab(0)} className={classes.buttonSubmit} variant="contained" color="primary">Add More</Button>
                    </OneField>
                </Container>
            }
        </>
    )
}
