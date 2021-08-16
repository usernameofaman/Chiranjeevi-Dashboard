import React, { useEffect } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import firebase from '../utils/firebase';
import PrintDischarge from './printDischarge'
import { Button } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    input: {
        width: "100%",
        minWidth: "100px",
        marginLeft: 40,
        marginTop: 10,
    },
    fabIcon: {
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

export default function Discharge() {
    const classes = useStyles();
    const [tab , setTab ] = React.useState(0)
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

    useEffect(() => {
        getInventory()
    }, []);

    // setting items State

    const [items, setItems] = React.useState([{ name: "", amount: 0 }])
    const changeItemsLength = (e) => {
        console.log(e)
        if (e === "add")
            setItems([...items, { name: "", amount: 0 }])
        if (e === "remove") {
            let newState = [...items];
            newState.pop();
            setItems(newState);
        }
    }
    const handleInventoryData = (e, index) => {
        let amountValue = ""
        InventoryList.forEach((item) => {
            setTotal(total + item.amount)
            if (item.name === e.target.value)
                amountValue = item.amount;
        })
        let newState = [...items];
        newState[index].name = e.target.value;
        newState[index].amount = amountValue;
        setItems(newState);
    }

    // getting Total Amount
    const [total, setTotal] = React.useState(0)

    return (
        <>
        {tab===0 ? 
        <Container>
            <Form>
                <Section>
                    <LogoAndHeading>
                        <LogoHolder>
                            <Logo src="/images/Discharge.png" />
                        </LogoHolder>
                        <TextHolder>
                            <Typography variant="h3">
                                <b>CHIRANJEEVI HOSPITAL</b>
                            </Typography>
                            <Typography variant="h6">
                                <b>Virat Sagar Parisar,Oppo. SATI College, NH-86,Vidisha (M.P.)</b><br />
                                <b>TI : 250544, 251280</b>
                            </Typography>
                        </TextHolder>
                    </LogoAndHeading>
                    <HeaderInput>
                        <TextField className={classes.input} id="outlined-basic" name="text" type="text" size="small" label="Reg. No." />
                        <TextField className={classes.input} id="outlined-basic" name="text" type="text" size="small" label="Ward" />
                        <TextField className={classes.input} id="outlined-basic" name="text" type="text" size="small" label="Patient Name" />
                    </HeaderInput>
                    <HeaderInput>
                        <TextField className={classes.input} id="outlined-basic" name="text" type="text" size="small" label="Date of Admission" />
                        <TextField className={classes.input} id="outlined-basic" name="text" type="text" size="small" label=" Date of Discharge" />
                    </HeaderInput>
                </Section>
            </Form>
            <Form>
                <MainForm style={{ minHeight: "400px" }}>
                    <MainFormSection>
                        {items.map((item, index) => (
                            <ItemContainer>
                                <Select onChange={(e) => handleInventoryData(e, index)} >
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
                            <Fab onClick={() => changeItemsLength("add")} className={classes.fabIcon} name="add" color="primary" aria-label="add">
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
                    <AmountCountainer style={{borderRight:"1px solid black"}}>
                        <AmountField>
                            <TextField className={classes.input} value={total} size="small" disabled label="Total" />
                        </AmountField>
                        <AmountField>
                            <TextField className={classes.input} id="outlined-basic" name="text" type="text" size="small" label="Advance" />
                        </AmountField>
                        <AmountField>
                            <TextField className={classes.input} id="outlined-basic" name="text" type="text" size="small" label="Adjustment" />
                        </AmountField>
                    </AmountCountainer>
                    <AmountCountainer style={{borderLeft:"1px solid black"}}>
                        <Typography variant="h4">
                            <b> Balance </b>
                        </Typography>
                        <Typography variant="h4">
                            {total} Rs.
                        </Typography>
                    </AmountCountainer>
                </MainForm>
            </Form>
            <Button onClick={() => setTab(1)} variant="outlined"> Save</Button>
        </Container>
        : "" }
        {tab===1 ? 
        <PrintDischarge/>
        : "" }
        </>
    )
}
