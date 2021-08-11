import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NewPatient from './NewPatient'
import PatientList from './PatientList';
import styled from 'styled-components'

const useStyles = makeStyles((theme) => ({
    Button: {
        '& > *': {
            margin: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            width: 300,
        },
    },
    MainButton: {
        width: 250,
        height: 200,
    }
}));

const Container = styled.div`
    display: flex;
`

export default function Dashboard() {
    const classes = useStyles();
    const [tab,setTab] = React.useState(0)

    const setTabValue = (value) => {
        setTab(value)
    } 

    return (
        <>
            <Container>
                <div className={classes.Button}>
                    <Button onClick={() => setTabValue(1)} className={classes.MainButton} variant="contained" color="primary">
                        New Patient
                    </Button>
                    <Button onClick={() => setTabValue(2)} className={classes.MainButton} variant="contained" color="primary">
                        Patient List
                    </Button>
                    <Button onClick={() => setTabValue(3)} className={classes.MainButton} variant="contained" color="secondary">
                    Discharge
                    </Button>
                    <Button onClick={() => setTabValue(4)} className={classes.MainButton} variant="contained" color="primary">
                        SomeThing2
                    </Button>
                </div>
                {tab===1 ? 
                <NewPatient /> : "" }
                {tab===2 ? 
                <PatientList /> : "" }
                {tab===3 ? 
                <div>Something1</div> : "" }
                {tab===4 ? 
                <div>Something2</div> : "" }
                
            </Container>
        </>
    );
}
