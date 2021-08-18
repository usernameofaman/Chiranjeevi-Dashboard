import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Toast from '../Common/snackbar'
import firebase from '../utils/firebase'
import EditDoctor from './editDoctor'



const OneField = styled.div`
    width: 100%;
    max-width:300px;
    padding:10px;
    display: flex;
    flex-wrap: wrap;
`
const Select = styled.select`
    width: 100%;
    height:40px;
    border: 1px solid #b7b2b2;
    border-radius: 5px;
    padding-left: 7px;
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


const useStyles = makeStyles((theme) => ({
    Button: {
        '& > *': {
            margin: theme.spacing(1),
            display: 'flex',
            width: 300,
        },
    },
    buttonSubmit: {
        width:"100%",
        background: "#0C6361",
        '&:hover': {
            backgroundColor: '#238887',
            boxShadow: 'none',
        },
    },
    input: {
        width:"100%",
        margin: "10px 0px 10px 0px",
    },
    MainButton: {
        width: 250,
        height: 100,
        margin: "10px",
        background: "#0C6361",
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: 600,
        fontSize: "24px",
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
const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width:100vw;
    padding: 30px;
    justify-content: space-evenly;
`

export default function Doctors() {
    const classes = useStyles();

    const [doctor, setDoctor] = React.useState({
        name: "",
        type: "OPD"
    });
    const handleInput = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value })
        console.log(doctor)
    }
    const saveData = () => {
        const doctorRef = firebase.database().ref("Doctors");
        const doctorData = {
            name: doctor.name,
            type: doctor.type,
        };
        doctorRef.push(doctorData).then(() => {
            Toast.apiSuccessToast("New doctor added")
        }).catch(() => {
            Toast.apiFailureToast("Server Error")
        });
        setTab(1)
    }
    const [tab, setTab] = React.useState(2)


    return (
        <>
            <Container>
                <ButtonContainer>
                    <Button onClick={() => setTab(0)} className={classes.MainButton} variant="contained">
                        Add Doctor
                    </Button>
                    <Button onClick={() => setTab(2)} className={classes.MainButton} variant="contained" >
                        Edit / Delete Doctor
                    </Button>
                </ButtonContainer>
            </Container>

            {/* Add Doctor Section */}
            {tab === 0 &&
                <Container>
                    <Form>
                        <Typography className={classes.input} style={{ fontFamily: "'Source Sans Pro', sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                            Add Doctor
                        </Typography>
                        <OneField >
                            <TextField onChange={handleInput} className={classes.input}  name="name" size="small" label="Name" variant="outlined" />
                            <Select onChange={handleInput}  name="type" size="small" label="Category" type="text" variant="outlined" >
                                <option value="OPD">OPD</option>
                                <option value="IPD">IPD</option>
                                <option value="consultant">Consultant</option>
                                <option value="referee">Referee</option>
                            </Select>
                        </OneField>
                        <OneField>
                            <Button onClick={() => saveData()} className={classes.buttonSubmit} variant="contained" color="primary">Save</Button>
                        </OneField>
                    </Form>
                </Container>}

            {/* SuccessFully Added Message */}
            {tab === 1 &&
                <Container>
                    <Typography style={{ margin: "30px 0px 30px 0px", fontFamily: "'Source Sans Pro', sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        Doctor has been added successfully
                    </Typography>
                    <OneField>
                        <Button onClick={() => setTab(0)} className={classes.buttonSubmit} variant="contained" color="primary">Add More</Button>
                    </OneField>
                </Container>
            }

            {/* Edit Doctor */}

            {tab === 2 &&
                <EditDoctor />}
        </>
    )
}
