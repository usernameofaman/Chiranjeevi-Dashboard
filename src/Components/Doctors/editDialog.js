import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';

const OneField = styled.div`
    padding:10px;
    width:100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`
const Select = styled.select`
    width: 180px;
    margin-right:30px;
    border: 1px solid #b7b2b2;
    border-radius: 5px;
    padding-left: 7px;
`

const useStyles = makeStyles(() => ({
  input: {
      marginTop: 10,
  }
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const { handleClose, open, doctor ,handleInput } = props;

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Doctor</DialogTitle>
        <DialogContent>
          <OneField >
            <TextField onChange={handleInput} className={classes.input} value={doctor.name} id="outlined-basic" name="name" size="small" label="Name" variant="outlined" />
            <Select onChange={handleInput} className={classes.input} value={doctor.type} id="outlined-basic" name="type" size="small" label="Category" type="text" variant="outlined" >
              <option value="OPD">OPD</option>
              <option value="IPD">IPD</option>
              <option value="consultant">Consultant</option>
              <option value="referee">Referee</option>
            </Select>
          </OneField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
