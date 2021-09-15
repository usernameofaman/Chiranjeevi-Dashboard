import React from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import firebase from '../utils/firebase'
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
export default function NewPatient(props) {
    const classes = useStyles();
    const [fileNo, setFileNo] = React.useState("")
    const handleFileNo = (e) => {
        setFileNo(e.target.value)
    }
    const [editMode, setEditMode ] = React.useState(false)
    const handleEditMode = () => {
        setEditMode(!editMode)
    }

    const [patient, setPatient] = React.useState({})
    const [selectedId, setSelectedId] = React.useState([])
    const handleInputEdit = (e) => {
        setPatient({...patient,[e.target.name]:e.target.value})
    }
    const getPatientDetails = async (number) => {
        setEditMode(false)
        const userRef = firebase.database().ref("ActivePatients");
        var userQuery = await userRef.orderByChild("fileNo").equalTo(number);
        userQuery.once("value", function (snapshot) {
            // setSelectedId(Object.keys(snapshot.val()))
            snapshot.forEach(function (child) {
                setPatient(child.val())
            });
        });
        
    }
    const updatePatientDetails = () => {
        // //console.log("HEre")
        const userRef = firebase.database().ref("ActivePatients").child(selectedId[0]);
        userRef.update(patient).then(() => {
            Toast.apiSuccessToast("Patient details updated")
        }).catch(() => {
            Toast.apiFailureToast("Server Error")
        })
        setEditMode(false)
    }


    return (
        <>
        {/* File Number */}
            <Container>
                <Form>
                    <Typography className={classes.input} style={{ fontFamily: "'Source Sans Pro', sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        Enter File Number
                    </Typography>
                    <OneField >
                        <TextField
                            onChange={handleFileNo}
                            name="fileNo"
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
                            <Button onClick={() =>  getPatientDetails(fileNo)} className={classes.buttonSubmit} variant="contained" color="primary">View Patient Details</Button>
                    </OneField>
                </Form>
            </Container>
    
        {/* View Mode */}
            {!editMode && 
            <Container>
                <Form>
                    <Typography className={classes.input} style={{ fontFamily: "'Source Sans Pro', sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        FILE NO. {patient.fileNo}
                    </Typography>
                    <OneField >
                        <TextField className={classes.input}   value={patient.name} InputLabelProps={{ shrink: true }} size="small" label="Name" variant="outlined" disabled />
                        <TextField className={classes.input}  value={patient.age} InputLabelProps={{ shrink: true }} size="small" label="Age" type="number" variant="outlined" disabled />
                        <TextField className={classes.input}  value={patient.sex} InputLabelProps={{ shrink: true }} size="small" label="Sex" variant="outlined" disabled />
                    </OneField>
                    <Typography style={{ fontFamily: "'Source Sans Pro', sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        WARD
                    </Typography>
                    <OneField>
                        <TextField className={classes.input}  value={patient.address} InputLabelProps={{ shrink: true }} size="small" label="Address" variant="outlined" disabled />
                        <TextField className={classes.input}  value={patient.refundBy} InputLabelProps={{ shrink: true }} size="small" label="Refund by" variant="outlined" disabled />
                        <TextField className={classes.input}  value={patient.consultant} InputLabelProps={{ shrink: true }} size="small" label="Consultant" variant="outlined" disabled />

                    </OneField>

                    <OneField>
                        {/* <Typography variant="h6" component="h2">Hello</Typography> */}
                        <TextField
                            disabled
                            id="datetime-local"
                            label="Date of admit"
                            type="datetime-local"
                            value={patient.dateAdmit}
                            className={classes.input}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            disabled
                            id="datetime-local"
                            label="Date of Discharge"
                            type="datetime-local"
                            value={patient.dateDischarge}
                            className={classes.input}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </OneField>
                    <OneField>
                        <TextField className={classes.input}  disabled InputLabelProps={{ shrink: true }} value={patient.mobileNumber} size="small" label="Mobile Number" variant="outlined" />
                        <TextField className={classes.input}  disabled InputLabelProps={{ shrink: true }} value={patient.fileNo} size="small" label="Register Number" variant="outlined" />

                    </OneField>
                    <OneField>
                            <Button onClick={handleEditMode} className={classes.buttonSubmit} variant="contained" color="primary">Edit </Button>                   
                            <Button onClick={() => props.changeTabs(0)} className={classes.buttonSubmit} style={{background:"#c4c4c4",color:"black"}} variant="contained" color="secondary">Back </Button>                   
                    </OneField>
                </Form>
            </Container> }

            {/* Edit Mode */}
            {editMode && 
            <Container>
                <Form>
                    <Typography className={classes.input} style={{ fontFamily: "'Source Sans Pro', sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        FILE NO. {patient.fileNo}
                    </Typography>
                    <OneField >
                        <TextField name="name" onChange={handleInputEdit} className={classes.input}   value={patient.name} InputLabelProps={{ shrink: true }} size="small" label="Name" variant="outlined"  />
                        <TextField name="age" onChange={handleInputEdit} className={classes.input}  value={patient.age} InputLabelProps={{ shrink: true }} size="small" label="Age" type="number" variant="outlined"  />
                        <TextField name="sex" onChange={handleInputEdit} className={classes.input}  value={patient.sex} InputLabelProps={{ shrink: true }} size="small" label="Sex" variant="outlined"  />
                    </OneField>
                    <Typography style={{ fontFamily: "'Source Sans Pro', sans-serif", color: "black", fontWeight: "600", fontSize: "25px", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        WARD
                    </Typography>
                    <OneField>
                        <TextField name="address" onChange={handleInputEdit} className={classes.input}  value={patient.address} InputLabelProps={{ shrink: true }} size="small" label="Address" variant="outlined"  />
                        <TextField name="refundBy" onChange={handleInputEdit} className={classes.input}  value={patient.refundBy} InputLabelProps={{ shrink: true }} size="small" label="Refund by" variant="outlined"  />
                        <TextField name="consultant" onChange={handleInputEdit} className={classes.input}  value={patient.consultant} InputLabelProps={{ shrink: true }} size="small" label="Consultant" variant="outlined"  />

                    </OneField>

                    <OneField>
                        {/* <Typography variant="h6" component="h2">Hello</Typography> */}
                        <TextField
                            
                            id="datetime-local"
                            label="Date of admit"
                            type="datetime-local"
                            name="dateAdmit"
                            value={patient.dateAdmit}
                            className={classes.input}
                            onChange={handleInputEdit}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            
                            id="datetime-local"
                            label="Date of Discharge"
                            name="dateDischarge"
                            type="datetime-local"
                            onChange={handleInputEdit}
                            value={patient.dateDischarge}
                            className={classes.input}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </OneField>
                    <OneField>
                        <TextField name="mobileNumber" onChange={handleInputEdit} className={classes.input}  InputLabelProps={{ shrink: true }} value={patient.mobileNumber} size="small" label="Mobile Number" variant="outlined" />
                        <TextField name="fileNo" onChange={handleInputEdit} className={classes.input}  InputLabelProps={{ shrink: true }} value={patient.fileNo} size="small" label="Register Number" variant="outlined" />

                    </OneField>
                    <OneField>
                            <Button onClick={ () => updatePatientDetails()} className={classes.buttonSubmit} variant="contained" color="primary">Save </Button>
                    </OneField>
                </Form>
            </Container> }
        </>

    )
}
