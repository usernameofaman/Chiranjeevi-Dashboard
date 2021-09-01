import React, { useEffect } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import firebase from '../utils/firebase'
import moment from 'moment';
import Toast from '../Common/snackbar'
import firebaseFunctions from '../utils/firebaseFunctions';

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
const Select = styled.select`
    width:190px;
    border-radius: 5px;
    height: 36px;
    padding: 0px 10px 0px 10px;
`

export default function NewPatient(props) {

    const [admitdate, setAdmitdate] = React.useState("")
    const [consultDoctors, setDoctors] = React.useState([])
    const [referrer, setReferrer] = React.useState([])
    useEffect(() => {
        if (admitdate === "") {
            let admitdate = Date.now();
            setAdmitdate(moment(admitdate).format("YYYY-MM-DDTHH:mm"))
        }
        getDataForList();
        getFileNo();
    }, [])
    const getDataForList = () => {
        const userRef = firebase.database().ref("Doctors");
        userRef.on("value", async (snapshot) => {
            const users = snapshot.val();
            const consultant = [];
            const referrer = [];
            for (let id in users) {
                if (users[id].type === "consultant")
                    consultant.push(users[id])
                if (users[id].type === "referrer")
                    referrer.push(users[id])
            }
            await setDoctors(consultant)
            await setReferrer(referrer)
        })
    }

    const getFileNo = () => {
        const fileNoRef = firebase.database().ref("Utilities");
        fileNoRef.on("value", async (snapshot) => {
            const data = snapshot.val();
            for (let id in data) {
                setPatient({ ...patient, RegisterNumber: data[id].fileNo });
            }
        })
    }

    const classes = useStyles();
    const [patient, setPatient] = React.useState({
        RegisterNumber: "",
        Name: "",
        Age: "",
        Sex: "",
        Address: "",
        Referredby: "",
        Consultant: "",
        RegisterNumber: "",
        advance: "",
        room: "",
        dateAdmit: admitdate,
        dateDischarge: "",
        MobileNumber: "",
        type: "IPD",
    })
    const handleinput = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value })
    }

    const saveData = () => {
        const patientRef = firebase.database().ref("ActivePatients");
        const patientData = {
            name: patient.Name,
            age: patient.Age,
            sex: patient.Sex,
            address: patient.Address,
            referredBy: patient.Referredby,
            consultant: patient.Consultant,
            fileNo: patient.RegisterNumber,
            advance: parseInt(patient.advance),
            ward: patient.ward,
            dateAdmit: patient.dateAdmit === "" ? admitdate : patient.dateAdmit,
            dateDischarge: patient.dateDischarge,
            mobileNumber: patient.MobileNumber,
            type: patient.type,
            isDischarged:false,
        };
        patientRef.push(patientData).then(() => {
            Toast.apiSuccessToast("New patient added");
            firebaseFunctions.increaseFileNo()
            setTab(1)
        }).catch(() => {
            Toast.apiFailureToast("Server Error")
        });
    }

    const [tab, setTab] = React.useState(0)



    return (
        <>
            {tab === 0 &&
                <Container>
                    <Form>
                        <Typography className={classes.input} style={{ fontFamily: "'Source Sans Pro', sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                            ADD NEW PATIENTS
                        </Typography>
                        <OneField >
                            <TextField onChange={handleinput} className={classes.input} name="Name" size="small" label="Name" variant="outlined" />
                            <TextField onChange={handleinput} className={classes.input} name="Age" size="small" label="Age" type="number" variant="outlined" />
                            <TextField onChange={handleinput} className={classes.input} name="Address" size="small" label="Address" variant="outlined" />

                        </OneField>
                        <OneField >
                            <TextField onChange={handleinput} className={classes.input} name="RegisterNumber" type="number" size="small" label="Register Number" variant="outlined" value={patient.RegisterNumber} InputLabelProps={{ shrink: true }} disabled />
                            <Select onChange={handleinput} className={classes.input} name="Sex" label="Sex"  >
                                <option value="F">Female</option>
                                <option value="M">Male</option>
                                <option value="O">Other</option>
                            </Select>   
                        </OneField>
                        <OneField>
                            <Select onChange={handleinput} className={classes.input} name="Referredby" >
                                <option selected disabled>Referrer</option>
                                {referrer.map((doctor) => (
                                    <option value={doctor.name}>{doctor.name}</option>
                                ))}
                            </Select>
                            <Select onChange={handleinput} className={classes.input} name="Consultant" >
                                <option selected disabled>Consultant</option>
                                {consultDoctors.map((doctor) => (
                                    <option value={doctor.name}>{doctor.name}</option>
                                ))}
                            </Select>
                        </OneField>
                        <OneField>
                            <TextField onChange={handleinput} className={classes.input} name="ward" size="small" label="Ward" variant="outlined" />
                            <TextField onChange={handleinput} className={classes.input} type="number" name="advance" size="small" label="Advance" variant="outlined" />
                        </OneField>
                        <OneField>
                            <TextField
                                id="datetime-local"
                                label="Date of admit"
                                type="datetime-local"
                                name="dateAdmit"
                                value={admitdate}
                                className={classes.input}
                                onChange={handleinput}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </OneField>
                        <OneField>
                            <TextField onChange={handleinput} className={classes.input} name="MobileNumber" type="number" size="small" label="Mobile Number" variant="outlined" />
                        </OneField>
                        <OneField>
                            <Button onClick={() => saveData()} className={classes.buttonSubmit} variant="contained" color="primary">Submit</Button>
                        </OneField>
                    </Form>
                </Container>
            }
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
