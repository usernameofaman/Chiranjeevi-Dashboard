import React, { useEffect } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import firebase from '../utils/firebase';
import moment from 'moment';



const TelePhone = styled.img`
    width:18px;
    height:18px;
`

const Paper = styled.div`
    padding:10px;
    display: flex;
    height: 11.7in;
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
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
    font-size:16px;

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
margin-top: -2px;
`
const Field = styled.div`
    font-weight: 600;
    padding: 0px 30px 0px 30px;
    margin: 0px 20px 0px 20px;
    border-bottom: 1px dotted black;
`
const HorizontalLine = styled.div`
    width: 100%;
    height: 2px;
    background-color: black;
    margin-top: 10px;
`
const TextSection = styled.div`
    padding: 0px 10px 0px 50px;
    width : 40%;
    margin: 5px 0px 5px 0px;
   
`
const BillText = styled.div`
    height: 30px;
    border:1px solid black;
    width:100%;
    margin-top:-1px;
    display: flex;
    justify-content: center;
    align-items: center;   
`
const ItemsList = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`


export default function DischargePreview(props) {


    useEffect(() => {
        getPatientDetails()

    }, []);
    const [patient, setPatient] = React.useState("")
    const [itemList, setItemList] = React.useState([])

    const getPatientDetails = () => {

        const userRef = firebase.database().ref("Patients");
        var userQuery = userRef.orderByChild("fileNo").equalTo(props.fileNo);
        userQuery.once("value", function (snapshot) {
            // setSelectedId(Object.keys(snapshot.val()))
            snapshot.forEach(function (child) {
                setPatient(child.val())
                setItemList(child.val().inventory)
            });
        });
    }

    // const testing = () => {
    //     console.log(patient.inventory, itemList)
        

    // }

    return (
        <Paper>
            <Form>
                <Section>
                    <LogoAndHeading>
                        <LogoHolder>
                            <Logo src="/Images/Discharge.png" />
                        </LogoHolder>
                        <TextHolder>
                            <Typography variant="h3">
                                <b>CHIRANJEEVI HOSPITAL</b>
                            </Typography>
                            <Typography variant="h6">
                                <b>Virat Sagar Parisar,Oppo. SATI College, NH-86,Vidisha (M.P.)</b><br />
                                <b><TelePhone src="/Images/telephone.png"/> : 250544, 251280</b>
                            </Typography>
                        </TextHolder>
                    </LogoAndHeading>
                    <HeaderInput>
                        <div style={{ display: 'flex' }}>Reg. No : <Field>{patient.fileNo}</Field></div>
                        <div style={{ display: 'flex' }}>Ward: <Field>{patient.ward}</Field> </div>
                        <div style={{ display: 'flex' }}>Pt name: <Field>{patient.name}</Field></div>
                    </HeaderInput>
                    <HeaderInput>
                        <div style={{ display: 'flex' }}>Date of Admission : <Field>{moment(patient?.dateAdmit).format("DD-MM-YYYY  HH:MM")}</Field></div>
                        <div style={{ display: 'flex' }}>Date of Discharge<Field>{moment(patient?.discharge?.dateDischarge).format("DD-MM-YYYY HH:MM")}</Field></div>
                    </HeaderInput>
                </Section>
                <HorizontalLine />
                <div style={{ display: "flex", height: "700px" }}>
                    <Section style={{paddingTop:"30px"}}> 
                        {itemList.map((item) => (
                            <ItemsList>
                                <TextSection>
                                    <Typography >{item.name}</Typography>
                                </TextSection>
                                <TextSection>
                                    <Typography >{item.amount}</Typography>
                                </TextSection>
                            </ItemsList>
                        ))}
                    </Section>
                    <Section>
                        <TextSection>
                        </TextSection>
                    </Section>
                </div>
                <HorizontalLine />
                <div style={{ display: "flex", width: "50%", justifyContent: "flex-start", padding: "50px" }} >
                    <TextSection style={{ padding: "0px" }}>
                        <BillText >Total </BillText>
                        <BillText >{patient.discharge?.adjustment && "Adjustnemt"}</BillText>
                        <BillText >Paid </BillText>
                    </TextSection>
                    <TextSection style={{ padding: "0px", marginLeft: "1px" }}>
                        <BillText >{patient.discharge?.total} </BillText>
                        <BillText >{patient.discharge?.adjustment}  </BillText>
                        <BillText >500  </BillText>
                    </TextSection>
                </div>


            </Form>
        </Paper>
    )
}
