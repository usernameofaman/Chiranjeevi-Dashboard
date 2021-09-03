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
    min-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
`
// 
const Select = styled.select`
    width: 100%;
    height:40px;
    border: 1px solid #b7b2b2;
    border-radius: 5px;
    padding-left: 7px;
    margin-top: 10px;
`

const useStyles = makeStyles(() => ({
  input: {
    marginTop: 10,
    width:"100%"
  }
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const { handleClose, open, inventory, handleInput } = props;

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Inventory</DialogTitle>
        <DialogContent>
          <OneField >
            <TextField onChange={handleInput} className={classes.input} value={inventory.name} name="name" size="small" label="Name" variant="outlined" />
            <div style={{ position: "relative", width: "100%" }}>
              <p style={{ position: "absolute", right: "10px", top: "3px" }}>Rs</p>
              <TextField onChange={handleInput} className={classes.input} value={inventory.amount} name="amount" size="small" label="Amount" type="number" variant="outlined" />
            </div>
            <TextField onChange={handleInput} className={classes.input} value={inventory.unit} name="unit" size="small" label="Unit" type="text" variant="outlined" />
            <Select name="type" value={inventory.type} onChange={handleInput} >
              <option selected disabled value="">Select</option>
              <option value="LAB">Lab Inventory</option>
              <option value="HOSPITAL">Hospital Inventory</option>
            </Select>
          </OneField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.updateInventory} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
