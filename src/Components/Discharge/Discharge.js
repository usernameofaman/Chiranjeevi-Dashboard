import React, { useEffect } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import firebase from '../utils/firebase';
import PrintDischarge from './printModule'
import { Button } from '@material-ui/core';
import Toast from '../Common/snackbar'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import moment from 'moment';


const TelePhone = styled.img`
    width:18px;
    height:18px;
`

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    buttons: {
        margin: "20px",
        width: "120px",
        height: "50px",
        background: '#0C6361',
        color: "white",
        '&:hover': {
            backgroundColor: '#238887',
        },
    },
    buttonCancel: {
        margin: "20px",
        width: "120px",
        height: "50px",
        background: 'white',
        color: "black",
        '&:hover': {
            backgroundColor: '#d8d8d8',
        },
    },
    input: {
        width: "200px",
        minWidth: "100px",
        marginLeft: 40,
        marginTop: 10,
    },
    fabIcon: {
        width: "40px",
        height: "40px",
    },
    fabIconGet: {
        marginTop: "10px",
        width: "40px",
        height: "40px",
    }
}));


const Container = styled.div`
    justify-content: center;
    align-items: center;
    width: 100%;
    padding:10px 10px 10px 10px;
    display: flex;
    flex-direction: column;
`

const Form = styled.div`
    width: 900px;
    position: relative;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;
    border: 2px solid #8f8f8f;
    padding: 10px 40px 40px 0;
    margin-top: -2px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -ms-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -o-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const LogoAndHeading = styled.div`
    display: flex;
    width: 100%;
`

const LogoHolder = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
`
const TextHolder = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`
const HeaderInput = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

`
const Logo = styled.img`
    width: 70px;
    height: 80px;
    `
const MainForm = styled.div`
    width: 100%;
    display: flex;
`
const MainFormSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-right: 2px solid black;
    padding: 10px 10px 10px 20px;
`

const Select = styled.select`
    width:70%;
    border-radius: 5px;
    height: 32px;
    padding: 0px 10px 0px 10px;
`
const ItemPrice = styled.div`
    display: flex;
    width: 20%;
    padding: 0px 20px 0px 20px;
    justify-content: center;
    align-items: center;
`
const ItemContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 10px 0px 10px 0px;
    justify-content: center;
    align-items: center;
`
const AmountCountainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 30px 10px 30px;
    justify-content: center;
    align-items: center;
    width: 100%;
`
const AmountField = styled.div`
    width:100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

export default function Discharge(props) {
    const classes = useStyles();

    useEffect(() => {
        if (props.patient) {
            setPatient(props.patient)
            setSelectedId([props.patient.id])
            setFileNo(props.patient.fileNo)
        }
        getInventory()
    }, []);
    // Tabs

    const [tab, setTab] = React.useState(0)
    //Getting Patient Data
    const [patient, setPatient] = React.useState({})
    const [fileNo, setFileNo] = React.useState("")
    const [selectedId, setSelectedId] = React.useState([])

    const handleFileNo = (e) => {
        if (e.target.value === "") setFileNo("")
        else setFileNo(parseInt(e.target.value))
    }

    const getPatientDetails = () => {
        // setDischargeData({
        //     total: 0,
        //     adjustment: "",
        //     dateDischarge: "",
        //     balance: 0,
        // })

        const userRef = firebase.database().ref("ActivePatients");
        var userQuery = userRef.orderByChild("fileNo").equalTo(fileNo);
        userQuery.once("value", function (snapshot) {
            if (snapshot.val())
                setSelectedId(Object.keys(snapshot.val()))
            snapshot.forEach(function (child) {
                setPatient(child.val());
            });
        });
    }
    // Getting Inventory
    const [InventoryList, setInventory] = React.useState([])
    const getInventory = () => {
        const InventoryRef = firebase.database().ref("Inventory");
        InventoryRef.on("value", async (snapshot) => {
            const Inventory = snapshot.val();
            const inventoryData = [];
            for (let id in Inventory) {
                inventoryData.push(Inventory[id])
            }
            await setInventory(inventoryData)
        })
    }


    // setting items State

    const [items, setItems] = React.useState([{ name: "", amount: 0 }])
    const changeItemsLength = (e) => {
        console.log(e)
        if (e === "add")
            setItems([...items, { name: "", amount: 0 }])
        if (e === "remove") {
            if (items.length > 1) {
                let newState = [...items];
                newState.pop();
                setItems(newState);
            } else Toast.apiFailureToast("Minimum one should exist")
        }
    }
    const handleInventoryData = (e, index) => {
        let amountValue = ""
        InventoryList.forEach((item) => {
            if (item.name === e.target.value) {
                amountValue = item.amount;
            }
        })
        let newState = [...items];
        newState[index].name = e.target.value;
        newState[index].amount = amountValue;
        setItems(newState);
        calculateTotal()
        console.log(items)
    }

    //Calculate Total
    const calculateTotal = () => {
        let totalVal = 0
        items.forEach((item) => {
            totalVal += item.amount;
        })
        setDischargeData({ ...dischargeData, total: totalVal })
    }

    // getting Total Amount
    const [dischargeData, setDischargeData] = React.useState({
        total: 0,
        adjustment: "",
        dateDischarge: moment(Date.now()).format("YYYY-MM-DDTHH:mm"),
        balance: 0
    });

    if (patient.discharge && dischargeData.total === 0) {
        setDischargeData(patient.discharge)
        setItems(patient.inventory)
    }

    const dischargeDataHandler = (e) => {
        if (e.target.name === "adjustment") {
            if (e.target.value === "") {
                setDischargeData({ ...dischargeData, [e.target.name]: e.target.value })
            } else {
                let adjustment = parseInt(e.target.value);
                setDischargeData({ ...dischargeData, [e.target.name]: adjustment })
            }
        } else
            setDischargeData({ ...dischargeData, [e.target.name]: e.target.value })
    }

    const updatePatientDetails = async () => {
        // Preparing Data
        let balanceVal
        if (dischargeData.adjustment === "")
            balanceVal = dischargeData.total - patient.advance
        else balanceVal = dischargeData.total - patient.advance - dischargeData.adjustment;
        await setDischargeData({ ...dischargeData, balance: balanceVal })
        const userRef = firebase.database().ref("ActivePatients").child(selectedId[0]);
        const patientData = {
            ...patient,
            discharge: {
                adjustment: dischargeData.adjustment,
                balance: balanceVal,
                dateDischarge: dischargeData.dateDischarge || moment(Date.now()).format("YYYY-MM-DDTHH:mm"),
                total: dischargeData.total
            },
            inventory: items,
        }
        userRef.update(patientData).then(() => {
            Toast.apiSuccessToast("Patient details updated")
        }).catch(() => {
            Toast.apiFailureToast("Server Error")
        })
        setTab(1);
    }

    const dischargePatient = () => {
        let balanceVal
        if (dischargeData.adjustment === "")
            balanceVal = dischargeData.total - patient.advance
        const patientData = {
            ...patient,
            discharge: {
                adjustment: dischargeData.adjustment,
                balance: balanceVal,
                dateDischarge: dischargeData.dateDischarge || moment(Date.now()).format("YYYY-MM-DDTHH:mm"),
                total: dischargeData.total
            },
            inventory: items,
        }
        console.log(patientData)
        const patientRef = firebase.database().ref("PatientsIPD");
        patientRef.push(patientData).then(() => {
        }).catch(() => {
            Toast.apiFailureToast("Server Error")
        });
        const userRef = firebase.database().ref("ActivePatients").child(patient.id);
        userRef.remove().then(() => {
            Toast.apiSuccessToast("Patient details updated")
        }).catch(() => {
            Toast.apiFailureToast("Server Error")
        })
        setTab(1);
    }

    return (
        <>
            {tab === 0 ?
                <Container>
                    <div style={{ display: "flex" }}>
                        <Button className={classes.buttons} onClick={updatePatientDetails} variant="outlined"> Save </Button>
                        <Button className={classes.buttons} onClick={dischargePatient} variant="outlined"> Discharge </Button>
                        {props.patient ? <Button className={classes.buttonCancel} onClick={() => props.backToDashboard()} variant="outlined"> Cancel </Button> :
                            <Button className={classes.buttonCancel} onClick={() => props.changeTabs(0)} variant="outlined"> Cancel </Button>}
                    </div>
                    <Form>
                        <Section>
                            <LogoAndHeading>
                                <LogoHolder>
                                    <Logo src="Images/Discharge.png" />
                                </LogoHolder>
                                <TextHolder>
                                    <Typography variant="h3">
                                        <b>CHIRANJEEVI HOSPITAL</b>
                                    </Typography>
                                    <Typography variant="h6">
                                        <b>Virat Sagar Parisar,Oppo. SATI College, NH-86,Vidisha (M.P.)</b><br />
                                        <b><TelePhone src="/Images/telephone.png" /> : 250544, 251280</b>
                                    </Typography>
                                </TextHolder>
                            </LogoAndHeading>
                            <HeaderInput>
                                <TextField onChange={handleFileNo} value={fileNo} className={classes.input} name="text" type="text" size="small" label="Reg. No." value={fileNo} InputLabelProps={{ shrink: true }} />
                                <Fab style={{ background: '#0C6361', }} onClick={getPatientDetails} className={classes.fabIconGet} name="add" color="primary" aria-label="add">
                                    <AutorenewIcon />
                                </Fab>
                                <TextField className={classes.input} name="text" type="text" size="small" label="Ward" InputLabelProps={{ shrink: true }} value={patient.ward} disabled />
                                <TextField className={classes.input} name="text" type="text" size="small" label="Patient Name" InputLabelProps={{ shrink: true }} value={patient.name} disabled />
                            </HeaderInput>
                            <HeaderInput>
                                <TextField className={classes.input} style={{ width: '280px' }} name="text" type="datetime-local" size="small" label="Date of Admission" InputLabelProps={{ shrink: true }} value={patient.dateAdmit} disabled />
                                <TextField onChange={dischargeDataHandler} className={classes.input} style={{ width: '280px' }} name="dateDischarge" type="datetime-local" size="small" label=" Date of Discharge" InputLabelProps={{ shrink: true }} value={dischargeData.dateDischarge} />
                            </HeaderInput>
                        </Section>
                    </Form>
                    <Form>
                        <MainForm >
                            <MainFormSection>
                                {items.map((item, index) => (
                                    <ItemContainer>
                                        <Select onChange={(e) => handleInventoryData(e, index)} value={item.name} >
                                            <option selected disabled value="">Select</option>
                                            {InventoryList.map((item, index) => (
                                                <option value={item.name}>{item.name}</option>
                                            ))}
                                        </Select>
                                        <ItemPrice>
                                            {items[index].amount === 0 ? "" : items[index].amount}
                                            {items[index].amount === 0 ? "" : "Rs"}
                                        </ItemPrice>
                                    </ItemContainer>
                                ))}
                                <div style={{ display: 'flex', width: '100px', justifyContent: 'space-between' }}>
                                    <Fab style={{ background: '#0C6361', }} onClick={() => changeItemsLength("add")} className={classes.fabIcon} name="add" color="primary" aria-label="add">
                                        <AddIcon />
                                    </Fab>
                                    <Fab onClick={() => changeItemsLength("remove")} className={classes.fabIcon} name="remove" color="default" aria-label="add">
                                        <RemoveIcon />
                                    </Fab>
                                </div>
                            </MainFormSection>
                            <MainFormSection style={{ border: "none" }}>
                                Remarks
                            </MainFormSection>
                        </MainForm>
                    </Form>
                    <Form>
                        <MainForm>
                            <AmountCountainer style={{ borderRight: "1px solid black" }}>
                                <AmountField>
                                    <TextField onChange={dischargeDataHandler} className={classes.input} value={dischargeData.total} size="small" disabled label="Total" />
                                </AmountField>
                                <AmountField>
                                    <TextField className={classes.input} name="text" type="text" size="small" label="Advance" InputLabelProps={{ shrink: true }} disabled value={patient.advance} />
                                </AmountField>
                                <AmountField>
                                    <TextField onChange={dischargeDataHandler} className={classes.input} name="adjustment" type="number" size="small" label="Adjustment" value={dischargeData.adjustment} />
                                </AmountField>
                            </AmountCountainer>
                            <AmountCountainer style={{ borderLeft: "1px solid black" }}>
                                <Typography variant="h4">
                                    <b> Balance </b>
                                </Typography>
                                {patient.advance &&
                                    <Typography variant="h4">
                                        {dischargeData.adjustment === "" ? dischargeData.total - patient.advance :
                                            dischargeData.total - patient.advance - dischargeData.adjustment} Rs.
                                    </Typography>}
                            </AmountCountainer>
                        </MainForm>
                    </Form>

                </Container>
                : ""}
            {tab === 1 ?
                <PrintDischarge fileNo={fileNo} />
                : ""}
        </>
    )
}
