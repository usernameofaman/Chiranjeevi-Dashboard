import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core';
import OPDForm from '../Forms/OPDForm';
import { makeStyles } from '@material-ui/core/styles';
import Receipt from '../Reciepts/printModule'
import PatientList from './PatientList';


const Container = styled.div`
    justify-content: center;
    align-items: center;
    width: 100%;
    padding:10px 10px 10px 10px;
    display: flex;
    flex-direction: column;
`
const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    justify-content: space-evenly;
`

const useStyles = makeStyles((theme) => ({
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

export default function OPD() {
    const classes = useStyles();
    const [tabs , setTabs] = React.useState(0);

    return (
        <div>
            <ButtonContainer>
                <Button onClick={() => setTabs(1)} className={classes.MainButton} variant="contained">
                    Add OPD Patient
                </Button>
                <Button onClick={() => setTabs(2)} className={classes.MainButton} variant="contained">
                    New Receipt
                </Button>
                <Button  className={classes.MainButton} variant="contained">
                    View Receipt
                </Button>
                <Button className={classes.MainButton} variant="contained" >
                    Modify Receipt
                </Button>
            </ButtonContainer>
            <Container>
                {tabs===0 &&
                <PatientList OPDOnly/>
                }
                {tabs===1 &&
                <OPDForm/> }
                {tabs===2 && 
                <Receipt mode="OPD"/>}
            </Container>
        </div>
    )
}
