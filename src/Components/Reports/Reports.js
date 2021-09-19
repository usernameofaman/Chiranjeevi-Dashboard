import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from '@material-ui/core';
import firebase from 'firebase';

const useStyles = makeStyles({
    btn: {
        background: "#0C6361",
        '&:hover': {
            backgroundColor: '#0C6361',
            boxShadow: 'none',
        },
    },
    card: {
        width: "200px",
        height: "150px",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        flexDirection: "column",
        margin: "10px"
    }


});

const FlexCenter = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
`

function Reports() {
    const classes = useStyles();
    useEffect(() => {
        getDataForList();
    }, []);
    const [patientIPD, setPatientsIPD] = useState()
    const [ipdlength, setIpdlength] = useState()
    const [patientOPD, setPatientsOPD] = useState()
    const [opdlength, setOpdlength] = useState()
    const [total, setTotal] = useState({ IPD: 0, OPD: 0 })

    const getDataForList = async () => {
        let IPDTotal = 0;
        let OPDTotal = 0;
        const userRefIPD = firebase.database().ref("PatientsIPD");
        userRefIPD.on("value", async (snapshot) => {
            const users = snapshot.val();
            const userArrayIPD = [];
            for (let id in users) {
                users[id].id = id;
                userArrayIPD.push(users[id])
                IPDTotal = IPDTotal + users[id].discharge.total
            }
            await setPatientsIPD(userArrayIPD)
            await setIpdlength(userArrayIPD.length)
        })
        // FOr OPD`
        const userRefOPD = firebase.database().ref("PatientsOPD");
        userRefOPD.on("value", async (snapshot) => {
            const users = snapshot.val();
            const userArrayOPD = [];
            for (let id in users) {
                users[id].id = id;
                userArrayOPD.push(users[id])
                OPDTotal = OPDTotal + users[id].receipt.amount
                console.log(OPDTotal)
            }
            await setPatientsOPD(userArrayOPD)
            await setOpdlength(userArrayOPD.length)

        })
        await setTotal({ OPD: OPDTotal, IPD: IPDTotal })


    }
    return (
        <>
            <FlexCenter>
                <NavLink style={{ textDecoration: "none" }} to="/">
                    <Button className={classes.btn} variant="contained" color="primary">
                        Back to Home
                    </Button>
                </NavLink>
            </FlexCenter>
            <FlexCenter>
                <Card className={classes.card}>
                    <div>Total IPD Patients</div>
                    <div>{ipdlength}</div>
                </Card>
                <Card className={classes.card}>
                    <div>Total OPD Patients</div>
                    <div>{opdlength}</div>
                </Card>
            </FlexCenter>
            <FlexCenter>
                <Card className={classes.card}>
                    <div>Total IPD Revenue</div>
                    <div>{total.IPD}</div>
                </Card>
                <Card className={classes.card}>
                    <div>Total OPD Revenue</div>
                    <div>{total.OPD}</div>
                </Card>
            </FlexCenter>

        </>

    )
}

export default Reports;
