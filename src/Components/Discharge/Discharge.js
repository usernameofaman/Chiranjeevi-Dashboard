import React , { useEffect } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import firebase from '../utils/firebase'




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
        width: "36px",
        height: "36px",
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

export default function Discharge() {
    const classes = useStyles();
    const [items, setItems] = React.useState([{ name: "XRay", amount: 200 }])
    const changeItemsLength = () => {
        setItems([...items,{is:false}])        
    }
    const [InventoryList , setInventory] = React.useState([])
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

    return (
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
                <MainForm>
                    <MainFormSection>
                        {items.map((item) => (
                        <ItemContainer>
                            <Select>
                                {InventoryList.map((item) => (
                                <option>{item.name}</option>
                                ))}
                            </Select>
                            <ItemPrice>
                                1000Rs
                            </ItemPrice>
                            <Fab onClick={() => changeItemsLength()} className={classes.fabIcon} color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </ItemContainer>
                        ))}
                    </MainFormSection>
                    <MainFormSection style={{ border: "none" }}>
                        Remarks
                    </MainFormSection>
                </MainForm>
            </Form>
        </Container>

    )
}
