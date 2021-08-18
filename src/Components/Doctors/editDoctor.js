import React, { useEffect } from 'react'
import styled from 'styled-components'
import firebase from '../utils/firebase'
import { makeStyles } from '@material-ui/core/styles';
import TableComponent from "../Common/tableComponent";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditDialog from './editDialog'
import DeleteDialog from './deleteDialog'
import firebaseFunctions from '../utils/firebaseFunctions';
import Toast from '../Common/snackbar'

const useStyles = makeStyles((theme) => ({
    buttonSubmit: {
        width: 120,
        height: 40,
        marginLeft: 20,
        background: "#0C6361",
        '&:hover': {
            backgroundColor: '#238887',
            boxShadow: 'none',
        },
    }
}
));


const Container = styled.div`
    justify-content: center;
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const TableContainer = styled.div`
    padding-left: 40px;
`
const Form = styled.div`
    width: 90%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    border-radius: 5px;
    /* padding: 0 8% 0 8%; */
    margin-top: 10px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -ms-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -o-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

export default function EditDoctor() {
    const classes = useStyles();
    const [doctors, setDoctors] = React.useState([]);
    useEffect(() => {
        getDoctorList()
    }, []);

    const getDoctorList =async () => {
        const response = await firebaseFunctions.getData("Doctors");
        setDoctors(response)
    }

    // setDialog Open/Close
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleDialogOpen = async (doctor) => {
        const response = await firebaseFunctions.getOneData("Doctors","name",doctor.name)
        setSelectedDoctor(response.data)
        setSelectedDoctorId(response.selectedId)
        setOpenDialog(true);
    };
    const handleDialogClose = () => {
        setOpenDialog(false);
    };
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const handleDeleteOpen = async (doctor) => {
        const response = await firebaseFunctions.getOneData("Doctors","name",doctor.name)
        setSelectedDoctorId(response.selectedId)
        setSelectedDoctor(response.data)
        setDeleteDialog(true);
    };
    const handleDeleteClose = () => {
        setDeleteDialog(false);
    };

    const [selectedDoctor , setSelectedDoctor] = React.useState("");
    const [selectedDoctorId , setSelectedDoctorId] = React.useState("");
    const editDoctorInput = (e) => {
        setSelectedDoctor({ ...selectedDoctor, [e.target.name]: e.target.value })
    }
    // Delete Logic Starts Here

    // Edit Logic Starts Here
    const updateDoctorDetails = () => {
        const userRef = firebase.database().ref("Doctors").child(selectedDoctorId[0]);
        userRef.update(selectedDoctor).then(() => {
            Toast.apiSuccessToast("Doctor details updated")
        }).catch(() => {
            Toast.apiFailureToast("Server Error")
        })
        getDoctorList()
        handleDialogClose()
    }
    const deleteDoctor = () => {
        console.log("HERE")
        const userRef = firebase.database().ref("Doctors").child(selectedDoctorId[0]);
        userRef.remove().then(() => {
            Toast.apiSuccessToast("Doctor details updated")
        }).catch(() => {
            Toast.apiFailureToast("Server Error")
        })
        getDoctorList()
        handleDeleteClose()
    }

    return (
        <>
        <Container>
            <TableContainer>
                <TableComponent.Table cellpadding="0" cellspacing="0">
                    <TableComponent.TableHead style={{ background: "#0C6361" }}>
                        <TableComponent.HeadColumn>Name</TableComponent.HeadColumn>
                        <TableComponent.HeadColumn>Type</TableComponent.HeadColumn>
                        <TableComponent.HeadColumn>Options</TableComponent.HeadColumn>
                    </TableComponent.TableHead>
                    <TableComponent.TableBody>
                        {doctors.map((doctor) => (
                            <TableComponent.BodyRow>
                                <TableComponent.BodyColumn >{doctor.name}</TableComponent.BodyColumn>
                                <TableComponent.BodyColumn >{doctor.type}</TableComponent.BodyColumn>
                                <TableComponent.BodyColumn >
                                    <Button onClick={() => handleDialogOpen(doctor)} className={classes.buttonSubmit} variant="contained" color="primary">
                                            <DeleteIcon/>
                                        Edit</Button>
                                    <Button onClick={() => handleDeleteOpen(doctor)} className={classes.buttonSubmit} variant="contained" color="primary">
                                            <EditIcon/>
                                        Delete</Button>
                                </TableComponent.BodyColumn>
                            </TableComponent.BodyRow>
                        ))}
                    </TableComponent.TableBody>
                </TableComponent.Table>
            </TableContainer>
        </Container>

        {/* Dialog Boxes Render */}
            <EditDialog handleClose={handleDialogClose} handleInput={editDoctorInput} open={openDialog} doctor={selectedDoctor} updateDoctorDetails={updateDoctorDetails}/>
            <DeleteDialog handleClose={handleDeleteClose} deleteDoctor={deleteDoctor} open={deleteDialog} doctor={selectedDoctor}/>
        </>
    )
}
