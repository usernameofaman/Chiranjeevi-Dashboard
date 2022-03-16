import React, { useEffect } from 'react'
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FirebaseFunction from '../utils/firebaseFunctions';
import Toast from '../Common/snackbar'
import { Button } from '@material-ui/core';
import moment from 'moment';


const useStyles = makeStyles(() => ({
    inputReceipt: {
        width: "100%"
    },
    button: {
        background: "#238887",
        margin: "10px",
        color: "white",
        '&:hover': {
            backgroundColor: '#0C6361',
            boxShadow: 'none',
        },
    },
    fileInput: {
        margin: "10px"
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

const TelePhone = styled.img`
    width:18px;
    height:18px;
`
const Paper = styled.div`
    padding:10px;
    display: flex;
    height: 5in;
    width: 8.3in;
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
    /* margin-top: ; */
`
const LogoAndHeading = styled.div`
    display: flex;
    width: 100%;
`

const LogoHolder = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
    margin: 15px 0px 10px 0px;
`
const TextHolder = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`
const HeaderInput = styled.div`
    width: 100%;
    display: flex;
    padding: 5px 20px 0px 20px;
    font-size:18px;
    margin-top: 12px;
    align-items: flex-end;
    height:35px;
`
const Logo = styled.img`
    width: 70px;
    height: 80px;
    `
const Form = styled.div`
    width: 100%;
    justify-content: center;
    flex-direction: column;
    border: 2px solid #000000;
    margin-top: 2px;
`

const HorizontalLine = styled.div`
    width: 100%;
    height: 2px;
    background-color: black;
    margin-top: 10px;
`
const Value = styled.div`
    margin-left: 25px;
    margin-right: 35px;
    font-weight: 500;
    width:auto;
    display:flex;
    flex-grow: 1;
`
const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width:100vw;
    padding: 30px;
    justify-content: center;
    @media print{
        display:none;
    }
`
const ViewBox = styled.div`
    display:flex;
    width:100%;
    justify-content: center;
`
const Navigator = styled.div`
    display:flex;
    flex-direction: column;
    min-width: 200px;
    padding: 20px;
`
const ReceiptList = styled.div`
    display: flex;
    height: 30px;
    background: #0c6361;
    padding: 12px;
    width: 150px;
    border-radius: 5px;
    color: white;
    justify-content: space-between;
    align-items: center;
    margin:10px 0px 10px 0px;
    cursor:pointer;
    transition: all 0.2s;
    &:hover{
        background: #107270;
        width: 155px;
    }
`



function ViewIPDReceipt() {
    const classes = useStyles();
    useEffect(() => {

    })
    const [fileNo, setFileNo] = React.useState();
    const handleFileNo = (e) => {
        if (e.target.value === "") setFileNo("")
        else setFileNo(parseInt(e.target.value))
    }
    const [patient, setPatient] = React.useState({ receipt: [] });
    const fetchData = () => {
        const res = FirebaseFunction.getOneData("ActivePatients", "fileNo", fileNo);
        //console.log(res)
        if (res.selectedId === "") Toast.apiFailureToast("Does not exist")
        else {
            if (res.data.receipt){
                setPatient(res.data);
                setSlip(res.data.receipt[0])}
            else {
                setPatient({ ...res.data, receipt: [] })
                Toast.apiFailureToast("No Receipts Found")
            }
        }
    }
    const [slip , setSlip] = React.useState({})
    const setReceipt = (changeSlip) => {
        //console.log(changeSlip)
        setSlip(changeSlip)
    }

    return (
        <>
            <Container>
                <ButtonContainer>
                    <TextField onChange={handleFileNo} value={fileNo} className={classes.fileInput} type="number" />
                    <Button onClick={fetchData} className={classes.button}> Fetch </Button>
                </ButtonContainer>
                <ViewBox>
                    <Navigator>
                        {patient.receipt.map((slip, index) => (
                            <>
                                <ReceiptList onClick={() => setReceipt(slip)}>
                                    <div style={{ fontSize: "29px", borderRight:"3px solid #74a278",paddingRight:"padding-right: 10px" }}>
                                        # {index}
                                    </div>
                                    <div>
                                        {moment(slip.date).format("hh:mm A")}<br />
                                        {moment(slip.date).format("DD-MM-YYYY ")}
                                    </div>
                                </ReceiptList>
                            </>
                        ))}
                    </Navigator>
                    <Paper>
                        <Form>
                            <Section >
                                <LogoAndHeading>
                                    <LogoHolder>
                                        <Logo src="/Images/logoN.png" />
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
                            </Section>
                            <HorizontalLine />
                            <HeaderInput style={{ justifyContent: "space-between" }}>
                                <TextField name="serialNo" type="text" size="small" label="No." variant="outlined" value={slip.serialNo} InputLabelProps={{ shrink: true }} disabled />
                                <TextField style={{ marginRight: "4%" }} name="date" type="datetime-local" InputLabelProps={{ shrink: true }} size="small" label="Date" value={slip.date} variant="outlined" />
                            </HeaderInput>
                            <HeaderInput>
                                <div style={{ paddingBottom: "6px" }}>Received with thanks from {patient.sex === "M" ? "Mr" : "Mrs"} </div>
                                <Value>
                                    <TextField className={classes.inputReceipt} name="name" type="text" size="small" label="Name" value={patient.name} InputLabelProps={{ shrink: patient.name ? true : false }} disabled />
                                </Value>
                            </HeaderInput>
                            <HeaderInput>
                                <div style={{ paddingBottom: "6px" }}>The sum of Rupees </div>
                                <Value>
                                    <TextField className={classes.inputReceipt} name="amountInWords" type="text" size="small" value={slip.amountInWords} InputLabelProps={{ shrink: patient.receipt.amountInWords === "" ? false : true }} disabled />
                                </Value>
                            </HeaderInput>
                            <HeaderInput style={{ fontSize: "15px" }}>

                                <div style={{ paddingBottom: "6px" }}>For Hospitalization / Pathalogical Investigation / OPD / X-Ray / ECG Other </div>
                                <Value>
                                </Value>
                            </HeaderInput>
                            <HeaderInput>
                                <div style={{ paddingBottom: "6px" }}>Cheque No.</div>
                                <Value>
                                    <TextField className={classes.inputReceipt} name="chequeNo" type="text" size="small" label="Check No." value={slip.chequeNo}/>
                                </Value>

                                <div style={{ paddingBottom: "6px" }}>Dated</div>
                                <Value>
                                    <TextField className={classes.inputReceipt} name="chequeDate" type="datetime-local" size="small" label="Date" value={slip.chequeDate} InputLabelProps={{ shrink: true }} />
                                </Value>
                            </HeaderInput>
                            <HeaderInput>
                                <div style={{ paddingBottom: "6px" }}><b>Amount</b></div>
                                <Value style={{ flexGrow: "0" }}>
                                    <TextField className={classes.inputReceipt} name="amount" type="number" size="small" value={slip.amount} InputLabelProps={{ shrink: true }}/>
                                </Value>
                            </HeaderInput>

                        </Form>
                    </Paper>
                </ViewBox>

            </Container>

        </>
    )
}
export default ViewIPDReceipt;
