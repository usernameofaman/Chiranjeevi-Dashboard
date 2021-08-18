import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
    const { handleClose, open, doctor , deleteDoctor} = props;

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={{ background: "#ff4444", color: "white", textAlign:"center" }}>Are You Sure ?</DialogTitle>
            <DialogContent >
                <DialogContentText>
                    You are about to delete a doctor <b>{doctor.name}</b> <br/>This is irreversible process.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={deleteDoctor} style={{ background: "#ff4444", color:"white"}} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
