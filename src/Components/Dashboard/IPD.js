import React from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import IPDForm from '../Forms/IPDForm'
import ViewPatientDetails from "../ViewDetails/ViewPatientDetails"
import Discharge from "../Discharge/Discharge";
import IPDPrintFrame from "../Reciepts/printModule";


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
        height: 80,
        margin: "30px 0px 10px 0px",
        background: "#0C6361",
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: "bolder",
        fontSize: "11px",
        color: "white",
        '&:hover': {
            backgroundColor: '#238887',
        },
    }
}));

const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    justify-content: space-evenly;
`

export default function IPD() {
    const classes = useStyles();
    const [tabs, setTabs] = React.useState(0)
    const changeTabs = (value) => {
        if (tabs === 1) {

        }
        setTabs(value)
    }

    return (
        <>

            <ButtonContainer>
                <Button onClick={() => changeTabs(1)} className={classes.MainButton} variant="contained" >
                    View Patient Details
                </Button>
                <Button onClick={() => changeTabs(2)}  className={classes.MainButton} variant="contained" >
                    Discharge
                </Button>
                
                    <Button onClick={() => changeTabs(3)}  className={classes.MainButton} variant="contained" >
                        View Reciept
                    </Button>
               

                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Add Particulars
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Modify Particulars
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Add Consultant
                    </Button>
                </NavLink>
                <NavLink className="navlinkstyle" to="/NAN">
                    <Button className={classes.MainButton} variant="contained" >
                        Modify Consultant
                    </Button>
                </NavLink>
            </ButtonContainer>

            {/* Here is the code for Tabs */}
            {tabs === 0 &&
                <IPDForm />}
            {tabs === 1 &&
                <ViewPatientDetails changeTabs={changeTabs} />}
            {tabs === 2 &&
                <Discharge changeTabs={changeTabs}/>}
            {tabs === 3 &&
                <IPDPrintFrame/>}

        </>
    )
}
